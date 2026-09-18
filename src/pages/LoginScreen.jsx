import React from 'react';
import { useNavigate } from 'react-router-dom';

// ------------------------------------------------------------------
// COMPONENT 1: The Background
// ------------------------------------------------------------------
function UNCBackgroundArch() {
  return (
    <div className="position-absolute bottom-0 start-0 w-100 h-100" style={{ zIndex: 0 }}>
      {/* Mobile fade gradient */}
      <div 
        className="position-absolute top-0 start-0 w-100 h-100 d-md-none" 
        style={{ zIndex: 1, background: 'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.85) 30%, rgba(255,255,255,0) 100%)' }}
      ></div>
      
      {/* Desktop dark overlay to make the white card pop */}
      <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-25 d-none d-md-block" style={{ zIndex: 1 }}></div>
      
      <img
        src={`${import.meta.env.BASE_URL}UNCbackground.jpeg`}
        alt="UNC Campus Arch"
        className="w-100 h-100"
        style={{ objectFit: 'cover', objectPosition: 'top' }}
      />
    </div>
  );
}

// ------------------------------------------------------------------
// COMPONENT 2: The Login Form
// ------------------------------------------------------------------
function LoginForm() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/dashboard');
  };

  return (
    <div className="w-100" style={{ maxWidth: '320px' }}>
      <div className="mb-4 d-flex flex-column align-items-center">
        <label className="fw-bold mb-2" style={{ color: '#8B1A1A', fontSize: '14px' }}>Name</label>
        <input
          type="text"
          placeholder="Enter First Name"
          className="form-control text-center py-3 border-0 border-bottom shadow-none"
          style={{ backgroundColor: '#f8f9fa', borderColor: '#8B1A1A', borderRadius: '0' }}
        />
      </div>

      <div className="mb-3 pt-2">
        <button 
          onClick={handleLogin}
          className="btn w-100 d-flex align-items-center justify-content-center shadow-sm py-3"
          style={{ backgroundColor: '#8B1A1A', color: 'white', fontWeight: '600', fontSize: '14px' }}
        >
          <div className="bg-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '28px', height: '28px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
          </div>
          <span>Continue with University Gmail</span>
        </button>
      </div>

      <p className="text-center px-3 mt-4" style={{ color: '#8B1A1A', fontSize: '11px' }}>
        Secure sign-in for University of Nueva Caceres students only
      </p>
    </div>
  );
}

// ------------------------------------------------------------------
// COMPONENT 3: The Main Screen
// ------------------------------------------------------------------
export default function LoginScreen() {
  return (
    <div className="vh-100 d-flex flex-column align-items-center justify-content-md-center position-relative overflow-hidden bg-light">
      
      {/* 
        This style block handles the responsive rounded corners.
        Mobile: Rounded only at the bottom.
        Desktop (md): Fully rounded floating card.
      */}
      <style>{`
        .custom-login-card {
          border-radius: 0 0 3rem 3rem;
          width: 100%;
          max-width: 450px;
        }
        @media (min-width: 768px) {
          .custom-login-card {
            border-radius: 2rem;
          }
        }
      `}</style>

      {/* Foreground Container */}
      <div 
        className="d-flex flex-column align-items-center bg-white shadow-lg px-4 pt-5 pb-4 custom-login-card" 
        style={{ zIndex: 10, marginTop: '0' }}
      >
        
        {/* Seal Image Box */}
        <div 
          className="bg-white shadow-sm border border-light d-flex align-items-center justify-content-center mb-4 p-2" 
          style={{ width: '130px', height: '130px', borderRadius: '2rem' }}
        >
          <img src={`${import.meta.env.BASE_URL}UNCSeal.png`} alt="UNC Seal" className="w-100 h-100" style={{ objectFit: 'contain' }} />
        </div>

        {/* Brand Name */}
        <h1 className="fw-bold text-dark text-uppercase mb-5" style={{ letterSpacing: '2px' }}>
          Studify
        </h1>

        {/* Injecting the Form Component */}
        <LoginForm />

      </div>

      <UNCBackgroundArch />

    </div>
  );
}