import { Component } from 'react';

import { getPosts } from 'shared/api/posts';

import styles from './index.module.scss';
import './shared/styles/styles.scss';

class Posts extends Component {
  state = {
    items: [], //перший раз, робимо state пустим
    loading: false, //якщо повільний інтернет, робимо загрузку
    error: null, //якщо сталась помилка
  };

  componentDidMount() {
    this.fetchPosts();
  } //масив який нам повернувся записуємо в state

  //створюємо окремий метод асінхроний і запит робимо тут. componentDidMount робити асінхронним погана звичка
  async fetchPosts() {
    try {
      this.setState({ loading: true });
      const { data } = await getPosts();
      this.setState({ items: data }); //спрацьовує, якщо відповідь успішна
    } catch ({ response }) {
      this.setState({ error: response.data.message || 'Cannot fetch posts' }); //якщо помилка
    } finally {
      this.setState({ loading: false }); //finally - це те що, спрацьовує коли прийшла відповідь (неважливо успішна чи з помилкою)
    }
  }

  render() {
    const { items, loading, error } = this.state;
    const elements = items.map(({ id, title, body }) => (
      <li key={id} className={styles.item}>
        <h4 className={styles.itemTitle}>{title}</h4>
        <p className={styles.itemText}>{body}</p>
      </li>
    ));
    return (
      <>
        <h2 className={styles.heading}>Posts</h2>
        {loading && <p>... Loading</p>}
        {error && <p className={styles.error}>{error}</p>}
        <ul className={styles.list}>{elements}</ul>
      </>
    );
  }
}

export default Posts;

// export const App = () => {
//   return (
//     <div
//       style={{
//         height: '100vh',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         fontSize: 40,
//         color: '#010101'
//       }}
//     >
//       React homework template
//     </div>
//   );
// };
