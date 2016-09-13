import * as api from './api';

let onChangeCb = () => {};

export function login(email, pass) {
    return api.login(email, pass).then(function(res) {
        localStorage.token = res.token;
        localStorage.userId = res.userId;
        onChangeCb(true);
    });
}

export function getToken() {
    return localStorage.token;
}

export function logout() {
    delete localStorage.token;
    delete localStorage.userId;
}

export function loggedIn() {
    return !!localStorage.token && localStorage.userId;
}

export function setOnChangeCb(cb) {
  onChangeCb = cb;
}
