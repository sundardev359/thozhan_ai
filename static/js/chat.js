//Thozhan AI - Chat Page JavaScript
//   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
//  ThemeManager.init();
  initChat();
  initSidebar();
  initSettings();
  initProfile();
  initMobileMenu();
});

/* ---------- Chat State ---------- */
const chatState = {
  messages: [],
  chatHistory: [],
  activeChat: null,
  isTyping: false,
  language: 'en'
};

/* ---------- Sample Responses ---------- */
const aiResponses = {
  en: [
    "That's a great question! Let me help you with that.",
    "I appreciate you sharing that with me. Here's what I think...",
    "Interesting! I'd be happy to discuss this further with you.",
    "Thanks for asking! I'm here to help whenever you need.",
    "I understand. Let me provide some insights on this.",
    "That's wonderful! Keep exploring and learning.",
    "I'm always here to chat and help you out!",
    "Great point! Let me elaborate on that for you."
  ],
  ta: [
    "\u0BB8\u0BC1\u0B9F\u0BBF \u0B95\u0BC7\u0BB4\u0BCD\u0BB5\u0BC1! \u0B89\u0B99\u0BCD\u0BB4\u0B95\u0BCD \u0B89\u0BA4\u0BB5\u0BBF\u0BB5\u0BC1 \u0BB8\u0BB9\u0BBE\u0BAF\u0BCD\u0BAE\u0BCD.",
    "\u0B8E\u0BB2\u0BCD\u0BB2\u0BBE\u0BB5\u0BC1\u0B95\u0BCD \u0B9A\u0BC6\u0BA9\u0BCD\u0BAE\u0BC8 \u0BAA\u0B95\u0BBF\u0BB0\u0BCD\u0BAA\u0BCD\u0BA4\u0BC1 \u0B95\u0BB3\u0BCD\u0BB5\u0BBF.",
    "\u0B9A\u0BBF\u0BA8\u0BCD\u0BA4\u0BBE\u0B9A\u0BBF \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0BB4\u0BBF\u0BA9\u0BCD\u0BA4\u0BC1. \u0B87\u0BA4\u0BC8 \u0BAA\u0BB1\u0BCD\u0BB1\u0BC1 \u0BAA\u0BC7\u0BB4\u0BBE\u0BAE\u0BCD.",
    "\u0BA8\u0BBF\u0BA9\u0BCD\u0BA9\u0BBE\u0BB5\u0BC1\u0B95\u0BCD \u0B95\u0BC7\u0B9F\u0BCD\u0B95\u0BBF\u0BB0\u0BCD\u0BAA\u0BCD\u0BA4\u0BC1! \u0B87\u0BA4\u0BB5\u0BB0\u0BCD \u0B89\u0B99\u0BCD\u0BB4\u0B95\u0BCD \u0BB8\u0B95\u0BBE\u0B9A\u0BA4\u0BB5\u0BBF\u0BB5\u0BC1 \u0B9A\u0BC6\u0BA9\u0BCD\u0BAE\u0BCD.",
    "\u0B8E\u0BB2\u0BCD\u0BB2\u0BBE\u0BCD\u0BAA\u0BBF\u0B9F\u0BCD\u0B9F\u0BB5\u0BBF\u0BB0\u0BCD\u0BA4\u0BCD\u0B95\u0BBE\u0BA9\u0BCD \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0BB4\u0BBF\u0BA9\u0BCD\u0BA4\u0BC1. \u0B87\u0BA4\u0BB5\u0BB0\u0BCD \u0B9A\u0BBF\u0BB2 \u0BB5\u0BBF\u0BB0\u0BCD\u0BA4\u0BCD\u0BA4\u0B95\u0B95\u0BCD\u0B95\u0BC1\u0BB5\u0BBF\u0BB0\u0BCD.",
    "\u0BAE\u0BBF\u0B95\u0BB5 \u0BA8\u0BBF\u0B9A\u0BCD\u0B9A\u0BB0\u0BBF\u0BAF\u0BBF\u0BB0\u0BCD\u0B95\u0BCD \u0B89\u0BB0\u0BCD\u0BA8\u0BCD\u0B9F\u0BC1\u0B95\u0BBF\u0BB0\u0BCD\u0BA4\u0BBF \u0B9A\u0BC6\u0BA9\u0BCD\u0BAE\u0BCD!",
    "\u0B8E\u0BB2\u0BCD\u0BB2\u0BBE\u0BCB\u0BAE\u0BCD \u0B89\u0B99\u0BCD\u0BB4\u0B95\u0BCD \u0B9A\u0B9A\u0BB2\u0BB5\u0BBE\u0B95 \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0BB4\u0BBF\u0BB0\u0BCD\u0BAA\u0BCD\u0BA4\u0BC1!",
    "\u0BAE\u0BBF\u0B95\u0BCD\u0BAE\u0BBF\u0B9F\u0BCD \u0BAE\u0BBE\u0BA1\u0BBF\u0B9F\u0BCD\u0BA4\u0BCD\u0BA9\u0BBE\u0BA9\u0BCD \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0BB4\u0BBF\u0BA9\u0BCD\u0BA4\u0BC1. \u0B87\u0BA4\u0BB5\u0BB0\u0BCD \u0BB5\u0BBF\u0BB0\u0BCD\u0BA4\u0BCD\u0B95\u0BBE\u0BA9\u0BBE\u0B95 \u0BAA\u0BC7\u0BB4\u0BBF\u0BB0\u0BCD\u0BA4\u0BC1."
  ]
};

const welcomeMessages = {
  en: "Vanakkam! I'm Thozhan AI. I'm here to chat, motivate you, and help you whenever you need.",
  ta: "\u0BB5\u0BA3\u0B95\u0BCD\u0B95\u0BAA\u0BCD! \u0BA8\u0BBE\u0BA9\u0BCD \u0BA4\u0BCB\u0B9D\u0BA9\u0BCD AI. \u0B9A\u0B9A\u0BB2\u0BB5\u0BBE\u0B95, \u0B89\u0BA4\u0BCD\u0BA4\u0BBE\u0BB5\u0BBF\u0B9F\u0BAA\u0BCD\u0BAA\u0BBF\u0B9F\u0BB2\u0BBE\u0B95, \u0B89\u0B99\u0BCD\u0BB4\u0B95\u0BCD \u0B89\u0BA4\u0BB5\u0BBF\u0BB5\u0BC1 \u0BB8\u0B95\u0BBE\u0B9A\u0BA4\u0BB5\u0BBF\u0BB5\u0BC1 \u0B9A\u0BC6\u0BA9\u0BCD\u0BAE\u0BCD."
};

/* ---------- Init Chat ---------- */
function initChat() {
  loadChatHistory();
  renderChatHistory();
//  showWelcome();

  const chatInput = document.getElementById('chatInput');
  const sendBtn = document.getElementById('sendBtn');

  if (chatInput) {
    chatInput.addEventListener('input', autoResize);
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });
  }

  if (sendBtn) {
    sendBtn.addEventListener('click', sendMessage);
  }

  document.querySelectorAll('.suggestion-card').forEach(card => {
    card.addEventListener('click', () => {
      const text = card.querySelector('h4').textContent;
      if (chatInput) chatInput.value = text;
      sendMessage();
    });
  });
}

/* ---------- Sidebar ---------- */
function initSidebar() {
  const newChatBtn = document.getElementById('newChatBtn');
  if (newChatBtn) {
    newChatBtn.addEventListener('click', startNewChat);
  }

  const searchInput = document.getElementById('chatSearch');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      filterChats(e.target.value);
    });
  }
}

function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.sidebar-overlay');
  sidebar.classList.toggle('open');
  overlay.classList.toggle('active');
}

//function startNewChat() {
//  chatState.messages = [];
//  chatState.activeChat = null;
//  renderMessages();
//  showWelcome();
//
//  document.querySelectorAll('.chat-history-item').forEach(item => {
//    item.classList.remove('active');
//  });
//
//  const sidebar = document.querySelector('.sidebar');
//  if (sidebar.classList.contains('open')) {
//    toggleSidebar();
//  }
//}
function startNewChat() {
    // Old/current chat messages clear
    chatState.messages = [];
    chatState.activeChat = null;

    // Clear messages from screen
    const messagesContainer = document.getElementById('chatMessages');
    if (messagesContainer) {
        messagesContainer.innerHTML = '';
    }

    // Clear input
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.value = '';
    }

    // Show welcome screen
    showWelcome();

    // Remove active chat selection
    document.querySelectorAll('.chat-history-item').forEach(item => {
        item.classList.remove('active');
    });

    // Close sidebar only on mobile
    const sidebar = document.querySelector('.sidebar');
    if (sidebar && sidebar.classList.contains('open')) {
        toggleSidebar();
    }
}

function filterChats(query) {
  const items = document.querySelectorAll('.chat-history-item');
  const lowerQuery = query.toLowerCase();
  items.forEach(item => {
    const title = item.querySelector('.chat-history-title').textContent.toLowerCase();
    item.style.display = title.includes(lowerQuery) ? '' : 'none';
  });
}

/* ---------- Messages ---------- */
function showWelcome() {
  const welcome = document.getElementById('chatWelcome');
  const messagesContainer = document.getElementById('chatMessages');
  if (welcome) welcome.style.display = 'flex';
  if (messagesContainer) messagesContainer.style.display = 'none';
}

function hideWelcome() {
  const welcome = document.getElementById('chatWelcome');
  const messagesContainer = document.getElementById('chatMessages');
  if (welcome) welcome.style.display = 'none';
  if (messagesContainer) messagesContainer.style.display = 'flex';
}

function sendMessage() {
  const chatInput = document.getElementById('chatInput');
  const text = chatInput.value.trim();
  if (!text || chatState.isTyping) return;

  hideWelcome();

  const userMessage = {
    id: Date.now(),
    text: text,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    type: 'user'
  };

  chatState.messages.push(userMessage);
  appendMessage(userMessage);
  chatInput.value = '';
  chatInput.style.height = 'auto';

  showTypingIndicator();

//  const delay = 800 + Math.random() * 1200;
//  setTimeout(() => {
//    hideTypingIndicator();
//    const responses = aiResponses[chatState.language] || aiResponses.en;
//    const aiMessage = {
//      id: Date.now(),
//      text: responses[Math.floor(Math.random() * responses.length)],
//      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//      type: 'ai'
//    };
//    chatState.messages.push(aiMessage);
//    appendMessage(aiMessage);
//  }, delay);
fetch('/api/chat/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        message: text
    })
})
.then(response => response.json())
.then(data => {
    hideTypingIndicator();

    const aiMessage = {
        id: Date.now(),
        text: data.reply,
        time: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        }),
        type: 'ai'
    };

    chatState.messages.push(aiMessage);
    appendMessage(aiMessage);
    // Save current chat
if (chatState.activeChat === null) {
    const newChat = {
        id: Date.now(),
        title: text.length > 30 ? text.substring(0, 30) + '...' : text,
        messages: [...chatState.messages],
        time: 'Today',
        pinned: false
    };

    chatState.chatHistory.unshift(newChat);
    chatState.activeChat = newChat.id;
} else {
    const currentChat = chatState.chatHistory.find(
        chat => chat.id === chatState.activeChat
    );

    if (currentChat) {
        currentChat.messages = [...chatState.messages];
    }
}

localStorage.setItem(
    'thozhan-chats',
    JSON.stringify(chatState.chatHistory)
);

renderChatHistory();

})
.catch(error => {
    hideTypingIndicator();
    console.error(error);
});
}

function appendMessage(msg) {
  const container = document.getElementById('chatMessages');
  if (!container) return;

  const div = document.createElement('div');
  div.className = `message ${msg.type}`;
  div.innerHTML = `
    <div class="message-avatar">${msg.type === 'ai' ? 'T' : '\u{1F464}'}</div>
    <div class="message-content">
      <div class="message-bubble">${escapeHtml(msg.text)}</div>
      <span class="message-time">${msg.time}</span>
    </div>
  `;

  container.appendChild(div);
  scrollToBottom();
}

function renderMessages() {
  const container = document.getElementById('chatMessages');
  if (!container) return;
//  container.innerHTML = '';
  chatState.messages.forEach(msg => appendMessage(msg));
}

function showTypingIndicator() {
  chatState.isTyping = true;
  const indicator = document.getElementById('typingIndicator');
  if (indicator) indicator.classList.add('visible');
  scrollToBottom();
}

function hideTypingIndicator() {
  chatState.isTyping = false;
  const indicator = document.getElementById('typingIndicator');
  if (indicator) indicator.classList.remove('visible');
}

function scrollToBottom() {
  const container = document.getElementById('chatMessages');
  if (container) {
    setTimeout(() => {
      container.scrollTop = container.scrollHeight;
    }, 50);
  }
}

function autoResize() {
  this.style.height = 'auto';
  this.style.height = Math.min(this.scrollHeight, 150) + 'px';
}

/* ---------- Chat History ---------- */
function loadChatHistory() {
  const saved = localStorage.getItem('thozhan-chats');
  if (saved) {
    chatState.chatHistory = JSON.parse(saved);
  } else {
    chatState.chatHistory = [
      { id: 1, title: 'Motivation tips for today', time: 'Today', pinned: true },
      { id: 2, title: 'Learn Python basics', time: 'Today', pinned: false },
      { id: 3, title: 'Healthy lifestyle advice', time: 'Yesterday', pinned: false },
      { id: 4, title: 'Interview preparation', time: 'Yesterday', pinned: false },
      { id: 5, title: 'Travel recommendations', time: 'Last 7 Days', pinned: false },
      { id: 6, title: 'Recipe suggestions', time: 'Last 7 Days', pinned: false },
      { id: 7, title: 'Career guidance', time: 'Older', pinned: false },
      { id: 8, title: 'Book recommendations', time: 'Older', pinned: true }
    ];
  }
}

function renderChatHistory() {
  const container = document.getElementById('chatHistoryList');
  if (!container) return;

  const groups = {
    'Pinned': [],
    'Today': [],
    'Yesterday': [],
    'Last 7 Days': [],
    'Older': []
  };

  chatState.chatHistory.sort((a, b) => b.pinned - a.pinned);

  chatState.chatHistory.forEach(chat => {
    const timeGroup = chat.time;
    if (groups[timeGroup]) {
      groups[timeGroup].push(chat);
    }
  });

  container.innerHTML = '';

  Object.entries(groups).forEach(([label, chats]) => {
    if (chats.length === 0) return;
    const groupDiv = document.createElement('div');
    groupDiv.className = 'chat-group';
    groupDiv.innerHTML = `<div class="chat-group-label">${label}</div>`;

    chats.forEach(chat => {
      const item = document.createElement('div');
      item.className = `chat-history-item${chatState.activeChat === chat.id ? ' active' : ''}`;
      item.innerHTML = `
        <span class="chat-history-icon">\u{1F4AC}</span>
        <span class="chat-history-title">${escapeHtml(chat.title)}</span>
        ${chat.pinned ? '<span class="pinned-icon">\u{1F4CC}</span>' : ''}
        <div class="chat-history-actions">
          <button class="chat-history-action pin" title="Pin" onclick="event.stopPropagation(); togglePin(${chat.id})">\u{1F4CC}</button>
          <button class="chat-history-action delete" title="Delete" onclick="event.stopPropagation(); deleteChat(${chat.id})">\u{1F5D1}</button>
        </div>
      `;
      item.addEventListener('click', () => loadChat(chat.id));
      groupDiv.appendChild(item);
    });

    container.appendChild(groupDiv);
  });
}

function loadChat(id) {
  chatState.activeChat = id;
  const chat = chatState.chatHistory.find(c => c.id === id);
  if (chat) {
    chatState.messages = chat.messages || [];
//      { id: 1, text: chat.title, time: '10:00 AM', type: 'user' },
//      { id: 2, text: "I'd be happy to help you with that! Let me share some thoughts.", time: '10:00 AM', type: 'ai' }
//    ];
    hideWelcome();
    renderMessages();
  }
  renderChatHistory();
  const sidebar = document.querySelector('.sidebar');
  if (sidebar.classList.contains('open')) toggleSidebar();
}

function deleteChat(id) {
  chatState.chatHistory = chatState.chatHistory.filter(c => c.id !== id);
  localStorage.setItem('thozhan-chats', JSON.stringify(chatState.chatHistory));
  renderChatHistory();
  if (chatState.activeChat === id) startNewChat();
  showToast('Chat deleted', 'success');
}

function togglePin(id) {
  const chat = chatState.chatHistory.find(c => c.id === id);
  if (chat) {
    chat.pinned = !chat.pinned;
    localStorage.setItem('thozhan-chats', JSON.stringify(chatState.chatHistory));
    renderChatHistory();
    showToast(chat.pinned ? 'Chat pinned' : 'Chat unpinned', 'success');
  }
}

/* ---------- Settings ---------- */
function initSettings() {
  const settingsBtn = document.getElementById('settingsBtn');
  const settingsClose = document.getElementById('settingsClose');
  const settingsPanel = document.getElementById('settingsPanel');
  const settingsOverlay = document.getElementById('settingsOverlay');

  if (settingsBtn) settingsBtn.addEventListener('click', () => settingsPanel.classList.add('open'));
  if (settingsClose) settingsClose.addEventListener('click', () => settingsPanel.classList.remove('open'));
  if (settingsOverlay) settingsOverlay.addEventListener('click', () => settingsPanel.classList.remove('open'));

  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.addEventListener('change', (e) => {
      chatState.language = e.target.checked ? 'ta' : 'en';
      showToast(chatState.language === 'ta' ? '\u0BA4\u0BAE\u0BBF\u0BB4\u0BCD \u0B9A\u0BC6\u0BAF\u0BCD\u0BB5\u0BAE\u0BCD' : 'Language changed to English', 'success');
    });
  }

  const clearHistoryBtn = document.getElementById('clearHistoryBtn');
  if (clearHistoryBtn) {
    clearHistoryBtn.addEventListener('click', () => {
      chatState.chatHistory = [];
      localStorage.removeItem('thozhan-chats');
      renderChatHistory();
      showToast('Chat history cleared', 'success');
      settingsPanel.classList.remove('open');
    });
  }

  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      showToast('Logged out successfully', 'success');
      setTimeout(() => {
        window.location.href = '/logout/';
      }, 1000);
    });
  }
}

/* ---------- Profile ---------- */
function initProfile() {
  const profileBtn = document.getElementById('profileBtn');
  const profileClose = document.getElementById('profileClose');
  const profilePanel = document.getElementById('profilePanel');
  const profileOverlay = document.getElementById('profileOverlay');

  if (profileBtn) profileBtn.addEventListener('click', () => profilePanel.classList.add('open'));
  if (profileClose) profileClose.addEventListener('click', () => profilePanel.classList.remove('open'));
  if (profileOverlay) profileOverlay.addEventListener('click', () => profilePanel.classList.remove('open'));
}

/* ---------- Mobile Menu ---------- */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const overlay = document.querySelector('.sidebar-overlay');

  if (menuBtn) menuBtn.addEventListener('click', toggleSidebar);
  if (overlay) overlay.addEventListener('click', toggleSidebar);
}

/* ---------- Utility ---------- */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function showToast(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const icons = { success: '\u2713', error: '\u2717', warning: '\u26A0' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span class="toast-icon">${icons[type]}</span>
    <span class="toast-message">${message}</span>
    <button class="toast-close" onclick="this.parentElement.remove()">\u2715</button>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(40px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
