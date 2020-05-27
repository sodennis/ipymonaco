import ipywidgets as widgets
from traitlets import Unicode, Bool, Integer, List

# See js/lib/monaco.js for the frontend counterpart to this file.

@widgets.register
class Monaco(widgets.DOMWidget):
    # Name of the widget view class in front-end
    _view_name = Unicode('MonacoView').tag(sync=True)

    # Name of the widget model class in front-end
    _model_name = Unicode('MonacoModel').tag(sync=True)

    # Name of the front-end module containing widget view
    _view_module = Unicode('ipymonaco').tag(sync=True)

    # Name of the front-end module containing widget model
    _model_module = Unicode('ipymonaco').tag(sync=True)

    # Version of the front-end module containing widget view
    _view_module_version = Unicode('^0.0.18').tag(sync=True)
    # Version of the front-end module containing widget model
    _model_module_version = Unicode('^0.0.18').tag(sync=True)

    # Widget specific property.
    # Widget properties are defined as traitlets. Any property tagged with `sync=True`
    # is automatically synced to the frontend *any* time it changes in Python.
    # It is synced back to Python from the frontend *any* time the model is touched.

    # The value of the current model attached to this editor.
    # https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.istandaloneeditorconstructionoptions.html#value
    value = Unicode('', help="The value of the current model attached to this editor.").tag(sync=True)

    # Initial theme to be used for rendering. The current out-of-the-box available themes are: 'vs' (default), 'vs-dark', 'hc-black'.
    # https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.istandaloneeditorconstructionoptions.html#theme
    theme = Unicode('', help="Initial theme to be used for rendering. The current out-of-the-box available themes are: 'vs' (default), 'vs-dark', 'hc-black'.").tag(sync=True)

    # The initial language of the auto created model in the editor. To not create automatically a model, use model: null.
    # https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.istandaloneeditorconstructionoptions.html#language
    language = Unicode('', help="The initial language of the auto created model in the editor. To not create automatically a model, use model: null.").tag(sync=True)

    # The initial editor height (to avoid measuring the container).
    # https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.istandaloneeditorconstructionoptions.html#dimension
    height = Integer(300, help="The initial editor height (to avoid measuring the container).").tag(sync=True)

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
