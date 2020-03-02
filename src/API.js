const API_URL = 'https://api.500px.com/v1/photos/search?type';
const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
export default {
    search(searchTerm) {
        const url = `${PROXY_URL}${API_URL}&term=${searchTerm}`;
        return fetch(url)
            .then(response => response.json())
            .then(result => {
                return result.photos;
            });
    }
}