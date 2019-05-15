

(function() {
    /*if('objectFit' in document.documentElement.style !== false) {
        return;
    }*/

    // https://davidwalsh.name/javascript-debounce-function
    // Returns a function, that, as long as it continues to be invoked, will not
    // be triggered. The function will be called after it stops being called for
    // N milliseconds. If `immediate` is passed, trigger the function on the
    // leading edge, instead of the trailing.
    var debounce = function(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    var is_portrait = function() {
        var elements = document.querySelectorAll('.js-image-cover');
        Array.prototype.forEach.call(elements, function(el, i) {
            var className = 'is-portrait';
            var rect = el.getBoundingClientRect();
            console.log(rect);
            if (rect.width < rect.height) {
                if (el.classList) {
                    el.classList.add(className);
                } else {
                    el.className += ' ' + className;
                }
            } else {
                if (el.classList) {
                    el.classList.remove(className);
                } else {
                    el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
                }
            }
        });
    };

    var polyfill = function() {

        is_portrait();

        var checkresize = debounce(function() {
            is_portrait();
        }, 250);

        window.addEventListener('resize', checkresize);
    };

    var ready = function(fn) {
        if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }

    ready(polyfill);
})();