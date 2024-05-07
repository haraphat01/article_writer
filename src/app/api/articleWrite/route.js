
import { NextResponse } from 'next/server'
import axios from 'axios';
import serpResults from '../../components/serpResults'
import getGroqChatCompletion from '../../components/getGroqChatCompletion'

export async function POST(req, res) {
    let passedValue = await new Response(req.body).text();
    let bodyreq = JSON.parse(passedValue);
    
   
    let {title} = bodyreq
    console.log("result from the front",title)
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }


    try {
       

        let query = ` ${title}`
      
        const result = await serpResults(query);
       
       
        let textContent = '';

        result.organic.forEach((item, index) => {
            textContent += `Title: ${item.title}\nLink: ${item.link}\nSnippet: ${item.snippet}\n\n`;
        });

        const groqresult = await getGroqChatCompletion(textContent);

        console.log("result from qroq",groqresult)

        return NextResponse.json({groqresult }, { status: 200 })


    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error }, { status: 500 })
    }
}