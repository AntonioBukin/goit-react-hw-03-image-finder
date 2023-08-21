import PropTypes from 'prop-types';
import { ImageGalleryStyled } from './ImageGallery.styled';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ items, onClick }) => {
  return (
    <ImageGalleryStyled>
      {items.map(item => {
        return <ImageGalleryItem key={item.id} item={item} onClick={onClick} />;
      })}
    </ImageGalleryStyled>
  );
};

ImageGallery.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object),
    onClick: PropTypes.func.isRequired,
}

export default ImageGallery;
