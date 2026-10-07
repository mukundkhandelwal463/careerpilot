# CareerPilot Infrastructure as Code (Terraform)

This directory contains the production AWS Infrastructure as Code for **CareerPilot**, structured according to Section 9 (*Infrastructure as Code*) and Figure 9 (*Deployment Diagram*) of the B.Tech Project Synopsis.

---

## 🛡️ Production & Cost Safety Rules (Strictly Enforced)

> [!IMPORTANT]
> The active production system is running on AWS EC2 (`15.252.51.16` / `careerpilot.website`).
> To prevent accidental cloud billing and guarantee zero disruption to the live application:
> 1. **Dry-Run Safe (`terraform plan`)**: Always test using `terraform plan`.
> 2. **Default Cost Guardrails**: Expensive managed services such as AWS NAT Gateways (~$32/mo) and AWS RDS Multi-AZ are set to `false` by default (`enable_nat_gateway = false`, `enable_rds = false`).
> 3. **Never run `terraform apply` against production** unless you intend to provision a separate, dedicated staging VPC.

---

## 🏗️ Architecture Mapped to Project Synopsis

| Synopsis Resource | Terraform File | Configuration Details |
| :--- | :--- | :--- |
| **VPC (10.0.0.0/16)** | `vpc.tf` | Dedicated CIDR block with DNS hostnames and support enabled |
| **3-Tier Subnets** | `vpc.tf` | Public (`10.0.1.0/24`), Private App (`10.0.2.0/24`), Private Data (`10.0.3.0/24`) |
| **Security Groups** | `security_groups.tf` | Scoped firewalls for ALB (80/443), EC2 (22/80/8000/9090/3000), RDS (5432), Redis (6379) |
| **EC2 Instance** | `ec2.tf` | `t3.small` (2GB RAM, 20GB gp3 SSD), Ubuntu 24.04 LTS, User-Data boostrap |
| **Elastic IP** | `ec2.tf` | Static Elastic IP binding matching `15.252.51.16` |
| **S3 Storage** | `s3.tf` | Encrypted private bucket with 90-day report archival lifecycle rules |
| **RDS PostgreSQL** | `rds.tf` | Isolated database in private data subnets with cost-guardrail toggle |

---

## 🚀 Standard Workflow Commands (Synopsis Page 19)

```bash
# 1. Initialize Terraform and download AWS provider plugins
terraform init

# 2. Preview the infrastructure change set without creating resources
terraform plan

# 3. (Optional / Staging only) Apply infrastructure
# terraform apply
```
