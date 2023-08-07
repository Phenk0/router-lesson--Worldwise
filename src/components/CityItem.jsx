import { Link } from 'react-router-dom';

import styles from './CityItem.module.css';
import { useCities } from '../hooks/useCities.js';

const formatDate = (date) =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date(date));

function CityItem({ city: { emoji, cityName, date, id, position } }) {
  const { currentCity, removeCity } = useCities();
  const { lat, lng } = position;

  function handleClick(event) {
    event.preventDefault();
    removeCity(id);
  }

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          currentCity.id === id ? styles['cityItem--active'] : ''
        }`}
        to={`${id}?lat=${lat}&lng=${lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn} onClick={handleClick}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
