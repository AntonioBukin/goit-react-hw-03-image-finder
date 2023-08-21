import axios from 'axios';

const API_KEY = "35752584-b09009ceb4c8bb99b03fafcd9";

axios.defaults.baseURL = "https://pixabay.com/api/";

const BASE_PARAMS = "image_type=photo&orientation=horizontal&per_page=12"

export const postImage = async (query, page) => {
  try {
    const response = await axios.get(`?q=${query}&page=${page}&key=${API_KEY}&${BASE_PARAMS}`);
    const { hits, totalHits} = response.data;

    const images = hits.map(img => {
      const { id, webformatURL, largeImageURL, tags} = img;
      return {
        id, webformatURL, largeImageURL, tags
      };
    });

    return {images,  totalHits};
  } catch (error) {
    console.error(error);
  }
};

