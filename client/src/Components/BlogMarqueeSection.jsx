import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Sparkles } from 'lucide-react';
import { BLOG_POSTS } from '../data/blogData.js';

const BlogMarqueeSection = () => {
  // Duplicate array for seamless infinite horizontal marquee loop
  const marqueePosts = [...BLOG_POSTS, ...BLOG_POSTS];

  return (
    <section
      aria-labelledby="careerpilot-blog-marquee-heading"
      style={{
        width: 'calc(100% - clamp(32px, 7vw, 112px))',
        maxWidth: '1640px',
        margin: '84px auto',
        padding: 0
      }}
    >
      <style>{`
        @keyframes cpBlogMarquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .cp-blog-marquee-track {
          display: flex;
          gap: 20px;
          width: max-content;
          animation: cpBlogMarquee 48s linear infinite;
          will-change: transform;
        }
        .cp-blog-marquee-wrap:hover .cp-blog-marquee-track {
          animation-play-state: paused;
        }
        .cp-blog-dark-card {
          width: 370px;
          flex-shrink: 0;
          background: linear-gradient(180deg, #1E1D1B 0%, #181715 100%);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          padding: 24px 24px 22px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 16px;
          text-decoration: none;
          transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.25s ease, box-shadow 0.28s ease;
        }
        .cp-blog-dark-card:hover {
          transform: translateY(-5px);
          border-color: rgba(217, 119, 87, 0.55);
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(217, 119, 87, 0.2);
        }
      `}</style>

      <div
        style={{
          background: '#161514',
          border: '1px solid #2D2B28',
          borderRadius: '28px',
          padding: 'clamp(52px, 5vw, 76px) 0 clamp(46px, 5vw, 64px)',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 22px 56px rgba(20, 19, 18, 0.14)'
        }}
      >
        {/* Subtle Claude Amber Top Radial Glow */}
        <div
          style={{
            position: 'absolute',
            top: '-120px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '560px',
            height: '260px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(217, 119, 87, 0.2) 0%, transparent 70%)',
            pointerEvents: 'none'
          }}
        />

        {/* Centered Editorial Header (Matches Image 5) */}
        <div style={{ textAlign: 'center', padding: '0 24px', marginBottom: '42px', position: 'relative', zIndex: 2 }}>
          <h2
            id="careerpilot-blog-marquee-heading"
            style={{
              fontFamily: '"Outfit", sans-serif',
              fontSize: 'clamp(2rem, 4vw, 3.1rem)',
              fontWeight: 800,
              color: '#FDFCF9',
              margin: '0 0 14px',
              letterSpacing: '-0.025em',
              lineHeight: 1.12
            }}
          >
            Latest ATS &amp; Interview Preparation Blogs
          </h2>
          <p
            style={{
              margin: '0 auto',
              maxWidth: '640px',
              fontSize: '0.98rem',
              color: '#A19C94',
              lineHeight: 1.6
            }}
          >
            Research-backed playbooks on ATS resume scoring, LaTeX templates, AI voice interviews, and CS fundamentals — hover to pause and explore.
          </p>
        </div>

        {/* Auto-Scrolling Horizontal Marquee with Dark Edge Fade Masks (Matches Image 5) */}
        <div className="cp-blog-marquee-wrap" style={{ position: 'relative', overflow: 'hidden', padding: '8px 0 14px' }}>
          {/* Left Fade Mask */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              width: 'clamp(48px, 10vw, 150px)',
              background: 'linear-gradient(to right, #141312 18%, rgba(20, 19, 18, 0) 100%)',
              zIndex: 5,
              pointerEvents: 'none'
            }}
          />
          {/* Right Fade Mask */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              right: 0,
              width: 'clamp(48px, 10vw, 150px)',
              background: 'linear-gradient(to left, #141312 18%, rgba(20, 19, 18, 0) 100%)',
              zIndex: 5,
              pointerEvents: 'none'
            }}
          />

          <div className="cp-blog-marquee-track">
            {marqueePosts.map((post, i) => (
              <Link key={`${post.slug}-${i}`} to={`/blog/${post.slug}`} className="cp-blog-dark-card">
                <div>
                  {/* Card Top Meta Row (Avatar Badge + Category + Handle/ReadTime) */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, rgba(217, 119, 87, 0.25), rgba(217, 119, 87, 0.08))',
                        border: '1px solid rgba(217, 119, 87, 0.35)',
                        display: 'grid',
                        placeItems: 'center',
                        color: '#E6997A',
                        flexShrink: 0
                      }}
                    >
                      <Sparkles size={17} />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <strong style={{ display: 'block', fontSize: '0.88rem', color: '#FDFCF9', fontWeight: 700 }}>
                        {post.category}
                      </strong>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '0.76rem', color: '#8A857D' }}>
                        <Clock size={12} /> {post.readTime} · @careerpilot
                      </span>
                    </div>
                  </div>

                  {/* Card Title & Excerpt */}
                  <h3
                    style={{
                      margin: '0 0 10px',
                      fontSize: '1.05rem',
                      fontWeight: 700,
                      lineHeight: 1.38,
                      color: '#F5F3EC'
                    }}
                  >
                    {post.title}
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      fontSize: '0.86rem',
                      color: '#A19C94',
                      lineHeight: 1.58,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {post.excerpt}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <span style={{ fontSize: '0.76rem', color: '#7D7870', fontWeight: 600 }}>
                    {post.updatedAt}
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '0.82rem', fontWeight: 700, color: '#D97757' }}>
                    Read Playbook <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Centered CTA */}
        <div style={{ textAlign: 'center', marginTop: '26px', position: 'relative', zIndex: 2 }}>
          <Link
            to="/blog"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 26px',
              borderRadius: '1rem',
              background: 'linear-gradient(135deg, #D97757, #C05D3C)',
              color: '#FDFCF9',
              fontSize: '0.88rem',
              fontWeight: 700,
              boxShadow: '0 10px 26px rgba(217, 119, 87, 0.3)'
            }}
          >
            View All {BLOG_POSTS.length} Articles <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogMarqueeSection;
