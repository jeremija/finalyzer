const fetch = require('fetch');

export function get(url, params) {
  return fetch(url, params)
  .then(res => res.json());
}

export function post(url, body) {
  return fetch('/users', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  .then(res => res.json());
}
