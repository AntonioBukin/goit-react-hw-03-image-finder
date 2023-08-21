import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import {AiOutlineSearch} from "react-icons/ai";
import {
  Header,
  SearchForm,
  SearchFormBtn,
  SearchFormInput,
} from './Searchbar.styled';

const notifyOptions = {
    position: "top-center",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
};

class Searchbar extends Component {
  state = {
    inputValue: '',
  };

  handleChange = event => {
    this.setState({ inputValue: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { inputValue } = this.state;
    if (inputValue.trim() === '') {
      return toast.info('Please enter key words', notifyOptions);
    }
    this.props.onSubmit(inputValue);
    this.clearForm();
  };
  clearForm = () => {
    this.setState({inputValue: ""});
  };

  render() {
    const { inputValue } = this.state;
    return (
      <Header>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormBtn type="submit">
            <AiOutlineSearch size="30" />
          </SearchFormBtn>
          <SearchFormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="All search images and fotos"
            value={inputValue}
            onChange={this.handleChange}
          />
        </SearchForm>
      </Header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
