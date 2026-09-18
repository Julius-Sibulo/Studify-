import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // FIX: useLocation is securely imported!
import { useTheme } from '../ThemeContext';
import 'bootstrap/dist/css/bootstrap.min.css';

// ------------------------------------------------------------------
// SVG Icons
// ------------------------------------------------------------------
const Icons = {
  ArrowLeft: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>,
  ArrowLeftDark: ({ color }) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>,
  Bookmark: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>,
  CalendarSmall: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>,
  ClockSmall: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>,
  CheckGreen: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="#22c55e" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="9 12 11 14 15 10"></polyline></svg>,
  CheckRed: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="#ef4444" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="9 12 11 14 15 10"></polyline></svg>,
  CircleOutline: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle></svg>,
  ArrowRightSm: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>,
  Plus: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>,
  Search: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>,
  Filter: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>,
  Pin: ({ color }) => <svg width="20" height="20" viewBox="0 0 24 24" fill={color || "currentColor"} stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>,
  MoreVertical: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>,
  FileText: ({ color }) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>,
  
  // Navigation
  Dashboard: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>,
  Book: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>,
  Chart: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18"></path><path d="M18 17V9"></path><path d="M13 17V5"></path><path d="M8 17v-3"></path></svg>,
  Planner: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect><path d="M9 14h6"></path><path d="M9 10h6"></path><path d="M9 18h6"></path></svg>,
  User: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
};

// ------------------------------------------------------------------
// REUSABLE COMPONENTS
// ------------------------------------------------------------------
const TimelineItem = ({ time, period, dotColor, iconBg, icon, title, subtitle, duration, completed, isLast, isDark }) => (
  <div className="d-flex mb-3 position-relative">
    <div className="text-center me-3 flex-shrink-0 pt-2" style={{ width: '45px' }}>
      <div className="fw-bolder" style={{ fontSize: '0.9rem', lineHeight: '1', color: isDark ? '#f9fafb' : '#111827' }}>{time}</div>
      <div className="fw-semibold mt-1" style={{ fontSize: '0.7rem', color: isDark ? '#9ca3af' : '#4b5563' }}>{period}</div>
    </div>
    
    <div className="position-relative me-3 d-flex flex-column align-items-center">
      <div className="rounded-circle mt-3 position-relative" style={{ width: '6px', height: '6px', backgroundColor: dotColor, zIndex: 2 }}></div>
      {!isLast && <div className="position-absolute" style={{ width: '2px', height: 'calc(100% + 1.5rem)', top: '24px', zIndex: 1, backgroundColor: isDark ? '#374151' : '#e5e7eb' }}></div>}
    </div>

    <div className="card flex-grow-1 shadow-sm" style={{ borderRadius: '1rem', backgroundColor: isDark ? '#1f2937' : 'white', border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}` }}>
      <div className="card-body p-3 d-flex align-items-center">
        <div className="rounded-circle d-flex align-items-center justify-content-center me-3 shadow-sm flex-shrink-0" style={{ width: '45px', height: '45px', fontSize: '1.4rem', backgroundColor: iconBg }}>
          {icon}
        </div>
        <div className="flex-grow-1">
          <h6 className="fw-bold mb-0" style={{ fontSize: '0.9rem', color: isDark ? '#f9fafb' : '#111827' }}>{title}</h6>
          <div className="fw-semibold" style={{ fontSize: '0.75rem', color: isDark ? '#9ca3af' : '#6b7280' }}>{subtitle}</div>
          <div className="d-flex align-items-center mt-1 fw-bold" style={{ fontSize: '0.7rem', color: isDark ? '#9ca3af' : '#9ca3af' }}>
            <Icons.ClockSmall /> <span className="ms-1">{duration}</span>
          </div>
        </div>
        <div className="ms-2 cursor-pointer">
          {completed ? <Icons.CheckRed /> : <Icons.CircleOutline />}
        </div>
      </div>
    </div>
  </div>
);

const WeeklyDayBadge = ({ day, date, status, isDark, accentColor }) => {
  let bg = 'transparent';
  let border = 'transparent';
  let textColor = isDark ? '#9ca3af' : '#6b7280';
  let indicator = <div className="rounded-circle" style={{ width: '10px', height: '10px', backgroundColor: '#9ca3af' }}></div>;

  if (status === 'active') {
    bg = isDark ? '#374151' : '#fee2e2';
    border = accentColor;
    textColor = isDark ? '#f9fafb' : '#111827';
    indicator = <div className="rounded-circle" style={{ width: '12px', height: '12px', backgroundColor: accentColor }}></div>;
  } else if (status === 'past') {
    indicator = (
      <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '16px', height: '16px', backgroundColor: '#10b981' }}>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column align-items-center justify-content-center py-2 rounded-4" style={{ width: '45px', backgroundColor: bg, border: `1px solid ${border}` }}>
      <span className="fw-bold mb-1" style={{ fontSize: '0.75rem', color: textColor }}>{day}</span>
      <span className={`fw-bolder mb-2 ${status==='active' ? 'text-danger' : ''}`} style={{ fontSize: '0.95rem', color: status !== 'active' ? textColor : undefined }}>{date}</span>
      {indicator}
    </div>
  );
};

const NoteCard = ({ type, title, subtitle, date, isDark, accentColor }) => {
  const isPinned = type === 'pinned';
  
  return (
    <div className="card shadow-sm mb-3" style={{ borderRadius: '1rem', backgroundColor: isDark ? '#1f2937' : 'white', border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}` }}>
      <div className="card-body p-3 d-flex align-items-start">
        <div className="rounded-circle d-flex align-items-center justify-content-center me-3 mt-1 flex-shrink-0" style={{ width: '36px', height: '36px', backgroundColor: isPinned ? (isDark ? '#374151' : '#fee2e2') : (isDark ? '#374151' : '#ffedd5') }}>
          {isPinned ? <Icons.Pin color={accentColor} /> : <Icons.FileText color="#f97316" />}
        </div>
        <div className="flex-grow-1">
          <h6 className="fw-bold mb-1" style={{ fontSize: '0.9rem', color: isPinned ? accentColor : (isDark ? '#f9fafb' : '#111827') }}>{title}</h6>
          <p className="fw-semibold mb-2" style={{ fontSize: '0.8rem', color: isDark ? '#d1d5db' : '#374151' }}>{subtitle}</p>
          <div className="fw-bold" style={{ fontSize: '0.7rem', color: isDark ? '#9ca3af' : '#9ca3af' }}>{date}</div>
        </div>
        <div className="ms-2 cursor-pointer text-muted">
          <Icons.MoreVertical />
        </div>
      </div>
    </div>
  );
};

const GoalCard = ({ title, date, progress, color, icon, isDark }) => (
  <div className="card border-0 shadow-sm mb-3" style={{ borderRadius: '1rem', backgroundColor: isDark ? '#374151' : 'white' }}>
    <div className="card-body p-3 d-flex align-items-center">
      <div className="rounded-circle d-flex align-items-center justify-content-center me-3 shadow-sm flex-shrink-0" style={{ width: '48px', height: '48px', fontSize: '1.5rem', backgroundColor: isDark ? '#1f2937' : '#f8f9fa' }}>{icon}</div>
      <div className="flex-grow-1 me-3">
        <h6 className="fw-bold mb-0" style={{ fontSize: '0.85rem', color: isDark ? '#f9fafb' : '#111827' }}>{title}</h6>
        <div className="mb-2 fw-semibold" style={{ fontSize: '0.7rem', color: isDark ? '#9ca3af' : '#6b7280' }}>{date}</div>
        <div className="d-flex align-items-center">
          <div className="progress flex-grow-1 me-3" style={{ height: '6px', backgroundColor: isDark ? '#4b5563' : '#e5e7eb' }}>
            <div className="progress-bar rounded-pill" style={{ width: `${progress}%`, backgroundColor: color }}></div>
          </div>
          {progress === 100 ? <Icons.CheckGreen /> : <span className="fw-bold" style={{ fontSize: '0.75rem', color: isDark ? '#d1d5db' : '#4b5563', width: '32px' }}>{progress}%</span>}
        </div>
      </div>
      <div><Icons.ArrowRightSm /></div>
    </div>
  </div>
);

const AchievementCard = ({ value, label, icon, isDark }) => (
  <div className="col-4">
    <div className="card border-0 shadow-sm h-100 text-center" style={{ borderRadius: '1rem', backgroundColor: isDark ? '#374151' : 'white' }}>
      <div className="card-body p-2 p-md-3 d-flex flex-column align-items-center justify-content-center">
        <div className="mb-2" style={{ fontSize: '1.75rem' }}>{icon}</div>
        <h6 className="fw-bold mb-0" style={{ fontSize: '0.85rem', color: isDark ? '#f9fafb' : '#111827' }}>{value}</h6>
        <div style={{ fontSize: '0.65rem', color: isDark ? '#9ca3af' : '#6b7280' }}>{label}</div>
      </div>
    </div>
  </div>
);

export default function StudyPlannerScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark, accentColor } = useTheme();
  
  // Set starting tab based on navigation state, default to Schedule
  const [activeTab, setActiveTab] = useState(location.state?.activeTab || 'Schedule'); 

  const [todayString, setTodayString] = useState('');
  useEffect(() => {
    const phtDate = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Manila" }));
    setTodayString(phtDate.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }));
  }, []);

  // --- STATE: SCHEDULE ---
  const scheduleItems = [
    { id: 1, time: '10:00', period: 'AM', title: 'Watch: Cost Behavior', subtitle: 'Video Tutorial', duration: '45 min', dotColor: '#374151', iconBg: '#fef3c7', icon: '⏯️', completed: true },
    { id: 2, time: '11:30', period: 'AM', title: 'Practice Problems', subtitle: 'Class Classifications Set 1', duration: '60 min', dotColor: '#a855f7', iconBg: '#f3e8ff', icon: '📝', completed: false },
    { id: 3, time: '02:00', period: 'PM', title: 'Flashcards Review', subtitle: 'Key Terms', duration: '20 min', dotColor: '#fca5a5', iconBg: '#fce7f3', icon: '📇', completed: false },
    { id: 4, time: '03:00', period: 'PM', title: 'Note Review', subtitle: 'Cost Accounting Basics', duration: '30 min', dotColor: '#3b82f6', iconBg: '#dbeafe', icon: '📄', completed: false },
    { id: 5, time: '04:00', period: 'PM', title: 'Quiz: Basics', subtitle: '10-Question Quiz', duration: '20 min', dotColor: '#a78bfa', iconBg: '#e0e7ff', icon: '❓', completed: false }
  ];

  // --- STATE: GOALS ---
  const [goals, setGoals] = useState([
    { id: 1, title: 'Finish all flashcards this week', date: 'May 19, 2024', progress: 80, color: '#ef4444', icon: '🎯' },
    { id: 2, title: 'Score 85% in practice quizzes', date: 'May 25, 2024', progress: 65, color: '#a855f7', icon: '📊' },
    { id: 3, title: 'Complete 5 video tutorials', date: 'May 20, 2024', progress: 100, color: '#22c55e', icon: '📖' },
    { id: 4, title: 'Review before midterms', date: 'June 1, 2024', progress: 40, color: '#f59e0b', icon: '📅' }
  ]);
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoalTitle, setNewGoalTitle] = useState('');

  const handleAddGoal = (e) => {
    e.preventDefault();
    if (!newGoalTitle) return;
    setGoals([...goals, { id: Date.now(), title: newGoalTitle, date: todayString, progress: 0, color: accentColor, icon: '🚀' }]);
    setNewGoalTitle(''); setShowAddGoal(false);
  };

  return (
    <div className={`d-flex min-vh-100 font-sans ${isDark ? 'bg-dark' : 'bg-light'} position-relative`} style={{ backgroundColor: isDark ? '#111827' : '#f9fafb' }}>
      
      {/* SIDEBAR */}
      <aside className={`d-none d-lg-flex flex-column align-items-center border-end shadow-sm py-4 sticky-top ${isDark ? 'border-secondary' : 'bg-white'}`} style={{ width: '100px', height: '100vh', zIndex: 1000, backgroundColor: isDark ? '#1f2937' : 'white' }}>
        <div className="mb-5 text-center">
          <div className={`rounded-circle d-flex align-items-center justify-content-center mx-auto shadow-sm border ${isDark ? 'bg-dark border-secondary' : 'bg-light'}`} style={{ width: '50px', height: '50px' }}>
            <img src={`${import.meta.env.BASE_URL}UNCSeal.png`} alt="Seal" style={{ width: '35px', objectFit: 'contain', filter: isDark ? 'brightness(0) invert(1)' : 'none' }} />
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
          <div className="d-flex flex-column align-items-center text-center cursor-pointer">
            <div className="d-flex align-items-center justify-content-center rounded-4 mb-1 shadow-sm" style={{ backgroundColor: accentColor, width: '48px', height: '48px', color: 'white' }}>
              <Icons.Planner />
            </div>
            <span className="fw-bold" style={{ fontSize: '0.65rem', color: accentColor }}>Planner</span>
          </div>
        </div>
        <div className={`mt-auto d-flex flex-column align-items-center cursor-pointer ${isDark ? 'text-light' : 'text-muted'}`} onClick={() => navigate('/profile')} style={{ opacity: 0.6 }}>
          <div className="d-flex align-items-center justify-content-center mb-1" style={{ width: '48px', height: '48px' }}><Icons.User /></div>
          <span className="fw-semibold" style={{ fontSize: '0.65rem' }}>Profile</span>
        </div>
      </aside>

      <div className="flex-grow-1 overflow-auto" style={{ paddingBottom: '100px' }}>
        
        {/* Header Block matching the screenshot */}
        <div style={{ backgroundColor: accentColor, paddingBottom: '1.5rem' }}>
          <div className="container-fluid mx-auto px-4 pt-4 pb-2" style={{ maxWidth: '800px' }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <button onClick={() => navigate(-1)} className="btn btn-link p-0 border-0"><Icons.ArrowLeft /></button>
              <h5 className="text-white fw-normal mb-0" style={{ fontSize: '1.25rem' }}>Study Planner</h5>
              <button className="btn btn-link p-0 border-0"><Icons.Bookmark /></button>
            </div>
            
            <div className="d-flex justify-content-around px-2 px-md-5 mt-4">
              {['Schedule', 'Goals', 'Notes'].map(tab => (
                <div 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 cursor-pointer transition ${activeTab === tab ? 'bg-white rounded-pill shadow-sm fw-bold' : 'text-white fw-medium'}`} 
                  style={{ color: activeTab === tab ? accentColor : 'white', fontSize: '0.9rem' }}
                >
                  {tab}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="container-fluid px-3 px-md-4 mx-auto pt-4" style={{ maxWidth: '800px' }}>
          
          {/* ========================================= */}
          {/* TAB 1: SCHEDULE                           */}
          {/* ========================================= */}
          {activeTab === 'Schedule' && (
            <>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h6 className="fw-bold mb-0" style={{ color: isDark ? '#f9fafb' : '#111827', fontSize: '1rem' }}>Today's Schedule</h6>
                <div className="d-flex align-items-center" style={{ fontSize: '0.8rem', color: isDark ? '#9ca3af' : '#4b5563' }}>
                  <span className="me-2">May 14, 2024</span>
                  <div style={{ color: accentColor }}><Icons.CalendarSmall /></div>
                </div>
              </div>

              {/* Timeline List */}
              <div className="mb-4">
                {scheduleItems.map((item, i) => (
                  <TimelineItem 
                    key={item.id} 
                    isDark={isDark} 
                    time={item.time} 
                    period={item.period} 
                    dotColor={item.dotColor}
                    iconBg={item.iconBg} 
                    icon={item.icon} 
                    title={item.title} 
                    subtitle={item.subtitle} 
                    duration={item.duration} 
                    completed={item.completed} 
                    isLast={i === scheduleItems.length - 1} 
                  />
                ))}
              </div>

              {/* Weekly Calendar */}
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="fw-bold mb-0" style={{ color: isDark ? '#f9fafb' : '#111827', fontSize: '1rem' }}>Weekly Calendar</h6>
                <span className="fw-bold cursor-pointer" style={{ color: accentColor, fontSize: '0.75rem' }}>View Full Calendar</span>
              </div>
              <div className="card border-0 shadow-sm mb-4" style={{ borderRadius: '1.25rem', backgroundColor: isDark ? '#1f2937' : 'white', border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}` }}>
                <div className="card-body p-3 d-flex justify-content-between align-items-center">
                  <WeeklyDayBadge day="Mon" date="13" status="past" isDark={isDark} accentColor={accentColor} />
                  <WeeklyDayBadge day="Tue" date="14" status="active" isDark={isDark} accentColor={accentColor} />
                  <WeeklyDayBadge day="Wed" date="15" status="future" isDark={isDark} accentColor={accentColor} />
                  <WeeklyDayBadge day="Thu" date="16" status="future" isDark={isDark} accentColor={accentColor} />
                  <WeeklyDayBadge day="Fri" date="17" status="future" isDark={isDark} accentColor={accentColor} />
                  <WeeklyDayBadge day="Sat" date="18" status="future" isDark={isDark} accentColor={accentColor} />
                  <WeeklyDayBadge day="Sun" date="19" status="future" isDark={isDark} accentColor={accentColor} />
                </div>
              </div>

              {/* Bottom Summary Cards */}
              <div className="row g-3">
                <div className="col-4">
                  <div className="card border-0 shadow-sm h-100 text-center" style={{ borderRadius: '1rem', backgroundColor: isDark ? '#374151' : 'white', border: `1px solid ${isDark ? '#4b5563' : '#e5e7eb'}` }}>
                    <div className="card-body p-3">
                      <div className="mb-2 fs-3 text-primary">⏱️</div>
                      <h6 className="fw-bolder mb-1" style={{ fontSize: '0.9rem', color: isDark ? '#f9fafb' : '#111827' }}>8h 30m</h6>
                      <div className="fw-bold" style={{ fontSize: '0.7rem', color: isDark ? '#9ca3af' : '#6b7280' }}>Planned Time</div>
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="card border-0 shadow-sm h-100 text-center" style={{ borderRadius: '1rem', backgroundColor: isDark ? '#374151' : 'white', border: `1px solid ${isDark ? '#4b5563' : '#e5e7eb'}` }}>
                    <div className="card-body p-3">
                      <div className="mb-2 fs-3">🎯</div>
                      <h6 className="fw-bolder mb-1" style={{ fontSize: '0.9rem', color: isDark ? '#f9fafb' : '#111827' }}>5</h6>
                      <div className="fw-bold" style={{ fontSize: '0.7rem', color: isDark ? '#9ca3af' : '#6b7280' }}>Tasks</div>
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="card border-0 shadow-sm h-100 text-center" style={{ borderRadius: '1rem', backgroundColor: isDark ? '#374151' : 'white', border: `1px solid ${isDark ? '#4b5563' : '#e5e7eb'}` }}>
                    <div className="card-body p-3">
                      <div className="mb-2 fs-3">🔥</div>
                      <h6 className="fw-bolder mb-1" style={{ fontSize: '0.9rem', color: isDark ? '#f9fafb' : '#111827' }}>12</h6>
                      <div className="fw-bold" style={{ fontSize: '0.7rem', color: isDark ? '#9ca3af' : '#6b7280' }}>Day Streak</div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ========================================= */}
          {/* TAB 2: GOALS                              */}
          {/* ========================================= */}
          {activeTab === 'Goals' && (
            <>
              <div className="card border-0 shadow-sm mb-4 rounded-4" style={{ backgroundColor: isDark ? '#1f2937' : 'white' }}>
                <div className="card-body p-4 d-flex align-items-center">
                  <div className="position-relative me-4 flex-shrink-0" style={{ width: '100px', height: '100px' }}>
                    <svg viewBox="0 0 36 36" width="100%" height="100%">
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke={isDark ? '#374151' : '#f3f4f6'} strokeWidth="4" />
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke={accentColor} strokeWidth="4" strokeDasharray="68, 100" />
                    </svg>
                    <div className="position-absolute top-50 start-50 translate-middle text-center w-100">
                      <h4 className="fw-bold mb-0" style={{ color: accentColor, lineHeight: '1' }}>68%</h4>
                      <span style={{ fontSize: '0.6rem', color: isDark ? '#9ca3af' : '#6b7280' }}>Completed</span>
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <div className="mb-2" style={{ fontSize: '0.8rem', color: isDark ? '#d1d5db' : '#374151' }}><strong style={{ color: isDark ? '#f9fafb' : '#111827' }}>8/</strong> 12 Goals Completed</div>
                    <div className="mb-2" style={{ fontSize: '0.8rem', color: isDark ? '#d1d5db' : '#374151' }}><strong style={{ color: isDark ? '#f9fafb' : '#111827' }}>22h/</strong> 30h Study Time</div>
                    <div style={{ fontSize: '0.8rem', color: isDark ? '#d1d5db' : '#374151' }}><strong style={{ color: isDark ? '#f9fafb' : '#111827' }}>85%</strong> Avg Quiz Score</div>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-end mb-3 px-1">
                <h6 className="fw-bold mb-0" style={{ color: isDark ? '#f9fafb' : '#111827' }}>Academic Goals</h6>
                <span onClick={() => setShowAddGoal(!showAddGoal)} className="fw-bold cursor-pointer" style={{ color: accentColor, fontSize: '0.75rem' }}>+ Add Goal</span>
              </div>

              {showAddGoal && (
                <form onSubmit={handleAddGoal} className={`mb-3 p-3 rounded-4 shadow-sm ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                   <input type="text" className={`form-control border-0 shadow-sm mb-3 fw-semibold ${isDark ? 'bg-secondary text-white' : 'bg-light'}`} placeholder="E.g., Read Chapter 4..." value={newGoalTitle} onChange={e => setNewGoalTitle(e.target.value)} required />
                   <button type="submit" className="btn text-white w-100 fw-bold rounded-pill" style={{ backgroundColor: accentColor }}>Save Goal</button>
                </form>
              )}

              <div className="mb-4">
                {goals.map(goal => (
                  <GoalCard key={goal.id} isDark={isDark} title={goal.title} date={goal.date} progress={goal.progress} color={goal.color} icon={goal.icon} />
                ))}
              </div>

              <div className="d-flex justify-content-between align-items-end mb-3 px-1">
                <h6 className="fw-bold mb-0" style={{ color: isDark ? '#f9fafb' : '#111827' }}>Achievements</h6>
                <span className="fw-bold cursor-pointer" style={{ color: accentColor, fontSize: '0.75rem' }}>View All</span>
              </div>
              <div className="row g-2 g-md-3">
                <AchievementCard isDark={isDark} icon="🔥" value="12" label="Day Streak" />
                <AchievementCard isDark={isDark} icon="🏆" value="3" label="Quizzes Passed" />
                <AchievementCard isDark={isDark} icon="🎯" value="On Track" label="keep Going!" />
              </div>
            </>
          )}

          {/* ========================================= */}
          {/* TAB 3: NOTES                              */}
          {/* ========================================= */}
          {activeTab === 'Notes' && (
            <>
              {/* Search Bar Row */}
              <div className="d-flex gap-2 mb-4">
                <div className="flex-grow-1 position-relative">
                  <div className="position-absolute top-50 translate-middle-y ms-3">
                    <Icons.Search />
                  </div>
                  <input 
                    type="text" 
                    className="form-control border shadow-sm w-100 fw-medium" 
                    placeholder="Search your notes..." 
                    style={{ 
                      paddingLeft: '2.5rem', 
                      height: '48px', 
                      borderRadius: '0.75rem', 
                      backgroundColor: isDark ? '#1f2937' : 'white',
                      borderColor: isDark ? '#374151' : '#e5e7eb',
                      color: isDark ? '#f9fafb' : '#111827'
                    }} 
                  />
                </div>
                <button className="btn border shadow-sm d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '48px', height: '48px', borderRadius: '0.75rem', backgroundColor: isDark ? '#1f2937' : 'white', borderColor: isDark ? '#374151' : '#e5e7eb', color: isDark ? '#f9fafb' : '#374151' }}>
                  <Icons.Filter />
                </button>
              </div>

              {/* Pinned Notes Section */}
              <h6 className="fw-bolder mb-3" style={{ fontSize: '0.9rem', color: isDark ? '#f9fafb' : '#111827' }}>Pinned Notes</h6>
              <NoteCard 
                type="pinned" 
                title="Accounting Equation" 
                subtitle="Assets = Liabilities + Equity" 
                date="The fundamental equation of accounting. April 10, 2024" 
                isDark={isDark} 
                accentColor={accentColor} 
              />
              <NoteCard 
                type="pinned" 
                title="Debit and Credit Rules" 
                subtitle="Debit: Left Side (Assets, Expenses)" 
                date="Credit: Right Side (Liabilities, Revenue, Equity) April 10, 2024" 
                isDark={isDark} 
                accentColor={accentColor} 
              />

              {/* All Files Section */}
              <div className="d-flex justify-content-between align-items-center mt-4 mb-3">
                <h6 className="fw-bolder mb-0" style={{ fontSize: '0.9rem', color: isDark ? '#f9fafb' : '#111827' }}>All Files</h6>
                <div className="fw-bold cursor-pointer" style={{ fontSize: '0.8rem', color: isDark ? '#9ca3af' : '#4b5563' }}>
                  Newest <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
              </div>
              
              <NoteCard 
                type="file" 
                title="Cost Behavior Summary" 
                subtitle="Fixed costs remain constraint...." 
                date="April 13, 2024" 
                isDark={isDark} 
              />
              <NoteCard 
                type="file" 
                title="Job Order Costing Notes" 
                subtitle="Steps in job order costing process...." 
                date="April 12, 2024" 
                isDark={isDark} 
              />
              <NoteCard 
                type="file" 
                title="Variable vs. Fixed Costs" 
                subtitle="Variable costs change with activity...." 
                date="April 11, 2024" 
                isDark={isDark} 
              />
            </>
          )}

        </div>
      </div>

      {/* FLOATING ACTION BUTTON (Only shows on Notes tab based on image) */}
      {activeTab === 'Notes' && (
        <button 
          className="btn position-fixed shadow-lg rounded-circle d-flex align-items-center justify-content-center p-0" 
          style={{ 
            width: '56px', height: '56px', 
            bottom: '90px', right: '24px', 
            backgroundColor: accentColor, 
            zIndex: 1050 
          }}
        >
          <Icons.Plus />
        </button>
      )}

      {/* MOBILE BOTTOM NAVIGATION */}
      <div className={`fixed-bottom shadow-lg border-top w-100 d-lg-none ${isDark ? 'border-secondary' : 'bg-white'}`} style={{ borderTopLeftRadius: '1.5rem', borderTopRightRadius: '1.5rem', zIndex: 1000, backgroundColor: isDark ? '#1f2937' : 'white' }}>
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
          <div className="d-flex flex-column align-items-center cursor-pointer">
            <div className="d-flex align-items-center justify-content-center rounded-4 mb-1 shadow-sm" style={{ backgroundColor: accentColor, width: '48px', height: '32px', color: 'white' }}>
              <Icons.Planner />
            </div>
            <span className="fw-bold" style={{ fontSize: '0.65rem', color: accentColor }}>Study Planner</span>
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