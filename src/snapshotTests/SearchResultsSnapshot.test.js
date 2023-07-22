import React from "react";
import renderer from "react-test-renderer";
import SearchResults from "../components/SearchResults";

describe("SearchResults", () => {
    it("Should render search resuls with props", () => {
        const fetchResults = jest.fn()
        const searchResult = []
        const actualDOM = renderer.create(<SearchResults results={searchResult} fetchData={fetchResults} hasMore={true} />).toJSON()
        expect(actualDOM).toMatchSnapshot()
    })

    it("Should render search resuls with props", () => {
        const fetchResults = jest.fn()
        const searchResult = [{
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
                    "default": {
                        "url": "https://i.ytimg.com/vi/Y9faB5tXij0/default.jpg",
                        "width": 120,
                        "height": 90
                    },
                    "medium": {
                        "url": "https://i.ytimg.com/vi/Y9faB5tXij0/mqdefault.jpg",
                        "width": 320,
                        "height": 180
                    },
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
        const actualDOM = renderer.create(<SearchResults results={searchResult} fetchData={fetchResults} hasMore={true} />).toJSON()
        expect(actualDOM).toMatchSnapshot()
    })
})