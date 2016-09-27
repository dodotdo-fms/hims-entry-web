(function () {
    'use strict';

    var apiUrl = '/';

    var classie = window.classie;

    var errorMessage = null;
    var idInput = null;
    var passwordInput = null;
    var loginBtn = null;

    function requestLogin(id, password, cb) {
        var request = new XMLHttpRequest();

        request.open('POST', apiUrl, true);
        request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        request.setRequestHeader('Accept', 'application/json');

        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.status === 301 || request.status === 200) {
                    cb(null, JSON.parse(request.responseText));
                } else {
                    cb(request.responseText, null);
                }
            }
        };

        request.send(JSON.stringify({
            userid: id,
            password: password
        }));
    }

    document.addEventListener('DOMContentLoaded', function () {
        var isLoginBtnAble;

        errorMessage = document.getElementById('loginForm-errorMessage');
        idInput = document.getElementById('loginForm-idInput');
        passwordInput = document.getElementById('loginForm-passwordInput');
        loginBtn = document.getElementById('loginForm-submitBtn');

        isLoginBtnAble = function () {
            var idValue = idInput.value;
            var passwordValue = passwordInput.value;

            return idValue.length > 0 && passwordValue.length > 0;
        };

        idInput.addEventListener('keypress', function () {
            if (isLoginBtnAble()) {
                classie.remove(loginBtn, 'c-LoginForm__submitBtn--disabled');
            }
        });

        passwordInput.addEventListener('keypress', function () {
            if (isLoginBtnAble()) {
                classie.remove(loginBtn, 'c-LoginForm__submitBtn--disabled');
            }
        });

        loginBtn.addEventListener('click', function (event) {
            var id;
            var password;

            event.preventDefault();

            if (classie.has(loginBtn, 'c-LoginForm__submitBtn--disabled')) return;

            classie.add(loginBtn, 'c-LoginForm__submitBtn--disabled');
            id = idInput.value;
            password = passwordInput.value;

            requestLogin(
                id,
                password,
                function (err, res) {
                    if (err) {
                        classie.remove(errorMessage, 'c-LoginForm__errorMessage--is-hidden');
                        classie.add(errorMessage, 'c-LoginForm__errorMessage--is-show');

                        idInput.value = '';
                        passwordInput.value = '';
                    } else {
                        location.replace(res.url + '/#?token=' + res.token);
                    }
                }
            );
        });
    });
})();
