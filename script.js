"use strict";

const openModal = () =>
  document.getElementById("modalCadastro").classList.add("active");
const closeModal = () =>
  document.getElementById("modalCadastro").classList.remove("active");

const cancelCadatro = () => {
  closeModal();
};

document.getElementById("cadastrarLivro").addEventListener("click", openModal);
document.getElementById("closeNovoLivro").addEventListener("click", closeModal);
document.getElementById("cancelCadastro").addEventListener('click',cancelCadatro)
