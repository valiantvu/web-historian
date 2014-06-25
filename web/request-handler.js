var path = require('path');
var archive = require('../helpers/archive-helpers');
var headers = require('./http-helpers').headers;
var serveAssets = require('./http-helpers').serveAssets;
// require more modules/folders here!



exports.handleRequest = function (req, res) {
  var statusCode;
  if(req.method === 'GET'){
    statusCode = 200;
    res.writeHead(statusCode, headers);

    serveAssets(res, archive.paths.indexPath);
    // res.end();
  }
  // res.end(archive.paths.list);
};
