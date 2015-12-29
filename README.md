# App Update for Meteor

Control Meteor Hotcode push and gracefully notify the user of an update.

## Current Version
**v1.1.0**

## Configuration

App Update uses the ``Meteor.settings.public.env`` variable to decide whether or not to intercept app updates.

The package uses the following ``env`` strings. ``production``, ``test``, or ``development``

Exmaple settings.json file:
```js
{
  "public": {
    "env": "production",
    "appupdate": {
      "template": "<your template name>"
    }
  }
}
```

Before initializing you can set any of the following settings (client only):

* ``AppUpdate.reload.settings.enabled``: **true** or false
* ``AppUpdate.reload.settings.environments.development``: true or **false**
* ``AppUpdate.reload.settings.environments.test``: **true** or false
* ``AppUpdate.reload.settings.environments.production``: **true** or false

## Usage

To initialize the AppUpdate package in the Meteor app, call the ``preventReload()`` function from a client side only block.

One suggestion is to create a javascript file in the client directory of your meteor app and add:

```js
Meteor.startup(function() {
  AppUpdate.reload.preventReload()
});
```

To prevent refreshing in a development environment:

```js
  if(Meteor.isClient) {
    AppUpdate.reload.settings.environments.development = true;
    AppUpdate.reload.preventReload();
  }
```

To notify the user when a new app update is available, simply add the template to your page:

``{{> appUpdatePrompt}}``

This will use the template you have defined in the settings.public.appupdate.template field or the default template if it was not set.

## Attribution and Acknowledgements

This package was forked and updated from the Ars Nebula package of the same name.

https://github.com/skifaster/meteor-app-update

## License

[MIT](http://choosealicense.com/licenses/mit/) - Copyright (c) 2015 [C-SATS](https://csats.com)
