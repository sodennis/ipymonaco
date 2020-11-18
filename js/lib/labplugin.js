var base = require('@jupyter-widgets/base');
var plugin = require('./index');

module.exports = {
  id: 'jupyter.extensions.ipymonaco',
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

