# ==============================================================================
# CareerPilot Terraform Outputs
# ==============================================================================

output "vpc_id" {
  description = "ID of the CareerPilot VPC"
  value       = aws_vpc.main.id
}

output "public_subnet_ids" {
  description = "IDs of the public subnets"
  value       = aws_subnet.public[*].id
}

output "private_app_subnet_ids" {
  description = "IDs of the private application subnets"
  value       = aws_subnet.private_app[*].id
}

output "private_data_subnet_ids" {
  description = "IDs of the private data subnets"
  value       = aws_subnet.private_data[*].id
}

output "ec2_instance_id" {
  description = "ID of the CareerPilot EC2 instance"
  value       = aws_instance.careerpilot_server.id
}

output "ec2_public_ip" {
  description = "Direct public IP of the EC2 instance"
  value       = aws_instance.careerpilot_server.public_ip
}

output "elastic_ip" {
  description = "Static Elastic IP allocated to CareerPilot (careerpilot.website)"
  value       = aws_eip.careerpilot_eip.public_ip
}

output "s3_bucket_name" {
  description = "S3 bucket for resume and report storage"
  value       = aws_s3_bucket.careerpilot_storage.id
}

output "rds_endpoint" {
  description = "PostgreSQL database endpoint"
  value       = var.enable_rds ? aws_db_instance.postgres[0].endpoint : "RDS Disabled (Cost Protection active)"
}
