import {queryNewsFeed, articles_url, _api_key, country_code} from '../config/rest_consfig';

export async function getArticles(category='general') {

    try {
        let articles = await fetch(`http://newsapi.org/v2/everything?q=wildfire`, {
            headers: {
                'X-API-KEY': _api_key
            }
        });

        let result = await articles.json();
        articles = null;

        return result.articles;
    }
    catch(error) {
        throw error;
    }
}