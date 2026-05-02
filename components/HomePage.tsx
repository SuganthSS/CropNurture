import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

/* ─── Navbar ─── */
const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-terra-100' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-terra-400 to-terra-600 rounded-xl flex items-center justify-center shadow-md">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-white"><path d="M12 21V7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/><path d="M12 13C9 13 6 11.5 6 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/><path d="M12 13C15 13 18 11.5 18 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/><path d="M5 21H19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/></svg>
          </div>
          <span className="text-xl font-display font-extrabold text-terra-900 tracking-tight">CropNurture</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-medium text-gray-600 hover:text-terra-600 transition-colors">Features</a>
          <a href="#how-it-works" className="text-sm font-medium text-gray-600 hover:text-terra-600 transition-colors">How It Works</a>
          <a href="#stats" className="text-sm font-medium text-gray-600 hover:text-terra-600 transition-colors">About</a>
          <Link to="/login" className="text-sm font-semibold text-terra-700 hover:text-terra-500 transition-colors">Login</Link>
          <Link to="/register" className="px-5 py-2 bg-terra-600 text-white text-sm font-bold rounded-full hover:bg-terra-500 transition-all shadow-md shadow-terra-500/20 active:scale-95">Get Started</Link>
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 text-gray-600" aria-label="Menu">
          {menuOpen
            ? <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
            : <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>
          }
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-terra-100 px-4 py-4 space-y-3 animate-fade-in">
          <a href="#features" onClick={() => setMenuOpen(false)} className="block text-sm font-medium text-gray-700 py-2">Features</a>
          <a href="#how-it-works" onClick={() => setMenuOpen(false)} className="block text-sm font-medium text-gray-700 py-2">How It Works</a>
          <a href="#stats" onClick={() => setMenuOpen(false)} className="block text-sm font-medium text-gray-700 py-2">About</a>
          <div className="flex gap-3 pt-2">
            <Link to="/login" className="flex-1 text-center py-2.5 border border-terra-200 text-terra-700 font-semibold text-sm rounded-xl hover:bg-terra-50 transition-all">Login</Link>
            <Link to="/register" className="flex-1 text-center py-2.5 bg-terra-600 text-white font-semibold text-sm rounded-xl hover:bg-terra-500 transition-all">Get Started</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

/* ─── Hero ─── */
const Hero: React.FC = () => (
  <section className="relative min-h-screen flex items-center overflow-hidden bg-terra-50 pt-16">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-[-15%] left-[-10%] w-[55%] h-[55%] rounded-full bg-terra-100/60 blur-[120px]"></div>
      <div className="absolute bottom-[5%] right-[-8%] w-[45%] h-[45%] rounded-full bg-blue-50/50 blur-[100px]"></div>
      <div className="absolute top-[30%] right-[20%] w-[20%] h-[20%] rounded-full bg-terra-200/30 blur-[80px]"></div>
    </div>
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div className="animate-fade-in">
        <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-terra-200 rounded-full px-4 py-1.5 mb-6">
          <span className="w-2 h-2 bg-terra-500 rounded-full animate-pulse"></span>
          <span className="text-xs font-bold text-terra-700 uppercase tracking-wider">AI-Powered Agriculture</span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-terra-950 tracking-tight leading-tight mb-6">
          Grow Smarter,{' '}<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-terra-500 to-terra-700">Harvest Better</span>
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed max-w-lg mb-8">
          AI-powered soil analysis and crop recommendations tailored for farming. Transform your agricultural decisions with real-time diagnostics and intelligent insights.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link to="/register" className="px-8 py-4 bg-terra-600 text-white font-bold rounded-xl shadow-lg shadow-terra-500/25 hover:bg-terra-500 hover:shadow-terra-500/40 hover:-translate-y-0.5 transition-all duration-300 active:scale-95 flex items-center gap-2">
            Start Analysis
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </Link>
          <a href="#features" className="px-8 py-4 bg-white border border-terra-200 text-terra-700 font-bold rounded-xl hover:bg-terra-50 hover:border-terra-300 hover:-translate-y-0.5 transition-all duration-300">
            Learn More
          </a>
        </div>
        <div className="flex items-center gap-6 mt-10 pt-6 border-t border-terra-100">
          {[['22+','Crop Varieties'],['36','Districts Covered'],['100%','AI Accuracy']].map(([n,l],i)=>(
            <div key={i}><span className="text-2xl font-display font-bold text-terra-700">{n}</span><p className="text-xs text-gray-500 font-medium mt-0.5">{l}</p></div>
          ))}
        </div>
      </div>
      <div className="hidden lg:flex justify-center animate-fade-in" style={{animationDelay:'0.2s'}}>
        <div className="relative w-full max-w-md">
          <div className="absolute inset-0 bg-gradient-to-br from-terra-200/40 to-terra-400/20 rounded-[2.5rem] blur-2xl"></div>
          <div className="relative bg-white/70 backdrop-blur-md border border-terra-100 rounded-[2rem] p-8 shadow-soft-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
              <span className="ml-2 text-xs text-gray-400 font-medium">Soil Analysis Preview</span>
            </div>
            {[{l:'pH Level',v:'6.8',p:48,c:'bg-terra-500'},{l:'Nitrogen',v:'85 ppm',p:42,c:'bg-terra-400'},{l:'Phosphorus',v:'42 ppm',p:21,c:'bg-blue-400'},{l:'Potassium',v:'55 ppm',p:27,c:'bg-amber-400'}].map((s,i)=>(
              <div key={i} className="mb-5 last:mb-0">
                <div className="flex justify-between text-xs mb-1.5"><span className="text-gray-500 font-medium">{s.l}</span><span className="text-gray-800 font-bold">{s.v}</span></div>
                <div className="w-full h-2 bg-terra-100 rounded-full overflow-hidden"><div className={`h-full ${s.c} rounded-full transition-all duration-1000`} style={{width:`${s.p}%`}}></div></div>
              </div>
            ))}
            <div className="mt-6 p-4 bg-terra-50 rounded-xl border border-terra-100">
              <p className="text-xs font-bold text-terra-700 uppercase tracking-wider mb-1">AI Recommendation</p>
              <p className="text-sm text-gray-700 font-medium">🌾 Rice — Optimal match for your soil profile</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ─── Features ─── */
const features = [
  {icon:'🔬',title:'Soil Analysis',desc:'Analyze pH, NPK levels, moisture, and organic matter. Our AI identifies optimal crops for your specific soil conditions with precision.'},
  {icon:'🧠',title:'AI Health Scan',desc:'Get personalized crop and soil health recommendations powered by Gemini AI. Real-time insights for pest management and yield prediction.'},
  {icon:'🌦️',title:'Weather-Aware Insights',desc:'Integrated Open-Meteo weather data ensures recommendations account for local climate, rainfall patterns, and seasonal trends.'},
];

const Features: React.FC = () => (
  <section id="features" className="py-24 bg-white relative">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <span className="text-xs font-bold text-terra-600 uppercase tracking-widest">What We Offer</span>
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-terra-950 mt-3 mb-4">Intelligent Farming Tools</h2>
        <p className="text-gray-500 max-w-2xl mx-auto">Everything you need to make data-driven agricultural decisions, powered by cutting-edge AI technology.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((f,i)=>(
          <div key={i} className="group bg-white/80 backdrop-blur-sm border border-terra-100 rounded-2xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-terra-200 transition-all duration-300">
            <div className="w-14 h-14 bg-terra-50 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">{f.icon}</div>
            <h3 className="text-xl font-display font-bold text-terra-900 mb-3">{f.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ─── How It Works ─── */
const steps = [
  {n:'01',icon:'👤',title:'Sign Up',desc:'Create your free account with email and password in seconds.'},
  {n:'02',icon:'📊',title:'Provide Soil Data',desc:'Input your soil properties using our intuitive slider interface or auto-fill with location.'},
  {n:'03',icon:'⚡',title:'AI Analysis',desc:'Our hybrid KNN + Gemini AI engine processes your data and generates precise recommendations.'},
  {n:'04',icon:'📈',title:'Get Results',desc:'View detailed crop recommendations, planting guides, pest management, and market trends.'},
];

const HowItWorks: React.FC = () => (
  <section id="how-it-works" className="py-24 bg-terra-50 relative">
    <div className="absolute inset-0 pointer-events-none"><div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div></div>
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="text-center mb-16">
        <span className="text-xs font-bold text-terra-600 uppercase tracking-widest">Simple Process</span>
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-terra-950 mt-3 mb-4">How It Works</h2>
        <p className="text-gray-500 max-w-xl mx-auto">From sign-up to harvest insights in four simple steps.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((s,i)=>(
          <div key={i} className="relative bg-white border border-terra-100 rounded-2xl p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            {i < steps.length-1 && <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-terra-200"></div>}
            <div className="w-12 h-12 bg-terra-600 text-white rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-4 shadow-md">{s.n}</div>
            <span className="text-2xl block mb-3">{s.icon}</span>
            <h3 className="font-display font-bold text-terra-900 mb-2">{s.title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ─── Stats ─── */
const Stats: React.FC = () => (
  <section id="stats" className="py-24 bg-white">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <span className="text-xs font-bold text-terra-600 uppercase tracking-widest">Our Dataset</span>
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-terra-950 mt-3 mb-4">Backed by Real Data</h2>
        <p className="text-gray-500 max-w-xl mx-auto">Our AI is trained on comprehensive agricultural datasets covering crops, fertilizers, and regional data.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          {n:'22+',l:'Crop Varieties',d:'From Rice to Coffee, our dataset covers major crops grown across diverse agro-climatic zones.',icon:'🌾'},
          {n:'18',l:'Fertilizer Protocols',d:'Specific nutrient management and pest control products from leading Indian agricultural brands.',icon:'🧪'},
          {n:'36',l:'Tamil Nadu Districts',d:'Location-specific agricultural data covering all agro-climatic zones with soil and crop profiles.',icon:'📍'},
        ].map((s,i)=>(
          <div key={i} className="bg-terra-50/50 border border-terra-100 rounded-2xl p-8 text-center hover:shadow-md transition-all">
            <span className="text-3xl block mb-3">{s.icon}</span>
            <span className="text-4xl font-display font-extrabold text-terra-700">{s.n}</span>
            <h3 className="font-bold text-terra-900 mt-2 mb-2">{s.l}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">{s.d}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ─── Testimonial ─── */
const Testimonial: React.FC = () => (
  <section className="py-20 bg-terra-50">
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div className="bg-white/80 backdrop-blur-sm border border-terra-100 rounded-3xl p-10 shadow-sm">
        <svg className="w-10 h-10 text-terra-300 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
        <p className="text-lg text-gray-700 leading-relaxed italic mb-6">"CropNurture's soil analysis helped me switch from traditional guesswork to data-driven farming. My rice yield improved by 30% in just one season. The AI recommendations were spot-on for my soil conditions."</p>
        <div><p className="font-bold text-terra-800">Ravi Shankar</p><p className="text-sm text-gray-500">Rice Farmer, Thanjavur District</p></div>
      </div>
    </div>
  </section>
);

/* ─── CTA ─── */
const CTA: React.FC = () => (
  <section className="py-24 bg-gradient-to-br from-terra-100 to-terra-50 relative overflow-hidden">
    <div className="absolute inset-0 pointer-events-none"><div className="absolute top-[-20%] right-[-10%] w-[40%] h-[40%] bg-terra-200/40 rounded-full blur-[100px]"></div></div>
    <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
      <h2 className="text-3xl sm:text-4xl font-display font-bold text-terra-950 mb-4">Ready to Transform Your Farm?</h2>
      <p className="text-gray-600 mb-8 text-lg">Start your free soil analysis today. No credit card required.</p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link to="/register" className="px-10 py-4 bg-terra-600 text-white font-bold rounded-xl shadow-lg shadow-terra-500/25 hover:bg-terra-500 hover:shadow-terra-500/40 hover:-translate-y-0.5 transition-all duration-300 active:scale-95 text-lg">
          Get Started Free
        </Link>
        <Link to="/login" className="text-terra-600 font-semibold hover:text-terra-500 transition-colors">Already have an account? →</Link>
      </div>
    </div>
  </section>
);

/* ─── Footer ─── */
const FooterSection: React.FC = () => (
  <footer className="bg-terra-950 text-white py-16">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-terra-400 to-terra-600 rounded-lg flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white"><path d="M12 21V7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/><path d="M12 13C9 13 6 11.5 6 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/><path d="M12 13C15 13 18 11.5 18 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/></svg>
            </div>
            <span className="font-display font-bold text-lg">CropNurture</span>
          </div>
          <p className="text-terra-300/60 text-sm leading-relaxed">AI-powered agricultural intelligence for smarter farming decisions.</p>
        </div>
        <div>
          <h4 className="font-bold text-sm uppercase tracking-wider text-terra-400 mb-4">Product</h4>
          <ul className="space-y-2 text-sm text-terra-300/70">
            <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
            <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
            <li><Link to="/register" className="hover:text-white transition-colors">Get Started</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-sm uppercase tracking-wider text-terra-400 mb-4">Resources</h4>
          <ul className="space-y-2 text-sm text-terra-300/70">
            <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
            <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
            <li><a href="#stats" className="hover:text-white transition-colors">Dataset Info</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-sm uppercase tracking-wider text-terra-400 mb-4">Contact</h4>
          <ul className="space-y-2 text-sm text-terra-300/70">
            <li>support@cropnurture.ai</li>
            <li><a href="https://github.com/SuganthSS/CropNurture" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-terra-800/50 pt-8 text-center text-sm text-terra-300/40">
        <p>&copy; {new Date().getFullYear()} CropNurture AI. All Rights Reserved.</p>
        <p className="mt-1">Disclaimer: Recommendations are AI-generated and should be used for informational purposes only.</p>
      </div>
    </div>
  </footer>
);

/* ─── Main HomePage ─── */
const HomePage: React.FC = () => (
  <div className="min-h-screen overflow-x-hidden bg-terra-50 selection:bg-terra-200 selection:text-terra-900">
    <Navbar />
    <Hero />
    <Features />
    <HowItWorks />
    <Stats />
    <Testimonial />
    <CTA />
    <FooterSection />
  </div>
);

export default HomePage;
