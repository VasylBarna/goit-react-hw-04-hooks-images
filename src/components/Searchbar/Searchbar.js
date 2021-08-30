import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Searchbar.module.scss';

export default function Searchbar({ onSubmit }) {
  const [imageName, setImageName] = useState('');

  const handleChange = event => {
    setImageName(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (imageName.trim() === '') {
      alert('Введите точное название');
      return;
    }
    onSubmit(imageName);
    setImageName('');
  };

  return (
    <header className={styles.searchbar}>
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <button type="submit" className={styles.button}>
          <span className={styles.label}>Search</span>
        </button>
        <input
          className={styles.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={imageName}
          onChange={handleChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  imageName: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};
