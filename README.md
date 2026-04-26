# Live Earthquake Map

A browser-based live earthquake map that gathers earthquake reports from multiple public sources, merges duplicate events, and displays them on an interactive world map.

Live page:

https://gnrvrm.github.io/Live_Earthquake_Map/

## Features

- Multi-source earthquake feed aggregation
- Duplicate event merging across sources
- Source-by-source event details in map popups
- Auto refresh every minute
- Time filters up to the last 7 days
- Region search and map zoom
- Turkish interface and localized event direction text
- Embeddable iframe widget and JavaScript SDK for external websites

## Embed on another website

The quickest integration is the iframe widget:

```html
<iframe
  src="https://gnrvrm.github.io/Live_Earthquake_Map/embed.html?lat=39&lon=35&zoom=5&window=24&minMag=3&lang=tr"
  width="100%"
  height="500"
  loading="lazy"
  style="border:0">
</iframe>
```

For programmatic control, load the SDK:

```html
<div id="quake-map"></div>
<script src="https://gnrvrm.github.io/Live_Earthquake_Map/embed.js"></script>
<script>
  const map = EarthquakeMap.create("#quake-map", {
    center: [39, 35],
    zoom: 5,
    minMagnitude: 3,
    windowHours: 24,
    lang: "tr"
  });

  map.on("data", async () => {
    const events = await map.getEvents({ limit: 10 });
    console.log(events);
  });
</script>
```

Full integration docs: [docs/embed.md](docs/embed.md)

## Data and Map Attribution

This project displays data from public earthquake and geospatial services, including USGS, EMSC, GDACS, AFAD, Kandilli, GeoNet, JMA, and BMKG.

The map uses Leaflet with OpenStreetMap/CARTO basemap attribution shown in the UI.

No license has been added yet.
