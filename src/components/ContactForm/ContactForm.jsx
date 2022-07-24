import { Component } from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = event => {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;
    this.setState({ [name]: value });
  };

  checkNewName = name => {
    const { contacts } = this.props;
    const newName = name.toLowerCase();
    const isNameExist = contacts.filter(
      item => item.name.toLowerCase() === newName
    );
    return isNameExist.length;
  };

  handleSubmit = event => {
    event.preventDefault();

    const { onUpdateContacts } = this.props;
    const { name, number } = this.state;

    const isNameExist = this.checkNewName(name);
    if (isNameExist) {
      alert(`${name} is already in contacts.`);
      return;
    }

    const contactData = { id: shortid.generate(), name, number };
    onUpdateContacts(contactData);
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;
    return (
      <form className={css.form} onSubmit={this.handleSubmit}>
        <label className={css.form__label}>
          Name
          <input
            className={css.form__input}
            type="text"
            name="name"
            value={name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={this.handleChange}
          />
        </label>
        <label className={css.form__label}>
          Number
          <input
            className={css.form__input}
            type="tel"
            name="number"
            value={number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={this.handleChange}
          />
        </label>
        <button type="submit" className={css.btn__submit}>
          Add contact
        </button>
      </form>
    );
  }
}

export default ContactForm;

ContactForm.propTypes = {
  onUpdateContacts: PropTypes.func.isRequired,
  contactData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }),
};
