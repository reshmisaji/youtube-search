import { render, screen } from "@testing-library/react"
import SearchResults from "./SearchResults"


describe('SearchResults', () => {
    it('Should render the component properly with results from props', () => {
        const results = [{ snippet: { title: "flower" }, id: { videoId: '12' } }, { snippet: { title: "color" }, id: { videoId: '1234' } }]
        render(<SearchResults results={results} />)

        const searchResultsComponent = screen.getByTestId('search-results')
        expect(searchResultsComponent).toBeInTheDocument()
        expect(screen.getAllByTestId(/video-card/).length).toBe(results.length)
    })

    it('Should render video card with video, title, published date, channel name and description', () => {
        const results = [{
            "kind": "youtube#searchResult",
            "etag": "BTEODBcIlxK7VY72sAxSV06I_y4",
            "id": {
                "kind": "youtube#video",
                "videoId": "Y9faB5tXij0"
            },
            "snippet": {
                "publishedAt": "2021-11-19T14:00:10Z",
                "channelId": "UCH5d2bpWBVu6eQk1amUSpyA",
                "title": "Johnny Stimson - Flower (Piano Version)",
                "description": "Follow Johnny on Instagram: http://bit.ly/2iqacB1",
                "thumbnails": {
                    "high": {
                        "url": "https://i.ytimg.com/vi/Y9faB5tXij0/hqdefault.jpg",
                        "width": 480,
                        "height": 360
                    }
                },
                "channelTitle": "Johnny Stimson",
                "liveBroadcastContent": "none",
                "publishTime": "2021-11-19T14:00:10Z"
            }
        }]
        render(<SearchResults results={results} />)

        const searchResultsComponent = screen.getByTestId('search-results')
        expect(searchResultsComponent).toBeInTheDocument()
        expect(screen.getAllByTestId(/video-card/).length).toBe(results.length)
        expect(screen.getAllByTestId(/youtube-video/).length).toBe(results.length)
        expect(screen.getAllByTestId(/video-title/).length).toBe(results.length)
        expect(screen.getAllByTestId(/publish-date/).length).toBe(results.length)
        expect(screen.getAllByTestId(/channel-title/).length).toBe(results.length)
        expect(screen.getAllByTestId(/video-description/).length).toBe(results.length)
    })
})