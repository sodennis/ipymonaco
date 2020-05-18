ipymonaco
=========

This Jupyter notebook renders Microsoft's Monaco text editor as a ipywidget widget.

Compatibilities 
---------------
ipymonaco is tested on the following platforms.

| Platforms                         | Kernel                         | Link                                                         |
| --------------------------------- | ------------------------------ | ------------------------------------------------------------ |
| Kaggle Kernel [JupyterLab 1.2.10] | python==3.7.6, ipython==7.13.0 |                                                              |
| Classic Notebook 6.0.3            | python==3.7.6, ipython==7.11.1 | [![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gist/sodennis/5f7c4d9d3f1c871ad383c1e72f08c23c/master?filepath=ipymonaco.ipynb) |
| JupyterLab 1.2.6                  | python==3.7.6, ipython==7.11.1 | [![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gist/sodennis/5f7c4d9d3f1c871ad383c1e72f08c23c/master?urlpath=lab/tree/ipymonaco.ipynb) |

ipymonaco does not work on:

| Platforms                | Kernel |
| ------------------------ | ------ |
| Google Colab             | N/A    |
| Microsoft Azure Notebook | N/A    |

The platforms above does not allow custom ipywidgets to execute.



Installation
------------

To install use pip:

    $ pip install ipymonaco
    $ jupyter nbextension enable --py --sys-prefix ipymonaco

To install for jupyterlab

    $ jupyter labextension install ipymonaco

For a development installation (requires npm),

    $ git clone https://github.com/dennisso/ipymonaco.git
    $ cd ipymonaco
    $ pip install -e .
    $ jupyter nbextension install --py --symlink --sys-prefix ipymonaco
    $ jupyter nbextension enable --py --sys-prefix ipymonaco
    $ jupyter labextension install js

When actively developing your extension, build Jupyter Lab with the command:

    $ jupyter lab --watch

This take a minute or so to get started, but then allows you to hot-reload your javascript extension.
To see a change, save your javascript, watch the terminal for an update.

Note on first `jupyter lab --watch`, you may need to touch a file to get Jupyter Lab to open.

