// import { Component } from 'react';

// class PostsSearchForm extends Component {
//   state = {
//     search: '',
//   };

//   handleChange = ({ target }) => {
//     const { name, value } = target; //value - значення яке ми записуємо в state
//     this.setState({
//       [name]: value,
//     });
//   };

//   handleSubmit = e => {
//     e.preventDefault();
//     const { onSubmit } = this.props;
//     onSubmit({ ...this.state });
//     this.reset();
//   };

//   reset() {
//     this.setState({ search: '' });
//   }

//   render() {
//     const { search } = this.state;
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <input
//           name="search"
//           value={search}
//           onChange={this.handleChange}
//           placeholder="Search post"
//           required
//         />
//         <button type='submit'>Search</button>
//       </form>
//     );
//   }
// }

// export default PostsSearchForm;
