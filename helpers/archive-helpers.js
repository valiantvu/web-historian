var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var archive = require('../helpers/archive-helpers');
var http = require('../web/http-helpers');
/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt'),
  'indexPath': path.join(__dirname, '../web/public/index.html'),
  'loadingPath': path.join(__dirname, '../web/public/loading.html'),
  'css': path.join(__dirname, '../web/public/styles.css')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!
exports.readListOfUrls = function(callback){
  var resultArray;
  fs.readFile(exports.paths.list, function(err, data) {
    if (err) throw err;
    resultArray = data.toString().split('\n');
    callback(resultArray);
  });
};

exports.isUrlInList = function(url){
  if(fs.readFileSync(exports.paths.list).toString().indexOf(url) === -1){
    return false;
  }
  return true;
};

exports.addUrlToList = function(url){
  fs.appendFile(archive.paths.list, url + "\n");
};

exports.isURLArchived = function(pathName){
  return fs.existsSync(exports.paths.archivedSites + '/' + pathName);
};

exports.downloadUrls = function(urls){
  for (var i = 0; i < urls.length; i++){
    var url = urls[i];
    http.getHtml(url);
  }
};
