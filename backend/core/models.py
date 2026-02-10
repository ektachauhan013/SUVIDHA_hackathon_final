from django.db import models

# Create your models here.
# backend/core/models.py (should already exist)
from django.db import models

class Complaint(models.Model):
    STATUS_CHOICES = (
        ('PENDING', 'Pending'),
        ('IN_PROGRESS', 'In Progress'),
        ('RESOLVED', 'Resolved'),
    )

    name = models.CharField(max_length=100)
    mobile = models.CharField(max_length=15)
    issue_type = models.CharField(max_length=100)
    description = models.TextField()
    location = models.CharField(max_length=200, blank=True, null=True)
    file_name = models.CharField(max_length=255, blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} - {self.issue_type} ({self.status})"