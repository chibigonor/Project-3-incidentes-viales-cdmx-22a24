# Project-3-incidentes-viales-cdmx-22a24


General Guide for the Incident Data Visualization Project

Project Overview

Project Description

The Incident Data Visualization project is a comprehensive web-based tool designed to provide interactive visualizations of incident data within various administrative divisions and neighborhoods. Users can explore different types of visualizations, including maps and various plots, to gain insights into incident patterns and trends.

Purpose

The main purpose of this project is to offer a detailed, interactive view of incidents to help users understand the data through visual exploration, which can assist in decision-making, resource allocation, and identifying trends or hotspots.

Features and Tools

Main Features

1. Interactive Map Visualization
Description: A dynamic map that displays incident data geographically. Users can filter incidents by type and interact with the map to get detailed information on specific incidents.
Tools Used: Leaflet.js, MarkerCluster
Functionality:
Incident Type Selector: A dropdown menu to filter incidents by type.
Interactive Map: Markers on the map representing incidents, with clustering for better visualization at different zoom levels.

2. Incident Plots
Description: Interactive plots to visualize incidents by type and administrative divisions (alcaldias).
Tools Used: Plotly, D3.js
Functionality:
Alcaldia Selector: A dropdown menu to filter incidents by specific alcaldias.
Dynamic Plot: Visual representation of incident data that updates based on user selections.

Data Handling

1. Database Schema
Tables:

Incidentes: Central table storing details about each incident.
CodigoCierre: Stores closure codes and their descriptions.
Alcaldias: Information about different administrative divisions.
Colonias: Information about neighborhoods.
ClasificacionAlarma: Classifications for alarms associated with incidents.
TipoEntrada: Types of entries related to incidents.

2. Data Processing

Importing Data: Using pandas to read and manipulate the incident data from CSV files.
Data Cleaning and Transformation: Dropping unnecessary columns, filtering data, and creating new DataFrames for unique entities like alcaldias, incident types, closure codes, etc.
Data Merging: Combining the main incident DataFrame with the newly created DataFrames to include IDs for alcaldias, incident types, etc.
Technologies and Libraries
Frontend Technologies:

HTML/CSS: For structuring and styling the web pages.

Bootstrap: For responsive design and pre-built components.

Leaflet.js: For interactive maps.

MarkerCluster: For clustering map markers.

Plotly: For creating interactive plots.

D3.js: For data-driven document manipulation.

Backend Technologies:


Python: For data processing and server-side logic.

Pandas: For data manipulation and analysis.

Database:

PostgreSQL: Storing incident data and related entities.

ERD: Visual representation of the database schema to understand relationships between tables.

Project Structure

incident-data-visualization/
│
├── static/
│   ├── css/
│   │   ├── index.css
│   │   └── map.css
│   ├── img/
│   │   └── map_img.jpg
│   └── js/
│       ├── map.js
│       └── plot1.js
├── data/
│   └── incident_data.csv
├── templates/
│   ├── index.html
│   ├── map.html
│   └── plot1.html
├── app.py
└── README.md

Detailed Data Processing Steps

Reading Original Data: Load the incident data from a CSV file into a pandas DataFrame.

Creating Unique Entity DataFrames:

Extract and save unique values for alcaldias, incident types, closure codes, entry types, and alarm classifications.
Filtering and Cleaning Data: Remove unnecessary columns and filter out specific incident types.
Merging DataFrames: Combine the main incident DataFrame with the unique entity DataFrames to incorporate their IDs.
Saving Processed Data: Save the cleaned and merged DataFrame to a new CSV file for use in the application.
