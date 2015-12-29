'use strict';

AppUpdate.ReloadController = class ReloadController {

  constructor (settings) {
    this.reload = Package.reload.Reload;
    this.autoUpdate = Package.autoupdate.Autoupdate;
    this.hasNewUpdateBool = new ReactiveVar(false);
    this.reloadFunction = null;
    this.settings = {
      enabled: true,
      environments: {
        development: false,
        test: true,
        production: true
      }
    };
  }

  preventReload () {
    if(!this.settings.enabled) {
      return;
    }

    if(this.settings.enabled) {
      const envSettings = Meteor.settings || {};
      if(!_.isUndefined(envSettings.public) && !_.isUndefined(envSettings.public.env))
      {
        if(!this.settings.environments.development && envSettings.public.env == 'development') {
          return;
        }

        if(envSettings.public.env == 'test' && !this.settings.environments.test) {
          return;
        }

        if(!this.settings.environments.production && envSettings.public.env == 'production') {
          return;
        }
      }

      this.reload._onMigrate((retry) => {
        if (Session.get('MeteorReload-ManualReset')) {
          Session.set('MeteorReload-ManualReset', false);
          return [true,{}];
        }

        this.reloadFunction = retry;
        return false;
      });
    }
  }

  hasNewUpdate () {
    this.hasNewUpdateBool.set(this.autoUpdate.newClientAvailable());
    return this.hasNewUpdateBool.get();
  }

  manualReload () {
    Session.set('MeteorReload-ManualReset', true);

    if(this.reloadFunction && _.isFunction(this.reloadFunction)) {
      this.reloadFunction();
    }
  }
};

AppUpdate.reload = new AppUpdate.ReloadController();
