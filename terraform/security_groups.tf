# ==============================================================================
# CareerPilot AWS Security Groups (DevSecOps Stateful Firewalls)
# Reference: CareerPilot Project Synopsis Section 9 & 11
# ==============================================================================

# 1. Application Load Balancer Security Group (Public Web Traffic)
resource "aws_security_group" "alb" {
  name        = "careerpilot-alb-sg"
  description = "Security group for external ALB ingress traffic"
  vpc_id      = aws_vpc.main.id

  ingress {
    description = "HTTP Public"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "HTTPS Public"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    description = "Allow all outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "careerpilot-alb-sg"
  }
}

# 2. EC2 Application Security Group (Django, Nginx, Prometheus, SSH)
resource "aws_security_group" "ec2" {
  name        = "careerpilot-ec2-sg"
  description = "Security group for CareerPilot EC2/EKS Worker Node"
  vpc_id      = aws_vpc.main.id

  ingress {
    description = "SSH Administration"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "HTTP Direct / Ingress"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "HTTPS Direct / Ingress"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Django Gunicorn Backend Internal Port"
    from_port   = 8000
    to_port     = 8000
    protocol    = "tcp"
    cidr_blocks = [var.vpc_cidr]
  }

  ingress {
    description = "Prometheus Metrics Scraper Port"
    from_port   = 9090
    to_port     = 9090
    protocol    = "tcp"
    cidr_blocks = [var.vpc_cidr]
  }

  ingress {
    description = "Grafana Dashboard Port"
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = [var.vpc_cidr]
  }

  egress {
    description = "Allow all outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "careerpilot-ec2-sg"
  }
}

# 3. RDS PostgreSQL Security Group
resource "aws_security_group" "rds" {
  name        = "careerpilot-rds-sg"
  description = "Security group for PostgreSQL database tier"
  vpc_id      = aws_vpc.main.id

  ingress {
    description     = "PostgreSQL access from EC2 Application SG"
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.ec2.id]
  }

  egress {
    description = "Outbound"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "careerpilot-rds-sg"
  }
}

# 4. ElastiCache Redis Security Group
resource "aws_security_group" "redis" {
  name        = "careerpilot-redis-sg"
  description = "Security group for Redis cache tier"
  vpc_id      = aws_vpc.main.id

  ingress {
    description     = "Redis access from EC2 Application SG"
    from_port       = 6379
    to_port         = 6379
    protocol        = "tcp"
    security_groups = [aws_security_group.ec2.id]
  }

  egress {
    description = "Outbound"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "careerpilot-redis-sg"
  }
}
