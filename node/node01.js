let http = require("http");

http.createServer(
    function(req, res){
        res.writeHead(200, {'Contend-type': "text/html"});
        res.end("Hello World");
    }
).listen(8080);