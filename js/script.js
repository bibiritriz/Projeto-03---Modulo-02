//Mascara CEP
$('#InputCEP').mask('00000-000');

//Buscando o CEP
function Buscar() {
  let cep = document.getElementById("InputCEP").value;
  let url = `https://viacep.com.br/ws/${cep}/json/`;

  $.getJSON(url, (endereco) => {
    if (endereco.bairro != null) {
      autocomplete(endereco);
      Ativar_Desativar(true, 1);
    } else {
      CEPInvalido();
    }
  });
};

//Adiciona mensagem se o CEP nao for encontrado e desativa o botao
function CEPInvalido() {
  DivCEP.innerHTML = `CEP não encontrado`;
  Ativar_Desativar(false, 1);
};

//Coloca as informações nos inputs
function autocomplete(endereco) {
  document.getElementById("InputRua").value = endereco.logradouro;
  document.getElementById("InputBairro").value = endereco.bairro;
  document.getElementById("InputEstado").value = endereco.uf;
  document.getElementById("InputCidade").value = endereco.localidade;

  Ativar_Desativar(true, 2);
};

//Array de Clientes Cadastrados
var clientes = [

];

//Verificando se o CEP tem a largura válida
function VerificarCEP() {
  let InputCEP = document.getElementById("InputCEP").value;

  if (InputCEP.length < 9) {
    DivCEP.innerHTML = `CEP Inválido`;
    Ativar_Desativar(false, 1);
    if (InputCEP.length == 0) {
      LimparERRO();
    }
  } else {
    Buscar();
  }
};

//Limpando mensagem de erro
function LimparERRO() {
  DivCEP.innerHTML = "";
};

//Salvando Clientes 
function Salvar() {
  var cliente = {
    id: clientes.length + 1,
    name: document.getElementById("InputNome").value,
    sobrenome: document.getElementById("InputSobrenome").value,
    CEP: document.getElementById("InputCEP").value,
    rua: document.getElementById("InputRua").value,
    bairro: document.getElementById("InputBairro").value,
    estado: document.getElementById("InputEstado").value,
    cidade: document.getElementById("InputCidade").value,
    numero: document.getElementById("InputNumero").value,
  };
  Ativar_Desativar(false, 2);

  addNewRow(cliente);
  clientes.push(cliente);

  document.getElementById("FormClientes").reset();
};

//Ativar/Desativar botão ou input numero
function Ativar_Desativar(kkkk, kkkk2) {
  if (kkkk2 == 1) {
    if (kkkk) {
      $("#botao").prop("disabled", false);
    } else {
      $("#botao").prop("disabled", true);
    }
  } else {
    if (kkkk) {
      $("#InputNumero").prop("disabled", false);
    } else {
      $("#InputNumero").prop("disabled", true);
    }
  }
};


loadCliente();


function loadCliente() {
  for (let cliente of clientes) {
    addNewRow(cliente);
  }
};

//Colocando Clientes na Tabela
function addNewRow(cliente) {
  var tabela = document.getElementById("TabelaClientes");

  var novaLinha = tabela.insertRow();

  var idNode = document.createTextNode(cliente.id);
  novaLinha.insertCell().appendChild(idNode);

  var nomeCompleto = cliente.name + " " + cliente.sobrenome;
  var nameNode = document.createTextNode(nomeCompleto);
  novaLinha.insertCell().appendChild(nameNode);

  var rua = cliente.rua + ", n°" + cliente.numero;
  var ruaNode = document.createTextNode(rua);
  novaLinha.insertCell().appendChild(ruaNode);

  var CEPNode = document.createTextNode(cliente.CEP);
  novaLinha.insertCell().appendChild(CEPNode);

  var bairroNode = document.createTextNode(cliente.bairro);
  novaLinha.insertCell().appendChild(bairroNode);

  var cidadeNode = document.createTextNode(cliente.cidade);
  novaLinha.insertCell().appendChild(cidadeNode);

  var estadoNode = document.createTextNode(cliente.estado);
  novaLinha.insertCell().appendChild(estadoNode);
};