/*------------------------------------------------------------------------------------------------*\
    Fall-Back Cookie Notice Pattern v0.1
    ------------------------------------

    To avoid any confusion, it's probably best to copy these settings to another file that you're
    concatenating and then make any changes to the defaults.
\*------------------------------------------------------------------------------------------------*/

var cookie_name                   = 'fallback_accept_cookies';
var cookie_expire_days            = 60;
var cookie_notice_id              = 'cookie_notice';
var cookie_button_id              = 'accept_cookies';
var cookie_notice_class           = 'cookie_notice';
var cookie_button_class           = '';
var cookie_close_class            = 'cookie_notice--close';
var cookie_notice_effect_duration = 1000;
var cookie_html                   =
'<div id="' + cookie_notice_id + '" class="' + cookie_notice_class + '">' + "\n" +
'<p class="cookie_notice__message">This site uses <a href="http://www.allaboutcookies.org/" rel="external" target="_blank">cookies</a> to improve user experience. By using this site you agree to our use of cookies.</p>' + "\n" +
'<span class="cookie_notice__action"><button id="' + cookie_button_id + '" class="' + cookie_button_class + '">Dismiss</button></span>' + "\n" +
'</div>';

(function() {
    var ready = function(fn) {
        if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }

    var adjustJustifyContent = {
        run: function() {
            var containers = document.querySelectorAll('.js-adjust-me');
            Array.prototype.forEach.call(containers, function(container, i) {
                var item = container.querySelector('.js-adjust-me__reference');
                if (getComputedStyle(container)['height'] > getComputedStyle(item)['height']) {
                    container.style.justifyContent = 'center';
                } else {
                    container.style.justifyContent = 'space-between';
                }
            });
        }
    }



    ready(adjustJustifyContent.run);
    window.onresize = adjustJustifyContent.run;
})();
/*!
    Fall-Back Cookie Notice v1.1.0
    https://github.com/Fall-Back/Cookie-Notice
    Copyright (c) 2017, Andy Kirk
    Released under the MIT license https://git.io/vwTVl
*/
(function() {
    var ready = function(fn) {
        if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }
    
    var createCookie = function(name,value,days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            var expires = "; expires="+date.toGMTString();
        }
        else var expires = "";
        document.cookie = name+"="+value+expires+"; path=/";
    }

    var readCookie = function(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

    var eraseCookie = function(name) {
        createCookie(name,"",-1);
    }
    
    var cookienotice = {

        init: function() {
            var accepted_cookies = readCookie(cookie_name);
            if (!accepted_cookies) {
                var body_el = document.getElementsByTagName('body')[0];
                body_el.insertAdjacentHTML('afterbegin', cookie_html);
                
                document.getElementById(cookie_button_id).onclick = function(){
                    createCookie(cookie_name, 'true', cookie_expire_days);
                    document.getElementById(cookie_notice_id).className += '  ' + cookie_close_class;
                    /*
                        Without CSS (or transition suport - IE9) the notice won't disappear, so wait until fade 
                        has finished then remove:
                    */
                    setTimeout(function(){
                        var c = document.getElementById(cookie_notice_id);
                        c.parentNode.removeChild(c);
                    }, cookie_notice_effect_duration);
                };
            }
        }
    }
    
    ready(cookienotice.init);
})();

/*!
    Fall-Back SVG v1.1.0
    https://github.com/Fall-Back/SVG
    Copyright (c) 2017, Andy Kirk
    Released under the MIT license https://git.io/vwTVl
*/
(function() {
    var ready = function(fn) {
        if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }
    
    var svg = {

        init: function() {
            /*
                Fix CSS shortcomings in older browsers. Specifically fix the width of the objects container
                to be the same width as the object.
            */

            if (!!(
                document.body.style.msTouchSelect !== undefined /* IE10+ */
             || (document.all && document.addEventListener && !window.atob) /* IE9 */
             || Object.prototype.toString.call(window.operamini) === '[object OperaMini]' /* Opera Mini */
            )) {

                var objs = document.getElementsByTagName('object');
                var i = 0
                  , l = objs.length
                  , data
                  , obj;

                for (i; i < l; i++) {
                    obj = objs[i];
                    // Check object is inside of an .svg__link and
                    // not inside of an .svg--fluid
                    if (obj.parentNode.className.indexOf('svg__link') == -1 || obj.parentNode.parentNode.className.indexOf('svg--fluid') >= 0) {
                        continue;
                    }
                    
                    
                    // If the .svg container has a width of 'auto', things don't work, so we need to 
                    // temporarily set the width to 100% so the children can expand to their natural
                    // width:
                    var svg = obj.parentNode.parentNode;
                    // Is the width 'auto' or not set.
                    if (svg.style.width == '' || svg.style.width == 'auto') {
                        svg.style.width  = '100%';
                    }
                    
                    
                    // Also, if there's an auto width parent to the .svg container (e.g. for styling a
                    // box or whatever) we need to do the same. Apply the .svg-container class to that
                    // element.
                    var container = svg.parentNode;
                    // Is the width 'auto' or not set.
                    if (container.className.indexOf('svg-container') > 0 && (container.style.width == '' || container.style.width == 'auto')) {
                        container.style.width  = '100%';
                    }
                    
                    
                    obj.style.maxWidth         = 'none';
                    obj.style.minWidth         = '0';
                    obj.parentNode.style.width = '100%';
                    obj.parentNode.style.width = obj.offsetWidth + 'px';
                    obj.style.maxWidth         = '100%';
                    

                    // Reset the container width:
                    container.style.width  = '';
                    
                    
                    // Reset the svg width:
                    svg.style.width  = '';
                }
            }
        }
    }
    
    ready(svg.init);
})();