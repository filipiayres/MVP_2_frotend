// Função para buscar e renderizar a lista de pacientes
function fetchAndRenderPacientes() {
  
  $.ajax({
    url: 'http://localhost:5000/pacientes',
    method: 'GET',
    success: function (pacientes) {
      // // Limpe a tabela
      $('#table-body').empty();
  
      $.each(pacientes, function (index, paciente) {
        $('#table-body').append(`
          <tr>
            <td>${paciente.nome}</td>
            <td>${paciente.cpf}</td>
            <td>${paciente.cep}</td>
            <td>${paciente.bairro}</td>
            <td>${paciente.rua}</td>
            <td>
              <button class="btn btn-sm btn-info" onclick="editPaciente(${paciente.id})">Editar</button>
              <button class="btn btn-sm btn-danger" onclick="deletePaciente(${paciente.id})">Excluir</button>
            </td>
          </tr>
        `);
      });
      
    },
    error: function (error) {
      console.error('Erro ao buscar pacientes:', error);
    }
  });
}

// Função para adicionar um novo paciente
function adicionarPaciente() {
  const pacienteNome = $('#pacienteNome').val();
  const pacienteCPF = $('#pacienteCPF').val();
  const pacienteCEP = $('#pacienteCEP').val();
  const pacienteBairro = $('#pacienteBairro').val();
  const pacienteRua = $('#pacienteRua').val();

  $.ajax({
    url: 'http://127.0.0.1:5000/pacientes',
    method: 'POST',
    contentType: "application/json",
    dataType: "json",
    data: JSON.stringify({
      nome: pacienteNome,
      cpf: pacienteCPF,
      cep: pacienteCEP,
      bairro: pacienteBairro,
      rua: pacienteRua,
    }),
    success: function (data) {
      $('#pacienteNome').val('');
      $('#pacienteCPF').val('');
      $('#pacienteCEP').val('');
      $('#pacienteBairro').val('');
      $('#pacienteRua').val('');
      fetchAndRenderPacientes();
    },
    error: function (error) {
      console.error('Erro ao adicionar paciente:', error);
    }
  });
}

function deletePaciente(pacienteId) {
    $.ajax({
      url: `http://localhost:5000/pacientes/${pacienteId}`,
      method: 'DELETE',
      success: function () {
        fetchAndRenderPacientes();
      },
      error: function (error) {
        console.error('Erro ao adicionar paciente:', error);
      }
    });

}

function atualizarPaciente(pacienteId) {

  const pacienteNome = $('#pacienteNome').val();
  const pacienteCPF = $('#pacienteCPF').val();
  const pacienteCEP = $('#pacienteCEP').val();
  const pacienteBairro = $('#pacienteBairro').val();
  const pacienteRua = $('#pacienteRua').val();


  $.ajax({
    url: `http://127.0.0.1:5000/pacientes/${pacienteId}`,
    method: 'PUT',
    contentType: "application/json",
    dataType: "json",
    data: JSON.stringify({
      nome: pacienteNome,
      cpf: pacienteCPF,
      cep: pacienteCEP,
      bairro: pacienteBairro,
      rua: pacienteRua,
    }),
    success: function (data) {
      $('#pacienteNome').val('');
      $('#pacienteCPF').val('');
      $('#pacienteCEP').val('');
      $('#pacienteBairro').val('');
      $('#pacienteRua').val('');
      fetchAndRenderPacientes();
    },
    error: function (error) {
      console.error('Erro ao adicionar paciente:', error);
    }
  });

}

function editPaciente(pacienteId) {
  $("#modal").modal();
  document.getElementById("savePaciente").onclick = function() { atualizarPaciente(pacienteId); }
  $.ajax({
    url: `http://localhost:5000/pacientes/${pacienteId}`,
    method: 'GET',
    success: function (paciente) {
      $('#pacienteNome').val(paciente.nome);
      $('#pacienteCPF').val(paciente.cpf);
      $('#pacienteCEP').val(paciente.cep);
      $('#pacienteBairro').val(paciente.bairro);
      $('#pacienteRua').val(paciente.rua);
    },
    error: function (error) {
      console.error('Erro ao buscar pacientes:', error);
    }
  });


}

// Função para preenchimendo automático do enredeço a partir do CEP informado.
function getEndereco(cep) {
  $.ajax({
    url: `https://viacep.com.br/ws/${cep.value}/json/`,
    method: 'GET',
    success: function (endereco) {
      $('#pacienteBairro').val(endereco.bairro);
      $('#pacienteRua').val(endereco.logradouro);
    },
    error: function (error) {
      console.error('Erro ao adicionar paciente:', error);
    }
  });
}