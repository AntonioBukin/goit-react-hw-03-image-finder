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

// axios.defaults.params = {
//   key: API_KEY,
//   image_type: "photo",
//   orientation: "horizontal",
// };

// export async function getPosts(name, page, perpage) {
//   const {data} = await axios.get(
//     `?q=${name}&page=${page}&per_page=${perpage}`
//   );
//   return data.hits;
// }

// const postsInstance = axios.create({
//   baseURL: 'https://jsonplaceholder.typicode.com/posts', //postsInstance - налаштований axios
// });

// export const getPosts = () => {
//   return postsInstance.get('/'); //відправляємо аякс запит
// };

// export const searchPosts = (q, _page = 1) => {
//   return postsInstance.get('/', {
//     params: {
//       q,
//       _page,
//       _limit: 4,
//     },
//   }); //функція пошуку постів
// };
