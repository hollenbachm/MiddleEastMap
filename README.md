Middle East Conflict Event Map

An interactive geospatial dashboard for exploring conflict events across the Middle East using the Uppsala Conflict Data Program (UCDP) Georeferenced Event Dataset (GED).

This project demonstrates a lightweight workflow for transforming structured conflict event data into a browser-based map that allows users to explore actors, fatalities, locations, and source reporting.

The goal of the project was to build a simple but transparent OSINT-style visualization pipeline that converts raw event data into an interactive analytical tool.

Overview

The map displays documented conflict events and allows users to:

• Explore conflict events geographically
• Identify actors involved in incidents
• See estimated fatalities for each event
• View reported locations and source citations
• Navigate clusters of events across the region

Events are displayed using clustered markers to maintain performance and readability.

Data Source

This project uses the Georeferenced Event Dataset (GED) from the
Uppsala Conflict Data Program.

The dataset provides structured information about organized violence events worldwide including:

Event date

Actors involved

Fatality estimates

Geographic coordinates

Source reporting references

Dataset download:

https://ucdp.uu.se/downloads/

Data Processing Workflow

The project uses a small data pipeline to convert the raw dataset into a format suitable for web visualization.

UCDP GED dataset (CSV)
        ↓
LibreOffice filtering and cleanup
        ↓
Python conversion script
        ↓
JSON event dataset
        ↓
Leaflet map visualization

The Python script converts the cleaned dataset into a JSON file that is loaded directly by the map.

Project Structure
Middle-East-Map
│
├── index.html          Map layout
├── style.css           Map styling
├── script.js           Map logic and clustering
│
├── convert_events.py   CSV → JSON data pipeline
├── conflict_events.csv Filtered event dataset
├── events.json         Map-ready dataset
Map Features

Interactive event markers showing:

Actor A vs Actor B

Fatality estimates

Event date

Location description

Source organization

Source headline

Markers are color coded based on event severity and clustered to maintain map performance.

Technologies Used

Programming

Python

JavaScript

HTML5

CSS

Geospatial

Leaflet.js

Leaflet MarkerCluster

OpenStreetMap tiles

Data Processing

CSV data transformation

JSON geospatial datasets

Development Environment

Visual Studio Code

PowerShell

Node.js (local server)

Running the Project

Clone the repository:

git clone https://github.com/yourusername/middle-east-map.git

Navigate to the project directory:

cd middle-east-map

Run a local server:

npx serve .

Open in browser:

http://localhost:3000
Updating the Dataset

To update the map with new events:

Download the latest GED dataset

Filter the dataset for the region and time period of interest

Export the cleaned dataset as conflict_events.csv

Run the conversion script:

python convert_events.py

This will generate an updated events.json file used by the map.

Future Improvements

Possible enhancements include:

Timeline filtering

Conflict intensity heatmaps

Actor filtering

Event type categorization

Integration with near-real-time datasets such as ACLED or GDELT

Purpose

This project was created as a practical exercise in:

OSINT data workflows

Geospatial visualization

Conflict event analysis

Lightweight analytical dashboards

It is intended as a prototype demonstrating how publicly available datasets can be used to build transparent and reproducible monitoring tools.
