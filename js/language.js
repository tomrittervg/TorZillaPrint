/* TABLE:  Language & Locale / Time Zone & Date Format / Geolocation */

'use strict';

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};
// date/time variables
var dateUsed = new Date();
var dateOld = addDays(dateUsed, -183); // second tz offset
var dateFormatted = new Intl.DateTimeFormat(undefined, { weekday: "long", month: "long", day: "numeric", year: "numeric", hour: "numeric", minute: "numeric", second: "numeric", hour12: true, timeZoneName: "long" });
var rOptions = dateFormatted.resolvedOptions();
// date/time format options
var dateOpt = { weekday: "long", month: "long", day: "numeric", year: "numeric", hour: "numeric", minute: "numeric", second: "numeric", hour12: true, timeZoneName: "long" };

// output
// language
dom.nLanguages = navigator.languages;
dom.nLanguage = navigator.language;
dom.nLanguages0 = navigator.languages[0];
// locale
dom.localeIPR = new Intl.PluralRules().resolvedOptions().locale;
dom.localeRO = rOptions.locale;
// timezone offsets
dom.tzOffsets = dateUsed.getTimezoneOffset()+ ' | ' + dateOld.getTimezoneOffset();
// date/time
dom.dateSystem = dateUsed;
dom.dateString = dateUsed.toString();
// long versions
dom.lngdateLS = dateUsed.toLocaleString(undefined, dateOpt);
dom.lngdateLDS = dateUsed.toLocaleDateString(undefined, dateOpt);
dom.lngdateLTS = dateUsed.toLocaleTimeString(undefined, dateOpt);
dom.lngdateIDTF = Intl.DateTimeFormat(undefined, dateOpt).format(dateUsed);
// various
dom.dateGMT = dateUsed.toGMTString();;
dom.dateUTC = dateUsed.toUTCString();
dom.dateLS = dateUsed.toLocaleString();
dom.dateTAtoLS = [dateUsed].toLocaleString();
dom.dateLDS = dateUsed.toLocaleDateString();
dom.dateIDTF = Intl.DateTimeFormat().format(dateUsed);
dom.dateLTS = dateUsed.toLocaleTimeString();
dom.dateTS = dateUsed.toTimeString();
dom.dateFTP = JSON.stringify(dateFormatted.formatToParts(dateUsed));
dom.numFTP = JSON.stringify(new Intl.NumberFormat().formatToParts(1000)[1]);
dom.hourRO = new Intl.DateTimeFormat(undefined, {hour: "numeric"}).resolvedOptions().hourCycle;
// calendar
dom.calendarRO = rOptions.calendar;
// numbering
dom.numsysRO = rOptions.numberingSystem;

// geo
if ("geolocation" in navigator) {dom.nGeolocation="yes"} else (dom.nGeolocation="no");
navigator.permissions.query({name:"geolocation"}).then(e => dom.pGeolocation=e.state);
