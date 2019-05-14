(function() {
    var polyfill = function() {

        if('objectFit' in document.documentElement.style === false) {
            
            var elements = document.querySelectorAll('.js-image-cover');
            Array.prototype.forEach.call(elements, function(el, i) {
                var $container = el,
                    imgUrl = $container.querySelector('img').getAttribute('src');
                if (imgUrl) {
                    $container.style.backgroundImage('url(' + imgUrl + ')');
                }
            });
        }
        
    }
    
    var ready = function(fn) {
        if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }
    
    ready(polyfill);
})();