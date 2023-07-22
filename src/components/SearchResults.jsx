import InfiniteScroll from "react-infinite-scroll-component"
import '../styles/SearchResults.css'
import { Suspense } from "react";

const VideoCard = (data, index) => {
  const { snippet, id } = data;

  return <div data-testid={`video-card-${index}`} key={`video-card-${index}`} className="video-card-container" >
    <Suspense fallback={
      <img alt={snippet?.description} src={snippet?.thumbnails?.high?.url} className="thumbnail" />
    }>
      <iframe
        src={`https://www.youtube.com/embed/${id.videoId}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
        allowFullScreen
        className="thumbnail"></iframe>
    </Suspense>
    <div className="details">
      <div className="title">{snippet?.title}</div>
      <div className="channel-logo"></div>
      <div className="channel-name">{snippet?.channelTitle}</div>
      <div className="views"></div>
      <div className="likes"></div>
      <button className="play-video"></button>
      <button className="like"></button>
      <button className="dislike"></button>
    </div>
  </div>

}

const SearchResults = ({ results, fetchData, hasMore }) => {
  return (<div data-testid="search-results" id="search-results" className="results-container">
    <InfiniteScroll
      className="results"
      dataLength={results.length}
      next={fetchData}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>Yay! You have seen it all</b>
        </p>
      }>
      {results?.map(VideoCard)}</InfiniteScroll>
  </div>)
}
export default SearchResults