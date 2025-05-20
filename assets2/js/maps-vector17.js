class VectorMap {
    constructor() {
        this.countries = [
            { name: "Argentina", coords: [-38.4160, -63.6166] },
            { name: "Brazil", coords: [-14.2350, -51.9253] },
            { name: "Chile", coords: [-35.6751, -71.5429] },
            { name: "Colombia", coords: [4.5708, -74.2973] },
            { name: "Costa Rica", coords: [9.7489, -83.7534] },
            { name: "El Salvador", coords: [13.7942, -88.8965] },
            { name: "Honduras", coords: [15.1999, -86.2419] },
            { name: "Mexico", coords: [23.6345, -102.5527] },
            { name: "Nicaragua", coords: [12.8654, -85.2072] },
            { name: "Peru", coords: [-9.1899, -75.0152] },
            { name: "España", coords: [40.4636, -3.7492] }
        ];

        this.map = null;
        this.countryLayers = {};
        this.svgCustomLayer = null;
    }

    initWorldMapMarker() {
        this.map = L.map('world-map-markers', {
            zoomControl: true,
            scrollWheelZoom: true,
            minZoom: 1,
            maxZoom: 5,
            maxBoundsViscosity: 1.0,
            attributionControl: false,
            worldCopyJump: true  // Permite que el mapa se repita horizontalmente
        }).setView([0, 0], 1); // Vista inicial ligeramente desplazada hacia arriba y con zoom 2

        // Establecer límites máximos para el mapa (para "fijarlo" al mundo)
        const southWest = L.latLng(-60, -180);
        const northEast = L.latLng(90, 180);
        this.map.setMaxBounds(new L.LatLngBounds(southWest, northEast));

        // Añadir capa de mapa base
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 19,
            noWrap: true  // Evita que el mapa se repita
        }).addTo(this.map);

        fetch('countries.geojson')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                L.geoJson(data, {
                    style: (feature) => {
                        return {
                            fillColor: '#f0f0f0',
                            weight: 1,
                            opacity: 1,
                            color: '#64748b',
                            fillOpacity: 0.7
                        };
                    },
                    onEachFeature: (feature, layer) => {
                        if (feature.properties && feature.properties.name) {
                            this.countryLayers[feature.properties.name] = layer;
                        }
                    }
                }).addTo(this.map);

                // Asegurarse de que el mapa se ajusta para mostrar todo el mundo
                setTimeout(() => {
                    this.map.invalidateSize();
                    this.map.fitWorld();
                }, 100);

                this.addMarkersAndCustomLabels();
            })
            .catch(error => {
                console.error('Error al cargar el GeoJSON de países:', error);
                this.addMarkersAndCustomLabels();
                
                // Asegurarse de que el mapa se ajusta para mostrar todo el mundo
                setTimeout(() => {
                    this.map.invalidateSize();
                    this.map.fitWorld();
                }, 100);
            });

        // Asegurarse de que el mapa se redibuja correctamente
        setTimeout(() => {
            this.map.invalidateSize();
            this.map.fitWorld();
        }, 500);
    }

    addMarkersAndCustomLabels() {
        this.svgCustomLayer = L.svg().addTo(this.map);
        const svgElement = this.svgCustomLayer.getPane().querySelector('svg');

        let customElementsGroup = svgElement.querySelector('.custom-map-elements');
        if (!customElementsGroup) {
            customElementsGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            customElementsGroup.setAttribute('class', 'custom-map-elements');
            svgElement.appendChild(customElementsGroup);
        } else {
            while (customElementsGroup.firstChild) {
                customElementsGroup.removeChild(customElementsGroup.firstChild);
            }
        }

        const markerGroup = L.layerGroup().addTo(this.map);

        this.countries.forEach(country => {
            const latLng = [country.coords[0], country.coords[1]];

            const marker = L.circleMarker(latLng, {
                radius: 6,
                fillColor: "#0ea5e9",
                color: "#0ea5e9",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            }).addTo(markerGroup);

            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('stroke', '#777');
            line.setAttribute('stroke-width', '0.5');
            line.setAttribute('stroke-dasharray', '3, 3');
            line.setAttribute('opacity', '0.7');
            customElementsGroup.appendChild(line);

            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('font-family', "'Louis George Café', sans-serif");
            text.setAttribute('font-size', '10px');
            text.setAttribute('fill', '#333');
            text.textContent = country.name;
            text.style.pointerEvents = 'none';
            customElementsGroup.appendChild(text);

            country.marker = marker;
            country.svgLine = line;
            country.svgText = text;

            marker.on('mouseover', () => {
                const countryLayer = this.countryLayers[country.name];
                if (countryLayer) {
                    countryLayer.setStyle({
                        weight: 2,
                        color: '#0ea5e9',
                        fillOpacity: 0.9
                    });
                }
                country.svgLine.setAttribute('opacity', '1');
                country.svgLine.removeAttribute('stroke-dasharray');
            });

            marker.on('mouseout', () => {
                const countryLayer = this.countryLayers[country.name];
                if (countryLayer) {
                    countryLayer.setStyle({
                        weight: 1,
                        color: '#64748b',
                        fillOpacity: 0.7
                    });
                }
                country.svgLine.setAttribute('opacity', '0.7');
                country.svgLine.setAttribute('stroke-dasharray', '3, 3');
            });
        });

        this.map.on('moveend', () => {
            this.updateCustomLabelsAndLines();
        });

        this.updateCustomLabelsAndLines();
    }

    updateCustomLabelsAndLines() {
        if (!this.map || !this.svgCustomLayer) return;

        this.countries.forEach(country => {
            if (!country.marker || !country.svgLine || !country.svgText) return;

            const markerLatLng = country.marker.getLatLng();
            const markerPoint = this.map.latLngToLayerPoint(markerLatLng);

            const markerX = markerPoint.x;
            const markerY = markerPoint.y;

            let labelOffsetX = 0;
            let labelOffsetY = 0;
            let textAnchor = 'start';

            
            switch (country.name) {
                case "Colombia":
                    labelOffsetX = -25;
                    labelOffsetY = 15;
                    textAnchor = 'end';
                    break;
                case "Costa Rica":
                    labelOffsetX = 25;
                    labelOffsetY = -10;
                    textAnchor = 'start';
                    break;
                case "El Salvador":
                    labelOffsetX = 40;
                    labelOffsetY = -15;
                    textAnchor = 'start';
                    break;
                case "Honduras":
                    labelOffsetX = -30;
                    labelOffsetY = -5;
                    textAnchor = 'end';
                    break;
                case "Nicaragua":
                    labelOffsetX = -20;
                    labelOffsetY = 10;
                    textAnchor = 'end';
                    break;
                case "Mexico":
                    labelOffsetX = -20;
                    labelOffsetY = -10;
                    textAnchor = 'end';
                    break;
                case "Brazil":
                    labelOffsetX = 15;
                    labelOffsetY = -10;
                    textAnchor = 'start';
                    break;
                case "Peru":
                    labelOffsetX = -15;
                    labelOffsetY = 10;
                    textAnchor = 'end';
                    break;
                case "Argentina":
                    labelOffsetX = 15;
                    labelOffsetY = 10;
                    textAnchor = 'start';
                    break;
                case "Chile":
                    labelOffsetX = -15;
                    labelOffsetY = 10;
                    textAnchor = 'end';
                    break;
                case "España":
                    labelOffsetX = 25;
                    labelOffsetY = 0;
                    textAnchor = 'start';
                    break;
                default:
                    labelOffsetX = 15;
                    labelOffsetY = -5;
                    textAnchor = 'start';
                    break;
            }

            const labelX = markerX + labelOffsetX;
            const labelY = markerY + labelOffsetY;

            country.svgLine.setAttribute('x1', markerX);
            country.svgLine.setAttribute('y1', markerY);
            country.svgLine.setAttribute('x2', labelX);
            country.svgLine.setAttribute('y2', labelY);

            country.svgText.setAttribute('x', labelX);
            country.svgText.setAttribute('y', labelY);
            country.svgText.setAttribute('text-anchor', textAnchor);
        });
    }

    init() {
        this.initWorldMapMarker();
    }
}

document.addEventListener('DOMContentLoaded', function () {
    new VectorMap().init();
});