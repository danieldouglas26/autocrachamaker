// Lógica para criar crachá 

const roleSelect = document.getElementById('role');
const customRoleInput = document.getElementById('customRole');

roleSelect.addEventListener('change', function () {
    if (this.value === 'custom') {
        const selectContainer = this.parentNode;
        const newInput = customRoleInput.cloneNode(true);
        newInput.classList.remove('d-none');
        newInput.id = 'selectedRole';
        selectContainer.replaceChild(newInput, this);
        newInput.focus();
    } else {
        customRoleInput.classList.add('d-none');
        this.classList.remove('hidden');
    }
});

//import makeupercase from '/src/constraints/upercases.js';

//makeupercase();

document.getElementById('name').addEventListener('input', function () {
    this.value = this.value.toUpperCase(); // Converte para maiuscula sempre que for digitado
});

document.getElementById('cpf').addEventListener('input', function () {
    let formattedCPF = this.value.replace(/\D/g, '');
    formattedCPF = formattedCPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    this.value = formattedCPF;


});

document.getElementById('photo').addEventListener('change', function (event) {
    const photo = event.target.files[0];

    if (photo) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = document.getElementById('crop-image');
            img.src = e.target.result;
            img.onload = function () {
                cropper = new Cropper(img, {
                    aspectRatio: 245 / 281, // Proporção desejada
                    //aspectRatio: 1, (Com essa opção, ele não limita o tamanho do seleçaõ)
                    viewMode: 1,
                });
                document.getElementById('overlay').style.display = 'block';
                document.getElementById('crop-container').style.display = 'block';
            };
        };
        reader.readAsDataURL(photo);
    }
});
document.getElementById('crop-button').addEventListener('click', function () {
    
    var Cropper = window.Cropper;
    const canvas = cropper.getCroppedCanvas({
        width: 245,
        height: 281,
    });
    const croppedImage = new Image();
    croppedImage.onload = function () {
        cropper.destroy();
        document.getElementById('crop-container').style.display = 'none';
        document.getElementById('overlay').style.display = 'none';

        // Previa do crachá
        const name = document.getElementById('name').value;
        const role = document.getElementById('role').value;
        const cpf = document.getElementById('cpf').value;

        if (name != "" && cpf != "" && role != 0) {
            drawBadgeFront(name, role, croppedImage);
        drawBadgeBack(cpf);
        } else {
            Swal.fire({
                title: "Informe os demais campos!",
                text: "Para criar o crachá é obrigatório informar todos os campos.",
                icon: "warning"
            });
        }
        
    };
    croppedImage.src = canvas.toDataURL();
});

/*document.getElementById('makeCracha').addEventListener('submit', function (e) {
        // Previa do crachá
        const name = document.getElementById('name').value;
        const role = document.getElementById('role').value;
        const cpf = document.getElementById('cpf').value;
        drawBadgeFront(name, role, croppedImage);
        drawBadgeBack(cpf);
        croppedImage.src = canvas.toDataURL();
});*/

document.getElementById('badge-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const roleDisplay = document.getElementById('role');
    const cpf = document.getElementById('cpf').value;
    const previewImage = document.getElementById('preview');
});


document.getElementById('download-button').addEventListener('click', function () {

    const frontCanvas = document.getElementById('badge-canvas-front');
    const backCanvas = document.getElementById('badge-canvas-back');

    const name = document.getElementById('name').value;
    const role = document.getElementById('role').value;
    const cpf = document.getElementById('cpf').value;

  if (name != "" && cpf != "" && role != 0) {
    
    // Donwload da parte da frente
    const frontDataURL = frontCanvas.toDataURL('image/png');
    const frontLink = document.createElement('a');
    frontLink.href = frontDataURL;
    frontLink.download = document.getElementById('name').value + '_frente.png';

    //alert("Download em proocesso!")
    frontLink.click();


    // Download da parte de trás
    const backDataURL = backCanvas.toDataURL('image/png');
    const backLink = document.createElement('a');
    backLink.href = backDataURL;
    backLink.download = document.getElementById('name').value + '_verso.png';
    backLink.click();

Swal.fire({
    position: "middle",
    icon: "success",
    title: "Crachá gerado com sucesso!",
    showConfirmButton: false,
    timer: 1500
  });
} else {
    Swal.fire({
        icon: "warning",
        title: "Insira todos as informações antes de baixar o crachá!",
        
      });
}

    // Reseta o previw e os dados 
    document.getElementById('badge-form').reset();
    //document.getElementById('badge-canvas-front').style.display = 'none';
    //document.getElementById('badge-canvas-back').style.display = 'none';
});




document.getElementById('download-buttonPDF').addEventListener('click', async () => {
    async function createAndDownloadPDF() {
       // const { PDFDocument } = require('pdf-lib');

        // Função para criar uma página no PDF a partir de um canvas
        async function createPage(doc, canvas) {
            const imageBytes = canvas.toDataURL('image/png');
            const image = await doc.embedPng(imageBytes);
            const page = doc.addPage([canvas.width, canvas.height]);
            const { width, height } = page.getSize();
            page.drawImage(image, {
                x: 0,
                y: 0,
                width: width,
                height: height,
            });
            return doc;
        }

        const doc = await PDFDocument.create();

        // Cria a página do PDF com o crachá da frente
        const frontCanvas = document.getElementById('badge-canvas-front');
        await createPage(doc, frontCanvas);

        // Cria a página do PDF com o crachá de trás
        const backCanvas = document.getElementById('badge-canvas-back');
        await createPage(doc, backCanvas);

        // Salvar o PDF
        const pdfBytes = await doc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'crachá.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }

    // Chamada da função para criar e baixar o PDF
    await createAndDownloadPDF();
});


/*document.getElementById('download-buttonPDF').addEventListener('click', function () {
    const frontCanvas = document.getElementById('badge-canvas-front');
    const backCanvas = document.getElementById('badge-canvas-back');

    // Criar um novo documento PDF
    const pdf = new jsPDF();

    // Adicionar a parte da frente do crachá ao PDF
    const frontDataURL = frontCanvas.toDataURL('image/png');
    pdf.addImage(frontDataURL, 'PNG', 10, 10, 100, 100); // Ajuste as coordenadas e o tamanho conforme necessário

    // Adicionar a parte de trás do crachá ao PDF
    const backDataURL = backCanvas.toDataURL('image/png');
    pdf.addPage(); // Adiciona uma nova página ao PDF
    pdf.addImage(backDataURL, 'PNG', 10, 10, 100, 100); // Ajuste as coordenadas e o tamanho conforme necessário

    // Baixar o PDF
    pdf.save(document.getElementById('name').value + '_cracha.pdf');

    // Reseta o previw e os dados 
    document.getElementById('badge-form').reset();
    document.getElementById('badge-canvas-front').style.display = 'none';
    document.getElementById('badge-canvas-back').style.display = 'none';
});

*/

function drawBadgeFront(name, role, img) {
    const canvas = document.getElementById('badge-canvas-front');
    const ctx = canvas.getContext('2d');

    // Limpa o previw
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Cria a parte base do cracha, sem os dados
    const badgeBackground = new Image();
    badgeBackground.onload = function () {
        ctx.drawImage(badgeBackground, 0, 0, canvas.width, canvas.height);

        // Cria a foto selecionada
        ctx.drawImage(img, 197.5, 254.7, 245, 281);

        // Seleciona o estilo da fonte e a posição no eixo x e y da foto
        ctx.font = '50px ArialRoundedMTBold';
        ctx.fillStyle = '#000';
        ctx.textAlign = 'center';
        ctx.fillText(name, canvas.width / 2, 675);
        ctx.font = '40px "Century Gothic"';
        ctx.fillText(role, canvas.width / 2, 735);


        // Mostra o botão de donwload
        document.getElementById('badge-canvas-front').style.display = 'block';
    };
    badgeBackground.src = '/assets/background/Copy_Frente.png'; // Caminho para a imagem base da frente do crachá
}

function drawBadgeBack(cpf) {
    const canvas = document.getElementById('badge-canvas-back');
    const ctx = canvas.getContext('2d');

    // Limpa o previw
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Cria a parte base do cracha, sem os dados
    const badgeBackground = new Image();
    badgeBackground.onload = function () {
        ctx.drawImage(badgeBackground, 0, 0, canvas.width, canvas.height);

        // Seleciona o estilo da fonte e a posição no eixo x e y SOMENTE do CPF
        ctx.font = '30px ArialRoundedMTBold';
        ctx.fillStyle = '#000';
        ctx.textAlign = 'center';
        ctx.fillText(`CPF: ${cpf}`, canvas.width / 2, 882);

        // Mostra o botão de donwload
        document.getElementById('badge-canvas-back').style.display = 'block';
    };
    badgeBackground.src = '/assets/background/Copy_Verso.png'; // Caminho para a imagem base da frente do crachá
}


