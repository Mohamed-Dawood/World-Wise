import { formatDate } from '../../utils/FormatDate';
import { flagEmojiToPNG } from '../../utils/FlagEmoji';
import styles from './CityItem.module.css';
import { Link } from 'react-router-dom';
import { useCities } from '../../contexts/CitiesContext';

function CityItem({ city }) {
  const { cityName, emoji, date, _id: id, position } = city;
  const { currentCity, deleteCity } = useCities();

  function handleDelete(e) {
    e.preventDefault();
    deleteCity(id);
  }

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          id === currentCity._id ? styles['cityItem--active'] : ''
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{flagEmojiToPNG(emoji)}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn} onClick={handleDelete}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
