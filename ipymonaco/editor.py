import ipywidgets as widgets
from traitlets import Unicode, Bool, Integer, List

# See js/lib/editor.js for the frontend counterpart to this file.

@widgets.register
class Editor(widgets.DOMWidget):
    # Name of the widget view class in front-end
    _view_name = Unicode('EditorView').tag(sync=True)
    # Name of the widget model class in front-end
    _model_name = Unicode('EditorModel').tag(sync=True)
    # Name of the front-end module containing widget view
    _view_module = Unicode('ipymonaco').tag(sync=True)
    # Name of the front-end module containing widget model
    _model_module = Unicode('ipymonaco').tag(sync=True)
    # Version of the front-end module containing widget view
    _view_module_version = Unicode('^0.0.22').tag(sync=True)
    # Version of the front-end module containing widget model
    _model_module_version = Unicode('^0.0.22').tag(sync=True)

    # Widget specific property.
    # Widget properties are defined as traitlets. Any property tagged with `sync=True`
    # is automatically synced to the frontend *any* time it changes in Python.
    # It is synced back to Python from the frontend *any* time the model is touched.

    # The initial editor height (to avoid measuring the container).
    # https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.istandaloneeditorconstructionoptions.html#dimension
    height = Integer(300, help="The initial editor height (to avoid measuring the container).").tag(sync=True)

    # The value of the current model attached to this editor.
    # https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.istandaloneeditorconstructionoptions.html#value
    value = Unicode('', help="The value of the current model attached to this editor.").tag(sync=True)

    # The value against which to diff the model attached to this editor.
    # If this is `None`, then it will render the CodeEditor. If it is not `None`, it will render a DiffEditor.
    # https://microsoft.github.io/monaco-editor/api/modules/monaco.editor.html#creatediffeditor
    diffvalue = Unicode('', allow_none=True, help="The value against which to diff the model attached to this editor.").tag(sync=True)

    # The initial language of the auto created model in the editor. To not create automatically a model, use model: null.
    # https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.istandaloneeditorconstructionoptions.html#language
    language = Unicode('', help="The initial language of the auto created model in the editor. To not create automatically a model, use model: null.").tag(sync=True)

    # IGlobalEditorOptions
    # https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.iglobaleditoroptions.html

    # Initial theme to be used for rendering. The current out-of-the-box available themes are: 'vs' (default), 'vs-dark', 'hc-black'.
    # https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.istandaloneeditorconstructionoptions.html#theme
    theme = Unicode('', help="Initial theme to be used for rendering. The current out-of-the-box available themes are: 'vs' (default in Notebook, default in JupyterLab if light theme), 'vs-dark (default in JupyterLab if dark theme)', 'hc-black'.").tag(sync=True)

    # The number of spaces a tab is equal to. This setting is overridden based on the file contents when detectIndentation is on. Defaults to 4.
    # https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.iglobaleditoroptions.html#tabsize
    tabSize = Integer(4, help="The number of spaces a tab is equal to. This setting is overridden based on the file contents when detectIndentation is on. Defaults to 4.").tag(sync=True)

    # IDiffEditorOptions
    # https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.idiffeditoroptions.html

    # Render the differences in two side-by-side editors. Defaults to true.
    # https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.idiffeditoroptions.html#rendersidebyside
    renderSideBySide = Bool(True, help="Render the differences in two side-by-side editors. Defaults to true.").tag(sync=True)
    
    # IEditorOptions
    # https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ieditoroptions.html
    
    # Should the editor be read only. Defaults to false.
    # https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.istandaloneeditorconstructionoptions.html#readonly
    readOnly = Bool(False, help="Should the editor be read only. Defaults to false.").tag(sync=True)

    # Render vertical lines at the specified columns. Defaults to empty array.
    # https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.istandaloneeditorconstructionoptions.html#rulers
    rulers = List(trait=Integer, default_value=[], help="Render vertical lines at the specified columns. Defaults to empty array.").tag(sync=True)

    # Inserting and deleting whitespace follows tab stops.
    # https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.istandaloneeditorconstructionoptions.html#usetabstops
    useTabStops = Bool(False, help="Defaults to false.").tag(sync=True)

    # Control the wrapping of the editor. When wordWrap = "off", the lines will never wrap. When wordWrap = "on", the lines will wrap at the viewport width. When wordWrap = "wordWrapColumn", the lines will wrap at wordWrapColumn. When wordWrap = "bounded", the lines will wrap at min(viewport width, wordWrapColumn). Defaults to "off".
    # https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.istandaloneeditorconstructionoptions.html#wordwrap
    wordWrap = Unicode('off', help='Control the wrapping of the editor. When wordWrap = "off", the lines will never wrap. When wordWrap = "on", the lines will wrap at the viewport width. When wordWrap = "wordWrapColumn", the lines will wrap at wordWrapColumn. When wordWrap = "bounded", the lines will wrap at min(viewport width, wordWrapColumn). Defaults to "off".').tag(sync=True)

    # Control the wrapping of the editor. When wordWrap = "off", the lines will never wrap. When wordWrap = "on", the lines will wrap at the viewport width. When wordWrap = "wordWrapColumn", the lines will wrap at wordWrapColumn. When wordWrap = "bounded", the lines will wrap at min(viewport width, wordWrapColumn). Defaults to 80.
    # https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.istandaloneeditorconstructionoptions.html#wordwrapcolumn
    wordWrapColumn = Integer(80, help='Control the wrapping of the editor. When wordWrap = "off", the lines will never wrap. When wordWrap = "on", the lines will wrap at the viewport width. When wordWrap = "wordWrapColumn", the lines will wrap at wordWrapColumn. When wordWrap = "bounded", the lines will wrap at min(viewport width, wordWrapColumn). Defaults to 80.').tag(sync=True)

    # Internal use
    _keyup_handlers_present = Bool(default_value=False).tag(sync=True)
    _keydown_handlers_present = Bool(default_value=False).tag(sync=True)

    def __init__(self, *args, **kwargs):
        # Pass arguments down to the DOMWidget initialization method.
        super().__init__(*args, **kwargs)
        # Register event handler
        self.on_msg(self._handle_msg_events)

    # Event handlers
    _event_handlers = dict()
    # Below is a list of event supported by ICodeEditor.
    # https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.icodeeditor.html
    _events = [
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
    ]

    def _handle_msg_events(self, _, content, buffers):
        event_type = content.get('event', '')

        if event_type in self._event_handlers:
            self._event_handlers[event_type](**content)

    @classmethod
    def _get_events(cls):
        return cls._events

    @classmethod
    def _get_event_handlers(cls):
        return cls._event_handlers

    # Method to define an event handler pass down from the JavaScript side.
    @classmethod
    def _add_event_handler(cls, event):
        def event_handler(self, callback=None, remove=False):
            # Because of the nature of Jupyter notebooks, it is hard to remove registered methods because
            # usually the methods are redefined and hence it defines a new method
            # with a new memory address. Because of how `register_callback` works,
            # you will need to have same method with same memory address to remove it.
            # If remove is True and there is no callbacks provided, it will remove
            # all existing callbacks for this event.
            if callback is None and remove is True:
                self._event_handlers[event].callbacks.clear()

            self._event_handlers[event].register_callback(callback, remove=remove)


        event_handler.__doc__ = '''
        Event handler for {event}. If remove is True and callback is not provided,
        it will remove all registered callbacks for the registered event handler.
        {link}
        '''.format(
            event=event,
            link='https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.icodeeditor.html#{event}'.format(
                event=event.lower()
            )
        )
        event_handler.__name__ = event
        setattr(cls, event_handler.__name__, event_handler)

# After the Editor class has been defined, dynamically add
# event handlers method for the list of supported events that are pass
# down from the JavaScript side.
event_handlers = Editor._get_event_handlers()
for event in Editor._get_events():
    Editor._add_event_handler(event)
    event_handlers[event] = widgets.CallbackDispatcher()