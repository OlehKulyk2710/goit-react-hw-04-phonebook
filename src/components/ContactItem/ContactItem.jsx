import css from './ContactItem.module.css';
import PropTypes from 'prop-types';

const ContactItem = ({ id, name, number, onDeleteContact }) => {
  return (
    <li className={css.contacts__item}>
      {name}: <span>{number}</span>
      <button
        type="button"
        className={css.contacts__btn}
        onClick={() => onDeleteContact(id)}
      >
        Delete
      </button>
    </li>
  );
};

export default ContactItem;

ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
