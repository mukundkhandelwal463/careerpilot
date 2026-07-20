import { Phone, Mail, MapPin } from "lucide-react";

const ProfessionalTemplate = ({ data }) => {
    const formatDateRange = (start, end, isCurrent) => {
        const getYear = (d) => (d ? d.split("-")[0] : "");
        const s = getYear(start);
        const e = isCurrent ? "Present" : getYear(end);
        if (!s && !e) return "";
        if (!s) return e;
        if (!e) return s;
        return `${s} - ${e}`;
    };

    const formatEducationDate = (start, end) => {
        const getYear = (d) => (d ? d.split("-")[0] : "");
        const s = getYear(start);
        const e = getYear(end);
        if (s && e) return `${s}-${e}`;
        if (s) return s;
        if (e) return e;
        return "";
    };

    // Split skills into up to 3 columns
    const skills = data.skills || [];
    const numCols = Math.min(3, skills.length);
    const chunkSize = numCols > 0 ? Math.ceil(skills.length / numCols) : 1;
    const columns = [];
    for (let i = 0; i < skills.length; i += chunkSize) {
        columns.push(skills.slice(i, i + chunkSize));
    }

    return (
        <div
            className="bg-white text-gray-900"
            style={{
                fontFamily: "'Times New Roman', Times, serif",
                maxWidth: "780px",
                margin: "0 auto",
                padding: "48px 52px",
                minHeight: "1050px",
                lineHeight: "1.5",
            }}
        >
            {/* ── HEADER ── */}
            <header style={{ textAlign: "center", marginBottom: "16px" }}>
                <h1
                    style={{
                        fontFamily: "'Arial Black', Arial, sans-serif",
                        fontSize: "28px",
                        fontWeight: "900",
                        letterSpacing: "1px",
                        textTransform: "uppercase",
                        color: "#111",
                        margin: "0 0 4px 0",
                    }}
                >
                    {data.personal_info?.full_name || "YOUR NAME"}
                </h1>

                {(data.personal_info?.job_title || data.personal_info?.title) && (
                    <p style={{ fontSize: "13px", color: "#444", margin: "0 0 10px 0" }}>
                        {data.personal_info?.job_title || data.personal_info?.title}
                    </p>
                )}

                {/* Contact row */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "24px",
                        flexWrap: "wrap",
                        fontSize: "12px",
                        color: "#555",
                    }}
                >
                    {data.personal_info?.phone && (
                        <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                            <Phone size={12} />
                            {data.personal_info.phone}
                        </span>
                    )}
                    {data.personal_info?.email && (
                        <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                            <Mail size={12} />
                            {data.personal_info.email}
                        </span>
                    )}
                    {(data.personal_info?.location || data.personal_info?.city) && (
                        <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                            <MapPin size={12} />
                            {data.personal_info?.location ||
                                [data.personal_info?.city, data.personal_info?.state, data.personal_info?.country]
                                    .filter(Boolean)
                                    .join(", ")}
                        </span>
                    )}
                </div>
            </header>

            <hr style={{ border: "none", borderTop: "1.5px solid #222", margin: "0 0 16px 0" }} />

            {/* ── ABOUT ME / PROFESSIONAL SUMMARY ── */}
            {data.professional_summary && (
                <section style={{ marginBottom: "0" }}>
                    <SectionHeader title="ABOUT ME" />
                    <p style={{ fontSize: "12.5px", color: "#333", lineHeight: "1.65", margin: "6px 0 0 0" }}>
                        {data.professional_summary}
                    </p>
                    <Divider />
                </section>
            )}

            {/* ── EDUCATION ── */}
            {data.education && data.education.length > 0 && (
                <section style={{ marginBottom: "0" }}>
                    <SectionHeader title="EDUCATION" />
                    <div style={{ marginTop: "8px" }}>
                        {data.education.map((edu, i) => {
                            const institution = edu.institution || edu.school || "";
                            const dateRange = formatEducationDate(edu.start_date, edu.graduation_date || edu.end_date);
                            return (
                                <div key={i} style={{ marginBottom: i < data.education.length - 1 ? "14px" : 0 }}>
                                    <p style={{ fontSize: "12px", color: "#555", margin: "0 0 2px 0" }}>
                                        {institution}{dateRange && <span> | {dateRange}</span>}
                                    </p>
                                    <p style={{ fontSize: "13px", fontWeight: "700", color: "#111", margin: "0 0 3px 0" }}>
                                        {[edu.degree, edu.field].filter(Boolean).join(" in ")}
                                    </p>
                                    {edu.description && (
                                        <p style={{ fontSize: "12.5px", color: "#333", lineHeight: "1.6", margin: 0 }}>
                                            {edu.description}
                                        </p>
                                    )}
                                    {edu.gpa && (
                                        <p style={{ fontSize: "12px", color: "#555", margin: "2px 0 0 0" }}>
                                            GPA: {edu.gpa}
                                        </p>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    <Divider />
                </section>
            )}

            {/* ── WORK EXPERIENCE ── */}
            {data.experience && data.experience.length > 0 && (
                <section style={{ marginBottom: "0" }}>
                    <SectionHeader title="WORK EXPERIENCE" />
                    <div style={{ marginTop: "8px" }}>
                        {data.experience.map((exp, i) => {
                            const dateRange = formatDateRange(exp.start_date, exp.end_date, exp.is_current);
                            return (
                                <div key={i} style={{ marginBottom: i < data.experience.length - 1 ? "14px" : 0 }}>
                                    <p style={{ fontSize: "12px", color: "#555", margin: "0 0 2px 0" }}>
                                        {exp.company}{dateRange && <span> | {dateRange}</span>}
                                    </p>
                                    <p style={{ fontSize: "13px", fontWeight: "700", color: "#111", margin: "0 0 3px 0" }}>
                                        {exp.position}
                                    </p>
                                    {exp.description && (
                                        <p style={{ fontSize: "12.5px", color: "#333", lineHeight: "1.65", margin: 0, whiteSpace: "pre-line" }}>
                                            {exp.description}
                                        </p>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    <Divider />
                </section>
            )}

            {/* ── PROJECTS ── */}
            {data.project && data.project.length > 0 && (
                <section style={{ marginBottom: "0" }}>
                    <SectionHeader title="PROJECTS" />
                    <div style={{ marginTop: "8px" }}>
                        {data.project.map((proj, i) => (
                            <div key={i} style={{ marginBottom: i < data.project.length - 1 ? "12px" : 0 }}>
                                <p style={{ fontSize: "13px", fontWeight: "700", color: "#111", margin: "0 0 2px 0" }}>
                                    {proj.name}
                                </p>
                                {proj.description && (
                                    <p style={{ fontSize: "12.5px", color: "#333", lineHeight: "1.6", margin: 0 }}>
                                        {proj.description}
                                    </p>
                                )}
                                {proj.technologies && (
                                    <p style={{ fontSize: "12px", color: "#555", margin: "2px 0 0 0", fontStyle: "italic" }}>
                                        Technologies: {Array.isArray(proj.technologies) ? proj.technologies.join(", ") : proj.technologies}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                    <Divider />
                </section>
            )}

            {/* ── SKILLS ── */}
            {skills.length > 0 && (
                <section style={{ marginBottom: "0" }}>
                    <SectionHeader title="SKILLS" />
                    <div
                        style={{
                            marginTop: "8px",
                            display: "grid",
                            gridTemplateColumns: `repeat(${Math.min(columns.length, 3)}, 1fr)`,
                            gap: "0 20px",
                        }}
                    >
                        {columns.map((col, ci) => (
                            <ul key={ci} style={{ margin: 0, padding: 0, listStyle: "none" }}>
                                {col.map((skill, si) => (
                                    <li
                                        key={si}
                                        style={{
                                            fontSize: "12.5px",
                                            color: "#333",
                                            marginBottom: "4px",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "6px",
                                        }}
                                    >
                                        <span style={{ fontSize: "10px" }}>•</span>
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        ))}
                    </div>
                </section>
            )}

            {/* ── KEYWORDS ── */}
            {data.keywords && data.keywords.length > 0 && (
                <section>
                    <Divider />
                    <SectionHeader title="KEYWORDS" />
                    <p style={{ fontSize: "12.5px", color: "#333", marginTop: "6px" }}>
                        {data.keywords.join("  •  ")}
                    </p>
                </section>
            )}
        </div>
    );
};

const SectionHeader = ({ title }) => (
    <h2
        style={{
            fontFamily: "'Arial Black', Arial, sans-serif",
            fontSize: "13px",
            fontWeight: "900",
            letterSpacing: "1px",
            textTransform: "uppercase",
            color: "#111",
            margin: "0",
        }}
    >
        {title}
    </h2>
);

const Divider = () => (
    <hr
        style={{
            border: "none",
            borderTop: "1px solid #bbb",
            margin: "14px 0 14px 0",
        }}
    />
);

export default ProfessionalTemplate;
