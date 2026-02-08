# backend/core/serializers.py
from rest_framework import serializers
from .models import Complaint

class ComplaintSerializer(serializers.ModelSerializer):
    class Meta:
        model = Complaint
        fields = '__all__'  # or list all fields explicitly
        read_only_fields = ['id', 'status', 'created_at', 'updated_at']