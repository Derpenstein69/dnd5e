import axios from 'axios';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';


dotenv.config(); // Load environment variables from .env file


const apiBaseUrl = 'https://api.codegpt.com';


async function postToCodeGPT(apiKey: string, data: object): Promise {
    const response = await axios.post(`${apiBaseUrl}/generate`, data, {
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        }
    });
    return response.data;
}


async function generateFrameworkJson(apiKey: string): Promise {
    const requestData = {
        prompt: 'Define a JSON structure for a D&D 5e System with top-level objects such as Game, Document, and Environment.',
    };


try {
    const gameStructure = await postToCodeGPT(apiKey, requestData);

    if (typeof gameStructure !== 'object') {
        throw new Error('Invalid game structure received from the API');
    }

    const frameworkJsonPath = path.join('Dastardly_Dungeon', 'framework.json');
    fs.writeFileSync(frameworkJsonPath, JSON.stringify(gameStructure, null, 2), 'utf8');
    console.log('framework.json has been successfully created and saved.');
} catch (error) {
    console.error('An error occurred while generating framework.json:', error.message || JSON.stringify(error));
}

}


const apiKey = process.env.CODEGPT_API_KEY; // API key from environment variables


(async () => {
    if (apiKey) {
        try {
            await generateFrameworkJson(apiKey);
        } catch (error) {
            console.error('An error occurred:', error.message || JSON.stringify(error));
        }
    } else {
        console.error('API key is not defined. Please set the CODEGPT_API_KEY environment variable.');
    }
})();