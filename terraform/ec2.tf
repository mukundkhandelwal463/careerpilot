# ==============================================================================
# CareerPilot AWS EC2 Compute Node & Elastic IP
# Reference: CareerPilot Project Synopsis Section 9 & 10 (t3.small, 2GB RAM, 20GB SSD)
# ==============================================================================

# Lookup latest official Ubuntu 24.04 LTS AMI
data "aws_ami" "ubuntu" {
  most_recent = true

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd-gp3/ubuntu-noble-24.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  owners = ["099720109477"] # Canonical
}

# 1. CareerPilot Production EC2 Instance
resource "aws_instance" "careerpilot_server" {
  ami                         = data.aws_ami.ubuntu.id
  instance_type               = var.instance_type
  subnet_id                   = aws_subnet.public[0].id
  vpc_security_group_ids      = [aws_security_group.ec2.id]
  associate_public_ip_address = true
  key_name                    = var.key_name

  root_block_device {
    volume_size           = 20 # 20GB SSD as specified in synopsis
    volume_type           = "gp3"
    delete_on_termination = true
    encrypted             = true

    tags = {
      Name = "careerpilot-root-volume"
    }
  }

  user_data = fileexists("${path.module}/../ec2-userdata.sh") ? file("${path.module}/../ec2-userdata.sh") : <<-EOF
              #!/bin/bash
              echo "CareerPilot EC2 Node Initialized"
              EOF

  tags = {
    Name = "careerpilot-production-instance"
    Tier = "Compute"
  }
}

# 2. Elastic IP Allocation
# Live Elastic IP: 15.252.51.16
resource "aws_eip" "careerpilot_eip" {
  instance = aws_instance.careerpilot_server.id
  domain   = "vpc"

  tags = {
    Name = "careerpilot-elastic-ip"
  }
}
