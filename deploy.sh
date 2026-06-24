#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "=========================================================="
echo " Starting DevOps-2 Website Deployment on Amazon Linux"
echo "=========================================================="

# 1. Update the system package manager
echo "Step 1: Updating packages..."
if command -v dnf &> /dev/null; then
    sudo dnf update -y
else
    sudo yum update -y
fi

# 2. Install Node.js using Node Version Manager (NVM)
# This is the safest way to ensure compatibility without package conflicts.
if ! command -v node &> /dev/null; then
    echo "Step 2: Installing Node.js via NVM..."
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

    # Load NVM into the current shell session
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

    # Install the latest Long-Term Support (LTS) Node.js version
    nvm install --lts
    nvm use --lts
    nvm alias default 'lts/*'
else
    echo "Step 2: Node.js is already installed: $(node -v)"
fi

# Confirm Node and NPM are accessible
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
echo "Using Node version: $(node -v)"
echo "Using NPM version: $(npm -v)"

# 3. Locate the frontend directory and build the project
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FRONTEND_DIR="$SCRIPT_DIR/frontend"

if [ -d "$FRONTEND_DIR" ]; then
    echo "Step 3: Building the React frontend in $FRONTEND_DIR..."
    cd "$FRONTEND_DIR"
    
    # Install dependencies
    echo "Installing frontend dependencies..."
    npm install
    
    # Build frontend
    echo "Building production bundles..."
    npm run build
else
    echo "Error: Frontend directory not found at $FRONTEND_DIR."
    echo "Please make sure this script is run from the root of the 'devops-2' repository."
    exit 1
fi

# 4. Install Nginx
echo "Step 4: Installing Nginx..."
if ! command -v nginx &> /dev/null; then
    if command -v dnf &> /dev/null; then
        sudo dnf install nginx -y
    else
        # Amazon Linux 2 Nginx installation
        sudo amazon-linux-extras install nginx1 -y || sudo yum install nginx -y
    fi
else
    echo "Nginx is already installed."
fi

# 5. Configure Nginx and Copy Built Files
echo "Step 5: Configuring Nginx server and copying files..."

# Prepare Nginx web root directory
sudo mkdir -p /var/www/devops-2
sudo rm -rf /var/www/devops-2/*

# Copy built React files
sudo cp -r "$FRONTEND_DIR/dist/"* /var/www/devops-2/

# Set correct permissions
sudo chown -R nginx:nginx /var/www/devops-2
sudo chmod -R 755 /var/www/devops-2

# Write Nginx configuration
# We configure a server block that listens on Port 80 and uses try_files
# to properly route requests back to index.html for React Router.
NGINX_CONFIG="user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log notice;
pid /run/nginx.pid;

# Load dynamic modules.
include /usr/share/nginx/modules/*.conf;

events {
    worker_connections 1024;
}

http {
    log_format  main  '\$remote_addr - \$remote_user [\$time_local] \"\$request\" '
                      '\$status \$body_bytes_sent \"\$http_referer\" '
                      '\"\$http_user_agent\" \"\$http_x_forwarded_for\"';

    access_log  /var/log/nginx/access.log  main;

    sendfile            on;
    tcp_nopush          on;
    keepalive_timeout   65;
    types_hash_max_size 4096;

    include             /etc/nginx/mime.types;
    default_type        application/octet-stream;

    # Load modular configuration files from the /etc/nginx/conf.d directory.
    include /etc/nginx/conf.d/*.conf;

    server {
        listen       80;
        listen       [::]:80;
        server_name  _;
        root         /var/www/devops-2;
        index        index.html;

        # Directives for serving SPA assets and fallback routing
        location / {
            try_files \$uri \$uri/ /index.html;
        }

        # Cache control for static assets (optional but recommended)
        location /assets {
            expires 1y;
            add_header Cache-Control \"public, no-transform\";
        }

        error_page 404 /404.html;
        location = /404.html {
        }

        error_page 500 502 503 504 /50x.html;
        location = /50x.html {
        }
    }
}
"

# Overwrite Nginx configuration file
echo "$NGINX_CONFIG" | sudo tee /etc/nginx/nginx.conf > /dev/null

# 6. Start and enable Nginx service
echo "Step 6: Starting and enabling Nginx..."
sudo systemctl restart nginx
sudo systemctl enable nginx

echo "=========================================================="
echo " Deployment Completed Successfully!"
echo " The web application is now active on port 80."
echo " Ensure that your EC2 security group allows traffic on Port 80 (HTTP)."
echo "=========================================================="
