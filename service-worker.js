var CACHE = "v1";

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE).then(function(cache) {
            console.log("Caching all necessary documents");
            return cache.addAll([
                '/',
                '/index.html',
                '/img/math-icon-48X48.svg',
                '/img/math-icon-72X72.svg',
                '/img/math-icon-96X96.svg',
                '/img/math-icon-144X144.svg',
                '/img/math-icon-168X168.svg',
                '/img/math-icon-192X192.svg',
                '/img/math-icon-512X512.svg'
/*
                'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
                'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
                'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/fonts/fontawesome-webfont.woff2?v=4.7.0',
                'https://code.jquery.com/jquery-3.2.1.slim.min.js',
                'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js',
                'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js',
                'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.8/angular.js',
                'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.8/angular-animate.js',
                'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.14.1/moment.js',
                'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.14.1/locale/da.js'
*/
            ]);
        }).catch(function (reason) {
            console.error("Failed to prefetch files " + reason);
        })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.open(CACHE).then(function (cache) {
            return cache.match(event.request).then(function (response) {
                return response || update(event.request);
            })
        })
    );

    function update(request) {
        console.log("Updating cache with " + request.url);
        console.log(request);

        return caches.open(CACHE).then(function (cache) {
            return fetch(request).then(function (response) {
                return cache.put(request, response.clone()).then(function () {
                    return response;
                });
            });
        });
    }
});