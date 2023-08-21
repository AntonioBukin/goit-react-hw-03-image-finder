import { ButtonStyled } from './Button.styled';
import PropTypes from 'prop-types';

const Button = ({ onLoadMore, isLoading }) => {
  return (
    <ButtonStyled type="button" onClick={onLoadMore} disabled={isLoading}>
      Load more
    </ButtonStyled>
  );
};

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default Button;
