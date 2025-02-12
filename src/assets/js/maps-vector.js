/*
Template Name: jsVectorMap - World Vector Map Setup
Author: MyraStudio
File: vector map js
*/

class VectorMap {

    initWorldMapMarker() {
        const map = new jsVectorMap({
            map: 'world',
            selector: '#world-map-markers',
            zoomOnScroll: true,
            zoomButtons: true,
            markersSelectable: true,
            markers: [
                { name: "Greenland", coords: [72, -42] },
                { name: "Canada", coords: [56.1304, -106.3468] },
                { name: "Brazil", coords: [-14.2350, -51.9253] },
                { name: "Egypt", coords: [26.8206, 30.8025] },
                { name: "Russia", coords: [61, 105] },
                { name: "China", coords: [35.8617, 104.1954] },
                { name: "United States", coords: [37.0902, -95.7129] },
                { name: "Norway", coords: [60.472024, 8.468946] },
                { name: "Ukraine", coords: [48.379433, 31.16558] },
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
            markers: [{
                name: "Greenland",
                coords: [72, -42]
            },
            {
                name: "Canada",
                coords: [56.1304, -106.3468]
            },
            {
                name: "Brazil",
                coords: [-14.2350, -51.9253]
            },
            {
                name: "Egypt",
                coords: [26.8206, 30.8025]
            },
            {
                name: "Russia",
                coords: [61, 105]
            },
            {
                name: "China",
                coords: [35.8617, 104.1954]
            },
            {
                name: "United States",
                coords: [37.0902, -95.7129]
            },
            {
                name: "Norway",
                coords: [60.472024, 8.468946]
            },
            {
                name: "Ukraine",
                coords: [48.379433, 31.16558]
            },
            ],
            lines: [{
                from: "Canada",
                to: "Egypt"
            },
            {
                from: "Russia",
                to: "Egypt"
            },
            {
                from: "Greenland",
                to: "Egypt"
            },
            {
                from: "Brazil",
                to: "Egypt"
            },
            {
                from: "United States",
                to: "Egypt"
            },
            {
                from: "China",
                to: "Egypt"
            },
            {
                from: "Norway",
                to: "Egypt"
            },
            {
                from: "Ukraine",
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
                {
                    name: "Greenland",
                    coords: [71.7069, -42.6043]
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