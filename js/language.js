/* TABLE:  Language & Locale / Time Zone & Date Format / Geolocation */

'use strict';

// language
dom.nLanguage = navigator.language;
dom.nLanguages = navigator.languages;

// geo
if ("geolocation" in navigator) {dom.nGeolocation="yes"} else (dom.nGeolocation="no");
navigator.permissions.query({name:"geolocation"}).then(e => dom.pGeolocation=e.state);
