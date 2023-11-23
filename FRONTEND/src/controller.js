import { view } from "./view/view.js";
import { Usuario } from "./model/usuario.model.js";
import { usersService } from "./api/users.service.js";

let users = [];
const nullUser = new Usuario("", null, "", "");
const submitType = { NEW: 0, UPDATE: 1 };
let submitState = submitType.NEW;
let currentId = null;

const loadData = async () => {
  const temp = await usersService.carregarDados();

  users = temp.map(
    (usuario) =>
      new Usuario(usuario.nome, usuario.idade, usuario.login, usuario.senha)
  );

  view.update(users, nullUser);
};

const getFormInputs = () => {
   return new Usuario(nome.value, idade.value, login.value, senha.value);
}

const handleSubmit = (event) => {
  event.preventDefault();
  const user = getFormInputs;
  if (submitState == submitType.NEW) {
    addUser(user);
  } else if (submitState == submitType.UPDATE) {
    updateUser(currentId, user);
    submitState = submitType.NEW;
    btnSub.innerText = "Salvar";
  }
  view.update(users, nullUser);
};

const addUser = (newUser) => {
  users.push(newUser);
  usersService.salvarDados(users);
};

const updateUser = (index, userToUpdate) => {
  users[index] = userToUpdate;
};

const deletUser = (index) => {
  users.splice(index, 1);
};

const setEvents = () => {
  const form = document.getElementById("signForm");
  form.addEventListener("submit", handleSubmit);
  const userList = document.getElementById("users-result");
  userList.addEventListener("click", handleClick);
  userList.addEventListener("contextmenu", handleClick);
};

const handleClick = (event) => {
  currentId = event.target.closest("tr").id.split("")[4];
  if ((event, type == "click")) {
    let confirm = window.confirm(
      "O usuário selecionado será carregado para edição!"
    );
    if (confirm) {
      view.updateForm(users[currentId]);
      submitState = submitType.UPDATE;
      btnSub.innerText = "Update";
    }
  } else if ((event, type == "contextmenu")) {
    event.preventDefault();
    if (event.button == 2) {
      currentId = event.target.closest("tr").id.split("")[4];
      alert(`O ${users[currentId].getNome().toUpperCase()} será deletado!`);

      let confirm = window.confirm("Certeza que quer deletar esse usuário?");

      if (confirm) {
        deletUser(currentId);
        view.update(users, nullUser);
      }
    }
  }
};

const controller = {
  run: () => {
    view.render();
    setEvents();
    window.onload = () => {
      loadData();
    };
  },
};

export { controller };
