import axios from "axios";
import { search } from "./YouTube";

jest.mock('axios')

describe('Search', () => {
    it('Should call youtube search api with the given text as query', async () => {
        const searchText = "flower";
        const expectedResult = { data: { items: [1, 2] } }
        axios.mockResolvedValue(expectedResult)
        
        const expectedRequestParams = {
            "method": "GET",
            "params": {
                "key": process.env.REACT_APP_YOUTUBE_API_KEY,
                "maxResults": "20", "part": "snippet", "q": searchText
            }, "url": "https://www.googleapis.com/youtube/v3/search"
        }
        const actualResult = await search(searchText)

        expect(axios).toHaveBeenCalledWith(expectedRequestParams)
        expect(actualResult).toBe(expectedResult)
    })
})