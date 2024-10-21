import { Recipe, createReader } from 'muhammara';
import path from 'node:path';

async function createPdfWithSignatureProof(originalPdfPath: string, signatureProofPath: string, outputPdfPath: string) {
  const pdfReader = createReader(originalPdfPath)
  const isEncrypted = pdfReader.isEncrypted()

  if (isEncrypted) {
    console.log('PDF encriptado')
  }

  const totalPages = pdfReader.getPagesCount()

  const pdfDoc = new Recipe(originalPdfPath, outputPdfPath)

  for (let page = 1; page <= totalPages; page++) {
    pdfDoc
      .editPage(page)
      .text("Add footer", 150, 800, {
        color: "#000000",
      })
      .endPage()
  }

  pdfDoc
    .appendPage(signatureProofPath)
    .endPDF();
}

const originalPdfPath = path.resolve(__dirname, 'test-two-pages-protected-with-header.pdf');
const signatureProofPath = path.resolve(__dirname, 'proof.pdf');
const outputPdfPath = path.resolve(__dirname, 'signed-document.pdf');

createPdfWithSignatureProof(originalPdfPath, signatureProofPath, outputPdfPath)
  .then(() => console.log('PDF created successfully'))
  .catch(console.error);