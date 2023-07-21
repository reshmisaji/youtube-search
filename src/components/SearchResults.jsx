import InfiniteScroll from "react-infinite-scroll-component"

const SearchResults = ({ results, fetchData, hasMore }) => {
    return (<div data-testid="search-results" id="search-results">
        <InfiniteScroll
            dataLength={results.length}
            next={fetchData} hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={
                <p style={{ textAlign: 'center' }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }>
            {results?.map((result, index) => {
                return <div data-testid={`video-card-${index}`} key={`video-card-${index}`} >
                    <img alt={result?.snippet?.description} src={result?.snippet?.thumbnails?.default?.url} />
                    {result?.snippet?.title}</div>
            })}</InfiniteScroll>
    </div>)
}
export default SearchResults