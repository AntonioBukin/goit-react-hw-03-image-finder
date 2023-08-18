import { Component } from 'react';
import { Container } from './App.styled';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import Modal from './components/Modal/Modal';
import { ToastContainer, Slide, toast } from 'react-toastify';
import * as Api from './shared/api/posts';

//import styles from './index.module.scss';
//import './shared/styles/styles.scss';

class Posts extends Component {
  state = {
    items: [], //перший раз, робимо state пустим
    loading: false,
    page: 1,
    error: null,
    query: '', //пошук
    totalHits: 0,
    largeImageURL: '',
    modalOpen: false,
  };

  componentDidUpdate(_, { query, page }) {
    //потрібно відправити аякс запит(після завантаж отримати данні)
    if (page !== this.state.page || query !== this.state.query) {
      this.fetchPosts(this.state.page, this.state.query);
    }
  }

  handleSubmit = query => {
    this.setState({ query, items: [], page: 1 });
  };

  toggleModal = (url = '') => {
    this.setState(({ modalOpen }) => ({
      largeImageURL: url,
      modalOpen: !modalOpen,
    }));
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  fetchPosts = async (query, page) => {
    try {
      this.setState ({loading: true});
      const {images, totalHits} = await Api.postImage(query, page);

      if (images.length === 0) {
        return toast.warning("Sorry we can't find anything, let's try different informations");
      }
      this.setState(prevState => ({
        items: [...prevState.items, ...images], totalHits,
        showBtn: this.state.page < Math.ceil(totalHits/12),
      }));
      if (totalHits) {
        toast.success(`We found ${totalHits} images`);
      }
    } catch (error) {
      this.setState({error: error.message});
    } finally {
      this.setState({loading: false});
    }
  };

  render() {
    const { items, loading, error, largeImageURL, modalOpen, showBtn } =
      this.state; //робимо щоб розмітка залежала від state
    return (
      <Container>
        <Searchbar onSubmit={this.handleSubmit} loading={loading} />
        {error && <p>error</p>}
        {items.length > 0 && (
          <ImageGallery items={items} onClick={this.toggleModal} />
        )}
        {showBtn && (
          <button onLoadMore={this.handleLoadMore} loading={loading} />
        )}
        <ToastContainer transition={Slide} />
        {loading && <Loader />}
        {modalOpen && <Modal onClose={this.toggleModal} url={largeImageURL} />}
      </Container>
    );
  }
}

export default Posts;

// import { Component } from 'react';

// import { searchPosts } from 'shared/api/posts';

// import PostSearchForm from './components/PostSearchForm/PostSearchForm';

// import styles from './index.module.scss';
// import './shared/styles/styles.scss';

// class Posts extends Component {
//   state = {
//     page: 1,
//     search: '',
//     items: [], //перший раз, робимо state пустим
//     loading: false, //якщо повільний інтернет, робимо загрузку
//     error: null, //якщо сталась помилка
//   };

//   componentDidUpdate(_, prevState) {
//     const { search, page } = this.state;
//     if (search !== prevState.search || page !== prevState.page) {
//       this.fetchPosts();
//     }
//   }

//   updateSearch = ({ search }) => {
//     this.setState({ search, items: [], page: 1 });
//   };

//   loadMore = () => {
//     this.setState(({ page }) => ({
//       page: page + 1,
//     }));
//   };

//   //створюємо окремий метод асінхроний і запит робимо тут. componentDidMount робити асінхронним погана звичка
//   async fetchPosts() {
//     try {
//       const { search, page } = this.state;
//       this.setState({ loading: true });
//       const { data } = await searchPosts(search, page);
//       this.setState(({ items }) => ({ items: [...items, ...data] })); //спрацьовує, якщо відповідь успішна
//     } catch ({ response }) {
//       this.setState({ error: response.data.message || 'Cannot fetch posts' }); //якщо помилка
//     } finally {
//       this.setState({ loading: false }); //finally - це те що, спрацьовує коли прийшла відповідь (неважливо успішна чи з помилкою)
//     }
//   }

//   render() {
//     const { items, loading, error } = this.state;
//     const elements = items.map(({ id, title, body }) => (
//       <li key={id} className={styles.item}>
//         <h4 className={styles.itemTitle}>{title}</h4>
//         <p className={styles.itemText}>{body}</p>
//       </li>
//     ));
//     return (
//       <>
//         <h2 className={styles.heading}>Posts</h2>
//         <PostSearchForm onSubmit={this.updateSearch} />
//         {loading && <p>... Loading</p>}
//         {error && <p className={styles.error}>{error}</p>}
//         <ul className={styles.list}>{elements}</ul>
//         {Boolean(items.length) && (
//           <button onClick={this.loadMore} type="button">
//             Load more
//           </button>
//         )}
//       </>
//     );
//   }
// }

// export default Posts;

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
