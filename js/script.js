// API Configuration (hidden from UI as requested)
const API_CONFIG = {
    gemini: {
        key: "AIzaSyCgVHwOXu7aWDlh5AI7UlbzR5JAeGsJuL4",
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent"
    },
    openai: {
        key: "your-openai-key-here", // Easy to change as requested
        url: "https://api.openai.com/v1/chat/completions"
    }
};

// Current active API
const ACTIVE_API = "gemini"; // Change to "openai" to switch APIs

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type === 'error' ? 'error' : ''}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        ${message}
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Call AI API
async function callAIAPI(prompt) {
    if (ACTIVE_API === "gemini") {
        return callGeminiAPI(prompt);
    } else {
        return callOpenAIAPI(prompt);
    }
}

// Call Gemini API
async function callGeminiAPI(prompt) {
    const url = `${API_CONFIG.gemini.url}?key=${API_CONFIG.gemini.key}`;
    
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            contents: [{
                parts: [{
                    text: prompt
                }]
            }]
        })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to generate content');
    }
    
    return data.candidates[0].content.parts[0].text;
}

// Call OpenAI API (example implementation)
async function callOpenAIAPI(prompt) {
    // This is just a placeholder implementation
    // You would need to implement the actual OpenAI API call
    throw new Error("OpenAI API not implemented in this example");
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/service-worker.js')
      .then(function(registration) {
        console.log('ServiceWorker registration successful');
      }, function(err) {
        console.log('ServiceWorker registration failed: ', err);
      });
  });
}