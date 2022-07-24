import React, { Component } from 'react';
import ContactList from 'components/ContactList/ContactList';
import ContactForm from 'components/ContactForm/ContactForm';
import Filter from 'components/Filter/Filter';
import css from './App.module.css';

const LC_KEY = 'phonebook';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
    error: null,
  };

  componentDidMount() {
    try {
      const dataFromLocStorage = JSON.parse(localStorage.getItem(LC_KEY));
      dataFromLocStorage && this.setState({ contacts: dataFromLocStorage });
    } catch (error) {
      this.setState({ error: 'LocalStorage is corrupted :(' });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;

    if (prevState.contacts !== contacts) {
      localStorage.setItem(LC_KEY, JSON.stringify(contacts));
      this.setState({ error: null });
    }
  }

  updateContacts = contact => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  handleFilterChange = value => {
    this.setState({ filter: value });
  };

  render() {
    const { contacts, filter, error } = this.state;
    return (
      <div className={css.container}>
        <h1 className={css.title__phonebook}>Phonebook</h1>
        <ContactForm
          contacts={contacts}
          onUpdateContacts={this.updateContacts}
        />

        <h2 className={css.title__contacts}>Contacts</h2>
        <Filter filter={filter} onFilterChange={this.handleFilterChange} />
        <ContactList
          contacts={contacts}
          filter={filter}
          onDeleteContact={this.deleteContact}
        />
        {error && <p>{error}</p>}
      </div>
    );
  }
}

export default App;
