import React, { Component } from 'react';
import { Container } from './App.styled';
import Searchbar from './Searchbar/Searchbar';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import { ToastContainer, Slide, toast } from 'react-toastify';
import * as API from '../shared/api/posts';
import 'react-toastify/dist/ReactToastify.css';

class Posts extends Component {
  state = {
    items: [], //перший раз, робимо state пустим
    isLoading: false,
    page: 1,
    error: null,
    query: '', //пошук
    totalHits: 0,
    largeImageURL: '',
    isModalOpen: false,
  };

  componentDidUpdate(_, { query, page }) {
    if (page !== this.state.page || query !== this.state.query) {
      this.fetchPosts(this.state.page, this.state.query);
    }
  }

  toggleModal = (url = '') => {
    this.setState(({ isModalOpen }) => ({
      largeImageURL: url,
      isModalOpen: !isModalOpen,
    }));
  };

  handleSubmit = query => {
    this.setState({ query, items: [], page: 1 });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  fetchPosts = async (query, page) => {
    try {
      this.setState({ isLoading: true });
      const { images, totalHits } = await API.postImage(query, page);

      if (images.length === 0) {
        return toast.warning(
          "Sorry we can't find anything, let's try different informations"
        );
      }
      this.setState(prevState => ({
        items: [...prevState.items, ...images],
        totalHits,
        showBtn: this.state.page < Math.ceil(totalHits / 12),
      }));
      if (totalHits) {
        toast.success(`We found ${totalHits} images`);
      }
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { items, isLoading, error, largeImageURL, isModalOpen, showBtn } =
      this.state; //робимо щоб розмітка залежала від state
    return (
      <Container>
        <Searchbar onSubmit={this.handleSubmit} isLoading={isLoading} />
        {error && <p>error</p>}
        {items.length > 0 && (
          <ImageGallery items={items} onClick={this.toggleModal} />
        )}
        {showBtn && (
          <Button onLoadMore={this.handleLoadMore} isLoading={isLoading} />
        )}
        <ToastContainer transition={Slide} />
        {isLoading && <Loader />}
        {isModalOpen && (
          <Modal onClose={this.toggleModal} url={largeImageURL} />
        )}
      </Container>
    );
  }
}

export default Posts;
