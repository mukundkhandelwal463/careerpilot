# ==============================================================================
# CareerPilot AWS VPC & Subnet Architecture
# Reference: CareerPilot Project Synopsis Section 9 (VPC 10.0.0.0/16) & Figure 9
# ==============================================================================

# Data source for available AZs in chosen region
data "aws_availability_zones" "available" {
  state = "available"
}

# 1. Main Virtual Private Cloud (10.0.0.0/16)
resource "aws_vpc" "main" {
  cidr_block           = var.vpc_cidr
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "careerpilot-vpc"
  }
}

# 2. Internet Gateway for Public Internet Access
resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "careerpilot-igw"
  }
}

# 3. Public Subnets (10.0.1.0/24 tier: Ingress ALB / Bastion / Nginx)
resource "aws_subnet" "public" {
  count                   = length(var.public_subnet_cidrs)
  vpc_id                  = aws_vpc.main.id
  cidr_block              = var.public_subnet_cidrs[count.index]
  availability_zone       = data.aws_availability_zones.available.names[count.index]
  map_public_ip_on_launch = true

  tags = {
    Name = "careerpilot-public-subnet-${count.index + 1}"
    Tier = "Public"
  }
}

# 4. Private Application Subnets (10.0.2.0/24 tier: EC2 / EKS worker nodes)
resource "aws_subnet" "private_app" {
  count             = length(var.private_app_subnet_cidrs)
  vpc_id            = aws_vpc.main.id
  cidr_block        = var.private_app_subnet_cidrs[count.index]
  availability_zone = data.aws_availability_zones.available.names[count.index]

  tags = {
    Name = "careerpilot-private-app-subnet-${count.index + 1}"
    Tier = "Private-Application"
  }
}

# 5. Private Data Subnets (10.0.3.0/24 tier: RDS PostgreSQL, Redis)
resource "aws_subnet" "private_data" {
  count             = length(var.private_data_subnet_cidrs)
  vpc_id            = aws_vpc.main.id
  cidr_block        = var.private_data_subnet_cidrs[count.index]
  availability_zone = data.aws_availability_zones.available.names[count.index]

  tags = {
    Name = "careerpilot-private-data-subnet-${count.index + 1}"
    Tier = "Private-Data"
  }
}

# 6. Public Route Table routing to Internet Gateway
resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }

  tags = {
    Name = "careerpilot-public-rt"
  }
}

# 7. Associate Public Subnets with Public Route Table
resource "aws_route_table_association" "public" {
  count          = length(aws_subnet.public)
  subnet_id      = aws_subnet.public[count.index].id
  route_table_id = aws_route_table.public.id
}
