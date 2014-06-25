var path = require('path');
var archive = require('../helpers/archive-helpers');
var headers = require('./http-helpers').headers;
var serveAssets = require('./http-helpers').serveAssets;
var url = require('url');
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
    }else if(pathName === '/www.google.com'){
      statusCode = 200;
      res.writeHead(statusCode, headers);
      serveAssets(res, archive.paths.archivedSites + pathName);
      console.log('i got in');
    }
  }
  // res.end(archive.paths.list);
};
