
// Data sourced from provided CSVs for CropNurture AI

export const SOIL_CROP_DATA_CSV = `pH_Value,Nitrogen,Phosphorus,Potassium,Humidity,Crop
6.50,90,42,43,82.00,Rice
7.03,85,58,41,80.31,Rice
7.84,60,55,44,82.32,Rice
6.98,74,35,40,80.15,Rice
7.62,78,42,42,81.60,Rice
5.70,69,55,38,82.63,Rice
5.71,94,53,40,82.89,Rice
6.68,89,54,38,83.53,Rice
5.74,71,54,16,63.69,Maize
6.93,61,44,17,71.57,Maize
6.65,80,43,16,71.59,Maize
6.59,73,58,21,57.68,Maize
7.48,40,72,77,16.98,ChickPea
6.92,23,72,84,17.13,ChickPea
5.99,39,58,85,15.40,ChickPea
5.68,13,60,25,20.59,KidneyBeans
5.75,25,70,16,18.90,KidneyBeans
6.03,3,72,24,57.92,PigeonPeas
5.26,40,59,23,62.73,PigeonPeas
3.69,3,49,18,64.70,MothBeans
4.37,22,59,23,51.27,MothBeans
7.18,19,55,20,87.80,MungBean
7.03,8,54,20,80.77,MungBean
7.45,56,79,15,63.19,Blackgram
7.04,25,62,21,68.13,Blackgram
7.60,32,76,15,63.49,Lentil
7.72,13,61,22,63.27,Lentil
5.92,2,24,38,91.63,Pomegranate
6.80,8,26,36,87.40,Pomegranate
6.14,91,94,46,76.24,Banana
5.84,105,95,50,83.67,Banana
5.95,2,40,27,47.54,Mango
4.75,39,24,31,53.72,Mango
6.11,24,130,195,81.54,Grapes
6.09,13,144,204,82.42,Grapes
6.28,119,25,51,80.92,Watermelon
6.81,119,19,55,83.44,Watermelon
6.77,115,17,55,94.11,Muskmelon
6.52,114,27,48,93.03,Muskmelon
5.52,24,128,196,90.69,Apple
6.13,7,144,197,94.34,Apple
6.35,22,30,12,92.51,Orange
7.51,37,6,13,91.50,Orange
6.79,61,68,50,91.49,Papaya
6.57,58,46,45,90.79,Papaya
6.42,18,30,29,92.86,Coconut
5.74,37,23,28,94.31,Coconut
7.23,133,47,24,79.19,Cotton
6.92,136,36,20,84.86,Cotton
6.00,89,47,38,72.24,Jute
6.03,60,37,39,82.94,Jute
7.26,91,21,26,57.36,Coffee
7.23,107,21,26,55.32,Coffee`;

export const FERTILIZER_DATA_CSV = `Plant,Disease,Purpose,Fertilizer Name,Nutrient Focus,Fertilizer Products
Apple,Apple Scab,Balanced growth,10:10:10 NPK or 12:12:12 NPK,General balanced nutrients for overall tree health,10:10:10 NPK – Tata Rallis / IFFCO / Coromandel
Apple,Apple Scab,Stronger tissues & disease resistance,Muriate of Potash (MOP) or Sulphate of Potash (SOP),Potassium (K) – improves disease resistance and fruit quality,Calcium Nitrate – YaraLiva Tropicote
Apple,Apple Scab,Stronger cell walls,Calcium Nitrate (Ca(NO₃)₂) or Calcium Chloride (CaCl₂),Calcium – strengthens fruit and leaves,Sulphate of Potash (SOP) – Indofil / Nagarjuna
Apple,Black Rot,Balanced tree growth,NPK 10:10:10 or 12:12:12,Provides balanced Nitrogen Phosphorus Potassium,NPK 10:10:10 – IFFCO / Tata Rallis
Apple,Cedar Apple Rust,Overall balanced nutrition,NPK 10:10:10 or 12:12:12,Provides essential nutrients,NPK 10:10:10 – IFFCO / Coromandel
Cherry,Powdery Mildew,Balanced tree growth,NPK 10:10:10,Provides essential nutrients,NPK 10:10:10 – IFFCO
Corn,Common Rust,Balanced crop nutrition,NPK 10:10:10 or 20:20:0 or DAP (18:46:0),Essential N P K,DAP (18:46:0) – IFFCO / Coromandel / Kribhco
Corn,Gray Leaf Spot,Balanced nutrition,DAP (18:46:0) or NPK 20:20:0,Supplies Nitrogen Phosphorus Potassium,DAP (18:46:0) – IFFCO / Coromandel
Grape,Black Rot,Balanced vine nutrition,NPK 12:12:17 + 2 MgO,Provides Nitrogen Phosphorus Potassium,NPK 12:12:17 + 2 MgO – YaraMila Complex / Coromandel
Grape,Esca,Balanced vine growth,NPK 12:12:17 + 2 MgO,Balanced macronutrients,NPK 12:12:17 + 2 MgO – YaraMila Complex
Peach,Bacterial Spot,Balanced tree growth,NPK 10:10:10 or 12:12:17,Balanced nutrition,NPK 12:12:17 – YaraMila Complex
Pepper,Bacterial Spot,Balanced plant growth,NPK 12:12:17 + 2 MgO,Balanced NPK,NPK 12:12:17 – YaraMila / Coromandel
Potato,Early Blight,Balanced vegetative growth,NPK 12:32:16 (basal),Balanced macronutrients,DAP (18:46:0) or NPK 12:32:16
Potato,Late Blight,Strong vegetative growth,NPK 12:32:16 or DAP,Promotes strong root and shoot,NPK 12:32:16 or DAP
Strawberry,Leaf Scorch,Balanced growth,NPK 12:12:17 + 2 MgO,Essential macronutrients,NPK 12:12:17 + 2 MgO – YaraMila
Tomato,Bacterial Spot,Strong root and shoot,NPK 12:32:16 or DAP,Balanced N and P,NPK 12:32:16 – IFFCO / Coromandel
Tomato,Early Blight,Balanced root,NPK 12:32:16,Balanced macronutrients,NPK 12:32:16 – IFFCO
Tomato,Late Blight,Basal fertilizer,NPK 12:32:16 or DAP,Phosphorus for root,NPK 12:32:16 – IFFCO / Coromandel`;

export const DISTRICT_DATA_CSV = `District,Agro Climatic Zone,Major Soils,Cultivated Crops
Ariyalur,Cauvery Delta,"Red Loamy, Alluvium","Rice, Cumbu, Maize, Cashew"
Chengalpattu,North Eastern Zone,"Red Sandy Loam, Clay Loam","Rice, Groundnut, Vegetables"
Coimbatore,Western Zone,"Red Loamy, Black","Sorghum, Pulses, Groundnut, Cotton"
Cuddalore,Cauvery Delta,"Red Loamy, Alluvium","Paddy, Cumbu, Cashew, Jack"
Dharmapuri,North Western Zone,"Non Calcareous Red, Black","Sorghum, Rice, Mango, Tomato"
Dindigul,Hilly,Lateritic,"Sorghum, Pulses, Coffee, Pepper"
Erode,Western Zone,"Red Loamy, Black","Sorghum, Pulses, Turmeric, Tapioca"
Kallakurichi,North Eastern Zone,"Red Sandy Loam","Paddy, Maize, Tapioca"
Kanchipuram,North Eastern Zone,"Red Sandy Loam","Paddy, Ragi, Groundnut, Mango"
Kanyakumari,High Rainfall,"Saline Coastal Alluvium","Rice, Banana, Rubber, Clove"
Karur,Western Zone,"Red Loamy, Black","Sorghum, Pulses, Moringa, Sunflower"
Krishnagiri,North Western Zone,"Red, Black","Sorghum, Rice, Mango, Rose"
Madurai,Southern Zone,"Coastal Alluvium, Black","Rice, Maize, Jasmine, Cotton"
Nagapattinam,Cauvery Delta,"Red Loamy, Alluvium","Rice, Coconut, Cotton"
Namakkal,North Western Zone,"Red, Black","Sorghum, Tapioca, Poultry"
Perambalur,North Western Zone,"Red, Black","Maize, Cotton, Small Onions"
Pudukkottai,Cauvery Delta,"Red Loamy","Rice, Groundnut, Cashew, Eucalyptus"
Ramanathapuram,Southern Zone,"Coastal Alluvium, Black","Rice, Chillies, Cotton"
Ranipet,North Eastern Zone,"Red Sandy Loam","Rice, Groundnut, Leather"
Salem,North Western Zone,"Red, Black","Sorghum, Tapioca, Mango, Coffee"
Sivagangai,Southern Zone,"Red Sandy Soil","Rice, Chillies, Spices"
Tenkasi,Southern Zone,"Red Sandy Soil","Paddy, Maize, Lemon, Mango"
Thanjavur,Cauvery Delta,"Alluvium","Rice, Coconut, Banana"
Theni,Western Zone,"Red Loamy","Rice, Banana, Grapes, Cardamom"
Thirupathur,North Eastern Zone,"Red Sandy Loam","Rice, Coconut, Leather"
Thiruvallur,North Eastern Zone,"Red Sandy Loam","Rice, Groundnut, Mango"
Thiruvarur,Cauvery Delta,"Alluvium","Rice, Pulses, Cotton"
Thoothukudi,Southern Zone,"Black, Red Sandy","Rice, Banana, Chillies"
Tirunelveli,Southern Zone,"Red Sandy, Black","Paddy, Banana, Chillies"
Tiruppur,Western Zone,"Red Loamy, Black","Sorghum, Cotton, Coconut, Knitwear"
Tiruvannamalai,North Eastern Zone,"Red Sandy Loam","Paddy, Groundnut, Flowers"
Trichy,Cauvery Delta,"Alluvium","Rice, Banana, Gem/Jewelry"
Vellore,North Eastern Zone,"Red Sandy Loam","Groundnut, Coconut, Leather"
Villupuram,North Eastern Zone,"Red Sandy Loam","Paddy, Sugarcane, Cashew"
Virudhunagar,Southern Zone,"Black, Red Sandy","Cotton, Chillies, Fireworks"`;
