# CropNurture — AI-Powered Agricultural Intelligence Platform

![CropNurture](https://img.shields.io/badge/CropNurture-Agriculture-10B981?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite)
![Python](https://img.shields.io/badge/Python-Flask-3776AB?style=for-the-badge&logo=python)
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
- Responsive and elegant UI design

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| TypeScript | Type safety |
| Vite 6 | Build tool & dev server |
| Recharts | Data visualization |
| Lucide React | Icons |
| Google Gemini API | AI analysis & recommendations |
| Flask | Python backend |
| Flask-CORS | Cross-origin requests |
| Gunicorn | WSGI HTTP Server |

---

## 📁 Project Structure

```
CropNurture/
├── components/                  # Reusable UI components
├── data/                        # Data files
├── services/                    # API service layer
├── src/                         # Source files
│   └── types.ts                 # TypeScript types
├── App.tsx                      # Main app component
├── index.html                   # HTML entry point
├── index.tsx                    # React entry point
├── metadata.json                # Project metadata
├── package.json                 # Dependencies
├── requirements.txt             # Python dependencies
├── tsconfig.json                # TypeScript config
├── vite.config.ts               # Vite configuration
└── README.md
```

---

## 📦 Prerequisites

- Node.js (v14.0 or higher)
- Python (v3.8 or higher)
- Git

---

## 🚀 Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/SuganthSS/CropNurture.git
cd CropNurture
```

#### 2. Frontend Setup
```bash
npm install
```

Create a `.env` file in the root directory:
```env
VITE_GEMINI_API_KEY=your_google_gemini_api_key
```

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

#### 3. Backend Setup (Optional)
```bash
pip install -r requirements.txt
python app.py
```

The Flask server will run on `http://localhost:5000`

---

## 📝 Environment Variables

### Frontend `.env`
| Variable | Description |
|---|---|
| `VITE_GEMINI_API_KEY` | Google Gemini API key for AI analysis |

---

## 🔮 Future Roadmap

- [ ] Mobile app (React Native)
- [ ] Real-time soil sensor integration
- [ ] Weather API integration
- [ ] Crop yield prediction
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
