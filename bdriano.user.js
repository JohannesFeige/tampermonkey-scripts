// ==UserScript==
// @name         bdriano-auto-reload
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Additional params handling for bdriano.
//               auto=50 -> reloads after 50ms
//               repeat=5 -> opens 4 additional tabs
// @author       You
// @match        *bdriano.de/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    function reload(auto) {
        if(auto && !Number.isNaN(auto)) {
            setTimeout(() => location.reload(), +auto);
        }
    }

    function repeat(queries) {
        function getParams (obj) {
            return Object.keys(obj).map(k => [k, obj[k]]).map(kv => `${kv[0]}=${kv[1]}`).join('&');
        }
        const {repeat} = queries;

        if(repeat && !Number.isNaN(repeat) && +repeat > 1) {

            queries.repeat--;
            const baseUrl = location.origin;
            const params = getParams({...queries});
            const url = params ? `${baseUrl}?${params}` : baseUrl;

            window.open(url, '_blank');
        }
        delete queries.repeat;
        location.search = getParams(queries)

    }

    const queries = Object.fromEntries(location.search.replace('?', '').split('&').map(param => param.split('=')))

    if(queries.repeat) {
        repeat({...queries});
        return;
    }

    if(queries.auto) {
        reload(queries.auto);
    }
})();
