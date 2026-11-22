# CareerPilot - Experiments Environment

This is an isolated clone of the complete **CareerPilot** (`Resume_Screener`) project, specifically dedicated for running experiments, prototyping new features, testing compilers, and trying out architecture changes without risking production or the main working tree.

---

## Workspace Details

- **Location**: `c:\Users\Mukund\Documents\Resume_Screener\Resume_Screener_experiments`
- **Current Git Branch**: `experiments` (tracked to `origin/experiments`)
- **Remote Repository**: `https://github.com/mukundkhandelwal463/careerpilot.git`
- **Environment & Keys**: Copied from primary workspace:
  - `backend/.env` (API keys, JWT, database secrets)
  - `CareerPilot.pem` (AWS EC2 deployment key)
  - `backend/resume_screener.db` (Local SQLite database)

---

## Quick Start for Running Experiments

### 1. Backend (Django)
```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python manage.py runserver 8000
```

### 2. Frontend (React / Vite)
```bash
cd client
npm install
npm run dev
```

---

## Syncing with `main`
If you ever want to pull the latest production updates from `main` into this experiments clone:
```bash
git fetch origin
git merge origin/main
```

---

## Promoting Successful Experiments to Production
Once an experiment is verified and ready to be merged:
```bash
# Push your experiment commits
git push origin experiments

# Switch to main in the primary project and merge
cd ..\Resume_Screener
git checkout main
git pull origin main
git merge experiments
git push origin main
```
