// The module 'vscode' contains the VS Code extensibility API
const vscode = require('vscode');
const { Ollama } = require('ollama'); // Import Ollama

// Initialize Ollama
const ollama = new Ollama({ host: 'http://localhost:11434' }); // Default Ollama server URL

function activate(context) {
    const disposable = vscode.commands.registerCommand('local-llm-chat.helloWorld', () => {
        const panel = vscode.window.createWebviewPanel(
            'llmChat',
            'LLM Chat',
            vscode.ViewColumn.One,
            {
                enableScripts: true
            }
        );

        panel.webview.html = getWebviewContent();

        // Handle messages from the webview
        panel.webview.onDidReceiveMessage(
            async (message) => {
                switch (message.command) {
                    case 'sendPrompt':
                        const prompt = message.text;
                        try {
                            // Send the prompt to Ollama and get the response
                            const response = await getLLMResponse(prompt);
                            // Send the response back to the webview
                            panel.webview.postMessage({ command: 'receiveResponse', text: response });
                        } catch (error) {
                            console.error('Error fetching LLM response:', error);
                            panel.webview.postMessage({ command: 'receiveResponse', text: 'Error: Failed to fetch response from LLM.' });
                        }
                        break;
                }
            },
            undefined,
            context.subscriptions
        );
    });

    context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

// Function to get LLM response using Ollama
async function getLLMResponse(prompt) {
    const response = await ollama.generate({
        model: 'deepseek-r1:1.5b', // Specify the model you want to use (e.g., 'llama2', 'mistral', etc.)
        prompt: prompt,
    });
    return response.response; // Return the generated response
}

function getWebviewContent() {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>LLM Chat</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 10px;
                background-color: #1e1e1e;
                color: #ffffff;
            }
            #chat {
                height: 300px;
                overflow-y: auto;
                border: 1px solid #444;
                padding: 10px;
                margin-bottom: 10px;
                background-color: #252526;
            }
            #input {
                width: calc(100% - 80px);
                padding: 10px;
                border: 1px solid #444;
                background-color: #333;
                color: #fff;
            }
            #send {
                width: 60px;
                padding: 10px;
                background-color: #0e639c;
                color: #fff;
                border: none;
                cursor: pointer;
            }
            #send:hover {
                background-color: #1177bb;
            }
        </style>
    </head>
    <body>
        <div id="chat"></div>
        <input type="text" id="input" placeholder="Type your prompt here...">
        <button id="send">Send</button>

        <script>
            const vscode = acquireVsCodeApi();
            const chat = document.getElementById('chat');
            const input = document.getElementById('input');
            const sendButton = document.getElementById('send');

            // Handle sending the prompt
            sendButton.addEventListener('click', () => {
                const prompt = input.value;
                if (prompt) {
                    // Display the user's prompt in the chat
                    chat.innerHTML += '<div><strong>You:</strong> ' + prompt + '</div>';
                    input.value = '';
                    // Send the prompt to the extension
                    vscode.postMessage({ command: 'sendPrompt', text: prompt });
                }
            });

            // Handle receiving the response
            window.addEventListener('message', (event) => {
                const message = event.data;
                if (message.command === 'receiveResponse') {
                    // Display the response in the chat
                    chat.innerHTML += '<div><strong>LLM:</strong> ' + message.text + '</div>';
                    chat.scrollTop = chat.scrollHeight; // Auto-scroll to the bottom
                }
            });
        </script>
    </body>
    </html>
    `;
}

// Export the activate and deactivate functions
module.exports = {
    activate,
    deactivate
};