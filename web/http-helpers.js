var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var http = require('http-get');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};



exports.serveAssets = function(res, asset) {
  res.end(fs.readFileSync(asset));

  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...), css, or anything that doesn't change often.)
};

// As you progress, keep thinking about what helper functions you can put here!
exports.getHtml = function(url) {
  http.get(url, function(err, res){
    if(err){
      console.error(err);
      return;
    }
    var data = res.buffer.toString();
    fs.writeFile(archive.paths.archivedSites + '/' + url, data, function(err) {
      if(err) throw err;
    });
  });
};

exports.getUrls = function(urls) {

  var urlsToGet = [];

  for (var i = 0; i < urls.length; i++) {
    if(!archive.isURLArchived(urls[i])){
      urlsToGet.push(urls[i]);
    }
  }
  archive.downloadUrls(urlsToGet);
};
