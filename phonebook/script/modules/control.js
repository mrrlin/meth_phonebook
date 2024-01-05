import createElements from './createElements.js';
import serviceStorage from './serviceStorage.js';

const {
  createRow,
} = createElements;

const {
  addContactData,
  removeContactData,
} = serviceStorage;

const modalControl = (btnAdd, formOverlay) => {
  const openModal = () => {
    formOverlay.classList.add('is-visible');
  };

  const closeModal = () => {
    formOverlay.classList.remove('is-visible');
  };

  btnAdd.addEventListener('click', openModal);

  formOverlay.addEventListener('click', e => {
    const target = e.target;
    if (target === formOverlay || target.classList.contains('close')) {
      closeModal();
    }
  });

  return {
    closeModal,
  };
};

const hoverRow = (allRow, logo) => {
  const text = logo.textContent;

  allRow.forEach(contact => {
    contact.addEventListener('mouseenter', () => {
      logo.textContent = contact.phoneLink;
    });

    contact.addEventListener('mouseleave', () => {
      logo.textContent = text;
    });
  });
};

const sortRows = (index, order = 'desc') => {
  const tbody = document.querySelector('tbody');
  const rows = Array.from(tbody.querySelectorAll('tr'));
  const toggler = order === 'asc' ? -1 : 1;

  rows.sort((a, b) => {
    const nameA = a.cells[index].textContent.trim();
    const nameB = b.cells[index].textContent.trim();
    return nameA.localeCompare(nameB) * toggler;
  });

  tbody.innerHTML = '';
  rows.forEach(row => {
    tbody.appendChild(row);
  });
};

const deleteControl = (btnDel, list) => {
  btnDel.addEventListener('click', () => {
    document.querySelectorAll('.delete').forEach(del => {
      del.classList.toggle('is-visible');
    });
  });

  list.addEventListener('click', e => {
    const target = e.target;
    if (target.closest('.del-icon')) {
      target.closest('.contact').remove();
      console.log('target', target.dataset.phone);
      removeContactData(target.dataset.phone);
    }
  });
};

const addContactPage = (contact, list) => {
  list.append(createRow(contact));
};

const formControl = (form, list, closeModal) => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const newContact = Object.fromEntries(formData);
    addContactPage(newContact, list);
    addContactData(newContact);

    form.reset();
    closeModal();
  });
};

// const sortControl = (thead) => {
//   thead.addEventListener('click', e => {
//     const target = e.target;
//     if (target.classList.contains('filterable')) {
//       const order = target.dataset.currentOrder === 'desc' ? 'asc' : 'desc';
//       target.dataset.currentOrder = order;

//       const parent = target.parentNode;
//       const columns = parent.querySelectorAll('th');
//       let index;
//       for (let i = 0; i < columns.length; i++) {
//         if (target === columns[i]) {
//           index = i;
//           break;
//         }
//       }

//       setStorage('sort', {index, order});
//       sortRows();
//     }
//   });
// };

// const loadContactsFromStorage = () => {
//   const contacts = [];
//   for (let i = 0; i < localStorage.length; i++) {
//     const key = localStorage.key(i);
//     const value = getStorage(key);
//     if (value.phone) {
//       contacts.push(value);
//     }
//   }

//   return contacts;
// };

export default {
  modalControl,
  hoverRow,
  sortRows,
  deleteControl,
  formControl,
  // sortControl,
  // loadContactsFromStorage,
};
