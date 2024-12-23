const express = require('express');
const multer = require('multer');
const fs = require('fs');
const PDFDocument = require('pdfkit');
const { v4: uuidv4 } = require('uuid');

const app = express();

// Configure Multer for file uploads
const upload = multer({ dest: 'uploads/' });

app.post('/api/upload', upload.single('file'), (req, res) => {
    const { projectName } = req.body;
    const file = req.file;

    if (!file) {
        return res.status(400).send('No file uploaded.');
    }

    // Save project info
    const projectId = uuidv4();
    const projectPath = `projects/${projectId}`;
    fs.mkdirSync(projectPath, { recursive: true });
    fs.renameSync(file.path, `${projectPath}/original.pdf`);

    res.json({ message: 'File uploaded', projectId });
});

module.exports = app;