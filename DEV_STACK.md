# EVQ Development Stack

## 1. Front-end stack used in the current prototype

The current EVQ interface is built as a lightweight static web app, which is ideal for rapid prototyping and interface validation before backend integration.

### Core technologies
- HTML5
  - Page structure for the landing page, station finder, schedule flow, history view, and settings.
- CSS3
  - Styling, layout, card components, forms, navigation, colors, spacing, and responsive visual design.
- Vanilla JavaScript
  - DOM manipulation, user interaction logic, filters, geolocation, dynamic station rendering, and mock data flows.

### UI and map libraries
- Leaflet.js
  - Used to render interactive maps and charging station markers.
- OpenStreetMap tiles
  - Base map source for location visualization and station discovery.
- Font Awesome
  - Icons for actions, status indicators, and analytics UI.
- Flatpickr
  - Date and time selection for the scheduling and history experience.

### Why this front-end stack fits the project
- It is fast to build and easy to test in a browser.
- It supports a modern UX without needing a heavy framework for a prototype.
- It matches the current architecture: several HTML pages, shared CSS, and small JavaScript modules.
- It helps keep the project simple while validating the product flow.

---

## 2. File connection map

This project is organized in a very simple, modular structure that connects each screen to shared styling and logic.

### Main page relationships
- index.html
  - Loads the main landing page.
  - Connects to: styles/style.css
  - Uses: scripts/main.js for the main map and initial UI behaviors.

- find-stations.html
  - Displays the station discovery page.
  - Connects to: styles/style.css
  - Uses: scripts/find-stations.js to manage:
    - geolocation
    - station markers
    - filtering
    - list/map toggle
    - detail panel and selection behavior

- schedule.html
  - Handles the charging reservation flow.
  - Connects to: styles/style.css and third-party libraries like Leaflet and Flatpickr.
  - Includes a scheduling UI with booking-related logic and mock station data.

- history.html
  - Shows the user charging history and analytics.
  - Connects to: styles/style.css
  - Uses date filters, custom search, and history rendering logic via inline JavaScript.

- settings.html
  - Displays the preferences/settings screen.
  - Connects to: styles/style.css
  - Currently acts as a placeholder for future personalization features.

### Shared resources
- styles/style.css
  - Shared design system for all pages.
  - Controls typography, buttons, layout, cards, nav, filters, forms, and visuals.

- scripts/main.js
  - Main map initialization and page-level front-end setup.

- scripts/find-stations.js
  - Station search and selection logic for the discovery page.

- images/
  - Contains shared visual assets such as the logo and map-related icons.

---

## 3. Planned backend stack for future phases

Once the prototype is validated, the project should move from static mock data to a real application backend.

### Recommended stack
- Node.js
  - JavaScript runtime for the server layer.
- Express.js
  - Lightweight API framework for routing and backend services.
- PostgreSQL
  - Relational database for users, stations, charging sessions, reservations, and history.
- Prisma ORM
  - Safer, cleaner database access and easier schema management.
- JWT Authentication
  - For login, user sessions, and protected endpoints.
- REST API
  - Clean structure for station data, reservation management, account settings, and charging history.

### Why this backend stack is a good fit
- It matches the JavaScript front-end and keeps development consistent.
- PostgreSQL is strong for transactional data like bookings and payments.
- Prisma speeds up schema design and reduces database boilerplate.
- Express is simple and scalable for a service-oriented EV platform.

---

## 4. Brief choice summary

The current front-end uses HTML, CSS, and JavaScript because the app is a prototype focused on UX and interaction flow. The stack is intentionally light, fast, and easy to iterate.

For the backend, Node.js + Express + PostgreSQL + Prisma is the most logical next step because it aligns with the current JavaScript ecosystem and supports real business logic such as station management, booking, authentication, and charging analytics.

In short:
- Front-end now: HTML + CSS + JavaScript + Leaflet + OSM
- Backend next: Node.js + Express + PostgreSQL + Prisma

This approach keeps the project easy to build early, while preparing a clean migration toward a real production-ready platform.
