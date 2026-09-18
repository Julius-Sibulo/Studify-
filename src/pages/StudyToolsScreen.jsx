import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../ThemeContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const Icons = {
  ArrowLeft: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>,
  Calendar: () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>,
  CheckCircle: () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>,
  Timer: () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="13" r="8"></circle><polyline points="12 9 12 13 14 15"></polyline><line x1="12" y1="2" x2="12" y2="4"></line><line x1="10" y1="2" x2="14" y2="2"></line></svg>,
  Bell: () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>,
  TrackerLine: () => <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>,
  TrackerBars: () => <svg width="48" height="48" viewBox="0 0 24 24" fill="#86efac" stroke="none"><rect x="4" y="14" width="4" height="6" rx="2"></rect><rect x="10" y="10" width="4" height="10" rx="2"></rect><rect x="16" y="6" width="4" height="14" rx="2"></rect></svg>,
  Dashboard: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>,
  Book: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>,
  Chart: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18"></path><path d="M18 17V9"></path><path d="M13 17V5"></path><path d="M8 17v-3"></path></svg>,
  Planner: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect><path d="M9 14h6"></path><path d="M9 10h6"></path><path d="M9 18h6"></path></svg>,
  User: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
};

const ToolCard = ({ title, description, bg, icon, customIconBg, isDark, onClick }) => (
  <div className="col-6 col-lg-3 mb-3" onClick={onClick}>
    <div className="card h-100 border-0 shadow-sm d-flex flex-column align-items-center text-center p-4 cursor-pointer hover-zoom" style={{ backgroundColor: isDark ? '#374151' : bg, borderRadius: '1.25rem', transition: 'transform 0.2s' }}>
      <div className="d-flex align-items-center justify-content-center mb-3 rounded-circle" style={{ width: '48px', height: '48px', backgroundColor: customIconBg || (isDark ? '#1f2937' : 'transparent') }}>
        {icon}
      </div>
      <h6 className="fw-bold mb-1" style={{ fontSize: '1rem', color: isDark ? '#f9fafb' : '#1f2937' }}>{title}</h6>
      <p className="mb-0" style={{ fontSize: '0.75rem', lineHeight: '1.2', color: isDark ? '#9ca3af' : '#6b7280' }}>{description}</p>
    </div>
  </div>
);

export default function StudyToolsScreen() {
  const navigate = useNavigate();
  const { isDark, accentColor } = useTheme();

  return (
    <div className={`d-flex min-vh-100 font-sans ${isDark ? 'bg-dark' : 'bg-light'}`} style={{ backgroundColor: isDark ? '#111827' : '#f8f9fa' }}>
      
      <aside className={`d-none d-lg-flex flex-column align-items-center border-end shadow-sm py-4 sticky-top ${isDark ? 'border-secondary' : 'bg-white'}`} style={{ width: '100px', height: '100vh', zIndex: 1000, backgroundColor: isDark ? '#1f2937' : 'white' }}>
        <div className="mb-5 text-center">
          <div className={`rounded-circle d-flex align-items-center justify-content-center mx-auto shadow-sm border ${isDark ? 'bg-dark border-secondary' : 'bg-light'}`} style={{ width: '50px', height: '50px' }}>
            <img src="/UNCSeal.png" alt="Seal" style={{ width: '35px', objectFit: 'contain', filter: isDark ? 'brightness(0) invert(1)' : 'none' }} />
          </div>
        </div>

        <div className="d-flex flex-column gap-4 w-100 align-items-center">
          <div className={`d-flex flex-column align-items-center cursor-pointer ${isDark ? 'text-light' : 'text-muted'}`} onClick={() => navigate('/dashboard')} style={{ opacity: 0.6 }}>
            <div className="d-flex align-items-center justify-content-center mb-1" style={{ width: '48px', height: '48px' }}><Icons.Dashboard /></div>
            <span className="fw-semibold" style={{ fontSize: '0.65rem' }}>Dashboard</span>
          </div>
          <div className="d-flex flex-column align-items-center text-center cursor-pointer">
            <div className="d-flex align-items-center justify-content-center rounded-4 mb-1 shadow-sm" style={{ backgroundColor: accentColor, width: '48px', height: '48px', color: 'white' }}>
              <Icons.Book />
            </div>
            <span className="fw-bold" style={{ fontSize: '0.65rem', color: accentColor }}>Study Tools</span>
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

        <div className={`mt-auto d-flex flex-column align-items-center cursor-pointer ${isDark ? 'text-light' : 'text-muted'}`} onClick={() => navigate('/profile')} style={{ opacity: 0.6 }}>
          <div className="d-flex align-items-center justify-content-center mb-1" style={{ width: '48px', height: '48px' }}><Icons.User /></div>
          <span className="fw-semibold" style={{ fontSize: '0.65rem' }}>Profile</span>
        </div>
      </aside>

      <div className="flex-grow-1 overflow-auto" style={{ paddingBottom: '100px' }}>
        
        <div style={{ backgroundColor: accentColor }}>
          <div className="container-fluid mx-auto px-4 py-3 d-flex align-items-center justify-content-center position-relative" style={{ maxWidth: '900px', height: '60px' }}>
            <button onClick={() => navigate('/dashboard')} className="btn btn-link p-0 border-0 position-absolute start-0 ms-3" style={{ zIndex: 10 }}>
              <Icons.ArrowLeft />
            </button>
            <h5 className="text-white fw-bold mb-0">Study Tools</h5>
          </div>
        </div>

        <div className="container-fluid px-4 py-4 mx-auto" style={{ maxWidth: '900px' }}>
          
          <div className="row g-4 mb-4 mt-1">
            <ToolCard isDark={isDark} title="Calendar" description="View Schedule and deadlines" bg="#F3E8FF" icon={<Icons.Calendar />} onClick={() => navigate('/calendar')} />
            
            {/* FIX: Clicking this card now navigates to the Planner AND passes a message to open the Goals tab! */}
            <ToolCard isDark={isDark} title="To-Do-List" description="Organize your tasks" bg="#DCFCE7" icon={<Icons.CheckCircle />} customIconBg="#86efac" onClick={() => navigate('/planner', { state: { activeTab: 'Goals' } })} />
            
            <ToolCard isDark={isDark} title="Study Timer" description="Pomodoro Timer to stay focused" bg="#FFE4E6" icon={<Icons.Timer />} onClick={() => navigate('/timer')} />
            <ToolCard isDark={isDark} title="Reminders" description="Set reminders for important dates" bg="#FEF9C3" icon={<Icons.Bell />} />
          </div>

          <hr className="opacity-25 my-5" style={{ borderColor: isDark ? '#f3f4f6' : '#6c757d' }} />

          <div className="card border-0 shadow-sm" style={{ backgroundColor: isDark ? '#064e3b' : '#DCFCE7', borderRadius: '1.5rem' }}>
            <div className="card-body d-flex align-items-center justify-content-between p-4 p-md-5">
              <div className="d-flex align-items-center gap-4">
                <div className="rounded-3 d-flex align-items-center justify-content-center shadow-sm d-none d-sm-flex" style={{ width: '64px', height: '64px', backgroundColor: accentColor }}>
                  <Icons.TrackerLine />
                </div>
                <div>
                  <h4 className="fw-bold mb-1" style={{ color: isDark ? '#f9fafb' : '#111827' }}>Study Tracker</h4>
                  <p className="mb-0" style={{ fontSize: '0.85rem', maxWidth: '200px', color: isDark ? '#a7f3d0' : '#6b7280' }}>Track your daily study streak and time</p>
                </div>
              </div>
              <div className="me-2">
                <Icons.TrackerBars />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`fixed-bottom shadow-lg border-top w-100 d-lg-none ${isDark ? 'border-secondary' : 'bg-white'}`} style={{ borderTopLeftRadius: '1.5rem', borderTopRightRadius: '1.5rem', zIndex: 1000, backgroundColor: isDark ? '#1f2937' : 'white' }}>
        <div className="d-flex justify-content-around align-items-center py-2 px-1 pb-3">
          <div className={`d-flex flex-column align-items-center cursor-pointer ${isDark ? 'text-light' : 'text-muted'}`} onClick={() => navigate('/dashboard')} style={{ opacity: 0.6 }}>
            <div className="d-flex align-items-center justify-content-center mb-1" style={{ width: '48px', height: '32px' }}><Icons.Dashboard /></div>
            <span className="fw-semibold" style={{ fontSize: '0.65rem' }}>Dashboard</span>
          </div>
          <div className="d-flex flex-column align-items-center cursor-pointer">
            <div className="d-flex align-items-center justify-content-center rounded-4 mb-1" style={{ backgroundColor: accentColor, width: '48px', height: '32px', color: 'white' }}>
              <Icons.Book />
            </div>
            <span className="fw-bold" style={{ fontSize: '0.65rem', color: accentColor }}>Study Tools</span>
          </div>
          <div className={`d-flex flex-column align-items-center cursor-pointer ${isDark ? 'text-light' : 'text-muted'}`} onClick={() => navigate('/analytics')} style={{ opacity: 0.6 }}>
            <Icons.Chart />
            <span className="fw-semibold mt-1" style={{ fontSize: '0.65rem' }}>Analytics</span>
          </div>
          <div className={`d-flex flex-column align-items-center cursor-pointer ${isDark ? 'text-light' : 'text-muted'}`} onClick={() => navigate('/planner')} style={{ opacity: 0.6 }}>
            <Icons.Planner />
            <span className="fw-semibold mt-1" style={{ fontSize: '0.65rem' }}>Planner</span>
          </div>
          <div className={`d-flex flex-column align-items-center cursor-pointer ${isDark ? 'text-light' : 'text-muted'}`} onClick={() => navigate('/profile')} style={{ opacity: 0.6 }}>
            <Icons.User />
            <span className="fw-semibold mt-1" style={{ fontSize: '0.65rem' }}>Profile</span>
          </div>
        </div>
      </div>
    </div>
  );
}