const path = require('path');
const publicPath = path.join(__dirname, '../public');

const express = require('express');
let app = express();

const port = process.env.PORT || 3000;
app.use(express.static(publicPath));


app.listen(port, () => {
    console.log("App is running on port ", port);
});