// server.js

// 1. Import required packages
const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config(); // Load environment variables from .env file

// 2. Initialize Express and the Google AI Model
const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies
app.use(express.static('.')); // Serve static files like index.html

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

// 3. Create the API endpoint
app.post('/api/generate', async (req, res) => {
    try {
        // Get the prompt from the frontend's request
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required.' });
        }

        // Call the model
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Send the AI's text response back to the frontend
        res.json({ text: text });

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        res.status(500).json({ error: 'Failed to generate content.' });
    }
});

// 4. Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(Server is running on http://localhost:${PORT});
});
