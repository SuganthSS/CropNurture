# CropNurture — AI-Powered Agricultural Intelligence Platform

![CropNurture](https://img.shields.io/badge/CropNurture-Agriculture-10B981?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite)
![Google Gemini](https://img.shields.io/badge/Google-Gemini-4285F4?style=for-the-badge&logo=google)

> Transform your agricultural decisions with real-time soil diagnostics and intelligent crop disease detection. CropNurture empowers farmers with precision insights for smarter, data-driven farming.

---

## 🌐 Live Demo

- **Frontend:** [https://crop-nurture.vercel.app](https://crop-nurture.vercel.app)

---

## ✨ Features

### 🔬 Soil Analysis Module
- Real-time soil composition analysis
- Multi-parameter soil health assessment (pH, Nitrogen, Phosphorus, Potassium)
- Rainfall and moisture monitoring
- Interactive radar charts for visual insights
- Historical trend analysis and tracking
- AI-powered personalized recommendations

### 🏥 Health Scan Module
- AI-powered crop disease detection from images
- Early warning system for plant health issues
- Disease severity classification
- Treatment and prevention recommendations
- Plant condition assessment

### 📊 Dashboard Features
- Interactive data visualizations with Recharts
- Historical analysis and trend tracking
- Quick-access recommendations
- Responsive and elegant UI design using Tailwind CSS

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| TypeScript | Type safety |
| Vite 6 | Build tool & dev server |
| Tailwind CSS | Styling |
| Recharts | Data visualization |
| Lucide React | Icons |
| Google Gemini 1.5/2.5 Flash | AI analysis & recommendations |

---

## 📁 Project Structure

```
CropNurture/
├── components/                  # Reusable React components
├── services/                    # API and logic layer (Gemini, Local Analysis)
├── data/                        # Local knowledge base and datasets (CSV)
├── types.ts                     # TypeScript interfaces and types
├── index.html                   # HTML entry point
├── index.tsx                    # React application root
├── App.tsx                      # Main application component
├── package.json                 # Dependencies and scripts  
├── tsconfig.json                # TypeScript configuration
├── vite.config.ts               # Vite configuration
└── README.md                    # Project documentation
```

---

## 📦 Prerequisites

- **Node.js** (v18.0 or higher recommended)
- **npm** or **yarn**
- **Google Gemini API Key** (Get it from [Google AI Studio](https://aistudio.google.com/))

---

## 🚀 Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/SuganthSS/CropNurture.git
cd CropNurture
```

#### 2. Install Dependencies
```bash
npm install
```

#### 3. Environment Setup
Create a `.env.local` file in the root directory:
```env
GEMINI_API_KEY=your_google_gemini_api_key_here
```

#### 4. Run Locally
Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

---

## 📝 Environment Variables

| Variable | Description |
|---|---|
| `GEMINI_API_KEY` | Your Google Gemini API key required for AI-powered analysis. |

---

## 🔮 Future Roadmap

- [ ] Mobile app (React Native)
- [ ] Real-time soil sensor integration
- [ ] Advanced weather API integration
- [ ] Crop yield prediction models
- [ ] Pesticide recommendation engine
- [ ] Multi-language support
- [ ] Export reports to PDF
- [ ] Farmer-to-farmer marketplace

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

- GitHub: [SuganthSS](https://github.com/SuganthSS)
- Project: [CropNurture](https://github.com/SuganthSS/CropNurture)

---

> *"Cultivate smarter, harvest better"* 🌾
