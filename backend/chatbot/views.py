from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .serves import TogetherAIClient
# Initialize the TogetherAI client
api_key = "aa040f50749ff637fe882040c40356a150a6d8bb0a74aac5dfbe895d13212658"  # Replace with your actual API key
client = TogetherAIClient(api_key)

@csrf_exempt
def send_message(request):
    if request.method == "POST":
        try:
            body_unicode = request.body.decode("utf-8").strip()

            if not body_unicode:
                return JsonResponse({"error": "Empty request body"}, status=400)

            print("📥 Raw Request Body:", body_unicode)

            try:
                data = json.loads(body_unicode)
            except json.JSONDecodeError:
                print("❌ JSON Decode Error: Invalid JSON format")
                return JsonResponse({"error": "Invalid JSON format"}, status=400)

            message = data.get("message")
            if not message:
                return JsonResponse({"error": "Message field is required"}, status=400)

            print("✅ Parsed Data:", data)

            # 🚨 Debugging: Log response from TogetherAIClient
            response = client.send_message(message)
            
            if not response:  # Check if response is empty
                print("❌ Error: TogetherAIClient returned an empty response")
                return JsonResponse({"error": "AI response is empty"}, status=500)

            print("🤖 AI Response:", response)  # Log the AI response
            return JsonResponse({"response": response})

        except Exception as e:
            print("🔥 Unexpected Error:", str(e))  # Log detailed error
            return JsonResponse({"error": f"Internal Server Error: {str(e)}"}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=405)

@csrf_exempt
def get_response(request, message_id):
    if request.method == "GET":
        response = client.get_response(message_id)
        return JsonResponse(response)
    
    return JsonResponse({"error": "Invalid request method"}, status=405)
