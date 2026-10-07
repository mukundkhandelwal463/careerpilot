# ==============================================================================
# CareerPilot AWS S3 Bucket (Object Storage for Resumes & Reports)
# Reference: CareerPilot Project Synopsis Section 9 & Figure 9
# ==============================================================================

resource "random_id" "bucket_suffix" {
  byte_length = 4
}

resource "aws_s3_bucket" "careerpilot_storage" {
  bucket        = "careerpilot-storage-${random_id.bucket_suffix.hex}"
  force_destroy = false

  tags = {
    Name        = "careerpilot-storage"
    Environment = var.environment
  }
}

# Block public access to keep resumes private & DevSecOps compliant
resource "aws_s3_bucket_public_access_block" "storage_pab" {
  bucket = aws_s3_bucket.careerpilot_storage.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# Enable server-side encryption by default
resource "aws_s3_bucket_server_side_encryption_configuration" "storage_encryption" {
  bucket = aws_s3_bucket.careerpilot_storage.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

# Lifecycle rule to archive older generated reports
resource "aws_s3_bucket_lifecycle_configuration" "storage_lifecycle" {
  bucket = aws_s3_bucket.careerpilot_storage.id

  rule {
    id     = "expire-temporary-reports"
    status = "Enabled"

    expiration {
      days = 90
    }
  }
}
