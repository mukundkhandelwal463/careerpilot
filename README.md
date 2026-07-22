# 🚀 CareerPilot — AI-Powered Candidate Career Acceleration Platform

<p align="center">
  <img src="https://img.shields.io/badge/Django-5.0-092E20?style=for-the-badge&logo=django&logoColor=white" />
  <img src="https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Vite-7.0-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Gemini_AI-2.5_Flash-8E75B2?style=for-the-badge&logo=google&logoColor=white" />
  <img src="https://img.shields.io/badge/AWS-Free_Tier-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white" />
  <img src="https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge" />
</p>

**CareerPilot** is an end-to-end, high-performance AI candidate acceleration suite. It bridges the gap between candidate resumes and top tech employers using **ATS resume parsing**, **executive LaTeX compilation**, **interactive AI voice mock interviews**, **CS subject mastery trackers**, and **real-time live job matching**.

---

## 🌟 Core Modules & Features

### 1. 📊 ATS Resume Screener & Keyword Engine
* **Instant Scorecard**: Upload `PDF` or `DOCX` CVs to calculate match scores (0–100%).
* **Workday & Greenhouse Compatibility**: Scans resume formatting against top ATS ATS parsers.
* **Gemini AI Keyword Recommendations**: Identifies missing hard/soft skills and recommends contextual bullet point improvements.

### 2. 📄 Executive LaTeX Resume Builder & PDF Compiler
* **3 Executive Templates**: Tailored for Data Science/ML, Software Engineering, and Product/Executive roles.
* **AI Autofill**: Automatically converts plain resume notes into polished LaTeX formatting.
* **Direct Export**: One-click download as high-converting `.pdf` or editable `.docx`.

### 3. 🎙️ AI Voice Mock Interviews & Fluency Scorecards
* **Speech Recognition**: Practice technical & behavioral interview questions with real-time speech analytics.
* **Fluency & Accuracy Scoring**: Evaluates candidate confidence, pacing, and domain accuracy.
* **Full-Length Mock Tests**: 60 MCQ questions + coding problem sandbox with real-time test evaluations.

### 4. 📚 CS Core Subjects & Top 50 DSA Pattern Tracker
* **Subject Theory Notes**: Revision summaries for Operating Systems, DBMS, Computer Networks, and System Design.
* **Top 50 DSA Sheet**: Track solved algorithms with direct links to LeetCode and GeeksforGeeks.

### 5. 💼 Real-Time Live Job Matcher
* **Arbeitnow API Integration**: Indexes 100K+ live tech jobs updated daily.
* **Skill-Graph Alignment**: Automatically filters roles based on extracted candidate resume skills, remote options, and hub locations.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, Vite 7, TailwindCSS 4, Framer Motion, GSAP, Lenis Smooth Scroll, Lucide Icons |
| **Backend** | Python 3.12, Django REST Framework, Gunicorn |
| **AI & ML Engine** | Google Gemini 2.5 Flash API, scikit-learn (TF-IDF), Pandas, NumPy |
| **Parser & Compiler** | `pdfplumber`, `PyPDF2`, `python-docx`, `fpdf2` |
| **Database** | SQLite (Dev) / PostgreSQL (Production) |

---

## 💻 Local Development Setup

### 1. Clone Repository
```bash
git clone https://github.com/mukundkhandelwal463/careerpilot.git
cd careerpilot
```

### 2. Backend Setup (Django)
```bash
# Create virtual environment
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install dependencies
pip install -r backend/requirements.txt

# Create .env file
cp backend/.env.example backend/.env
# Add your GEMINI_API_KEY inside backend/.env

# Run migrations & start server
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

## ☁️ AWS Free Tier Deployment Guide ($0.00 / Low Cost Setup)

This project can be deployed **100% Free** using **AWS Free Tier** + **$100 AWS Credits** for a full 1+ year zero-cost operation.

```
                  ┌────────────────────────┐
                  │   AWS S3 + CloudFront  │ (Frontend Static Hosting — $0/mo)
                  │    React 19 / Vite     │
                  └───────────┬────────────┘
                              │ HTTPS API Requests
                  ┌───────────▼────────────┐
                  │ AWS EC2 (t3.micro/t4g) │ (Backend API — Free Tier / $0/mo)
                  │ Nginx + Gunicorn + WSGI│
                  └────────────────────────┘
```

### Step 1: Deploy Frontend on AWS S3 + CloudFront (100% Free)
1. Build the production bundle:
   ```bash
   cd client
   npm run build
   ```
2. Create an **AWS S3 Bucket** (e.g. `careerpilot-app`) and enable **Static Website Hosting**.
3. Upload all contents of `client/dist/` into the S3 bucket.
4. Create an **AWS CloudFront Distribution** pointing to your S3 bucket for global CDN & free HTTPS SSL.

### Step 2: Deploy Backend on AWS EC2 Free Tier (`t3.micro` / `t4g.small`)
1. Launch an **AWS EC2 Instance** using Ubuntu 24.04 (`t3.micro` is 12 Months Free Tier eligible, or `t4g.small` covered 100% by $100 credits).
2. SSH into your instance and install dependencies:
   ```bash
   sudo apt update && sudo apt install -y python3-pip python3-venv nginx git
   ```
3. Clone your repository:
   ```bash
   git clone https://github.com/mukundkhandelwal463/careerpilot.git
   cd careerpilot
   python3 -m venv .venv
   source .venv/bin/activate
   pip install -r backend/requirements.txt
   ```
4. Create production `.env`:
   ```bash
   nano backend/.env
   # Add: GEMINI_API_KEY, SECRET_KEY, FLASK_ENV=production
   ```
5. Configure Gunicorn Systemd Service (`/etc/systemd/system/careerpilot.service`):
   ```ini
   [Unit]
   Description=CareerPilot Django Backend
   After=network.target

   [Service]
   User=ubuntu
   WorkingDirectory=/home/ubuntu/careerpilot/backend
   ExecStart=/home/ubuntu/careerpilot/.venv/bin/gunicorn config.wsgi:application --bind 127.0.0.1:8000 --workers 2

   [Install]
   WantedBy=multi-user.target
   ```
   Enable service: `sudo systemctl start careerpilot && sudo systemctl enable careerpilot`.

6. Configure Nginx Reverse Proxy (`/etc/nginx/sites-available/careerpilot`):
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://127.0.0.1:8000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
   }
   ```
7. Enable SSL via free Let's Encrypt Certbot:
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

**Built with ❤️ for candidate success.**
