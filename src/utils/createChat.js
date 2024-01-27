import OpenAI from "openai";

import "dotenv/config";
const openai = new OpenAI();

async function PromptResponse(prompt) {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: false,
    temperature: 0.5,
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  console.log(response?.choices[0]);
  return response?.choices[0];
}

export default PromptResponse;
