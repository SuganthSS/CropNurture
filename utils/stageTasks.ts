/**
 * Static mapping of growth stage names → actionable tasks.
 * Uses fuzzy keyword matching to handle variations from Gemini.
 */

const STAGE_TASKS: Record<string, string[]> = {
    // Germination / Seedling
    germination: [
        'Ensure soil moisture is consistently maintained',
        'Monitor soil temperature (20-30°C ideal)',
        'Watch for seedling emergence within 5-7 days',
        'Protect from birds and insects',
    ],
    seedling: [
        'Water seedlings gently — avoid waterlogging',
        'Ensure adequate sunlight exposure',
        'Thin overcrowded seedlings if needed',
        'Apply light organic mulch around seedlings',
    ],

    // Vegetative / Growth phase
    vegetative: [
        'Apply first dose of nitrogen fertilizer',
        'Monitor water levels and irrigate regularly',
        'Scout for early pest or weed activity',
        'Ensure proper spacing for air circulation',
    ],
    tillering: [
        'Apply nitrogen-based fertilizer (urea or ammonium sulfate)',
        'Maintain 2-5cm standing water in paddy fields',
        'Monitor for stem borer and leaf folder pests',
        'Remove weeds manually or with herbicide',
    ],
    growth: [
        'Continue regular irrigation schedule',
        'Apply balanced NPK fertilizer',
        'Monitor plant height and leaf health',
        'Scout for nutrient deficiency symptoms',
    ],

    // Flowering / Reproductive
    flowering: [
        'Ensure adequate and consistent irrigation',
        'Apply potassium-based fertilizer for fruit/grain formation',
        'Monitor closely for disease symptoms (blight, mildew)',
        'Avoid mechanical disturbance to plants',
    ],
    reproductive: [
        'Maintain optimal soil moisture levels',
        'Apply micronutrient spray (zinc, boron) if needed',
        'Protect from heavy rain and wind damage',
        'Monitor pollination activity',
    ],
    booting: [
        'Increase irrigation frequency',
        'Apply final dose of nitrogen if needed',
        'Watch for panicle emergence',
        'Protect from strong winds',
    ],
    heading: [
        'Maintain consistent water supply',
        'Monitor for grain-filling progress',
        'Apply foliar spray if nutrient deficiency observed',
        'Scout for fungal infections on panicles',
    ],

    // Maturity / Ripening
    maturity: [
        'Reduce irrigation gradually',
        'Check grain/fruit moisture content',
        'Plan harvest logistics and equipment',
        'Monitor for post-flowering pest attacks',
    ],
    ripening: [
        'Stop irrigation 7-10 days before harvest',
        'Test grain moisture (ideal: 20-25% for rice)',
        'Prepare drying and storage facilities',
        'Watch for bird damage in open fields',
    ],

    // Harvest
    harvest: [
        'Check crop maturity indicators (color, firmness)',
        'Harvest during dry weather conditions',
        'Minimize grain losses during cutting/threshing',
        'Plan immediate post-harvest drying',
    ],
    harvesting: [
        'Harvest at optimal moisture content',
        'Use sharp, clean tools to reduce crop damage',
        'Dry harvested crop to safe moisture levels (12-14%)',
        'Store in clean, pest-free facilities',
    ],

    // Fruiting (for fruit crops)
    fruiting: [
        'Support heavy branches with stakes',
        'Continue regular watering and feeding',
        'Monitor fruit size and color development',
        'Protect from fruit-boring insects',
    ],

    // Transplanting (rice/paddy)
    transplanting: [
        'Prepare puddled field with standing water',
        'Transplant 20-25 day old seedlings',
        'Maintain 2-3 seedlings per hill',
        'Apply basal fertilizer before transplanting',
    ],
};

/**
 * Finds the best matching tasks for a given stage name using keyword matching.
 */
export const getTasksForStage = (stageName: string): string[] => {
    const normalized = stageName.toLowerCase().replace(/[^a-z\s]/g, '').trim();

    // Exact match
    if (STAGE_TASKS[normalized]) return STAGE_TASKS[normalized];

    // Keyword match
    for (const [key, tasks] of Object.entries(STAGE_TASKS)) {
        if (normalized.includes(key) || key.includes(normalized)) {
            return tasks;
        }
    }

    // Partial keyword match (check each word)
    const words = normalized.split(/\s+/);
    for (const word of words) {
        if (word.length < 3) continue;
        for (const [key, tasks] of Object.entries(STAGE_TASKS)) {
            if (key.includes(word) || word.includes(key)) {
                return tasks;
            }
        }
    }

    // Generic fallback
    return [
        'Monitor crop health and growth progress',
        'Maintain appropriate soil moisture levels',
        'Scout for pests and diseases',
        'Apply fertilizer according to crop needs',
    ];
};
