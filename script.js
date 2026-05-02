const API_KEY = "AIzaSyDJpeiMlYPd8otqsEY9HGzPRr0gQwg0y40";

document.addEventListener('DOMContentLoaded', function() {
    const generateBtn = document.getElementById('generateBtn');
    if (generateBtn) {
        generateBtn.addEventListener('click', generate);
    }
});

async function generate() {
    const serviceSelect = document.getElementById('serviceSelect');
    const userInput = document.getElementById('userInput');
    const outputDiv = document.getElementById('output');
    const loadingDiv = document.getElementById('loading');
    
    if (!userInput.value.trim()) {
        outputDiv.innerHTML = "Please describe what you need.";
        return;
    }
    
    loadingDiv.style.display = 'block';
    outputDiv.innerHTML = '';
    
    let prompt = "";
    
    switch(serviceSelect.value) {
        case "logo_design":
            prompt = "Create a logo design for: " + userInput.value + ". Include color scheme, font style, and icon ideas.";
            break;
        case "resume_writing":
            prompt = "Write a professional resume for: " + userInput.value;
            break;
        case "video_script":
            prompt = "Write a 60 second video script about: " + userInput.value;
            break;
        default:
            prompt = "Create professional content about: " + userInput.value;
    }
    
    try {
        // FIXED: Using gemini-2.0-flash (currently supported)
        const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + API_KEY, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: prompt }]
                }]
            })
        });
        
        const data = await response.json();
        console.log("API Response:", data);
        
        if (data.candidates && data.candidates[0] && data.candidates[0].content) {
            outputDiv.innerHTML = data.candidates[0].content.parts[0].text;
        } else if (data.error) {
            outputDiv.innerHTML = "API Error: " + data.error.message;
        } else {
            outputDiv.innerHTML = "Error: Please check console for details.";
        }
        
    } catch (error) {
        console.error("Fetch Error:", error);
        outputDiv.innerHTML = "Error: " + error.message;
    }
    
    loadingDiv.style.display = 'none';
}
