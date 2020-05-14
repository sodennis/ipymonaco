var plugin = require('./index');
var base = require('@jupyter-widgets/base');

module.exports = {
  id: 'ipymonaco',
  requires: [base.IJupyterWidgetRegistry],
  activate: function(app, widgets) {
      widgets.registerWidget({
          name: 'ipymonaco',
          version: plugin.version,
          exports: plugin
      });
  },
  autoStart: true
};

