function generateParkingInfo(seed) {
	// Deterministic random number generator
	function deterministicRandom(seed) {
		const x = Math.sin(seed) * 10000;
		return x - Math.floor(x);
	}

	
	function pickRandom(arr, seed) {
		return arr[Math.floor(deterministicRandom(seed) * arr.length)];
	}

	let total = Math.floor(deterministicRandom(seed + 3) * 100) + 1;
	const info = {
		name: `Parking ${pickRandom(["Marina Koper", "Belvedere", "Sermin", "Giusterna"], seed)}`,
		type: pickRandom(["Surface", "Underground", "Multi-storey", "Rooftop"], seed + 1),
		fee: pickRandom(["Yes (1 €/hour)", "No"], seed + 2),
		vacancy: Math.floor(deterministicRandom(seed + 3) * total) + 1,
		capacity: {
			total: total, 
			disabled: Math.floor(deterministicRandom(seed + 4) * 5), 
			truck: Math.floor(deterministicRandom(seed + 5) * 10), 
		},
		access: pickRandom(["Public", "Private", "Customers Only", "Permit Required"], seed + 6),
		openingHours: pickRandom(["24/7", "Mo-Su 06:00-22:00", "Mo-Fr 08:00-18:00"], seed + 7),
		supervised: pickRandom(["Yes", "No"], seed + 8),
		payment: pickRandom(["Cash, Coins", "Cash Only", "Coins Only"], seed + 9),
		amenities: {
			lit: pickRandom(["Yes", "No"], seed + 10),
			bicycle: pickRandom(["Yes", "No"], seed + 11),
			motorVehicle: pickRandom(["Yes", "No"], seed + 12),
		},
		surface: pickRandom(["Asphalt", "Concrete", "Gravel", "Paved"], seed + 13),
		operator: pickRandom(["Marina Koper", "Luka Koper d. d.", "Hofer", "MaKo"], seed + 14),
	};

	return info;
}
function displayParkingInfo(parkingInfo, end=true) {
	function getSafe(obj, key, defaultValue = "Not specified") {
		return obj && obj[key] !== undefined ? obj[key] : defaultValue;
	}

	let html = `
	  <div class="parking-info">
	  <center><h4>${getSafe(parkingInfo, "name")}</h4></center>
		<ul>
		  <li><strong>Type:</strong> ${getSafe(parkingInfo, "type")}</li>
		  <li><strong>Fee:</strong> ${getSafe(parkingInfo, "fee")}</li>
		  <li><strong>Vacancy:</strong> ${Math.round(((getSafe(parkingInfo, "vacancy") / getSafe(parkingInfo.capacity, "total"))) * 100)}%</li>
		  <li><strong>Capacity:</strong>
			<ul>
			  <li>Total: ${getSafe(parkingInfo.capacity, "total")} spots</li>
			  <li>Disabled: ${getSafe(parkingInfo.capacity, "disabled")} spots</li>
			  <li>Truck: ${getSafe(parkingInfo.capacity, "truck")} spots</li>
			</ul>
		  </li>
		  <li><strong>Access:</strong> ${getSafe(parkingInfo, "access")}</li>
		  <li><strong>Opening Hours:</strong> ${getSafe(parkingInfo, "openingHours")}</li>
		  <li><strong>Supervised:</strong> ${getSafe(parkingInfo, "supervised")}</li>
		  <li><strong>Payment Methods:</strong> ${getSafe(parkingInfo, "payment")}</li>
		  <li><strong>Amenities:</strong>
			<ul>
			  <li>Lit: ${getSafe(parkingInfo.amenities, "lit")}</li>
			  <li>Bicycle-Friendly: ${getSafe(parkingInfo.amenities, "bicycle")}</li>
			  <li>Motor Vehicle: ${getSafe(parkingInfo.amenities, "motorVehicle")}</li>
			</ul>
		  </li>
		  <li><strong>Surface:</strong> ${getSafe(parkingInfo, "surface")}</li>
		  <li><strong>Operator:</strong> ${getSafe(parkingInfo, "operator")}</li>
	`;

	if (end) {
		html += '</ul></div>';
	}

	return html;
}