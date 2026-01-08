const CACHE_NAME = "risk-app-cache";

// فایل‌هایی که کش می‌شوند
const urlsToCache = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./manifest.json"
];

// نصب Service Worker
self.addEventListener("install", (event) => {
  console.log("Service Worker Installing...");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// فعال‌سازی و پاک کردن کش‌های قدیمی
self.addEventListener("activate", (event) => {
  console.log("Service Worker Activated");
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Fetch با استراتژی "Network First" برای آخرین تغییرات
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // اگر پاسخ موفق بود، آن را در کش ذخیره کن
        if (event.request.method === "GET") {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        // اگر اینترنت نبود، نسخه کش را بده
        return caches.match(event.request);
      })
  );
});
