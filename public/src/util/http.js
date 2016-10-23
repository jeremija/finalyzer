const fetch = require('node-fetch');

function get(url, params) {
  url = window.location.origin + url;
  return fetch(url, params)
  .then(res => res.json());
}

function post(url, body) {
  url = window.location.origin + url;
  return fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  .then(res => res.json());
}

function _delete(url, body) {
  url = window.location.origin + url;
  return fetch(url, {
    method: 'DELETE'
  })
  .then(res => res.json());
}

module.exports = { get, post, delete: _delete };
