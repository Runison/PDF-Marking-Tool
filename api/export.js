const express = require('express');
const PDFDocument = require('pdf-lib').PDFDocument;
const fs = require('fs');

const app = express();

app.post('/api/export/:projectId', async (req, res) => {
    const { projectId } = req.params;
    const projectPath = `projects/${projectId}`;
    const originalPDF = `${projectPath}/original.pdf`;
    const markupsFile = `${projectPath}/markups.json`;

    if (!fs.existsSync(originalPDF) || !fs.existsSync(markupsFile)) {
        return res.status(404).send('Project or markups not found.');
    }

    const pdfBytes = fs.readFileSync(originalPDF);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const markups = JSON.parse(fs.readFileSync(markupsFile, 'utf8'));

    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    // Add markups to the first page (example: draw a rectangle)
    markups.forEach((markup) => {
        const { x, y, width, height } = markup;
        firstPage.drawRectangle({
            x,
            y,
            width,
            height,
            borderColor: rgb(1, 0, 0),
            borderWidth: 1,
        });
    });

    const exportedPDF = await pdfDoc.save();
    fs.writeFileSync(`${projectPath}/exported.pdf`, exportedPDF);

    res.download(`${projectPath}/exported.pdf`);
});

module.exports = app;
