import React, { useEffect, useState, useMemo } from 'react';
import { nanoid } from 'nanoid';
import Section from './Section/Section';
import ContactsForm from './Form/Form';
import { Contacts } from './Contacts/Contacts';

function App() {
  const [contacts, setContacts] = useState(
    () =>
      JSON.parse(localStorage.getItem('contacts')) || [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ]
  );

  const [filter, setFilter] = useState('');
 
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleSubmit = (values, { resetForm }) => {
    resetForm();

    const existingContact = contacts.find(
      (contact) =>
        contact.name.toLowerCase() === values.name.toLowerCase()
    );

    if (existingContact) {
      alert(`${values.name} уже є у контактах`);
    } else {
      const newContact = {
        id: nanoid(),
        name: values.name,
        number: values.number,
      };

      setContacts((prevState) => [...prevState, newContact]);
    }
  };

  const filteredContacts = useMemo(
    () =>
      contacts.filter((contact) =>
        contact.name.toLowerCase().includes(filter)
      ),
    [contacts, filter]
  );

  const filterOnChange = (e) => {
    setFilter(e.target.value.toLowerCase());
  };

  const deleteContact = (contactId) => {
    setContacts((prevState) =>
      prevState.filter((contact) => contact.id !== contactId)
    );
  };

  return (
    <>
      <Section title='Телефонна книга'>
        <ContactsForm handleSubmit={handleSubmit} />
      </Section>
      <Section title='Контакти'>
        <Contacts
          contacts={filteredContacts}
          onChange={filterOnChange}
          value={filter}
          onClick={deleteContact}
        />
      </Section>
    </>
  );
}

export default App;

// export default class App extends Component {

//   state = {
//     contacts: [
//       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
//       { id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
//       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' }
//     ],
//     filter: ''
//   }
//   componentDidMount() {
//     const getContacts = JSON.parse(localStorage.getItem('contacts'));
//     if (getContacts) {
//       this.setState({
//         contacts: getContacts,
//       })
//     } 
//   }

//   componentDidUpdate(prevState) {
//     const { contacts: prevContacts } = prevState;
//     const { contacts: nextContacts } = this.state;    
//       if (prevContacts !== nextContacts) {
//         localStorage.setItem('contacts',  JSON.stringify(nextContacts))
//       }
//   }

//   handleSubmit = (values, { resetForm }) => {
//     resetForm();

//     const existingContact = this.state.contacts.find(
//       contact => contact.name.toLowerCase() === values.name.toLowerCase()
//     );

//     if (existingContact) {
//       alert(`${values.name} is already in contacts`);
//     } else {
//       const newContact = {
//         id: nanoid(),
//         name: values.name,
//         number: values.number
//       };

//       this.setState(prevState => ({
//         contacts: [...prevState.contacts, newContact]
//       }));
//     }
//     };

//   filterOnChange = e => {
//     this.setState({
//       filter: e.target.value.toLowerCase()     
//     })
//   }

//   filteredContacts = () => {
//     return this.state.contacts.filter(contact =>
//       contact.name.toLowerCase().includes(this.state.filter)
//     );
//   };

//   deleteContact = contactId => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== contactId),
//     }));
//   };


//   render() {
//     return (
//       <>
//         <Section
//           title='Phonebook'
//         >
//           <ContactsForm
//             handleSubmit={this.handleSubmit}
//           />
//         </Section>
//         <Section
//           title='Contacts'
//         >
//           <Contacts
//             contacts={this.filteredContacts()}
//             onChange={this.filterOnChange}
//             value={this.state.filter}
//             onClick={this.deleteContact}
//           />
//         </Section>
//       </>
//     )
//   }
// }
