# Installation

## Classic Notebook

### From terminal
If you have access to the terminal that Jupyter Classic Notebook is running on, run the following commands to install.

```bash
$ pip install ipymonaco

# if notebook < 5.3
$ jupyter nbextension enable --py --sys-prefix ipymonaco
```

### Within Jupyter Classic Notebook
You can install `ipymonaco` within the Jupyter Classic Notebook. After the installation, you need to refresh the web page to reinitialize the application.

```python
!pip install ipymonaco

# if notebook < 5.3
!jupyter nbextension enable --py --sys-prefix ipymonaco
```

## JupyterLab

### From Terminal
If you have access to the terminal that JupyterLab is running on, run the following commands to install.

```bash
$ pip install ipymonaco
$ jupyter labextension install ipymonaco

# if not already installed
$ jupyter labextension install @jupyter-widgets/jupyterlab-manager
```

### Within JupyterLab
You can install `ipymonaco` within JupyterLab. After the installation, you need to refresh the web page to reinitialize the application.

```python
# if the server has enough memory
!pip install ipymonaco=="0.0.22a"
!jupyter labextension install ipymonaco

# if the server runs out of memory while minimizing static assets.
!pip install ipymonaco=="0.0.22a"
!jupyter labextension install ipymonaco --no-build
!jupyter lab clean
!jupyter lab build --minimize=False
```
