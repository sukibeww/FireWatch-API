const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

//allow cross origin request
app.use(cors());

//use morgan for diagnosis logs
app.use(morgan('dev'))

//routes
app.use(require('./router/vic'))
app.use(require('./router/nsw'))


app.listen(5000, () => {
    console.log(("Listening to port 5000"))
});