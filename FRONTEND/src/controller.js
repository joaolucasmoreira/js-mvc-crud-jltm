import { viewController } from "./view/viewController.js";
import { Usuario } from "./model/usuario.model.js";
import { dataService } from "./api/data.service.js";

let data = [];
const submitType = { NEW: 0, UPDATE: 1 };
let submitState = submitType.NEW;
let currentId = null;

const loadData = async () => {
  const temp = await dataService.carregarDados();

  data = temp.map(
    (usuario) =>
      new Usuario(usuario.nome, usuario.idade, usuario.login, usuario.senha)
  );

  viewController.update(data, new Usuario("", null, "", ""));
};

const handleSubmit = (event) => {
  event.preventDefault();
  const user = new Usuario(nome.value, idade.value, login.value, senha.value);
  if (submitState == submitType.NEW) {
    addUser(user);
  } else if (submitState == submitType.UPDATE) {
    updateUser(currentId, user);
    submitState = submitType.NEW;
    btnSub.innerText = "Salvar";
  }
  viewController.update(data, new Usuario("", null, "", ""));
};

const addUser = (newUser) => {
  data.push(newUser);
  dataService.salvarDados(data);
};

const updateUser = (index, userToUpdate) => {
  data[index] = userToUpdate;
};

const deletUser = (index) => {
  data.splice(index, 1);
};

const clickEsquerdo = (event) => {
  currentId = event.target.closest("tr").id.split("")[4];

  let confirm = window.confirm(
    "O usuário selecionado será carregado para edição!"
  );

  if (confirm) {
    viewController.updateForm(data[currentId]);
    submitState = submitType.UPDATE;
    btnSub.innerText = "Update";
  }
};

const clickDireito = (event) => {
  event.preventDefault();
  if (event.button == 2) {
    currentId = event.target.closest("tr").id.split("")[4];
    alert(`O ${data[currentId].getNome().toUpperCase()} será deletado!`);

    let confirm = window.confirm("Certeza que quer deletar esse usuário?");

    if (confirm) {
      deletUser(currentId);
      viewController.update(data, new Usuario("", null, "", ""));
    }
  }
};
const controller = {
  iniciar: () => {
    viewController.build();
    const form = document.getElementById("signForm");
    form.addEventListener("submit", handleSubmit);
    const userList = document.getElementById("users-result");
    userList.addEventListener("click", clickEsquerdo);
    userList.addEventListener("contextmenu", clickDireito);
    window.onload = () =>{
      loadData();
    }
  },
};

export { controller };
