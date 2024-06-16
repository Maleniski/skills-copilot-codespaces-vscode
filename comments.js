// Create web server

// Load modules
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

// Create server
http.createServer(function(req, res) {
    // Parse request
    var parsedUrl = url.parse(req.url);
    var resource = parsedUrl.pathname;
    var resourcePath = '.' + resource;
    console.log('resourcePath: ' + resourcePath);

    // Check url
    if (resource == '/favicon.ico') {
        res.writeHead(404);
        res.end();
        return;
    }

    // Read file
    fs.readFile(resourcePath, 'utf-8', function(err, data) {
        if (err) {
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.write('<h1>404 Not Found</h1>');
            res.end();
            return;
        }

        // Write file
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
    });
}).listen(8080, function() {
    console.log('Server is running');
});