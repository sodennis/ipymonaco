// Some static assets may be required by the custom widget javascript. The base
// url for the notebook is not known at build time and is therefore computed
// dynamically. We have to set the public path using __webpack_public_path__.
//
// We have to define this within index.js as well as extensions.js because we are built 
// monaco-editor-webpack-plugin respects the __webpack_public_path__ variable. https://github.com/microsoft/monaco-editor-webpack-plugin/pull/81


// If this ipywidget is used within JupyterLab, the body will not have the 'data-base-url' attribute.
// We also don't need to dynamic set the public path.
if (document.querySelector('body').getAttribute('data-base-url') !== null) {
    __webpack_public_path__ = document.querySelector('body').getAttribute('data-base-url') + 'nbextensions/ipymonaco' + '/';
}

// Export widget models and views, and the npm package version number.
module.exports = require('./monaco_plugin.js');
module.exports['version'] = require('../package.json').version;
