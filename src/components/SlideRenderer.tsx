import React from 'react';
import { motion } from 'motion/react';
import { Slide } from '../types';
import { 
  ShieldCheck, Stethoscope, Users, CalendarRange, 
  Settings2, Heart, Award, ArrowUpRight, Zap, 
  MapPin, CheckCircle2, Check, Phone, Globe, Mail,
  Sparkles, Activity, FileText, Share2, BarChart3, Wrench, Star
} from 'lucide-react';

interface SlideRendererProps {
  key?: any;
  slide: Slide;
  orthodonticsClinicUrl: string;
  patientInteractionUrl: string;
  dentistPortraitUrl: string;
}

export default function SlideRenderer({ 
  slide, 
  orthodonticsClinicUrl, 
  patientInteractionUrl, 
  dentistPortraitUrl 
}: SlideRendererProps) {
  
  // Transition configurations
  const slideVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  // Helper to split bullet text on colon (":") for bold titles
  const formatBullet = (bullet: string) => {
    const parts = bullet.split(':');
    if (parts.length > 1) {
      return (
        <span>
          <strong className="text-slate-900 font-display font-semibold">{parts[0]}:</strong>
          {parts.slice(1).join(':')}
        </span>
      );
    }
    return <span>{bullet}</span>;
  };

  // Switch layouts dynamically
  const renderSlideContent = () => {
    switch (slide.layoutType) {
      case 'title':
        return (
          <div className="relative w-full h-full min-h-[360px] sm:min-h-[400px] md:min-h-[460px] rounded-2xl overflow-hidden flex flex-col justify-between p-5 sm:p-8 md:p-12 text-white shadow-lg">
            {/* Background Image with elegant overlay */}
            <div className="absolute inset-0 z-0">
              <img 
                src={orthodonticsClinicUrl} 
                alt="Orthodontics Clinic Background" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter brightness-[0.25] contrast-[1.1]"
              />
              {/* Emerald Green and Cobalt Blue ambient glow spots */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl"></div>
            </div>

            {/* "100% Success" badge in top right corner */}
            <div className="absolute top-6 right-6 z-10">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
                className="bg-emerald-500 text-slate-950 px-3.5 py-1.5 rounded-full font-display font-extrabold text-xs tracking-wider uppercase flex items-center gap-1.5 shadow-lg border border-emerald-400"
              >
                <Award size={14} className="animate-spin" style={{ animationDuration: '6s' }} />
                <span>100% Care Success</span>
              </motion.div>
            </div>

            {/* Metadata (Top Left) */}
            <div className="z-10 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-mono text-xs tracking-widest text-slate-300 font-semibold uppercase">Proposal Presentation</span>
            </div>

            {/* Titles & Subtitles (Centered content with bottom alignment) */}
            <div className="z-10 mt-auto flex flex-col gap-4 max-w-2xl">
              <div className="bg-emerald-500/10 border border-emerald-400/20 backdrop-blur-md px-3 py-1 rounded-md text-emerald-300 text-xs font-semibold w-fit">
                Orthodontic Innovation Pitch
              </div>
              
              <h1 className="font-display font-black text-3xl md:text-5xl leading-none text-white tracking-tight drop-shadow-md">
                {slide.title}
              </h1>
              
              {slide.subtitle && (
                <p className="font-sans text-slate-300 text-sm md:text-lg leading-relaxed font-medium">
                  {slide.subtitle}
                </p>
              )}
            </div>

            {/* Presentation Details Footer (Bottom) */}
            <div className="z-10 mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs text-slate-400">
              <div className="flex flex-col gap-0.5">
                <span className="font-display font-bold text-slate-100">{slide.content[0]}</span>
                <span className="font-mono text-[10px]">{slide.content[1]} | {slide.content[2]}</span>
              </div>
              <div className="bg-slate-800/80 border border-slate-700/50 backdrop-blur px-3 py-1.5 rounded-lg text-slate-300 text-[10px] font-mono">
                Slide {slide.id} of 9
              </div>
            </div>
          </div>
        );

      case 'summary':
        return (
          <div className="w-full flex flex-col h-full min-h-[360px] sm:min-h-[400px] md:min-h-[460px] justify-between p-5 sm:p-8 md:p-12 bg-white rounded-2xl border border-slate-100 shadow-md">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <div>
                  <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded uppercase tracking-wider">
                    {slide.subtitle}
                  </span>
                  <h2 className="font-display font-extrabold text-2xl md:text-3xl text-slate-900 tracking-tight mt-1.5">{slide.title}</h2>
                </div>
                <div className="bg-blue-50 text-blue-600 p-2.5 rounded-xl">
                  <Stethoscope size={22} />
                </div>
              </div>

              {/* Vision Blocks */}
              <motion.div 
                variants={containerVariants} 
                initial="initial"
                animate="animate"
                className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6"
              >
                {slide.content.map((item, idx) => (
                  <motion.div 
                    key={idx} 
                    variants={itemVariants}
                    className="bg-[#FAFAF9] p-5 rounded-xl border border-slate-200/60 shadow-sm flex flex-col justify-between min-h-[160px] hover:border-emerald-200 transition-all group"
                  >
                    <div>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center font-display font-bold text-xs bg-emerald-100 text-emerald-800 mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                        0{idx + 1}
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed font-medium">
                        {formatBullet(item)}
                      </p>
                    </div>
                    <span className="text-[10px] font-semibold text-slate-400 group-hover:text-emerald-600 transition flex items-center gap-1 mt-4">
                      Strategic Focus <ArrowUpRight size={10} />
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Slide Footer */}
            <div className="flex justify-between items-center text-slate-400 text-[10px] mt-8 pt-4 border-t border-slate-100 font-mono">
              <span>Prepared for F & J Board</span>
              <span>Slide {slide.id} of 9</span>
            </div>
          </div>
        );

      case 'bullets':
        return (
          <div className="w-full flex flex-col h-full min-h-[360px] sm:min-h-[400px] md:min-h-[460px] justify-between p-5 sm:p-8 md:p-12 bg-white rounded-2xl border border-slate-100 shadow-md">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <div>
                  <span className="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded uppercase tracking-wider">
                    {slide.subtitle}
                  </span>
                  <h2 className="font-display font-extrabold text-2xl md:text-3xl text-slate-900 tracking-tight mt-1.5">{slide.title}</h2>
                </div>
                <div className="bg-emerald-50 text-emerald-600 p-2.5 rounded-xl">
                  <ShieldCheck size={22} />
                </div>
              </div>

              {/* Requirement Cards */}
              <motion.div 
                variants={containerVariants} 
                initial="initial"
                animate="animate"
                className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"
              >
                {slide.content.map((item, idx) => (
                  <motion.div 
                    key={idx} 
                    variants={itemVariants}
                    className="p-4 bg-[#FAFAF9] border border-slate-200/60 rounded-xl shadow-sm hover:border-blue-200 transition-all flex gap-3.5"
                  >
                    <div className="bg-blue-50 text-blue-600 p-2 rounded-lg h-fit">
                      {idx === 0 && <Users size={16} />}
                      {idx === 1 && <CalendarRange size={16} />}
                      {idx === 2 && <Award size={16} />}
                      {idx === 3 && <ShieldCheck size={16} />}
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 leading-relaxed font-medium">
                        {formatBullet(item)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Slide Footer */}
            <div className="flex justify-between items-center text-slate-400 text-[10px] mt-8 pt-4 border-t border-slate-100 font-mono">
              <span>Verified Requirements Grid</span>
              <span>Slide {slide.id} of 9</span>
            </div>
          </div>
        );

      case 'split':
        return (
          <div className="w-full flex flex-col h-full min-h-[360px] sm:min-h-[400px] md:min-h-[460px] justify-between p-5 sm:p-8 md:p-12 bg-white rounded-2xl border border-slate-100 shadow-md">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <div>
                  <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded uppercase tracking-wider">
                    {slide.subtitle}
                  </span>
                  <h2 className="font-display font-extrabold text-2xl md:text-3xl text-slate-900 tracking-tight mt-1.5">{slide.title}</h2>
                </div>
                <div className="bg-slate-100 text-slate-700 p-2.5 rounded-xl">
                  <Globe size={22} />
                </div>
              </div>

              {/* Split Content */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                {/* Left Side: Website Pages */}
                <div className="bg-emerald-50/40 border border-emerald-100 rounded-xl p-5">
                  <h4 className="font-display font-bold text-sm text-emerald-950 mb-3 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></span>
                    Proposed Website Pages
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] sm:text-xs">
                    {slide.content[0].replace('Website Pages: ', '').split(', ').map((page, pIdx) => (
                      <div key={pIdx} className="flex items-center gap-1.5 bg-white border border-emerald-100 p-2 rounded shadow-sm text-slate-700">
                        <Check size={11} className="text-emerald-600" />
                        <span>{page}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Side: Interactive Modules */}
                <div className="bg-blue-50/40 border border-blue-100 rounded-xl p-5">
                  <h4 className="font-display font-bold text-sm text-blue-950 mb-3 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-blue-500 rounded-full"></span>
                    Interactive Integration Modules
                  </h4>
                  <div className="flex flex-col gap-2.5 text-xs">
                    {slide.content[1].replace('Interactive Modules: ', '').split(', ').map((mod, mIdx) => (
                      <div key={mIdx} className="flex items-center justify-between bg-white border border-blue-100 p-2.5 rounded shadow-sm text-slate-700">
                        <span className="font-semibold">{mod}</span>
                        <span className="text-[9px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                          Active API
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Slide Footer */}
            <div className="flex justify-between items-center text-slate-400 text-[10px] mt-8 pt-4 border-t border-slate-100 font-mono">
              <span>Proposed Digital Architecture</span>
              <span>Slide {slide.id} of 9</span>
            </div>
          </div>
        );

      case 'two-column':
        const patientFeatures = slide.content.slice(1, 5);
        const adminFeatures = slide.content.slice(6);

        return (
          <div className="w-full flex flex-col h-full min-h-[360px] sm:min-h-[400px] md:min-h-[460px] justify-between p-5 sm:p-8 md:p-12 bg-white rounded-2xl border border-slate-100 shadow-md">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <div>
                  <span className="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded uppercase tracking-wider">
                    {slide.subtitle}
                  </span>
                  <h2 className="font-display font-extrabold text-2xl md:text-3xl text-slate-900 tracking-tight mt-1.5">{slide.title}</h2>
                </div>
                <div className="bg-blue-50 text-blue-600 p-2.5 rounded-xl">
                  <Settings2 size={22} />
                </div>
              </div>

              {/* Two Column Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                {/* Column 1: Patient Experience */}
                <div className="flex flex-col gap-3">
                  <h4 className="font-display font-bold text-xs uppercase tracking-wider text-emerald-600 flex items-center gap-1.5">
                    <CheckCircle2 size={13} /> {slide.content[0]}
                  </h4>
                  <div className="flex flex-col gap-2">
                    {patientFeatures.map((feat, idx) => (
                      <div key={idx} className="flex gap-2 text-xs bg-[#FAFAF9] border border-slate-150 p-2.5 rounded-lg text-slate-700">
                        <span className="text-emerald-500 font-bold shrink-0">✓</span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Column 2: Admin Control */}
                <div className="flex flex-col gap-3">
                  <h4 className="font-display font-bold text-xs uppercase tracking-wider text-blue-600 flex items-center gap-1.5">
                    <Settings2 size={13} /> {slide.content[5]}
                  </h4>
                  <div className="flex flex-col gap-2">
                    {adminFeatures.map((feat, idx) => (
                      <div key={idx} className="flex gap-2 text-xs bg-[#FAFAF9] border border-slate-150 p-2.5 rounded-lg text-slate-700">
                        <span className="text-blue-500 font-bold shrink-0">⚙</span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Slide Footer */}
            <div className="flex justify-between items-center text-slate-400 text-[10px] mt-8 pt-4 border-t border-slate-100 font-mono">
              <span>Operational Capabilities Breakdown</span>
              <span>Slide {slide.id} of 9</span>
            </div>
          </div>
        );

      case 'conclusion':
        return (
          <div className="w-full flex flex-col h-full min-h-[360px] sm:min-h-[400px] md:min-h-[460px] justify-between p-5 sm:p-8 md:p-12 bg-white rounded-2xl border border-slate-100 shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              {/* Text Area (7 cols) */}
              <div className="md:col-span-7 flex flex-col gap-4">
                <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded uppercase tracking-wider w-fit">
                  {slide.subtitle}
                </span>
                
                <h2 className="font-display font-extrabold text-2xl md:text-4xl text-slate-900 tracking-tight leading-tight">
                  {slide.title}
                </h2>

                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {slide.content[0]}
                </p>

                {/* Main CTA Block */}
                <div className="bg-emerald-50/70 border border-emerald-100 p-4 rounded-xl mt-2 flex items-center gap-3">
                  <CheckCircle2 size={22} className="text-emerald-600 shrink-0" />
                  <p className="text-xs font-display font-bold text-emerald-950">
                    "{slide.content[1].replace("Call to Action: ", "")}"
                  </p>
                </div>

                {/* Interactive Contact cards */}
                <div className="flex flex-col gap-2 mt-2 w-full">
                  <a 
                    href={`https://${slide.content[2].replace('Website: ', '')}`} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex items-center gap-2.5 border border-slate-200 hover:border-emerald-500 p-2.5 rounded-lg text-slate-700 hover:bg-slate-50 transition"
                  >
                    <Globe size={14} className="text-emerald-600 shrink-0" />
                    <span className="text-xs font-semibold text-slate-800">
                      Website: <span className="text-emerald-600 underline">{slide.content[2].replace('Website: ', '')}</span>
                    </span>
                  </a>
                  <a 
                    href={`mailto:${slide.content[3].replace('Contact Email: ', '')}`} 
                    className="flex items-center gap-2.5 border border-slate-200 hover:border-blue-500 p-2.5 rounded-lg text-slate-700 hover:bg-slate-50 transition"
                  >
                    <Mail size={14} className="text-blue-600 shrink-0" />
                    <span className="text-xs font-semibold text-slate-800">
                      Email: <span className="text-blue-600 underline">{slide.content[3].replace('Contact Email: ', '')}</span>
                    </span>
                  </a>
                  <a 
                    href={`tel:${slide.content[4] ? slide.content[4].replace('Phone: ', '') : '03390088458'}`} 
                    className="flex items-center gap-2.5 border border-slate-200 hover:border-teal-500 p-2.5 rounded-lg text-slate-700 hover:bg-slate-50 transition"
                  >
                    <Phone size={14} className="text-teal-600 shrink-0" />
                    <span className="text-xs font-semibold text-slate-800">
                      Phone: <span className="text-teal-600 underline">{slide.content[4] ? slide.content[4].replace('Phone: ', '') : '03390088458'}</span>
                    </span>
                  </a>
                </div>
              </div>

              {/* Image Area with Badge overlay (5 cols) */}
              <div className="md:col-span-5 relative h-48 sm:h-56 md:h-64 bg-slate-100 rounded-2xl overflow-hidden shadow-md flex items-center justify-center">
                <img 
                  src={patientInteractionUrl} 
                  alt="Doctor Patient Smile Interaction" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter contrast-[1.05]"
                />
                
                {/* Large checkmark trust badge */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 right-4 bg-emerald-500 text-white p-2.5 rounded-full shadow-lg border-2 border-white flex items-center justify-center animate-bounce" style={{ animationDuration: '4s' }}>
                  <CheckCircle2 size={24} />
                </div>
              </div>

            </div>

            {/* Slide Footer */}
            <div className="flex justify-between items-center text-slate-400 text-[10px] mt-8 pt-4 border-t border-slate-100 font-mono">
              <span>F&J Orthodontics Partner Pitch</span>
              <span>Slide {slide.id} of 9</span>
            </div>
          </div>
        );

      case 'marketing-plan':
        return (
          <div className="w-full flex flex-col h-full min-h-[360px] sm:min-h-[400px] md:min-h-[460px] justify-between p-5 sm:p-8 md:p-12 bg-white rounded-2xl border border-slate-100 shadow-md">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-5 pb-4 border-b border-slate-100">
                <div>
                  <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded uppercase tracking-wider">
                    Patient Acquisition • Brand Awareness • Local Search Visibility
                  </span>
                  <h2 className="font-display font-extrabold text-2xl md:text-3xl text-slate-900 tracking-tight mt-1.5">{slide.title}</h2>
                </div>
                <div className="bg-[#1D4ED8]/10 text-blue-600 p-2.5 rounded-xl">
                  <Globe size={22} />
                </div>
              </div>

              {/* 6 Bento Grid Cards */}
              <motion.div 
                variants={containerVariants} 
                initial="initial"
                animate="animate"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3"
              >
                {/* Card 1: Social Media Presence */}
                <motion.div 
                  variants={itemVariants}
                  className="p-4 rounded-xl border border-slate-200/60 bg-[#FAFAF9] hover:border-emerald-200 transition-all shadow-sm flex flex-col justify-between group hover:shadow-md hover:scale-[1.01] duration-200"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-emerald-600 bg-emerald-50 p-1.5 rounded-lg">
                        <Users size={16} />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-slate-300 group-hover:text-emerald-500 transition-colors">01</span>
                    </div>
                    <h4 className="font-display font-bold text-xs text-slate-900 mb-2">Professional Social Media Presence</h4>
                    <ul className="space-y-1">
                      {["Facebook & Instagram Management", "Google Business Profile Optimization", "Professional Brand Positioning", "Content Scheduling & Community Engagement", "Consistent Clinic Branding"].map((bullet, idx) => (
                        <li key={idx} className="text-[10px] text-slate-600 flex items-center gap-1.5">
                          <span className="w-1 h-1 bg-emerald-500 rounded-full shrink-0"></span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>

                {/* Card 2: Content Marketing Strategy */}
                <motion.div 
                  variants={itemVariants}
                  className="p-4 rounded-xl border border-slate-200/60 bg-[#FAFAF9] hover:border-emerald-200 transition-all shadow-sm flex flex-col justify-between group hover:shadow-md hover:scale-[1.01] duration-200"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-emerald-600 bg-emerald-50 p-1.5 rounded-lg">
                        <Heart size={16} />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-slate-300 group-hover:text-emerald-500 transition-colors">02</span>
                    </div>
                    <h4 className="font-display font-bold text-xs text-slate-900 mb-2">Content Marketing Strategy</h4>
                    <ul className="space-y-1">
                      {["Educational Health Content", "Patient Awareness Campaigns", "Monthly Content Calendar", "Health Tips & Medical Updates", "Engagement & Trust Building"].map((bullet, idx) => (
                        <li key={idx} className="text-[10px] text-slate-600 flex items-center gap-1.5">
                          <span className="w-1 h-1 bg-emerald-500 rounded-full shrink-0"></span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>

                {/* Card 3: Local SEO */}
                <motion.div 
                  variants={itemVariants}
                  className="p-4 rounded-xl border border-slate-200/60 bg-[#FAFAF9] hover:border-emerald-200 transition-all shadow-sm flex flex-col justify-between group hover:shadow-md hover:scale-[1.01] duration-200"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-emerald-600 bg-emerald-50 p-1.5 rounded-lg">
                        <MapPin size={16} />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-slate-300 group-hover:text-emerald-500 transition-colors">03</span>
                    </div>
                    <h4 className="font-display font-bold text-xs text-slate-900 mb-2">Local SEO</h4>
                    <ul className="space-y-1">
                      {["Google Maps Ranking", "Local Keyword Optimization", "Google Business Profile Management", "Review & Reputation Strategy", "Location-Based Search Optimization"].map((bullet, idx) => (
                        <li key={idx} className="text-[10px] text-slate-600 flex items-center gap-1.5">
                          <span className="w-1 h-1 bg-emerald-500 rounded-full shrink-0"></span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>

                {/* Card 4: SEO, AEO, GEO */}
                <motion.div 
                  variants={itemVariants}
                  className="p-4 rounded-xl border border-slate-200/60 bg-[#FAFAF9] hover:border-emerald-200 transition-all shadow-sm flex flex-col justify-between group hover:shadow-md hover:scale-[1.01] duration-200"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-emerald-600 bg-emerald-50 p-1.5 rounded-lg">
                        <Globe size={16} />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-slate-300 group-hover:text-emerald-500 transition-colors">04</span>
                    </div>
                    <h4 className="font-display font-bold text-xs text-slate-900 mb-1">SEO • AEO • GEO Optimization</h4>
                    <p className="text-[9px] text-slate-400 mb-1.5">Optimize clinic for visibility on AI-driven engines:</p>
                    <div className="grid grid-cols-2 gap-x-1 gap-y-0.5 text-[9px] font-medium text-slate-700">
                      <span>✓ SEO (Search Engines)</span>
                      <span>✓ AEO (Answer Engines)</span>
                      <span>✓ GEO (Generative Engines)</span>
                      <span>✓ Google AI Overview</span>
                      <span>✓ ChatGPT, Gemini & Claude</span>
                      <span>✓ Perplexity AI</span>
                      <span className="col-span-2">✓ Voice Search Optimization</span>
                    </div>
                  </div>
                </motion.div>

                {/* Card 5: Paid Advertising Management */}
                <motion.div 
                  variants={itemVariants}
                  className="p-4 rounded-xl border border-slate-200/60 bg-[#FAFAF9] hover:border-emerald-200 transition-all shadow-sm flex flex-col justify-between group hover:shadow-md hover:scale-[1.01] duration-200"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-emerald-600 bg-emerald-50 p-1.5 rounded-lg">
                        <ArrowUpRight size={16} />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-slate-300 group-hover:text-emerald-500 transition-colors">05</span>
                    </div>
                    <h4 className="font-display font-bold text-xs text-slate-900 mb-2">Paid Advertising Management</h4>
                    <ul className="space-y-1 mb-2">
                      {["Meta (Facebook & Instagram) Ads", "Google PPC Ads Management", "Appointment & Lead Campaigns", "Audience Retargeting & Optimization"].map((bullet, idx) => (
                        <li key={idx} className="text-[10px] text-slate-600 flex items-center gap-1.5">
                          <span className="w-1 h-1 bg-emerald-500 rounded-full shrink-0"></span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                    <span className="text-[9px] block text-amber-600 font-medium bg-amber-50 p-1 rounded border border-amber-100 mt-1 leading-tight">
                      Ad budget is separate & paid directly by client.
                    </span>
                  </div>
                </motion.div>

                {/* Card 6: Analytics & Performance Tracking */}
                <motion.div 
                  variants={itemVariants}
                  className="p-4 rounded-xl border border-slate-200/60 bg-[#FAFAF9] hover:border-emerald-200 transition-all shadow-sm flex flex-col justify-between group hover:shadow-md hover:scale-[1.01] duration-200"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-emerald-600 bg-emerald-50 p-1.5 rounded-lg">
                        <Award size={16} />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-slate-300 group-hover:text-emerald-500 transition-colors">06</span>
                    </div>
                    <h4 className="font-display font-bold text-xs text-slate-900 mb-2">Analytics & Performance</h4>
                    <ul className="space-y-1">
                      {["Google Analytics & Search Console", "Monthly Performance Reports", "Website Traffic & Click Monitoring", "Calls & WhatsApp Tracking", "Appointment Conversion Analysis", "ROI Performance Review"].map((bullet, idx) => (
                        <li key={idx} className="text-[10px] text-slate-600 flex items-center gap-1.5">
                          <span className="w-1 h-1 bg-emerald-500 rounded-full shrink-0"></span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </motion.div>

              {/* Creative Content Notice Box */}
              <div className="mt-4 p-4 rounded-xl border border-blue-100 bg-blue-50/50 flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded uppercase">Creative Content Notice</span>
                  </div>
                  <p className="text-[11px] text-slate-700 leading-relaxed">
                    Graphic designs, social media posts, reels, video editing, banners, posters, and other creative assets are not included in the Digital Marketing Management package. If MetaWave Innovations creates these assets, choose one of our optional creative packages:
                  </p>
                </div>
                <div className="flex gap-2.5 sm:gap-3 shrink-0 flex-wrap sm:flex-nowrap justify-center">
                  <div className="bg-white border border-slate-200 p-2.5 rounded-lg text-center shadow-xs">
                    <span className="block text-[8px] uppercase tracking-wider font-bold text-slate-400">Classic Package</span>
                    <strong className="block text-xs text-blue-700 font-display">PKR 12,000 / mo</strong>
                  </div>
                  <div className="bg-white border border-blue-200 p-2.5 rounded-lg text-center shadow-xs relative overflow-hidden">
                    <span className="block text-[8px] uppercase tracking-wider font-bold text-emerald-600">Ultimate Package</span>
                    <strong className="block text-xs text-emerald-700 font-display">PKR 20,000 / mo</strong>
                  </div>
                </div>
              </div>

              {/* Goal Highlight Banner */}
              <div className="mt-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-3.5 rounded-xl flex items-center gap-2.5 shadow-md border border-emerald-400/20">
                <CheckCircle2 size={18} className="text-emerald-100 shrink-0" />
                <p className="text-[10px] sm:text-[11px] font-display font-semibold">
                  Goal: Build a strong digital foundation that increases online visibility, strengthens patient trust, improves local Google rankings, and consistently generates qualified appointment enquiries.
                </p>
              </div>
            </div>

            {/* Slide Footer */}
            <div className="flex justify-between items-center text-slate-400 text-[10px] mt-6 pt-3 border-t border-slate-100 font-mono">
              <span>MetaWave Innovations • Digital Growth Foundation</span>
              <span>Slide {slide.id} of 9</span>
            </div>
          </div>
        );

      case 'management-plan':
        return (
          <div className="w-full flex flex-col h-full min-h-[360px] sm:min-h-[400px] md:min-h-[460px] justify-between p-5 sm:p-8 md:p-12 bg-white rounded-2xl border border-slate-100 shadow-md">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-5 pb-4 border-b border-slate-100">
                <div>
                  <span className="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded uppercase tracking-wider">
                    Long-Term Growth Partnership
                  </span>
                  <h2 className="font-display font-extrabold text-2xl md:text-3xl text-slate-900 tracking-tight mt-1.5">{slide.title}</h2>
                </div>
                <div className="bg-blue-50 text-blue-600 p-2.5 rounded-xl">
                  <ShieldCheck size={22} />
                </div>
              </div>

              {/* Grid split content into 3 columns on desktop */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-2">
                
                {/* Column 1: Digital Growth Management Checklist */}
                <div className="p-4 rounded-xl border border-slate-200/60 bg-white shadow-sm hover:border-emerald-300 transition-all">
                  <div className="flex justify-between items-start border-b border-slate-100 pb-2 mb-2">
                    <div>
                      <h4 className="font-display font-extrabold text-xs text-slate-900">Digital Growth Management</h4>
                      <p className="text-[9px] text-slate-400">Complete monthly marketing management</p>
                    </div>
                    <div className="text-right">
                      <span className="font-display font-extrabold text-xs text-emerald-600">PKR 20,000</span>
                      <span className="block text-[8px] text-slate-400">/ month</span>
                    </div>
                  </div>
                  <div className="space-y-1 max-h-[175px] overflow-y-auto pr-1">
                    {[
                      "Social Media Management",
                      "SEO Maintenance",
                      "Local SEO Optimization",
                      "AEO (Answer Engine Optimization)",
                      "GEO (Generative Engine Optimization)",
                      "Google Business Profile Management",
                      "Website Maintenance & Monitoring",
                      "Meta Ads Management",
                      "Google PPC Ads Management",
                      "Monthly Performance Reports",
                      "Lead & Appointment Tracking",
                      "Campaign Optimization & Tech Support"
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[9px] text-slate-700">
                        <span className="text-emerald-500 font-bold shrink-0">✓</span>
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-[8px] text-slate-400 mt-2 bg-slate-50 p-1 rounded text-center">
                    Advertising budget is paid separately by client.
                  </p>
                </div>

                {/* Column 2: Optional Creative Content Production */}
                <div className="p-4 rounded-xl border border-slate-200/60 bg-white shadow-sm flex flex-col justify-between hover:border-blue-300 transition-all">
                  <div>
                    <h4 className="font-display font-extrabold text-xs text-slate-900 mb-1">Optional Creative Production</h4>
                    <p className="text-[8px] text-slate-400 mb-2">Choose the option that suits your branding needs:</p>
                    
                    {/* Classic package */}
                    <div className="bg-[#FAFAF9] border border-slate-100 rounded-lg p-2 mb-1.5 hover:bg-slate-50/50">
                      <div className="flex justify-between items-center mb-0.5">
                        <span className="font-bold text-[10px] text-slate-900">Classic Package</span>
                        <span className="text-[9px] font-bold text-blue-600">PKR 12K/mo</span>
                      </div>
                      <p className="text-[8px] text-slate-500 leading-tight">
                        Post designs, Story/Carousel, up to 3 Reels & 3 Edited Videos / month.
                      </p>
                    </div>

                    {/* Ultimate package */}
                    <div className="bg-[#FAFAF9] border border-emerald-100 rounded-lg p-2 mb-1.5 hover:bg-emerald-50/20">
                      <div className="flex justify-between items-center mb-0.5">
                        <span className="font-bold text-[10px] text-slate-900">Ultimate Package</span>
                        <span className="text-[9px] font-bold text-emerald-600">PKR 20K/mo</span>
                      </div>
                      <p className="text-[8px] text-slate-500 leading-tight">
                        Classic package + Premium graphic designs, up to 5 Reels & 5 Edited Videos / month.
                      </p>
                    </div>

                    {/* Doctor Provides Assets Option */}
                    <div className="bg-blue-50/40 border border-blue-100 rounded-lg p-2">
                      <span className="font-bold text-[10px] text-blue-700 block mb-0.5">If Dr. Jabbar Provides Assets</span>
                      <p className="text-[8px] text-slate-600 leading-tight">
                        Provide your own photos, graphics, reels, videos & banners. <strong className="text-blue-700">No Creative Package Required (PKR 20,000/mo only).</strong>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Column 3: Pricing Summary Table & Budget */}
                <div className="p-4 rounded-xl border border-slate-200/60 bg-white shadow-sm flex flex-col justify-between hover:border-blue-300 transition-all">
                  <div>
                    <h4 className="font-display font-extrabold text-xs text-slate-900 mb-1">Recommended Ads & Pricing</h4>
                    
                    {/* Recommended Ad budget */}
                    <div className="bg-[#FAFAF9] border border-slate-200/40 rounded-lg p-2.5 mb-2.5">
                      <span className="text-[8px] font-bold text-slate-400 block uppercase">Paid by Client</span>
                      <span className="text-xs font-bold text-slate-900 block mt-0.5">PKR 15,000 – 40,000+ / mo</span>
                      <p className="text-[8px] text-slate-500 leading-tight mt-1">
                        Covers Google PPC Ads, Meta Ads, Appointment Campaigns, and Retargeting.
                      </p>
                    </div>

                    {/* Pricing Summary Table */}
                    <span className="text-[9px] font-bold text-slate-700 block mb-1">Pricing Summary Table</span>
                    <table className="w-full text-[8.5px] border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200 text-left text-slate-400 font-mono">
                          <th className="pb-1 font-medium">Service</th>
                          <th className="pb-1 text-right font-medium">Fee</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700">
                        <tr>
                          <td className="py-1">Marketing Management</td>
                          <td className="py-1 text-right font-semibold">PKR 20,000</td>
                        </tr>
                        <tr>
                          <td className="py-1">Creative Production (Classic)</td>
                          <td className="py-1 text-right font-semibold">PKR 12,000</td>
                        </tr>
                        <tr>
                          <td className="py-1">Creative Production (Ultimate)</td>
                          <td className="py-1 text-right font-semibold">PKR 20,000</td>
                        </tr>
                        <tr>
                          <td className="py-1">Advertising Budget</td>
                          <td className="py-1 text-right font-semibold text-blue-600">Client Controlled</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>

              {/* Bottom Final Commitment CTA Block */}
              <div className="mt-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-3.5 rounded-xl flex flex-col md:flex-row justify-between items-center gap-3 shadow-md border border-emerald-400/20">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 size={18} className="text-emerald-100 shrink-0" />
                  <div>
                    <span className="text-[8px] font-mono font-bold text-emerald-100 uppercase tracking-widest block">Final Commitment</span>
                    <p className="text-[10px] font-display font-medium leading-snug">
                      MetaWave Innovations is committed to becoming your long-term digital growth partner by delivering strategic digital marketing, AI-ready search optimization (SEO, AEO & GEO), high-performing advertising campaigns, and continuous website management to help Dr. Jabbar increase patient trust, strengthen online visibility, and achieve sustainable clinic growth.
                    </p>
                  </div>
                </div>
                <div className="flex gap-1.5 shrink-0 flex-wrap">
                  {["Growth Partner", "ROI Focused", "Long-Term Support"].map((badge, bIdx) => (
                    <span key={bIdx} className="text-[8px] font-mono font-bold bg-emerald-600/60 border border-emerald-400/30 text-white px-2 py-0.5 rounded-full uppercase tracking-wider">
                      ✓ {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Slide Footer */}
            <div className="flex justify-between items-center text-slate-400 text-[10px] mt-6 pt-3 border-t border-slate-100 font-mono">
              <span>Prepared by MetaWave Innovations</span>
              <span>Slide {slide.id} of 9</span>
            </div>
          </div>
        );

      default: // Grid bento slides (including Slide 6 Advantage)
        return (
          <div className="w-full flex flex-col h-full min-h-[360px] sm:min-h-[400px] md:min-h-[460px] justify-between p-5 sm:p-8 md:p-12 bg-white rounded-2xl border border-slate-100 shadow-md">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <div>
                  <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded uppercase tracking-wider">
                    {slide.subtitle}
                  </span>
                  <h2 className="font-display font-extrabold text-2xl md:text-3xl text-slate-900 tracking-tight mt-1.5">{slide.title}</h2>
                </div>
                <div className="bg-[#1D4ED8]/10 text-blue-600 p-2.5 rounded-xl">
                  <Award size={22} />
                </div>
              </div>

              {/* Bento Grid */}
              <motion.div 
                variants={containerVariants} 
                initial="initial"
                animate="animate"
                className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"
              >
                {slide.content.map((item, idx) => (
                  <motion.div 
                    key={idx} 
                    variants={itemVariants}
                    className="p-4 rounded-xl border border-slate-200/60 bg-[#FAFAF9] hover:border-emerald-200 transition-all shadow-sm flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-emerald-600 bg-emerald-50 p-1.5 rounded-lg">
                          {idx === 0 && <Award size={16} />}
                          {idx === 1 && <Zap size={16} />}
                          {idx === 2 && <ArrowUpRight size={16} />}
                          {idx === 3 && <MapPin size={16} />}
                        </div>
                        <span className="text-[10px] font-mono font-bold text-slate-300 group-hover:text-emerald-500 transition-colors">
                          0{idx + 1}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed font-medium">
                        {formatBullet(item)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Slide Footer */}
            <div className="flex justify-between items-center text-slate-400 text-[10px] mt-8 pt-4 border-t border-slate-100 font-mono">
              <span>Strategic Partnership Merits</span>
              <span>Slide {slide.id} of 9</span>
            </div>
          </div>
        );
    }
  };

  return (
    <motion.div
      key={slide.id}
      variants={slideVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.25 }}
      className="w-full"
    >
      {renderSlideContent()}
    </motion.div>
  );
}
