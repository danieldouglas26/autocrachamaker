function formatCpf(cpf){
    document.getElementById(cpf).addEventListener('input', function () {
        let formattedCPF = this.value.replace(/\D/g, '');
        formattedCPF = formattedCPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        this.value = formattedCPF;
    });
}

export default formatCpf;
