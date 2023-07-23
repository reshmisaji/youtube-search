import InfiniteScroll from "react-infinite-scroll-component"
import '../styles/SearchResults.css'
import { CHANNEL_URL, EMBED_URL } from "../constants";

const VideoCard = (data, index) => {
  const { snippet, id } = data;

  return <div data-testid={`video-card-${index}`} key={`video-card-${index}`} className="video-card-container" >

    <iframe
      title={`${snippet?.title}_${index}`}
      src={`${EMBED_URL}/${id.videoId}`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
      allowFullScreen
      className="thumbnail"
      data-testid={`youtube-video-${index}`}
    ></iframe>
    <div className="details">
      <div className="title" data-testid={`video-title-${index}`}>{snippet?.title}</div>
      <div className="publish-date" data-testid={`publish-date-${index}`}>
        {new Date(snippet?.publishedAt).toDateString()}</div>

      <div className="channel">
        <a href={`${CHANNEL_URL}/${snippet?.channelId}`} target="blank" >
          <div className="channel-logo">{snippet?.channelTitle?.slice(0, 1)}</div></a>
        <div className="channel-name" data-testid={`channel-title-${index}`}>{snippet?.channelTitle}</div>
      </div>
      <div className="description" data-testid={`video-description-${index}`}>{snippet?.description}</div>
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
      loader={<div className='loader-container'>
        <div data-testid="loading" className="loading"></div>
      </div>}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>Yay! You have seen it all</b>
        </p>
      }>
      {results?.map(VideoCard)}</InfiniteScroll>
  </div>)
}
export default SearchResults