# 🚀 CareerPilot — AI-Powered Candidate Career Acceleration Platform

<p align="center">
  <img src="logo.png" alt="CareerPilot Logo" width="160" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Django-5.0-092E20?style=for-the-badge&logo=django&logoColor=white" />
  <img src="https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Vite-7.0-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Gemini_AI-2.5_Flash-8E75B2?style=for-the-badge&logo=google&logoColor=white" />
  <img src="https://img.shields.io/badge/AWS-EC2_t3.small-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white" />
  <img src="https://img.shields.io/badge/Nginx-1.28.3-009639?style=for-the-badge&logo=nginx&logoColor=white" />
  <img src="https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge" />
</p>

---

## 📖 Table of Contents
- [🌐 Project Overview](#-project-overview)
- [🌟 Key Modules & Features](#-key-modules--features)
- [🎬 UI Animation & Visual Design Engine](#-ui-animation--visual-design-engine)
- [🏗 System Architecture & Flow](#-system-architecture--flow)
- [🛠 Technology Stack](#-technology-stack)
- [💻 Local Development Setup](#-local-development-setup)
- [☁️ AWS Production Cloud Architecture](#%EF%B8%8F-aws-production-cloud-architecture)
- [🛡️ Production Hardening & Resilience](#%EF%B8%8F-production-hardening--resilience)
- [📸 Application Screenshots & Artifacts](#-application-screenshots--artifacts)
- [📜 License & Author](#-license--author)

---

## 🌐 Project Overview

**CareerPilot** is a state-of-the-art, high-performance **AI candidate acceleration platform** designed to optimize every stage of a job candidate's journey. It bridges the gap between candidate resumes and top tech recruiters using **ATS resume scorecards**, **executive LaTeX PDF builders**, **real-time AI voice mock interviews**, **CS core subject mastery trackers**, and **live tech job alignment engines**.

Powered by Google's **Gemini AI**, **scikit-learn TF-IDF similarity vectorizers**, and an ultra-fluid **React 19 / Vite 7** frontend, CareerPilot provides actionable candidate feedback, automated resume rebuilding, and real-time live interview evaluations.

---

## 🌟 Key Modules & Features

### 1. 📊 ATS Resume Screener & Skill Alignment Engine
- **Instant Match Score (0–100%)**: Evaluates uploaded `PDF` and `DOCX` CVs against industry standard job descriptions.
- **Workday & Greenhouse ATS Simulation**: Scans layout formatting, bullet structure, and keyword density.
- **Gemini AI Skill Recommendations**: Identifies missing hard/soft technical skills and suggests contextual bullet point enhancements.
- **Source Code**: [views.py](file:///c:/Users/Mukund/PycharmProjects/Resume_Screener/backend/api/views.py), [Upload.jsx](file:///c:/Users/Mukund/PycharmProjects/Resume_Screener/client/src/pages/Upload.jsx)

### 2. 📄 Executive LaTeX Resume Builder & PDF Compiler
- **3 Executive LaTeX Templates**: Tailored for Software Engineering, Data Science / ML, and Product Management.
- **AI Bullet Autofill**: Converts unstructured candidate experiences into high-impact LaTeX bullet points.
- **Instant PDF Compilation**: Renders pixel-perfect `.pdf` or editable `.docx` files directly from backend compilers.
- **Source Code**: [ResumeBuilder.jsx](file:///c:/Users/Mukund/PycharmProjects/Resume_Screener/client/src/pages/ResumeBuilder.jsx), [Preview.jsx](file:///c:/Users/Mukund/PycharmProjects/Resume_Screener/client/src/pages/Preview.jsx)

### 3. 🎙️ AI Voice Mock Interviews & Fluency Analytics
- **Real-Time Speech Analytics**: Conducts interactive technical and behavioral voice interviews.
- **Fluency & Accuracy Scoring**: Evaluates candidate confidence, speech pacing, technical depth, and filler words.
- **Automated Roadmap Generation**: Delivers personalized study plans based on weak technical areas.
- **Source Code**: [Preparation.jsx](file:///c:/Users/Mukund/PycharmProjects/Resume_Screener/client/src/pages/Preparation.jsx), [MockTest.jsx](file:///c:/Users/Mukund/PycharmProjects/Resume_Screener/client/src/pages/MockTest.jsx)

### 4. 📚 CS Core Subjects & Top 50 DSA Sheet Tracker
- **Subject Revision Modules**: Theory summaries for Operating Systems (OS), Database Management Systems (DBMS), Computer Networks (CN), and System Design.
- **Top 50 DSA Pattern Tracker**: Interactive progress tracking for classic data structure algorithms with direct links to LeetCode and GeeksforGeeks.
- **Source Code**: [OsTheory.jsx](file:///c:/Users/Mukund/PycharmProjects/Resume_Screener/client/src/pages/OsTheory.jsx), [DbmsTheory.jsx](file:///c:/Users/Mukund/PycharmProjects/Resume_Screener/client/src/pages/DbmsTheory.jsx)

### 5. 💼 Real-Time Live Job Matcher
- **100K+ Live Job Index**: Aggregates tech roles updated daily via Arbeitnow and JSearch APIs.
- **Skill-Graph Matching**: Automatically matches candidate resume skills against open positions, remote filters, and hub locations.
- **Source Code**: [Jobs.jsx](file:///c:/Users/Mukund/PycharmProjects/Resume_Screener/client/src/pages/Jobs.jsx)

### 6. 📈 Interactive Analytics & Candidate Dashboard
- **Comprehensive Score Reports**: Detailed break-down of candidate metrics, interview history, and resume versions.
- **Exportable PDF Reports**: One-click complete candidate diagnostic PDF download.
- **Source Code**: [dashboard.jsx](file:///c:/Users/Mukund/PycharmProjects/Resume_Screener/client/src/pages/dashboard.jsx), [Result.jsx](file:///c:/Users/Mukund/PycharmProjects/Resume_Screener/client/src/pages/Result.jsx)

---

## 🎬 UI Animation & Visual Design Engine

The landing page ([Home.jsx](file:///c:/Users/Mukund/PycharmProjects/Resume_Screener/client/src/pages/Home.jsx)) features an executive-grade, interactive visual design powered by modern frontend libraries:

```
                  ┌─────────────────────────────────────────┐
                  │          Lenis Smooth Scroll            │ (Inertial momentum scrolling)
                  └────────────────────┬────────────────────┘
                                       │
                  ┌────────────────────▼────────────────────┐
                  │    Framer Motion Scroll Engine          │ (Scroll-driven transforms & spring dynamics)
                  └────────────────────┬────────────────────┘
                                       │
            ┌──────────────────────────┴──────────────────────────┐
            │                                                     │
┌───────────▼────────────┐                              ┌─────────▼────────────┐
│ HTML5 Canvas 2D        │                              │ 3D Perspective Tilt  │
│ Neural Mesh System     │                              │ Cursor Glare Engine  │
│ (Dynamic Particles)    │                              │ (CSS 3D Transforms)  │
└────────────────────────┘                              └──────────────────────┘
```

- **Framer Motion (`framer-motion`)**: Drives scroll-triggered animations (`useScroll`, `useTransform`, `useSpring`), hero card floating, micro-interactions, badge glows, and component entrances.
- **Lenis Smooth Scroll (`lenis`)**: Provides luxury, inertia-based smooth scrolling across all pages.
- **HTML5 Neural Particle Mesh (`ParticleMeshCanvas`)**: Custom HTML5 2D Canvas engine generating an interactive neural particle network that connects nodes dynamically on cursor hover.
- **3D Perspective Tilt Engine (`TiltCard`)**: Custom CSS 3D perspective engine (`perspective(1000px) rotateX(...) rotateY(...) scale3d(...)`) with radial specular glare tracking cursor coordinates.
- **Glassmorphic HSL Design System**: Dark/light mode theme engine built with vanilla CSS tokens, backdrop blurs (`backdrop-filter: blur()`), and dynamic HSL gradients ([home.css](file:///c:/Users/Mukund/PycharmProjects/Resume_Screener/client/src/css/home.css)).

---

## 🏗 System Architecture & Flow

```mermaid
flowchart TD
    User([Candidate / Recruiter]) -->|HTTPS Requests| CloudFront[AWS CloudFront CDN / S3]
    User -->|API / Web Traffic| Nginx[Nginx 1.28.3 Reverse Proxy]
    
    subgraph AWS EC2 Server (t3.small / 2GB RAM / 20GB SSD)
        Nginx -->|Static Assets /assets/| Dist[Client Static Build /client/dist/]
        Nginx -->|Proxy Pass http://127.0.0.1:8000| Gunicorn[Gunicorn WSGI / 3 Workers 2 Threads]
        
        subgraph Django REST Backend
            Gunicorn --> Django[Django 5.0 REST Framework]
            Django --> Auth[Authentication & JWT Engine]
            Django --> TFIDF[Scikit-Learn TF-IDF Cosine Similarity]
            Django --> PDFCompiler[PDFPlumber & PyPDF2 Parser]
            Django --> DB[(SQLite / PostgreSQL DB)]
        end
    end
    
    Django -->|API Calls| Gemini[Google Gemini 2.5 Flash AI API]
    Django -->|API Calls| JobAPI[Arbeitnow / JSearch Live Job APIs]
```

---

## 🛠 Technology Stack

| Layer | Technologies & Tools |
| :--- | :--- |
| **Frontend** | React 19, Vite 7, TailwindCSS 4, Framer Motion, Lenis Smooth Scroll, GSAP, Lucide Icons |
| **Backend** | Python 3.12, Django 5.0 REST Framework, Gunicorn WSGI |
| **AI & Machine Learning** | Google Gemini 2.5 Flash API, `scikit-learn` (TF-IDF vectorizer), `pandas`, `numpy` |
| **Parsing & Compilers** | `pdfplumber`, `PyPDF2`, `python-docx`, `fpdf2`, LaTeX engine |
| **Database** | SQLite (Development) / PostgreSQL (Production) |
| **Cloud & Infrastructure** | AWS EC2 (`t3.small`, 2GB RAM, 20GB SSD), Nginx Reverse Proxy, Let's Encrypt SSL, Systemd |

---

## 💻 Local Development Setup

### 1. Clone Repository
```bash
git clone https://github.com/mukundkhandelwal463/careerpilot.git
cd careerpilot
```

### 2. Backend Setup (Django)
```bash
# Create Python virtual environment
python -m venv .venv

# Activate environment
# On Linux/Mac:
source .venv/bin/activate
# On Windows:
.venv\Scripts\activate

# Install dependencies
pip install -r backend/requirements.txt

# Create .env file
cp backend/.env.example backend/.env
# Open backend/.env and add your GEMINI_API_KEY

# Run database migrations & start backend server
python backend/manage.py migrate
python backend/manage.py runserver 8000
```

### 3. Frontend Setup (React / Vite)
```bash
cd client
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## ☁️ AWS Production Cloud Architecture

CareerPilot is deployed on **AWS Cloud** using a high-availability, low-latency deployment architecture:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        AWS EC2 (t3.small)                              │
│                    2 GB RAM | 20 GB SSD Storage                        │
│                                                                        │
│   ┌──────────────────────┐         ┌───────────────────────────────┐   │
│   │    Nginx Web Server  │         │   Gunicorn WSGI Application   │   │
│   │  (Port 80 / 443 SSL) │ ──────> │   (3 Workers × 2 Threads)     │   │
│   └──────────┬───────────┘         └───────────────┬───────────────┘   │
│              │                                     │                   │
│              ▼                                     ▼                   │
│   Direct Static Assets               Django 5.0 REST Backend API       │
│  (/home/ubuntu/.../dist/)              (http://127.0.0.1:8000)        │
└────────────────────────────────────────────────────────────────────────┘
```

### Server Configuration Quick Reference:
- **Systemd Service**: `/etc/systemd/system/careerpilot.service` (`Restart=always`, `LimitNOFILE=65535`, `ExecStart=gunicorn --workers 3 --threads 2 --timeout 120`)
- **Nginx Reverse Proxy**: `/etc/nginx/sites-available/careerpilot` (Direct static asset routing for `/assets/`, proxy timeout 120s)
- **Static Elastic IP**: `15.252.51.16` permanently bound to EC2 instance
- **Deployment Script**: [ec2-userdata.sh](file:///c:/Users/Mukund/PycharmProjects/Resume_Screener/ec2-userdata.sh)

---

## 🛡️ Production Hardening & Resilience

To guarantee 99.9% uptime on AWS Free Tier / Credit infrastructure, CareerPilot includes the following production safeguards:

1. **2 GB Swap Memory Protection**:
   Configured `/swapfile` to prevent Out-of-Memory (OOM) kernel kills during heavy AI resume checks.
2. **Systemd Auto-Recovery**:
   Gunicorn service is configured with `Restart=always` and `RestartSec=3` to auto-revive within 3 seconds if any crash occurs.
3. **High File Handle Limits (`LimitNOFILE=65535`)**:
   Updated system limits (`/etc/security/limits.conf` & Nginx `worker_rlimit_nofile 65535`) to prevent `Too many open files` errors under heavy connection spikes.
4. **Log Vacuum Capping (`SystemMaxUse=100M`)**:
   Capped `/etc/systemd/journald.conf` logs to 100MB max to prevent disk bloat.

---

## 📸 Application Screenshots & Artifacts

| Candidate Profile & Scorecard | Platform Logo |
| :---: | :---: |
| ![Candidate Profile](client/dist/candidate_profile.png) | ![CareerPilot Logo](logo.png) |

---

## 📜 License & Author

Distributed under the **MIT License**. See `LICENSE` for details.

**Author**: Mukund Khandelwal ([GitHub Profile](https://github.com/mukundkhandelwal463))  
**Project Repository**: [CareerPilot on GitHub](https://github.com/mukundkhandelwal463/careerpilot)

---

<p align="center">
  <b>Built with ❤️ for candidate career acceleration.</b>
</p>
