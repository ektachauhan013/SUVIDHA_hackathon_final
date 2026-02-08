from django.urls import path
from . import views
from .views import (                # ← from the same app
    complaint_list_create,          # your POST/GET list view
    get_complaint_detail            # ← add this
)

urlpatterns = [
    path('complaints/', views.complaint_list_create, name='complaint-list-create'),
    path('complaints/<int:id>/', get_complaint_detail, name='complaint-detail'),
]