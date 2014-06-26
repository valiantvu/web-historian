var path = require('path');
var archive = require('../helpers/archive-helpers');
var headers = require('./http-helpers').headers;
var serveAssets = require('./http-helpers').serveAssets;
var url = require('url');
var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  var pathName = url.parse(req.url).pathname;
  var statusCode;
  if(req.method === 'GET'){
    if(req.url === '/'){
      statusCode = 200;
      res.writeHead(statusCode, headers);
      serveAssets(res, archive.paths.indexPath);
    }else if(pathName === "/styles.css"){
      var cssHeaders = JSON.parse(JSON.stringify(headers));
      cssHeaders['Content-Type'] = 'text/css';
      statusCode = 200;
      res.writeHead(statusCode, cssHeaders);
      serveAssets(res, archive.paths.css);
    }else if(archive.isURLArchived(pathName)){
      statusCode = 200;
      res.writeHead(statusCode, headers);
      serveAssets(res, archive.paths.archivedSites + pathName);
    }else if(!archive.isURLArchived(pathName)) {
      statusCode = 404;
      res.writeHead(statusCode, headers);
      res.end();
    }
  }else if(req.method === "POST"){
    if(req.url === '/'){
      statusCode = 302;
      req.on('data', function(url){
        var cleanUrl = url.split('=')[1] + "\n";
        res.writeHead(statusCode, headers);
        fs.appendFile(archive.paths.list, cleanUrl);
        res.end();
      });
    }
  }
};
