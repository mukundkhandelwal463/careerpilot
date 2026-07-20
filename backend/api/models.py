from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone

class User(AbstractUser):
    username = models.CharField(max_length=150, unique=True, blank=True, null=True)
    email = models.EmailField(unique=True, db_index=True)
    full_name = models.CharField(max_length=120)
    mobile = models.CharField(max_length=20, blank=True, null=True)
    is_verified = models.BooleanField(default=False)
    interview_score = models.FloatField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['full_name']

    def to_dict(self):
        return {
            "id": self.id,
            "full_name": self.full_name,
            "email": self.email,
            "mobile": self.mobile,
            "is_verified": self.is_verified,
            "interview_score": self.interview_score,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }


class OTP(models.Model):
    email = models.CharField(max_length=200, db_index=True)
    code = models.CharField(max_length=10)
    purpose = models.CharField(max_length=50, default="registration")
    created_at = models.DateTimeField(auto_now_add=True)

    @property
    def is_expired(self):
        now = timezone.now()
        delta = now - self.created_at
        return delta.total_seconds() > 600


class Resume(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="resumes")
    title = models.CharField(max_length=200, default="Untitled Resume")
    resume_json = models.TextField(blank=True, null=True)
    resume_text = models.TextField(blank=True, null=True)
    ats_score = models.FloatField(blank=True, null=True)
    category = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "title": self.title,
            "resume_json": self.resume_json,
            "resume_text": self.resume_text,
            "ats_score": self.ats_score,
            "category": self.category,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }

class MockInterview(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="mock_interviews")
    resume = models.ForeignKey(Resume, on_delete=models.SET_NULL, null=True, blank=True)
    score = models.FloatField(null=True, blank=True)
    transcript = models.JSONField(default=list, blank=True)
    feedback = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

class PreparationTask(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="prep_tasks")
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    is_completed = models.BooleanField(default=False)
    scheduled_for = models.DateField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class CareerMap(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="career_map")
    target_role = models.CharField(max_length=150)
    roadmap_json = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class MockTestAttempt(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="mock_test_attempts")
    difficulty = models.CharField(max_length=50)
    score = models.FloatField(default=0.0)
    max_score = models.FloatField(default=200.0)
    technical_score = models.FloatField(default=0.0)
    verbal_score = models.FloatField(default=0.0)
    aptitude_score = models.FloatField(default=0.0)
    coding_easy_score = models.FloatField(default=0.0)
    coding_hard_score = models.FloatField(default=0.0)
    details = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
