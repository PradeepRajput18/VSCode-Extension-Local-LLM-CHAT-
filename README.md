Inorder to have privacy , I would suggest to install Ollama , ( Using this link where you can find instructions https://ollama.com/library/deepseek-r1:1.5b)

I would suggest to change LLM in getLLMresponse in model if you are using different LLM,

If you are interested to add contribution to this project that would be helpful





# Local LLM Chat - VS Code Extension

Welcome to **Local LLM Chat**, a VS Code extension that allows you to interact with a local Large Language Model (LLM) directly within your editor. This extension leverages [Ollama](https://ollama.ai/) to provide seamless integration with LLMs like `llama2`, `mistral`, and custom models such as `deepseek-r1`.

---

## Features

- **Chat Interface**: A built-in chat interface within VS Code to interact with the LLM.
- **Local LLM Integration**: Connect to a locally running Ollama server to generate responses.
- **Customizable Models**: Use any Ollama-supported model (e.g., `llama2`, `mistral`, or custom models like `deepseek-r1`).
- **Real-Time Responses**: Get instant responses from the LLM without leaving your editor.

![Chat Interface](images/chat-interface.png)

---

## Requirements

To use this extension, you need the following:

1. **Ollama Installed**:
   - Download and install Ollama from [ollama.ai](https://ollama.ai/).
   - Start the Ollama server by running:
     ```bash
     ollama serve
     ```

2. **Pull a Model**:
   - Pull a model supported by Ollama (e.g., `llama2`):
     ```bash
     ollama pull llama2
     ```
   - For custom models like `deepseek-r1`, follow the instructions in the [Custom Models](#custom-models) section.

3. **Node.js**:
   - Ensure Node.js is installed on your machine. Download it from [nodejs.org](https://nodejs.org/).

---

## Installation

1. Open VS Code.
2. Go to the Extensions view by clicking on the Extensions icon in the Activity Bar on the side of the window or pressing `Ctrl+Shift+X`.
3. Search for `local-llm-chat` and install the extension.
4. Reload VS Code after installation.

---

## Usage

1. Open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on macOS).
2. Search for and select `Local LLM Chat: Start Chat`.
3. A chat interface will open in a new panel.
4. Type your prompt in the input field and press "Send" to get a response from the LLM.

---

## Extension Settings

This extension contributes the following settings:

- `local-llm-chat.model`: The LLM model to use (default: `llama2`).
- `local-llm-chat.serverUrl`: The URL of the Ollama server (default: `http://localhost:11434`).

To configure these settings:
1. Open VS Code Settings (`Ctrl+,` or `Cmd+,` on macOS).
2. Search for `local-llm-chat`.

---

## Custom Models

If you want to use a custom model like `deepseek-r1`, follow these steps:

1. **Create a Modelfile**:
   - Create a file named `Modelfile` (no extension) with the following content:
     ```plaintext
     FROM deepseek-r1
     ```
   - Replace `deepseek-r1` with the correct model name or URL.

2. **Pull the Model**:
   - Run the following command to pull the model:
     ```bash
     ollama create deepseek-r1 -f ./Modelfile
     ```

3. **Update the Extension Settings**:
   - Set `local-llm-chat.model` to `deepseek-r1` in VS Code settings.

---

## Known Issues

- **Model Not Found**: If you encounter the error `model 'deepseek-r1' not found`, ensure the model is properly pulled and available in Ollama.
- **Ollama Server Not Running**: Ensure the Ollama server is running before using the extension.

---

## Release Notes

### 1.0.0
- Initial release of Local LLM Chat.
- Basic chat interface with support for Ollama integration.

### 1.0.1
- Fixed issue with model selection in settings.

### 1.1.0
- Added support for custom models like `deepseek-r1`.
- Improved error handling and user feedback.

---

## Contributing

Contributions are welcome! If you'd like to contribute, please:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Submit a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## For More Information

- [Ollama Documentation](https://ollama.ai/)
- [VS Code API Documentation](https://code.visualstudio.com/api)
- [Markdown Syntax Reference](https://www.markdownguide.org/)

**Enjoy chatting with your local LLM!**
