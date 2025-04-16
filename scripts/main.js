// Initialize the map when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Hide loading spinner
    const loadingElement = document.querySelector('.map-loading');
    if (loadingElement) {
        loadingElement.style.display = 'none';
    }

    // Create map instance
    const map = L.map('map').setView([51.505, -0.09], 13);
    
    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
    }).addTo(map);
    
    // Add charging station markers
    const chargingIcon = L.icon({
        iconUrl: 'images/charging-icon.png', // Create/download this icon
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    });
    
    // Sample stations data
    const stations = [
        { lat: 51.5, lng: -0.09, name: 'Station 1', ports: 4, status: 'Available' },
        { lat: 51.51, lng: -0.1, name: 'Station 2', ports: 2, status: 'Available' },
        { lat: 51.49, lng: -0.08, name: 'Station 3', ports: 0, status: 'Occupied' }
    ];
    
    // Add markers to map
    stations.forEach(station => {
        L.marker([station.lat, station.lng], { icon: chargingIcon })
            .addTo(map)
            .bindPopup(`
                <strong>${station.name}</strong><br>
                Ports: ${station.ports}<br>
                Status: ${station.status}
            `);
    });
    
    // Generate background shapes (if still using this feature)
    const shapesContainer = document.querySelector('.background-shapes');
    if (shapesContainer) {
        const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f1c40f', '#9b59b6'];
        
        for (let i = 0; i < 8; i++) {
            const shape = document.createElement('div');
            shape.className = 'shape';
            
            const size = Math.floor(Math.random() * 300) + 100;
            shape.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation-duration: ${Math.floor(Math.random() * 20) + 15}s;
                animation-delay: ${Math.floor(Math.random() * 10)}s;
            `;
            
            shapesContainer.appendChild(shape);
        }
    }
});
