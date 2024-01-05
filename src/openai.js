const { Configuration, OpenAIApi } = require('openai');
const apiKey = "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";
const configuration = new Configuration({ apiKey });
const openai = new OpenAIApi(configuration);

export async function sendMsgToOpenAI(message) {
    const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: message,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
    });
    return response.data.choices[0].text;
}
