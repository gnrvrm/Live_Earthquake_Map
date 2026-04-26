# Embedding Live Earthquake Map

Live Earthquake Map can be embedded in other websites in two ways:

- Use `embed.html` directly in an iframe for the simplest setup.
- Use `embed.js` when the host page needs to control the map or read event data.

The embed is still a browser-side widget. It can expose normalized event data to the host page through JavaScript, but it is not a server-to-server HTTP API. If you need API keys, rate limits, private caching, or guaranteed service-level behavior, add a backend or serverless API layer later.

## Quick iframe

```html
<iframe
  src="https://gnrvrm.github.io/Live_Earthquake_Map/embed.html?lat=39&lon=35&zoom=5&window=24&minMag=3&lang=tr"
  width="100%"
  height="500"
  loading="lazy"
  style="border:0">
</iframe>
```

## Iframe URL options

Use these query parameters with `embed.html`.

| Parameter | Example | Description |
| --- | --- | --- |
| `lat` | `39` | Initial center latitude. Use with `lon`. |
| `lon` | `35` | Initial center longitude. `lng` also works. |
| `center` | `39,35` | Alternative center format as `lat,lon`. |
| `zoom` | `5` | Initial zoom from `2` to `12`. |
| `bbox` | `26,35,45,42` | Fit the map to `west,south,east,north`. Overrides center. |
| `window` | `24` | Time window in hours, from `1` to `168`. |
| `minMag` | `3` | Minimum magnitude. |
| `sources` | `usgs,emsc,afad` | Comma-separated source keys. |
| `lang` | `tr` | `tr` or `en`. `locale` also works. |
| `search` | `0` | Set `0` to hide the search control. |
| `legend` | `0` | Set `0` to hide the legend. |
| `caption` | `0` | Set `0` to hide the map caption. |
| `status` | `0` | Set `0` to hide the status overlay. |

Available source keys:

```txt
usgs, emsc, gdacs, afad, kandilli, geonet, jma, bmkg
```

## JavaScript SDK

Load `embed.js` on the host website:

```html
<div id="quake-map"></div>
<script src="https://gnrvrm.github.io/Live_Earthquake_Map/embed.js"></script>
<script>
  const map = EarthquakeMap.create("#quake-map", {
    center: [39, 35],
    zoom: 5,
    minMagnitude: 3,
    windowHours: 24,
    lang: "tr",
    height: 520
  });
</script>
```

`EarthquakeMap.create(target, options)` creates an iframe and returns a controller object.

## SDK options

| Option | Type | Description |
| --- | --- | --- |
| `center` | `[lat, lon]` | Initial map center. |
| `lat`, `lon` | `number` | Alternative center fields. |
| `bbox` | `[west, south, east, north]` | Initial bounding box. |
| `zoom` | `number` | Initial zoom. |
| `windowHours` | `number` | Time window in hours. |
| `minMagnitude` | `number` | Minimum magnitude. |
| `sources` | `string[]` or object | Enabled sources. |
| `lang` | `"tr"` or `"en"` | Interface language. |
| `search` | `boolean` | Show or hide search. |
| `legend` | `boolean` | Show or hide legend. |
| `caption` | `boolean` | Show or hide caption. |
| `status` | `boolean` | Show or hide status. |
| `height` | `number` or CSS string | Iframe height. Default is `500px`. |
| `width` | `number` or CSS string | Iframe width. Default is `100%`. |
| `embedUrl` | `string` | Override the `embed.html` URL. |

## SDK commands

All commands return a Promise.

```js
await map.setView({ lat: 38.42, lon: 27.14, zoom: 7 });
await map.fitBounds({ west: 26, south: 35, east: 45, north: 42 });
await map.setFilters({ minMagnitude: 4, windowHours: 72 });
await map.setFilters({ sources: ["usgs", "emsc", "afad"] });
await map.search("Izmir");
await map.refresh();

const state = await map.getState();
const events = await map.getEvents({ limit: 20, includeReports: true });
```

`getEvents()` accepts extra filters:

```js
const regionalEvents = await map.getEvents({
  bbox: [26, 35, 45, 42],
  minMagnitude: 3,
  limit: 50
});

const nearbyEvents = await map.getEvents({
  center: [38.42, 27.14],
  radiusKm: 250,
  limit: 25
});
```

Useful `getEvents()` options:

| Option | Description |
| --- | --- |
| `limit` | Maximum returned events. Default is `100`, maximum is `1000`. |
| `all` | Set `true` to read all merged events instead of only currently visible events. |
| `includeReports` | Set `true` to include source-level records for each merged event. |
| `bbox` | Further filter by `[west, south, east, north]`. |
| `center`, `radiusKm` | Further filter by distance from a point. |
| `minMagnitude` | Further filter by magnitude. |

Open an event from the host page:

```js
const [first] = await map.getEvents({ limit: 1 });
if (first) {
  await map.openEvent(first.id);
}
```

## SDK events

```js
map.on("ready", (state) => {
  console.log("Map iframe is ready", state);
});

map.on("data", ({ state, events }) => {
  console.log("Latest visible events", events);
});

map.on("filters", (state) => {
  console.log("Filters changed", state.filters);
});

map.on("eventClick", ({ event }) => {
  console.log("User selected event", event);
});

map.on("error", (error) => {
  console.warn("Map data error", error);
});
```

To remove a listener:

```js
const unsubscribe = map.on("eventClick", console.log);
unsubscribe();
```

To destroy the widget:

```js
map.destroy();
```

## Event data shape

`getEvents()` returns normalized earthquake events:

```js
{
  id: "usgs:example",
  magnitude: 4.2,
  magnitudeMin: 4.1,
  magnitudeMax: 4.3,
  depth: 10,
  lat: 38.42,
  lon: 27.14,
  place: "Izmir",
  rawPlace: "Izmir",
  time: "2026-04-26T10:15:00.000Z",
  timestamp: 1777198500000,
  sources: ["USGS", "EMSC"],
  sourceKeys: ["usgs", "emsc"],
  sourceCount: 2,
  tsunami: false,
  alertLevel: null,
  url: "https://example.com/source-record"
}
```

When `includeReports: true` is used, each event also includes a `reports` array with source-level records.

## Notes for production use

- Keep the OpenStreetMap/CARTO attribution visible unless you provide equivalent attribution elsewhere.
- Data comes from public earthquake services and can vary by source availability.
- The widget refreshes every minute in the iframe.
- The JavaScript SDK uses `postMessage`; it does not expose private server credentials.
- A future HTTP API should be implemented as a backend or serverless service, not as static GitHub Pages files.
