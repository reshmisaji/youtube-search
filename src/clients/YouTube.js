import axios from "axios"

export const search = (searchValue, nextPageToken) => {
    const request = {
        "method": "GET",
        "url": 'https://www.googleapis.com/youtube/v3/search',
        "params": {
            'part': 'snippet',
            'maxResults': '20',
            'key': process.env.REACT_APP_YOUTUBE_API_KEY,
            'q': searchValue,
        }
    }
    if (nextPageToken) request.params.pageToken = nextPageToken

    return axios(request)
}