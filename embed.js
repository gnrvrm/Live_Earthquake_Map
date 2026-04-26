(function attachEarthquakeMap(global) {
  "use strict";

  const COMMAND_TYPE = "earthquake-map:command";
  const RESPONSE_TYPE = "earthquake-map:response";
  const EVENT_TYPE = "earthquake-map:event";
  const DEFAULT_TIMEOUT_MS = 20000;

  function create(target, options = {}) {
    const container = typeof target === "string" ? document.querySelector(target) : target;
    if (!container) {
      throw new Error("EarthquakeMap.create target was not found.");
    }

    const iframe = document.createElement("iframe");
    iframe.src = buildEmbedUrl(options);
    iframe.title = options.title || "Live Earthquake Map";
    iframe.loading = options.loading || "lazy";
    iframe.referrerPolicy = options.referrerPolicy || "strict-origin-when-cross-origin";
    iframe.allow = options.allow || "";
    iframe.style.width = normalizeSize(options.width || "100%");
    iframe.style.height = normalizeSize(options.height || 500);
    iframe.style.border = "0";
    iframe.style.display = "block";

    if (options.className) {
      iframe.className = options.className;
    }

    container.appendChild(iframe);

    let ready = false;
    let sequence = 0;
    const pending = new Map();
    const queued = [];
    const handlers = new Map();

    function emit(name, data) {
      const listeners = handlers.get(name);
      if (!listeners) {
        return;
      }

      listeners.forEach((handler) => handler(data));
    }

    function flushQueue() {
      queued.splice(0).forEach((task) => task());
    }

    function handleMessage(event) {
      if (event.source !== iframe.contentWindow) {
        return;
      }

      const message = event.data;
      if (!message || typeof message !== "object") {
        return;
      }

      if (message.type === EVENT_TYPE) {
        if (message.event === "ready") {
          ready = true;
          flushQueue();
        }
        emit(message.event, message.data);
        return;
      }

      if (message.type === RESPONSE_TYPE) {
        const request = pending.get(message.id);
        if (!request) {
          return;
        }

        global.clearTimeout(request.timer);
        pending.delete(message.id);

        if (message.ok) {
          request.resolve(message.data);
        } else {
          request.reject(new Error(message.error || "Earthquake map command failed."));
        }
      }
    }

    global.addEventListener("message", handleMessage);

    function command(name, payload = {}, commandOptions = {}) {
      return new Promise((resolve, reject) => {
        const send = () => {
          const id = `eq-${Date.now()}-${++sequence}`;
          const timeoutMs = commandOptions.timeoutMs || options.timeoutMs || DEFAULT_TIMEOUT_MS;
          const timer = global.setTimeout(() => {
            pending.delete(id);
            reject(new Error(`Earthquake map command timed out: ${name}`));
          }, timeoutMs);

          pending.set(id, { resolve, reject, timer });
          iframe.contentWindow.postMessage(
            {
              type: COMMAND_TYPE,
              id,
              command: name,
              payload,
            },
            "*"
          );
        };

        if (!ready && commandOptions.waitForReady !== false) {
          queued.push(send);
        } else {
          send();
        }
      });
    }

    return {
      iframe,
      on(name, handler) {
        if (!handlers.has(name)) {
          handlers.set(name, new Set());
        }
        handlers.get(name).add(handler);
        return () => handlers.get(name)?.delete(handler);
      },
      off(name, handler) {
        handlers.get(name)?.delete(handler);
      },
      setView(view) {
        return command("setView", view);
      },
      fitBounds(bounds) {
        return command("fitBounds", bounds);
      },
      setFilters(filters) {
        return command("setFilters", filters);
      },
      refresh() {
        return command("refresh");
      },
      search(query) {
        return command("search", typeof query === "string" ? { query } : query);
      },
      openEvent(id) {
        return command("openEvent", typeof id === "string" ? { id } : id);
      },
      getEvents(options) {
        return command("getEvents", options || {});
      },
      getState() {
        return command("getState");
      },
      destroy() {
        global.removeEventListener("message", handleMessage);
        pending.forEach((request) => {
          global.clearTimeout(request.timer);
          request.reject(new Error("Earthquake map widget was destroyed."));
        });
        pending.clear();
        queued.length = 0;
        iframe.remove();
      },
    };
  }

  function buildEmbedUrl(options) {
    const url = new URL(options.embedUrl || defaultEmbedUrl());
    setParam(url, "mode", "embed");
    setParam(url, "lang", options.lang || options.locale);
    setParam(url, "zoom", options.zoom);
    setParam(url, "window", options.windowHours ?? options.window);
    setParam(url, "minMag", options.minMagnitude ?? options.minMag);
    setParam(url, "sources", serializeSources(options.sources));
    setParam(url, "search", serializeBoolean(options.search));
    setParam(url, "legend", serializeBoolean(options.legend));
    setParam(url, "caption", serializeBoolean(options.caption));
    setParam(url, "status", serializeBoolean(options.status));

    const center = options.center;
    if (Array.isArray(center) && center.length >= 2) {
      setParam(url, "lat", center[0]);
      setParam(url, "lon", center[1]);
    } else {
      setParam(url, "lat", options.lat);
      setParam(url, "lon", options.lon ?? options.lng);
    }

    const bbox = serializeBbox(options.bbox || options.bounds);
    if (bbox) {
      setParam(url, "bbox", bbox);
    }

    return url.href;
  }

  function defaultEmbedUrl() {
    const script =
      document.currentScript ||
      Array.from(document.scripts).find((item) => /embed\.js(?:[?#].*)?$/.test(item.src));
    if (script?.src) {
      return new URL("embed.html", script.src).href;
    }
    return "https://gnrvrm.github.io/Live_Earthquake_Map/embed.html";
  }

  function setParam(url, key, value) {
    if (value === undefined || value === null || value === "") {
      return;
    }
    url.searchParams.set(key, String(value));
  }

  function serializeSources(value) {
    if (!value) {
      return "";
    }
    if (Array.isArray(value)) {
      return value.join(",");
    }
    if (typeof value === "object") {
      return Object.entries(value)
        .filter(([, enabled]) => enabled)
        .map(([key]) => key)
        .join(",");
    }
    return String(value);
  }

  function serializeBbox(value) {
    if (!value) {
      return "";
    }
    if (Array.isArray(value)) {
      return value.join(",");
    }
    if (typeof value === "object") {
      return [value.west, value.south, value.east, value.north].join(",");
    }
    return String(value);
  }

  function serializeBoolean(value) {
    if (value === undefined || value === null) {
      return "";
    }
    return value ? "1" : "0";
  }

  function normalizeSize(value) {
    return typeof value === "number" ? `${value}px` : String(value);
  }

  global.EarthquakeMap = {
    create,
    buildEmbedUrl,
  };
})(window);
