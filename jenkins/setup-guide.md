# CareerPilot Jenkins Auto-Trigger Setup Guide

This guide details how to configure Jenkins to automatically trigger CI/CD builds on every git commit (`git push`) to your GitHub repository.

---

## ⚡ How the Auto-Trigger Works

In `Jenkinsfile`, the pipeline declares:
```groovy
triggers {
    githubPush()
    pollSCM('H/5 * * * *')
}
```

1. **`githubPush()`**: When you push code to GitHub, GitHub instantly sends an HTTP POST payload to Jenkins's `/github-webhook/` endpoint. Jenkins inspects the payload and starts the build immediately.
2. **`pollSCM('H/5 * * * *')`**: As a reliable fallback (e.g. if a webhook delivery times out or if Jenkins is on a private network), Jenkins polls GitHub every 5 minutes to detect any new commits.

---

## 🔧 Step-by-Step Setup in GitHub & Jenkins

### 1. Configure GitHub Webhook
1. Go to your GitHub repository: `https://github.com/mukundkhandelwal463/careerpilot` (or your repo URL).
2. Click **Settings** > **Webhooks** > **Add webhook**.
3. **Payload URL**:
   ```
   http://<YOUR-JENKINS-SERVER-IP-OR-DOMAIN>:8080/github-webhook/
   ```
   *(Note the trailing slash `/` is required)*.
4. **Content type**: Select `application/json`.
5. **Which events would you like to trigger this webhook?**:
   - Select **"Just the push event"** (or "Let me select individual events" and choose Pushes and Pull Requests).
6. Check **Active** and click **Add webhook**.
7. GitHub will send a test ping with a green checkmark indicating successful connection.

---

### 2. Configure Jenkins Pipeline Job
1. Open Jenkins Dashboard (`http://localhost:8080` or your server).
2. Click **New Item** > Enter `CareerPilot-Pipeline` > Select **Pipeline** > Click **OK**.
3. Under **Build Triggers**:
   - Check **"GitHub hook trigger for GITScm polling"**.
   - (Optional) Check **"Poll SCM"** and enter `H/5 * * * *`.
4. Under **Pipeline**:
   - **Definition**: Select `Pipeline script from SCM`.
   - **SCM**: Select `Git`.
   - **Repository URL**: `https://github.com/mukundkhandelwal463/careerpilot.git`
   - **Branch Specifier**: `*/main`.
   - **Script Path**: `Jenkinsfile`.
5. Click **Save**.

---

### 3. Recommended Jenkins Plugins
Ensure these plugins are installed from **Manage Jenkins > Plugins**:
- **GitHub Integration Plugin** (for `githubPush()`)
- **Git Plugin**
- **Pipeline** (Workflow Aggregator)
- **Docker Pipeline** (for containerized builds)
