import { useState, useEffect } from 'react';
import ApiService from '../../services/api';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';
import Modal from '../Modal';
import Button from '../Button';
import styles from './ImageGallery.module.scss';
import Spinner from '../Loader';

const apiService = new ApiService();

export default function ImageGallery({ imageName }) {
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (imageName === '') return;
    setImages([]);
    apiService.query = imageName;
    setLoading(true);
    getImages();
  }, [imageName]);

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  const handleLargeImage = image => {
    setLargeImage(image);
  };

  const handleBtnClick = () => {
    getImages();
  };

  const getImages = () => {
    setLoading(true);

    apiService
      .fetchImages()
      .then(({ hits }) => setImages(prevState => [...prevState, ...hits]))
      .then(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      })
      .catch(error => console.log(error))
      .finally(setLoading(false));
  };

  return (
    <>
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImage} alt="images" />
        </Modal>
      )}

      <ul className={styles.imageGallery}>
        {images.map(({ id, webformatURL, tags, largeImageURL }) => {
          return (
            <ImageGalleryItem
              key={id}
              url={webformatURL}
              tags={tags}
              largeImage={largeImageURL}
              toggleModal={toggleModal}
              handleLargeImage={handleLargeImage}
            />
          );
        })}
      </ul>
      {images.length > 0 && !loading && <Button onClick={handleBtnClick} />}
      {loading && <Spinner />}
    </>
  );
}

ImageGallery.propTypes = {
  imageName: PropTypes.string.isRequired,
};
