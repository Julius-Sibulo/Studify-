import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../ThemeContext';
import 'bootstrap/dist/css/bootstrap.min.css';

// ------------------------------------------------------------------
// SVG Icons
// ------------------------------------------------------------------
const Icons = {
  ArrowLeft: ({ color }) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>,
  ChevronLeft: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>,
  ChevronRight: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>,
  Plus: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>,
  Dashboard: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>,
  Book: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>,
  Chart: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18"></path><path d="M18 17V9"></path><path d="M13 17V5"></path><path d="M8 17v-3"></path></svg>,
  Planner: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect><path d="M9 14h6"></path><path d="M9 10h6"></path><path d="M9 18h6"></path></svg>,
  User: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
};

// Helper function to convert "01:00 PM" into an integer (minutes) for accurate sorting
const timeToMinutes = (timeStr) => {
  const [time, modifier] = timeStr.split(' ');
  let [hours, minutes] = time.split(':');
  if (hours === '12') hours = '00';
  if (modifier === 'PM') hours = parseInt(hours, 10) + 12;
  return parseInt(hours, 10) * 60 + parseInt(minutes, 10);
};

export default function CalendarScreen() {
  const navigate = useNavigate();
  const { isDark, accentColor } = useTheme();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const [events, setEvents] = useState([
    { id: 1, date: new Date().toLocaleDateString('en-CA'), title: 'Financial Accounting', time: '10:30 AM', color: '#facc15' },
    { id: 2, date: new Date().toLocaleDateString('en-CA'), title: 'Conceptual Framework', time: '01:00 PM', color: '#c084fc' },
    { id: 3, date: new Date().toLocaleDateString('en-CA'), title: 'Intermediate Accounting 1', time: '04:00 PM', color: '#f97316' }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newReminderTitle, setNewReminderTitle] = useState('');
  const [newReminderTime, setNewReminderTime] = useState('');

  // Auto-update to Philippine Time (PHT) on load
  useEffect(() => {
    const phtDate = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Manila" }));
    setCurrentDate(phtDate);
    setSelectedDate(phtDate);
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const startOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
  const blanks = Array.from({ length: startOffset }, (_, i) => null);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const calendarGrid = [...blanks, ...days];

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const formattedSelectedDate = selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: '2-digit', year: 'numeric' });
  const selectedDateString = selectedDate.toLocaleDateString('en-CA'); 
  
  // Filter events and sort them chronologically using our helper function
  const selectedEvents = events
    .filter(e => e.date === selectedDateString)
    .sort((a, b) => timeToMinutes(a.time) - timeToMinutes(b.time));

  const handleAddReminder = (e) => {
    e.preventDefault();
    if (!newReminderTitle || !newReminderTime) return;

    const [hours, minutes] = newReminderTime.split(':');
    let ampm = 'AM';
    let hr = parseInt(hours, 10);
    if (hr >= 12) {
      ampm = 'PM';
      if (hr > 12) hr -= 12;
    }
    if (hr === 0) hr = 12;
    const formattedTime = `${hr.toString().padStart(2, '0')}:${minutes} ${ampm}`;

    const newEvent = {
      id: Date.now(),
      date: selectedDateString,
      title: newReminderTitle,
      time: formattedTime,
      color: accentColor 
    };

    setEvents([...events, newEvent]);
    setNewReminderTitle('');
    setNewReminderTime('');
    setShowAddForm(false);
  };

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
            <span className="fw-bold" style={{ fontSize: '0.65rem', color: accentColor }}>Tools</span>
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
        
        <div className={`shadow-sm ${isDark ? 'bg-dark border-bottom border-secondary' : 'bg-white'}`}>
          <div className="container-fluid mx-auto px-4 py-3 d-flex align-items-center justify-content-center position-relative" style={{ maxWidth: '900px', height: '60px' }}>
            <button onClick={() => navigate(-1)} className="btn btn-link p-0 border-0 position-absolute start-0 ms-3" style={{ zIndex: 10 }}>
              <Icons.ArrowLeft color={accentColor} />
            </button>
            <h5 className="fw-bold mb-0" style={{ color: accentColor }}>Calendar</h5>
          </div>
        </div>

        <div className="container-fluid px-3 px-md-4 py-4 mx-auto" style={{ maxWidth: '600px' }}>
          
          <div className="card border-0 shadow-sm rounded-4 mb-4" style={{ backgroundColor: isDark ? '#1f2937' : 'white' }}>
            <div className="card-body p-4 p-md-5">
              
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-normal mb-0" style={{ color: isDark ? '#f9fafb' : '#374151' }}>
                  {monthNames[month]} {year}
                </h3>
                <div className="d-flex gap-3 text-muted">
                  <button onClick={prevMonth} className="btn btn-link p-0 text-muted border-0"><Icons.ChevronLeft /></button>
                  <button onClick={nextMonth} className="btn btn-link p-0 text-muted border-0"><Icons.ChevronRight /></button>
                </div>
              </div>

              {/* FIX: Replaced bootstrap classes with a perfect CSS Grid (7 columns always) */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1rem', textAlign: 'center', marginBottom: '1rem' }}>
                {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(day => (
                  <div key={day} className="fw-semibold" style={{ fontSize: '0.85rem', color: isDark ? '#f3f4f6' : '#1f2937' }}>
                    {day}
                  </div>
                ))}
              </div>

              {/* FIX: The days now live in the exact same 7-column CSS Grid to guarantee alignment */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1rem', rowGap: '1.5rem', textAlign: 'center' }}>
                {calendarGrid.map((day, index) => {
                  const isSelected = day && selectedDate.getDate() === day && selectedDate.getMonth() === month && selectedDate.getFullYear() === year;
                  
                  return (
                    <div key={index} className="d-flex justify-content-center align-items-center">
                      {day ? (
                        <div 
                          onClick={() => setSelectedDate(new Date(year, month, day))}
                          className={`rounded-circle d-flex align-items-center justify-content-center cursor-pointer ${isSelected ? 'shadow-sm' : ''}`}
                          style={{ 
                            width: '36px', 
                            height: '36px', 
                            backgroundColor: isSelected ? accentColor : 'transparent',
                            color: isSelected ? 'white' : (isDark ? '#d1d5db' : '#4b5563'),
                            transition: 'all 0.2s ease'
                          }}
                        >
                          {day}
                        </div>
                      ) : (
                        <div style={{ width: '36px', height: '36px' }}></div>
                      )}
                    </div>
                  );
                })}
              </div>

              <hr className="my-5 opacity-25" style={{ borderColor: isDark ? '#6b7280' : '#d1d5db' }} />

              <div>
                <p className="fw-semibold mb-4" style={{ fontSize: '0.85rem', color: isDark ? '#f3f4f6' : '#1f2937' }}>
                  {formattedSelectedDate}
                </p>

                {selectedEvents.length === 0 ? (
                  <div className="text-center text-muted my-4" style={{ fontSize: '0.85rem' }}>No reminders for this day.</div>
                ) : (
                  <div className="d-flex flex-column gap-4 mb-4">
                    {selectedEvents.map(event => (
                      <div key={event.id} className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center gap-3">
                          <div style={{ width: '4px', height: '24px', backgroundColor: event.color, borderRadius: '2px' }}></div>
                          <h6 className="fw-bold mb-0" style={{ fontSize: '0.95rem', color: isDark ? '#f9fafb' : '#111827' }}>{event.title}</h6>
                        </div>
                        <div className="text-muted fw-semibold" style={{ fontSize: '0.9rem' }}>
                          {event.time}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {showAddForm ? (
                  <form onSubmit={handleAddReminder} className={`p-3 rounded-4 mt-4 ${isDark ? 'bg-dark' : 'bg-light'}`}>
                    <input 
                      type="text" 
                      className={`form-control border-0 shadow-sm mb-2 ${isDark ? 'bg-secondary text-white' : ''}`} 
                      placeholder="Reminder Title..." 
                      value={newReminderTitle}
                      onChange={(e) => setNewReminderTitle(e.target.value)}
                      required
                    />
                    <input 
                      type="time" 
                      className={`form-control border-0 shadow-sm mb-3 ${isDark ? 'bg-secondary text-white' : ''}`} 
                      value={newReminderTime}
                      onChange={(e) => setNewReminderTime(e.target.value)}
                      required
                    />
                    <div className="d-flex gap-2">
                      <button type="submit" className="btn text-white w-100 fw-bold rounded-pill" style={{ backgroundColor: accentColor }}>Save</button>
                      <button type="button" className="btn btn-light w-100 fw-bold rounded-pill" onClick={() => setShowAddForm(false)}>Cancel</button>
                    </div>
                  </form>
                ) : (
                  <button 
                    onClick={() => setShowAddForm(true)}
                    className="btn w-100 d-flex align-items-center justify-content-center gap-2 py-2 fw-bold mt-4 rounded-pill"
                    style={{ border: `2px dashed ${accentColor}`, color: accentColor, backgroundColor: 'transparent' }}
                  >
                    <Icons.Plus /> Add Reminder
                  </button>
                )}

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