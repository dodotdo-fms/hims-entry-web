(function (window) {
    'use strict';

    var classie;
    var classReg = function (className) {
        return new RegExp('(^|\\s+)' + className + '(\\s+|$)');
    };

    var hasClass;
    var addClass;
    var removeClass;
    var toggleClass;

    if ('classList' in document.documentElement) {
        hasClass = function (elem, c) {
            return elem.classList.contains(c);
        };

        addClass = function (elem, c) {
            elem.classList.add(c);
        };

        removeClass = function (elem, c) {
            elem.classList.remove(c);
        };
    } else {
        hasClass = function (elem, c) {
            return classReg(c).test(elem.className);
        };

        addClass = function (elem, c) {
            if (!hasClass(elem, c)) {
                elem.className += (' ' + c);
            }
        };

        removeClass = function (elem, c) {
            elem.className = elem.className.replace(classReg(c), ' ');
        };
    }

    toggleClass = function (elem, c) {
        var fn = hasClass(elem, c) ? removeClass : addClass;
        fn(elem, c);
    };

    classie = {
        has: hasClass,
        add: addClass,
        remove: removeClass,
        toggle: toggleClass
    };

    window.classie = classie;
})(window);
