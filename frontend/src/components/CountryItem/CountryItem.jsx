import { flagEmojiToPNG } from '../../utils/FlagEmoji';
import styles from './CountryItem.module.css';

function CountryItem({ country }) {
  return (
    <li className={styles.countryItem}>
      <span>{flagEmojiToPNG(country.emoji)}</span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
