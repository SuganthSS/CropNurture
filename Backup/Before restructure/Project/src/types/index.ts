
export interface SoilData {
  ph: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  organicMatter: number;
  moisture: number;
}

export interface Crop {
  id: string;
  name: string;
  image: string; // Emoji or URL
  suitabilityScore: number;
  yieldRange: string;
  growthDuration: string;
  waterRequirement: 'Low' | 'Medium' | 'High';
  tags: string[];
}

export interface WeatherForecast {
  day: string;
  temp: number;
  condition: 'Sunny' | 'Cloudy' | 'Rainy';
  rainfall: number;
}

export interface DiseaseRecord {
  id: string;
  date: string;
  crop: string;
  disease: string;
  severity: 'Low' | 'Medium' | 'High';
  confidence: number;
}
