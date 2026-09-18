import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../ThemeContext';
import 'bootstrap/dist/css/bootstrap.min.css';

// ------------------------------------------------------------------
// SVG Icons
// ------------------------------------------------------------------
const Icons = {
  ArrowLeft: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>,
  Bookmark: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>,
  CheckCircle: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#eab308" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>,
  Medal: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>,
  Bulb: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#eab308" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6"></path><path d="M10 22h4"></path><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1.45.62 2.81 1.5 3.5.76.76 1.23 1.52 1.41 2.5"></path></svg>,
  Target: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>,
  Hourglass: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2"></path><path d="M21 9a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2"></path><path d="M12 20v-5"></path><path d="M12 9V4"></path><path d="M7 15l5-5 5 5"></path><path d="M7 9l5 5 5-5"></path></svg>,
  Clock: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>,
  Warning: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>,
  
  Dashboard: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>,
  Book: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>,
  Chart: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18"></path><path d="M18 17V9"></path><path d="M13 17V5"></path><path d="M8 17v-3"></path></svg>,
  Planner: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect><path d="M9 14h6"></path><path d="M9 10h6"></path><path d="M9 18h6"></path></svg>,
  User: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
};

// ------------------------------------------------------------------
// REUSABLE COMPONENTS
// ------------------------------------------------------------------
const SubjectProgressBar = ({ icon, subject, progress, isDark }) => (
  <div className="d-flex align-items-center mb-4 py-1">
    <div className="me-3 fs-4">{icon}</div>
    <div className="fw-semibold flex-grow-1" style={{ fontSize: '0.9rem', color: isDark ? '#f9fafb' : '#374151' }}>{subject}</div>
    <div className="d-flex align-items-center" style={{ width: '150px' }}>
      <div className="progress flex-grow-1 me-3 shadow-none" style={{ height: '8px', backgroundColor: isDark ? '#374151' : '#e5e7eb', borderRadius: '4px' }}>
        <div className="progress-bar rounded-pill" style={{ width: `${progress}%`, backgroundColor: '#4ade80' }}></div>
      </div>
      <span className="fw-bold text-end" style={{ fontSize: '0.9rem', color: isDark ? '#f9fafb' : '#111827', width: '38px' }}>{progress}%</span>
    </div>
  </div>
);

const KPICard = ({ icon, title, value, subtext, subtextColor, isDark }) => (
  <div className="col-12 col-md-4 mb-3 mb-md-0">
    <div className="card border-0 shadow-sm h-100 p-2" style={{ borderRadius: '1.25rem', backgroundColor: isDark ? '#1f2937' : 'white' }}>
      <div className="card-body p-3 text-center d-flex flex-column justify-content-center">
        <div className="d-flex align-items-center justify-content-center mb-2 gap-2">
          <div className="rounded-circle d-flex align-items-center justify-content-center bg-light shadow-sm flex-shrink-0" style={{ width: '32px', height: '32px' }}>{icon}</div>
          <span className="fw-bold text-muted" style={{ fontSize: '0.75rem' }}>{title}</span>
        </div>
        <h2 className="fw-bolder mb-1" style={{ color: isDark ? '#f9fafb' : '#111827', fontSize: '2rem' }}>{value}</h2>
        <small className="fw-semibold" style={{ fontSize: '0.75rem', color: subtextColor || (isDark ? '#9ca3af' : '#6b7280') }}>{subtext}</small>
      </div>
    </div>
  </div>
);

const WeakTopicItem = ({ topic, isDark }) => (
  <div className="d-flex align-items-center mb-3 p-3 rounded-4 shadow-sm" style={{ backgroundColor: isDark ? '#374151' : '#fffbeb', border: '1px solid #fef3c7' }}>
    <div className="me-3 flex-shrink-0"><Icons.Warning /></div>
    <span className="fw-bold" style={{ fontSize: '0.9rem', color: isDark ? '#f9fafb' : '#92400e' }}>{topic}</span>
  </div>
);

export default function AnalyticsScreen() {
  const navigate = useNavigate();
  const { isDark, accentColor } = useTheme();
  const [activeTab, setActiveTab] = useState('Study Time'); 

  return (
    <div className={`d-flex min-vh-100 font-sans position-relative ${isDark ? 'bg-dark' : 'bg-light'}`} style={{ backgroundColor: isDark ? '#111827' : '#f8fafc' }}>
      
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
          <div className="d-flex flex-column align-items-center text-center cursor-pointer">
            <div className="d-flex align-items-center justify-content-center rounded-4 mb-1 shadow-sm" style={{ backgroundColor: accentColor, width: '48px', height: '48px', color: 'white' }}>
              <Icons.Chart />
            </div>
            <span className="fw-bold" style={{ fontSize: '0.65rem', color: accentColor }}>Analytics</span>
          </div>
          <div className={`d-flex flex-column align-items-center cursor-pointer ${isDark ? 'text-light' : 'text-muted'}`} onClick={() => navigate('/planner')} style={{ opacity: 0.6 }}>
            <div className="d-flex align-items-center justify-content-center mb-1" style={{ width: '48px', height: '48px' }}><Icons.Planner /></div>
            <span className="fw-semibold" style={{ fontSize: '0.65rem' }}>Planner</span>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-grow-1 overflow-auto" style={{ paddingBottom: '120px' }}>
        
        {/* HEADER */}
        <div style={{ backgroundColor: accentColor, paddingBottom: '3.5rem', borderBottomLeftRadius: '2rem', borderBottomRightRadius: '2rem' }}>
          <div className="container-fluid mx-auto px-4 pt-4 pb-2" style={{ maxWidth: '1000px' }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <button onClick={() => navigate(-1)} className="btn btn-link p-0 border-0"><Icons.ArrowLeft /></button>
              <h4 className="text-white fw-bold mb-0">Analytics</h4>
              <button className="btn btn-link p-0 border-0"><Icons.Bookmark /></button>
            </div>
            
            {/* TABS */}
            <div className="d-flex justify-content-center gap-2 gap-md-4 mt-4">
              {['Overview', 'Study Time', 'Performance'].map(tab => (
                <div 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 cursor-pointer transition rounded-pill text-center fw-bold shadow-sm ${activeTab === tab ? 'bg-white' : 'text-white'}`} 
                  style={{ color: activeTab === tab ? accentColor : 'white', fontSize: '0.9rem', minWidth: '110px' }}
                >
                  {tab}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CONTAINER WITH BREATHING ROOM */}
        <div className="container-fluid px-3 px-md-4 mx-auto" style={{ maxWidth: '1000px', marginTop: '-2rem' }}>
          
          {/* ========================================= */}
          {/* TAB 1: OVERVIEW                           */}
          {/* ========================================= */}
          {activeTab === 'Overview' && (
            <div className="row g-4">
              <div className="col-12">
                <div className="card border-0 shadow-sm rounded-4" style={{ backgroundColor: isDark ? '#1f2937' : 'white' }}>
                  <div className="card-body p-4 p-md-5">
                    <h5 className="fw-bolder mb-4" style={{ color: isDark ? '#f9fafb' : '#111827' }}>Weekly Performance</h5>
                    <div className="position-relative w-100 d-flex justify-content-center align-items-center py-5" style={{ minHeight: '220px' }}>
                      <div className="position-absolute w-100 h-100 d-flex flex-column justify-content-between py-3">
                        {[50,40,30,20,10,0].map(val => (
                          <div key={val} className="d-flex align-items-center w-100">
                            <span className="text-muted pe-3 fw-bold" style={{ fontSize: '0.75rem', width: '35px', textAlign: 'right' }}>{val}</span>
                            <div className="flex-grow-1" style={{ height: '1px', backgroundColor: isDark ? '#374151' : '#f1f5f9' }}></div>
                          </div>
                        ))}
                      </div>
                      <div className="badge rounded-pill shadow-sm px-4 py-3 fw-bold fs-6" style={{ backgroundColor: isDark ? '#374151' : '#f8f9fa', color: isDark ? '#d1d5db' : '#6b7280', zIndex: 10 }}>
                        No data available yet
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12">
                <div className="card border-0 shadow-sm rounded-4" style={{ backgroundColor: isDark ? '#1f2937' : 'white' }}>
                  <div className="card-body p-4 p-md-5">
                    <h5 className="fw-bolder mb-4" style={{ color: isDark ? '#f9fafb' : '#111827' }}>Subject Performance</h5>
                    <div className="py-2">
                      <SubjectProgressBar isDark={isDark} icon="📚" subject="Financial Accounting" progress={78} />
                      <SubjectProgressBar isDark={isDark} icon="📗" subject="Auditing" progress={40} />
                      <SubjectProgressBar isDark={isDark} icon="🧮" subject="Taxation" progress={65} />
                      <SubjectProgressBar isDark={isDark} icon="🍎" subject="Cost Accounting" progress={80} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================= */}
          {/* TAB 2: STUDY TIME                         */}
          {/* ========================================= */}
          {activeTab === 'Study Time' && (
            <div className="row g-4">
              
              {/* Daily Study Hours Bar Chart */}
              <div className="col-12">
                <div className="card border-0 shadow-sm rounded-4" style={{ backgroundColor: isDark ? '#1f2937' : 'white' }}>
                  <div className="card-body p-4 p-md-5">
                    <h5 className="fw-bolder mb-5" style={{ color: isDark ? '#f9fafb' : '#111827' }}>Daily Study Hours</h5>
                    
                    <div className="d-flex align-items-end justify-content-between w-100 position-relative pb-4 px-2" style={{ height: '260px', paddingLeft: '40px' }}>
                      <div className="position-absolute w-100 h-100 d-flex flex-column justify-content-between pb-4 start-0 pe-2" style={{ zIndex: 0 }}>
                        {[5,4,3,2,1,0].map(val => (
                          <div key={val} className="d-flex align-items-center w-100 h-100">
                            <span className="text-muted pe-3 fw-bold" style={{ fontSize: '0.8rem', width: '35px', textAlign: 'right' }}>{val}</span>
                            <div className="flex-grow-1" style={{ height: '1px', backgroundColor: isDark ? '#374151' : '#f1f5f9' }}></div>
                          </div>
                        ))}
                      </div>
                      
                      {[1, 2.5, 4, 5, 4, 2, 5].map((val, i) => (
                         <div key={i} className="d-flex flex-column align-items-center h-100 justify-content-end position-relative" style={{ width: '11%', zIndex: 1 }}>
                            <div className="w-100 rounded-top d-flex justify-content-center pt-2 shadow-sm" style={{ backgroundColor: '#991b1b', height: `${(val/5)*90}%`, borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}>
                               <span className="fw-bold text-white" style={{ fontSize: '0.75rem' }}>{val}</span>
                            </div>
                            <span className="position-absolute fw-bold text-muted" style={{ bottom: '-32px', fontSize: '0.8rem' }}>
                              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                            </span>
                         </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Time by Subject & Goal Progress Row */}
              <div className="col-12 col-lg-6">
                <div className="card border-0 shadow-sm rounded-4 h-100" style={{ backgroundColor: isDark ? '#1f2937' : 'white' }}>
                  <div className="card-body p-4 p-md-5">
                    <h5 className="fw-bolder mb-4" style={{ color: isDark ? '#f9fafb' : '#111827' }}>Time by Subject</h5>
                    <div className="d-flex flex-column flex-sm-row align-items-center justify-content-around gap-4 py-3">
                       <div className="rounded-circle shadow-sm flex-shrink-0" style={{
                          width: '150px', height: '150px',
                          background: 'conic-gradient(#991b1b 0% 36.4%, #facc15 36.4% 54.6%, #22c55e 54.6% 72.8%, #3b82f6 72.8% 100%)',
                          position: 'relative'
                       }}>
                          <div className="position-absolute top-50 start-50 translate-middle rounded-circle" style={{ width: '80px', height: '80px', backgroundColor: isDark ? '#1f2937' : 'white' }}></div>
                       </div>
                       <div className="d-flex flex-column gap-3">
                          <div className="d-flex align-items-center gap-2"><div className="rounded-1" style={{width:'12px', height:'12px', backgroundColor:'#991b1b'}}></div><span className="fw-bold text-muted" style={{fontSize:'0.85rem'}}>Cost Acc. (36.4%)</span></div>
                          <div className="d-flex align-items-center gap-2"><div className="rounded-1" style={{width:'12px', height:'12px', backgroundColor:'#facc15'}}></div><span className="fw-bold text-muted" style={{fontSize:'0.85rem'}}>Fin Acc. (18.2%)</span></div>
                          <div className="d-flex align-items-center gap-2"><div className="rounded-1" style={{width:'12px', height:'12px', backgroundColor:'#22c55e'}}></div><span className="fw-bold text-muted" style={{fontSize:'0.85rem'}}>Auditing (18.2%)</span></div>
                          <div className="d-flex align-items-center gap-2"><div className="rounded-1" style={{width:'12px', height:'12px', backgroundColor:'#3b82f6'}}></div><span className="fw-bold text-muted" style={{fontSize:'0.85rem'}}>Taxation (27.3%)</span></div>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="col-12 col-lg-6">
                <div className="card border-0 shadow-sm rounded-4 h-100" style={{ backgroundColor: isDark ? '#1f2937' : 'white' }}>
                  <div className="card-body p-4 p-md-5 d-flex flex-column align-items-center justify-content-center position-relative">
                    <h5 className="fw-bolder w-100 text-start position-absolute top-0 start-0 p-4 p-md-5 m-0" style={{ color: isDark ? '#f9fafb' : '#111827' }}>Goal Progress</h5>
                    
                    <div className="position-relative mt-4 shadow-sm rounded-circle" style={{ width: '160px', height: '160px', background: `conic-gradient(#22c55e 0% 80%, ${isDark ? '#374151' : '#f1f5f9'} 80% 100%)` }}>
                      <div className="position-absolute top-50 start-50 translate-middle rounded-circle" style={{ width: '120px', height: '120px', backgroundColor: isDark ? '#1f2937' : 'white' }}></div>
                      <div className="position-absolute top-50 start-50 translate-middle text-center w-100">
                        <h2 className="fw-bolder mb-1" style={{ color: isDark ? '#f9fafb' : '#111827', lineHeight: '1' }}>80%</h2>
                        <span className="fw-bold text-muted" style={{ fontSize: '0.8rem' }}>16.5 / 20 Hours</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sessions & Productive Time */}
              <div className="col-12 col-lg-6">
                <div className="card border-0 shadow-sm rounded-4 h-100" style={{ backgroundColor: isDark ? '#1f2937' : 'white' }}>
                  <div className="card-body p-4 p-md-5">
                    <h5 className="fw-bolder mb-4" style={{ color: isDark ? '#f9fafb' : '#111827' }}>Focus Sessions</h5>
                    <div className="row g-3">
                      <div className="col-6 d-flex align-items-center gap-3 p-3 rounded-4 bg-light">
                        <div className="p-2 bg-white rounded-circle shadow-sm"><Icons.Target /></div>
                        <div>
                          <h4 className="fw-bolder mb-0 text-dark">42</h4>
                          <div className="fw-bold text-muted" style={{ fontSize: '0.75rem' }}>Sessions</div>
                        </div>
                      </div>
                      <div className="col-6 d-flex align-items-center gap-3 p-3 rounded-4 bg-light">
                        <div className="p-2 bg-white rounded-circle shadow-sm"><Icons.Hourglass /></div>
                        <div>
                          <h4 className="fw-bolder mb-0 text-dark">48m</h4>
                          <div className="fw-bold text-muted" style={{ fontSize: '0.75rem' }}>Avg. length</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="col-12 col-lg-6">
                <div className="card border-0 shadow-sm rounded-4 h-100" style={{ backgroundColor: isDark ? '#1f2937' : 'white' }}>
                  <div className="card-body p-4 p-md-5">
                    <h5 className="fw-bolder mb-4" style={{ color: isDark ? '#f9fafb' : '#111827' }}>Most Productive Time</h5>
                    <div className="d-flex align-items-center gap-4 p-3 rounded-4 bg-light">
                      <div className="p-3 bg-white rounded-circle shadow-sm"><Icons.Clock /></div>
                      <div>
                        <h5 className="fw-bolder mb-1 text-dark">08:00 PM - 10:00 PM</h5>
                        <div className="fw-semibold text-muted" style={{ fontSize: '0.8rem' }}>Peak focus window</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* ========================================= */}
          {/* TAB 3: PERFORMANCE                        */}
          {/* ========================================= */}
          {activeTab === 'Performance' && (
            <div className="row g-4">
              
              {/* KPI Cards */}
              <div className="col-12">
                 <div className="row g-3">
                    <KPICard isDark={isDark} icon={<Icons.CheckCircle />} title="Average Score" value="76%" subtext="-8% vs last week" subtextColor="#22c55e" />
                    <KPICard isDark={isDark} icon={<Icons.Medal />} title="Highest Score" value="92%" subtext="Mock Exam 3" />
                    <KPICard isDark={isDark} icon={<Icons.Bulb />} title="Quizzes Taken" value="34" subtext="This Week" />
                 </div>
              </div>

              {/* Polished Line Chart */}
              <div className="col-12">
                <div className="card border-0 shadow-sm rounded-4" style={{ backgroundColor: isDark ? '#1f2937' : 'white' }}>
                  <div className="card-body p-4 p-md-5">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h5 className="fw-bolder mb-0" style={{ color: isDark ? '#f9fafb' : '#111827' }}>Performance Trend</h5>
                      <div className="d-flex gap-4">
                        <div className="d-flex align-items-center gap-2"><div className="rounded-circle shadow-sm" style={{width:'10px',height:'10px',backgroundColor:'#dc2626'}}></div><span className="fw-bold text-muted" style={{fontSize:'0.8rem'}}>This Week</span></div>
                        <div className="d-flex align-items-center gap-2"><div className="rounded-circle shadow-sm" style={{width:'10px',height:'10px',backgroundColor:'#9ca3af'}}></div><span className="fw-bold text-muted" style={{fontSize:'0.8rem'}}>Last Week</span></div>
                      </div>
                    </div>
                    
                    <div className="w-100 position-relative pb-4 pt-2 px-2" style={{ height: '260px' }}>
                      <svg viewBox="0 0 100 50" className="w-100 h-100" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
                         <polygon points="0,50 16.6,40 33.3,15 50,22 66.6,18 83.3,28 100,32 100,50 0,50" fill="rgba(220, 38, 38, 0.08)" />
                         <polyline points="0,50 16.6,40 33.3,15 50,22 66.6,18 83.3,28 100,32" fill="none" stroke="#dc2626" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
                         <polyline points="0,45 16.6,48 33.3,30 50,32 66.6,5 83.3,25 100,35" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
                         
                         {[ {x:0, y:50}, {x:16.6, y:40}, {x:33.3, y:15}, {x:50, y:22}, {x:66.6, y:18}, {x:83.3, y:28}, {x:100, y:32} ].map((pt, i) => (
                           <circle key={`t-${i}`} cx={pt.x} cy={pt.y} r="2" fill="#dc2626" vectorEffect="non-scaling-stroke" />
                         ))}
                         {[ {x:0, y:45}, {x:16.6, y:48}, {x:33.3, y:30}, {x:50, y:32}, {x:66.6, y:5}, {x:83.3, y:25}, {x:100, y:35} ].map((pt, i) => (
                           <circle key={`l-${i}`} cx={pt.x} cy={pt.y} r="1.5" fill="#9ca3af" vectorEffect="non-scaling-stroke" />
                         ))}
                      </svg>
                      
                      <div className="d-flex justify-content-between w-100 position-absolute bottom-0 mb-n1 start-0">
                         {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
                            <span key={d} className="text-muted fw-bold" style={{ fontSize: '0.8rem' }}>{d}</span>
                         ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rankings and Accuracy */}
              <div className="col-12 col-xl-7">
                <div className="card border-0 shadow-sm rounded-4 h-100" style={{ backgroundColor: isDark ? '#1f2937' : 'white' }}>
                  <div className="card-body p-4 p-md-5">
                    <h5 className="fw-bolder mb-4" style={{ color: isDark ? '#f9fafb' : '#111827' }}>Subject Ranking</h5>
                    <div className="py-2">
                      {[{n:'1. Financial Accounting', v:80},{n:'2. Cost Accounting', v:78},{n:'3. Taxation', v:65},{n:'4. Auditing', v:40}].map(subj => (
                        <div key={subj.n} className="d-flex align-items-center mb-4 py-1">
                          <div className="fw-bold flex-grow-1" style={{ fontSize: '0.95rem', color: isDark ? '#f9fafb' : '#374151' }}>{subj.n}</div>
                          <div className="d-flex align-items-center" style={{ width: '150px' }}>
                            <div className="progress flex-grow-1 me-3 shadow-none" style={{ height: '8px', backgroundColor: isDark ? '#374151' : '#e5e7eb', borderRadius: '4px' }}>
                              <div className="progress-bar rounded-pill" style={{ width: `${subj.v}%`, backgroundColor: '#4ade80' }}></div>
                            </div>
                            <span className="fw-bolder text-end" style={{ fontSize: '0.95rem', color: isDark ? '#f9fafb' : '#111827', width: '38px' }}>{subj.v}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 col-xl-5 d-flex flex-column gap-4">
                <div className="card border-0 shadow-sm rounded-4" style={{ backgroundColor: isDark ? '#1f2937' : 'white' }}>
                  <div className="card-body p-4 p-md-5">
                    <h5 className="fw-bolder mb-4 text-center" style={{ color: isDark ? '#f9fafb' : '#111827' }}>Accuracy Rate</h5>
                    
                    <div className="d-flex flex-column flex-sm-row align-items-center justify-content-around gap-4">
                       <div className="rounded-circle shadow-sm flex-shrink-0" style={{
                          width: '120px', height: '120px',
                          background: `conic-gradient(#ef4444 0% 82%, #22c55e 82% 100%)`,
                          position: 'relative'
                       }}>
                          <div className="position-absolute top-50 start-50 translate-middle rounded-circle" style={{ width: '60px', height: '60px', backgroundColor: isDark ? '#1f2937' : 'white' }}></div>
                       </div>
                       <div className="d-flex flex-column gap-3">
                          <div className="d-flex align-items-center gap-2"><div className="rounded-1" style={{width:'12px', height:'12px', backgroundColor:'#ef4444'}}></div><span className="fw-bold text-muted" style={{fontSize:'0.85rem'}}>Correct (82%)</span></div>
                          <div className="d-flex align-items-center gap-2"><div className="rounded-1" style={{width:'12px', height:'12px', backgroundColor:'#22c55e'}}></div><span className="fw-bold text-muted" style={{fontSize:'0.85rem'}}>Incorrect (18%)</span></div>
                       </div>
                    </div>
                  </div>
                </div>

                <div className="card border-0 shadow-sm rounded-4 flex-grow-1" style={{ backgroundColor: isDark ? '#1f2937' : 'white' }}>
                  <div className="card-body p-4 p-md-5">
                    <h5 className="fw-bolder mb-4" style={{ color: isDark ? '#f9fafb' : '#111827' }}>Weak Topics</h5>
                    <WeakTopicItem isDark={isDark} topic="Partnership Accounting" />
                    <WeakTopicItem isDark={isDark} topic="VAT Computation" />
                    <WeakTopicItem isDark={isDark} topic="Audit Sampling" />
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>

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
          <div className="d-flex flex-column align-items-center cursor-pointer">
            <div className="d-flex align-items-center justify-content-center rounded-4 mb-1 shadow-sm" style={{ backgroundColor: accentColor, width: '48px', height: '32px', color: 'white' }}>
              <Icons.Chart />
            </div>
            <span className="fw-bold" style={{ fontSize: '0.65rem', color: accentColor }}>Analytics</span>
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