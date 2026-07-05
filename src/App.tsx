/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
// @ts-ignore
import html2pdf from 'html2pdf.js';
import { PRESENTATION_SLIDES } from './types';
import SlideRenderer from './components/SlideRenderer';
import { 
  ChevronLeft, ChevronRight, Play, Pause, RotateCcw, 
  Maximize2, Minimize2, MonitorPlay, BookOpen, 
  Award, Info, Sparkles, CheckCircle2, Pointer, 
  Clock, Layers, ShieldCheck, Eye, EyeOff, LayoutTemplate,
  Download, Printer, X
} from 'lucide-react';

import dentistPortrait from './assets/images/dentist_portrait_1783111459193.jpg';
import orthodonticsClinic from './assets/images/orthodontics_clinic_1783111472704.jpg';
import patientInteraction from './assets/images/patient_interaction_1783111488276.jpg';

// Static image asset URLs for instant lookup and dynamic browser preloading
const IMAGE_ASSETS = {
  dentistPortrait,
  orthodonticsClinic,
  patientInteraction
};

export default function App() {
  // Preload all presentation image assets eagerly on application mount to ensure 0ms delays
  useEffect(() => {
    Object.values(IMAGE_ASSETS).forEach((src) => {
      if (src) {
        const img = new Image();
        img.src = src;
      }
    });
  }, []);

  // Slide Deck navigation index
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);
  
  // Laser Pointer simulator on stage
  const [laserPointerActive, setLaserPointerActive] = useState(false);
  const [laserPos, setLaserPos] = useState({ x: 0, y: 0 });
  const slideStageRef = useRef<HTMLDivElement>(null);
  const fullscreenRef = useRef<HTMLDivElement>(null);

  // Presenter Dashboard Visibility Toggles
  const [showPresenterNotes, setShowPresenterNotes] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showFullscreenHeader, setShowFullscreenHeader] = useState(true);

  // Rehearsal Presentation Timer
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  // Autoplay presentation configurations
  const [isAutoplay, setIsAutoplay] = useState(false);
  const [autoplaySpeed, setAutoplaySpeed] = useState(5); // default 5 seconds
  const [autoplayProgress, setAutoplayProgress] = useState(0);

  // PDF Export state
  const [isExportingPDF, setIsExportingPDF] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (timerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  // Autoplay Timer and dynamic progress tracker effect
  useEffect(() => {
    let timer: any = null;
    let progressTimer: any = null;

    if (isAutoplay) {
      const startTime = Date.now();
      const endTime = startTime + autoplaySpeed * 1000;

      // Update progress bar percentage smoothly every 100ms
      progressTimer = setInterval(() => {
        const now = Date.now();
        const elapsed = now - startTime;
        const pct = Math.min((elapsed / (autoplaySpeed * 1000)) * 100, 100);
        setAutoplayProgress(pct);
      }, 100);

      timer = setTimeout(() => {
        setCurrentSlideIdx((prev) => {
          if (prev === PRESENTATION_SLIDES.length - 1) {
            return 0; // loop back to slide 1
          }
          return prev + 1;
        });
        setAutoplayProgress(0);
      }, autoplaySpeed * 1000);
    } else {
      setAutoplayProgress(0);
    }

    return () => {
      if (timer) clearTimeout(timer);
      if (progressTimer) clearInterval(progressTimer);
    };
  }, [isAutoplay, autoplaySpeed, currentSlideIdx]);

  const formatTime = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Keyboard Navigation for Slides
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        // Spacebar or Arrow Right goes forward
        e.preventDefault();
        handleNextSlide(true); // Pause autoplay on manual key action
      } else if (e.key === 'ArrowLeft') {
        handlePrevSlide(true);
      } else if (e.key === 'Escape') {
        setIsFullscreen(false);
      } else if (e.key === 'f' || e.key === 'F') {
        // 'F' key toggles Fullscreen
        e.preventDefault();
        toggleFullscreenState();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIdx]);

  const handleNextSlide = (pauseAutoplayOnAction = true) => {
    if (pauseAutoplayOnAction) {
      setIsAutoplay(false);
    }
    if (currentSlideIdx < PRESENTATION_SLIDES.length - 1) {
      setCurrentSlideIdx(currentSlideIdx + 1);
    } else {
      if (!pauseAutoplayOnAction) {
        setCurrentSlideIdx(0); // auto loop back
      }
    }
  };

  const handlePrevSlide = (pauseAutoplayOnAction = true) => {
    if (pauseAutoplayOnAction) {
      setIsAutoplay(false);
    }
    if (currentSlideIdx > 0) {
      setCurrentSlideIdx(currentSlideIdx - 1);
    }
  };

  // Track standard browser-level fullscreen changes to keep React state in sync
  useEffect(() => {
    const onFullscreenChange = () => {
      const isNativeFs = !!document.fullscreenElement;
      if (!isNativeFs && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, [isFullscreen]);

  // Request browser-level full screen if possible, fallback gracefully to React State Overlay
  const toggleFullscreenState = () => {
    if (!isFullscreen) {
      setIsFullscreen(true);
      // Attempt to go native fullscreen on the container for the ultimate client experience
      const container = fullscreenRef.current || document.documentElement;
      if (container.requestFullscreen) {
        container.requestFullscreen().catch(() => {
          // Silent fallback if browser/iframe blocks native fullscreen
        });
      }
    } else {
      setIsFullscreen(false);
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
    }
  };

  // Generate a printable version of the current proposal slide deck using html2pdf.js
  const handleDownloadPDF = async () => {
    setIsExportingPDF(true);
    
    // Give React a moment to render the offscreen elements and resolve images
    setTimeout(async () => {
      const element = document.getElementById('pdf-export-container');
      if (!element) {
        setIsExportingPDF(false);
        return;
      }

      try {
        const opt = {
          margin: 0,
          filename: 'FJ_Orthodontics_Digital_Transformation_Proposal.pdf',
          image: { type: 'jpeg' as const, quality: 0.98 },
          html2canvas: { 
            scale: 2, 
            useCORS: true,
            logging: false,
            scrollY: 0,
            scrollX: 0
          },
          jsPDF: { unit: 'px' as const, format: [1120, 630] as [number, number], orientation: 'landscape' as const },
          pagebreak: { mode: ['css', 'legacy'] as ['css', 'legacy'] }
        };

        await html2pdf().from(element).set(opt).save();
      } catch (err) {
        console.error('Error exporting PDF:', err);
      } finally {
        setIsExportingPDF(false);
      }
    }, 1000);
  };

  // Trigger high-fidelity landscape browser print dialog
  const handlePrint = () => {
    window.print();
  };

  // Laser Pointer position trackers
  const handleStageMouseMove = (e: React.MouseEvent) => {
    if (!laserPointerActive || !slideStageRef.current) return;
    const rect = slideStageRef.current.getBoundingClientRect();
    setLaserPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleFullscreenMouseMove = (e: React.MouseEvent) => {
    if (!laserPointerActive || !fullscreenRef.current) return;
    const rect = fullscreenRef.current.getBoundingClientRect();
    setLaserPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  // Context-aware coaching strategies based on the active slide
  const getPitchStrategy = (id: number) => {
    switch (id) {
      case 1:
        return "Hook the client early. Introduce MetaWave, acknowledge the prestige of F&J Orthodontics, and direct attention to the 100% Care Success commitment.";
      case 2:
        return "Explain the paradigm shift: this ecosystem is not just a digital flyer, but a conversion-focused patient care machine that reduces front-desk load.";
      case 3:
        return "Highlight professional validation. Clinicians and board members care deeply about PMDC compliance and verified healthcare credentials.";
      case 4:
        return "Demonstrate our tailored blueprint. Highlight that our proposed pages address patient inquiries, specialist profiles, and live scheduling natively.";
      case 5:
        return "Focus on operational simplicity. Reassure them that admin dashboards are designed with simple data tracks so staff are fully trained in 10 minutes.";
      case 6:
        return "Pitch performance stability. Fast mobile load times mean patients experiencing emergencies find details instantly, even on weak cellular networks.";
      case 7:
        return "Deliver the signature call-to-action. State clearly that their physical prestige is now matched in high-performance digital caliber. Ask for next steps.";
      case 8:
        return "Walk them through the 3-Month Marketing Foundation. Emphasize that we optimize for ChatGPT, Gemini, and Claude (GEO/AEO) as well as standard Google Search.";
      case 9:
        return "Highlight the long-term collaboration. Walk them through the checklist of services and present the PKR 30k/15k timeline clearly. Highlight client-controlled budget.";
      default:
        return "Maintain clear focus, good posture, and conversational eye contact.";
    }
  };

  // Image assets loaded from pre-cached static assets
  const imageAssets = IMAGE_ASSETS;

  const activeSlide = PRESENTATION_SLIDES[currentSlideIdx];

  return (
    <>
      <div className="min-h-screen bg-stone-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-900 print:hidden">
      
      {/* CORPORATE BRAND HEADER / NAVBAR */}
      <header className="bg-white border-b border-stone-200 py-4 px-6 md:px-8 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4 sticky top-0 z-50">
        
        {/* Brand & Pitch Partner Logo */}
        <div className="flex items-center gap-3">
          <div className="bg-emerald-700 text-white p-2.5 rounded-xl flex items-center justify-center font-display font-black shadow-md tracking-tighter">
            F&J
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display font-bold text-slate-900 tracking-tight text-sm md:text-base leading-none">
                F & J Orthodontics Pitch Hub
              </h1>
              <span className="bg-emerald-50 text-emerald-700 font-mono text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-100 uppercase tracking-wider">
                Active Proposal
              </span>
            </div>
            <p className="text-[11px] text-stone-500 mt-1">
              Prepared for Clinical Board by <span className="text-blue-700 font-semibold">MetaWave Innovations</span>
            </p>
          </div>
        </div>

        {/* Global Slide-Show Master Control Panel */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
          <button
            onClick={handleDownloadPDF}
            disabled={isExportingPDF}
            className={`px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-semibold flex items-center gap-1 sm:gap-1.5 border transition-all cursor-pointer ${
              isExportingPDF
                ? 'bg-stone-50 border-stone-200 text-stone-400 cursor-not-allowed'
                : 'bg-white border-stone-200 hover:border-blue-300 text-blue-700 hover:bg-blue-50/50'
            }`}
            title="Attempt client-side PDF render (may be limited by iframe sandboxing)"
          >
            <Download size={13} className={isExportingPDF ? 'animate-bounce' : ''} />
            <span>{isExportingPDF ? 'Generating...' : 'Download PDF'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-semibold flex items-center gap-1 sm:gap-1.5 border transition-all cursor-pointer bg-emerald-50 border-emerald-200 hover:border-emerald-300 text-emerald-800 hover:bg-emerald-100/60"
            title="Open browser print dialog to print or save the entire landscape deck as PDF. Highly recommended!"
          >
            <Printer size={13} />
            <span>Print Deck / Save PDF</span>
          </button>

          <button
            onClick={() => setLaserPointerActive(!laserPointerActive)}
            className={`px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-semibold flex items-center gap-1 sm:gap-1.5 border transition-all cursor-pointer ${
              laserPointerActive 
                ? 'bg-rose-50 border-rose-300 text-rose-700 font-bold animate-pulse' 
                : 'bg-white border-stone-200 hover:border-rose-300 text-stone-600'
            }`}
            title="Toggle interactive simulated laser pointer"
          >
            <Pointer size={13} />
            <span>Laser</span>
          </button>

          <button
            onClick={toggleFullscreenState}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] sm:text-xs px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl flex items-center gap-1 sm:gap-1.5 transition-all shadow-md hover:shadow-lg scale-100 hover:scale-[1.03] cursor-pointer"
            title="Start immersive full screen slide show presentation"
          >
            <MonitorPlay size={13} />
            <span>
              <span className="hidden sm:inline">Start Slideshow</span>
              <span className="inline sm:hidden">Present</span>
            </span>
          </button>
        </div>

        {/* Brand Color Pillars */}
        <div className="hidden lg:flex items-center gap-3 text-[10px] font-mono font-medium text-stone-500">
          <span className="flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
            <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></span>
            <span>Emerald (Trust)</span>
          </span>
          <span className="flex items-center gap-1 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
            <span>Cobalt (Prestige)</span>
          </span>
        </div>

      </header>

      {/* CORE WORKSPACE: TWO COLUMN SLIDE MANAGER */}
      <main className="flex-grow max-w-7xl w-full mx-auto p-4 md:p-6 flex flex-col gap-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT COLUMN: Slide Thumbnails Panel (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-3.5 bg-white border border-stone-200 p-4 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between border-b border-stone-100 pb-2.5">
              <div className="flex items-center gap-1.5">
                <Layers size={14} className="text-stone-500" />
                <h3 className="font-display font-bold text-xs text-stone-800 uppercase tracking-wider">
                  Proposal Slides ({PRESENTATION_SLIDES.length})
                </h3>
              </div>
              <span className="bg-stone-100 text-stone-600 font-mono text-[10px] px-1.5 py-0.5 rounded">
                {PRESENTATION_SLIDES.length} Slides
              </span>
            </div>

            {/* Thumbnail Cards Container */}
            <div className="flex flex-row lg:flex-col gap-2.5 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 scrollbar-none">
              {PRESENTATION_SLIDES.map((slide, index) => {
                const isActive = index === currentSlideIdx;
                return (
                  <button
                    key={slide.id}
                    onClick={() => setCurrentSlideIdx(index)}
                    className={`flex-shrink-0 w-44 lg:w-full text-left p-2.5 rounded-xl border transition-all flex items-start gap-2.5 group relative ${
                      isActive 
                        ? 'bg-emerald-50/70 border-emerald-500 shadow-sm' 
                        : 'bg-[#FAFAF9] border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    {/* Slide Number Tag */}
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center font-mono text-[10px] font-bold ${
                      isActive ? 'bg-emerald-600 text-white' : 'bg-stone-200 text-stone-600 group-hover:bg-stone-300'
                    }`}>
                      {slide.id}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className={`text-[9px] font-mono font-bold uppercase ${
                          isActive ? 'text-emerald-700' : 'text-stone-400'
                        }`}>
                          {slide.layoutType} layout
                        </span>
                        {isActive && <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>}
                      </div>
                      <h4 className={`text-xs font-semibold truncate mt-0.5 ${
                        isActive ? 'text-stone-900' : 'text-stone-600 group-hover:text-stone-900'
                      }`}>
                        {slide.title}
                      </h4>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: Slide display preview stage (9 cols) */}
          <div className="lg:col-span-9 flex flex-col gap-5">
            
            {/* Interactive slide projector wrapper */}
            <div 
              ref={slideStageRef}
              onMouseMove={handleStageMouseMove}
              className="w-full relative bg-[#FAF9F6] border border-stone-200 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col"
            >
              {/* Primary viewport stage with bottom padding for floating controls */}
              <div className="relative w-full min-h-[380px] sm:min-h-[420px] md:min-h-[480px] flex flex-col items-stretch justify-center p-3 sm:p-5 pb-24 select-none">
                <AnimatePresence mode="wait">
                  <SlideRenderer 
                    key={currentSlideIdx}
                    slide={activeSlide}
                    orthodonticsClinicUrl={imageAssets.orthodonticsClinic}
                    patientInteractionUrl={imageAssets.patientInteraction}
                    dentistPortraitUrl={imageAssets.dentistPortrait}
                  />
                </AnimatePresence>

                {/* Simulated Hover Arrow Handles */}
                <button
                  onClick={() => handlePrevSlide(true)}
                  disabled={currentSlideIdx === 0}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 bg-white/80 hover:bg-white border border-stone-200 text-stone-700 rounded-full shadow-lg opacity-0 hover:opacity-100 focus:opacity-100 transition-opacity disabled:opacity-0 cursor-pointer z-20"
                  title="Previous Slide"
                >
                  <ChevronLeft size={18} />
                </button>

                <button
                  onClick={() => handleNextSlide(true)}
                  disabled={currentSlideIdx === PRESENTATION_SLIDES.length - 1}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 bg-white/80 hover:bg-white border border-stone-200 text-stone-700 rounded-full shadow-lg opacity-0 hover:opacity-100 focus:opacity-100 transition-opacity disabled:opacity-0 cursor-pointer z-20"
                  title="Next Slide"
                >
                  <ChevronRight size={18} />
                </button>

                {/* Laser Pointer simulation overlay */}
                {laserPointerActive && (
                  <div 
                    style={{ 
                      position: 'absolute',
                      left: `${laserPos.x}px`,
                      top: `${laserPos.y}px`,
                      transform: 'translate(-50%, -50%)',
                      pointerEvents: 'none',
                    }}
                    className="w-6 h-6 bg-emerald-500/30 rounded-full flex items-center justify-center z-40 transition-all duration-75"
                  >
                    <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full shadow-[0_0_10px_#10B981] animate-pulse"></div>
                  </div>
                )}

                {/* DYNAMIC FLOATING GLASSMORPHIC CONTROL DECK (BOTTOM CENTER) */}
                <div 
                  id="floating_presenter_dock" 
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 bg-slate-900/90 hover:bg-slate-900 backdrop-blur-md border border-white/10 rounded-2xl sm:rounded-full py-2.5 px-4 sm:px-6 shadow-2xl flex flex-wrap sm:flex-nowrap items-center justify-center gap-3 sm:gap-4 text-white max-w-[95vw] w-max select-none transition-all duration-300 relative overflow-hidden"
                >
                  {/* Glowing thin edge progress indicator */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800">
                    <div 
                      className="h-full bg-emerald-500 transition-all duration-100 ease-linear shadow-[0_0_8px_#10B981]"
                      style={{ width: `${isAutoplay ? autoplayProgress : 0}%` }}
                    />
                  </div>

                  {/* Left block: Slide counter indicator */}
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-stone-300">
                      {currentSlideIdx + 1} <span className="text-stone-500">/</span> {PRESENTATION_SLIDES.length}
                    </span>
                  </div>

                  {/* Vertical Separator */}
                  <div className="hidden sm:block h-4 w-px bg-white/10" />

                  {/* Center block: Standard & Autoplay controls */}
                  <div className="flex items-center gap-1.5 bg-white/5 p-1 rounded-xl border border-white/5">
                    <button
                      onClick={() => handlePrevSlide(true)}
                      disabled={currentSlideIdx === 0}
                      className="p-1.5 hover:bg-white/10 disabled:opacity-30 rounded-lg text-stone-300 hover:text-white transition cursor-pointer"
                      title="Previous Slide"
                    >
                      <ChevronLeft size={16} />
                    </button>

                    {/* Autoplay Play/Pause button */}
                    <button
                      onClick={() => setIsAutoplay(!isAutoplay)}
                      className={`p-1.5 rounded-lg text-white transition flex items-center justify-center cursor-pointer ${
                        isAutoplay 
                          ? 'bg-emerald-600 hover:bg-emerald-700 animate-pulse' 
                          : 'bg-white/10 hover:bg-white/20'
                      }`}
                      title={isAutoplay ? 'Pause Presentation Autoplay' : 'Start Presentation Autoplay'}
                    >
                      {isAutoplay ? <Pause size={16} /> : <Play size={16} />}
                    </button>

                    <button
                      onClick={() => handleNextSlide(true)}
                      disabled={currentSlideIdx === PRESENTATION_SLIDES.length - 1}
                      className="p-1.5 hover:bg-white/10 disabled:opacity-30 rounded-lg text-stone-300 hover:text-white transition cursor-pointer"
                      title="Next Slide"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>

                  {/* Speed toggle selector */}
                  <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-xl border border-white/5">
                    <span className="text-[10px] text-stone-400 font-mono hidden sm:inline">Speed:</span>
                    <button
                      onClick={() => {
                        setAutoplaySpeed((prev) => {
                          if (prev === 3) return 5;
                          if (prev === 5) return 10;
                          return 3;
                        });
                      }}
                      className="text-[11px] font-mono font-bold bg-white/10 hover:bg-white/20 px-2 py-0.5 rounded-md text-emerald-400 hover:text-emerald-300 transition cursor-pointer"
                      title="Adjust slide cycle speed (3s / 5s / 10s)"
                    >
                      {autoplaySpeed}s
                    </button>
                  </div>

                  {/* Separator */}
                  <div className="h-4 w-px bg-white/10" />

                  {/* Quick Dots / Miniature Navigation indicators inside dock */}
                  <div className="hidden md:flex items-center gap-1.5">
                    {PRESENTATION_SLIDES.map((_, sIdx) => (
                      <button
                        key={sIdx}
                        onClick={() => {
                          setIsAutoplay(false);
                          setCurrentSlideIdx(sIdx);
                        }}
                        className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                          sIdx === currentSlideIdx 
                            ? 'w-4 bg-emerald-500' 
                            : 'w-1.5 bg-white/30 hover:bg-white/60'
                        }`}
                        title={`Go to slide ${sIdx + 1}`}
                      />
                    ))}
                  </div>

                  {/* Separator */}
                  <div className="hidden md:block h-4 w-px bg-white/10" />

                  {/* Right block: Extra utility toggles inside dock */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setLaserPointerActive(!laserPointerActive)}
                      className={`p-1.5 rounded-lg border transition cursor-pointer ${
                        laserPointerActive 
                          ? 'bg-rose-600 border-rose-500 text-white animate-pulse' 
                          : 'bg-white/5 border-white/5 text-stone-300 hover:text-white hover:bg-white/10'
                      }`}
                      title="Toggle simulated Laser pointer highlighter"
                    >
                      <Pointer size={14} />
                    </button>

                    <button
                      onClick={toggleFullscreenState}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white transition cursor-pointer"
                      title="Toggle full screen presentation mode"
                    >
                      <Maximize2 size={14} />
                    </button>
                  </div>

                </div>

              </div>

            </div>

            {/* Quick tips reminder bar */}
            <div className="bg-emerald-50 border border-emerald-100 p-3 px-4 rounded-xl flex items-center justify-between text-xs text-emerald-800">
              <div className="flex items-center gap-2">
                <Info size={14} className="text-emerald-600 shrink-0" />
                <p>Press <strong>Arrow Keys</strong> or <strong>Spacebar</strong> to control slide progression. Press <strong>F</strong> to start slideshow.</p>
              </div>
              <span className="font-mono text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                G-8 Professional
              </span>
            </div>

          </div>

        </div>



      </main>

      {/* PERSISTENT CORPORATE WATERMARK FOOTER */}
      <footer className="bg-stone-50 border-t border-stone-200 py-6 text-center text-xs text-stone-500 mt-12 font-mono">
        <p>MetaWave Innovations Pitch Companion Workspace • 2026</p>
        <p className="text-[10px] text-stone-400 mt-1">Vite + React + Tailwind v4 + Framer Motion Engine • G-8 Sector Practice</p>
      </footer>

      {/* -------------------- IMMERSIVE IMMERSIVE FULL SCREEN VIEW -------------------- */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            ref={fullscreenRef}
            onMouseMove={handleFullscreenMouseMove}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] bg-stone-950 text-white flex flex-col justify-between p-6 select-none"
            style={{ touchAction: 'none' }}
          >
            {/* Absolute Top Right Close Button */}
            <div className="absolute top-6 right-6 z-[100000]">
              <button
                onClick={toggleFullscreenState}
                className="p-3 bg-stone-900/80 hover:bg-rose-600 border border-white/10 hover:border-rose-500 rounded-full text-stone-300 hover:text-white shadow-2xl transition-all duration-200 cursor-pointer flex items-center justify-center group"
                title="Exit Full Screen Show"
              >
                <X size={20} className="transition-transform group-hover:rotate-90 duration-200" />
              </button>
            </div>

            {/* Centered slide viewer body */}
            <div className="flex-grow flex items-center justify-center max-w-5xl mx-auto w-full my-6 relative overflow-hidden">
              <AnimatePresence mode="wait">
                <SlideRenderer 
                  key={currentSlideIdx}
                  slide={activeSlide}
                  orthodonticsClinicUrl={imageAssets.orthodonticsClinic}
                  patientInteractionUrl={imageAssets.patientInteraction}
                  dentistPortraitUrl={imageAssets.dentistPortrait}
                />
              </AnimatePresence>

              {/* Fullscreen Floating Navigation Arrows (On screen margins) */}
              <button
                onClick={handlePrevSlide}
                disabled={currentSlideIdx === 0}
                className="absolute left-2 p-3 bg-stone-900/60 hover:bg-stone-800 text-white rounded-full border border-white/10 shadow-xl disabled:opacity-0 cursor-pointer"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                onClick={handleNextSlide}
                disabled={currentSlideIdx === PRESENTATION_SLIDES.length - 1}
                className="absolute right-2 p-3 bg-stone-900/60 hover:bg-stone-800 text-white rounded-full border border-white/10 shadow-xl disabled:opacity-0 cursor-pointer"
              >
                <ChevronRight size={24} />
              </button>

              {/* Laser Pointer overlay */}
              {laserPointerActive && (
                <div 
                  style={{ 
                    position: 'absolute',
                    left: `${laserPos.x}px`,
                    top: `${laserPos.y}px`,
                    transform: 'translate(-50%, -50%)',
                    pointerEvents: 'none',
                  }}
                  className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center z-[999999] transition-all duration-75"
                >
                  <div className="w-3.5 h-3.5 bg-emerald-400 rounded-full shadow-[0_0_15px_#10B981] animate-pulse"></div>
                </div>
              )}
            </div>

            {/* Fullscreen Float Action Control Hub at Bottom */}
            <div className="flex justify-center">
              <div className="bg-stone-900/95 border border-white/15 backdrop-blur-md py-2.5 px-4 sm:px-6 rounded-2xl sm:rounded-full flex flex-wrap sm:flex-nowrap items-center justify-center gap-3 sm:gap-4 shadow-2xl text-white max-w-[95vw] w-max select-none transition-all duration-300 relative overflow-hidden">
                
                {/* Glowing thin edge progress indicator */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-stone-850">
                  <div 
                    className="h-full bg-emerald-500 transition-all duration-100 ease-linear shadow-[0_0_8px_#10B981]"
                    style={{ width: `${isAutoplay ? autoplayProgress : 0}%` }}
                  />
                </div>

                {/* Left block: Slide counter indicator */}
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-stone-300">
                    Slide {currentSlideIdx + 1} <span className="text-stone-500">/</span> {PRESENTATION_SLIDES.length}
                  </span>
                </div>

                {/* Vertical Separator */}
                <div className="hidden sm:block h-4 w-px bg-white/10" />

                {/* Center block: Standard & Autoplay controls */}
                <div className="flex items-center gap-1.5 bg-white/5 p-1 rounded-xl border border-white/5">
                  <button
                    onClick={() => handlePrevSlide(true)}
                    disabled={currentSlideIdx === 0}
                    className="p-1.5 hover:bg-white/10 disabled:opacity-30 rounded-lg text-stone-300 hover:text-white transition cursor-pointer"
                    title="Previous Slide"
                  >
                    <ChevronLeft size={16} />
                  </button>

                  {/* Autoplay Play/Pause button */}
                  <button
                    onClick={() => setIsAutoplay(!isAutoplay)}
                    className={`p-1.5 rounded-lg text-white transition flex items-center justify-center cursor-pointer ${
                      isAutoplay 
                        ? 'bg-emerald-600 hover:bg-emerald-700 animate-pulse' 
                        : 'bg-white/10 hover:bg-white/20'
                    }`}
                    title={isAutoplay ? 'Pause Presentation Autoplay' : 'Start Presentation Autoplay'}
                  >
                    {isAutoplay ? <Pause size={16} /> : <Play size={16} />}
                  </button>

                  <button
                    onClick={() => handleNextSlide(true)}
                    disabled={currentSlideIdx === PRESENTATION_SLIDES.length - 1}
                    className="p-1.5 hover:bg-white/10 disabled:opacity-30 rounded-lg text-stone-300 hover:text-white transition cursor-pointer"
                    title="Next Slide"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>

                {/* Speed toggle selector */}
                <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-xl border border-white/5">
                  <span className="text-[10px] text-stone-400 font-mono hidden sm:inline">Speed:</span>
                  <button
                    onClick={() => {
                      setAutoplaySpeed((prev) => {
                        if (prev === 3) return 5;
                        if (prev === 5) return 10;
                        return 3;
                      });
                    }}
                    className="text-[11px] font-mono font-bold bg-white/10 hover:bg-white/20 px-2 py-0.5 rounded-md text-emerald-400 hover:text-emerald-300 transition cursor-pointer"
                    title="Adjust slide cycle speed (3s / 5s / 10s)"
                  >
                    {autoplaySpeed}s
                  </button>
                </div>

                {/* Separator */}
                <div className="h-4 w-px bg-white/10" />

                {/* Quick Dots / Miniature Navigation indicators inside dock */}
                <div className="hidden md:flex items-center gap-1.5">
                  {PRESENTATION_SLIDES.map((_, sIdx) => (
                    <button
                      key={sIdx}
                      onClick={() => {
                        setIsAutoplay(false);
                        setCurrentSlideIdx(sIdx);
                      }}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        sIdx === currentSlideIdx 
                          ? 'w-4 bg-emerald-500' 
                          : 'w-1.5 bg-white/30 hover:bg-white/60'
                      }`}
                      title={`Go to slide ${sIdx + 1}`}
                    />
                  ))}
                </div>

                {/* Separator */}
                <div className="hidden md:block h-4 w-px bg-white/10" />

                {/* Right block: Extra utility toggles inside dock */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setLaserPointerActive(!laserPointerActive)}
                    className={`p-1.5 rounded-lg border transition cursor-pointer ${
                      laserPointerActive 
                        ? 'bg-rose-600 border-rose-500 text-white animate-pulse' 
                        : 'bg-white/5 border-white/5 text-stone-300 hover:text-white hover:bg-white/10'
                    }`}
                    title="Toggle simulated Laser pointer highlighter"
                  >
                    <Pointer size={14} />
                  </button>
                </div>

              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Offscreen dynamic container for multi-slide landscape high-fidelity PDF Generation */}
      {isExportingPDF && (
        <div 
          id="pdf-export-container"
          className="bg-stone-100"
          style={{
            position: 'fixed',
            left: '-9999px',
            top: 0,
            width: '1120px',
            zIndex: -9999,
          }}
        >
          {PRESENTATION_SLIDES.map((slide) => (
            <div 
              key={slide.id} 
              className="w-[1120px] h-[630px] p-10 flex items-center justify-center bg-stone-100 overflow-hidden"
              style={{ pageBreakAfter: 'always' }}
            >
              <div className="w-full h-full max-w-5xl flex flex-col justify-between">
                <SlideRenderer
                  slide={slide}
                  orthodonticsClinicUrl={imageAssets.orthodonticsClinic}
                  patientInteractionUrl={imageAssets.patientInteraction}
                  dentistPortraitUrl={imageAssets.dentistPortrait}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      </div>

      {/* Hidden eager image preloader for instant browser-level caching and decoding */}
      <div className="sr-only invisible w-0 h-0 overflow-hidden" aria-hidden="true">
        <img src={IMAGE_ASSETS.orthodonticsClinic} loading="eager" decoding="sync" alt="" />
        <img src={IMAGE_ASSETS.patientInteraction} loading="eager" decoding="sync" alt="" />
        <img src={IMAGE_ASSETS.dentistPortrait} loading="eager" decoding="sync" alt="" />
      </div>

      {/* High-fidelity full-deck landscape Print layout */}
      <div className="hidden print:block bg-white w-full min-h-screen">
        {PRESENTATION_SLIDES.map((slide) => (
          <div 
            key={slide.id} 
            className="print-slide-page"
          >
            <div className="w-full h-full max-w-5xl flex flex-col justify-between mx-auto">
              <SlideRenderer
                slide={slide}
                orthodonticsClinicUrl={imageAssets.orthodonticsClinic}
                patientInteractionUrl={imageAssets.patientInteraction}
                dentistPortraitUrl={imageAssets.dentistPortrait}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

