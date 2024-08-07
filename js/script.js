//Mascara CEP
$('#InputCEP').mask('00000-000');

//Buscando o CEP
function Buscar(){
  let cep = document.getElementById("InputCEP").value;
  let url = `https://viacep.com.br/ws/${cep}/json/`;

  $.getJSON(url, (endereco) => {
    autocomplete(endereco);
  }).fail(() => {

  });
}; 

//Coloca as informações nos inputs
function autocomplete(endereco){
  //Parar de Recarregar Página
  document.getElementById("FormClientes").addEventListener("submit", (event) => {
    event.preventDefault();
  });

  document.getElementById("InputRua").value = endereco.logradouro;
  document.getElementById("InputBairro").value = endereco.bairro;
  document.getElementById("InputEstado").value = endereco.uf;
  document.getElementById("InputCity").value = endereco.localidade;
};

