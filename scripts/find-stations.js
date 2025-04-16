// find-stations.js - Interactive Charging Station Finder

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const mapElement = document.getElementById('map');
    const loadingElement = document.querySelector('.map-loading');
    const stationList = document.querySelector('.station-list');
    const mapViewBtn = document.getElementById('map-view-btn');
    const listViewBtn = document.getElementById('list-view-btn');
    const detailPanel = document.querySelector('.station-detail-panel');
    const closePanelBtn = document.querySelector('.close-panel');
    const bookingForm = document.querySelector('.booking-form');
    const modalOverlay = document.querySelector('.modal-overlay');
    const closeModalBtn = document.querySelector('.close-modal-btn');

    // Map Variables
    let map;
    let userLocation = null;
    let stations = [];
    let markers = [];
    let selectedStation = null;

    // Initialize the application
    initMap();
    setupEventListeners();

    // Functions
    function initMap() {
        // Create map instance
        map = L.map('map').setView([51.505, -0.09], 13);
        
        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 18,
        }).addTo(map);

        // Get user location
        getUserLocation();
    }

    function getUserLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    userLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    map.setView([userLocation.lat, userLocation.lng], 13);
                    loadNearbyStations();
                },
                error => {
                    console.error("Geolocation error:", error);
                    // Default to London if geolocation fails
                    userLocation = { lat: 51.505, lng: -0.09 };
                    loadNearbyStations();
                }
            );
        } else {
            console.log("Geolocation is not supported by this browser.");
            userLocation = { lat: 51.505, lng: -0.09 };
            loadNearbyStations();
        }
    }

    function loadNearbyStations() {
        // Simulate API call with mock data
        setTimeout(() => {
            // Mock data - in a real app, this would come from an API
            stations = [
                {
                    id: 1,
                    name: "Green Energy Station",
                    address: "123 Electric Ave, Tech City",
                    lat: userLocation.lat + 0.01,
                    lng: userLocation.lng + 0.01,
                    status: "available",
                    speed: "50kW",
                    plugs: ["CCS", "Type 2"],
                    price: 0.35,
                    renewable: true,
                    rating: 4.5,
                    reviews: 24,
                    amenities: ["cafe", "restaurant", "shopping", "restroom"]
                },
                {
                    id: 2,
                    name: "City Center Charger",
                    address: "456 Main St, Downtown",
                    lat: userLocation.lat + 0.008,
                    lng: userLocation.lng - 0.015,
                    status: "limited",
                    speed: "22kW",
                    plugs: ["Type 2"],
                    price: 0.45,
                    renewable: false,
                    rating: 3.8,
                    reviews: 12,
                    amenities: ["restaurant", "shopping"]
                },
                {
                    id: 3,
                    name: "Mall Parking Charger",
                    address: "789 Shopping Blvd",
                    lat: userLocation.lat - 0.012,
                    lng: userLocation.lng + 0.005,
                    status: "occupied",
                    speed: "150kW",
                    plugs: ["CCS", "CHAdeMO", "Type 2"],
                    price: 0.55,
                    renewable: true,
                    rating: 4.2,
                    reviews: 36,
                    amenities: ["shopping", "restroom"]
                }
            ];

            displayStationsOnMap();
            displayStationsInList();
            hideLoading();
        }, 1000);
    }

    function displayStationsOnMap() {
        // Clear existing markers
        markers.forEach(marker => map.removeLayer(marker));
        markers = [];

        // Create custom icons
        const availableIcon = L.icon({
            iconUrl: 'images/marker-green.png',
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32]
        });

        const limitedIcon = L.icon({
            iconUrl: 'images/marker-yellow.png',
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32]
        });

        const occupiedIcon = L.icon({
            iconUrl: 'images/marker-red.png',
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32]
        });

        // Add markers to map
        stations.forEach(station => {
            let icon;
            switch(station.status) {
                case 'available': icon = availableIcon; break;
                case 'limited': icon = limitedIcon; break;
                case 'occupied': icon = occupiedIcon; break;
                default: icon = availableIcon;
            }

            const marker = L.marker([station.lat, station.lng], { icon })
                .addTo(map)
                .bindPopup(`
                    <h3>${station.name}</h3>
                    <p>Status: <span class="${station.status}">${formatStatus(station.status)}</span></p>
                    <button class="view-station-btn" data-id="${station.id}">View Details</button>
                `);

            marker.on('click', () => {
                selectStation(station.id);
            });

            markers.push(marker);
        });
    }

    function displayStationsInList() {
        stationList.innerHTML = '';

        stations.forEach(station => {
            const stationCard = document.createElement('div');
            stationCard.className = 'station-card';
            stationCard.innerHTML = `
                <div class="station-status ${station.status}"></div>
                <div class="station-info">
                    <h3>${station.name}</h3>
                    <p><i class="fas fa-map-marker-alt"></i> ${calculateDistance(station)} miles away</p>
                    <div class="station-details">
                        <span><i class="fas fa-bolt"></i> ${station.speed}</span>
                        <span><i class="fas fa-plug"></i> ${station.plugs.join(', ')}</span>
                        ${station.renewable ? '<span><i class="fas fa-leaf"></i> Renewable</span>' : ''}
                    </div>
                </div>
                <button class="view-station-btn" data-id="${station.id}">View</button>
            `;
            stationList.appendChild(stationCard);
        });

        // Add event listeners to list view buttons
        document.querySelectorAll('.station-list .view-station-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                selectStation(e.target.dataset.id);
            });
        });
    }

    function selectStation(stationId) {
        selectedStation = stations.find(s => s.id == stationId);
        if (!selectedStation) return;

        // Update detail panel
        updateDetailPanel();
        
        // Show panel
        detailPanel.style.transform = 'translateX(0)';
        
        // Close any open popups
        markers.forEach(marker => marker.closePopup());
    }

    function updateDetailPanel() {
        if (!selectedStation) return;

        const panelContent = detailPanel.querySelector('.panel-content');
        panelContent.innerHTML = `
            <div class="station-header">
                <div class="station-status ${selectedStation.status}"></div>
                <h3>${selectedStation.name}</h3>
                <div class="station-rating">
                    ${generateStars(selectedStation.rating)}
                    <span>${selectedStation.rating} (${selectedStation.reviews} reviews)</span>
                </div>
            </div>
            
            <div class="station-address">
                <p><i class="fas fa-map-marker-alt"></i> ${selectedStation.address}</p>
                <p class="distance"><i class="fas fa-location-arrow"></i> ${calculateDistance(selectedStation)} miles from your location</p>
            </div>
            
            <div class="station-specs">
                <div class="spec-card">
                    <i class="fas fa-bolt"></i>
                    <h4>Charging Speed</h4>
                    <p>${selectedStation.speed}</p>
                </div>
                <div class="spec-card">
                    <i class="fas fa-plug"></i>
                    <h4>Connectors</h4>
                    <p>${selectedStation.plugs.join(', ')}</p>
                </div>
                <div class="spec-card">
                    <i class="fas fa-leaf"></i>
                    <h4>Energy Source</h4>
                    <p>${selectedStation.renewable ? '100% Renewable' : 'Grid Power'}</p>
                </div>
                <div class="spec-card">
                    <i class="fas fa-coins"></i>
                    <h4>Price</h4>
                    <p>$${selectedStation.price.toFixed(2)}/kWh</p>
                </div>
            </div>
            
            ${selectedStation.amenities.length > 0 ? `
            <div class="amenities">
                <h4>Amenities Nearby</h4>
                <div class="amenity-icons">
                    ${generateAmenityIcons(selectedStation.amenities)}
                </div>
            </div>
            ` : ''}
            
            <div class="booking-section">
                <h4>Book This Station</h4>
                <form class="booking-form">
                    <div class="form-group">
                        <label>Date</label>
                        <input type="date" required>
                    </div>
                    <div class="form-group">
                        <label>Time</label>
                        <input type="time" required>
                    </div>
                    <div class="form-group">
                        <label>Duration (hours)</label>
                        <select>
                            <option>1 hour</option>
                            <option>2 hours</option>
                            <option>4 hours</option>
                            <option>6 hours</option>
                        </select>
                    </div>
                    <button type="submit" class="book-now-btn">Book Now</button>
                </form>
            </div>
        `;

        // Re-attach form submit handler
        detailPanel.querySelector('.booking-form').addEventListener('submit', handleBookingSubmit);
    }

    function handleBookingSubmit(e) {
        e.preventDefault();
        
        // In a real app, you would send this to your backend
        console.log("Booking submitted for station:", selectedStation.id);
        
        // Show confirmation modal
        modalOverlay.style.display = 'flex';
    }

    function setupEventListeners() {
        // View toggle buttons
        mapViewBtn.addEventListener('click', () => {
            mapViewBtn.classList.add('active');
            listViewBtn.classList.remove('active');
            document.querySelector('.map-container').style.display = 'block';
            stationList.style.display = 'none';
        });

        listViewBtn.addEventListener('click', () => {
            listViewBtn.classList.add('active');
            mapViewBtn.classList.remove('active');
            document.querySelector('.map-container').style.display = 'none';
            stationList.style.display = 'block';
        });

        // Close detail panel
        closePanelBtn.addEventListener('click', () => {
            detailPanel.style.transform = 'translateX(100%)';
        });

        // Close modal
        closeModalBtn.addEventListener('click', () => {
            modalOverlay.style.display = 'none';
        });

        // Booking form
        if (bookingForm) {
            bookingForm.addEventListener('submit', handleBookingSubmit);
        }
    }

    // Helper functions
    function calculateDistance(station) {
        if (!userLocation) return 'N/A';
        
        // Simple distance calculation (for demo purposes)
        // In a real app, use more accurate formula or API
        const latDiff = Math.abs(userLocation.lat - station.lat);
        const lngDiff = Math.abs(userLocation.lng - station.lng);
        const distance = Math.sqrt(latDiff * latDiff + lngDiff * lngDiff) * 69; // Approx miles
        
        return distance.toFixed(1);
    }

    function formatStatus(status) {
        return status.charAt(0).toUpperCase() + status.slice(1);
    }

    function generateStars(rating) {
        let stars = '';
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        
        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars += '<i class="fas fa-star"></i>';
            } else if (i === fullStars && hasHalfStar) {
                stars += '<i class="fas fa-star-half-alt"></i>';
            } else {
                stars += '<i class="far fa-star"></i>';
            }
        }
        
        return stars;
    }

    function generateAmenityIcons(amenities) {
        const icons = {
            'cafe': '<i class="fas fa-coffee"></i> Café',
            'restaurant': '<i class="fas fa-utensils"></i> Restaurant',
            'shopping': '<i class="fas fa-shopping-bag"></i> Shopping',
            'restroom': '<i class="fas fa-restroom"></i> Restroom'
        };
        
        return amenities.map(a => icons[a] || '').join('');
    }

    function hideLoading() {
        if (loadingElement) {
            loadingElement.style.display = 'none';
        }
    }
});