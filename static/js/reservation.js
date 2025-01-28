const reservedParkingId = localStorage.getItem("reservedParkingId");
const reservationTime = localStorage.getItem("reservationTime"); 


function displayParkingInfo(parkingInfo) {
    return `
			<center class="res_title">Current reservation: <b>${parkingInfo.name}</b></center>
			<img class="spot" src="{{ url_for('static', filename='spot.jpg') }}" alt="">
			<ul>
				<li><strong>Type:</strong> ${parkingInfo.type}</li>
				<li><strong>Fee:</strong> ${parkingInfo.fee}</li>
				<li><strong>Capacity:</strong>${parkingInfo.capacity.total} spots</li>
				<li><strong>Access:</strong> ${parkingInfo.access}</li>
				<li><strong>Opening Hours:</strong> ${parkingInfo.openingHours}</li>
				<li><strong>Payment Methods:</strong> ${parkingInfo.payment}</li>
				<li><strong>Operator:</strong> ${parkingInfo.operator}</li>
			</ul>
		`;
}


if (reservedParkingId) {
    
    const parkingInfo = generateParkingInfo(reservedParkingId);

    
    document.getElementById("parking-info").innerHTML = displayParkingInfo(parkingInfo);

    
    if (reservationTime) {
        startCountdownTimer(reservationTime);
    }
} else {
    
    document.getElementById("parking-info").innerHTML = `
			<p>No reservations found.</p>
		`;

    
    document.getElementById("cancel-reservation-button").disabled = true;
    document.getElementById("open-navigation-button").disabled = true;

    
    document.getElementById("countdown-timer").style.display = "none";
}


function startCountdownTimer(reservationTime) {
    const timerElement = document.getElementById("time");

    
    const endTime = new Date(reservationTime).getTime() + 30 * 60 * 1000; 

    const timerInterval = setInterval(() => {
        const now = new Date().getTime();
        const timeLeft = endTime - now;

        if (timeLeft > 0) {
            
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            
            timerElement.textContent = `${minutes.toString().padStart(2, "0")}min ${seconds.toString().padStart(2, "0")}s`;
        } else {
            
            clearInterval(timerInterval);

            
            localStorage.removeItem("reservedParkingId");
            localStorage.removeItem("reservationTime");

            
            alert("Your reservation has expired.");

            
            window.location.href = "{{ url_for('map') }}";
        }
    }, 1000); 
}


document.getElementById("cancel-reservation-button").addEventListener("click", () => {
    
    localStorage.removeItem("reservedParkingId");
    localStorage.removeItem("reservationTime");

    
    window.location.href = "{{ url_for('map') }}";
});


document.getElementById("open-navigation-button").addEventListener("click", () => {
    if (reservedParkingId) {
        
        const parkingInfo = generateParkingInfo(reservedParkingId);

        
        const url = `https://www.google.com/maps/dir/?api=1&destination=${parkingInfo.lat},${parkingInfo.lon}`;
        window.open(url, "_blank");
    } else {
        alert("No reservation found.");
    }
});