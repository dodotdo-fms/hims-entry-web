'use strict';

var apiUrl = '/auth';

var errorMessage = null;
var idInput = null;
var passwordInput = null;
var loginBtn = null;

function requestLogin(id, password, cb) {
    var request = new XMLHttpRequest();

    request.open('POST', apiUrl, true);
    request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            if (request.status === 301) {
                cb(null, JSON.parse(request.responseText));
            } else {
                cb(JSON.parse(request.responseText), null);
            }
        }
    };

    request.send(JSON.stringify({
        userid: id,
        password: password
    }));
}

document.addEventListener('DOMContentLoaded', function () {
    errorMessage = document.getElementById('loginForm-errorMessage');
    idInput = document.getElementById('loginForm-idInput');
    passwordInput = document.getElementById('loginForm-passwordInput');
    loginBtn = document.getElementById('loginForm-submitBtn');

    loginBtn.addEventListener('click', function (event) {
        event.preventDefault();

        if (classie.has(loginBtn, 'c-LoginForm__submitBtn--disabled')) return;

        classie.add(loginBtn, 'c-LoginForm__submitBtn--disabled');
        loginBtn.text = 'login...';

        requestLogin(
            idInput.value,
            passwordInput.value,
            function (err, res) {
                if (err) {
                    classie.remove(errorMessage, 'c-LoginForm__errorMessage--is-hidden');
                    classie.add(errorMessage, 'c-LoginForm__errorMessage--is-show');
                    classie.remove(loginBtn, 'c-LoginForm__submitBtn--disabled');

                    idInput.value = '';
                    passwordInput.value = '';
                } else {
                    location.replace(res.url + '/#/?token=' + res.token);
                }
            });
    });
});
