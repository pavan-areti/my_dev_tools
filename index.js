import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
const app = express();

// display index.html for / route
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => {
  res.sendFile(__dirname+'/index.html');
});

app.get('/server-redirect', (req, res) => {
    res.redirect('redirect-chain-1');
});

app.get('/redirect-chain-1', (req, res) => {
    res.redirect('redirect-chain-2');
});

app.get('/redirect-chain-2', (req, res) => {
    res.redirect("https://www.google.com");
});

app.get('/client-redirect',(req,res)=>{
    res.sendFile(__dirname+'/client-redirect.html');
});

app.get('/meta-redirect',(req,res)=>{
    res.sendFile(__dirname+'/meta-redirect.html');
});

var port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Example app listening on port 3000!');
});

export default app;