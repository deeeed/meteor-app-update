'use strict';

Template.appUpdatePrompt.onRendered(function() {
  this.find('#appupdate-container')._uihooks = {
    insertElement: function(node, next) {
      $(node)
      .insertBefore(next)
      .addClass('fadeInDown');
    }
  };
});

Template.appUpdatePrompt.helpers({
  templateName: function() {
    const settings = Meteor.settings;
    let templateName = 'defaultAppUpdatePrompt';
    if (settings.public && settings.public.appupdate && settings.public.appupdate.template) {
      templateName = settings.public.appupdate.template;
    }
    return templateName;
  },
  appHasUpdate: function() {
    return AppUpdate.reload.hasNewUpdate();
  }
});

Template.appUpdatePrompt.events({
  'click .reload': function() {
    AppUpdate.reload.manualReload();
  }
});
