import React from 'react';

/**
 * ResumePreviewCard
 * Minimalist, classic black-and-white resume template.
 * Matches the "Sebastian Bennett" aesthetic exactly.
 */
const ResumePreviewCard = ({ data, onAddSkill }) => {
  const {
    name, headline, phone, email, displayLocation,
    linkedin, github, website, summary,
    expBlocks, eduBlocks, skillList, sideSkillList, langList,
    template,
  } = data;

  // ── Sub-components ─────────────────────────────────────────────
  const ContactItem = ({ icon, label }) => label ? (
    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#333' }}>
      <span style={{ fontSize: '12px', color: '#111' }}>{icon}</span>
      <span style={{ wordBreak: 'break-all' }}>{label}</span>
    </span>
  ) : null;

  const SectionHead = ({ title }) => (
    <div style={{ marginTop: '24px', marginBottom: '12px' }}>
      <h3 style={{
        margin: 0, fontSize: '16px', fontWeight: 800,
        textTransform: 'uppercase', letterSpacing: '2px', color: '#111',
      }}>{title}</h3>
    </div>
  );

  const Divider = () => (
    <div style={{ height: '1px', background: '#111', width: '100%', margin: '14px 0' }} />
  );

  const Empty = ({ msg }) => (
    <p style={{ margin: 0, fontSize: '12px', color: '#888', fontStyle: 'italic' }}>{msg}</p>
  );

  // ── Render ─────────────────────────────────────────────────────
  return (
    <div style={{
      background: '#ffffff',
      padding: '40px',
      color: '#333',
      fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
      boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
      borderRadius: '2px',
      maxWidth: '800px',
      margin: '0 auto',
    }}>

      {/* ── HEADER ── */}
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <h1 style={{
          margin: 0,
          fontSize: '36px',
          fontWeight: 900,
          color: '#111',
          letterSpacing: '2px',
          textTransform: 'uppercase',
        }}>
          {name || 'YOUR NAME'}
        </h1>

        {headline && (
          <p style={{
            margin: '4px 0 0',
            fontSize: '18px',
            color: '#333',
            fontWeight: 400,
          }}>
            {headline}
          </p>
        )}
      </div>

      {/* ── CONTACT ROW ── */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '12px 24px',
        padding: '12px 0',
        borderTop: '1px solid #111',
        borderBottom: '1px solid #111',
        marginBottom: '24px',
      }}>
        <ContactItem icon="📞" label={phone} />
        <ContactItem icon="✉" label={email} />
        <ContactItem icon="📍" label={displayLocation} />
        <ContactItem icon="🔗" label={linkedin} />
        <ContactItem icon="🐙" label={github} />
        <ContactItem icon="🌐" label={website} />
      </div>

      {/* ── ABOUT ME ── */}
      <SectionHead title="About Me" />
      {summary
        ? <p style={{ margin: 0, fontSize: '12px', color: '#444', lineHeight: 1.6 }}>{summary}</p>
        : <Empty msg="Write a short profile about your background and strengths." />}
      <Divider />

      {/* ── EDUCATION ── */}
      <SectionHead title="Education" />
      {eduBlocks && eduBlocks.length > 0 ? eduBlocks.map((entry, idx) => (
        <div key={idx} style={{ marginBottom: '12px' }}>
          <div style={{ fontSize: '11px', color: '#666', marginBottom: '2px' }}>
            {entry.meta}
          </div>
          <strong style={{ fontSize: '13px', color: '#111', fontWeight: 800 }}>{entry.title}</strong>
          
          {entry.detailLines && entry.detailLines.length > 0 && (
            <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#444', lineHeight: 1.5 }}>
              {entry.detailLines.join(' ')}
            </p>
          )}
        </div>
      )) : <Empty msg="Add education history. Use a blank line between degrees." />}
      <Divider />

      {/* ── WORK EXPERIENCE ── */}
      <SectionHead title="Work Experience" />
      {expBlocks && expBlocks.length > 0 ? expBlocks.map((entry, idx) => (
        <div key={idx} style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '11px', color: '#666', marginBottom: '2px' }}>
            {entry.meta}
          </div>
          <strong style={{ fontSize: '13px', color: '#111', fontWeight: 800 }}>{entry.title}</strong>
          
          {entry.detailLines && entry.detailLines.length > 0 && (
            <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#444', lineHeight: 1.5 }}>
              {entry.detailLines.join(' ')}
            </p>
          )}
        </div>
      )) : <Empty msg="Add work experience. Use a blank line between different jobs." />}
      <Divider />

      {/* ── SKILLS ── */}
      <SectionHead title="Skills" />
      {(skillList && skillList.length > 0) || (sideSkillList && sideSkillList.length > 0) || (langList && langList.length > 0) ? (
        <ul style={{ 
          margin: 0, 
          padding: '0 0 0 16px', 
          columns: 3, 
          columnGap: '20px',
          fontSize: '12px',
          color: '#444',
          lineHeight: 1.8,
          listStyleType: 'disc'
        }}>
          {(skillList || []).map((sk, i) => <li key={i}>{sk}</li>)}
          {(sideSkillList || []).map((sk, i) => <li key={'s'+i}>{sk}</li>)}
          {(langList || []).map((sk, i) => <li key={'l'+i}>{sk}</li>)}
        </ul>
      ) : <Empty msg="Add your strongest skills, separated by commas." />}

      <div style={{ height: '30px' }} />
    </div>
  );
};

export default ResumePreviewCard;
