# EVQ

EVQ is a front-end prototype for an electric vehicle charging experience designed to help users discover nearby charging stations, compare options, plan sessions, and track charging history in a simple and user-friendly way.

## Overview

The project is currently implemented as a static multi-page web application with a modern interface, interactive map experience, and mock charging data. It focuses on the user journey for:

- finding available charging stations
- filtering by speed, plug type, and renewable energy
- comparing stations based on availability and price
- scheduling future charging sessions
- reviewing charging history and usage trends

## Current Front-End Stack

### Core technologies
- HTML5 for page structure
- CSS3 for layout and design system
- Vanilla JavaScript for behavior and DOM updates

### UI and map libraries
- Leaflet.js for interactive maps
- OpenStreetMap for map tiles
- Font Awesome for icons
- Flatpickr for date and time selection

### Why this stack was chosen
This stack is ideal for a prototype because it is:

- fast to build
- easy to test in the browser
- lightweight and low-complexity
- sufficient for validating user experience before backend integration

## Project Structure and File Connections

### Main app pages
- index.html
  - Landing page and brand presentation
  - Links to the main application screens
- find-stations.html
  - Main station discovery page
  - Connected to styles/style.css and scripts/find-stations.js
- schedule.html
  - Charging booking and scheduling section
  - Uses map and date/time UI components
- history.html
  - User charging history and analytics view
- settings.html
  - Preferences and future personalization screen

### Shared assets
- styles/style.css
  - Main shared styling for the entire app
- scripts/main.js
  - General initialization and page-level front-end logic
- scripts/find-stations.js
  - Station discovery logic, geolocation, filters, map markers, and detail panel interactions
- images/
  - Logo and map-related icon assets

## Connection Flow

The app follows a simple modular structure:

1. Each HTML page defines a product screen.
2. The shared CSS file provides the visual system.
3. JavaScript files manage logic and dynamic UI updates.
4. Leaflet powers the map and station markers.
5. The app uses mock station data before a real backend is connected.

## Planned Backend Stack

For the next development phase, the recommended backend would be:

- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- JWT for authentication
- REST API architecture

### Reasoning
This combination fits the current JavaScript-heavy front-end and supports future features such as:

- real station data retrieval
- booking and reservation management
- user accounts and profile settings
- charging history storage
- analytics and reporting

## Brief Summary

The current EVQ prototype is built as a lightweight front-end experience using HTML, CSS, JavaScript, Leaflet, and OpenStreetMap. It is intentionally simple and fast to iterate, which makes it ideal for testing the product concept before introducing a backend.

The next logical step is a JavaScript-friendly backend using Node.js, Express, PostgreSQL, and Prisma to support persistent data and real product features.

## Future Direction

The next version of EVQ will likely evolve from a concept prototype into a real service by:

- connecting to live charging station APIs
- storing user and reservation data in a database
- powering personalized recommendations
- adding authentication and payment flows
- expanding analytics and sustainability tracking
