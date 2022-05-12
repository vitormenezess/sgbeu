"use strict";

const openModal = () =>
  document.getElementById("modalCadastro").classList.add("active");
const closeModal = () => {
  document.getElementById("modalCadastro").classList.remove("active");
  clearFields();
};

const cancelCadatro = () => {
  closeModal();
};
const getLocalStorage = () => JSON.parse(localStorage.getItem("db_book")) ?? [];
const setLocalStorage = (dbBook) =>
  localStorage.setItem("db_book", JSON.stringify(dbBook));

//CRUD
const createBook = (book) => {
  const dbBook = getLocalStorage();
  dbBook.push(book);
  setLocalStorage(dbBook);
};
const readBook = () => getLocalStorage();

const updateBook = (index, book) => {
  const dbBook = readBook();
  dbBook[index] = book;
  setLocalStorage(dbBook);
};
const deleteBook = (index) => {
  const dbBook = readBook();
  dbBook.splice(index, 1);
  setLocalStorage(dbBook);
};
//Interação
const isValidFieldls = () => {
  return document.querySelector(".modal-form-livro").reportValidity();
};
const clearFields = () => {
  const fields = document.querySelectorAll(".modal-field-livro");
  fields.forEach((field) => (field.value = ""));
};
const createRow = (book, index) => {
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
  <td>${index}</td>
  <td>${book.nome}</td>
  <td>${book.autor}</td>
  <td>${book.isbn}</td>
  <td>${book.idEditora}</td>
  <td>
    <button type="button" class="btn" id="edit-${index}">Editar</button>
    <button type="button" class="btn" id="delete-${index}">Excluir</button>
  </td>
  `;
  document.querySelector("#tableBook>tbody").appendChild(newRow);
};
const clearTable = () => {
  const rows = document.querySelectorAll("#tableBook>tbody tr");
  rows.forEach((row) => row.parentElement.removeChild(row));
};
const updateDisplay = () => {
  const dbBook = readBook();
  clearTable();
  dbBook.forEach(createRow);
};
const fillFields = (book) => {
  document.getElementById("nome").value = book.nome;
  document.getElementById("autor").value = book.autor;
  document.getElementById("isbn").value = book.isbn;
  document.getElementById("idEditora").value = book.idEditora;
  document.getElementById("nome").dataset.index = book.index;
};
const editBook = (index) => {
  const book = readBook()[index];
  book.index = index;
  fillFields(book);
  openModal();
};
const editDelete = (event) => {
  if (event.target.type == "button") {
    const [action, index] = event.target.id.split("-");
    if (action == "edit") {
      editBook(index);
    } else {
      const book = readBook()[index];
      const response = confirm(`Desesa realmente Excluir o livro ' ${book.nome} '`);
      if (response) {
        deleteBook(index);
        updateDisplay();
      }

    }
  }
};
const saveBook = () => {
  if (isValidFieldls()) {
    const book = {
      nome: document.getElementById("nome").value,
      autor: document.getElementById("autor").value,
      isbn: document.getElementById("isbn").value,
      idEditora: document.getElementById("idEditora").value,
    };
    const index = document.getElementById("nome").dataset.index;
    if (index == "new") {
      createBook(book);
      closeModal();
      updateDisplay();
    } else {
      updateBook(index, book);
      updateDisplay();
      closeModal();
    }
  }
};

updateDisplay();
document.getElementById("cadastrarLivro").addEventListener("click", openModal);
document.getElementById("closeNovoLivro").addEventListener("click", closeModal);
document
  .getElementById("cancelCadastro")
  .addEventListener("click", cancelCadatro);
document.getElementById("save").addEventListener("click", saveBook);
document
  .querySelector("#tableBook>tbody")
  .addEventListener("click", editDelete);
