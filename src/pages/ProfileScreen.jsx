import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../ThemeContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const Icons = {
  ArrowLeft: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>,
  ChevronDown: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>,
  LogOut: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>,
  Dashboard: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>,
  Book: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>,
  Chart: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18"></path><path d="M18 17V9"></path><path d="M13 17V5"></path><path d="M8 17v-3"></path></svg>,
  Planner: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect><path d="M9 14h6"></path><path d="M9 10h6"></path><path d="M9 18h6"></path></svg>,
  User: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
};

const ToggleSwitch = ({ isOn, onToggle, activeColor }) => (
  <div onClick={onToggle} className="rounded-pill p-1 d-flex align-items-center cursor-pointer shadow-sm" style={{ width: '46px', height: '26px', backgroundColor: isOn ? activeColor : '#9ca3af', justifyContent: isOn ? 'flex-end' : 'flex-start', transition: 'all 0.3s ease' }}>
    <div className="bg-white rounded-circle shadow-sm" style={{ width: '18px', height: '18px' }}></div>
  </div>
);

const SettingsRow = ({ label, children, isLast, isDark }) => (
  <div className="d-flex justify-content-between align-items-center py-3" style={{ borderBottom: isLast ? 'none' : `1px solid ${isDark ? '#374151' : '#f3f4f6'}` }}>
    <span className="fw-bold ms-3" style={{ fontSize: '0.95rem', color: isDark ? '#f3f4f6' : '#1f2937', transition: 'color 0.3s ease' }}>{label}</span>
    <div className="d-flex align-items-center gap-2 me-2">
      {children}
    </div>
  </div>
);

const ColorDot = ({ color, isActive, onClick, isDark }) => (
  <div onClick={onClick} className="rounded-circle cursor-pointer d-flex align-items-center justify-content-center" style={{ width: '24px', height: '24px', backgroundColor: color, border: isActive ? `2px solid ${isDark ? '#f3f4f6' : '#374151'}` : '2px solid transparent', boxShadow: isActive ? `0 0 0 2px ${isDark ? '#1f2937' : 'white'} inset` : 'none', transition: 'all 0.2s ease' }}></div>
);

export default function ProfileScreen() {
  const navigate = useNavigate();
  const { theme, setTheme, accentColor, setAccentColor, fontSize, setFontSize, isDark } = useTheme();

  const [highContrast, setHighContrast] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(true);
  const [studyReminders, setStudyReminders] = useState(true);
  const [quizReminders, setQuizReminders] = useState(true);

  const availableColors = ['#8B1A1A', '#7c3aed', '#4ade80', '#fef08a', '#fbbf24', '#fca5a5'];

  return (
    <div className={`d-flex min-vh-100 font-sans ${isDark ? 'bg-dark' : 'bg-light'}`} style={{ backgroundColor: isDark ? '#111827' : '#f8f9fa', transition: 'background-color 0.3s ease' }}>
      
      <aside className={`d-none d-lg-flex flex-column align-items-center border-end shadow-sm py-4 sticky-top ${isDark ? 'border-secondary' : 'bg-white'}`} style={{ width: '100px', height: '100vh', zIndex: 1000, backgroundColor: isDark ? '#1f2937' : 'white', transition: 'background-color 0.3s ease' }}>
        <div className="mb-5 text-center">
          <div className={`rounded-circle d-flex align-items-center justify-content-center mx-auto shadow-sm border ${isDark ? 'bg-dark border-secondary' : 'bg-light'}`} style={{ width: '50px', height: '50px' }}>
            <img src="/UNCSeal.png" alt="Seal" style={{ width: '35px', objectFit: 'contain', filter: isDark ? 'brightness(0) invert(1)' : 'none', transition: 'filter 0.3s ease' }} />
          </div>
        </div>

        <div className="d-flex flex-column gap-4 w-100 align-items-center">
          <div className={`d-flex flex-column align-items-center cursor-pointer ${isDark ? 'text-light' : 'text-muted'}`} onClick={() => navigate('/dashboard')} style={{ opacity: 0.6 }}>
            <div className="d-flex align-items-center justify-content-center mb-1" style={{ width: '48px', height: '48px' }}><Icons.Dashboard /></div>
            <span className="fw-semibold" style={{ fontSize: '0.65rem' }}>Dashboard</span>
          </div>
          <div className={`d-flex flex-column align-items-center cursor-pointer ${isDark ? 'text-light' : 'text-muted'}`} onClick={() => navigate('/tools')} style={{ opacity: 0.6 }}>
            <div className="d-flex align-items-center justify-content-center mb-1" style={{ width: '48px', height: '48px' }}><Icons.Book /></div>
            <span className="fw-semibold" style={{ fontSize: '0.65rem' }}>Tools</span>
          </div>
          <div className={`d-flex flex-column align-items-center cursor-pointer ${isDark ? 'text-light' : 'text-muted'}`} onClick={() => navigate('/analytics')} style={{ opacity: 0.6 }}>
            <div className="d-flex align-items-center justify-content-center mb-1" style={{ width: '48px', height: '48px' }}><Icons.Chart /></div>
            <span className="fw-semibold" style={{ fontSize: '0.65rem' }}>Analytics</span>
          </div>
          <div className={`d-flex flex-column align-items-center cursor-pointer ${isDark ? 'text-light' : 'text-muted'}`} onClick={() => navigate('/planner')} style={{ opacity: 0.6 }}>
            <div className="d-flex align-items-center justify-content-center mb-1" style={{ width: '48px', height: '48px' }}><Icons.Planner /></div>
            <span className="fw-semibold" style={{ fontSize: '0.65rem' }}>Planner</span>
          </div>
        </div>

        <div className="mt-auto d-flex flex-column align-items-center text-center cursor-pointer">
          <div className="d-flex align-items-center justify-content-center rounded-4 mb-1 shadow-sm" style={{ backgroundColor: accentColor, width: '48px', height: '48px', color: 'white', transition: 'background-color 0.3s ease' }}>
            <Icons.User />
          </div>
          <span className="fw-bold" style={{ fontSize: '0.65rem', color: accentColor, transition: 'color 0.3s ease' }}>Profile</span>
        </div>
      </aside>

      <div className="flex-grow-1 overflow-auto" style={{ paddingBottom: '100px' }}>
        
        <div style={{ backgroundColor: accentColor, transition: 'background-color 0.3s ease' }}>
          <div className="container-fluid mx-auto px-4 py-3 d-flex align-items-center justify-content-center position-relative" style={{ maxWidth: '900px', height: '60px' }}>
            <button onClick={() => navigate(-1)} className="btn btn-link p-0 border-0 position-absolute start-0 ms-3" style={{ zIndex: 10 }}>
              <Icons.ArrowLeft />
            </button>
            <h5 className="text-white fw-bold mb-0">Settings</h5>
          </div>
        </div>

        <div className="container-fluid px-4 py-4 mx-auto" style={{ maxWidth: '700px' }}>
          
          <h5 className="fw-bold mb-3" style={{ color: isDark ? '#f9fafb' : '#111827', transition: 'color 0.3s ease' }}>Appearance</h5>
          <div className="mb-4 rounded-4 shadow-sm" style={{ backgroundColor: isDark ? '#1f2937' : 'white', transition: 'background-color 0.3s ease' }}>
            <SettingsRow label="Theme" isDark={isDark}>
              <span className="fw-bold me-2" style={{ color: accentColor, fontSize: '0.9rem', transition: 'color 0.3s ease' }}>{theme}</span>
              <ToggleSwitch isOn={isDark} onToggle={() => setTheme(isDark ? 'Light' : 'Dark')} activeColor={accentColor} />
            </SettingsRow>
            
            <SettingsRow label="Accent Color" isDark={isDark}>
              <div className="d-flex gap-2">
                {availableColors.map(color => (
                  <ColorDot key={color} color={color} isActive={accentColor === color} onClick={() => setAccentColor(color)} isDark={isDark} />
                ))}
              </div>
            </SettingsRow>
            
            <SettingsRow label="Font Size" isLast={true} isDark={isDark}>
              <div className="position-relative d-flex align-items-center justify-content-end" style={{ width: '120px' }}>
                <select 
                  value={fontSize}
                  onChange={(e) => setFontSize(e.target.value)}
                  className="border-0 shadow-none fw-bold bg-transparent" 
                  style={{ 
                    cursor: 'pointer', 
                    appearance: 'none', 
                    WebkitAppearance: 'none', // Hides native arrow on iOS/Safari
                    MozAppearance: 'none',    // Hides native arrow on Firefox
                    paddingRight: '24px', 
                    color: accentColor, 
                    textAlign: 'right',
                    width: '100%',
                    outline: 'none',
                    transition: 'color 0.3s ease'
                  }}
                >
                  <option className={isDark ? 'bg-dark text-light' : 'text-dark'} value="Small">Small</option>
                  <option className={isDark ? 'bg-dark text-light' : 'text-dark'} value="Medium">Medium</option>
                  <option className={isDark ? 'bg-dark text-light' : 'text-dark'} value="Large">Large</option>
                </select>
                <div className="position-absolute end-0" style={{ pointerEvents: 'none', color: accentColor, transition: 'color 0.3s ease' }}>
                  <Icons.ChevronDown />
                </div>
              </div>
            </SettingsRow>
          </div>

          <h5 className="fw-bold mb-3 mt-4" style={{ color: isDark ? '#f9fafb' : '#111827', transition: 'color 0.3s ease' }}>Accessibility</h5>
          <div className="mb-4 rounded-4 shadow-sm" style={{ backgroundColor: isDark ? '#1f2937' : 'white', transition: 'background-color 0.3s ease' }}>
            <SettingsRow label="High Contrast" isDark={isDark}>
              <ToggleSwitch isOn={highContrast} onToggle={() => setHighContrast(!highContrast)} activeColor={accentColor} />
            </SettingsRow>
            <SettingsRow label="Reduce motion" isLast={true} isDark={isDark}>
              <ToggleSwitch isOn={reduceMotion} onToggle={() => setReduceMotion(!reduceMotion)} activeColor={accentColor} />
            </SettingsRow>
          </div>

          <h5 className="fw-bold mb-3 mt-4" style={{ color: isDark ? '#f9fafb' : '#111827', transition: 'color 0.3s ease' }}>Notifications</h5>
          <div className="mb-4 rounded-4 shadow-sm" style={{ backgroundColor: isDark ? '#1f2937' : 'white', transition: 'background-color 0.3s ease' }}>
            <SettingsRow label="Study Reminders" isDark={isDark}>
              <ToggleSwitch isOn={studyReminders} onToggle={() => setStudyReminders(!studyReminders)} activeColor={accentColor} />
            </SettingsRow>
            <SettingsRow label="Quiz Reminders" isLast={true} isDark={isDark}>
              <ToggleSwitch isOn={quizReminders} onToggle={() => setQuizReminders(!quizReminders)} activeColor={accentColor} />
            </SettingsRow>
          </div>

          <div className="mt-5 mb-4">
            <button onClick={() => navigate('/')} className={`btn w-100 py-3 fw-bold shadow-sm d-flex justify-content-center align-items-center gap-2 ${isDark ? 'btn-outline-danger' : ''}`} style={{ borderRadius: '1rem', backgroundColor: isDark ? 'transparent' : '#fee2e2', color: isDark ? '#fca5a5' : '#991b1b', border: isDark ? '2px solid #ef4444' : 'none', transition: 'all 0.3s ease' }}>
              <Icons.LogOut /> Log Out
            </button>
          </div>

        </div>
      </div>

      <div className={`fixed-bottom shadow-lg border-top w-100 d-lg-none ${isDark ? 'border-secondary' : 'bg-white'}`} style={{ borderTopLeftRadius: '1.5rem', borderTopRightRadius: '1.5rem', zIndex: 1000, backgroundColor: isDark ? '#1f2937' : 'white', transition: 'background-color 0.3s ease' }}>
        <div className="d-flex justify-content-around align-items-center py-2 px-1 pb-3">
          <div className={`d-flex flex-column align-items-center cursor-pointer ${isDark ? 'text-light' : 'text-muted'}`} onClick={() => navigate('/dashboard')} style={{ opacity: 0.6 }}>
            <div className="d-flex align-items-center justify-content-center mb-1" style={{ width: '48px', height: '32px' }}><Icons.Dashboard /></div>
            <span className="fw-semibold" style={{ fontSize: '0.65rem' }}>Dashboard</span>
          </div>
          <div className={`d-flex flex-column align-items-center cursor-pointer ${isDark ? 'text-light' : 'text-muted'}`} onClick={() => navigate('/tools')} style={{ opacity: 0.6 }}>
            <Icons.Book />
            <span className="fw-semibold mt-1" style={{ fontSize: '0.65rem' }}>Tools</span>
          </div>
          <div className={`d-flex flex-column align-items-center cursor-pointer ${isDark ? 'text-light' : 'text-muted'}`} onClick={() => navigate('/analytics')} style={{ opacity: 0.6 }}>
            <Icons.Chart />
            <span className="fw-semibold mt-1" style={{ fontSize: '0.65rem' }}>Analytics</span>
          </div>
          <div className={`d-flex flex-column align-items-center cursor-pointer ${isDark ? 'text-light' : 'text-muted'}`} onClick={() => navigate('/planner')} style={{ opacity: 0.6 }}>
            <Icons.Planner />
            <span className="fw-semibold mt-1" style={{ fontSize: '0.65rem' }}>Planner</span>
          </div>
          <div className="d-flex flex-column align-items-center cursor-pointer">
            <div className="d-flex align-items-center justify-content-center rounded-4 mb-1 shadow-sm" style={{ backgroundColor: accentColor, width: '48px', height: '32px', color: 'white', transition: 'background-color 0.3s ease' }}>
              <Icons.User />
            </div>
            <span className="fw-bold" style={{ fontSize: '0.65rem', color: accentColor, transition: 'color 0.3s ease' }}>Profile</span>
          </div>
        </div>
      </div>
    </div>
  );
}