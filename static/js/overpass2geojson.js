function overpassToGeoJSON(data) {
	return {
		type: "FeatureCollection",
		features: data.elements.map(element => {
			let geometry = null;
			const properties = element.tags || {};

			
			properties.osmType = element.type;
			properties.osmId = element.id;

			
			switch (element.type) {
				case 'node':
					geometry = {
						type: "Point",
						coordinates: [element.lon, element.lat]
					};
					break;

				case 'way':
					if (element.geometry) {
						geometry = {
							type: "LineString",
							coordinates: element.geometry.map(point => [point.lon, point.lat])
						};

						
						if (element.geometry.length >= 4 &&
							element.geometry[0].lon === element.geometry[element.geometry.length - 1].lon &&
							element.geometry[0].lat === element.geometry[element.geometry.length - 1].lat) {
							geometry.type = "Polygon";
							geometry.coordinates = [geometry.coordinates]; 
						}
					}
					break;

				case 'relation':
					
					if (element.tags && element.tags.type === 'multipolygon' && element.members) {
						const outerWays = [];
						const innerWays = [];

						
						element.members.forEach(member => {
							if (member.role === 'outer' && member.type === 'way') {
								outerWays.push(member);
							} else if (member.role === 'inner' && member.type === 'way') {
								innerWays.push(member);
							}
						});

						
						const outerCoordinates = outerWays.map(way => {
							return way.geometry.map(point => [point.lon, point.lat]);
						});

						
						const innerCoordinates = innerWays.map(way => {
							return way.geometry.map(point => [point.lon, point.lat]);
						});

						
						geometry = {
							type: "Polygon",
							coordinates: [...outerCoordinates, ...innerCoordinates]
						};
					}
					break;
			}

			return geometry ? {
				type: "Feature",
				geometry: geometry,
				properties: properties
			} : null;

		}).filter(feature => feature) 
	};
}
