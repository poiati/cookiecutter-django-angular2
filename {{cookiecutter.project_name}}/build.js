var Builder = require('systemjs-builder');
var ANGULAR_PROJECT_DIR = 'angular';

function getPath() {
  var path = [ANGULAR_PROJECT_DIR];
  Array.prototype.slice.call(arguments).forEach(function(dirName) {
    path.push(dirName);
  });
  return path.join('/');
}

function onError(err) {
  console.log('Build error');
  console.log(err);
}

function onSuccess(msg) {
  return function() {
    console.log(msg);
  }
}

var builder = new Builder(getPath(), getPath('config.js'));

builder
  .buildStatic(
    'es6-shim/es6-shim.js + zone.js/dist/zone.js + reflect-metadata/Reflect.js',
    getPath('bundles', 'libraries.js')
  )
  .then(onSuccess('Libraries build complete'))
  .catch(onError);

builder
  .bundle(
    'app/**/* - app/**/*.jade! - [app/**/*]',
    getPath('bundles', 'systemjs-libraries.js')
  )
  .then(onSuccess('Systemjs libraries build complete'))
  .catch(onError);
// builder
//   .buildStatic(
//     'styles', 
//     'public/bundles/vendors-styles.js'
//   )
//   .then(onSuccess('Vendors styles build complete'))
//   .catch(onError);
//   .then(onSuccess('Vendors dependencies build complete'))
//   .catch(onError);

