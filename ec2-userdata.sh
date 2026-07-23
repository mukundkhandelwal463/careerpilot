#!/bin/bash
set -e

# Update and install system requirements
apt-get update -y
apt-get install -y python3-pip python3-venv nginx git

# Clone repository
cd /home/ubuntu
git clone https://github.com/mukundkhandelwal463/careerpilot.git
chown -R ubuntu:ubuntu /home/ubuntu/careerpilot

# Setup Python environment
cd /home/ubuntu/careerpilot
python3 -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install -r backend/requirements.txt

# Create backend .env
cat << 'EOF' > backend/.env
SECRET_KEY=careerpilot-prod-secret-key-2026
FLASK_ENV=production
EOF

# Run database migrations
python backend/manage.py migrate

# Create Systemd service for Gunicorn
cat << 'EOF' > /etc/systemd/system/careerpilot.service
[Unit]
Description=CareerPilot Backend
After=network.target

[Service]
User=ubuntu
WorkingDirectory=/home/ubuntu/careerpilot/backend
ExecStart=/home/ubuntu/careerpilot/.venv/bin/gunicorn config.wsgi:application --bind 127.0.0.1:8000 --workers 2

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl start careerpilot
systemctl enable careerpilot

# Configure Nginx reverse proxy
cat << 'EOF' > /etc/nginx/sites-available/careerpilot
server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
EOF

ln -sf /etc/nginx/sites-available/careerpilot /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
systemctl restart nginx
