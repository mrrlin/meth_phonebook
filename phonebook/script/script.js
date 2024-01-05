'use strict';

const {
  modalControl,
  hoverRow,
  // sortRows,
  deleteControl,
  formControl,
  sortControl,
  // loadContactsFromStorage,
} = require('./modules/control');

const {
  renderPhoneBook,
  renderContacts,
} = require('./modules/render');

const {
  getContactData,
} = require('./modules/serviceStorage');

{
  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);
    const data = getContactData();

    const {
      thead,
      list,
      logo,
      btnAdd,
      btnDel,
      formOverlay,
      form,
    } = renderPhoneBook(app, title);

    // Функционал
    // const contacts = getContactData();
    // const allRow = renderContacts(list, contacts);
    const allRow = renderContacts(list, data);
    renderContacts(list, data);
    const {closeModal} = modalControl(btnAdd, formOverlay);

    hoverRow(allRow, logo);
    deleteControl(btnDel, list);
    formControl(form, list, closeModal);
    sortControl(thead);
  };

  window.phonebookInit = init;
}
