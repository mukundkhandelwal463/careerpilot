import React, { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Calendar,
  ChevronRight,
  Clock,
  ExternalLink,
  Search,
  Sparkles,
  Tag,
  User
} from 'lucide-react';
import Navbar from '../Components/navbar.jsx';
import Footer from '../Components/footer.jsx';
import SEOHead from '../Components/SEOHead.jsx';
import { BLOG_POSTS } from '../data/blogData.js';
import '../css/style.css';

const CATEGORIES = ['All', 'ATS & Resumes', 'Interview Prep', 'CS Fundamentals', 'Career Strategy'];

const Blog = () => {
  const { slug } = useParams();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const activePost = useMemo(
    () => (slug ? BLOG_POSTS.find((p) => p.slug === slug) : null),
    [slug]
  );

  const filteredPosts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return BLOG_POSTS.filter((post) => {
      const catMatch = selectedCategory === 'All' || post.category === selectedCategory;
      const textMatch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.keywords.toLowerCase().includes(q);
      return catMatch && textMatch;
    });
  }, [selectedCategory, searchQuery]);

  // ── Individual Blog Article View (/blog/:slug) ─────────────────────────
  if (slug) {
    if (!activePost) {
      return (
        <div className="page-shell">
          <SEOHead
            title="Article Not Found"
            description="The requested CareerPilot blog post could not be found."
            path={`/blog/${slug}`}
            noIndex={true}
          />
          <Navbar />
          <main className="page" style={{ maxWidth: '720px', margin: '60px auto', padding: '0 20px', textAlign: 'center' }}>
            <div className="card" style={{ padding: '44px 32px', borderRadius: '26px' }}>
              <h1 style={{ margin: '0 0 12px', fontSize: '1.8rem', fontWeight: 800 }}>Article Not Found</h1>
              <p style={{ color: 'var(--muted)', marginBottom: '24px' }}>
                This blog article may have moved. Browse all ATS & career preparation articles below.
              </p>
              <Link to="/blog" className="btn-primary" style={{ padding: '12px 24px', borderRadius: '999px', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <ArrowLeft size={16} /> Back to CareerPilot Blog
              </Link>
            </div>
          </main>
          <Footer />
        </div>
      );
    }

    const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== activePost.slug).slice(0, 3);

    const schemas = [
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: activePost.title,
        description: activePost.metaDescription,
        keywords: activePost.keywords,
        datePublished: activePost.publishedAt,
        dateModified: activePost.updatedAt,
        image: 'https://careerpilot.website/logo.png',
        author: {
          '@type': 'Person',
          name: activePost.author,
          url: 'https://careerpilot.website/about'
        },
        publisher: {
          '@type': 'Organization',
          name: 'CareerPilot',
          url: 'https://careerpilot.website',
          logo: {
            '@type': 'ImageObject',
            url: 'https://careerpilot.website/logo.png'
          }
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `https://careerpilot.website/blog/${activePost.slug}`
        }
      }
    ];

    if (activePost.faqs && activePost.faqs.length > 0) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: activePost.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.a
          }
        }))
      });
    }

    return (
      <div className="page-shell">
        <SEOHead
          title={activePost.metaTitle || activePost.title}
          description={activePost.metaDescription}
          path={`/blog/${activePost.slug}`}
          ogType="article"
          keywords={activePost.keywords}
          breadcrumbs={[
            { name: 'Home', url: '/' },
            { name: 'Blog', url: '/blog' },
            { name: activePost.title, url: `/blog/${activePost.slug}` }
          ]}
          jsonLd={schemas}
        />
        <Navbar />
        <main className="page" style={{ maxWidth: '960px', margin: '28px auto', padding: '0 20px' }}>
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', color: 'var(--muted)', marginBottom: '20px', flexWrap: 'wrap' }}>
            <Link to="/" style={{ fontWeight: 600 }}>Home</Link>
            <ChevronRight size={14} />
            <Link to="/blog" style={{ fontWeight: 600 }}>Blog</Link>
            <ChevronRight size={14} />
            <span style={{ color: 'var(--text)', fontWeight: 700 }}>{activePost.category}</span>
          </nav>

          <article className="card" style={{ padding: '42px 36px', borderRadius: '28px', marginBottom: '34px' }}>
            <header style={{ marginBottom: '26px' }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '5px 12px',
                borderRadius: '999px',
                background: 'rgba(255, 107, 74, 0.1)',
                color: '#e14b29',
                fontSize: '0.74rem',
                fontWeight: 800,
                letterSpacing: '0.07em',
                marginBottom: '14px'
              }}>
                <Tag size={12} /> {activePost.category.toUpperCase()}
              </span>

              <h1 style={{ fontSize: 'clamp(1.85rem, 3.4vw, 2.55rem)', fontWeight: 800, lineHeight: 1.2, margin: '0 0 16px', color: '#122023' }}>
                {activePost.title}
              </h1>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '18px', fontSize: '0.84rem', color: 'var(--muted)', fontWeight: 600 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <User size={15} /> By <Link to="/about" style={{ color: '#122023', textDecoration: 'underline' }}>{activePost.author}</Link>
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <Calendar size={15} /> <time dateTime={activePost.updatedAt}>Updated {activePost.updatedAt}</time>
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <Clock size={15} /> {activePost.readTime}
                </span>
              </div>
            </header>

            {/* AEO Quick Answer Callout */}
            <section aria-label="Direct Answer" style={{
              background: 'linear-gradient(135deg, rgba(255, 107, 74, 0.08), rgba(124, 214, 199, 0.14))',
              border: '1px solid rgba(255, 107, 74, 0.22)',
              borderRadius: '18px',
              padding: '20px 22px',
              marginBottom: '30px'
            }}>
              <strong style={{ display: 'block', fontSize: '0.76rem', color: '#e14b29', letterSpacing: '0.08em', marginBottom: '6px' }}>
                KEY TAKEAWAY (QUICK ANSWER)
              </strong>
              <p style={{ margin: 0, fontSize: '0.98rem', lineHeight: 1.68, color: '#182326', fontWeight: 500 }}>
                {activePost.quickAnswer}
              </p>
            </section>

            {/* Article Sections */}
            {activePost.sections.map((sec, idx) => (
              <section key={idx} style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '1.36rem', fontWeight: 800, color: '#122023', margin: '0 0 12px', lineHeight: 1.3 }}>
                  {sec.heading}
                </h2>
                {sec.body && (
                  <p style={{ fontSize: '0.96rem', lineHeight: 1.74, color: '#334155', margin: 0 }}>
                    {sec.body}
                  </p>
                )}
                {sec.steps && (
                  <ol style={{ margin: '10px 0 0', paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {sec.steps.map((step, sIdx) => (
                      <li key={sIdx} style={{ fontSize: '0.95rem', lineHeight: 1.68, color: '#334155' }}>
                        {step}
                      </li>
                    ))}
                  </ol>
                )}
                {sec.table && (
                  <div style={{ overflowX: 'auto', borderRadius: '16px', border: '1px solid rgba(24, 35, 38, 0.1)', marginTop: '14px' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', background: '#fff' }}>
                      <thead>
                        <tr style={{ background: '#122023', color: '#fff', textAlign: 'left' }}>
                          {sec.table.columns.map((col, cIdx) => (
                            <th key={cIdx} style={{ padding: '12px 16px', fontWeight: 700 }}>{col}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {sec.table.rows.map((row, rIdx) => (
                          <tr key={rIdx} style={{ borderTop: '1px solid rgba(24, 35, 38, 0.08)', background: rIdx % 2 === 1 ? '#f8fafc' : '#fff' }}>
                            {row.map((cell, cellIdx) => (
                              <td key={cellIdx} style={{ padding: '12px 16px', fontWeight: cellIdx === 0 ? 700 : 500, color: '#1e293b', lineHeight: 1.5 }}>
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            ))}

            {/* Article FAQs (AEO) */}
            {activePost.faqs && activePost.faqs.length > 0 && (
              <section style={{ marginBottom: '30px', paddingTop: '18px', borderTop: '1px solid rgba(24, 35, 38, 0.08)' }}>
                <h2 style={{ fontSize: '1.28rem', fontWeight: 800, color: '#122023', margin: '0 0 14px' }}>
                  Frequently Asked Questions
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {activePost.faqs.map((faq, idx) => (
                    <div key={idx} style={{ background: '#f8fafc', borderRadius: '16px', padding: '16px 20px', border: '1px solid rgba(24, 35, 38, 0.07)' }}>
                      <h3 style={{ margin: '0 0 6px', fontSize: '1rem', fontWeight: 800, color: '#122023' }}>{faq.q}</h3>
                      <p style={{ margin: 0, fontSize: '0.9rem', color: '#475569', lineHeight: 1.62 }}>{faq.a}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* External Citations */}
            {activePost.citations && activePost.citations.length > 0 && (
              <section style={{ marginBottom: '28px', paddingTop: '14px', borderTop: '1px solid rgba(24, 35, 38, 0.08)' }}>
                <h3 style={{ fontSize: '0.96rem', fontWeight: 800, margin: '0 0 10px', color: '#122023' }}>
                  Trusted Sources & References
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {activePost.citations.map((cite, idx) => (
                    <li key={idx}>
                      <a href={cite.url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.88rem', color: '#e14b29', fontWeight: 600 }}>
                        <ExternalLink size={14} /> {cite.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Author Card + Tool CTA */}
            <div style={{
              background: '#122023',
              color: '#fff',
              borderRadius: '20px',
              padding: '26px 28px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px'
            }}>
              <div style={{ maxWidth: '520px' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.09em', color: '#7cd6c7' }}>
                  TRY IT FREE ON CAREERPILOT
                </span>
                <h3 style={{ margin: '4px 0 6px', fontSize: '1.2rem', fontWeight: 800 }}>
                  Check Your ATS Score & Practice AI Interviews Now
                </h3>
                <p style={{ margin: 0, fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.55 }}>
                  Upload your resume for instant AI keyword diagnostics, executive LaTeX templates, and realistic voice mock interviews.
                </p>
              </div>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <Link to="/upload" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 22px', borderRadius: '999px', background: 'linear-gradient(135deg, #ff6b4a, #ff8f57)', color: '#fff', fontWeight: 800, fontSize: '0.88rem' }}>
                  <Sparkles size={15} /> Scan Resume Free
                </Link>
                <Link to="/app/builder/default" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 20px', borderRadius: '999px', background: 'rgba(255,255,255,0.1)', color: '#fff', fontWeight: 700, fontSize: '0.88rem' }}>
                  LaTeX Builder
                </Link>
              </div>
            </div>
          </article>

          {/* Related Articles (Internal Linking for SEO) */}
          <section style={{ marginBottom: '44px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0, color: '#122023' }}>Related Career & ATS Articles</h2>
              <Link to="/blog" style={{ fontSize: '0.88rem', fontWeight: 700, color: '#e14b29' }}>View All Articles →</Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '18px' }}>
              {relatedPosts.map((rp) => (
                <article key={rp.slug} className="card" style={{ padding: '22px', borderRadius: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '12px' }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#e14b29' }}>{rp.category}</span>
                    <h3 style={{ fontSize: '1.02rem', fontWeight: 800, margin: '6px 0 8px', lineHeight: 1.35, color: '#122023' }}>
                      <Link to={`/blog/${rp.slug}`}>{rp.title}</Link>
                    </h3>
                    <p style={{ margin: 0, fontSize: '0.84rem', color: '#475569', lineHeight: 1.55 }}>{rp.excerpt}</p>
                  </div>
                  <Link to={`/blog/${rp.slug}`} style={{ fontSize: '0.84rem', fontWeight: 800, color: '#e14b29', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    Read Article <ArrowRight size={14} />
                  </Link>
                </article>
              ))}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  // ── Blog Hub Listing Page (/blog) ──────────────────────────────────────
  const blogHubSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'CareerPilot Career, ATS & Technical Interview Blog',
    description: 'Expert guides on ATS resume optimization, LaTeX templates, AI voice mock interviews, and CS fundamentals for software engineers and students.',
    url: 'https://careerpilot.website/blog',
    publisher: {
      '@type': 'Organization',
      name: 'CareerPilot',
      logo: {
        '@type': 'ImageObject',
        url: 'https://careerpilot.website/logo.png'
      }
    },
    blogPost: BLOG_POSTS.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      url: `https://careerpilot.website/blog/${post.slug}`,
      datePublished: post.publishedAt,
      author: { '@type': 'Person', name: post.author }
    }))
  };

  return (
    <div className="page-shell">
      <SEOHead
        title="CareerPilot Blog — ATS Resume Tips, AI Interview Prep & CS Guides"
        description="Read 10+ practical, research-backed articles on beating ATS resume filters, checking ATS scores free, writing XYZ project bullets, AI voice mock interviews, and CS fundamentals."
        path="/blog"
        keywords="CareerPilot blog, ATS resume tips, how to beat ATS, LaTeX resume guide, AI mock interview blog, CS fundamentals interview cheat sheet"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Blog', url: '/blog' }
        ]}
        jsonLd={blogHubSchema}
      />
      <Navbar />
      <main className="page" style={{ maxWidth: '1220px', margin: '30px auto', padding: '0 20px' }}>
        <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', color: 'var(--muted)', marginBottom: '18px' }}>
          <Link to="/" style={{ fontWeight: 600 }}>Home</Link>
          <ChevronRight size={14} />
          <span style={{ color: 'var(--text)', fontWeight: 700 }}>Blog</span>
        </nav>

        {/* Hero Header */}
        <header style={{ marginBottom: '30px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '5px 14px',
            borderRadius: '999px',
            background: 'rgba(255, 107, 74, 0.1)',
            color: '#e14b29',
            fontSize: '0.76rem',
            fontWeight: 800,
            letterSpacing: '0.06em',
            marginBottom: '12px'
          }}>
            <BookOpen size={14} /> CAREERPILOT EDITORIAL BLOG
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.85rem)', fontWeight: 800, margin: '0 0 12px', color: '#122023', letterSpacing: '-0.02em' }}>
            ATS Resume Optimization, AI Interview & Tech Career Blog
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--muted)', maxWidth: '760px', lineHeight: 1.65, margin: 0 }}>
            Actionable articles engineered for students, freshers, and software engineers to pass ATS filters, build standout LaTeX resumes, and master CS & system design interviews.
          </p>
        </header>

        {/* Search & Category Filter Bar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '999px',
                    border: active ? 'none' : '1px solid rgba(24, 35, 38, 0.12)',
                    background: active ? '#122023' : '#fff',
                    color: active ? '#fff' : '#182326',
                    fontSize: '0.84rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <div style={{ position: 'relative', minWidth: '260px', flex: '0 1 320px' }}>
            <Search size={16} color="#64748b" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search ATS, LaTeX, interviews, OS..."
              aria-label="Search blog articles"
              style={{
                width: '100%',
                padding: '10px 14px 10px 38px',
                borderRadius: '999px',
                border: '1px solid rgba(24, 35, 38, 0.14)',
                background: '#fff',
                fontSize: '0.88rem',
                outline: 'none'
              }}
            />
          </div>
        </div>

        {/* Articles Grid */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))', gap: '22px', marginBottom: '48px' }}>
          {filteredPosts.map((post) => (
            <article
              key={post.slug}
              className="card"
              style={{
                padding: '28px',
                borderRadius: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '16px'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#e14b29', background: 'rgba(255, 107, 74, 0.1)', padding: '4px 10px', borderRadius: '999px' }}>
                    {post.category}
                  </span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--muted)', fontWeight: 600 }}>{post.readTime}</span>
                </div>

                <h2 style={{ fontSize: '1.2rem', fontWeight: 800, lineHeight: 1.35, margin: '0 0 10px', color: '#122023' }}>
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>

                <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.62, margin: 0 }}>
                  {post.excerpt}
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid rgba(24, 35, 38, 0.07)' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--muted)', fontWeight: 600 }}>
                  {post.updatedAt}
                </span>
                <Link
                  to={`/blog/${post.slug}`}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 800, fontSize: '0.86rem', color: '#e14b29' }}
                >
                  Read Full Guide <ArrowRight size={15} />
                </Link>
              </div>
            </article>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
