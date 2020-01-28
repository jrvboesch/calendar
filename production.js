let express = require('express');

let app = express();
app.use(express.static("./"));
app.use(express.static("dist"));

app.get('*', (req, res) => {
	res.sendFile(`${__dirname}/dist/index.html`);
});

let port = 5000;
app.listen(port,function(){
	console.log('server started '+ port);
});