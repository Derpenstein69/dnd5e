// framework.ts
import axios from 'axios';
import fs from 'fs';
import path from 'path';

// Define the base URL for the CodeGPT API
const apiBaseUrl = 'https://api.codegpt.com';

// Function to post data to the CodeGPT API and receive the generated framework
async function postToCodeGPT(apiKey: string, data: object): Promise<any> {
  try {
    const response = await axios({
      method: 'post',
      url: `${apiBaseUrl}/generate`,
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(data)
    });
    return response.data;
  } catch (error) {
    console.error('Error posting to CodeGPT API:', error);
    throw error; // Rethrow the error to be handled by the caller
  }
}

// Function to generate framework.json using the CodeGPT API
async function generateFrameworkJson(apiKey: string): Promise<void> {
  try {
    // Define the data structure sent to CodeGPT API
    const requestData = {
      prompt: 'Define a JSON structure for a D&D 5e System with top-level objects such as Game, Document, and Environment.',
      // Add any other parameters as required by the API
      // For example, temperature, top_p, n, etc.
    };

    // Call the CodeGPT API and store the response
    const gameStructure = await postToCodeGPT(apiKey, requestData);

    // Save the generated game structure to framework.json
    const frameworkJsonPath = path.join(__dirname, 'Dastardly_Dungeon', 'framework.json');
    fs.writeFileSync(frameworkJsonPath, JSON.stringify(gameStructure, null, 2), 'utf8');

    console.log('framework.json has been successfully created and saved.');
  } catch (error) {
    console.error('An error occurred while generating framework.json:', error);
  }
}

// Your API key (it is recommended to use environment variables for storing API keys)
const myApiKey = 'sk-99221d08-38b8-485f-a383-5ca56595426d';

// Call the generateFrameworkJson function with the API key to begin the process
generateFrameworkJson(myApiKey);