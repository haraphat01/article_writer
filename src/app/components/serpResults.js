import axios from 'axios';

async function serpResults(query) {
  try {
    const data = JSON.stringify({ q: query });
    const config = {
      method: 'post',
      url: 'https://google.serper.dev/search',
      headers: { 
        'X-API-KEY': process.env.NEXT_PUBLIC_SERP_API, 
        'Content-Type': 'application/json'
      },
      data: data
    };

    const response = await axios(config);
    return response.data;
  } catch (error) {
    throw new Error('Error searching Google:', error);
  }
}
export default serpResults;