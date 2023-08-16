import { Component } from 'react';

import { searchPosts } from 'shared/api/posts';

import PostSearchForm from './components/PostSearchForm/PostSearchForm';

import styles from './index.module.scss';
import './shared/styles/styles.scss';

class Posts extends Component {
  state = {
    page: 1,
    search: '',
    items: [], //перший раз, робимо state пустим
    loading: false, //якщо повільний інтернет, робимо загрузку
    error: null, //якщо сталась помилка
  };

  componentDidUpdate(_, prevState) {
    const { search, page } = this.state;
    if (search !== prevState.search || page !== prevState.page) {
      this.fetchPosts();
    }
  }

  updateSearch = ({ search }) => {
    this.setState({ search, items: [], page: 1 });
  };

  loadMore = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  //створюємо окремий метод асінхроний і запит робимо тут. componentDidMount робити асінхронним погана звичка
  async fetchPosts() {
    try {
      const { search, page } = this.state;
      this.setState({ loading: true });
      const { data } = await searchPosts(search, page);
      this.setState(({ items }) => ({ items: [...items, ...data] })); //спрацьовує, якщо відповідь успішна
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
        <PostSearchForm onSubmit={this.updateSearch} />
        {loading && <p>... Loading</p>}
        {error && <p className={styles.error}>{error}</p>}
        <ul className={styles.list}>{elements}</ul>
        {Boolean(items.length) && (
          <button onClick={this.loadMore} type="button">
            Load more
          </button>
        )}
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
