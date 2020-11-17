const width = 900;
const height = 600;

const svg = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

const projection = d3.geoMercator()
    .scale(140)
    .translate([width / 2, height / 1.5]);
const path = d3.geoPath(projection);

// Grouping of all the paths of the countries in the SVG
const g = svg.append('g');

// d3.json() returns Promise
d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
    .then(data => {

        // TopoJSON used to encode topology (ext of GeoJSON)
        const countries = topojson.feature(data, data.objects.countries);

        g.selectAll('path')
            .data(countries.features)
            .enter()
            .append('path')
            .attr('class', 'country')
            .attr('d', path);
    });