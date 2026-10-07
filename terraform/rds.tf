# ==============================================================================
# CareerPilot AWS RDS PostgreSQL (Managed Database Tier)
# Reference: CareerPilot Project Synopsis Section 9 & Figure 9
# Note: Guarded by 'enable_rds' variable (default false) to prevent unexpected billing.
# ==============================================================================

# Subnet group placing RDS in private data subnets
resource "aws_db_subnet_group" "rds" {
  count      = var.enable_rds ? 1 : 0
  name       = "careerpilot-rds-subnet-group"
  subnet_ids = aws_subnet.private_data[*].id

  tags = {
    Name = "careerpilot-rds-subnet-group"
  }
}

# Free-Tier compatible db.t4g.micro / db.t3.micro PostgreSQL instance
resource "aws_db_instance" "postgres" {
  count                  = var.enable_rds ? 1 : 0
  identifier             = "careerpilot-prod-db"
  allocated_storage      = 20
  max_allocated_storage  = 50
  engine                 = "postgres"
  engine_version         = "16.3"
  instance_class         = "db.t4g.micro"
  db_name                = "careerpilot"
  username               = "careerpilot_admin"
  password               = "CareerPilot_Secure_DB_Pass_2026!" # In prod, use AWS Secrets Manager
  db_subnet_group_name   = aws_db_subnet_group.rds[0].name
  vpc_security_group_ids = [aws_security_group.rds.id]
  skip_final_snapshot    = true
  publicly_accessible    = false

  tags = {
    Name = "careerpilot-postgres-db"
  }
}
