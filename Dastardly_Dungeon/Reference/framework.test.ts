import { generateFrameworkJson } from './framework';

describe('generateFrameworkJson', () => {
  it('should generate and save framework.json', async () => {
    // Mock the postToCodeGPT function
    const mockPostToCodeGPT = jest.fn().mockResolvedValue({
      Game: {},
      Document: {},
      Environment: {},
    });

    // Mock the fs.writeFileSync function
    const mockWriteFileSync = jest.fn();

    // Mock the console.log function
    const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation();

    // Mock the path.join function
    jest.mock('path', () => ({
      join: jest.fn().mockReturnValue('Dastardly_Dungeon/framework.json'),
    }));

    // Mock the fs module
    jest.mock('fs', () => ({
      writeFileSync: mockWriteFileSync,
    }));

    // Call the function with the mock dependencies
    await generateFrameworkJson('mockApiKey', mockPostToCodeGPT);

    // Verify that postToCodeGPT was called with the correct parameters
    expect(mockPostToCodeGPT).toHaveBeenCalledWith('mockApiKey', {
      prompt: 'Define a JSON structure for a D&D 5e System with top-level objects such as Game, Document, and Environment.',
    });

    // Verify that fs.writeFileSync was called with the correct parameters
    expect(mockWriteFileSync).toHaveBeenCalledWith(
      'Dastardly_Dungeon/framework.json',
      JSON.stringify(
        {
          Game: {},
          Document: {},
          Environment: {},
        },
        null,
        2
      ),
      'utf8'
    );

    // Verify that console.log was called with the correct message
    expect(mockConsoleLog).toHaveBeenCalledWith('framework.json has been successfully created and saved.');
  });

  it('should handle errors', async () => {
    // Mock the postToCodeGPT function to throw an error
    const mockPostToCodeGPT = jest.fn().mockRejectedValue(new Error('API error'));

    // Mock the console.error function
    const mockConsoleError = jest.spyOn(console, 'error').mockImplementation();

    // Call the function with the mock dependencies
    await generateFrameworkJson('mockApiKey', mockPostToCodeGPT);

    // Verify that console.error was called with the correct error message
    expect(mockConsoleError).toHaveBeenCalledWith('An error occurred while generating framework.json:', 'API error');
  });
});