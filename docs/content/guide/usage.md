---
sidebarDepth: 2
---

# Usage
::: tip
If you want to play around with ipymonaco, you can use this interactive notebook

[![Binder](https://mybinder.org/badge.svg)](https://mybinder.org/v2/gh/sodennis/ipymonaco/binder-demo?filepath=ipymonaco.ipynb)
:::

## Initialization
To initialize ipymonaco, it accepts the following parameters within its constructor. The defaults
are shown below.

```python
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
```

## Parameters

### Value
`value: string, default=''`

The value within the text editor is determined by the `value` parameter.

### Theme
`theme: string, default='vs'`

There are three themes within the Monaco editor: `vs`, `vs-dark` and `hc-black`.

### Language
`language: string, default=''`

Monaco Editor supports a list of languages. You can see the list of supported langauges on this page: [https://microsoft.github.io/monaco-editor/](https://microsoft.github.io/monaco-editor/).

### Dimensions
`height: int, default=300`

The dimensions of the Monaco Editor can be specified upon initialization. You can specify the height of the text editor in `px`.

### Read Only
`readOnly: bool, default=False`

The text editor can be set to read only.

### Rulers
`rulers: [int], default=[]`

The text editor allows you to render vertical lines at the specified colums.

### Use Tab Stops
`useTabStops: bool, default=False`

If tab stops is enabled and tabs are using multiple spaces, the Monaco Editor will delete the number of spaces equivalent to a single tab.

### Word Wrap
`wordWrap: string, default='off'`

Controls the wrapping of the editor. When it is `off`, the lines will not wrap. When it is `on`, the lines will wrap at the viewport width. When it is `wordWrapColumn`, it will wrap at the column specified by `wordWrapColumn`. When it is `bounded`, it will wrap at `min(viewport width, wordWrapColumn)`.

### Word Wrap Column
`wordWrapColumn: int, default=80`
Controls the wrapping of the editor when `wordWrap` is set to `wordWrapColumn` or `bounded`.