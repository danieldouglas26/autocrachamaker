import Swal from 'sweetalert2'

//function exibirAlerta(mensagem) {
//    Swal.fire('Alerta', mensagem, 'info');
//}

function exibirAlerta(titulo, mensagem) {
    Swal.fire(titulo, mensagem, 'warning');
}

export default exibirAlerta;