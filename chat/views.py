from django.contrib.auth import authenticate, login
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
# from django.contrib.auth import authenticate, login
from django.contrib.auth import authenticate, login, logout
from .models import ChatHistory



import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

def home(request):
    return render(request, 'index.html')

# def chat_page(request):
#     return render(request, 'chat.html')
def chat_page(request):
    history = ChatHistory.objects.filter(
        user=request.user
    ).order_by('created_at')

    return render(request, 'chat.html', {
        'history': history
    })
# def signup_page(request):
#     return render(request, 'signup.html')
def signup_page(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        password = request.POST.get('password')

        User.objects.create_user(
            username=email,
            email=email,
            password=password,
            first_name=name
        )

        return redirect('login')

    return render(request, 'signup.html')

# def login_page(request):
#     return render(request, 'login.html')
def login_page(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')

        user = authenticate(
            request,
            username=email,
            password=password
        )

        if user is not None:
            login(request, user)
            return redirect('chat')

    return render(request, 'login.html')
# Create your views here.
import json
from django.http import JsonResponse

@csrf_exempt
def ai_chat(request):
    if request.method == "POST":
        data = json.loads(request.body)
        message = data.get("message")

        response = client.models.generate_content(
            model="gemini-3.1-flash-lite-preview",
            contents=message
        )

        ChatHistory.objects.create(
            user=request.user,
            message=message,
            reply=response.text
        )

        return JsonResponse({
            "reply": response.text
        })

def logout_page(request):
    logout(request)
    return redirect('login')