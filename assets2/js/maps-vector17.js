class VectorMap {

    initWorldMapMarker() {
        const map = new jsVectorMap({
            map: 'world',
            selector: '#world-map-markers',
            zoomOnScroll: true,
            zoomButtons: true,
            markersSelectable: true,
            markers: [
                {name:"Peru",coords:[-9.1899,-75.0152]},
                {name:"Chile",coords:[-35.6751, -71.5429]},
                {name:"Argentina",coords:[-38.4160, -63.6166]},
                {name:"Colombia",coords:[4.5708, -74.2973]},
                {name:"Costa Rica",coords:[9.7489, -83.7534]},
                {name:"Honduras",coords:[15.1999, -86.2419]},
                {name:"Mexico",coords:[23.6345, -102.5527]},
                {name:"Nicaragua",coords:[12.8654, -85.2072]},
                {name:"Spain",coords:[40.4636, -3.7492]},
                {name:"Brazil",coords:[-14.2350, -51.9253]},
                {name:"El Salvador",coords:[13.7942, -88.8965]}, // Agregado El Salvador
            ],
            markerStyle: {
                initial: { fill: "#0ea5e9" },
                selected: { fill: "#0ea5e96e" }
            },
            labels: {
                markers: {
                    render: marker => marker.name
                }
            }
        });
    }

    // World Map Markers with Line
    initWorldMarkerLine() {
        const worldlinemap = new jsVectorMap({
            map: "world_merc",
            selector: "#world-map-markers-line",
            zoomOnScroll: true,
            zoomButtons: true,
            markers: [
                {name:"Peru",coords:[-9.1899,-75.0152]},
                {name:"Chile",coords:[-35.6751, -71.5429]},
                {name:"Argentina",coords:[-38.4160, -63.6166]},
                {name:"Colombia",coords:[4.5708, -74.2973]},
                {name:"Costa Rica",coords:[9.7489, -83.7534]},
                {name:"Honduras",coords:[15.1999, -86.2419]},
                {name:"Mexico",coords:[23.6345, -102.5527]},
                {name:"Nicaragua",coords:[12.8654, -85.2072]},
                {name:"Spain",coords:[40.4636, -3.7492]},
                {name:"Brazil",coords:[-14.2350, -51.9253]},
                {name:"El Salvador",coords:[13.7942, -88.8965]}, // Agregado El Salvador
            ],
            lines: [{
                from: "Peru",
                to: "Egypt"
            },
            {
                from: "Chile",
                to: "Egypt"
            },
            {
                from: "Argentina",
                to: "Egypt"
            },
            {
                from: "Colombia",
                to: "Egypt"
            },
            {
                from: "Costa Rica",
                to: "Egypt"
            },
            {
                from: "Honduras",
                to: "Egypt"
            },
            {
                from: "Mexico",
                to: "Egypt"
            },
            {
                from: "Spain",
                to: "Egypt"
            },
            {
                from: "Nicaragua",
                to: "Egypt"
            },
            {
                from: "Brazil",
                to: "Egypt"
            },
            {
                from: "El Salvador", // Agregado El Salvador
                to: "Egypt"
            },
            ],
            regionStyle: {
                // initial: {
                //     stroke: "#0ea5e9",
                //     strokeWidth: 0.25,
                //     fill: '#0ea5e969',
                //     fillOpacity: 1,
                // },
            },
            markerStyle: {
                initial: { fill: "#0ea5e9" },
                selected: { fill: "#0ea5e9" }
            },
            lineStyle: {
                animation: true,
                strokeDasharray: "6 3 6",
            },
        });
    }

    // World Map Markers with Image
    initWorldMarkerImage() {
        const worldlinemap = new jsVectorMap({
            map: 'world_merc',
            selector: '#world-map-markers-image',
            zoomOnScroll: true,
            zoomButtons: true,
            regionStyle: {
                initial: {
                    // stroke: "#9599ad",
                    // strokeWidth: 0.25,
                    // fill: '#0ea5e969',
                    // fillOpacity: 1,
                },
            },
            selectedMarkers: [0, 2],
            markersSelectable: true,
            markers: [{
                    name: "India",
                    coords: [20, 77]
                },
                {
                    name: "Russia",
                    coords: [61.524, 105.3188]
                },
                {
                    name: "Canada",
                    coords: [56.1304, -106.3468]
                },
            ],
            markerStyle: {
                initial: {
                    image: "assets/images/logo.png"
                }
            },
            labels: {
                markers: {
                    render: function (marker) {
                        return marker.name
                    }
                }
            }
        });
    }

    init() {
        this.initWorldMapMarker();
        this.initWorldMarkerLine();
        this.initWorldMarkerImage();
    }

}

document.addEventListener('DOMContentLoaded', function (e) {
    new VectorMap().init();
});