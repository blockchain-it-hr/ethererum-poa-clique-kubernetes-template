const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const path = require('path');

let options = {};
console.log(`Node env is: ${process.env.NODE_ENV}`);
if(process.env.NODE_ENV === 'development'){
    options.path = path.resolve(process.cwd(), '.env.dev')
} else if(process.env.NODE_ENV === 'staging'){
    options.path = path.resolve(process.cwd(), '.env.stag')
} else {
    options.path = path.resolve(process.cwd(), '.env.prod')
}

const dotenv = require('dotenv');
dotenv.config(options);

let port = process.env.PORT || 3000;

let app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(bodyParser.json());
app.use(fileUpload());

app.use(cors());

app.use('/api/asset', require('./routes/asset'));

app.listen(port, () => {
    console.log(`The app is up on port ${port}`);
});