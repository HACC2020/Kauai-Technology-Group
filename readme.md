# HACC 2020 - UH Occupancy Visualizations
Visualizing room occupancy on the UH Manoa campus through the use of unique WiFi connections.

## Demo

[Link to Demo](https://hacc.kauaitechgroup.com)

![Demo gif](./output.gif)

**Note to judges and onlookers:** The largest remaining bug fix is the appearance of the app, which will be fixed now until the presentation.

## Overview

![Overview](./hacc-overview.jpg)

## Running the web-app
Clone the repository:
```
git clone https://github.com/HACC2020/Kauai-Technology-Group.git
```
To run the application, you'll need to sign up for a [Mapbox API token](https://docs.mapbox.com/help/how-mapbox-works/access-tokens/) (it's free). Environment variables are used to protect the key during production, both React and Docker make this convenient:

1. Create environment variables for the API URL and Mapbox access Token:
```
#filename - web-app/heatmap/src/.env
REACT_APP_BACKEND_API=http://127.0.0.1:3001/v1
REACT_APP_MapboxAccessToken=<your_access_token>
```
For an example of that in action, see `web-app/heatmap/src/app.js`. Environment variables need to be prepended with `REACT_APP_`.

2. Create environment variables for the database:
```
#filename - web-app/.env
PGUSER=postgres
PGHOST=postgres
PGDATABASE=postgres
PGPASSWORD=<your_great_password>
PGPORT=5432
```

To start up the development containers for hot-reloading:
```
cd web-app
docker-compose up --build
```

To start up the production containers:
```
cd web-app
docker-compose -f docker-compose.pro.yml up --build
```

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
* Why the full blown SQL database?

The first prototype included the full provided dataset in the compiled application (~60 MB in JSON format!). This was really slow, and not a good idea. Postgres made it convenient to develop an API to query data based on timestamp, building, and device ID, without having the user download *all* the data.

* Why use Mapbox, as opposed to another platform like Google Maps or Leaflet?

Mapbox has a great hosting service for vector-tiles, which greatly improves the performance of web maps. See [the Mapbox docs for more info.](https://docs.mapbox.com/vector-tiles/reference/) Originally, the dataset was converted to GeoJSON, i.e.:
```
# json_format = {
#     "features": [
#         {
#             "type": "Feature",
#             "properties":
#                 {
#                     "device_id": "Wainani F 502",
#                     "Building": "Wainani",
#                     "Max Clients": 2.0,
#                     "Unique Clients": 2.0,
#                     "date": "2020-0824",
#                     "startTime": "1200pm",
#                     "endTime": "259pm"
#                 },
#             "geometry":
#                 {
#                     "type": "Point",
#                     "coordinates": [-157.81458181493875, 21.292468917945786] 
#                 }
#         }
#     ]
# }

```
As mentioned, this file was convenient to work with, but too large for production. Many examples from Mapbox work with [smaller datasets](https://visgl.github.io/react-map-gl/examples/heatmap), so GeoJSON is acceptable. 

* Are there any interesting characteristics shown in the data?

The slider on the web-application makes it easy to see that the Warrior Rec Center holds most of the campus occupancy throughout the day. As expected, early morning and night shifts to the dorms. Hoping to work on a graphical approach to display the time-series data before the presentation.
