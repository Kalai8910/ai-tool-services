const API_KEY = "AIzaSyDJpeiMlYPd8otqsEY9HGzPRr0gQwg0y40";

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
            prompt = "Write a professional resume for: " + userInput.value + ". Include summary, skills, experience, and education.";
            break;
        case "video_script":
            prompt = "Write a 60 second video script about: " + userInput.value + ". Include hook, body, and call to action.";
            break;
        case "data_viz":
            prompt = "Explain how to visualize data about: " + userInput.value + ". Suggest chart types and tools.";
            break;
        case "songwriting":
            prompt = "Write song lyrics about: " + userInput.value + ". Include verse, chorus, and bridge.";
            break;
        case "podcast_script":
            prompt = "Write a podcast script about: " + userInput.value + ". Include intro, main discussion, and outro.";
            break;
        case "business_plan":
            prompt = "Create a business plan outline for: " + userInput.value + ". Include executive summary, market analysis, and financial plan.";
            break;
        case "market_research":
            prompt = "Conduct market research for: " + userInput.value + ". Analyze target audience, competitors, and trends.";
            break;
        case "seo_content":
            prompt = "Write SEO optimized content about: " + userInput.value + ". Include keywords, meta description, and headings.";
            break;
        case "email_copy":
            prompt = "Write a professional marketing email about: " + userInput.value + ". Include subject line, body, and call to action.";
            break;
        default:
            prompt = "Create professional content about: " + userInput.value;
    }
    
    try {
        const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + API_KEY, {
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
        
        if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
            outputDiv.innerHTML = data.candidates[0].content.parts[0].text;
        } else {
            outputDiv.innerHTML = "Error: Unable to generate response. Please check your API key.";
        }
        
    } catch (error) {
        outputDiv.innerHTML = "Error: " + error.message + ". Please try again.";
    }
    
    loadingDiv.style.display = 'none';
}