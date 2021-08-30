import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styles from './Modal.module.scss';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onClose, children }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);

    function handleKeydown(event) {
      if (event.code === 'Escape') {
        onClose();
      }
    }
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [onClose]);

  const handleClickBackdrop = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={styles.overlay} onClick={handleClickBackdrop}>
      <div className={styles.modal}>{children}</div>
    </div>,
    modalRoot,
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};
