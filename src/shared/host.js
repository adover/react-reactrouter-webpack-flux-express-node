import _ from 'lodash';

let ENV;

export function setEnv(_env) {
  ENV = _env;
}

export default function host() {
  if (typeof window !== 'undefined' && _.has(window, 'ENV')) {
    if (!_.includes(window.location.hostname, 'localhost')) {
      return '';
    }
    // if (window.ENV === 'staging' || window.ENV === 'production' || ENV === 'ngrok') {
    //   return '';
    // }
  }
  if (ENV === 'staging' || ENV === 'production') {
    return '';
  }
  return;
};
