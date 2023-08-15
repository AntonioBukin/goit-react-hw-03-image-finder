import axios from 'axios';

const postsInstance = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com/posts" //postsInstance - налаштований axios
})

export const getPosts = async () => {
  return postsInstance.get('/'); //відправляємо аякс запит
};
