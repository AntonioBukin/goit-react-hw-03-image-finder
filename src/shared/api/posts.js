import axios from 'axios';

const postsInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/posts', //postsInstance - налаштований axios
});

export const getPosts = () => {
  return postsInstance.get('/'); //відправляємо аякс запит
};

export const searchPosts = (q, _page = 1) => {
  return postsInstance.get('/', {
    params: {
      q,
      _page,
      _limit: 4,
    },
  }); //функція пошуку постів
};
