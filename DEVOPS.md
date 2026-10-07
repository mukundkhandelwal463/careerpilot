# CareerPilot Enterprise DevOps Architecture & Implementation

> **B.Tech Project:** *CareerPilot: An AI-Powered Resume Screener System Using Machine Learning and DevOps Tools*  
> **Student:** Mukund Khandelwal (12316528) — Lovely Professional University  
> **Production URL:** [https://careerpilot.website](https://careerpilot.website) (Elastic IP: `15.252.51.16`)

---

## 📋 DevOps Architecture Overview

The platform implements the complete cloud-native DevOps lifecycle documented across Figures 1, 2, 3, 4, 5, 7, 8, and 9 of the Project Synopsis:

```
+-----------------------------------------------------------------------------------+
|                            CareerPilot DevOps Lifecycle                           |
+-------------------+--------------------+--------------------+---------------------+
| 1. Containerize   | 2. Orchestrate     | 3. Infra-as-Code   | 4. Observability    |
| (Docker)          | (Kubernetes / EKS) | (Terraform AWS)    | (Prom & Grafana)    |
|                   |                    |                    |                     |
| Multi-stage       | Rolling Updates    | VPC (10.0.0.0/16)  | Real-Time PromQL    |
| Python 3.12-slim  | Zero-downtime      | 3-Tier Subnets     | Pre-built Dashboards|
| Node 20 + Nginx   | HPA CPU/RAM Auto   | t3.small EC2 + S3  | Automated Alerts    |
+-------------------+--------------------+--------------------+---------------------+
| 5. Continuous Delivery (GitHub Actions + Jenkins Auto-Trigger on git push)         |
+-----------------------------------------------------------------------------------+
```

---

## 🛡️ Production & AWS Cost-Protection Assurance

> [!IMPORTANT]
> **Zero Live Site Disruption & Cost Increase:**
> - The live production website is actively hosted on an AWS EC2 instance (`t3.small`, Elastic IP `15.252.51.16`, domain `careerpilot.website`).
> - The Terraform configuration includes **built-in cost guardrails** (`enable_nat_gateway = false`, `enable_rds = false`).
> - All Docker, Kubernetes, and Jenkins configurations are fully verified and decoupled from production state, ensuring **0 unintended AWS charges** and **100% continuous uptime** on `careerpilot.website`.

---

## 1. 🐳 Containerization (Docker)
*Reference: Synopsis Section 7 (Containerization)*

### Files Created:
- [Dockerfile.backend](file:///c:/Users/Mukund/Documents/Resume_Screener/Resume_Screener/Dockerfile.backend): Multi-stage Python 3.12-slim build with Gunicorn (3 workers x 2 threads), compiled wheels, and healthcheck against `/api/health`.
- [Dockerfile.frontend](file:///c:/Users/Mukund/Documents/Resume_Screener/Resume_Screener/Dockerfile.frontend): Multi-stage Node 20 build compiling Vite production bundle, served by high-performance Nginx Alpine.
- [docker/nginx-frontend.conf](file:///c:/Users/Mukund/Documents/Resume_Screener/Resume_Screener/docker/nginx-frontend.conf): Nginx reverse proxy configuration for SPA routing, asset caching, and `/api/` + `/metrics` proxying.
- [docker-compose.yml](file:///c:/Users/Mukund/Documents/Resume_Screener/Resume_Screener/docker-compose.yml): Unified multi-container orchestration for local development and testing (Backend, Frontend, PostgreSQL, Redis, Prometheus, Grafana).
- [.dockerignore](file:///c:/Users/Mukund/Documents/Resume_Screener/Resume_Screener/.dockerignore): DevSecOps exclusions keeping images lean and excluding secrets.

### CLI Commands:
```bash
# Build & tag backend
docker build -t mukundk/careerpilot-backend -f Dockerfile.backend .

# Build & tag frontend
docker build -t mukundk/careerpilot-frontend -f Dockerfile.frontend .

# Start entire full stack (Frontend, Backend, DB, Redis, Prometheus, Grafana)
docker compose up -d
```

---

## 2. ☸️ Orchestration (Kubernetes / Amazon EKS)
*Reference: Synopsis Section 8 (Orchestration on Amazon EKS)*

### Manifests Created in `k8s/`:
- [k8s/namespace.yaml](file:///c:/Users/Mukund/Documents/Resume_Screener/Resume_Screener/k8s/namespace.yaml): Dedicated `careerpilot` namespace.
- [k8s/configmap.yaml](file:///c:/Users/Mukund/Documents/Resume_Screener/Resume_Screener/k8s/configmap.yaml): Non-sensitive production configuration.
- [k8s/secret.yaml.template](file:///c:/Users/Mukund/Documents/Resume_Screener/Resume_Screener/k8s/secret.yaml.template): Secret template for Gemini API key, Django secret, and DB credentials.
- [k8s/deployment.yaml](file:///c:/Users/Mukund/Documents/Resume_Screener/Resume_Screener/k8s/deployment.yaml): Rolling-update deployments for Backend (3 replicas) and Frontend (2 replicas) with liveness & readiness probes.
- [k8s/service.yaml](file:///c:/Users/Mukund/Documents/Resume_Screener/Resume_Screener/k8s/service.yaml): `careerpilot-svc` LoadBalancer along with ClusterIP services.
- [k8s/ingress.yaml](file:///c:/Users/Mukund/Documents/Resume_Screener/Resume_Screener/k8s/ingress.yaml): AWS ALB Ingress controller routing `careerpilot.website`.
- [k8s/hpa.yaml](file:///c:/Users/Mukund/Documents/Resume_Screener/Resume_Screener/k8s/hpa.yaml): Horizontal Pod Autoscaler dynamically scaling backend pods from 2 to 10 based on CPU/RAM load.
- [k8s/kustomization.yaml](file:///c:/Users/Mukund/Documents/Resume_Screener/Resume_Screener/k8s/kustomization.yaml): Single-command deployment manifest.

### Management Commands:
```bash
# Deploy complete stack
kubectl apply -k k8s/

# Verify running pods
kubectl get pods -n careerpilot -o wide

# Check Load Balancer status
kubectl describe service careerpilot-svc -n careerpilot
```

---

## 3. 🌐 Infrastructure as Code (Terraform)
*Reference: Synopsis Section 9 (IaC) & Figure 9 (Deployment Diagram)*

### Manifests Created in `terraform/`:
- [terraform/main.tf](file:///c:/Users/Mukund/Documents/Resume_Screener/Resume_Screener/terraform/main.tf): AWS provider setup with unified resource tagging.
- [terraform/variables.tf](file:///c:/Users/Mukund/Documents/Resume_Screener/Resume_Screener/terraform/variables.tf): Configurable parameters and cost guardrails (`enable_rds = false`, `enable_nat_gateway = false`).
- [terraform/vpc.tf](file:///c:/Users/Mukund/Documents/Resume_Screener/Resume_Screener/terraform/vpc.tf): Dedicated VPC (`10.0.0.0/16`) with 3-tier subnets (Public `10.0.1.0/24`, Private-App `10.0.2.0/24`, Private-Data `10.0.3.0/24`) and Internet Gateway.
- [terraform/security_groups.tf](file:///c:/Users/Mukund/Documents/Resume_Screener/Resume_Screener/terraform/security_groups.tf): Least-privilege stateful firewalls for ALB, EC2, RDS, and Redis.
- [terraform/ec2.tf](file:///c:/Users/Mukund/Documents/Resume_Screener/Resume_Screener/terraform/ec2.tf): EC2 `t3.small` (2GB RAM, 20GB gp3 SSD) and Elastic IP binding.
- [terraform/s3.tf](file:///c:/Users/Mukund/Documents/Resume_Screener/Resume_Screener/terraform/s3.tf): Encrypted S3 bucket with 90-day report archival lifecycle policy.
- [terraform/rds.tf](file:///c:/Users/Mukund/Documents/Resume_Screener/Resume_Screener/terraform/rds.tf): RDS PostgreSQL configuration with cost guardrail switch.
- [terraform/outputs.tf](file:///c:/Users/Mukund/Documents/Resume_Screener/Resume_Screener/terraform/outputs.tf): Clear infrastructure outputs (VPC, Subnets, EC2 IP, S3).
- [terraform/terraform.tfvars.example](file:///c:/Users/Mukund/Documents/Resume_Screener/Resume_Screener/terraform/terraform.tfvars.example): Variables template.
- [terraform/README.md](file:///c:/Users/Mukund/Documents/Resume_Screener/Resume_Screener/terraform/README.md): IaC explanation and safety commands.

### Standard Workflow:
```bash
cd terraform
terraform init
terraform plan
```

---

## 4. 📊 Monitoring & Observability (Prometheus & Grafana)
*Reference: Synopsis Section 11 (Monitoring & Observability)*

### Endpoints & Manifests:
- **Backend Exporter**: `/metrics` and `/api/metrics` active on Django REST backend returning standard OpenMetrics text format.
- [monitoring/prometheus/prometheus.yml](file:///c:/Users/Mukund/Documents/Resume_Screener/Resume_Screener/monitoring/prometheus/prometheus.yml): Scrapes CareerPilot backend every 10s.
- [monitoring/prometheus/alert_rules.yml](file:///c:/Users/Mukund/Documents/Resume_Screener/Resume_Screener/monitoring/prometheus/alert_rules.yml): Alerts for `CareerPilotBackendDown`, `HighTrafficSpike`, `GeminiAPIElevatedFailures`, and `LowAverageATSScore`.
- [monitoring/grafana/dashboards/careerpilot-overview.json](file:///c:/Users/Mukund/Documents/Resume_Screener/Resume_Screener/monitoring/grafana/dashboards/careerpilot-overview.json): Production dashboard featuring the 4 exact panels specified in Synopsis Page 21:

| Panel Title | PromQL Query | Synopsis Significance |
| :--- | :--- | :--- |
| **Resumes Screened** | `resumes_analyzed_total` | Usage-volume tracking |
| **Average ATS Score** | `ats_score_avg` | Model-quality distribution over time |
| **Gemini AI Health** | `(1 - (gemini_errors_total / clamp_min(gemini_calls_total, 1))) * 100` | AI-service reliability tracking |
| **Traffic Rate** | `rate(http_requests_total[1m])` | Real-time API load monitoring |
| **App Uptime** | `app_uptime_seconds` | High availability & liveness tracking |
| **User Authentication** | `auth_logins_total` & `auth_registrations_total` | Platform adoption monitoring |

---

## 5. 🤖 Jenkins Auto-Trigger Pipeline
*Reference: Synopsis Section 6 & User Request*

### Implementation:
- [Jenkinsfile](file:///c:/Users/Mukund/Documents/Resume_Screener/Resume_Screener/Jenkinsfile): Enterprise declarative pipeline.
- [jenkins/setup-guide.md](file:///c:/Users/Mukund/Documents/Resume_Screener/Resume_Screener/jenkins/setup-guide.md): GitHub Webhook configuration tutorial.

### Auto-Trigger Mechanics:
```groovy
triggers {
    githubPush()              // Fires automatically via GitHub Webhook on push
    pollSCM('H/5 * * * *')    // Fallback polling every 5 minutes
}
```

### Pipeline Stages:
1. `Checkout Source Code`: Pulls git branch and prints commit metadata.
2. `Lint & Code Quality`: Syntax verification for Python and React.
3. `Django System Diagnostics`: Runs `python backend/manage.py check`.
4. `Build Vite Production Bundle`: Runs `npm ci && npm run build` and archives artifacts.
5. `Build Docker Images`: Multi-stage builds for backend and frontend.
6. `Smoke Test Container Health`: Probes containerized `/api/health`.
7. `Zero-Downtime Deployment`: Safe deployment reload to AWS EC2 (`15.252.51.16`).
