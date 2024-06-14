# Project-3-incidentes-viales-cdmx-22a24

## General Guide for the Incident Data Visualization Project

### Project Overview

#### Project Description
The Incident Data Visualization project is a comprehensive web-based tool designed to provide interactive visualizations of incident data (Ciudad de Mexico from 2022 -2024) within various administrative divisions and neighborhoods. Users can explore different types of visualizations, including maps and various plots, to gain insights into incident patterns and trends.

#### Purpose
The main purpose of this project is to offer a detailed, interactive view of incidents to help users understand the data through visual exploration, which can assist in decision-making, resource allocation, and identifying trends or hotspots.

### Ethical Considerations

#### Clearview AI (Reading 16.1)
- **Privacy Concerns**: Ensuring that the data used for visualization does not infringe on individuals' privacy rights. Clearview AI’s controversial use of public images highlights the importance of obtaining proper consent and protecting personal information.
- **Data Accuracy and Bias**: Ensuring that the visualizations accurately represent incident data without bias. The potential for misuse of technology, as seen with Clearview AI, underscores the need for responsible data handling and presentation.

#### Healthcare Bias (Reading 16.2)
- **Algorithmic Fairness**: The project should ensure that any algorithms or data processing methods used are fair and do not perpetuate existing biases, similar to the issues found in the healthcare algorithm study. This includes regular audits and updates to the algorithms to ensure fairness.
- **Equitable Resource Allocation**: The insights gained from the visualizations should aid in fair resource allocation, addressing any disparities similar to those found in healthcare where Black patients received less support.

#### Regulation Compliance (Reading 16.3)
- **Legal Compliance**: The project must comply with relevant data protection regulations (e.g., GDPR, CCPA) to ensure ethical use of data. This involves securing user data, obtaining necessary consents, and transparently communicating data use practices.
- **Accountability and Transparency**: Maintaining transparency about how data is collected, processed, and used. Any violations of these regulations should be promptly addressed with clear accountability mechanisms.

### Features and Tools

#### Main Features

**Interactive Map Visualization**
- **Description**: A dynamic map that displays incident data geographically. Users can filter incidents by type and interact with the map to get detailed information on specific incidents.
- **Tools Used**: Leaflet.js, MarkerCluster
- **Functionality**:
  - **Incident Type Selector**: A dropdown menu to filter incidents by type.
  - **Interactive Map**: Markers on the map representing incidents, with clustering for better visualization at different zoom levels.

**Incident Plots**
- **Description**: Interactive plots to visualize incidents by type and administrative divisions (alcaldias).
- **Tools Used**: Plotly, D3.js
- **Functionality**:
  - **Alcaldia Selector**: A dropdown menu to filter incidents by specific alcaldias.
  - **Dynamic Plot**: Visual representation of incident data that updates based on user selections.

**API Links Table**
- **Description**: A table listing all API links of the app.
- **Tools Used**: DataTables, jQuery
- **Functionality**:
  - **Interactive Table**: Provides features such as searching, sorting, and pagination.

### Data Handling

#### Database Schema

**Tables**:
- **Incidentes**: Central table storing details about each incident.
- **CodigoCierre**: Stores closure codes and their descriptions.
- **Alcaldias**: Information about different administrative divisions.
- **Colonias**: Information about neighborhoods.
- **ClasificacionAlarma**: Classifications for alarms associated with incidents.
- **TipoEntrada**: Types of entries related to incidents.

#### Data Processing
- **Importing Data**: Using pandas to read and manipulate the incident data from CSV files.
- **Data Cleaning and Transformation**: Dropping unnecessary columns, filtering data, and creating new DataFrames for unique entities like alcaldias, incident types, closure codes, etc.
- **Data Merging**: Combining the main incident DataFrame with the newly created DataFrames to include IDs for alcaldias, incident types, etc.

### Technologies and Libraries

#### Frontend Technologies:
- **HTML/CSS**: For structuring and styling the web pages.
- **Bootstrap**: For responsive design and pre-built components.
- **Leaflet.js**: For interactive maps.
- **MarkerCluster**: For clustering map markers.
- **Plotly**: For creating interactive plots.
- **D3.js**: For data-driven document manipulation.
- **DataTables**: For enhancing HTML tables with interactive features.
- **jQuery**: For DOM manipulation and to support DataTables.

#### Backend Technologies:
- **Python**: For data processing and server-side logic.
- **Pandas**: For data manipulation and analysis.

#### Database:
- **PostgreSQL**: Storing incident data and related entities.
- **ERD**: Visual representation of the database schema to understand relationships between tables.

### Detailed Data Processing Steps

1. **Reading Original Data**: Load the incident data from a CSV file into a pandas DataFrame.
2. **Creating Unique Entity DataFrames**:
   - Extract and save unique values for alcaldias, incident types, closure codes, entry types, and alarm classifications.
3. **Filtering and Cleaning Data**: Remove unnecessary columns and filter out specific incident types.
4. **Merging DataFrames**: Combine the main incident DataFrame with the unique entity DataFrames to incorporate their IDs.
5. **Saving Processed Data**: Save the cleaned and merged DataFrame to a new CSV file for use in the application.
