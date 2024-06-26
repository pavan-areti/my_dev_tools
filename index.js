import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
const app = express();

// display index.html for / route
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/server-redirect', (req, res) => {
    const ssr_page_id = req.query.ssr_page_id;
    res.redirect(`redirect-chain-1?ssr_page_id=${ssr_page_id}`);
});

app.get('/redirect-chain-1', (req, res) => {
    res.redirect('redirect-chain-2');
});

app.get('/redirect-chain-2', (req, res) => {
    res.redirect("https://testsafebrowsing.appspot.com/");
});

app.get('/client-redirect', (req, res) => {
    res.sendFile(__dirname + '/client-redirect.html');
});

app.get('/meta-redirect', (req, res) => {
    res.sendFile(__dirname + '/meta-redirect.html');
});

app.get('/iframe.html', (req, res) => {
    res.sendFile(__dirname + '/iframe.html');
});

var port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Example app listening on port 3000!');
});

export default app;