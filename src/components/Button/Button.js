import PropTypes from 'prop-types';
import styles from './Button.module.scss';

const Button = ({ onClick }) => {
  return (
    <div className={styles.container}>
      <button className={styles.button} type="button" onClick={onClick}>
        Load more...
      </button>
    </div>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
