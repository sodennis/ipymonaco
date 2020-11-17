var monaco = require('monaco-editor');
var widgets = require('@jupyter-widgets/base');
var _ = require('lodash');

// See monaco.py for the kernel counterpart to this file.

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
        _model_name: 'MonacoModel',
        _view_name: 'MonacoView',
        _model_module: 'ipymonaco',
        _view_module: 'ipymonaco',
        _model_module_version: '0.0.21',
        _view_module_version: '0.0.21',
        value: '',
        diffvalue: '',
        theme: '',
        language: '',
        height: 300,
        readOnly: false,
        rulers: [],
        useTabStops: false,
        wordWrap: 'off',
        wordWrapColumn: 80,
        _keyup_handlers_present: false,
        _keydown_handlers_present: false,
    })
});


// Custom View. Renders the widget model.
var MonacoView = widgets.DOMWidgetView.extend({
    // Defines how the widget gets rendered into the DOM
    render: function () {
        this.container_input = document.createElement('div');
        this.container_input.setAttribute("id", "container");
        this.container_input.setAttribute("style", "height: " + this.model.get('height') + "px;");

        this.el.appendChild(this.container_input);
    },

    initializeEditor: function () {
        console.log('loaded monaco');

        if (document.body.getAttribute("data-jp-theme-light") === "false") {
            this.model.set("theme", "vs-dark");
        }

        if (this.model.get("diffvalue")){
            this.createDiffEditor()
        } else {
            this.createEditor();
        }

        // Python -> JavaScript update
        this.model.on('change:value', this.value_changed, this);
        this.model.on('change:diffvalue', this.diffvalue_changed, this);
        this.model.on('change:language', this.language_changed, this);
        this.model.on('change:theme', this.theme_changed, this);
        this.model.on('change:readOnly', this.readOnly_changed, this);
        this.model.on('change:rulers', this.rulers_changed, this);
        this.model.on('change:useTabStops', this.useTabStops_changed, this);
        this.model.on('change:wordWrap', this.wordWrap_changed, this);
        this.model.on('change:wordWrapColumn', this.wordWrapColumn_changed, this);
    },

    sendEventKeyup: function(e) {
        if (this.model.get("_keyup_handlers_present")){
            this.send({event: "keyup", value: e});
        }
    },

    sendEventKeydown: function(e) {
        if (this.model.get("_keydown_handlers_present")){
            this.send({event: "keydown", value: e});
        }
    },

    createEditor: function () {
        if (this.codeEditor) { this.codeEditor.dispose(); }

        this.codeEditor = monaco.editor.create(this.container_input,
            {
                language: this.model.get('language'),
                theme: this.model.get('theme'),
                value: this.model.get('value'),
                readOnly: this.model.get('readOnly'),
                rulers: this.model.get('rulers'),
                useTabStops: this.model.get('useTabStops'),
                wordWrap: this.model.get('wordWrap'),
                wordWrapColumn: this.model.get('wordWrapColumn'),
            });

        this.codeEditor.onKeyUp(this.sendEventKeyup.bind(this));
        this.codeEditor.onKeyDown(this.sendEventKeydown.bind(this));

        // JavaScript -> Python update
        let textModel = this.codeEditor.getModel();
        this.textModel = textModel;
        textModel.onDidChangeContent((event) => {
            this.model.set('value', textModel.getValue());
            this.model.save_changes();
        });

        this.modifiedTextModel = undefined;
    },

    createDiffEditor: function () {
        if (this.codeEditor) { this.codeEditor.dispose(); }
        this.codeEditor = monaco.editor.createDiffEditor(this.container_input,
            {
                language: this.model.get('language'),
                theme: this.model.get('theme'),
                original: this.model.get('value'),
                modified: this.model.get('diffvalue'),
                readOnly: this.model.get('readOnly'),
                rulers: this.model.get('rulers'),
                useTabStops: this.model.get('useTabStops'),
                wordWrap: this.model.get('wordWrap'),
                wordWrapColumn: this.model.get('wordWrapColumn'),
            });

        this.codeEditor.onKeyUp(this.sendEventKeyup.bind(this));
        this.codeEditor.onKeyDown(this.sendEventKeydown.bind(this));
    
        this.codeEditor.setModel({
            original: monaco.editor.createModel(this.model.get('value'), this.model.get('language')),
            modified: monaco.editor.createModel(this.model.get('diffvalue'), this.model.get('language'))
        });

        // JavaScript -> Python update : value
        let originalModel = this.codeEditor.getModel().original;
        this.textModel = originalModel;
        originalModel.onDidChangeContent((event) => {
            this.model.set('value', originalModel.getValue());
            this.model.save_changes();
        });

        // JavaScript -> Python update : diffvalue
        let modifiedModel = this.codeEditor.getModel().modified;
        this.modifiedTextModel = modifiedModel
        modifiedModel.onDidChangeContent((event) => {
            this.model.set('diffvalue', modifiedModel.getValue());
            this.model.save_changes();
        });
    },

    value_changed: function () {
        this.textModel.setValue(this.model.get('value'));
    },


    diffvalue_changed: function() {
        if (this.modifiedTextModel === undefined) {
            // existing is not a diff editor
            this.createDiffEditor();
        } else {
            if (this.model.get('diffvalue') === ''){
                // existing is diff editor, but new is not
                this.createEditor();
            } else {
                this.modifiedTextModel.setValue(this.model.get('diffvalue'));
            }
        }
    },

    language_changed: function() {
        this.codeEditor.updateOptions({language: this.model.get('language')});
    },

    theme_changed: function() {
        this.codeEditor.updateOptions({theme: this.model.get('theme')});
    },

    readOnly_changed: function() {
        this.codeEditor.updateOptions({readOnly: this.model.get('readOnly')});
    },

    rulers_changed: function() {
        this.codeEditor.updateOptions({rulers: this.model.get('rulers')});
    },

    useTabStops_changed: function() {
        this.codeEditor.updateOptions({useTabStops: this.model.get('useTabStops')});
    },

    wordWrap_changed: function() {
        this.codeEditor.updateOptions({wordWrap: this.model.get('wordWrap')});
    },

    wordWrapColumn_changed: function() {
        this.codeEditor.updateOptions({wordWrapColumn: this.model.get('wordWrapColumn')});
    },

    processPhosphorMessage: function (msg) {
        widgets.DOMWidgetView.prototype.processPhosphorMessage.call(this, msg);
        switch (msg.type) {
            case 'after-attach':
                this.initializeEditor();
            case 'after-show':
                if (this.codeEditor !== undefined) {
                    this.codeEditor.layout();  // Reinitialize the editor's layout
                }
                break;
        }
    },

    processLuminoMessage: function (msg) {
        widgets.DOMWidgetView.prototype.processLuminoMessage.call(this, msg);
        switch (msg.type) {
            case 'after-attach':
                this.initializeEditor();
            case 'after-show':
                if (this.codeEditor !== undefined) {
                    this.codeEditor.layout();  // Reinitialize the editor's layout
                }
                break;
        }
    },
});


module.exports = {
    MonacoModel: MonacoModel,
    MonacoView: MonacoView
};
