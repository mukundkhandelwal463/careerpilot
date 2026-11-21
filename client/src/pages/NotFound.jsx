import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Compass, Home } from 'lucide-react';
import Navbar from '../Components/navbar.jsx';
import Footer from '../Components/footer.jsx';
import SEOHead from '../Components/SEOHead.jsx';
import '../css/style.css';

const NotFound = () => {
  return (
    <div className="page-shell">
      <SEOHead
        title="Page Not Found (404)"
        description="The page you are looking for does not exist on CareerPilot."
        path="/404"
        noIndex={true}
      />
      <Navbar />
      <main
        className="page"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 20px',
          minHeight: 'calc(100vh - 180px)'
        }}
      >
        <section
          className="card"
          style={{
            maxWidth: '540px',
            width: '100%',
            padding: '48px 34px',
            borderRadius: '28px',
            textAlign: 'center'
          }}
        >
          <div
            style={{
              width: '74px',
              height: '74px',
              borderRadius: '22px',
              background: 'linear-gradient(135deg, #ff6b4a, #ff8f57)',
              color: '#fff',
              display: 'grid',
              placeItems: 'center',
              margin: '0 auto 20px',
              boxShadow: '0 14px 32px rgba(255, 107, 74, 0.32)'
            }}
          >
            <Compass size={34} />
          </div>

          <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#e14b29', letterSpacing: '0.1em' }}>
            ERROR 404
          </span>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#122023', margin: '8px 0 12px' }}>
            Page Not Found
          </h1>
          <p style={{ fontSize: '0.95rem', color: 'var(--muted)', lineHeight: 1.65, margin: '0 0 28px' }}>
            The URL you requested could not be located. Use the links below to jump back to CareerPilot’s homepage or public career guides.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
            <Link
              to="/"
              className="btn-primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 22px',
                borderRadius: '999px',
                fontWeight: 800
              }}
            >
              <Home size={16} /> Back to Home
            </Link>
            <Link
              to="/guides"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 20px',
                borderRadius: '999px',
                border: '1px solid rgba(24, 35, 38, 0.14)',
                background: '#fff',
                color: '#122023',
                fontWeight: 700
              }}
            >
              <BookOpen size={16} /> Career Guides
            </Link>
            <button
              type="button"
              onClick={() => window.history.back()}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '12px 18px',
                borderRadius: '999px',
                border: 'none',
                background: 'rgba(24, 35, 38, 0.06)',
                color: '#122023',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <ArrowLeft size={16} /> Go Back
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
