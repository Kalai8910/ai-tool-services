const API_KEY = "AIzaSyAO88mt5cwGoCB1bCD14IH1VEPMPNRh0xg"

async function generate() {
    const service = document.getElementById('serviceSelect').value;
    const userInput = document.getElementById('userInput').value;
    
    if (!userInput) {
        alert("Please describe what you need!");
        return;
    }
    
    // Show loading
    document.getElementById('loading').style.display = 'block';
    document.getElementById('output').innerHTML = '';
    
    // AI Prompt for each service
    const prompts = {
        "logo_design": `Create a logo design description for: ${userInput}. Give color scheme, style, and elements details.`,
        "resume_writing": `Write a professional resume for: ${userInput}. Include summary, skills, experience sections.`,
        "video_script": `Write a 60-second video script about: ${userInput}. Include hook, body, call to action.`,
        "songwriting": `Write song lyrics about: ${userInput}. Include verse, chorus, bridge.`
    };
    
    const prompt = prompts[service] || `Create professional content about: ${userInput}`;
    
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: prompt }]
                }]
            })
        });
        
        const data = await response.json();
        const result = data.candidates[0].content.parts[0].text;
        document.getElementById('output').innerHTML = result;
        
    } catch (error) {
        document.getElementById('output').innerHTML = '❌ Error: ' + error.message;
    }
    
    document.getElementById('loading').style.display = 'none';
}