# ==============================================================================
# CareerPilot AWS Infrastructure as Code (Terraform)
# Reference: CareerPilot Project Synopsis Section 9 (IaC) & Figure 9 (Deployment Diagram)
# ==============================================================================

terraform {
  required_version = ">= 1.5.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project     = "CareerPilot"
      Environment = var.environment
      ManagedBy   = "Terraform"
      Owner       = "Mukund Khandelwal"
    }
  }
}
