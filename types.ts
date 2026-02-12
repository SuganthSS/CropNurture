
export interface SoilData {
  ph: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  temperature: number;
  humidity: number;
  rainfall: number;
}

export interface GrowthStage {
  name: string;
  duration: string;
}

export interface PestOrDisease {
  name: string;
  imageUrl: string;
  severity?: string;
  symptoms?: string;
  controlMethods?: string;
}

export interface HistoricalYield {
  value: number;
  unit: string;
  description: string;
}

export interface DailyForecast {
  date: string;
  rainfall: number;
}

export interface PlantingGuide {
    seedDepth: string;
    spacing: string;
    soilPreparation: string;
}

export interface MarketTrend {
    month: string;
    demandLevel: number; // 0-100
}

export interface RotationSuggestion {
    crop: string;
    benefit: string;
    timing: string;
}

export interface CropRecommendation {
  cropName: string;
  description: string;
  imageUrl: string;
  optimalConditions: {
    ph: string;
    temperature: string;
    rainfall: string;
  };
  plantingSeason: string;
  plantingGuide?: PlantingGuide;
  pestAndDiseaseManagement: {
    commonPestsAndDiseases: Array<string | PestOrDisease>;
    naturalControlMethods: string;
  };
  growthCycle?: string;
  growthStages?: GrowthStage[];
  nutritionalValue?: string;
  historicalYield?: string | HistoricalYield;
  marketTrends?: MarketTrend[];
  cropRotation?: RotationSuggestion[];
}

export interface CropDiseaseInfo {
  isHealthy: boolean;
  diseaseName: string;
  description: string;
  symptoms: string[];
  organicTreatment: string;
  preventativeMeasures: string;
}

export interface HistoryItem {
  id: number;
  timestamp: string;
  soilData: SoilData;
  recommendation: CropRecommendation;
}
