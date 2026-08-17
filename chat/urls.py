
from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    # path('chat/', views.chat_page, name='chat'),
    path('signup/', views.signup_page, name='signup'),
    path('login/', views.login_page, name='login'),
    path('chat/',views.chat_page, name='chat'),
    path('api/chat/', views.ai_chat, name='ai_chat'),
    path('logout/', views.logout_page, name='logout'),

]
