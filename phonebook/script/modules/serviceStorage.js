export const getContactData = () => (
  localStorage.getItem('phonebook') ?
  JSON.parse(localStorage.getItem('phonebook')) : []);

const setContactData = (data) => {
  localStorage.setItem('phonebook', JSON.stringify(data));
};

const addContactData = contact => {
  const data = getContactData('phonebook');
  data.push(contact);
  setContactData(data);
};

const removeContactData = phone => {
  const data = getContactData('phonebook');
  console.log('data', data);
  const newData = data.filter(item => item.phone !== phone);
  console.log('danewDatata', newData);

  setContactData(newData);
};

export default {
  getContactData,
  addContactData,
  removeContactData,
};
