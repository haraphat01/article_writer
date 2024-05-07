"use strict";
const Groq = require("groq-sdk");
let prompt = "You are an article writer, Review the links and the news sources provided to you and write a detailed, seo optimized article with minimum of  1,500 words about the topic, the article must contains in depth information about the topic in paragraphs and also include conclusion";
async function getGroqChatCompletion(content) {
    const groq = new Groq({
        apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY
    });

    try {
        const chatCompletion = await groq.chat.completions.create({
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
            model: "llama3-70b-8192",
            temperature: 1,
            max_tokens: 2024
        });

        return chatCompletion.choices[0]?.message?.content || "";
    } catch (error) {
        console.error('Error fetching chat completion:', error);
        return "";
    }
}
export default getGroqChatCompletion