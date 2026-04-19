
import { SoilData } from '../types';
import { SOIL_CROP_DATA_CSV, FERTILIZER_DATA_CSV, DISTRICT_DATA_CSV } from '../data/knowledgeBase';

interface DataPoint {
    ph: number;
    nitrogen: number;
    phosphorus: number;
    potassium: number;
    humidity: number;
    crop: string;
}

interface FertilizerInfo {
    plant: string;
    disease: string;
    product: string;
    purpose: string;
}

// Parse Soil Data CSV
const parseSoilData = (): DataPoint[] => {
    const lines = SOIL_CROP_DATA_CSV.trim().split('\n');
    // Skip header if present (check first char is not number)
    const startIndex = isNaN(parseFloat(lines[0][0])) ? 1 : 0;
    
    return lines.slice(startIndex).map(line => {
        const parts = line.split(',');
        return {
            ph: parseFloat(parts[0]),
            nitrogen: parseFloat(parts[1]),
            phosphorus: parseFloat(parts[2]),
            potassium: parseFloat(parts[3]),
            humidity: parseFloat(parts[4]),
            crop: parts[5]?.trim()
        };
    }).filter(p => p.crop); // Ensure valid row
};

// Parse Fertilizer CSV
const parseFertilizerData = (): FertilizerInfo[] => {
    const lines = FERTILIZER_DATA_CSV.trim().split('\n');
    const startIndex = 1; // Header is present
    
    return lines.slice(startIndex).map(line => {
        // Simple regex to split by comma ignoring quotes:
        const parts = line.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g);
        if (!parts) return null;
        
        return {
            plant: parts[0]?.trim(),
            disease: parts[1]?.trim(),
            purpose: parts[2]?.trim(),
            product: parts[5]?.replace(/"/g, '').trim() // Removing quotes from product field
        };
    }).filter((item): item is FertilizerInfo => item !== null);
};

const dataset = parseSoilData();
const fertilizerDb = parseFertilizerData();

// Calculate Euclidean distance between input and data point
const calculateDistance = (input: SoilData, point: DataPoint): number => {
    // Normalize values roughly to 0-1 range to give equal weight
    // Max values based on slider max in UI
    const dPh = (input.ph - point.ph) / 14;
    const dN = (input.nitrogen - point.nitrogen) / 200;
    const dP = (input.phosphorus - point.phosphorus) / 200;
    const dK = (input.potassium - point.potassium) / 200;
    const dH = (input.humidity - point.humidity) / 100;

    return Math.sqrt(dPh*dPh + dN*dN + dP*dP + dK*dK + dH*dH);
};

export const analyzeSoilMatch = (soilData: SoilData): string | null => {
    if (dataset.length === 0) return null;

    // Find K=5 nearest neighbors
    const sorted = dataset
        .map(point => ({ ...point, distance: calculateDistance(soilData, point) }))
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 5);

    // Simple majority vote
    const counts: Record<string, number> = {};
    sorted.forEach(p => {
        counts[p.crop] = (counts[p.crop] || 0) + 1;
    });

    // Return crop with most occurrences in top 5
    let bestCrop = null;
    let maxCount = 0;
    for (const crop in counts) {
        if (counts[crop] > maxCount) {
            maxCount = counts[crop];
            bestCrop = crop;
        }
    }

    return bestCrop;
};

export const getFertilizerContext = (cropName: string): string => {
    // Flexible matching (e.g. "Maize" matches "Corn")
    const normalizedCrop = cropName.toLowerCase();
    
    const relevant = fertilizerDb.filter(f => {
        const dbPlant = f.plant.toLowerCase();
        if (normalizedCrop.includes(dbPlant) || dbPlant.includes(normalizedCrop)) return true;
        if (normalizedCrop === 'maize' && dbPlant === 'corn') return true;
        if (normalizedCrop === 'corn' && dbPlant === 'maize') return true;
        return false;
    });

    if (relevant.length === 0) return "";

    // Format into a readable string for the AI prompt
    return relevant.map(f => 
        `- Disease: ${f.disease}\n  Purpose: ${f.purpose}\n  Recommended Product: ${f.product}`
    ).join('\n\n');
};

export const getDistrictContext = (): string => {
    return DISTRICT_DATA_CSV.split('\n').slice(1).map(row => {
         const cols = row.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g);
         if(!cols) return "";
         return `- ${cols[0]}: ${cols[3].replace(/"/g, '')}`;
    }).join('\n');
}
