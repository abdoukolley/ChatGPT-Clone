import OpenAI from "openai";

const openai = new OpenAI( {apiKey: "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", dangerouslyAllowBrowser: true });

async function sendMsgToOpenAI(text) {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: 
      [{ role: "system", content: "You are a helpful assistant." },
      { role: "user", content: text }],
    });
    return completion.choices[0].message.content;
}

export { sendMsgToOpenAI };