import {renderPhoneBook, renderContacts} from './modules/render.js';
import {getContactData} from './modules/serviceStorage.js';
import control from './modules/control.js';

const {
  modalControl,
  hoverRow,
  // sortRows,
  deleteControl,
  formControl,
  // sortControl,
  // loadContactsFromStorage,
} = control;

{
  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);
    const data = getContactData();

    const {
      // thead,
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
    // renderContacts(list, data);
    const {closeModal} = modalControl(btnAdd, formOverlay);

    hoverRow(allRow, logo);
    deleteControl(btnDel, list);
    formControl(form, list, closeModal);
    // sortControl(thead);
  };

  window.phonebookInit = init;
}
