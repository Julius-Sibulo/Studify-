import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../ThemeContext';
import 'bootstrap/dist/css/bootstrap.min.css';

// ------------------------------------------------------------------
// SVG Icons
// ------------------------------------------------------------------
const Icons = {
  ArrowLeft: ({ color }) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>,
  Clock: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>,
  ShortBreak: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 2v10l5 5"></path><path d="M16.5 7.5L12 12"></path></svg>,
  LongBreak: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 2v10l-5 5"></path><path d="M7.5 7.5L12 12"></path></svg>,
  History: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><polyline points="3 3 3 8 8 8"></polyline><polyline points="12 7 12 12 15 15"></polyline></svg>,
  Play: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>,
  Pause: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>,
  Reset: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><polyline points="3 3 3 8 8 8"></polyline></svg>,
  Trophy: ({ color }) => <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={color || "#EAB308"} strokeWidth="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>,
  Image: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>,
  Palette: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r=".5"></circle><circle cx="17.5" cy="10.5" r=".5"></circle><circle cx="8.5" cy="7.5" r=".5"></circle><circle cx="6.5" cy="12.5" r=".5"></circle><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path></svg>,
  
  // Navigation
  Dashboard: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>,
  Book: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>,
  Chart: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18"></path><path d="M18 17V9"></path><path d="M13 17V5"></path><path d="M8 17v-3"></path></svg>,
  Planner: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect><path d="M9 14h6"></path><path d="M9 10h6"></path><path d="M9 18h6"></path></svg>,
  User: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
};

export default function StudyTimerScreen() {
  const navigate = useNavigate();
  const { isDark, accentColor } = useTheme();

  // Customization States
  const [bgTheme, setBgTheme] = useState('plain'); // plain, nightsky, sea, nature
  const [clockStyle, setClockStyle] = useState('classic'); // classic, orbit, pixel

  // Timer Modes
  const defaultModes = {
    'Focus': { time: 25 * 60, label: 'Focus', message: "Let's Focus! 💪" },
    'Short Break': { time: 5 * 60, label: 'Short Break', message: "Take a breather! ☕" },
    'Long Break': { time: 15 * 60, label: 'Long Break', message: "Time to relax! 🛋️" },
  };

  const [topTab, setTopTab] = useState('Pomodoro'); 
  const [bottomTab, setBottomTab] = useState('Focus'); 
  
  const [timeLeft, setTimeLeft] = useState(defaultModes['Focus'].time);
  const [totalTime, setTotalTime] = useState(defaultModes['Focus'].time);
  const [isRunning, setIsRunning] = useState(false);
  const [customInput, setCustomInput] = useState(25);
  
  const [history, setHistory] = useState([]);
  
  // Custom Alert Modal State
  const [showTimeUpModal, setShowTimeUpModal] = useState(false);

  // Timer Logic
  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      const newEntry = {
        id: Date.now(),
        mode: bottomTab === 'History' ? 'Custom' : bottomTab,
        duration: totalTime,
        date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setHistory([newEntry, ...history]);
      setShowTimeUpModal(true); // TRIGGER CUSTOM MODAL INSTEAD OF ALERT
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, bottomTab, totalTime, history]);

  const handleModeChange = (mode) => {
    setIsRunning(false);
    setBottomTab(mode);
    if (mode !== 'History') {
      setTimeLeft(defaultModes[mode].time);
      setTotalTime(defaultModes[mode].time);
      setTopTab('Pomodoro');
    }
  };

  const handleCustomStart = (e) => {
    e.preventDefault();
    const secs = customInput * 60;
    setTotalTime(secs);
    setTimeLeft(secs);
    setIsRunning(true);
    setBottomTab('Custom'); 
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Safe Math for SVG animation
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const safeTotalTime = totalTime > 0 ? totalTime : 1; 
  const progressRatio = timeLeft / safeTotalTime;
  const strokeDashoffset = circumference - progressRatio * circumference;
  const progressColor = '#22c55e'; // Green progress ring

  // Dynamic Background CSS Classes
  const getBgClass = () => {
    switch(bgTheme) {
      case 'nightsky': return 'bg-animated-nightsky';
      case 'sea': return 'bg-animated-sea';
      case 'nature': return 'bg-animated-nature';
      default: return isDark ? 'bg-dark' : 'bg-light';
    }
  };

  // Glassmorphism effect if a moving background is active
  const glassStyle = bgTheme !== 'plain' ? {
    backgroundColor: isDark ? 'rgba(31, 41, 55, 0.4)' : 'rgba(255, 255, 255, 0.4)',
    backdropFilter: 'blur(12px)',
    border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.5)'}`,
  } : { backgroundColor: isDark ? '#1f2937' : 'white' };

  return (
    <div className={`d-flex flex-column min-vh-100 font-sans position-relative ${getBgClass()}`} style={{ backgroundColor: bgTheme === 'plain' ? (isDark ? '#111827' : '#fafafa') : undefined, transition: 'background 0.5s ease' }}>
      
      {/* GLOBAL CSS FOR MOVING BACKGROUNDS & ANIMATIONS */}
      <style>{`
        @keyframes panGradient { 
          0% { background-position: 0% 50%; } 
          50% { background-position: 100% 50%; } 
          100% { background-position: 0% 50%; } 
        }
        @keyframes orbitRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes slideUpFade { 
          from { transform: translateY(30px) scale(0.95); opacity: 0; } 
          to { transform: translateY(0) scale(1); opacity: 1; } 
        }
        .bg-animated-nightsky {
          background: linear-gradient(-45deg, #0f172a, #1e1b4b, #312e81, #0f172a);
          background-size: 400% 400%;
          animation: panGradient 20s ease infinite;
        }
        .bg-animated-sea {
          background: linear-gradient(-45deg, #083344, #0c4a6e, #0284c7, #38bdf8);
          background-size: 400% 400%;
          animation: panGradient 15s ease infinite;
        }
        .bg-animated-nature {
          background: linear-gradient(-45deg, #064e3b, #14532d, #166534, #22c55e);
          background-size: 400% 400%;
          animation: panGradient 18s ease infinite;
        }
        .retro-pixel-font {
          font-family: 'Courier New', Courier, monospace;
          text-shadow: 2px 2px 0px rgba(0,0,0,0.2);
        }
      `}</style>

      {/* ------------------------------------------------------------------ */}
      {/* CUSTOM TIME'S UP MODAL                                             */}
      {/* ------------------------------------------------------------------ */}
      {showTimeUpModal && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ zIndex: 9999, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)' }}>
          <div className="card border-0 shadow-lg rounded-4 p-4 p-md-5 text-center" style={{ maxWidth: '380px', width: '90%', backgroundColor: isDark ? '#1f2937' : 'white', animation: 'slideUpFade 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}>
             <div className="d-flex justify-content-center mb-4">
                <div className="rounded-circle d-flex align-items-center justify-content-center shadow-sm" style={{ width: '80px', height: '80px', backgroundColor: isDark ? '#374151' : '#fef08a' }}>
                  <Icons.Trophy color={accentColor} />
                </div>
             </div>
             <h3 className="fw-bolder mb-2" style={{ color: isDark ? '#f9fafb' : '#111827' }}>Time's Up!</h3>
             <p className="mb-4" style={{ color: isDark ? '#9ca3af' : '#6b7280', fontSize: '1rem' }}>
               Great job completing your session. Ready for the next one?
             </p>
             <button className="btn w-100 fw-bold rounded-pill py-3 text-white fs-5 shadow-sm" onClick={() => setShowTimeUpModal(false)} style={{ backgroundColor: accentColor }}>
               Awesome!
             </button>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div className="container-fluid px-4 pt-4 pb-2" style={{ maxWidth: '600px' }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <button onClick={() => navigate(-1)} className="btn btn-link p-0 border-0">
            <Icons.ArrowLeft color={bgTheme === 'plain' ? accentColor : 'white'} />
          </button>
          <h5 className="fw-bolder mb-0" style={{ color: bgTheme === 'plain' ? accentColor : 'white', textShadow: bgTheme !== 'plain' ? '0 2px 4px rgba(0,0,0,0.3)' : 'none' }}>Study Timer</h5>
          <div style={{ width: '24px' }}></div>
        </div>

        {/* CUSTOMIZATION TOOLBAR */}
        <div className="d-flex justify-content-between align-items-center mb-4 px-2 py-2 rounded-4 shadow-sm" style={glassStyle}>
          <div className="d-flex align-items-center gap-2">
            <Icons.Image />
            <select value={bgTheme} onChange={(e) => setBgTheme(e.target.value)} className="form-select form-select-sm border-0 bg-transparent fw-bold shadow-none" style={{ color: bgTheme !== 'plain' ? 'white' : (isDark ? '#f9fafb' : '#111827'), cursor: 'pointer', width: '110px' }}>
              <option value="plain" className="text-dark">Plain</option>
              <option value="nightsky" className="text-dark">Night Sky</option>
              <option value="sea" className="text-dark">Ocean</option>
              <option value="nature" className="text-dark">Forest</option>
            </select>
          </div>
          <div className="d-flex align-items-center gap-2">
            <Icons.Palette />
            <select value={clockStyle} onChange={(e) => setClockStyle(e.target.value)} className="form-select form-select-sm border-0 bg-transparent fw-bold shadow-none" style={{ color: bgTheme !== 'plain' ? 'white' : (isDark ? '#f9fafb' : '#111827'), cursor: 'pointer', width: '110px' }}>
              <option value="classic" className="text-dark">Classic</option>
              <option value="orbit" className="text-dark">Orbital</option>
              <option value="pixel" className="text-dark">Retro Pixel</option>
            </select>
          </div>
        </div>

        {/* TOP TABS */}
        <div className="d-flex justify-content-center gap-3 mb-5">
          <button 
            onClick={() => { setTopTab('Pomodoro'); handleModeChange('Focus'); }}
            className="btn fw-bolder px-4 py-2 shadow-sm"
            style={{ 
              borderRadius: '0.75rem', width: '140px', transition: 'all 0.3s',
              backgroundColor: topTab === 'Pomodoro' ? accentColor : glassStyle.backgroundColor,
              color: topTab === 'Pomodoro' ? 'white' : (bgTheme !== 'plain' ? 'white' : (isDark ? '#f9fafb' : '#111827')),
              border: topTab === 'Pomodoro' ? 'none' : glassStyle.border,
              backdropFilter: topTab === 'Pomodoro' ? 'none' : glassStyle.backdropFilter
            }}
          >
            Pomodoro
          </button>
          <button 
            onClick={() => { setTopTab('Custom'); setIsRunning(false); }}
            className="btn fw-bolder px-4 py-2 shadow-sm"
            style={{ 
              borderRadius: '0.75rem', width: '140px', transition: 'all 0.3s',
              backgroundColor: topTab === 'Custom' ? accentColor : glassStyle.backgroundColor,
              color: topTab === 'Custom' ? 'white' : (bgTheme !== 'plain' ? 'white' : (isDark ? '#f9fafb' : '#111827')),
              border: topTab === 'Custom' ? 'none' : glassStyle.border,
              backdropFilter: topTab === 'Custom' ? 'none' : glassStyle.backdropFilter
            }}
          >
            Custom
          </button>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-grow-1 d-flex flex-column align-items-center px-4" style={{ maxWidth: '600px', margin: '0 auto', width: '100%' }}>
        
        {bottomTab === 'History' ? (
          <div className="w-100 rounded-4 p-4 shadow-sm" style={glassStyle}>
            <h5 className="fw-bold mb-4 text-center" style={{ color: bgTheme !== 'plain' ? 'white' : (isDark ? '#f9fafb' : '#111827') }}>Session History</h5>
            {history.length === 0 ? (
              <p className="text-center mt-5 fw-medium" style={{ color: bgTheme !== 'plain' ? 'rgba(255,255,255,0.7)' : 'gray' }}>No sessions completed yet today.</p>
            ) : (
              <div className="d-flex flex-column gap-3">
                {history.map(session => (
                  <div key={session.id} className="card border-0 shadow-sm rounded-4" style={{ backgroundColor: bgTheme !== 'plain' ? 'rgba(255,255,255,0.1)' : (isDark ? '#1f2937' : 'white') }}>
                    <div className="card-body p-3 d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center gap-3">
                        <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', backgroundColor: isDark ? '#374151' : '#f3f4f6', color: accentColor }}>
                          <Icons.Clock />
                        </div>
                        <div>
                          <h6 className="fw-bold mb-0" style={{ color: bgTheme !== 'plain' ? 'white' : (isDark ? '#f9fafb' : '#111827') }}>{session.mode}</h6>
                          <small className="fw-semibold" style={{ color: bgTheme !== 'plain' ? 'rgba(255,255,255,0.7)' : 'gray' }}>{session.date}</small>
                        </div>
                      </div>
                      <h6 className="fw-bolder mb-0" style={{ color: bgTheme !== 'plain' ? '#4ade80' : progressColor }}>+{session.duration / 60} min</h6>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : topTab === 'Custom' && !isRunning && timeLeft === totalTime ? (
          <div className="w-100 text-center mt-5 rounded-4 p-5 shadow-sm" style={glassStyle}>
            <h5 className="fw-bold mb-4" style={{ color: bgTheme !== 'plain' ? 'white' : (isDark ? '#f9fafb' : '#111827') }}>Set Custom Timer</h5>
            <form onSubmit={handleCustomStart} className="d-flex flex-column align-items-center">
              <div className="d-flex align-items-center justify-content-center gap-3 mb-5">
                <input 
                  type="number" 
                  min="1" max="180" 
                  value={customInput} 
                  onChange={(e) => setCustomInput(e.target.value)}
                  className={`form-control text-center fw-bolder border-0 shadow-sm rounded-4 ${bgTheme !== 'plain' ? 'bg-white text-dark' : (isDark ? 'bg-gray-800 text-white' : 'bg-white')}`}
                  style={{ fontSize: '3rem', width: '120px', height: '80px', color: accentColor }}
                />
                <span className="fw-bold fs-4" style={{ color: bgTheme !== 'plain' ? 'rgba(255,255,255,0.8)' : (isDark ? '#9ca3af' : '#6b7280') }}>min</span>
              </div>
              <button type="submit" className="btn text-white fw-bold fs-5 px-5 py-3 shadow-sm rounded-4 w-100" style={{ backgroundColor: accentColor, maxWidth: '300px' }}>
                Start Custom
              </button>
            </form>
          </div>
        ) : (
          <div className="d-flex flex-column align-items-center w-100 mt-2">
            
            {/* CLOCK STYLE RENDERING LOGIC */}
            <div className="position-relative d-flex justify-content-center align-items-center mb-4" style={{ width: '280px', height: '280px' }}>
              
              {/* STYLE 1: CLASSIC RING */}
              {clockStyle === 'classic' && (
                <svg width="280" height="280" viewBox="0 0 280 280" style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx="140" cy="140" r={radius} fill="none" stroke={bgTheme !== 'plain' ? 'rgba(255,255,255,0.2)' : (isDark ? '#374151' : '#e5e7eb')} strokeWidth="16" />
                  <circle cx="140" cy="140" r={radius} fill="none" stroke={bgTheme !== 'plain' ? '#4ade80' : progressColor} strokeWidth="16" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset || 0} style={{ transition: 'stroke-dashoffset 1s linear' }} />
                </svg>
              )}

              {/* STYLE 2: ORBITAL STAR */}
              {clockStyle === 'orbit' && (
                <svg width="280" height="280" viewBox="0 0 280 280">
                  <circle cx="140" cy="140" r={radius} fill="none" stroke={bgTheme !== 'plain' ? 'rgba(255,255,255,0.1)' : (isDark ? '#1f2937' : '#f3f4f6')} strokeWidth="4" strokeDasharray="8 8" />
                  <g style={{ transform: `rotate(${360 * (1 - progressRatio) - 90}deg)`, transformOrigin: '140px 140px', transition: 'transform 1s linear' }}>
                    <circle cx="140" cy={20} r="14" fill={accentColor} style={{ filter: `drop-shadow(0 0 10px ${accentColor})` }} />
                  </g>
                </svg>
              )}

              {/* STYLE 3: RETRO PIXEL */}
              {clockStyle === 'pixel' && (
                <div className="w-100 h-100 d-flex flex-column align-items-center justify-content-center rounded-4 shadow-lg border border-3 border-dark" style={{ backgroundColor: '#111827', overflow: 'hidden' }}>
                  <div className="w-100 px-3 pt-3 mb-auto text-end">
                    <div style={{ width: '12px', height: '12px', backgroundColor: isRunning ? '#ef4444' : '#6b7280', borderRadius: '50%', display: 'inline-block', boxShadow: isRunning ? '0 0 8px #ef4444' : 'none', animation: isRunning ? 'pulse 1s infinite' : 'none' }}></div>
                  </div>
                  <div className="w-100 px-4 mt-auto mb-3">
                    <div className="progress rounded-0 border border-dark" style={{ height: '12px', backgroundColor: '#374151' }}>
                      <div className="progress-bar rounded-0" style={{ width: `${(1-progressRatio)*100}%`, backgroundColor: '#4ade80', transition: 'width 1s linear' }}></div>
                    </div>
                  </div>
                </div>
              )}

              {/* TIME TEXT (Inside Classic & Orbit, On top of Pixel) */}
              <div className="position-absolute top-50 start-50 translate-middle text-center w-100" style={{ pointerEvents: 'none' }}>
                <h5 className={`fw-bolder mb-1 ${clockStyle === 'pixel' ? 'retro-pixel-font text-white' : ''}`} style={{ color: bgTheme !== 'plain' ? 'white' : (isDark ? '#f9fafb' : '#111827'), fontSize: '1.1rem', letterSpacing: clockStyle === 'pixel' ? '2px' : 'normal' }}>
                  {topTab === 'Custom' ? 'Custom' : defaultModes[bottomTab]?.label}
                </h5>
                <h1 className={`fw-bolder m-0 ${clockStyle === 'pixel' ? 'retro-pixel-font' : ''}`} style={{ fontSize: clockStyle === 'pixel' ? '4.5rem' : '4rem', color: clockStyle === 'pixel' ? '#4ade80' : (bgTheme !== 'plain' ? 'white' : (isDark ? '#f9fafb' : '#111827')), letterSpacing: '-2px' }}>
                  {formatTime(timeLeft)}
                </h1>
              </div>
            </div>

            <h5 className="fw-bolder mb-5 text-center" style={{ color: bgTheme !== 'plain' ? 'rgba(255,255,255,0.9)' : (isDark ? '#d1d5db' : '#4b5563'), textShadow: bgTheme !== 'plain' ? '0 2px 4px rgba(0,0,0,0.4)' : 'none' }}>
              {topTab === 'Custom' ? "Let's Focus! 💪" : defaultModes[bottomTab]?.message}
            </h5>

            {/* Action Buttons */}
            <div className="d-flex gap-3 w-100 justify-content-center" style={{ maxWidth: '300px' }}>
              {!isRunning && timeLeft !== totalTime && (
                <button 
                  onClick={() => { setIsRunning(false); setTimeLeft(totalTime); }}
                  className="btn fw-bold fs-5 px-4 py-3 shadow-sm rounded-4 flex-grow-1" 
                  style={{ color: accentColor, backgroundColor: bgTheme !== 'plain' ? 'rgba(255,255,255,0.9)' : (isDark ? '#374151' : 'white'), border: `1px solid ${accentColor}` }}
                >
                  <Icons.Reset />
                </button>
              )}
              
              <button 
                onClick={() => setIsRunning(!isRunning)}
                className="btn text-white fw-bold fs-5 px-5 py-3 shadow-sm rounded-4 flex-grow-1 d-flex align-items-center justify-content-center gap-2" 
                style={{ backgroundColor: accentColor, boxShadow: bgTheme !== 'plain' ? `0 8px 16px rgba(0,0,0,0.3)` : 'none' }}
              >
                {isRunning ? <><Icons.Pause /> Pause</> : <><Icons.Play /> {timeLeft === totalTime ? 'Start' : 'Resume'}</>}
              </button>
            </div>

          </div>
        )}
      </div>

      {/* CUSTOM BOTTOM NAVIGATION */}
      <div className={`shadow-lg border-top w-100`} style={{ ...glassStyle, borderTopLeftRadius: '1.5rem', borderTopRightRadius: '1.5rem', zIndex: 1000, paddingBottom: 'env(safe-area-inset-bottom, 1rem)' }}>
        <div className="d-flex justify-content-around align-items-center py-3 px-2">
          
          <div onClick={() => handleModeChange('Focus')} className="d-flex flex-column align-items-center cursor-pointer">
            <div className="d-flex align-items-center justify-content-center rounded-4 mb-1 transition" style={{ width: '56px', height: '36px', backgroundColor: bottomTab === 'Focus' ? (bgTheme !== 'plain' ? 'rgba(255,255,255,0.2)' : (isDark ? '#374151' : '#fee2e2')) : 'transparent', color: bottomTab === 'Focus' ? accentColor : (bgTheme !== 'plain' ? 'rgba(255,255,255,0.7)' : (isDark ? '#9ca3af' : '#6b7280')) }}>
              <Icons.Clock />
            </div>
            <span className="fw-bold" style={{ fontSize: '0.65rem', color: bottomTab === 'Focus' ? (bgTheme !== 'plain' ? 'white' : (isDark ? '#f9fafb' : '#111827')) : (bgTheme !== 'plain' ? 'rgba(255,255,255,0.7)' : (isDark ? '#9ca3af' : '#6b7280')) }}>Focus</span>
          </div>

          <div onClick={() => handleModeChange('Short Break')} className="d-flex flex-column align-items-center cursor-pointer">
            <div className="d-flex align-items-center justify-content-center rounded-4 mb-1 transition" style={{ width: '56px', height: '36px', backgroundColor: bottomTab === 'Short Break' ? (bgTheme !== 'plain' ? 'rgba(255,255,255,0.2)' : (isDark ? '#374151' : '#fee2e2')) : 'transparent', color: bottomTab === 'Short Break' ? accentColor : (bgTheme !== 'plain' ? 'rgba(255,255,255,0.7)' : (isDark ? '#9ca3af' : '#6b7280')) }}>
              <Icons.ShortBreak />
            </div>
            <span className="fw-bold" style={{ fontSize: '0.65rem', color: bottomTab === 'Short Break' ? (bgTheme !== 'plain' ? 'white' : (isDark ? '#f9fafb' : '#111827')) : (bgTheme !== 'plain' ? 'rgba(255,255,255,0.7)' : (isDark ? '#9ca3af' : '#6b7280')) }}>Short Break</span>
          </div>

          <div onClick={() => handleModeChange('Long Break')} className="d-flex flex-column align-items-center cursor-pointer">
            <div className="d-flex align-items-center justify-content-center rounded-4 mb-1 transition" style={{ width: '56px', height: '36px', backgroundColor: bottomTab === 'Long Break' ? (bgTheme !== 'plain' ? 'rgba(255,255,255,0.2)' : (isDark ? '#374151' : '#fee2e2')) : 'transparent', color: bottomTab === 'Long Break' ? accentColor : (bgTheme !== 'plain' ? 'rgba(255,255,255,0.7)' : (isDark ? '#9ca3af' : '#6b7280')) }}>
              <Icons.LongBreak />
            </div>
            <span className="fw-bold" style={{ fontSize: '0.65rem', color: bottomTab === 'Long Break' ? (bgTheme !== 'plain' ? 'white' : (isDark ? '#f9fafb' : '#111827')) : (bgTheme !== 'plain' ? 'rgba(255,255,255,0.7)' : (isDark ? '#9ca3af' : '#6b7280')) }}>Long Break</span>
          </div>

          <div onClick={() => handleModeChange('History')} className="d-flex flex-column align-items-center cursor-pointer">
            <div className="d-flex align-items-center justify-content-center rounded-4 mb-1 transition" style={{ width: '56px', height: '36px', backgroundColor: bottomTab === 'History' ? (bgTheme !== 'plain' ? 'rgba(255,255,255,0.2)' : (isDark ? '#374151' : '#fee2e2')) : 'transparent', color: bottomTab === 'History' ? accentColor : (bgTheme !== 'plain' ? 'rgba(255,255,255,0.7)' : (isDark ? '#9ca3af' : '#6b7280')) }}>
              <Icons.History />
            </div>
            <span className="fw-bold" style={{ fontSize: '0.65rem', color: bottomTab === 'History' ? (bgTheme !== 'plain' ? 'white' : (isDark ? '#f9fafb' : '#111827')) : (bgTheme !== 'plain' ? 'rgba(255,255,255,0.7)' : (isDark ? '#9ca3af' : '#6b7280')) }}>History</span>
          </div>

        </div>
      </div>
    </div>
  );
}