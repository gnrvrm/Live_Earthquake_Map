const REFRESH_INTERVAL_MS = 60 * 1000;
const FETCH_TIMEOUT_MS = 18 * 1000;
const MAX_HISTORY_HOURS = 168;
const FETCH_LOOKBACK_HOURS = MAX_HISTORY_HOURS + 2;
const MAX_EVENT_LIST_ITEMS = 180;
const MERGE_YIELD_INTERVAL = 180;
const MARKER_RENDER_CHUNK_SIZE = 75;
const MAX_MERGE_TIME_MS = 15 * 60 * 1000;
const FETCH_FUTURE_MARGIN_MS = 60 * 60 * 1000;
const APP_VERSION_URL = "https://api.github.com/repos/gnrvrm/Live_Earthquake_Map/commits/main";
const APP_VERSION_OWNER = "E.Guner";
const TURKEY_OFFSET_MS = 3 * 60 * 60 * 1000;
const DEFAULT_LOCALE = "tr";
const SUPPORTED_LOCALES = ["tr", "en"];
const LOCALE_STORAGE_KEY = "earthquake-map-locale";
const MOBILE_LAYOUT_QUERY = "(max-width: 780px)";
const LOCALE_CONFIG = {
  tr: {
    htmlLang: "tr",
    dateLocale: "tr-TR",
    geocodeLanguage: "tr",
  },
  en: {
    htmlLang: "en",
    dateLocale: "en-US",
    geocodeLanguage: "en",
  },
};

const TRANSLATIONS = {
  tr: {
    "site.title": "Deprem Radarı",
    "controlPanel.aria": "Deprem kontrol paneli",
    "brand.eyebrow": "Canlı küresel izleme",
    "languageSwitch.aria": "Dil seçimi",
    "language.tr": "Türkçe",
    "language.en": "English",
    "actions.refresh": "Yenile",
    "status.waiting": "Veri bekleniyor",
    "status.refreshing": "Kaynaklar güncelleniyor",
    "status.noReadableData": "Kaynaklardan okunabilir deprem kaydı gelmedi.",
    "status.fetchFailed": "Veri alınamadı, son başarılı görünüm korunuyor",
    "status.sourcesOffline": "Kaynaklar şu an yanıt vermiyor.",
    "status.sourcesLive": ({ liveCount, total, rawCount }) =>
      `${liveCount}/${total} kaynak canlı · ${formatInteger(rawCount)} ham kayıt`,
    "status.sourcesWithErrors": ({ liveCount, total, rawCount, failedCount }) =>
      `${liveCount}/${total} kaynak canlı · ${formatInteger(rawCount)} ham kayıt · ${failedCount} hata`,
    "sources.details": "Kaynak detayları",
    "sources.statusesAria": "Kaynak durumları",
    "sources.summary": ({ live, total, loading, error, rawCount }) =>
      `${live}/${total} canlı${loading ? " · güncelleniyor" : ""}${error ? ` · ${error} hata` : ""} · ${formatInteger(
        rawCount
      )} ham kayıt`,
    "sourceStatus.ready": "Hazır",
    "sourceStatus.fetching": "Çekiliyor",
    "sourceStatus.live": "Canlı",
    "sourceStatus.error": "Hata",
    "metrics.aria": "Özet",
    "metrics.events": "Olay",
    "metrics.largest": "En büyük",
    "metrics.avgDepth": "Ort. derinlik",
    "filters.aria": "Filtreler",
    "filters.time": "Zaman",
    "filters.timeRangeAria": "Zaman aralığı",
    "filters.minMagnitude": "Minimum büyüklük",
    "filters.source": "Kaynak",
    "filters.sourceAria": "Kaynak filtresi",
    "filters.summary": ({ windowLabel, minMagnitude, sourceCount }) =>
      `${windowLabel} · M${minMagnitude.toFixed(1)}+ · ${sourceCount} kaynak`,
    "events.aria": "Deprem olayları",
    "events.feed": "Olay Akışı",
    "events.visibleCount": ({ count }) => `${count} görünür`,
    "events.empty": "Görüntülenecek olay yok",
    "map.aria": "Dünya deprem haritası",
    "map.caption": ({ windowLabel, sourceCount }) => `Son ${windowLabel} ${sourceCount} kaynak seçili`,
    "search.aria": "Haritada bölge ara",
    "search.placeholder": "Bölge ara",
    "search.submit": "Ara",
    "search.clear": "Temizle",
    "search.tooShort": "En az 2 karakter girin.",
    "search.loading": "Aranıyor...",
    "search.noResult": "Sonuç bulunamadı.",
    "search.failed": "Arama şu an tamamlanamadı.",
    "search.resultFallback": "Arama sonucu",
    "legend.aria": "Büyüklük lejandı",
    "window.short.hour": ({ hours }) => `${hours} sa`,
    "window.short.day": ({ days }) => `${days} gün`,
    "window.label.hour": ({ hours }) => `${hours} saatte`,
    "window.label.day": ({ days }) => `${days} günde`,
    "place.unknown": "Konum belirtilmedi",
    "place.newZealandRegion": "Yeni Zelanda bölgesi",
    "place.japanRegion": "Japonya bölgesi",
    "place.indonesiaRegion": "Endonezya bölgesi",
    "place.near": ({ place }) => `${place} yakınları`,
    "place.offshore": ({ place }) => `${place} açıkları`,
    "place.coast": ({ place, direction }) => `${place} ${direction} kıyısı`,
    "depth.none": "Derinlik yok",
    "time.minutesAgo": ({ count }) => `${count} dk önce`,
    "time.hoursAgo": ({ count }) => `${count} sa önce`,
    "popup.magnitude": "Büyüklük",
    "popup.time": "Zaman",
    "popup.depth": "Derinlik",
    "popup.coordinates": "Koordinat",
    "popup.source": "Kaynak",
    "popup.intensity": "Şiddet",
    "popup.tsunami": "Tsunami uyarısı veya potansiyeli bildirildi",
    "popup.gdacsAlert": ({ level }) => `GDACS alarm seviyesi: ${level}`,
    "popup.sourceRecord": "Kaynak kaydı",
    "report.record": "kayıt",
    "reportStatus.updated": "güncellendi",
    "reportStatus.initial": "ilk kayıt",
  },
  en: {
    "site.title": "Earthquake Radar",
    "controlPanel.aria": "Earthquake control panel",
    "brand.eyebrow": "Live global monitoring",
    "languageSwitch.aria": "Language selection",
    "language.tr": "Türkçe",
    "language.en": "English",
    "actions.refresh": "Refresh",
    "status.waiting": "Waiting for data",
    "status.refreshing": "Updating sources",
    "status.noReadableData": "No readable earthquake records came from the sources.",
    "status.fetchFailed": "Data could not be loaded; keeping the last successful view",
    "status.sourcesOffline": "Sources are not responding right now.",
    "status.sourcesLive": ({ liveCount, total, rawCount }) =>
      `${liveCount}/${total} sources live · ${formatInteger(rawCount)} raw records`,
    "status.sourcesWithErrors": ({ liveCount, total, rawCount, failedCount }) =>
      `${liveCount}/${total} sources live · ${formatInteger(rawCount)} raw records · ${failedCount} errors`,
    "sources.details": "Source details",
    "sources.statusesAria": "Source statuses",
    "sources.summary": ({ live, total, loading, error, rawCount }) =>
      `${live}/${total} live${loading ? " · updating" : ""}${error ? ` · ${error} errors` : ""} · ${formatInteger(
        rawCount
      )} raw records`,
    "sourceStatus.ready": "Ready",
    "sourceStatus.fetching": "Fetching",
    "sourceStatus.live": "Live",
    "sourceStatus.error": "Error",
    "metrics.aria": "Summary",
    "metrics.events": "Events",
    "metrics.largest": "Largest",
    "metrics.avgDepth": "Avg. depth",
    "filters.aria": "Filters",
    "filters.time": "Time",
    "filters.timeRangeAria": "Time range",
    "filters.minMagnitude": "Minimum magnitude",
    "filters.source": "Source",
    "filters.sourceAria": "Source filter",
    "filters.summary": ({ windowLabel, minMagnitude, sourceCount }) =>
      `${windowLabel} · M${minMagnitude.toFixed(1)}+ · ${sourceCount} ${sourceCount === 1 ? "source" : "sources"}`,
    "events.aria": "Earthquake events",
    "events.feed": "Event Feed",
    "events.visibleCount": ({ count }) => `${count} visible`,
    "events.empty": "No events to display",
    "map.aria": "World earthquake map",
    "map.caption": ({ windowLabel, sourceCount }) =>
      `Last ${windowLabel} · ${sourceCount} ${sourceCount === 1 ? "source" : "sources"} selected`,
    "search.aria": "Search a region on the map",
    "search.placeholder": "Search region",
    "search.submit": "Search",
    "search.clear": "Clear",
    "search.tooShort": "Enter at least 2 characters.",
    "search.loading": "Searching...",
    "search.noResult": "No result found.",
    "search.failed": "Search could not be completed right now.",
    "search.resultFallback": "Search result",
    "legend.aria": "Magnitude legend",
    "window.short.hour": ({ hours }) => `${hours} hr`,
    "window.short.day": ({ days }) => `${days} days`,
    "window.label.hour": ({ hours }) => `${hours} ${hours === 1 ? "hour" : "hours"}`,
    "window.label.day": ({ days }) => `${days} ${days === 1 ? "day" : "days"}`,
    "place.unknown": "Location unavailable",
    "place.newZealandRegion": "New Zealand region",
    "place.japanRegion": "Japan region",
    "place.indonesiaRegion": "Indonesia region",
    "place.near": ({ place }) => `near ${place}`,
    "place.offshore": ({ place }) => `offshore ${place}`,
    "place.coast": ({ place, direction }) => `${direction} coast of ${place}`,
    "depth.none": "No depth",
    "time.minutesAgo": ({ count }) => `${count} min ago`,
    "time.hoursAgo": ({ count }) => `${count} hr ago`,
    "popup.magnitude": "Magnitude",
    "popup.time": "Time",
    "popup.depth": "Depth",
    "popup.coordinates": "Coordinates",
    "popup.source": "Source",
    "popup.intensity": "Intensity",
    "popup.tsunami": "Tsunami warning or potential reported",
    "popup.gdacsAlert": ({ level }) => `GDACS alert level: ${level}`,
    "popup.sourceRecord": "Source record",
    "report.record": "record",
    "reportStatus.updated": "updated",
    "reportStatus.initial": "initial report",
  },
};

const ATTRIBUTE_LABELS = {
  "önem": { tr: "önem", en: "importance" },
  "hissedilme": { tr: "hissedilme", en: "felt" },
  "yazar": { tr: "yazar", en: "author" },
  "kalite": { tr: "kalite", en: "quality" },
  "olay": { tr: "olay", en: "event" },
  "kaynak": { tr: "kaynak", en: "source" },
  "açıklama": { tr: "açıklama", en: "description" },
  "il": { tr: "il", en: "province" },
  "ilçe": { tr: "ilçe", en: "district" },
  "mahalle": { tr: "mahalle", en: "neighborhood" },
  "şiddet": { tr: "şiddet", en: "intensity" },
  "başlık": { tr: "başlık", en: "title" },
  "potansiyel": { tr: "potansiyel", en: "potential" },
  "hissedilen": { tr: "hissedilen", en: "felt" },
  "saat": { tr: "saat", en: "time" },
};

const DIRECTION_LABELS = {
  n: "kuzeyinde",
  nne: "kuzey-kuzeydoğusunda",
  ne: "kuzeydoğusunda",
  ene: "doğu-kuzeydoğusunda",
  e: "doğusunda",
  ese: "doğu-güneydoğusunda",
  se: "güneydoğusunda",
  sse: "güney-güneydoğusunda",
  s: "güneyinde",
  ssw: "güney-güneybatısında",
  sw: "güneybatısında",
  wsw: "batı-güneybatısında",
  w: "batısında",
  wnw: "batı-kuzeybatısında",
  nw: "kuzeybatısında",
  nnw: "kuzey-kuzeybatısında",
  north: "kuzeyinde",
  "north-northeast": "kuzey-kuzeydoğusunda",
  northeast: "kuzeydoğusunda",
  "east-northeast": "doğu-kuzeydoğusunda",
  east: "doğusunda",
  "east-southeast": "doğu-güneydoğusunda",
  southeast: "güneydoğusunda",
  "south-southeast": "güney-güneydoğusunda",
  south: "güneyinde",
  "south-southwest": "güney-güneybatısında",
  southwest: "güneybatısında",
  "west-southwest": "batı-güneybatısında",
  west: "batısında",
  "west-northwest": "batı-kuzeybatısında",
  northwest: "kuzeybatısında",
  "north-northwest": "kuzey-kuzeybatısında",
};

const INDONESIAN_DIRECTION_LABELS = {
  utara: "kuzeyinde",
  "timur laut": "kuzeydoğusunda",
  timur: "doğusunda",
  tenggara: "güneydoğusunda",
  selatan: "güneyinde",
  "barat daya": "güneybatısında",
  barat: "batısında",
  "barat laut": "kuzeybatısında",
};

const US_STATE_LABELS = {
  AL: "Alabama",
  AK: "Alaska",
  AZ: "Arizona",
  AR: "Arkansas",
  CA: "Kaliforniya",
  CO: "Colorado",
  CT: "Connecticut",
  DE: "Delaware",
  FL: "Florida",
  GA: "Georgia",
  HI: "Hawaii",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  IA: "Iowa",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  ME: "Maine",
  MD: "Maryland",
  MA: "Massachusetts",
  MI: "Michigan",
  MN: "Minnesota",
  MS: "Mississippi",
  MO: "Missouri",
  MT: "Montana",
  NE: "Nebraska",
  NV: "Nevada",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NY: "New York",
  NC: "Kuzey Karolina",
  ND: "Kuzey Dakota",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  PA: "Pensilvanya",
  RI: "Rhode Island",
  SC: "Güney Karolina",
  SD: "Güney Dakota",
  TN: "Tennessee",
  TX: "Teksas",
  UT: "Utah",
  VT: "Vermont",
  VA: "Virginia",
  WA: "Washington",
  WV: "Batı Virginia",
  WI: "Wisconsin",
  WY: "Wyoming",
};

const PLACE_REPLACEMENTS = [
  [/\bCentral Turkey\b/gi, "Orta Türkiye"],
  [/\bWestern Turkey\b/gi, "Batı Türkiye"],
  [/\bEastern Turkey\b/gi, "Doğu Türkiye"],
  [/\bNorthern Turkey\b/gi, "Kuzey Türkiye"],
  [/\bSouthern Turkey\b/gi, "Güney Türkiye"],
  [/\bTurkey-Syria Border Region\b/gi, "Türkiye-Suriye sınır bölgesi"],
  [/\bTurkey-Iran Border Region\b/gi, "Türkiye-İran sınır bölgesi"],
  [/\bAegean Sea\b/gi, "Ege Denizi"],
  [/\bMediterranean Sea\b/gi, "Akdeniz"],
  [/\bBlack Sea\b/gi, "Karadeniz"],
  [/\bMarmara Sea\b/gi, "Marmara Denizi"],
  [/\bDodecanese Islands\b/gi, "On İki Ada"],
  [/\bCalifornia\b/gi, "Kaliforniya"],
  [/\bGreece\b/gi, "Yunanistan"],
  [/\bTürkiye\b/gi, "Türkiye"],
  [/\bTurkey\b/gi, "Türkiye"],
  [/\bSyria\b/gi, "Suriye"],
  [/\bIran\b/gi, "İran"],
  [/\bJapan\b/gi, "Japonya"],
  [/\bIndonesia\b/gi, "Endonezya"],
  [/\bNew Zealand\b/gi, "Yeni Zelanda"],
  [/\bPhilippines\b/gi, "Filipinler"],
  [/\bChile\b/gi, "Şili"],
  [/\bMexico\b/gi, "Meksika"],
  [/\bBagian Timur\b/gi, "Doğu Bölümü"],
  [/\bBagian Barat\b/gi, "Batı Bölümü"],
  [/\bMaluku\b/gi, "Maluku"],
  [/\bAlaska\b/gi, "Alaska"],
  [/\bregion\b/gi, "bölgesi"],
];

const SOURCE_PRIORITY = {
  usgs: 10,
  afad: 9,
  kandilli: 8,
  emsc: 7,
  jma: 6,
  geonet: 5,
  bmkg: 4,
  gdacs: 3,
};

const DATA_SOURCES = {
  usgs: {
    label: "USGS",
    shortLabel: "USGS",
    format: "json",
    url: () => {
      const start = new Date(Date.now() - FETCH_LOOKBACK_HOURS * 60 * 60 * 1000).toISOString();
      return `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&orderby=time&starttime=${encodeURIComponent(
        start
      )}&limit=20000`;
    },
    normalize: normalizeUsgs,
  },
  emsc: {
    label: "EMSC",
    shortLabel: "EMSC",
    format: "json",
    url: () =>
      `https://www.seismicportal.eu/fdsnws/event/1/query?format=json&limit=8000&orderby=time&start=${encodeURIComponent(
        new Date(Date.now() - FETCH_LOOKBACK_HOURS * 60 * 60 * 1000).toISOString().replace(".000Z", "")
      )}`,
    normalize: normalizeEmsc,
  },
  gdacs: {
    label: "GDACS",
    shortLabel: "GDACS",
    format: "json",
    url: () => {
      const from = formatDateOnly(new Date(Date.now() - FETCH_LOOKBACK_HOURS * 60 * 60 * 1000));
      const to = formatDateOnly(new Date(Date.now() + 60 * 60 * 1000));
      return `https://www.gdacs.org/gdacsapi/api/events/geteventlist/SEARCH?eventlist=EQ&fromdate=${from}&todate=${to}&alertlevel=green;orange;red`;
    },
    normalize: normalizeGdacs,
  },
  afad: {
    label: "AFAD",
    shortLabel: "AFAD",
    format: "text",
    url: () => {
      const start = formatTurkeyApiDate(new Date(Date.now() - FETCH_LOOKBACK_HOURS * 60 * 60 * 1000));
      const end = formatTurkeyApiDate(new Date(Date.now() + 60 * 60 * 1000));
      const target = `https://servisnet.afad.gov.tr/apigateway/deprem/apiv2/event/filter?start=${encodeURIComponent(
        start
      )}&end=${encodeURIComponent(end)}&limit=600&orderby=timedesc`;
      return `https://r.jina.ai/http://${target}`;
    },
    normalize: normalizeAfad,
  },
  kandilli: {
    label: "Kandilli",
    shortLabel: "KOERI",
    format: "text",
    url: () => "https://r.jina.ai/http://www.koeri.boun.edu.tr/scripts/lst9.asp",
    normalize: normalizeKandilli,
  },
  geonet: {
    label: "GeoNet",
    shortLabel: "GeoNet",
    format: "json",
    url: () => "https://api.geonet.org.nz/quake?MMI=-1",
    normalize: normalizeGeoNet,
  },
  jma: {
    label: "JMA",
    shortLabel: "JMA",
    format: "json",
    url: () => "https://www.jma.go.jp/bosai/quake/data/list.json",
    normalize: normalizeJma,
  },
  bmkg: {
    label: "BMKG",
    shortLabel: "BMKG",
    format: "json",
    url: () => [
      "https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json",
      "https://data.bmkg.go.id/DataMKG/TEWS/gempaterkini.json",
      "https://data.bmkg.go.id/DataMKG/TEWS/gempadirasakan.json",
    ],
    normalize: normalizeBmkg,
  },
};

const state = {
  locale: DEFAULT_LOCALE,
  map: null,
  markerLayer: null,
  markerRenderer: null,
  searchMarker: null,
  searchToken: 0,
  renderToken: 0,
  markerRefs: new Map(),
  reports: [],
  events: [],
  filteredEvents: [],
  sourceStats: Object.fromEntries(
    Object.keys(DATA_SOURCES).map((key) => [key, { statusKey: "ready", count: 0, mode: "idle" }])
  ),
  globalStatus: { key: "status.waiting", params: {}, mode: "idle" },
  mapSearchStatus: { message: "", params: {}, mode: "idle" },
  selectedId: null,
  hasLoadedOnce: false,
  isRefreshing: false,
  filters: {
    windowHours: 24,
    minMagnitude: 0,
    sources: Object.fromEntries(Object.keys(DATA_SOURCES).map((key) => [key, true])),
  },
};

const elements = {};

document.addEventListener("DOMContentLoaded", () => {
  collectElements();
  initLanguage();
  initMap();
  initControls();
  initResponsiveLayout();
  applyLanguage({ rerender: false });
  createIcons();
  loadAppVersion();
  refreshEvents();
  window.setInterval(refreshEvents, REFRESH_INTERVAL_MS);
  document.addEventListener("visibilitychange", handleVisibilityChange);
});

function collectElements() {
  elements.refreshButton = document.getElementById("refresh-button");
  elements.statusSummary = document.getElementById("status-summary");
  elements.statusDot = document.getElementById("global-status-dot");
  elements.lastUpdated = document.getElementById("last-updated");
  elements.appVersion = document.getElementById("app-version");
  elements.sourceSummary = document.getElementById("source-summary");
  elements.metricTotal = document.getElementById("metric-total");
  elements.metricMax = document.getElementById("metric-max");
  elements.metricStrong = document.getElementById("metric-strong");
  elements.metricDepth = document.getElementById("metric-depth");
  elements.sourceDetails = document.getElementById("source-details");
  elements.filterDetails = document.getElementById("filter-details");
  elements.filterSummary = document.getElementById("filter-summary");
  elements.magnitudeFilter = document.getElementById("magnitude-filter");
  elements.magnitudeValue = document.getElementById("magnitude-value");
  elements.visibleCount = document.getElementById("visible-count");
  elements.eventList = document.getElementById("event-list");
  elements.mapCaption = document.getElementById("map-caption");
  elements.mapSearchForm = document.getElementById("map-search");
  elements.mapSearchInput = document.getElementById("map-search-input");
  elements.mapSearchSubmit = document.getElementById("map-search-submit");
  elements.mapSearchClear = document.getElementById("map-search-clear");
  elements.mapSearchStatus = document.getElementById("map-search-status");
  elements.languageButtons = Array.from(document.querySelectorAll("[data-locale]"));
  elements.segmentButtons = Array.from(document.querySelectorAll("[data-window-hours]"));
  elements.sourceInputs = Array.from(document.querySelectorAll(".toggle-pill input"));
  elements.sourceTiles = {};
  elements.sourceStatus = {};
  elements.sourceCount = {};

  Object.keys(DATA_SOURCES).forEach((key) => {
    elements.sourceTiles[key] = document.querySelector(`[data-source-tile="${key}"]`);
    elements.sourceStatus[key] = document.getElementById(`source-status-${key}`);
    elements.sourceCount[key] = document.getElementById(`source-count-${key}`);
  });
}

function initLanguage() {
  const savedLocale = window.localStorage?.getItem(LOCALE_STORAGE_KEY);
  state.locale = SUPPORTED_LOCALES.includes(savedLocale) ? savedLocale : DEFAULT_LOCALE;
}

function setLanguage(locale) {
  if (!SUPPORTED_LOCALES.includes(locale) || locale === state.locale) {
    return;
  }

  state.locale = locale;
  window.localStorage?.setItem(LOCALE_STORAGE_KEY, locale);
  applyLanguage();
}

function applyLanguage(options = {}) {
  const { rerender = true } = options;
  const localeConfig = LOCALE_CONFIG[state.locale] || LOCALE_CONFIG[DEFAULT_LOCALE];

  document.documentElement.lang = localeConfig.htmlLang;
  document.title = t("site.title");

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-title]").forEach((node) => {
    node.setAttribute("title", t(node.dataset.i18nTitle));
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    node.setAttribute("placeholder", t(node.dataset.i18nPlaceholder));
  });

  document.querySelectorAll("[data-i18n-aria-label]").forEach((node) => {
    node.setAttribute("aria-label", t(node.dataset.i18nAriaLabel));
  });

  updateLanguageButtons();
  updateWindowButtons();
  updateMagnitudeLabel();
  updateFilterSummary();
  updateEmptyMessage();
  renderGlobalStatus();
  renderMapSearchStatus();
  updateSourceStatusText();
  updateSourceSummary();
  updateMapCaption();
  updateLastUpdatedDisplay();

  if (rerender && state.markerLayer) {
    void applyFiltersAndRender({ chunked: true });
  }
}

function currentLocaleConfig() {
  return LOCALE_CONFIG[state.locale] || LOCALE_CONFIG[DEFAULT_LOCALE];
}

function t(key, params = {}) {
  const dictionary = TRANSLATIONS[state.locale] || TRANSLATIONS[DEFAULT_LOCALE];
  const fallbackDictionary = TRANSLATIONS[DEFAULT_LOCALE];
  const value = dictionary[key] ?? fallbackDictionary[key] ?? key;
  return typeof value === "function" ? value(params) : value;
}

function hasTranslation(key) {
  return (
    Object.prototype.hasOwnProperty.call(TRANSLATIONS[state.locale] || {}, key) ||
    Object.prototype.hasOwnProperty.call(TRANSLATIONS[DEFAULT_LOCALE], key)
  );
}

function updateLanguageButtons() {
  elements.languageButtons?.forEach((button) => {
    const isActive = button.dataset.locale === state.locale;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function updateWindowButtons() {
  elements.segmentButtons?.forEach((button) => {
    button.textContent = formatWindowShortLabel(Number(button.dataset.windowHours));
  });
}

function updateMagnitudeLabel() {
  if (elements.magnitudeValue) {
    elements.magnitudeValue.textContent = `M${state.filters.minMagnitude.toFixed(1)}+`;
  }
}

function updateFilterSummary() {
  const sourceCount = Object.values(state.filters.sources).filter(Boolean).length;
  if (elements.filterSummary) {
    elements.filterSummary.textContent = t("filters.summary", {
      windowLabel: formatWindowShortLabel(state.filters.windowHours),
      minMagnitude: state.filters.minMagnitude,
      sourceCount,
    });
  }
}

function updateEmptyMessage() {
  elements.eventList?.setAttribute("data-empty-message", t("events.empty"));
}

function initMap() {
  state.markerRenderer = L.canvas({ padding: 0.5 });
  state.map = L.map("map", {
    zoomControl: false,
    preferCanvas: true,
    worldCopyJump: true,
  }).setView([22, 12], 2);

  L.control.zoom({ position: "bottomleft" }).addTo(state.map);
  L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png", {
    subdomains: "abcd",
    maxZoom: 12,
    minZoom: 2,
    crossOrigin: true,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
  }).addTo(state.map);

  state.markerLayer = L.layerGroup().addTo(state.map);
}

function initControls() {
  elements.refreshButton?.addEventListener("click", () => refreshEvents({ manual: true }));
  elements.mapSearchForm?.addEventListener("submit", handleMapSearchSubmit);
  elements.mapSearchClear?.addEventListener("click", clearMapSearch);

  elements.languageButtons.forEach((button) => {
    button.addEventListener("click", () => setLanguage(button.dataset.locale));
  });

  elements.segmentButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.filters.windowHours = Number(button.dataset.windowHours);
      elements.segmentButtons.forEach((item) => item.classList.toggle("is-active", item === button));
      void applyFiltersAndRender();
    });
  });

  elements.magnitudeFilter?.addEventListener("input", () => {
    state.filters.minMagnitude = Number(elements.magnitudeFilter.value);
    updateMagnitudeLabel();
    void applyFiltersAndRender();
  });

  elements.sourceInputs.forEach((input) => {
    input.addEventListener("change", () => {
      state.filters.sources[input.value] = input.checked;
      void applyFiltersAndRender();
    });
  });
}

function initResponsiveLayout() {
  const mediaQuery = window.matchMedia(MOBILE_LAYOUT_QUERY);
  const handleChange = () => {
    syncResponsiveDetails(mediaQuery.matches);
    scheduleMapResize();
  };

  syncResponsiveDetails(mediaQuery.matches);
  window.setTimeout(handleChange, 250);

  if (typeof mediaQuery.addEventListener === "function") {
    mediaQuery.addEventListener("change", handleChange);
  } else if (typeof mediaQuery.addListener === "function") {
    mediaQuery.addListener(handleChange);
  }

  elements.filterDetails?.addEventListener("toggle", scheduleMapResize);
  elements.sourceDetails?.addEventListener("toggle", scheduleMapResize);
  window.addEventListener("pageshow", () => window.setTimeout(handleChange, 0));
  window.addEventListener("resize", scheduleMapResize);
  window.addEventListener("orientationchange", scheduleMapResize);
}

function syncResponsiveDetails(isMobile) {
  if (elements.filterDetails) {
    elements.filterDetails.open = !isMobile;
  }

  if (isMobile && elements.sourceDetails) {
    elements.sourceDetails.open = false;
  }
}

function scheduleMapResize() {
  if (!state.map) {
    return;
  }

  window.requestAnimationFrame(() => {
    state.map.invalidateSize({ animate: false });
    window.setTimeout(() => state.map?.invalidateSize({ animate: false }), 180);
  });
}

function createIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

async function loadAppVersion() {
  if (!elements.appVersion) {
    return;
  }

  try {
    const version = await fetchJson(APP_VERSION_URL);
    const label = formatAppVersion(version);
    if (!label) {
      return;
    }

    elements.appVersion.textContent = label;
    elements.appVersion.hidden = false;

    const commitDate = version?.commit?.committer?.date || version?.commit?.author?.date;
    elements.appVersion.title = [version?.sha ? `commit ${version.sha}` : "", commitDate || ""]
      .filter(Boolean)
      .join(" - ");
  } catch (error) {
    elements.appVersion.hidden = true;
  }
}

function formatAppVersion(version) {
  const commitDate = version?.commit?.committer?.date || version?.commit?.author?.date;
  const versionDate = formatVersionDate(commitDate);
  const shortSha = typeof version?.sha === "string" ? version.sha.slice(0, 7) : "";

  if (!versionDate && !shortSha) {
    return "";
  }

  return [versionDate ? `v${versionDate}` : "", shortSha, APP_VERSION_OWNER].filter(Boolean).join(" - ");
}

function formatVersionDate(value) {
  const date = new Date(value);
  if (!Number.isFinite(date.getTime())) {
    return "";
  }

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
}

function yieldToBrowser() {
  return new Promise((resolve) => {
    if (document.visibilityState === "hidden") {
      window.setTimeout(resolve, 0);
      return;
    }

    window.requestAnimationFrame(() => window.setTimeout(resolve, 0));
  });
}

async function handleMapSearchSubmit(event) {
  event.preventDefault();

  const query = elements.mapSearchInput?.value.trim();
  if (!query || query.length < 2) {
    setMapSearchStatus("search.tooShort", "error");
    return;
  }

  const token = ++state.searchToken;
  setMapSearchLoading(true);
  setMapSearchStatus("search.loading", "loading");

  try {
    const place = await geocodePlace(query);
    if (token !== state.searchToken) {
      return;
    }

    if (!place) {
      setMapSearchStatus("search.noResult", "error");
      return;
    }

    focusSearchResult(place);
    setMapSearchStatus(place.label, "live");
    elements.mapSearchClear?.classList.remove("is-hidden");
  } catch (error) {
    console.warn("Bölge araması başarısız", error);
    if (token === state.searchToken) {
      setMapSearchStatus("search.failed", "error");
    }
  } finally {
    if (token === state.searchToken) {
      setMapSearchLoading(false);
    }
  }
}

async function geocodePlace(query) {
  const encodedQuery = encodeURIComponent(query);
  const geocodeLanguage = currentLocaleConfig().geocodeLanguage;
  const providers = [
    async () => {
      const results = await fetchJson(
        `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&addressdetails=1&accept-language=${geocodeLanguage}&q=${encodedQuery}`
      );
      return normalizeNominatimPlace(asArray(results)[0]);
    },
    async () => {
      const result = await fetchJson(`https://photon.komoot.io/api/?q=${encodedQuery}&limit=1&lang=${geocodeLanguage}`);
      return normalizePhotonPlace(asArray(result?.features)[0]);
    },
    async () => {
      const result = await fetchJson(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodedQuery}&count=1&language=${geocodeLanguage}&format=json`
      );
      return normalizeOpenMeteoPlace(asArray(result?.results)[0]);
    },
  ];

  for (const provider of providers) {
    try {
      const place = await provider();
      if (place) {
        return place;
      }
    } catch (error) {
      console.warn("Geocoding sağlayıcısı yanıt vermedi", error);
    }
  }

  return null;
}

function focusSearchResult(place) {
  if (state.searchMarker) {
    state.map.removeLayer(state.searchMarker);
  }

  state.searchMarker = L.circleMarker([place.lat, place.lon], {
    radius: 9,
    color: "#152126",
    fillColor: "#ffffff",
    fillOpacity: 0.95,
    opacity: 0.95,
    weight: 3,
  })
    .addTo(state.map)
    .bindPopup(
      `<div class="search-popup"><h3>${escapeHtml(place.name)}</h3><p>${escapeHtml(place.label)}</p></div>`,
      { maxWidth: 280 }
    );

  if (place.bounds) {
    state.map.fitBounds(place.bounds, {
      animate: true,
      maxZoom: place.zoom,
      padding: [70, 70],
    });
  } else {
    state.map.setView([place.lat, place.lon], place.zoom, {
      animate: true,
    });
  }

  window.setTimeout(() => state.searchMarker?.openPopup(), 220);
}

function clearMapSearch() {
  state.searchToken += 1;
  elements.mapSearchInput.value = "";
  elements.mapSearchClear?.classList.add("is-hidden");
  setMapSearchStatus("", "idle");
  setMapSearchLoading(false);

  if (state.searchMarker) {
    state.map.removeLayer(state.searchMarker);
    state.searchMarker = null;
  }

  elements.mapSearchInput?.focus();
}

function setMapSearchLoading(isLoading) {
  if (elements.mapSearchSubmit) {
    elements.mapSearchSubmit.disabled = isLoading;
  }
}

function setMapSearchStatus(message, mode, params = {}) {
  state.mapSearchStatus = { message, mode, params };
  renderMapSearchStatus();
}

function renderMapSearchStatus() {
  if (!elements.mapSearchStatus) {
    return;
  }

  const status = state.mapSearchStatus || { message: "", params: {}, mode: "idle" };
  elements.mapSearchStatus.textContent = hasTranslation(status.message)
    ? t(status.message, status.params)
    : status.message;
  elements.mapSearchStatus.classList.toggle("is-error", status.mode === "error");
}

function handleVisibilityChange() {
  if (document.visibilityState !== "visible") {
    return;
  }

  const updatedAt = Number(elements.lastUpdated?.dataset.timestamp || 0);
  if (!updatedAt || Date.now() - updatedAt > REFRESH_INTERVAL_MS) {
    refreshEvents();
  }
}

async function refreshEvents(options = {}) {
  if (state.isRefreshing) {
    return;
  }

  state.isRefreshing = true;
  elements.refreshButton?.classList.add("is-loading");
  updateGlobalStatus("status.refreshing", "loading");

  Object.keys(DATA_SOURCES).forEach((key) => updateSourceStatus(key, "fetching", 0, "loading"));
  await yieldToBrowser();

  try {
    const sourceResults = await Promise.allSettled(
      Object.entries(DATA_SOURCES).map(([key, source]) => fetchSource(key, source))
    );
    const reports = sourceResults.flatMap((result) => (result.status === "fulfilled" ? result.value : []));

    if (!reports.length && !state.hasLoadedOnce) {
      throw new Error(t("status.noReadableData"));
    }

    if (reports.length) {
      state.reports = reports;
      state.events = await combineReports(reports);
      state.hasLoadedOnce = true;
    }

    const failedCount = sourceResults.filter((result) => result.status === "rejected").length;
    const liveCount = Object.keys(DATA_SOURCES).length - failedCount;
    await applyFiltersAndRender({ chunked: true });

    const statusPayload = buildGlobalStatusText({ failedCount, liveCount });
    updateGlobalStatus(statusPayload.key, failedCount > 0 ? "warning" : "live", statusPayload.params);
    updateLastUpdated();
  } catch (error) {
    console.error(error);
    updateGlobalStatus("status.fetchFailed", "error");
    if (options.manual) {
      renderEmptyState(t("status.sourcesOffline"));
    }
  } finally {
    state.isRefreshing = false;
    elements.refreshButton?.classList.remove("is-loading");
  }
}

async function fetchSource(key, source) {
  try {
    const urls = asArray(source.url());
    const settledPayloads = await Promise.allSettled(
      urls.map((url) => (source.format === "text" ? fetchText(url) : fetchJson(url)))
    );
    const payloads = settledPayloads
      .filter((result) => result.status === "fulfilled")
      .map((result) => result.value);

    if (!payloads.length) {
      throw settledPayloads.find((result) => result.status === "rejected")?.reason || new Error("Kaynak yanıt vermedi.");
    }

    const now = Date.now();
    const reports = source
      .normalize(payloads.length === 1 ? payloads[0] : payloads)
      .filter((report) => isUsableReport(report) && isWithinFetchWindow(report, now));
    updateSourceStatus(key, "live", reports.length, "live");
    return reports;
  } catch (error) {
    console.warn(`${source.label} okunamadı`, error);
    updateSourceStatus(key, "error", 0, "error");
    throw error;
  }
}

async function fetchJson(url) {
  const text = await fetchText(url);
  return JSON.parse(text.replace(/^\uFEFF/, ""));
}

async function fetchText(url) {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      cache: "no-store",
      signal: controller.signal,
      headers: {
        Accept: "application/json, text/plain, */*",
      },
    });

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    return await response.text();
  } finally {
    window.clearTimeout(timeout);
  }
}

function normalizeUsgs(payload) {
  return asArray(payload?.features).map((feature) => {
    const props = feature.properties || {};
    const [lon, lat, depth] = feature.geometry?.coordinates || [];
    return {
      sourceKey: "usgs",
      source: "USGS",
      sourceId: props.code || props.ids || feature.id,
      lat: toNumber(lat),
      lon: toNumber(lon),
      depth: normalizeDepth(depth),
      magnitude: toNumber(props.mag),
      magnitudeType: props.magType,
      place: props.place || "Konum belirtilmedi",
      time: toNumber(props.time),
      updated: toNumber(props.updated),
      url: props.url,
      tsunami: Boolean(props.tsunami),
      alertLevel: props.alert,
      status: props.status,
      attributes: {
        ağ: props.net,
        önem: props.sig,
        hissedilme: props.felt,
      },
    };
  });
}

function normalizeEmsc(payload) {
  return asArray(payload?.features).map((feature) => {
    const props = feature.properties || {};
    const [lon, lat, depth] = feature.geometry?.coordinates || [];
    return {
      sourceKey: "emsc",
      source: "EMSC",
      sourceId: props.source_id || props.unid || feature.id,
      lat: toNumber(lat),
      lon: toNumber(lon),
      depth: normalizeDepth(depth),
      magnitude: toNumber(props.mag),
      magnitudeType: props.magtype,
      place: props.flynn_region || props.region || "Konum belirtilmedi",
      time: parseUtcTimestamp(props.time),
      updated: parseUtcTimestamp(props.updated),
      url: props.url,
      attributes: {
        yazar: props.author,
        kalite: props.evtype,
      },
    };
  });
}

function normalizeGdacs(payload) {
  return asArray(payload?.features).map((feature) => {
    const props = feature.properties || {};
    const [lon, lat] = feature.geometry?.coordinates || [];
    const severity = props.severitydata || {};
    const parsedDepth = parseDepthFromText(props.severitytext);
    const sourceId = props.eventid || [props.eventtype, props.fromdate, lat, lon].filter(Boolean).join("-");

    return {
      sourceKey: "gdacs",
      source: "GDACS",
      sourceId,
      lat: toNumber(lat),
      lon: toNumber(lon),
      depth: parsedDepth,
      magnitude: toNumber(severity.severity || severity.magnitude || props.magnitude),
      place: props.name || props.eventname || "Konum belirtilmedi",
      time: parseUtcTimestamp(props.fromdate),
      updated: parseUtcTimestamp(props.todate || props.lastupdate),
      url: props.url?.report || props.url?.geometry || props.url,
      alertLevel: props.alertlevel,
      attributes: {
        olay: props.eventtype,
        kaynak: props.source,
        açıklama: props.severitytext,
      },
    };
  });
}

function normalizeAfad(text) {
  const records = parseJsonFromReader(text);
  return asArray(records).map((item) => {
    const lat = toNumber(item.latitude);
    const lon = toNumber(item.longitude);
    const magnitude = toNumber(item.magnitude);
    const placeParts = [item.location, item.district, item.province, item.country].filter(Boolean);

    return {
      sourceKey: "afad",
      source: "AFAD",
      sourceId: item.eventID || [item.date, lat, lon, magnitude].filter(Boolean).join("-"),
      lat,
      lon,
      depth: normalizeDepth(item.depth),
      magnitude,
      magnitudeType: item.type,
      place: placeParts[0] || "Konum belirtilmedi",
      time: parseTurkeyTimestamp(item.date),
      updated: parseTurkeyTimestamp(item.lastUpdateDate),
      url: item.eventID ? `https://deprem.afad.gov.tr/event-detail/${item.eventID}` : "https://deprem.afad.gov.tr",
      statusKey: item.isEventUpdate ? "updated" : "initial",
      attributes: {
        il: item.province,
        ilçe: item.district,
        mahalle: item.neighborhood,
        rms: item.rms,
      },
    };
  });
}

function normalizeKandilli(text) {
  return text
    .split(/\r?\n/)
    .map((line) => parseKandilliLine(line))
    .filter(Boolean);
}

function parseKandilliLine(line) {
  const match = line.match(
    /^(\d{4}\.\d{2}\.\d{2})\s+(\d{2}:\d{2}:\d{2})\s+([-+]?\d+(?:\.\d+)?)\s+([-+]?\d+(?:\.\d+)?)\s+([-+]?\d+(?:\.\d+)?)\s+(\S+)\s+(\S+)\s+(\S+)\s+(.+)$/
  );

  if (!match) {
    return null;
  }

  const [, datePart, timePart, latRaw, lonRaw, depthRaw, mdRaw, mlRaw, mwRaw, tailRaw] = match;
  const tail = tailRaw.trim();
  const statusMatch = tail.match(/\s{2,}(\S+)\s*$/);
  const place = (statusMatch ? tail.slice(0, statusMatch.index) : tail).trim();
  const status = statusMatch?.[1];
  const md = parseMagnitudeToken(mdRaw);
  const ml = parseMagnitudeToken(mlRaw);
  const mw = parseMagnitudeToken(mwRaw);
  const magnitude = ml ?? mw ?? md;
  const magnitudeType = ml != null ? "ML" : mw != null ? "Mw" : md != null ? "MD" : undefined;
  const lat = toNumber(latRaw);
  const lon = toNumber(lonRaw);

  return {
    sourceKey: "kandilli",
    source: "Kandilli",
    sourceId: [datePart, timePart, latRaw, lonRaw].join("-"),
    lat,
    lon,
    depth: normalizeDepth(depthRaw),
    magnitude,
    magnitudeType,
    place: place || "Konum belirtilmedi",
    time: parseTurkeyTimestamp(`${datePart.replace(/\./g, "-")}T${timePart}`),
    updated: parseTurkeyTimestamp(`${datePart.replace(/\./g, "-")}T${timePart}`),
    url: "http://www.koeri.boun.edu.tr/scripts/lst9.asp",
    status,
    attributes: {
      MD: md,
      ML: ml,
      Mw: mw,
    },
  };
}

function normalizeGeoNet(payload) {
  return asArray(payload?.features)
    .filter((feature) => feature.properties?.quality !== "deleted")
    .map((feature) => {
      const props = feature.properties || {};
      const [lon, lat] = feature.geometry?.coordinates || [];
      return {
        sourceKey: "geonet",
        source: "GeoNet",
        sourceId: props.publicID || feature.id,
        lat: toNumber(lat),
        lon: toNumber(lon),
        depth: normalizeDepth(props.depth),
        magnitude: toNumber(props.magnitude),
        place: props.locality || "Yeni Zelanda bölgesi",
        time: parseUtcTimestamp(props.time),
        updated: parseUtcTimestamp(props.modificationTime),
        url: props.publicID ? `https://www.geonet.org.nz/earthquake/${props.publicID}` : "https://www.geonet.org.nz/earthquake",
        intensity: toNumber(props.mmi),
        status: props.quality,
        attributes: {
          MMI: props.mmi,
          kalite: props.quality,
        },
      };
    });
}

function normalizeJma(payload) {
  const bestById = new Map();

  asArray(payload).forEach((item) => {
    if (!item?.eid) {
      return;
    }

    const current = bestById.get(item.eid);
    if (!current || scoreJmaReport(item) > scoreJmaReport(current)) {
      bestById.set(item.eid, item);
    }
  });

  return Array.from(bestById.values()).map((item) => {
    const coords = parseJmaCode(item.cod);
    return {
      sourceKey: "jma",
      source: "JMA",
      sourceId: item.eid,
      lat: coords?.lat,
      lon: coords?.lon,
      depth: coords?.depth,
      magnitude: toNumber(item.mag),
      magnitudeType: "Mj",
      place: item.en_anm || item.anm || item.en_ttl || "Japonya bölgesi",
      time: parseUtcTimestamp(item.at),
      updated: parseUtcTimestamp(item.rdt),
      url: item.json ? `https://www.jma.go.jp/bosai/quake/data/${item.json}` : "https://www.jma.go.jp/bosai/quake/",
      intensity: item.maxi,
      attributes: {
        şiddet: item.maxi,
        başlık: item.en_ttl || item.ttl,
      },
    };
  });
}

function normalizeBmkg(payloads) {
  return asArray(payloads)
    .flatMap((payload) => asArray(payload?.Infogempa?.gempa))
    .map((item) => {
      const coords = parseCoordinatePair(item.Coordinates);
      const magnitude = toNumber(item.Magnitude);
      const potential = item.Potensi || "";
      const tsunami = /tsunami/i.test(potential) && !/tidak/i.test(potential);

      return {
        sourceKey: "bmkg",
        source: "BMKG",
        sourceId: [item.DateTime, item.Coordinates, item.Magnitude].filter(Boolean).join("-"),
        lat: coords?.lat,
        lon: coords?.lon,
        depth: parseDepthFromText(item.Kedalaman),
        magnitude,
        place: item.Wilayah || "Endonezya bölgesi",
        time: parseUtcTimestamp(item.DateTime),
        updated: parseUtcTimestamp(item.DateTime),
        url: "https://data.bmkg.go.id/gempabumi/",
        tsunami,
        intensity: item.Dirasakan,
        attributes: {
          potansiyel: item.Potensi,
          hissedilen: item.Dirasakan,
          saat: item.Jam,
        },
      };
    });
}

async function combineReports(reports) {
  const sortedReports = reports
    .filter(isUsableReport)
    .sort((a, b) => (b.time || 0) - (a.time || 0));
  const events = [];
  const mergeIndexes = {
    eventBySourceId: new Map(),
    eventBucketKeys: new Map(),
    timeBuckets: new Map(),
  };

  for (let index = 0; index < sortedReports.length; index += 1) {
    const report = sortedReports[index];
    const match = findMergeMatch(report, mergeIndexes);
    if (match) {
      mergeReportIntoEvent(match, report);
      indexMergedEvent(match, mergeIndexes);
    } else {
      const event = createEventFromReport(report);
      events.push(event);
      indexMergedEvent(event, mergeIndexes);
    }

    if (index > 0 && index % MERGE_YIELD_INTERVAL === 0) {
      await yieldToBrowser();
    }
  }

  return events.sort((a, b) => (b.time || 0) - (a.time || 0));
}

function findMergeMatch(report, indexes) {
  const directMatch = indexes.eventBySourceId.get(sourceReportKey(report));
  if (directMatch) {
    return directMatch;
  }

  return Array.from(getMergeCandidates(report, indexes.timeBuckets)).find(
    (event) => isPossibleMergeCandidate(report, event) && appearsToBeSameEvent(report, event)
  );
}

function getMergeCandidates(report, timeBuckets) {
  const candidates = new Set();
  const bucketKey = mergeBucketKey(report.time);

  for (let offset = -1; offset <= 1; offset += 1) {
    const bucketEvents = timeBuckets.get(bucketKey + offset);
    if (bucketEvents) {
      bucketEvents.forEach((event) => candidates.add(event));
    }
  }

  return candidates;
}

function indexMergedEvent(event, indexes) {
  const previousKeys = indexes.eventBucketKeys.get(event) || [];
  previousKeys.forEach((key) => {
    const bucket = indexes.timeBuckets.get(key);
    bucket?.delete(event);
    if (bucket && bucket.size === 0) {
      indexes.timeBuckets.delete(key);
    }
  });

  const nextKeys = unique(event.reports.map((report) => mergeBucketKey(report.time)));
  indexes.eventBucketKeys.set(event, nextKeys);
  nextKeys.forEach((key) => {
    if (!indexes.timeBuckets.has(key)) {
      indexes.timeBuckets.set(key, new Set());
    }
    indexes.timeBuckets.get(key).add(event);
  });

  event.sourceIds.forEach((sourceId) => indexes.eventBySourceId.set(sourceId, event));
}

function mergeBucketKey(time) {
  return Math.floor((time || 0) / MAX_MERGE_TIME_MS);
}

function isPossibleMergeCandidate(report, event) {
  const reportKey = sourceReportKey(report);
  if (event.sourceIds.includes(reportKey)) {
    return true;
  }

  const time = report.time || 0;
  const eventStart = event.time || 0;
  const eventEnd = event.latestTime || event.time || 0;
  return time >= eventStart - MAX_MERGE_TIME_MS && time <= eventEnd + MAX_MERGE_TIME_MS;
}

function appearsToBeSameEvent(report, event) {
  const reportKey = sourceReportKey(report);
  if (event.sourceIds.includes(reportKey)) {
    return true;
  }

  if (event.sourceKeys.includes(report.sourceKey)) {
    return false;
  }

  const maxMagnitude = Math.max(report.magnitude || 0, event.magnitude || 0);
  const limits = getMergeLimits(maxMagnitude);
  const nearestTimeGap = Math.min(...event.reports.map((item) => Math.abs((report.time || 0) - (item.time || 0))));
  const nearestDistance = Math.min(...event.reports.map((item) => distanceKm(report.lat, report.lon, item.lat, item.lon)));
  const comparableMagnitudeDiffs = event.reports
    .map((item) =>
      Number.isFinite(report.magnitude) && Number.isFinite(item.magnitude)
        ? Math.abs(report.magnitude - item.magnitude)
        : null
    )
    .filter((item) => item != null);
  const nearestMagnitudeDiff = comparableMagnitudeDiffs.length ? Math.min(...comparableMagnitudeDiffs) : 0;

  return (
    nearestTimeGap <= limits.timeMs &&
    nearestDistance <= limits.distanceKm &&
    nearestMagnitudeDiff <= limits.magnitude
  );
}

function getMergeLimits(magnitude) {
  if (magnitude >= 5) {
    return {
      timeMs: 15 * 60 * 1000,
      distanceKm: 120,
      magnitude: 1.5,
    };
  }

  if (magnitude >= 3) {
    return {
      timeMs: 8 * 60 * 1000,
      distanceKm: 60,
      magnitude: 1,
    };
  }

  return {
    timeMs: 3 * 60 * 1000,
    distanceKm: 18,
    magnitude: 0.8,
  };
}

function createEventFromReport(report) {
  const event = {
    id: sourceReportKey(report),
    reports: [report],
    sourceKeys: [],
    sourceIds: [],
    sources: [],
  };
  refreshMergedEvent(event);
  return event;
}

function mergeReportIntoEvent(event, report) {
  const existingIndex = event.reports.findIndex((item) => sourceReportKey(item) === sourceReportKey(report));
  if (existingIndex >= 0) {
    const existing = event.reports[existingIndex];
    event.reports[existingIndex] = (report.updated || report.time || 0) >= (existing.updated || existing.time || 0) ? report : existing;
  } else {
    event.reports.push(report);
  }

  refreshMergedEvent(event);
}

function refreshMergedEvent(event) {
  const reports = event.reports.filter(isUsableReport);
  const primary = choosePrimaryReport(reports);
  const magnitudes = reports.map((report) => report.magnitude).filter(Number.isFinite);
  const depths = reports.map((report) => report.depth).filter(Number.isFinite);
  const alertLevels = reports.map((report) => report.alertLevel).filter(Boolean);

  event.reports = reports.sort((a, b) => {
    const priorityDiff = (SOURCE_PRIORITY[b.sourceKey] || 0) - (SOURCE_PRIORITY[a.sourceKey] || 0);
    if (priorityDiff !== 0) {
      return priorityDiff;
    }
    return (b.updated || b.time || 0) - (a.updated || a.time || 0);
  });
  event.sourceKeys = unique(event.reports.map((report) => report.sourceKey));
  event.sourceIds = unique(event.reports.map(sourceReportKey));
  event.sources = event.sourceKeys.map((key) => DATA_SOURCES[key]?.shortLabel || key.toUpperCase());
  event.id = event.sourceIds[0] || event.id;
  event.lat = primary.lat;
  event.lon = primary.lon;
  event.depth = primary.depth;
  event.depthMin = depths.length ? Math.min(...depths) : undefined;
  event.depthMax = depths.length ? Math.max(...depths) : undefined;
  event.magnitude = magnitudes.length ? Math.max(...magnitudes) : primary.magnitude;
  event.magnitudeMin = magnitudes.length ? Math.min(...magnitudes) : undefined;
  event.magnitudeMax = magnitudes.length ? Math.max(...magnitudes) : undefined;
  event.magnitudeType = primary.magnitudeType;
  event.place = primary.place;
  const reportTimes = event.reports.map((report) => report.time).filter(Number.isFinite);
  event.time = Math.min(...reportTimes);
  event.latestTime = Math.max(...reportTimes);
  event.updated = Math.max(...event.reports.map((report) => report.updated || report.time).filter(Number.isFinite));
  event.url = primary.url;
  event.tsunami = event.reports.some((report) => report.tsunami);
  event.alertLevel = worstAlertLevel(alertLevels);
  event.intensity = strongestIntensity(event.reports.map((report) => report.intensity).filter(Boolean));
}

function choosePrimaryReport(reports) {
  return [...reports].sort((a, b) => {
    const magDiff = (b.magnitude || 0) - (a.magnitude || 0);
    if (Math.abs(magDiff) >= 0.2) {
      return magDiff;
    }

    const priorityDiff = (SOURCE_PRIORITY[b.sourceKey] || 0) - (SOURCE_PRIORITY[a.sourceKey] || 0);
    if (priorityDiff !== 0) {
      return priorityDiff;
    }

    return (b.updated || b.time || 0) - (a.updated || a.time || 0);
  })[0];
}

function sourceReportKey(report) {
  return `${report.sourceKey}:${report.sourceId || `${report.time}:${report.lat}:${report.lon}`}`;
}

function isUsableReport(report) {
  return (
    report &&
    Object.prototype.hasOwnProperty.call(DATA_SOURCES, report.sourceKey) &&
    Number.isFinite(report.lat) &&
    Number.isFinite(report.lon) &&
    Math.abs(report.lat) <= 90 &&
    Math.abs(report.lon) <= 180 &&
    Number.isFinite(report.time) &&
    Number.isFinite(report.magnitude)
  );
}

function isWithinFetchWindow(report, now = Date.now()) {
  return (
    report.time >= now - FETCH_LOOKBACK_HOURS * 60 * 60 * 1000 &&
    report.time <= now + FETCH_FUTURE_MARGIN_MS
  );
}

async function applyFiltersAndRender(options = {}) {
  const { chunked = true } = options;
  const token = ++state.renderToken;
  const minTime = Date.now() - state.filters.windowHours * 60 * 60 * 1000;
  updateFilterSummary();
  state.filteredEvents = state.events
    .filter((event) => {
      const matchesWindow = event.time >= minTime;
      const matchesMagnitude = event.magnitude >= state.filters.minMagnitude;
      const matchesSource = event.sourceKeys.some((key) => state.filters.sources[key]);
      return matchesWindow && matchesMagnitude && matchesSource;
    })
    .sort((a, b) => (b.time || 0) - (a.time || 0));

  renderSourceCounts(minTime);
  renderMetrics();
  const didRenderMarkers = await renderMarkers({ chunked, token });
  if (!didRenderMarkers || token !== state.renderToken) {
    return;
  }

  renderList();
  updateMapCaption();
}

function renderSourceCounts(minTime) {
  const counts = Object.fromEntries(Object.keys(DATA_SOURCES).map((key) => [key, 0]));

  state.reports.forEach((report) => {
    if (report.time >= minTime && report.magnitude >= state.filters.minMagnitude) {
      counts[report.sourceKey] += 1;
    }
  });

  Object.entries(counts).forEach(([key, count]) => {
    state.sourceStats[key] = {
      ...(state.sourceStats[key] || { statusKey: "ready", mode: "idle" }),
      count,
    };

    if (elements.sourceCount[key]) {
      elements.sourceCount[key].textContent = String(count);
    }
  });

  updateSourceSummary();
}

function renderMetrics() {
  const total = state.filteredEvents.length;
  const magnitudes = state.filteredEvents.map((event) => event.magnitude).filter(Number.isFinite);
  const depths = state.filteredEvents.map((event) => event.depth).filter(Number.isFinite);
  const maxMagnitude = magnitudes.length ? Math.max(...magnitudes) : null;
  const strongCount = state.filteredEvents.filter((event) => event.magnitude >= 4.5).length;
  const averageDepth = depths.length ? depths.reduce((sum, value) => sum + value, 0) / depths.length : null;

  elements.metricTotal.textContent = String(total);
  elements.metricMax.textContent = maxMagnitude == null ? "-" : `M${maxMagnitude.toFixed(1)}`;
  elements.metricStrong.textContent = String(strongCount);
  elements.metricDepth.textContent = averageDepth == null ? "-" : `${averageDepth.toFixed(0)} km`;
  elements.visibleCount.textContent = t("events.visibleCount", { count: total });
}

async function renderMarkers(options = {}) {
  const { chunked = false, token = state.renderToken } = options;
  state.markerLayer.clearLayers();
  state.markerRefs.clear();

  for (let index = 0; index < state.filteredEvents.length; index += 1) {
    if (token !== state.renderToken) {
      return false;
    }

    const event = state.filteredEvents[index];
    const marker = L.circleMarker([event.lat, event.lon], {
      radius: markerRadius(event.magnitude),
      color: markerColor(event.magnitude),
      fillColor: markerColor(event.magnitude),
      fillOpacity: 0.78,
      opacity: 0.94,
      weight: event.sourceKeys.length > 1 ? 3 : 2,
      renderer: state.markerRenderer,
    });

    marker.bindPopup(() => popupHtml(event), {
      maxWidth: 440,
      minWidth: 280,
      className: "quake-popup-wrapper",
    });
    marker.on("click", () => {
      state.selectedId = event.id;
      renderList();
    });
    marker.addTo(state.markerLayer);
    state.markerRefs.set(event.id, marker);

    if (chunked && index > 0 && index % MARKER_RENDER_CHUNK_SIZE === 0) {
      await yieldToBrowser();
    }
  }

  return true;
}

function renderList() {
  if (!elements.eventList) {
    return;
  }

  elements.eventList.innerHTML = state.filteredEvents
    .slice(0, MAX_EVENT_LIST_ITEMS)
    .map((event) => {
      const isSelected = event.id === state.selectedId ? " is-selected" : "";
      const sourceTags = sourceTagHtml(event.sources);
      return `
        <button class="event-card${isSelected}" type="button" data-event-id="${escapeHtml(event.id)}">
          <span class="mag-badge" style="background:${markerColor(event.magnitude)}">${formatMagnitude(event.magnitude, false)}</span>
          <span class="event-content">
            <span class="event-title" title="${escapeHtml(formatPlaceName(event.place))}">${escapeHtml(formatPlaceName(event.place))}</span>
            <span class="event-meta">
              <span>${formatRelativeTime(event.time)}</span>
              <span>${formatDepthRange(event)}</span>
              <span>${formatCoordinates(event.lat, event.lon)}</span>
            </span>
            <span class="event-tags">${sourceTags}</span>
          </span>
        </button>
      `;
    })
    .join("");

  elements.eventList.querySelectorAll(".event-card").forEach((card) => {
    card.addEventListener("click", () => {
      const event = state.filteredEvents.find((item) => item.id === card.dataset.eventId);
      if (!event) {
        return;
      }

      state.selectedId = event.id;
      const marker = state.markerRefs.get(event.id);
      state.map.setView([event.lat, event.lon], Math.max(state.map.getZoom(), 4), {
        animate: true,
      });
      marker?.openPopup();
      renderList();
    });
  });
}

function renderEmptyState(message) {
  if (elements.eventList && !state.filteredEvents.length) {
    elements.eventList.innerHTML = `<div class="empty-message">${escapeHtml(message)}</div>`;
  }
}

function updateMapCaption() {
  const sourceCount = Object.values(state.filters.sources).filter(Boolean).length;
  elements.mapCaption.textContent = t("map.caption", {
    windowLabel: formatWindowLabel(state.filters.windowHours),
    sourceCount,
  });
}

function formatWindowLabel(hours) {
  const days = Math.round(hours / 24);
  if (hours >= 72) {
    return t("window.label.day", { days });
  }

  return t("window.label.hour", { hours });
}

function formatWindowShortLabel(hours) {
  if (hours >= 72) {
    return t("window.short.day", { days: Math.round(hours / 24) });
  }

  return t("window.short.hour", { hours });
}

function updateSourceStatus(key, statusKey, count, mode) {
  state.sourceStats[key] = {
    statusKey,
    count,
    mode,
  };

  if (elements.sourceStatus[key]) {
    elements.sourceStatus[key].textContent = t(`sourceStatus.${statusKey}`);
  }

  if (elements.sourceCount[key]) {
    elements.sourceCount[key].textContent = String(count);
  }

  elements.sourceTiles[key]?.classList.toggle("is-error", mode === "error");
  elements.sourceTiles[key]?.classList.toggle("is-loading", mode === "loading");
  updateSourceSummary();
}

function updateSourceStatusText() {
  Object.entries(state.sourceStats).forEach(([key, stats]) => {
    const statusKey = stats.statusKey || statusKeyForMode(stats.mode);
    if (elements.sourceStatus[key]) {
      elements.sourceStatus[key].textContent = t(`sourceStatus.${statusKey}`);
    }
  });
}

function statusKeyForMode(mode) {
  return (
    {
      idle: "ready",
      loading: "fetching",
      live: "live",
      error: "error",
    }[mode] || "ready"
  );
}

function updateGlobalStatus(key, mode, params = {}) {
  state.globalStatus = { key, mode, params };
  renderGlobalStatus();
}

function renderGlobalStatus() {
  const status = state.globalStatus || { key: "status.waiting", mode: "idle", params: {} };
  elements.statusSummary.textContent = t(status.key, getGlobalStatusParams(status));
  elements.statusDot.classList.toggle("is-live", status.mode === "live");
  elements.statusDot.classList.toggle("is-error", status.mode === "error");
}

function getGlobalStatusParams(status) {
  if (status.key !== "status.sourcesLive" && status.key !== "status.sourcesWithErrors") {
    return status.params;
  }

  const health = getSourceHealth();
  return {
    ...status.params,
    liveCount: health.live,
    total: health.total,
    rawCount: health.rawCount,
    failedCount: health.error,
  };
}

function updateSourceSummary() {
  if (!elements.sourceSummary) {
    return;
  }

  const health = getSourceHealth();
  elements.sourceSummary.textContent = t("sources.summary", health);
  renderGlobalStatus();
}

function buildGlobalStatusText({ failedCount, liveCount }) {
  const health = getSourceHealth();

  if (failedCount > 0) {
    return {
      key: "status.sourcesWithErrors",
      params: { liveCount, total: health.total, rawCount: health.rawCount, failedCount },
    };
  }

  return {
    key: "status.sourcesLive",
    params: { liveCount, total: health.total, rawCount: health.rawCount },
  };
}

function getSourceHealth() {
  const stats = Object.values(state.sourceStats);
  return {
    total: Object.keys(DATA_SOURCES).length,
    live: stats.filter((item) => item.mode === "live").length,
    error: stats.filter((item) => item.mode === "error").length,
    loading: stats.some((item) => item.mode === "loading"),
    rawCount: stats.reduce((sum, item) => sum + (Number(item.count) || 0), 0),
  };
}

function updateLastUpdated() {
  const now = new Date();
  elements.lastUpdated.dateTime = now.toISOString();
  elements.lastUpdated.dataset.timestamp = String(now.getTime());
  updateLastUpdatedDisplay();
}

function updateLastUpdatedDisplay() {
  const timestamp = Number(elements.lastUpdated?.dataset.timestamp || 0);
  if (!timestamp || !elements.lastUpdated) {
    return;
  }

  elements.lastUpdated.textContent = new Intl.DateTimeFormat(currentLocaleConfig().dateLocale, {
    hour: "2-digit",
    hourCycle: "h23",
    minute: "2-digit",
  }).format(new Date(timestamp));
}

function popupHtml(event) {
  const reports = event.reports
    .map((report) => {
      const detailRows = [
        formatMagnitude(report.magnitude, true),
        Number.isFinite(report.depth) ? `${report.depth.toFixed(1)} km` : t("depth.none"),
        formatDateTime(report.time),
        formatCoordinates(report.lat, report.lon),
      ];

      return `
        <article class="report-row">
          <div class="report-row-head">
            <strong>${escapeHtml(report.source)}</strong>
            <span>${escapeHtml(formatReportStatus(report))}</span>
          </div>
          <div class="report-metrics">
            ${detailRows.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}
          </div>
          <p class="report-place">${escapeHtml(formatPlaceName(report.place))}</p>
          ${attributeHtml(report.attributes)}
          ${report.url ? `<a class="report-link" href="${safeUrl(report.url)}" target="_blank" rel="noreferrer">${escapeHtml(t("popup.sourceRecord"))}</a>` : ""}
        </article>
      `;
    })
    .join("");

  return `
    <div class="quake-popup is-rich">
      <h3>${escapeHtml(formatPlaceName(event.place))}</h3>
      <dl class="popup-summary">
        <dt>${escapeHtml(t("popup.magnitude"))}</dt><dd>${escapeHtml(formatMagnitudeRange(event))}</dd>
        <dt>${escapeHtml(t("popup.time"))}</dt><dd>${escapeHtml(formatDateTime(event.time))}</dd>
        <dt>${escapeHtml(t("popup.depth"))}</dt><dd>${escapeHtml(formatDepthRange(event))}</dd>
        <dt>${escapeHtml(t("popup.coordinates"))}</dt><dd>${escapeHtml(formatCoordinates(event.lat, event.lon))}</dd>
        <dt>${escapeHtml(t("popup.source"))}</dt><dd>${escapeHtml(event.sources.join(", "))}</dd>
        ${event.intensity ? `<dt>${escapeHtml(t("popup.intensity"))}</dt><dd>${escapeHtml(String(event.intensity))}</dd>` : ""}
      </dl>
      ${event.tsunami ? `<p class="popup-alert">${escapeHtml(t("popup.tsunami"))}</p>` : ""}
      ${event.alertLevel ? `<p class="popup-alert muted-alert">${escapeHtml(t("popup.gdacsAlert", { level: event.alertLevel }))}</p>` : ""}
      <div class="report-list">${reports}</div>
    </div>
  `;
}

function attributeHtml(attributes = {}) {
  const rows = Object.entries(attributes)
    .filter(([, value]) => value !== undefined && value !== null && value !== "" && value !== "-.-")
    .slice(0, 4);

  if (!rows.length) {
    return "";
  }

  return `
    <dl class="report-attributes">
      ${rows
        .map(
          ([key, value]) => `
            <dt>${escapeHtml(formatAttributeLabel(key))}</dt>
            <dd>${escapeHtml(String(value))}</dd>
          `
        )
        .join("")}
    </dl>
  `;
}

function sourceTagHtml(sources) {
  const visible = sources.slice(0, 4);
  const more = sources.length - visible.length;
  const tags = visible.map((source) => `<span class="source-tag">${escapeHtml(source)}</span>`);
  if (more > 0) {
    tags.push(`<span class="source-tag more">+${more}</span>`);
  }
  return tags.join("");
}

function formatReportStatus(report) {
  if (report.statusKey) {
    return t(`reportStatus.${report.statusKey}`);
  }

  if (!report.status) {
    return t("report.record");
  }

  const normalizedStatus = String(report.status).toLowerCase();
  if (normalizedStatus === "güncellendi" || normalizedStatus === "updated") {
    return t("reportStatus.updated");
  }
  if (normalizedStatus === "ilk kayıt" || normalizedStatus === "initial report") {
    return t("reportStatus.initial");
  }

  return report.status;
}

function formatAttributeLabel(key) {
  const label = ATTRIBUTE_LABELS[key];
  return label?.[state.locale] || key;
}

function formatPlaceName(place) {
  const text = String(place || "").replace(/\s+/g, " ").trim();
  if (!text || text === "Konum belirtilmedi") {
    return t("place.unknown");
  }

  if (text === "Yeni Zelanda bölgesi") {
    return t("place.newZealandRegion");
  }
  if (text === "Japonya bölgesi") {
    return t("place.japanRegion");
  }
  if (text === "Endonezya bölgesi") {
    return t("place.indonesiaRegion");
  }

  return state.locale === "tr" ? localizePlaceName(text) : humanizeAllCaps(text);
}

function localizePlaceName(place) {
  const text = String(place || "").replace(/\s+/g, " ").trim();
  if (!text) {
    return t("place.unknown");
  }

  const indonesianDistanceMatch = text.match(
    /^(\d+(?:[.,]\d+)?)\s*km\s+(timur laut|barat laut|barat daya|tenggara|utara|timur|selatan|barat)\s+(.+)$/i
  );

  if (indonesianDistanceMatch) {
    const [, distance, direction, target] = indonesianDistanceMatch;
    const localizedTarget = localizeRegionName(target);
    const localizedDirection = INDONESIAN_DIRECTION_LABELS[String(direction).toLowerCase()];
    return `${localizedTarget} konumunun ${distance.replace(".", ",")} km ${localizedDirection}`;
  }

  const distanceMatch = text.match(
    /^(\d+(?:[.,]\d+)?)\s*km\s+([A-Z]{1,3}|north|north-northeast|northeast|east-northeast|east|east-southeast|southeast|south-southeast|south|south-southwest|southwest|west-southwest|west|west-northwest|northwest|north-northwest)\s+of\s+(.+)$/i
  );

  if (distanceMatch) {
    const [, distance, direction, target] = distanceMatch;
    const localizedTarget = localizeRegionName(target);
    const localizedDirection = localizeDirection(direction);
    return `${localizedTarget} konumunun ${distance.replace(".", ",")} km ${localizedDirection}`;
  }

  const nearMatch = text.match(/^near\s+(.+)$/i);
  if (nearMatch) {
    return t("place.near", { place: localizeRegionName(nearMatch[1]) });
  }

  const offshoreMatch = text.match(/^offshore\s+(.+)$/i);
  if (offshoreMatch) {
    return t("place.offshore", { place: localizeRegionName(offshoreMatch[1]) });
  }

  return localizeRegionName(text);
}

function localizeRegionName(value) {
  let text = humanizeAllCaps(String(value || "").replace(/\s+/g, " ").trim());

  const coastMatch = text.match(/^(N|S|E|W|North|South|East|West)\s+Coast\s+Of\s+(.+)$/i);
  if (coastMatch) {
    return t("place.coast", {
      place: localizeRegionName(coastMatch[2]),
      direction: localizeCoastDirection(coastMatch[1]),
    });
  }

  text = text.replace(/\bSerambagiantimur\b/gi, "Seram Doğu Bölümü");

  text = text.replace(/,\s*([A-Z]{2})\b/g, (match, code) => {
    const stateName = US_STATE_LABELS[code];
    return stateName ? `, ${stateName}` : match;
  });

  PLACE_REPLACEMENTS.forEach(([pattern, replacement]) => {
    text = text.replace(pattern, replacement);
  });

  return text;
}

function localizeDirection(direction) {
  return DIRECTION_LABELS[String(direction || "").toLowerCase()] || String(direction || "").toLowerCase();
}

function localizeCoastDirection(direction) {
  const key = String(direction || "").toLowerCase();
  return (
    {
      n: "kuzey",
      north: "kuzey",
      s: "güney",
      south: "güney",
      e: "doğu",
      east: "doğu",
      w: "batı",
      west: "batı",
    }[key] || key
  );
}

function humanizeAllCaps(value) {
  const text = String(value || "");
  if (!/[A-Z]/.test(text) || text !== text.toUpperCase()) {
    return text;
  }

  return text
    .toLowerCase()
    .replace(/(^|[\s(/-])([\p{L}])/gu, (match, prefix, letter) => `${prefix}${letter.toUpperCase()}`);
}

function markerRadius(magnitude) {
  return Math.max(6, Math.min(24, 5 + magnitude * 2.3));
}

function markerColor(magnitude) {
  if (magnitude >= 6) {
    return "#c64045";
  }
  if (magnitude >= 4.5) {
    return "#da6b25";
  }
  if (magnitude >= 3) {
    return "#1f9d8a";
  }
  return "#3678c9";
}

function formatMagnitude(magnitude, includeType = true) {
  if (!Number.isFinite(magnitude)) {
    return "M?";
  }

  const rounded = magnitude.toFixed(1);
  return includeType ? `M${rounded}` : rounded;
}

function formatInteger(value) {
  return new Intl.NumberFormat(currentLocaleConfig().dateLocale).format(Math.max(0, Number(value) || 0));
}

function formatMagnitudeRange(event) {
  if (!Number.isFinite(event.magnitudeMin) || !Number.isFinite(event.magnitudeMax)) {
    return formatMagnitude(event.magnitude);
  }

  if (Math.abs(event.magnitudeMax - event.magnitudeMin) < 0.11) {
    return formatMagnitude(event.magnitudeMax);
  }

  return `M${event.magnitudeMin.toFixed(1)} - M${event.magnitudeMax.toFixed(1)}`;
}

function formatDepthRange(event) {
  if (!Number.isFinite(event.depthMin) || !Number.isFinite(event.depthMax)) {
    return Number.isFinite(event.depth) ? `${event.depth.toFixed(1)} km` : t("depth.none");
  }

  if (Math.abs(event.depthMax - event.depthMin) < 0.6) {
    return `${event.depthMax.toFixed(1)} km`;
  }

  return `${event.depthMin.toFixed(1)} - ${event.depthMax.toFixed(1)} km`;
}

function formatCoordinates(lat, lon) {
  return `${lat.toFixed(2)}, ${lon.toFixed(2)}`;
}

function formatDateTime(timestamp) {
  if (!Number.isFinite(timestamp)) {
    return "-";
  }

  return new Intl.DateTimeFormat(currentLocaleConfig().dateLocale, {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(new Date(timestamp));
}

function formatRelativeTime(timestamp) {
  if (!Number.isFinite(timestamp)) {
    return "-";
  }

  const diffMs = Date.now() - timestamp;
  const diffMinutes = Math.max(0, Math.round(diffMs / 60000));
  if (diffMinutes < 60) {
    return t("time.minutesAgo", { count: diffMinutes });
  }

  const diffHours = Math.round(diffMinutes / 60);
  return t("time.hoursAgo", { count: diffHours });
}

function parseUtcTimestamp(value) {
  if (value == null || value === "") {
    return undefined;
  }

  if (typeof value === "number") {
    return value;
  }

  const text = String(value).trim();
  const isoText = /([zZ]|[+-]\d{2}:?\d{2})$/.test(text) ? text : `${text}Z`;
  const timestamp = Date.parse(isoText);
  return Number.isFinite(timestamp) ? timestamp : undefined;
}

function parseTurkeyTimestamp(value) {
  if (value == null || value === "") {
    return undefined;
  }

  const text = String(value).trim().replace(" ", "T");
  const isoText = /([zZ]|[+-]\d{2}:?\d{2})$/.test(text) ? text : `${text}+03:00`;
  const timestamp = Date.parse(isoText);
  return Number.isFinite(timestamp) ? timestamp : undefined;
}

function parseJsonFromReader(text) {
  const trimmed = String(text || "").trim();

  if (trimmed.startsWith("[") || trimmed.startsWith("{")) {
    return JSON.parse(trimmed);
  }

  const markerIndex = trimmed.indexOf("Markdown Content:");
  const candidate = markerIndex >= 0 ? trimmed.slice(markerIndex) : trimmed;
  const startIndex = candidate.search(/[\[{]/);

  if (startIndex < 0) {
    throw new Error("Okuyucu çıktısında JSON bulunamadı.");
  }

  return JSON.parse(candidate.slice(startIndex).trim());
}

function parseJmaCode(code) {
  const match = String(code || "").match(/^([+-]\d+(?:\.\d+)?)([+-]\d+(?:\.\d+)?)([+-]\d+)/);
  if (!match) {
    return null;
  }

  return {
    lat: toNumber(match[1]),
    lon: toNumber(match[2]),
    depth: Math.abs(toNumber(match[3])) / 1000,
  };
}

function parseCoordinatePair(value) {
  const match = String(value || "").match(/([-+]?\d+(?:\.\d+)?)\s*,\s*([-+]?\d+(?:\.\d+)?)/);
  if (!match) {
    return null;
  }

  return {
    lat: toNumber(match[1]),
    lon: toNumber(match[2]),
  };
}

function normalizeNominatimPlace(item) {
  if (!item) {
    return null;
  }

  const lat = toNumber(item.lat);
  const lon = toNumber(item.lon);
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
    return null;
  }

  return {
    lat,
    lon,
    name: item.name || item.display_name?.split(",")[0] || t("search.resultFallback"),
    label: item.display_name || item.name || t("search.resultFallback"),
    bounds: parseNominatimBounds(item.boundingbox),
    zoom: zoomForPlace(item.type || item.class),
  };
}

function normalizePhotonPlace(feature) {
  if (!feature) {
    return null;
  }

  const props = feature.properties || {};
  const [lon, lat] = feature.geometry?.coordinates || [];
  if (!Number.isFinite(toNumber(lat)) || !Number.isFinite(toNumber(lon))) {
    return null;
  }

  const label = [props.name, props.city, props.state, props.country].filter(Boolean).join(", ");
  return {
    lat: toNumber(lat),
    lon: toNumber(lon),
    name: props.name || t("search.resultFallback"),
    label: label || props.name || t("search.resultFallback"),
    bounds: parsePhotonBounds(props.extent),
    zoom: zoomForPlace(props.type),
  };
}

function normalizeOpenMeteoPlace(item) {
  if (!item) {
    return null;
  }

  const lat = toNumber(item.latitude);
  const lon = toNumber(item.longitude);
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
    return null;
  }

  const label = [item.name, item.admin2, item.admin1, item.country].filter(Boolean).join(", ");
  return {
    lat,
    lon,
    name: item.name || t("search.resultFallback"),
    label: label || item.name || t("search.resultFallback"),
    zoom: zoomForPlace(item.feature_code),
  };
}

function parseNominatimBounds(bounds) {
  const [south, north, west, east] = asArray(bounds).map(toNumber);
  if ([south, north, west, east].every(Number.isFinite)) {
    return [
      [south, west],
      [north, east],
    ];
  }

  return null;
}

function parsePhotonBounds(extent) {
  const [west, north, east, south] = asArray(extent).map(toNumber);
  if ([south, north, west, east].every(Number.isFinite)) {
    return [
      [south, west],
      [north, east],
    ];
  }

  return null;
}

function zoomForPlace(type = "") {
  const normalized = String(type).toLowerCase();
  if (/country|pcli/.test(normalized)) {
    return 5;
  }
  if (/state|province|region|adm1|administrative/.test(normalized)) {
    return 6;
  }
  if (/county|district|adm2/.test(normalized)) {
    return 8;
  }
  if (/city|town|village|hamlet|ppl/.test(normalized)) {
    return 10;
  }
  if (/suburb|neighbourhood|quarter|road|street/.test(normalized)) {
    return 12;
  }

  return 8;
}

function parseDepthFromText(value) {
  const match = String(value || "").match(/([-+]?\d+(?:\.\d+)?)\s*km/i);
  return match ? Math.abs(toNumber(match[1])) : undefined;
}

function parseMagnitudeToken(value) {
  const parsed = toNumber(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function normalizeDepth(value) {
  const parsed = toNumber(value);
  return Number.isFinite(parsed) ? Math.abs(parsed) : undefined;
}

function scoreJmaReport(item) {
  let score = 0;
  if (Number.isFinite(toNumber(item.mag))) {
    score += 100;
  }
  if (parseJmaCode(item.cod)) {
    score += 50;
  }
  if (item.maxi) {
    score += 10;
  }
  score += (parseUtcTimestamp(item.rdt || item.at) || 0) / 1e12;
  return score;
}

function worstAlertLevel(levels) {
  const weights = {
    green: 1,
    orange: 2,
    red: 3,
  };

  return levels
    .map((level) => String(level).toLowerCase())
    .sort((a, b) => (weights[b] || 0) - (weights[a] || 0))[0];
}

function strongestIntensity(values) {
  if (!values.length) {
    return undefined;
  }

  const sorted = [...values].sort((a, b) => intensityWeight(b) - intensityWeight(a));
  return sorted[0];
}

function intensityWeight(value) {
  const text = String(value);
  const numeric = toNumber(text);
  if (Number.isFinite(numeric)) {
    return numeric;
  }
  if (/7/.test(text)) {
    return 7;
  }
  if (/6\+/.test(text)) {
    return 6.5;
  }
  if (/6/.test(text)) {
    return 6;
  }
  if (/5\+/.test(text)) {
    return 5.5;
  }
  if (/5/.test(text)) {
    return 5;
  }
  return 0;
}

function formatDateOnly(date) {
  return date.toISOString().slice(0, 10);
}

function formatTurkeyApiDate(date) {
  return new Date(date.getTime() + TURKEY_OFFSET_MS).toISOString().slice(0, 19);
}

function distanceKm(lat1, lon1, lat2, lon2) {
  const earthRadiusKm = 6371;
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadiusKm * c;
}

function toRadians(value) {
  return (value * Math.PI) / 180;
}

function toNumber(value) {
  if (value == null || value === "" || value === "-.-") {
    return undefined;
  }

  const parsed = Number(String(value).replace(",", "."));
  return Number.isFinite(parsed) ? parsed : undefined;
}

function asArray(value) {
  if (Array.isArray(value)) {
    return value;
  }
  if (value == null) {
    return [];
  }
  return [value];
}

function unique(values) {
  return Array.from(new Set(values.filter(Boolean)));
}

function safeUrl(url) {
  const text = String(url || "");
  if (!/^https?:\/\//i.test(text)) {
    return "#";
  }
  return escapeHtml(text);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
