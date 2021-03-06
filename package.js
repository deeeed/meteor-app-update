'use strict';

Package.describe({
  'name': 'csats:appupdate',
  'summary': 'Control Meteor Hotcode push and gracefully notify the user of an update.',
  'version': '1.1.0',
  'git': 'https://github.com/csats/meteor-app-update.git'
});

Package.onUse(function(api) {

  api.versionsFrom('METEOR@1.2');
  api.use('meteor-platform');
  api.use('reactive-var');
  api.use('ecmascript');

  api.addFiles(
    [
      'lib/js/appupdate.namespace.js',
      'lib/js/classes/reloadcontroller.js',
      'lib/templates/newupdatealert/newupdatealert.html',
      'lib/templates/newupdatealert/newupdatealert.css',
      'lib/templates/newupdatealert/newupdatealert.js',
    ], ['client']);

  api.export('AppUpdate');

});
