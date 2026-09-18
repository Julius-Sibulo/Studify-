import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../ThemeContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const Icons = {
  Menu: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>,
  Bell: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>,
  Trophy: () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#EAB308" strokeWidth="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>,
  Bulb: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18h6"></path><path d="M10 22h4"></path><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1.45.62 2.81 1.5 3.5.76.76 1.23 1.52 1.41 2.5"></path></svg>,
  File: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>,
  Math: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><line x1="8" y1="12" x2="16" y2="12"></line><line x1="12" y1="8" x2="12" y2="16"></line></svg>,
  Chart: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18"></path><path d="M18 17V9"></path><path d="M13 17V5"></path><path d="M8 17v-3"></path></svg>,
  Dashboard: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>,
  Planner: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect><path d="M9 14h6"></path><path d="M9 10h6"></path><path d="M9 18h6"></path></svg>,
  User: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
};

const SubjectCard = ({ title, progress, bg, color, icon, isDark }) => (
  <div className="col-6 col-lg-3 mb-3"> 
    <div className="card h-100 border-0 shadow-sm" style={{ backgroundColor: isDark ? '#374151' : bg, borderRadius: '1.25rem' }}>
      <div className="card-body d-flex flex-column p-3">
        <div className="d-flex align-items-center mb-3">
          <div className="rounded-3 d-flex align-items-center justify-content-center me-2 shadow-sm" style={{ width: '38px', height: '38px', backgroundColor: isDark ? '#1f2937' : 'white', color: color, flexShrink: 0 }}>
            {icon}
          </div>
          <h6 className="fw-bold mb-0" style={{ fontSize: '0.8rem', color: isDark ? '#f9fafb' : '#1f2937', lineHeight: '1.2' }}>{title}</h6>
        </div>
        <div className="mt-auto">
          <div className="fw-bold mb-1" style={{ fontSize: '0.75rem', color: isDark ? '#f3f4f6' : color }}>{progress}%</div>
          <div className="progress mb-2" style={{ height: '6px', backgroundColor: isDark ? '#1f2937' : 'rgba(255,255,255,0.6)' }}>
            <div className="progress-bar rounded-pill" style={{ width: `${progress}%`, backgroundColor: color }}></div>
          </div>
          <button className="btn w-100 rounded-pill fw-bold shadow-sm py-1 border-0 mt-2" style={{ fontSize: '0.75rem', backgroundColor: isDark ? '#1f2937' : 'white', color: color }}>
            Continue
          </button>
        </div>
      </div>
    </div>
  </div>
);

const ActivityRow = ({ title, subtitle, score, time, actionText, iconColor, bgLight, icon, isDark }) => (
  <div className="d-flex align-items-center justify-content-between py-3 border-bottom" style={{ borderColor: isDark ? '#374151' : '#f3f4f6' }}>
    <div className="d-flex align-items-center">
      <div className="rounded-3 d-flex align-items-center justify-content-center me-3 flex-shrink-0" style={{ width: '42px', height: '42px', backgroundColor: isDark ? '#374151' : bgLight, color: iconColor }}>
        {icon}
      </div>
      <div>
        <h6 className="fw-bold mb-0" style={{ fontSize: '0.85rem', color: isDark ? '#f9fafb' : iconColor }}>{title}</h6>
        <small className="d-block text-truncate" style={{ fontSize: '0.7rem', maxWidth: '200px', color: isDark ? '#9ca3af' : '#6b7280' }}>{subtitle}</small>
      </div>
    </div>
    <div className="text-end d-flex flex-column align-items-end flex-shrink-0 ms-2">
      {score && <span className="fw-bold" style={{ fontSize: '0.75rem', color: isDark ? '#f3f4f6' : '#1f2937' }}>{score}</span>}
      <small className="mb-1" style={{ fontSize: '0.65rem', color: isDark ? '#9ca3af' : '#6b7280' }}>{time}</small>
      {actionText && (
        <button className="btn btn-sm rounded-pill py-0 px-3 fw-bold" style={{ fontSize: '0.7rem', border: `1px solid ${iconColor}`, color: iconColor }}>
          {actionText}
        </button>
      )}
    </div>
  </div>
);

export default function DashboardScreen() {
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
          <div className="d-flex flex-column align-items-center text-center cursor-pointer">
            <div className="d-flex align-items-center justify-content-center rounded-4 mb-1" style={{ backgroundColor: accentColor, width: '48px', height: '48px', color: 'white' }}>
              <Icons.Dashboard />
            </div>
            <span className="fw-bold" style={{ fontSize: '0.65rem', color: accentColor }}>Home</span>
          </div>
          <div className={`d-flex flex-column align-items-center cursor-pointer ${isDark ? 'text-light' : 'text-muted'}`} onClick={() => navigate('/tools')} style={{ opacity: 0.6 }}>
            <div className="d-flex align-items-center justify-content-center mb-1" style={{ width: '48px', height: '48px' }}><Icons.File /></div>
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

        <div className={`mt-auto d-flex flex-column align-items-center cursor-pointer ${isDark ? 'text-light' : 'text-muted'}`} onClick={() => navigate('/profile')} style={{ opacity: 0.6 }}>
          <div className="d-flex align-items-center justify-content-center mb-1" style={{ width: '48px', height: '48px' }}><Icons.User /></div>
          <span className="fw-semibold" style={{ fontSize: '0.65rem' }}>Profile</span>
        </div>
      </aside>

      <div className="flex-grow-1 overflow-auto" style={{ paddingBottom: '90px' }}>
        <div className="container-fluid pt-4 px-4 px-lg-5 pb-5" style={{ maxWidth: '1000px' }}>
          
          <header className="d-flex justify-content-between align-items-center mb-4">
            <button className={`btn btn-link p-0 border-0 d-lg-none ${isDark ? 'text-white' : 'text-dark'}`}><Icons.Menu /></button>
            <div className="d-none d-lg-block"></div> 
            <button className={`btn btn-link p-0 border-0 ${isDark ? 'text-white' : 'text-dark'}`}><Icons.Bell /></button>
          </header>

          <div className="mb-4">
            <h1 className="fw-bolder mb-0" style={{ fontSize: '1.75rem', color: isDark ? '#f9fafb' : '#111827' }}>Hi, Jul!</h1>
            <p style={{ fontSize: '0.85rem', color: isDark ? '#9ca3af' : '#6b7280' }}>Keep going, future accountant!</p>
          </div>

          {/* Hero Card */}
          <div className="card border-0 shadow-sm mb-4" style={{ borderRadius: '1.5rem', backgroundColor: isDark ? '#1f2937' : 'white' }}>
            <div className="card-body d-flex align-items-center justify-content-between p-4 p-md-5">
              <div className="d-flex align-items-center">
                <div className="rounded-circle d-flex align-items-center justify-content-center me-3 me-md-4 border border-3" style={{ width: '70px', height: '70px', backgroundColor: '#FEF08A', borderColor: isDark ? '#374151' : '#f8f9fa' }}>
                  <Icons.Trophy />
                </div>
                <div>
                  <h4 className="fw-bold mb-1" style={{ color: isDark ? '#f9fafb' : '#111827' }}>You're doing great!</h4>
                  <p className="mb-0" style={{ fontSize: '0.85rem', color: isDark ? '#9ca3af' : '#6b7280' }}>You passed 3 quizzes today. Keep the Momentum!</p>
                </div>
              </div>
              <div className="text-end d-none d-sm-block">
                <div className="d-flex align-items-center justify-content-end mb-1">
                  <svg width="32" height="32" viewBox="0 0 36 36" className="me-2" style={{ transform: 'rotate(-90deg)' }}>
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke={isDark ? '#4b5563' : '#e5e7eb'} strokeWidth="4" />
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke={accentColor} strokeWidth="4" strokeDasharray="70, 100" />
                  </svg>
                  <span className="fw-bold h4 mb-0" style={{ color: isDark ? '#f9fafb' : '#111827' }}>70%</span>
                </div>
                <h6 className="fw-bold mb-0" style={{ fontSize: '0.85rem', color: isDark ? '#f3f4f6' : '#374151' }}>Today's Progress</h6>
              </div>
            </div>
          </div>

          {/* Your Subjects Row (Full Width!) */}
          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-end mb-3 px-1">
              <h5 className="fw-bold mb-0" style={{ color: isDark ? '#f9fafb' : '#111827' }}>Your Subjects</h5>
              <a href="#" className="text-decoration-none fw-bold" style={{ color: accentColor, fontSize: '0.85rem' }}>See All</a>
            </div>
            <div className="row g-3">
              <SubjectCard isDark={isDark} title="Financial Accounting" progress={23} bg="#FEF9C3" color="#D97706" icon={<Icons.Bulb />} />
              <SubjectCard isDark={isDark} title="Conceptual Framework" progress={81} bg="#F3E8FF" color="#9333EA" icon={<Icons.File />} />
              <SubjectCard isDark={isDark} title="Intermediate Accounting 1" progress={37} bg="#FFEDD5" color="#EA580C" icon={<Icons.Math />} />
              <SubjectCard isDark={isDark} title="Cost Accounting" progress={50} bg="#CCFBF1" color="#0D9488" icon={<Icons.Chart />} />
            </div>
          </div>

          {/* Recent Activity Row (Full Width below subjects) */}
          <div className="card border-0 shadow-sm" style={{ borderRadius: '1.5rem', backgroundColor: isDark ? '#1f2937' : 'white' }}>
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
                <h5 className="fw-bold mb-0" style={{ color: isDark ? '#f9fafb' : '#111827' }}>Recent Activity</h5>
                <div className="d-flex flex-wrap gap-2">
                  <span className="badge rounded-pill py-2 px-3 shadow-sm" style={{ backgroundColor: accentColor, color: 'white' }}>All</span>
                  <span className="badge rounded-pill py-2 px-3 shadow-sm" style={{ backgroundColor: isDark ? '#374151' : '#fee2e2', color: isDark ? '#9ca3af' : '#991b1b' }}>Quizzes</span>
                  <span className="badge rounded-pill py-2 px-3 shadow-sm" style={{ backgroundColor: isDark ? '#374151' : '#fee2e2', color: isDark ? '#9ca3af' : '#991b1b' }}>Notes</span>
                  <span className="badge rounded-pill py-2 px-3 shadow-sm" style={{ backgroundColor: isDark ? '#374151' : '#fee2e2', color: isDark ? '#9ca3af' : '#991b1b' }}>Videos</span>
                  <span className="badge rounded-pill py-2 px-3 shadow-sm" style={{ backgroundColor: isDark ? '#374151' : '#fee2e2', color: isDark ? '#9ca3af' : '#991b1b' }}>•••</span>
                </div>
              </div>
              <div>
                <ActivityRow isDark={isDark} title="Quiz Completed" subtitle="Financial Accounting" score="Score: 8/10" time="5 min ago" actionText="View" bgLight="#FEF9C3" iconColor="#D97706" icon={<Icons.Bulb />} />
                <ActivityRow isDark={isDark} title="Notes Viewed" subtitle="Cost Accounting - Activity Based..." time="10 mins ago" bgLight="#DBEAFE" iconColor="#3B82F6" icon={<Icons.File />} />
                <ActivityRow isDark={isDark} title="Continue Watching" subtitle="Intermediate Accounting 1..." score="80% Watched" actionText="Continue" bgLight="#FFEDD5" iconColor="#EA580C" icon={<Icons.Math />} />
                <ActivityRow isDark={isDark} title="Practice Problem Solved" subtitle="Cost Accounting..." score="Solved correctly" time="5 min ago" bgLight="#CCFBF1" iconColor="#0D9488" icon={<Icons.Chart />} />
              </div>
            </div>
          </div>
          
        </div>
      </div>

      <div className={`fixed-bottom shadow-lg border-top w-100 d-lg-none ${isDark ? 'border-secondary' : 'bg-white'}`} style={{ borderTopLeftRadius: '1.5rem', borderTopRightRadius: '1.5rem', zIndex: 1000, backgroundColor: isDark ? '#1f2937' : 'white' }}>
        <div className="d-flex justify-content-around align-items-center py-2 px-1 pb-3">
          <div className="d-flex flex-column align-items-center cursor-pointer">
            <div className="d-flex align-items-center justify-content-center rounded-4 mb-1" style={{ backgroundColor: accentColor, width: '48px', height: '32px', color: 'white' }}>
              <Icons.Dashboard />
            </div>
            <span className="fw-bold" style={{ fontSize: '0.65rem', color: accentColor }}>Home</span>
          </div>
          <div className={`d-flex flex-column align-items-center cursor-pointer ${isDark ? 'text-light' : 'text-muted'}`} onClick={() => navigate('/tools')} style={{ opacity: 0.6 }}>
            <Icons.File />
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
          <div className={`d-flex flex-column align-items-center cursor-pointer ${isDark ? 'text-light' : 'text-muted'}`} onClick={() => navigate('/profile')} style={{ opacity: 0.6 }}>
            <Icons.User />
            <span className="fw-semibold mt-1" style={{ fontSize: '0.65rem' }}>Profile</span>
          </div>
        </div>
      </div>
    </div>
  );
}