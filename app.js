const express = require('express')
const bodyParser = require('body-parser');
const { exec } = require("child_process");


const app = express()
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
});


//echo user-name=zaib | radclient -x 101.11.11.255:1700 disconnect 12345
app.post('/api/user/disconnect', function (req, res) {
    var radius_username = req.body.radius_username;
    var nas_ip = req.body.nas_ip;
    var password = req.body.password;
    //console.log("echo user-name="+radius_username+" | radclient -x "+nas_ip+":1700 disconnect "+password);
    if (radius_username && nas_ip && password) {
        exec("echo user-name="+radius_username+" | radclient -x "+nas_ip+":1700 disconnect "+password, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
        });
    }

    res.send(radius_username + '&' + nas_ip);
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})