import { useEffect, useState } from 'react';
import { SearchVideoDetails, getSuggestions } from '../../resources/calls';
import { fetchSearch } from '../../utils/fetchApi';

function useGetVideo(id) {
  const [video, setVideo] = useState('');
  const [suggestions, setSuggestions] = useState('');

  useEffect(() => {
    fetchSearch(SearchVideoDetails(id), setVideo);
    fetchSearch(getSuggestions(id), setSuggestions);
  }, [id]);

  return { video, suggestions };
}

export { useGetVideo };
