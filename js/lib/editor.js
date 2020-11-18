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
var EditorModel = widgets.DOMWidgetModel.extend({
    defaults: _.extend(widgets.DOMWidgetModel.prototype.defaults(), {
        _model_name: 'EditorModel',
        _view_name: 'EditorView',
        _model_module: 'ipymonaco',
        _view_module: 'ipymonaco',
        _model_module_version: '0.0.22',
        _view_module_version: '0.0.22',
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
var EditorView = widgets.DOMWidgetView.extend({
    // Defined editor options
    editorOptions: [
        // # Configuration options for the editor.
        // https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.iglobaleditoroptions.html
        'tabSize',
        'theme',
        // https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.idiffeditoroptions.html
        'renderSideBySide',
        // https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ieditoroptions.html
        'readOnly',
        'rulers',
        'useTabStops',
        'wordWrap',
        'wordWrapColumn',
    ],
    // Below is a list of event supported by ICodeEditor.
    // https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.icodeeditor.html
    events: [
        'onContextMenu',
        'onDidAttemptReadOnlyEdit',
        'onDidBlurEditorText',
        'onDidBlurEditorWidget',
        'onDidChangeConfiguration',
        'onDidChangeCursorPosition',
        'onDidChangeCursorSelection',
        'onDidChangeModel',
        'onDidChangeModelContent',
        'onDidChangeModelDecorations',
        'onDidChangeModelLanguage',
        'onDidChangeModelLanguageConfiguration',
        'onDidChangeModelOptions',
        'onDidContentSizeChange',
        'onDidDispose',
        'onDidFocusEditorText',
        'onDidFocusEditorWidget',
        'onDidLayoutChange',
        'onDidPaste',
        'onDidScrollChange',
        'onKeyDown',
        'onKeyUp',
        'onMouseDown',
        'onMouseLeave',
        'onMouseMove',
        'onMouseUp',
    ],

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
        // Python -> JavaScript update: editor options
        this.model.on_some_change(this.editorOptions, this.editorOptions_changed, this);
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

        // Editor
        const newOptions = {}
        for (const editorOption of this.editorOptions) {
            const option = this.model.get(editorOption);
            if (option !== undefined && option !== null) {
                newOptions[editorOption] = option;
            }
        }
        this.codeEditor = monaco.editor.create(this.container_input, newOptions);
        // TextModel
        this.editorModel = {
            original: monaco.editor.createModel(this.model.get('value'), this.model.get('language')),
        }
        this.codeEditor.setModel(this.editorModel.original);

        // JavaScript -> Python update: value
        this.editorModel.original.onDidChangeContent((event) => {
            this.model.set('value', this.editorModel.original.getValue());
            this.model.save_changes();
        });
        // JavaScript -> Python: Forwarding events
        for (let event of this.events) {
            this.codeEditor[event]((_event) => {
                this.send({'event': event, 'data': Object.assign({'editorType': 'original'}, _event)});
            });
        }
    },

    createDiffEditor: function () {
        if (this.codeEditor) { this.codeEditor.dispose(); }

        // Editor
        const newOptions = {}
        for (const editorOption of this.editorOptions) {
            const option = this.model.get(editorOption);
            if (option !== undefined && option !== null) {
                newOptions[editorOption] = option;
            }
        }
        this.codeEditor = monaco.editor.createDiffEditor(this.container_input, newOptions);

        // TextModel
        this.editorModel = {
            original: monaco.editor.createModel(this.model.get('value'), this.model.get('language')),
            modified: monaco.editor.createModel(this.model.get('diffvalue'), this.model.get('language'))
        }
        this.codeEditor.setModel(this.editorModel);

        // JavaScript -> Python update : value
        this.editorModel.original.onDidChangeContent((event) => {
            this.model.set('value', this.editorModel.original.getValue());
            this.model.save_changes();
        });

        // JavaScript -> Python update : diffvalue
        this.editorModel.modified.onDidChangeContent((event) => {
            this.model.set('diffvalue', this.editorModel.modified.getValue());
            this.model.save_changes();
        });

        // JavaScript -> Python: Forwarding events
        for (let event of this.events) {
            this.codeEditor.getModifiedEditor()[event]((_event) => {
                this.send({'event': event, 'data': Object.assign({'editorType': 'modified'}, _event)});
            });
            this.codeEditor.getOriginalEditor()[event]((_event) => {
                this.send({'event': event, 'data': Object.assign({'editorType': 'original'}, _event)});
            });
        }
    },

    value_changed: function () {
        this.editorModel.original.setValue(this.model.get('value'));
    },

    diffvalue_changed: function() {
        if (this.editorModel.modified === undefined) {
            // existing is not a diff editor
            this.createDiffEditor();
        } else {
            // If `diffvalue` is `None` on the Python-side, it is `null` on the JS-side.
            if (this.model.get('diffvalue') === null) {
                // existing is diff editor, but new is not
                this.createEditor();
            } else {
                this.editorModel.modified.setValue(this.model.get('diffvalue'));
            }
        }
    },

    language_changed: function() {
        monaco.editor.setModelLanguage(this.editorModel.original, this.model.get('language'));
        monaco.editor.setModelLanguage(this.editorModel.modified, this.model.get('language'));
    },

    editorOptions_changed: function() { 
        const newOptions = {}
        for (const editorOption of this.editorOptions) {
            const option = this.model.get(editorOption);
            if (option !== undefined && option !== null) {
                newOptions[editorOption] = option;
            }
        }
        this.codeEditor.updateOptions(newOptions);
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
    EditorModel: EditorModel,
    EditorView: EditorView
};
