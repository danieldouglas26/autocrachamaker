function makeupercase(name) {
document.getElementById(name).addEventListener('input', function () {
    this.value = this.value.toUpperCase(); // Converte para maiuscula sempre que for digitado
});
}
export default makeupercase;
