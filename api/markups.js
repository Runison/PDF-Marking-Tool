const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json());

// Save markups
app.post('/api/markups/:projectId', (req, res) => {
    const { projectId } = req.params;
    const markups = req.body;

    const filePath = `projects/${projectId}/markups.json`;
    fs.writeFileSync(filePath, JSON.stringify(markups, null, 2));

    res.json({ message: 'Markups saved.' });
});

// Load markups
app.get('/api/markups/:projectId', (req, res) => {
    const { projectId } = req.params;
    const filePath = `projects/${projectId}/markups.json`;

    if (!fs.existsSync(filePath)) {
        return res.status(404).send('No markups found.');
    }

    const markups = fs.readFileSync(filePath, 'utf8');
    res.json(JSON.parse(markups));
});

module.exports = app;

