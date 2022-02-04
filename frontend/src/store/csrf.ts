// frontend/src/store/csrf.js
import Cookies from 'js-cookie';

// const headerDict: { [key: string]: string | undefined } = {
//   'Content-Type': 'application/json',
//   'XSRF-Token': ''
// }

export async function csrfFetch(url: string, options: RequestInit = { }) {
  // set options.method to 'GET' if there is no method
  options.method = options.method || 'GET';
  // set options.headers to an empty object if there is no headers
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'XSRF-Token': Cookies.get('XSRF-TOKEN') || ''
  }

  options.headers = options.headers || {};

  // if the options.method is not 'GET', then set the "Content-Type" header to
    // "application/json", and set the "XSRF-TOKEN" header to the value of the 
    // "XSRF-TOKEN" cookie
  if (options.method.toUpperCase() !== 'GET') {
    options.headers = headers;
  }
  // call the default window's fetch with the url and the options passed in
  const fetch: any = window.fetch;
  const res = await fetch(url, options);

  // if the response status code is 400 or above, then throw an error with the
    // error being the response
  if (res.status >= 400) throw res;

  const contentType = res.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    const data = await res.json();
    res.data = data;
  }

  // if the response status code is under 400, then return the response to the
    // next promise chain
  return res;
}

export function restoreCSRF() {
  return csrfFetch('/api/csrf/restore');
}