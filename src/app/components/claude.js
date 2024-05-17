"use strict";
import Anthropic from '@anthropic-ai/sdk';
let prompt = "You are an article writer, Review the links and the news sources provided to you and write a detailed, seo optimized article with minimum of  1,500 words about the topic, the article must contains in depth information about the topic in paragraphs and also include conclusion";
async function getGroqChatCompletion(content) {
    const anthropic = new Groq({
        apiKey: process.env.NEXT_PUBLIC_CLAUDE_API_KEY
    });

    try {
        const chatCompletion = await anthropic.messages.create({
            messages: [
                {

                    role: "system",
                    content: prompt
                },
                {

                    role: "user",
                    content: content
                }
            ],
            model: "claude-3-opus-20240229",
            temperature: 1,
            max_tokens: 20000

        });

        return chatCompletion.choices[0]?.message?.content || "";
    } catch (error) {
        console.error('Error fetching chat completion:', error);
        return "";
    }
}
export default getGroqChatCompletion