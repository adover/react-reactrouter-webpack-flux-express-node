/* Common Utilities */
import _ from 'lodash';

const weekday = new Array(7);
weekday[0] =  'Sunday';
weekday[1] = 'Monday';
weekday[2] = 'Tuesday';
weekday[3] = 'Wednesday';
weekday[4] = 'Thursday';
weekday[5] = 'Friday';
weekday[6] = 'Saturday';

const monthNames = [
  'January', 'February', 'March',
  'April', 'May', 'June', 'July',
  'August', 'September', 'October',
  'November', 'December',
];

/**
 * Converts the date that's received from the WP API to a standardised date.
 * @param  {string} dateStr Wordpress Date String
 * @return {string}         Formatted Date
 */
export function wpDateFormat(dateStr) {
  // WP Format is YYYY-MM-DDT01:22:31

  dateStr = dateStr.split('-');
  let day = dateStr[2].split('T');

  let month = monthNames[(parseInt(dateStr[1]) - 1)];

  let formattedDate = day[0] + ' ' + month + ' ' + dateStr[0];

  return formattedDate;
}

export function acfDateFormat(dateStr) {
  // ACF Format is DD/MM/YYYY
  dateStr = dateStr.split('/');

  let day = dateStr[0],
      month = monthNames[parseInt(dateStr[1], 10)],
      year = dateStr[2];

  return day + ' ' + month + ' ' + year;

}

export function getUrl(obj) {
  if (_.has(obj, 'type') && obj.type === 'store') {
    return `/directory/detail/${obj.slug}`;
  }

  if (_.has(obj, 'type') && obj.type === 'page') {
    return `/${obj.slug}`;
  }

  if (_.has(obj, 'type') && obj.type === 'post') {
    return `/news/story/${obj.slug}`;
  }

  console.warn('Unsupported or not a linkable object');
  return false;
}

// http://stackoverflow.com/a/7124052
export function htmlEscape(str) {
  return str.replace(/&amp;/g, '&')
            .replace(/&#38;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&#8217;/g, '\'')
            .replace(/&apos;/g, '\'');
}

// I needed the opposite function today, so adding here too:
export function htmlUnescape(value) {
  return String(value)
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, '\'')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&');
}

export function isClient() {
  return typeof window !== 'undefined';
}

export function isLocal() {
  return (isClient() && _.includes(window.location.pathname, 'localhost'));
}

export function isRetina() {
  if (window.matchMedia) {
    var mq = window.matchMedia('only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen  and (min-device-pixel-ratio: 1.3), only screen and (min-resolution: 1.3dppx)');
    return (mq && mq.matches || (window.devicePixelRatio > 1));
  }
}

export function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

export function showHideIfExists(element, show = false) {
  if (typeof element !== 'undefined' && element) {
    if (show) {
      element.style.display = 'block';
    }else {
      element.style.display = 'none';
    }
  }else {
    return false;
  }
}

export function getTitleFromSlug(slug) {
  let title = '';

  _.forEach(PagesStore.getPagesStore().data, function(page) {
    if (page.slug == slug) {
      title = page.title;
    }
  });

  return title;
}
