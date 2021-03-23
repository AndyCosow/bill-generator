const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const html_to_pdf = require('html-pdf-node');
const path = require('path')
const rateLimit = require("express-rate-limit");
// const helmet = require("helmet");
const cors = require('cors')

const port = 3322
app.listen(port)
app.use(bodyParser.urlencoded({extended: true, limit: "1mb"}));
//app.use(helmet());
app.use(cors({origin: "http://bills.lt"}))
console.log('SERVER LISTENING TO PORT: ' + port)


// SEND STATIC
const staticLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 15 minutes
    max: 200
});
app.use(staticLimiter)

const publicPath = path.join(__dirname, 'public');
app.use('/', express.static(publicPath));

const vuePath = path.join(__dirname, '../dist');
app.use('/generatorius', express.static(vuePath));


// GENERATE BILL
const apiLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 3
});

app.post('/generate', apiLimiter, (req, res) => {
    // // Website you wish to allow to connect
    // res.setHeader('Access-Control-Allow-Origin', 'http://bills.lt/');
    //
    // // Request methods you wish to allow
    // res.setHeader('Access-Control-Allow-Methods', 'POST');

    return formPdf(req.body.html, res)
})

function formPdf(html, res) {
    let options = {format: 'A4', path: "file.pdf"};
    let file = {content: html};

    html_to_pdf.generatePdf(file, options).then(() => {
        res.download('file.pdf')
    });
}
