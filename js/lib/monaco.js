import * as monaco from 'monaco-editor'
var widgets = require('@jupyter-widgets/base');
var _ = require('lodash');

// See monaco.py for the kernel counterpart to this file.

// Monaco
require.config({ 
    paths: { 'vs': 'https://unpkg.com/monaco-editor@latest/min/vs' }
});
window.MonacoEnvironment = { getWorkerUrl: () => proxy };

let proxy = URL.createObjectURL(new Blob([`
    self.MonacoEnvironment = {
        baseUrl: 'https://unpkg.com/monaco-editor@latest/min/'
    };
    importScripts('https://unpkg.com/monaco-editor@latest/min/vs/base/worker/workerMain.js');
`], { type: 'text/javascript' }));

// Custom Model. Custom widgets models must at least provide default values
// for model attributes, including
//
//  - `_view_name`
//  - `_view_module`
//  - `_view_module_version`
//
//  - `_model_name`
//  - `_model_module`
//  - `_model_module_version`
//
//  when different from the base class.

// When serialiazing the entire widget state for embedding, only values that
// differ from the defaults will be specified.
var MonacoModel = widgets.DOMWidgetModel.extend({
    defaults: _.extend(widgets.DOMWidgetModel.prototype.defaults(), {
        _model_name : 'MonacoModel',
        _view_name : 'MonacoView',
        _model_module : 'ipymonaco',
        _view_module : 'ipymonaco',
        _model_module_version : '0.0.6',
        _view_module_version : '0.0.6',
        value : '',
        theme : '',
        language : '',
    })
});


// Custom View. Renders the widget model.
var MonacoView = widgets.DOMWidgetView.extend({
    // Defines how the widget gets rendered into the DOM
    render: function() {
        this.container_input = document.createElement('div');
        this.container_input.setAttribute("id", "container");
        this.container_input.setAttribute("style", "height: 300px;");
        
        this.el.appendChild(this.container_input);
        
        window.editor = monaco.editor.create(document.getElementById('container'),
        {
            language: this.model.get('language'),
            theme: this.model.get('theme'),
            value: this.model.get('value'),
        });
        
        // Python -> JavaScript update
        this.model.on('change:value', this.value_changed, this);

        // JavaScript -> Python update
        this.container_input.onchange = this.input_changed.bind(this); 
    },

    value_changed: function() {
        window.editor.setValue(this.model.get('value'));
    },

    input_changed: function() {
        this.model.set('value', window.editor.getValue());
        this.model.save_changes();
    },
});


module.exports = {
    MonacoModel: MonacoModel,
    MonacoView: MonacoView
};
