import PropTypes from 'prop-types';
import ContactItem from 'components/ContactItem/ContactItem';

const ContactList = ({ contacts, filter, onDeleteContact }) => {
  const normalizedFilter = filter.toLowerCase();
  const contactsByFilter = contacts.filter(({ name }) =>
    name.toLowerCase().includes(normalizedFilter)
  );

  return (
    <ul>
      {contactsByFilter.map(({ id, name, number }) => (
        <ContactItem
          key={id}
          id={id}
          name={name}
          number={number}
          onDeleteContact={onDeleteContact}
        />
      ))}
    </ul>
  );
};

export default ContactList;

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  filter: PropTypes.string,
  onDeleteContact: PropTypes.func.isRequired,
};
