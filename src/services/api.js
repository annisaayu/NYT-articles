import axios from 'axios';

const API_KEY= process.env.REACT_APP_API_KEY
const BASE_URL = process.env.REACT_APP_BASE_URL
//blog480
export const fetchArticles = async (query='', page=1, category) => {
  try {
    let fq = '';
    
    if(category) {
      fq = fq + `section_name:("${category}")`
    }

    const res = await axios.get(BASE_URL, {
      params: {
        fq,
        q: query.toLowerCase(),
        page: page-1,
        'api-key': API_KEY
      }
    })
    const {response, status} = res?.data
    if( status.toLowerCase() !== 'ok') {
      throw new Error("Error fetching articles")
    }
    let articles = (response?.docs || []).map((doc) => {
      const thumbnail = doc.multimedia?.find(item => item.subtype === 'largeWidescreen573');
      return {
        ...doc,
        thumbnailUrl: thumbnail ? `https://static01.nyt.com/${thumbnail.url}` : null
      };
    })
    return articles


  } catch (error) {
    console.log('Error fetching articles: ', error.message)
    switch (error.status) {
      case 401:
        throw new Error("You do not have permission to view this page.", { status: error.status });
      case 429:
        throw new Error("You reached your per minute or per day rate limit. Please try again later.", { status: error.status });
      default:
        throw new Error("Failed to fetch the articles. Please try again", { status: error.status });
    }
  }
}