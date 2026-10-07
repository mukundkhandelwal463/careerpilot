# ==============================================================================
# CareerPilot Terraform Variables & Cost Guardrails
# Reference: CareerPilot Project Synopsis Section 9 & 10
# ==============================================================================

variable "aws_region" {
  description = "AWS deployment region"
  type        = string
  default     = "ap-south-1"
}

variable "environment" {
  description = "Environment name (production, staging, dev)"
  type        = string
  default     = "production"
}

variable "domain_name" {
  description = "Production domain name from synopsis"
  type        = string
  default     = "careerpilot.website"
}

variable "live_elastic_ip" {
  description = "Static Elastic IP allocated for live production"
  type        = string
  default     = "15.252.51.16"
}

variable "vpc_cidr" {
  description = "VPC CIDR block (as specified in Synopsis: 10.0.0.0/16)"
  type        = string
  default     = "10.0.0.0/16"
}

variable "public_subnet_cidrs" {
  description = "Public subnet CIDRs (10.0.1.0/24 tier)"
  type        = list(string)
  default     = ["10.0.1.0/24", "10.0.11.0/24"]
}

variable "private_app_subnet_cidrs" {
  description = "Private application subnet CIDRs (10.0.2.0/24 tier)"
  type        = list(string)
  default     = ["10.0.2.0/24", "10.0.12.0/24"]
}

variable "private_data_subnet_cidrs" {
  description = "Private data subnet CIDRs (10.0.3.0/24 tier)"
  type        = list(string)
  default     = ["10.0.3.0/24", "10.0.13.0/24"]
}

variable "instance_type" {
  description = "EC2 instance size from synopsis (t3.small, 2GB RAM, 20GB SSD)"
  type        = string
  default     = "t3.small"
}

variable "key_name" {
  description = "AWS EC2 Key Pair name for SSH administration"
  type        = string
  default     = "careerpilot-key"
}

# ------------------------------------------------------------------------------
# Cost-Protection Guardrails (Prevents accidental cloud billing)
# ------------------------------------------------------------------------------
variable "enable_nat_gateway" {
  description = "Enable AWS NAT Gateway (Default false to prevent ~$32/mo idle charges)"
  type        = bool
  default     = false
}

variable "enable_rds" {
  description = "Provision AWS RDS PostgreSQL (Default false to protect costs; SQLite/Docker PG is used)"
  type        = bool
  default     = false
}

variable "enable_elasticache" {
  description = "Provision AWS ElastiCache Redis (Default false to protect costs; Redis container is used)"
  type        = bool
  default     = false
}
