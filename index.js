const express = require('express');
const app = express();
const cors_origin = require('cors');
const body_parse = require('body-parser');
app.listen(5000, () => console.log('listening on port'))
app.use(cors_origin())
app.use(body_parse.json({ limit: '10mb' }));
// app.use(fileUpload())
const read_directory = require('fs');
// connect_db();
read_directory.readdir('./routers', (err, res) => {
    if (err) {
        console.log(err)
    } else {
        res.map((rs) => app.use('/api', require('./routers/' + rs)))
    }
})