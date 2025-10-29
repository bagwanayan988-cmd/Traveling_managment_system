const API_BASE = 'http://localhost:5000/api';

// Load transports when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 TravelEase frontend loaded!');
    loadTransports();
});

// Load all transports
async function loadTransports() {
    try {
        const response = await fetch(`${API_BASE}/transports`);
        const transports = await response.json();
        displayTransports(transports);
    } catch (error) {
        console.error('Error loading transports:', error);
        showError('Failed to load transport options. Make sure backend is running on port 5000.');
    }
}

// Search transport
async function searchTransport() {
    const source = document.getElementById('source').value;
    const destination = document.getElementById('destination').value;

    let url = `${API_BASE}/transports/search?`;
    if (source) url += `source=${source}&`;
    if (destination) url += `destination=${destination}`;

    try {
        const response = await fetch(url);
        const transports = await response.json();
        displayTransports(transports);
    } catch (error) {
        console.error('Error searching transport:', error);
        showError('Error searching for transport options');
    }
}

// Display transport results
function displayTransports(transports) {
    const container = document.getElementById('transportList');
    
    if (transports.length === 0) {
        container.innerHTML = '<div class="alert alert-info text-center">No transport options found. Try different search criteria.</div>';
        return;
    }

    container.innerHTML = transports.map(transport => `
        <div class="transport-card">
            <div class="row align-items-center">
                <div class="col-md-8">
                    <h5>${transport.name}</h5>
                    <p class="mb-1"><strong>Route:</strong> ${transport.source} → ${transport.destination}</p>
                    <p class="mb-1"><strong>Departure:</strong> ${new Date(transport.departure).toLocaleString()}</p>
                    <p class="mb-1"><strong>Arrival:</strong> ${new Date(transport.arrival).toLocaleString()}</p>
                    <p class="mb-1"><strong>Duration:</strong> ${transport.duration} | <strong>Seats:</strong> ${transport.availableSeats}</p>
                    <p class="mb-1"><strong>Operator:</strong> ${transport.operator}</p>
                </div>
                <div class="col-md-4 text-center">
                    <div class="price mb-2">₹${transport.price}</div>
                    <button class="btn btn-success" onclick="bookTransport(${transport.id})">Book Now</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Book transport
async function bookTransport(transportId) {
    const passengerName = prompt('Enter passenger name:');
    if (!passengerName) return;

    const passengerEmail = prompt('Enter passenger email:');
    if (!passengerEmail) return;

    const passengerPhone = prompt('Enter passenger phone:');
    if (!passengerPhone) return;

    const bookingData = {
        transportId: transportId,
        passengerName: passengerName,
        passengerEmail: passengerEmail,
        passengerPhone: passengerPhone
    };

    try {
        const response = await fetch(`${API_BASE}/bookings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingData)
        });

        if (response.ok) {
            const booking = await response.json();
            alert(`🎉 Booking Confirmed!\n\nBooking ID: ${booking.id}\nPassenger: ${booking.passengerName}\nTransport: ${booking.transportName}\nAmount: ₹${booking.price}\n\nThank you for booking with TravelEase!`);
        } else {
            alert('❌ Booking failed. Please try again.');
        }
    } catch (error) {
        console.error('Error creating booking:', error);
        alert('❌ Error creating booking. Please try again.');
    }
}

function showError(message) {
    document.getElementById('transportList').innerHTML = 
        `<div class="alert alert-danger text-center">${message}</div>`;
}