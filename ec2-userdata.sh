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

# Create Swap space to prevent Out Of Memory (OOM) crashes on t3.micro/t4g.small (1GB RAM)
if [ ! -f /swapfile ]; then
    fallocate -l 2G /swapfile || dd if=/dev/zero of=/swapfile bs=1M count=2048
    chmod 600 /swapfile
    mkswap /swapfile
    swapon /swapfile
    echo '/swapfile none swap sw 0 0' >> /etc/fstab
fi

# Run database migrations
python backend/manage.py migrate

# Set system-wide open file limits
cat << 'EOF' >> /etc/security/limits.conf
* soft nofile 65535
* hard nofile 65535
root soft nofile 65535
root hard nofile 65535
www-data soft nofile 65535
www-data hard nofile 65535
EOF

# Create Systemd service for Gunicorn with auto-restart and extended timeouts (Optimized for 2GB RAM)
cat << 'EOF' > /etc/systemd/system/careerpilot.service
[Unit]
Description=CareerPilot Backend
After=network.target

[Service]
User=ubuntu
WorkingDirectory=/home/ubuntu/careerpilot/backend
ExecStart=/home/ubuntu/careerpilot/.venv/bin/gunicorn config.wsgi:application --bind 127.0.0.1:8000 --workers 3 --threads 2 --timeout 120 --graceful-timeout 30 --keep-alive 5
Restart=always
RestartSec=3
KillMode=mixed
LimitNOFILE=65535

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl restart careerpilot
systemctl enable careerpilot

# Ensure Nginx temp directories have correct permissions
mkdir -p /var/lib/nginx/proxy /var/lib/nginx/body
chown -R www-data:www-data /var/lib/nginx/

# Configure Nginx reverse proxy with static asset direct serving & proxy timeouts
cat << 'EOF' > /etc/nginx/sites-available/careerpilot
server {
    listen 80;
    server_name _;

    client_max_body_size 50M;
    root /home/ubuntu/careerpilot/client/dist;

    # Serve static assets directly with caching
    location /assets/ {
        alias /home/ubuntu/careerpilot/client/dist/assets/;
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # Direct static file fallback for images, CSS, JS
    location ~* \.(png|jpg|jpeg|gif|ico|svg|css|js)$ {
        try_files $uri =404;
        expires 7d;
        access_log off;
    }

    # API routes proxied to Gunicorn
    location /api/ {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_connect_timeout 120s;
        proxy_read_timeout 120s;
        proxy_send_timeout 120s;
    }

    # Admin routes proxied to Gunicorn
    location /admin/ {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Frontend SPA fallback
    location / {
        try_files $uri $uri/ /index.html;
    }
}
EOF

ln -sf /etc/nginx/sites-available/careerpilot /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
systemctl restart nginx

