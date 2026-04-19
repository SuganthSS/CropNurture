
import { GoogleGenAI, Type } from "@google/genai";
import { SoilData, CropRecommendation, CropDiseaseInfo, DailyForecast } from '../types';
import { analyzeSoilMatch, getFertilizerContext, getDistrictContext } from './localAnalysis';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const recommendationSchema = {
    type: Type.OBJECT,
    properties: {
        cropName: {
            type: Type.STRING,
            description: "The common name of the single most suitable crop.",
        },
        description: {
            type: Type.STRING,
            description: "A detailed paragraph explaining why this crop is suitable for the given conditions, including its benefits and characteristics.",
        },
        imageUrl: {
            type: Type.STRING,
            description: "A URL to a high-quality, realistic photograph of the crop growing in a field. Use a reliable source like Unsplash or Pexels if possible, otherwise use a placeholder service like picsum.photos. If no valid URL is found, return an empty string.",
        },
        optimalConditions: {
            type: Type.OBJECT,
            properties: {
                ph: { type: Type.STRING, description: "Optimal pH range, e.g., '6.0 - 7.5'." },
                temperature: { type: Type.STRING, description: "Optimal temperature range in Celsius, e.g., '20°C - 30°C'." },
                rainfall: { type: Type.STRING, description: "Optimal annual rainfall in mm, e.g., '600mm - 1200mm'." }
            },
            required: ["ph", "temperature", "rainfall"]
        },
        plantingSeason: {
            type: Type.STRING,
            description: "The best season to plant this crop (e.g., 'Spring', 'Early Summer')."
        },
        plantingGuide: {
            type: Type.OBJECT,
            properties: {
                seedDepth: { type: Type.STRING, description: "Recommended depth for planting seeds (e.g., '2-3 cm' or '1 inch')." },
                spacing: { type: Type.STRING, description: "Recommended spacing between plants and rows (e.g., '30cm apart in rows 50cm apart')." },
                soilPreparation: { type: Type.STRING, description: "Brief instructions on how to prepare the soil before planting (max 1-2 sentences)." }
            },
            required: ["seedDepth", "spacing", "soilPreparation"]
        },
        pestAndDiseaseManagement: {
            type: Type.OBJECT,
            properties: {
                commonPestsAndDiseases: {
                    type: Type.ARRAY,
                    items: { 
                        type: Type.OBJECT,
                        properties: {
                            name: { type: Type.STRING, description: "Name of the pest or disease." },
                            imageUrl: { type: Type.STRING, description: "A URL to a representative image of this pest or disease. Return an empty string if no valid URL is found." },
                            severity: { type: Type.STRING, enum: ["Low", "Medium", "High"], description: "Potential impact severity if untreated (Low, Medium, High)." },
                            symptoms: { type: Type.STRING, description: "A brief description of the key symptoms to look out for (max 1-2 sentences)." },
                            controlMethods: { type: Type.STRING, description: "Specific biological or chemical control methods for this particular issue (max 1-2 sentences)." }
                        },
                        required: ["name", "imageUrl", "severity", "symptoms", "controlMethods"]
                    },
                    description: "An array of 3-5 common pests and diseases that affect this crop, each with a name, a representative image URL, severity level, symptoms, and control methods."
                },
                naturalControlMethods: {
                    type: Type.STRING,
                    description: "A paragraph summarizing natural, organic, or integrated pest management (IPM) strategies to deal with the listed pests and diseases."
                }
            },
            required: ["commonPestsAndDiseases", "naturalControlMethods"]
        },
        growthCycle: {
            type: Type.STRING,
            description: "General description of the growth habit and total duration."
        },
        growthStages: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING, description: "Name of the stage (e.g., Germination, Vegetative, Flowering, Harvest)" },
                    duration: { type: Type.STRING, description: "Approximate duration (e.g., '1-2 weeks', '30 days')" }
                }
            },
            description: "A chronological list of 4-6 key growth stages."
        },
        nutritionalValue: {
            type: Type.STRING,
            description: "Information about the key nutritional benefits of the crop."
        },
        historicalYield: {
            type: Type.OBJECT,
            properties: {
                value: { type: Type.NUMBER, description: "The estimated average yield value (e.g. 4.5, 2500)." },
                unit: { type: Type.STRING, description: "The unit of measurement (e.g. 'tons/ha', 'kg/acre')." },
                description: { type: Type.STRING, description: "A brief context description about this yield expectation." }
            },
            required: ["value", "unit", "description"]
        },
        marketTrends: {
            type: Type.ARRAY,
            description: "Projected market demand trends for the next 6 months based on crop seasonality and general market data.",
            items: {
                type: Type.OBJECT,
                properties: {
                    month: { type: Type.STRING, description: "Month abbreviation (e.g., Jan, Feb, Mar)." },
                    demandLevel: { type: Type.NUMBER, description: "Relative demand level from 0 to 100." }
                },
                required: ["month", "demandLevel"]
            }
        },
        cropRotation: {
            type: Type.ARRAY,
            description: "Suggest 1-2 crops to plant AFTER the recommended crop to replenish soil nutrients and break pest cycles.",
            items: {
                type: Type.OBJECT,
                properties: {
                    crop: { type: Type.STRING, description: "Name of the rotation crop." },
                    benefit: { type: Type.STRING, description: "Benefit to the soil (e.g., 'Fixes Nitrogen', 'Breaks pest cycle')." },
                    timing: { type: Type.STRING, description: "When to plant this next crop (e.g., 'Next Winter', 'Post-harvest')." }
                },
                required: ["crop", "benefit", "timing"]
            }
        }
    },
    required: ["cropName", "description", "imageUrl", "optimalConditions", "plantingSeason", "plantingGuide", "pestAndDiseaseManagement", "growthCycle", "growthStages", "nutritionalValue", "historicalYield", "marketTrends", "cropRotation"],
};

const diseaseSchema = {
    type: Type.OBJECT,
    properties: {
        isHealthy: { type: Type.BOOLEAN, description: 'True if the plant appears healthy, false otherwise.' },
        diseaseName: { type: Type.STRING, description: 'Common name of the disease, or "Healthy" if no disease is detected.' },
        description: { type: Type.STRING, description: 'A paragraph describing the disease or providing general tips for a healthy plant.' },
        symptoms: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: 'A list of key visual symptoms observed on the plant. Empty if healthy.'
        },
        organicTreatment: { type: Type.STRING, description: 'A paragraph detailing organic/natural methods to treat the disease. Provide general care tips if healthy.' },
        preventativeMeasures: { type: Type.STRING, description: 'A paragraph on steps to prevent this disease in the future. Provide general prevention tips if healthy.' }
    },
    required: ['isHealthy', 'diseaseName', 'description', 'symptoms', 'organicTreatment', 'preventativeMeasures']
};

export const getCropRecommendation = async (data: SoilData, forecast?: DailyForecast[]): Promise<CropRecommendation> => {
    // 1. Local Analysis: Match soil data to database
    const matchedCrop = analyzeSoilMatch(data);
    
    // 2. Local Analysis: Get specific fertilizer protocols if a match or general data is found
    const fertilizerContext = matchedCrop ? getFertilizerContext(matchedCrop) : "";
    
    // 3. District Context (Optional, provided for general awareness)
    const districtContext = getDistrictContext();

    const currentMonth = new Date().toLocaleString('default', { month: 'long' });

    let prompt = `
        You are an expert agronomist and agricultural scientist. Your task is to recommend the single most suitable crop to plant based on the following soil and climate conditions.

        Soil & Climate Data:
        - pH Level: ${data.ph}
        - Nitrogen (N) Content: ${data.nitrogen} ppm
        - Phosphorus (P) Content: ${data.phosphorus} ppm
        - Potassium (K) Content: ${data.potassium} ppm
        - Average Temperature: ${data.temperature}°C
        - Average Humidity: ${data.humidity}%
        - Annual Rainfall: ${data.rainfall} mm
        - Current Month: ${currentMonth}

        Internal Database Analysis:
        ${matchedCrop ? `Our internal dataset strongly suggests that '${matchedCrop}' is the optimal crop for these specific soil parameters (N,P,K,pH,Humidity). Please heavily weight this in your final decision unless the temperature/rainfall makes it impossible.` : 'No direct match found in internal dataset, rely on general agronomy knowledge.'}

        ${fertilizerContext ? `Mandatory Reference Data for Pest & Disease Management:
        If you recommend '${matchedCrop}', you MUST incorporate the following specific fertilizer products and treatment protocols into the 'commonPestsAndDiseases' and 'controlMethods' sections where applicable. Use these exact product names (e.g. "YaraLiva Tropicote", "Tata Rallis") as examples of available solutions in India/Globally.
        
        ${fertilizerContext}
        ` : ''}

        Regional Context (India/Tamil Nadu Focus):
        The user may be in a region similar to these districts. Use this to inform crop suitability if the climate data matches:
        ${districtContext}
    `;

    if (forecast && forecast.length > 0) {
        const forecastString = forecast.map(f => `- ${f.date}: ${f.rainfall} mm`).join('\n');
        prompt += `
        
        Upcoming 7-Day Rainfall Forecast (consider for immediate planting advice):
        ${forecastString}
        `;
    }

    prompt += `
        Based on this data, provide a detailed recommendation. 
        
        For the 'marketTrends' field, generate a projection of the relative market demand (0-100) for this specific crop for the upcoming 6 months starting from ${currentMonth}. Use your knowledge of global and regional crop seasonality to estimate these trends.

        For the 'cropRotation' field, suggest subsequent crops that would benefit the soil after harvesting the recommended crop (e.g. nitrogen fixers after heavy feeders).

        Your response MUST be a single, valid JSON object, and nothing else. Do not include any text, markdown formatting, or code fences before or after the JSON object. The JSON object must conform to the specified schema. Ensure the imageUrl fields are valid and working URLs.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: recommendationSchema,
                temperature: 0.4, // Slightly lower temp to adhere to database suggestions
            },
        });

        const text = response.text.trim();
        const parsedJson = JSON.parse(text);

        return parsedJson as CropRecommendation;

    } catch (error) {
        console.error("Error fetching recommendation from Gemini API:", error);
        throw new Error("Failed to get crop recommendation. The model may have returned an invalid response or an API error occurred.");
    }
};

export const detectCropDisease = async (base64Image: string, mimeType: string): Promise<CropDiseaseInfo> => {
    const imagePart = {
        inlineData: {
            data: base64Image,
            mimeType: mimeType,
        },
    };

    const textPart = {
        text: `
          You are a plant pathologist and agricultural expert. Analyze this image of a plant leaf/crop.
          Identify if the plant is healthy or suffering from a disease.
          If a disease is present, identify it, describe its symptoms, and provide practical, organic treatment and prevention methods.
          If the plant is healthy, state that and provide general tips for keeping it healthy.
          Your response MUST be a single, valid JSON object, and nothing else.
          Do not include any text, markdown formatting, or code fences before or after the JSON object.
          The JSON object must conform to the specified schema.
        `
    };
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [imagePart, textPart] },
            config: {
                responseMimeType: 'application/json',
                responseSchema: diseaseSchema,
                temperature: 0.3,
            }
        });

        const text = response.text.trim();
        const parsedJson = JSON.parse(text);
        return parsedJson as CropDiseaseInfo;

    } catch (error) {
        console.error("Error fetching disease detection from Gemini API:", error);
        throw new Error("Failed to detect crop disease. The model may have returned an invalid response or an API error occurred.");
    }
};
