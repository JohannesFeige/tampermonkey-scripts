// ==UserScript==
// @name         bdriano-app
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
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
