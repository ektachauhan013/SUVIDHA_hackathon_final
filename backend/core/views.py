# backend/core/views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Complaint
from .serializers import ComplaintSerializer

@api_view(['GET', 'POST'])
def complaint_list_create(request):
    if request.method == 'GET':
        # Optional: return count of existing complaints
        total = Complaint.objects.count()
        return Response({
            "message": "SUVIDHA Backend is LIVE! 🚀",
            "total_complaints": total,
            "instructions": "POST here to create a complaint"
        })

    if request.method == 'POST':
        serializer = ComplaintSerializer(data=request.data)
        
        if serializer.is_valid():
            # Save to database
            complaint = serializer.save()

            # Create real SMS simulation with actual ID
            sms_message = (
                f"Dear {complaint.name}, your complaint #{complaint.id} "
                f"for {complaint.issue_type} has been registered. "
                "We will keep you updated via SMS."
            )
            
            # Print to console (you can see it in terminal)
            print(f"[SMS SIMULATION] {sms_message}")

            # Prepare response with real saved data
            response_data = {
                "status": "Complaint registered successfully!",
                "complaint": serializer.data,  # includes real id, created_at, etc.
                "simulated_sms": sms_message
            }

            return Response(response_data, status=status.HTTP_201_CREATED)
        
        else:
            # Return validation errors
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
@api_view(['GET'])
def get_complaint_detail(request, id):
    try:
        complaint = Complaint.objects.get(id=id)
        serializer = ComplaintSerializer(complaint)
        return Response(serializer.data)
    except Complaint.DoesNotExist:
        return Response({"detail": "Complaint not found"}, status=status.HTTP_404_NOT_FOUND)