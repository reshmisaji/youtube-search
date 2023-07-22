import InfiniteScroll from "react-infinite-scroll-component"
import '../styles/SearchResults.css'

const VideoCard = (data, index) => {
  const { snippet, id } = data;

  return <div data-testid={`video-card-${index}`} key={`video-card-${index}`} className="video-card-container" >

    <iframe
      title={`${snippet?.title}_${index}`}
      src={`https://www.youtube.com/embed/${id.videoId}`}
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
        <div className="channel-logo">{snippet?.channelTitle?.slice(0, 1)}</div>
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