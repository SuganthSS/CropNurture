# CropNurture AI

An intelligent agricultural assistant that provides detailed crop recommendations and instant plant disease detection. Leveraging the power of Google's Gemini API, CropNurture helps farmers and gardeners make informed decisions to maximize yield and sustainability by transforming soil and climate data into actionable insights.

## Key Features

*   **AI-Powered Crop Recommendations**: Input your soil composition (pH, Nitrogen, Phosphorus, Potassium) and local climate data to receive a detailed recommendation for the most suitable crop.
*   **Comprehensive Analysis Dashboard**: Results are displayed in a rich, interactive dashboard that includes optimal conditions, planting guides, growth cycle timelines, projected yield, market demand trends, and crop rotation strategies.
*   **Instant Disease Detection**: Upload a photo of a plant to get an AI-powered diagnosis, including disease identification, symptom analysis, and recommended organic treatments.
*   **Automated Climate Data**: Automatically fetch and populate current temperature, humidity, and rainfall data using your browser's location.
*   **Interactive Data Visualization**: Understand your soil profile at a glance with a radar chart, and analyze market forecasts and rainfall trends through intuitive graphs.
*   **Analysis History & Comparison**: Save analysis sessions and compare multiple reports side-by-side to evaluate different crop options under varying conditions.

## How It Works

The application provides two core functionalities:

1.  **Soil Analysis**: Users input soil and climate parameters using interactive sliders. This data is combined with contextual information from an internal knowledge base and sent to the Google Gemini API. The API returns a detailed JSON object with a comprehensive crop plan, which the frontend renders in a dynamic dashboard.
2.  **Health Scan**: A user uploads an image of a plant. The image data is sent to the Gemini vision model, which analyzes it for signs of disease. The model returns a structured JSON object containing a diagnosis, a list of symptoms, and treatment recommendations.

## Technology Stack

*   **Frontend**: React, TypeScript, Vite, Tailwind CSS
*   **AI Model**: Google Gemini API
*   **Charting**: Recharts
*   **Icons**: Lucide React

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

*   Node.js (v18 or higher)
*   A Google Gemini API Key. You can obtain one from [Google AI Studio](https://aistudio.google.com/app/apikey).

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/suganthss/cropnurture.git
    cd cropnurture
    ```

2.  **Install the dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a file named `.env` in the root of the project and add your Gemini API key:
    ```
    GEMINI_API_KEY="YOUR_API_KEY_HERE"
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

The application will be running at `http://localhost:3000`.
