const SUBMIT_INTERVAL = 24 * 60 * 60000;
const SYNC_INTERVAL = 24 * 60 * 60000 + 1 * 60000;

const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.static('public'));
app.use(express.urlencoded());

const entries = JSON.parse(fs.readFileSync('entries.json'));
let submissions = [];

app.get('/entries', (req, res) => {
    res.send(JSON.stringify(entries));
});

app.post('/submit', (req, res) => {
    console.log(req.body);
    submissions.push(req.body.entry);
    res.redirect('/');
});

setInterval(() => {
    if (submissions.length > 0) {
        console.log('Choosing submission');
        const choice = submissions[Math.floor(Math.random() * submissions.length)];
        entries.push(choice);
        submissions = [];
    } else {
        console.log('No submissions');
    }
}, SUBMIT_INTERVAL);

setInterval(() => {
    console.log('Syncing');
    fs.writeFileSync('entries.json', JSON.stringify(entries));
}, SYNC_INTERVAL);

app.listen(8080, () => {
    console.log('Server up!');
});
