import { Recipe } from 'muhammara';
import path from 'node:path';

async function createPdfWithSignatureProof(originalPdfPath: string, signatureProofPath: string, outputPdfPath: string) {
  const pdfDoc = new Recipe(originalPdfPath, outputPdfPath)

  pdfDoc
    .editPage(1)
    .text("Add some texts to an existing pdf file", 150, 300)
    .endPage()
    .appendPage(signatureProofPath)
    .endPDF();
}

const originalPdfPath = path.resolve(__dirname, 'test-protected.pdf');
const signatureProofPath = path.resolve(__dirname, 'proof.pdf');
const outputPdfPath = path.resolve(__dirname, 'signed-document.pdf');

createPdfWithSignatureProof(originalPdfPath, signatureProofPath, outputPdfPath)
  .then(() => console.log('PDF created successfully'))
  .catch(console.error);