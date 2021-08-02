/* istanbul ignore file */
const { REACT_APP_YOUTUBE_KEY } = process.env;

export const SearchVideos = (searchTerm) => {
  return `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelType=any&maxResults=12&order=relevance&q=${searchTerm}&type=video&key=${REACT_APP_YOUTUBE_KEY}`;
};

export const SearchVideoDetails = (id) => {
  return `https://youtube.googleapis.com/youtube/v3/videos?part=player&part=contentDetails&part=statistics&part=snippet&id=${id}&maxResults=1&key=${REACT_APP_YOUTUBE_KEY}`;
};

export const getSuggestions = (id = '') => {
  return `https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${id}&maxResults=12&type=video&key=${REACT_APP_YOUTUBE_KEY}`;
};
