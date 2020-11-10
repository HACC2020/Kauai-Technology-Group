# HACC 2020 - UH Occupancy Visualizations
Visualizing room occupancy on the UH Manoa campus through the use of unique WiFi connections.

## Demo

![Demo gif](./output.gif)

## Architecture/Discussion

## Running the web-app

### Docker Configurations

### API Endpoints

## Running the Jupyter Notebooks:
An easy way to start with data science notebooks are provided [by Jupyter](https://github.com/jupyter/docker-stacks). In this directory, run:

```
docker build -t uh_density
docker run --rm -p 8888:8888 -e JUPYTER_ENABLE_LAB=yes -v $PWD:/home/jovyan/work uh_density:latest
```

The terminal will provide a URL to access through your browser.

---

## FAQ
* Why React?

* Why the full blown SQL database?

* Why use MapBox, as opposed to another platform like Google Maps or Leaflet?

* Are there any interesting characteristics shown in the data?

