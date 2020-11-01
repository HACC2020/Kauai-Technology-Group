# HACC 2020 - UH Occupancy Visualizations
Visualizing room occupancy on the UH Manoa campus through the use of unique WiFi connections.

## Running the Jupyter Notebooks:
An easy way to start with data science notebooks are provided [by Jupyter][https://github.com/jupyter/docker-stacks]. In this directory, run:

```
docker run --rm -p 8888:8888 -e JUPYTER_ENABLE_LAB=yes -v $PWD:/home/jovyan/work jupyter/scipy-notebook:latest
```

The terminal will provide a URL to access through your browser.