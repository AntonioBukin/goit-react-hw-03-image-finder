import PropTypes from 'prop-types';

import {
  ImageGalleryItemStyled,
  ImageGalleryItemImg,
} from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ item, onClick }) => {
  const { webformatURL, tags, largeImageURL } = item;
  return (
    <ImageGalleryItemStyled>
      <ImageGalleryItemImg
        src={webformatURL}
        alt={tags}
        onClick={() => onClick(largeImageURL)}
      />
    </ImageGalleryItemStyled>
  );
};

ImageGalleryItem.propTypes = {
    items: PropTypes.exact({
        webformatURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
    }),
    onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
