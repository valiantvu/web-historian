// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.
var archive = require('../helpers/archive-helpers');
var fs = require('fs');

var urls = fs.readFileSync(archive.paths.list).toString().split('\n');
var urlsToGet = [];

for (var i = 0; i < urls.length; i++) {
  if(!archive.isURLArchived(urls[i])){
    urlsToGet.push(urls[i]);
  }
}
archive.downloadUrls(urlsToGet);
