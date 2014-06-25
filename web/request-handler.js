var path = require('path');
var archive = require('../helpers/archive-helpers');
var headers = require('./http-helpers').headers;
var serveAssets = require('./http-helpers').serveAssets;
var url = require('url');
var fs = require('fs');
// require more modules/folders here!



exports.handleRequest = function (req, res) {
  var pathName = url.parse(req.url).pathname;
  console.log(pathName);
  var statusCode;
  if(req.method === 'GET'){
    if(req.url === '/'){
      statusCode = 200;
      res.writeHead(statusCode, headers);
      serveAssets(res, archive.paths.indexPath);
    }else if(pathName){
      statusCode = 200;
      res.writeHead(statusCode, headers);
      serveAssets(res, archive.paths.archivedSites + pathName);
    }
  }else if(req.method === "POST"){
    if(req.url === '/'){
      statusCode = 302;
      req.on('data', function(url){
        res.writeHead(statusCode, headers);
        console.log("HERE", url.split('='));
        fs.appendFile(archive.paths.list, url.split('=')[1] + "\n");
        res.end();
      });

    }
  }
  // res.end(archive.paths.list);
};
