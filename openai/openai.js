document.getElementById('summarize-button').addEventListener('click', function() {
    const inputText = document.getElementById('input-text').value;

    // Replace 'YOUR_API_KEY' with your OpenAI API key
    const apiKey = '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';

    fetch('https://api.openai.com/v1/engines/davinci/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            prompt: `Summarize the following text: ${inputText}`,
            max_tokens: 50, // Adjust the max tokens based on your desired summary length
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data && data.choices && data.choices[0] && data.choices[0].text) {
            const summary = data.choices[0].text;
            document.getElementById('summary').textContent = summary;
        } else {
            console.error('Unexpected API response format:', data);
        }
    })
    .catch(error => console.error(error));
});
