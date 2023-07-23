import axios from "axios"
import { SEARCH_URL } from "../constants"

export const search = (searchValue, nextPageToken) => {
    const request = {
        "method": "GET",
        "url": SEARCH_URL,
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