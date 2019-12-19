// ==UserScript==
// @name         bdriano-auto-reload
// @namespace    http://tampermonkey.net/
// @version      0.1.1
// @description  Load bdriano.de like "bdriano.de?auto=500". Script will reload the site after 500ms.
// @author       You
// @match        https://bdriano.de/?auto=*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const queries = Object.fromEntries(location.search.replace('?', '').split('&').map(param => param.split('=')))

    if(queries.auto && !Number.isNaN(queries.auto)) {
        setTimeout(() => location.reload(), +queries.auto);
    }
})();
