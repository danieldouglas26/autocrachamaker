import { PDFDocument } from 'pdf-lib'

//const PDFDocument = await PDFDocument.create()
//const page = pdfDoc.addPage()
//page.drawText('You can create PDFs!')
//const pdfBytes = await pdfDoc.save()


document.getElementById('download-buttonPDdF').addEventListener('click', async () => {
    async function createAndDownloadPDF() {
        //const { PDFDocument } = require('pdf-lib');

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
