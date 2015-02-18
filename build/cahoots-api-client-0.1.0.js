!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var e;"undefined"!=typeof window?e=window:"undefined"!=typeof global?e=global:"undefined"!=typeof self&&(e=self),(e.cahoots||(e.cahoots={})).api=t()}}(function(){var t;return function e(t,r,n){function o(s,a){if(!r[s]){if(!t[s]){var u="function"==typeof require&&require;if(!a&&u)return u(s,!0);if(i)return i(s,!0);var c=new Error("Cannot find module '"+s+"'");throw c.code="MODULE_NOT_FOUND",c}var l=r[s]={exports:{}};t[s][0].call(l.exports,function(e){var r=t[s][1][e];return o(r?r:e)},l,l.exports,e,t,r,n)}return r[s].exports}for(var i="function"==typeof require&&require,s=0;s<n.length;s++)o(n[s]);return o}({1:[function(t,e){"use strict";e.exports=t("./lib/")},{"./lib/":4}],2:[function(t,e){"use strict";function r(t){i.call(this,t)}var n=t("util"),o=t("mandatory"),i=t("./base");e.exports=function(t){var e=new r(t);return{authenticate:e.authenticate.bind(e)}},n.inherits(r,i),r.prototype.authenticate=function(t,e,r){function n(t,e){return t?r(i.$createError(t,"login failed.")):(i.$token=e.token,void r(null,e))}var i=this,s={};o(t).is("string","Please provide an email address."),o(e).is("string","Please provide a password."),s.body={email:t,password:e},this.$firePOST("/tokens",s,n)}},{"./base":3,mandatory:13,util:11}],3:[function(t,e){"use strict";function r(t){this.$endpoint=t,this.$headers={"Content-Type":"application/json"},this.$token=null}var n=t("superagent"),o=t("json3"),i=t("verror"),s={400:"ValidationError",401:"UnauthorizedError",403:"InvalidTokenError",404:"NotFoundError",500:"APIUnavailableError",parse:"ParseError",network:"NetworkError"};e.exports=r,r.prototype.$createError=function(t,e){var r=null;return r=new Error(e),r.name=t.name,r.cause=t,r},r.prototype.$request=function(t,e,r,a){function u(t,e){var r=null;if(t)return r=new i(t,"failed to communicate with the cahoots API."),r.name=s.network,a(r);if(e.status<200||e.status>=300)return r=new i("API sent an error response."),r.name=s[e.status],a(r);try{return a(null,o.parse(e.text))}catch(t){return r=new i(t,"Unable to parse API response."),r.name=s.parse,a(r)}}var c=this.$endpoint+e;"function"==typeof r&&(a=r,r={}),n[t.toLowerCase()](c).set(this.$headers).query(r.query).send(r.body).end(u)},r.prototype.$fireGET=function(t,e,r){function n(t,e){var n=null;return t?(n=new i(t,"failed to perform HTTP GET request"),n.name=t.name,r(n)):void r(null,e)}"function"==typeof e&&(r=e,e={}),this.$request("GET",e,n)},r.prototype.$firePOST=function(t,e,r){function n(t,e){var n=null;return t?(n=new i(t,"failed to perform HTTP POST request"),n.name=t.name,r(n)):void r(null,e)}"function"==typeof e&&(r=e,e={}),this.$request("POST",t,e,n)}},{json3:12,superagent:14,verror:17}],4:[function(t,e){(function(r){"use strict";var n=t("verror"),o={person:t("./person"),account:t("./account"),organization:t("./organization")};e.exports=function(t){var e=r.env.ENDPOINT||"https://api.cahoots.pw/v1",i=o[t];if(!i)throw new n("failed to return service %s",t);return i(e)}}).call(this,t("_process"))},{"./account":2,"./organization":5,"./person":6,_process:9,verror:17}],5:[function(t,e){"use strict";function r(t){i.call(this,t)}var n=t("util"),o=t("mandatory"),i=t("./base");e.exports=function(t){var e=new r(t);return{findAll:e.findAll.bind(e),findById:e.findById.bind(e)}},n.inherits(r,i),r.prototype.findAll=function(t){function e(e,n){return e?t(r.$createError(e,"failed to find all organizations.")):void t(null,n)}var r;o(t).is("function","OrganizationService: findAll - Please define a proper callback function."),r=this,this.$fireGET("/organizations",e)},r.prototype.findById=function(t,e){function r(r,o){return r?e(n.$createError(r,'failed to find the organization with the id "%s"',t)):void e(null,o)}var n;o(t).is("string","OrganizationService: findById - Please define a proper organization id."),o(e).is("function","OrganizationService: findById - Please define a proper callback function."),n=this,this.$fireGET("/organization/"+t,r)}},{"./base":3,mandatory:13,util:11}],6:[function(t,e){"use strict";function r(t){i.call(this,t)}var n=t("util"),o=t("mandatory"),i=t("./base");e.exports=function(t){var e=new r(t);return{findAll:e.findAll.bind(e),findById:e.findById.bind(e)}},n.inherits(r,i),r.prototype.findAll=function(t){function e(e,n){return e?t(r.$createError(e,"failed to find all persons.")):void t(null,n)}var r;o(t).is("function","PersonService: findAll - Please define a proper callback function."),r=this,this.$fireGET("/persons",e)},r.prototype.findById=function(t,e){function r(r,o){return r?e(n.$createError(r,"failed to find the person with the id: %s.",t)):void e(null,o)}var n;o(t).is("string","PersonService: findById - Please define a person id."),o(e).is("function","PersonService: findById - Please define a proper callback function."),n=this,this.$fireGET("/persons/"+t,r)}},{"./base":3,mandatory:13,util:11}],7:[function(t,e){function r(t,e){return p.isUndefined(e)?""+e:p.isNumber(e)&&!isFinite(e)?e.toString():p.isFunction(e)||p.isRegExp(e)?e.toString():e}function n(t,e){return p.isString(t)?t.length<e?t:t.slice(0,e):t}function o(t){return n(JSON.stringify(t.actual,r),128)+" "+t.operator+" "+n(JSON.stringify(t.expected,r),128)}function i(t,e,r,n,o){throw new y.AssertionError({message:r,actual:t,expected:e,operator:n,stackStartFunction:o})}function s(t,e){t||i(t,!0,e,"==",y.ok)}function a(t,e){if(t===e)return!0;if(p.isBuffer(t)&&p.isBuffer(e)){if(t.length!=e.length)return!1;for(var r=0;r<t.length;r++)if(t[r]!==e[r])return!1;return!0}return p.isDate(t)&&p.isDate(e)?t.getTime()===e.getTime():p.isRegExp(t)&&p.isRegExp(e)?t.source===e.source&&t.global===e.global&&t.multiline===e.multiline&&t.lastIndex===e.lastIndex&&t.ignoreCase===e.ignoreCase:p.isObject(t)||p.isObject(e)?c(t,e):t==e}function u(t){return"[object Arguments]"==Object.prototype.toString.call(t)}function c(t,e){if(p.isNullOrUndefined(t)||p.isNullOrUndefined(e))return!1;if(t.prototype!==e.prototype)return!1;if(p.isPrimitive(t)||p.isPrimitive(e))return t===e;var r=u(t),n=u(e);if(r&&!n||!r&&n)return!1;if(r)return t=h.call(t),e=h.call(e),a(t,e);var o,i,s=g(t),c=g(e);if(s.length!=c.length)return!1;for(s.sort(),c.sort(),i=s.length-1;i>=0;i--)if(s[i]!=c[i])return!1;for(i=s.length-1;i>=0;i--)if(o=s[i],!a(t[o],e[o]))return!1;return!0}function l(t,e){return t&&e?"[object RegExp]"==Object.prototype.toString.call(e)?e.test(t):t instanceof e?!0:e.call({},t)===!0?!0:!1:!1}function f(t,e,r,n){var o;p.isString(r)&&(n=r,r=null);try{e()}catch(s){o=s}if(n=(r&&r.name?" ("+r.name+").":".")+(n?" "+n:"."),t&&!o&&i(o,r,"Missing expected exception"+n),!t&&l(o,r)&&i(o,r,"Got unwanted exception"+n),t&&o&&r&&!l(o,r)||!t&&o)throw o}var p=t("util/"),h=Array.prototype.slice,d=Object.prototype.hasOwnProperty,y=e.exports=s;y.AssertionError=function(t){this.name="AssertionError",this.actual=t.actual,this.expected=t.expected,this.operator=t.operator,t.message?(this.message=t.message,this.generatedMessage=!1):(this.message=o(this),this.generatedMessage=!0);var e=t.stackStartFunction||i;if(Error.captureStackTrace)Error.captureStackTrace(this,e);else{var r=new Error;if(r.stack){var n=r.stack,s=e.name,a=n.indexOf("\n"+s);if(a>=0){var u=n.indexOf("\n",a+1);n=n.substring(u+1)}this.stack=n}}},p.inherits(y.AssertionError,Error),y.fail=i,y.ok=s,y.equal=function(t,e,r){t!=e&&i(t,e,r,"==",y.equal)},y.notEqual=function(t,e,r){t==e&&i(t,e,r,"!=",y.notEqual)},y.deepEqual=function(t,e,r){a(t,e)||i(t,e,r,"deepEqual",y.deepEqual)},y.notDeepEqual=function(t,e,r){a(t,e)&&i(t,e,r,"notDeepEqual",y.notDeepEqual)},y.strictEqual=function(t,e,r){t!==e&&i(t,e,r,"===",y.strictEqual)},y.notStrictEqual=function(t,e,r){t===e&&i(t,e,r,"!==",y.notStrictEqual)},y["throws"]=function(){f.apply(this,[!0].concat(h.call(arguments)))},y.doesNotThrow=function(){f.apply(this,[!1].concat(h.call(arguments)))},y.ifError=function(t){if(t)throw t};var g=Object.keys||function(t){var e=[];for(var r in t)d.call(t,r)&&e.push(r);return e}},{"util/":11}],8:[function(t,e){e.exports="function"==typeof Object.create?function(t,e){t.super_=e,t.prototype=Object.create(e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}})}:function(t,e){t.super_=e;var r=function(){};r.prototype=e.prototype,t.prototype=new r,t.prototype.constructor=t}},{}],9:[function(t,e){function r(){if(!s){s=!0;for(var t,e=i.length;e;){t=i,i=[];for(var r=-1;++r<e;)t[r]();e=i.length}s=!1}}function n(){}var o=e.exports={},i=[],s=!1;o.nextTick=function(t){i.push(t),s||setTimeout(r,0)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.on=n,o.addListener=n,o.once=n,o.off=n,o.removeListener=n,o.removeAllListeners=n,o.emit=n,o.binding=function(){throw new Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(){throw new Error("process.chdir is not supported")},o.umask=function(){return 0}},{}],10:[function(t,e){e.exports=function(t){return t&&"object"==typeof t&&"function"==typeof t.copy&&"function"==typeof t.fill&&"function"==typeof t.readUInt8}},{}],11:[function(t,e,r){(function(e,n){function o(t,e){var n={seen:[],stylize:s};return arguments.length>=3&&(n.depth=arguments[2]),arguments.length>=4&&(n.colors=arguments[3]),y(e)?n.showHidden=e:e&&r._extend(n,e),E(n.showHidden)&&(n.showHidden=!1),E(n.depth)&&(n.depth=2),E(n.colors)&&(n.colors=!1),E(n.customInspect)&&(n.customInspect=!0),n.colors&&(n.stylize=i),u(n,t,n.depth)}function i(t,e){var r=o.styles[e];return r?"["+o.colors[r][0]+"m"+t+"["+o.colors[r][1]+"m":t}function s(t){return t}function a(t){var e={};return t.forEach(function(t){e[t]=!0}),e}function u(t,e,n){if(t.customInspect&&e&&S(e.inspect)&&e.inspect!==r.inspect&&(!e.constructor||e.constructor.prototype!==e)){var o=e.inspect(n,t);return b(o)||(o=u(t,o,n)),o}var i=c(t,e);if(i)return i;var s=Object.keys(e),y=a(s);if(t.showHidden&&(s=Object.getOwnPropertyNames(e)),O(e)&&(s.indexOf("message")>=0||s.indexOf("description")>=0))return l(e);if(0===s.length){if(S(e)){var g=e.name?": "+e.name:"";return t.stylize("[Function"+g+"]","special")}if(j(e))return t.stylize(RegExp.prototype.toString.call(e),"regexp");if(x(e))return t.stylize(Date.prototype.toString.call(e),"date");if(O(e))return l(e)}var m="",v=!1,w=["{","}"];if(d(e)&&(v=!0,w=["[","]"]),S(e)){var E=e.name?": "+e.name:"";m=" [Function"+E+"]"}if(j(e)&&(m=" "+RegExp.prototype.toString.call(e)),x(e)&&(m=" "+Date.prototype.toUTCString.call(e)),O(e)&&(m=" "+l(e)),0===s.length&&(!v||0==e.length))return w[0]+m+w[1];if(0>n)return j(e)?t.stylize(RegExp.prototype.toString.call(e),"regexp"):t.stylize("[Object]","special");t.seen.push(e);var _;return _=v?f(t,e,n,y,s):s.map(function(r){return p(t,e,n,y,r,v)}),t.seen.pop(),h(_,m,w)}function c(t,e){if(E(e))return t.stylize("undefined","undefined");if(b(e)){var r="'"+JSON.stringify(e).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'";return t.stylize(r,"string")}return v(e)?t.stylize(""+e,"number"):y(e)?t.stylize(""+e,"boolean"):g(e)?t.stylize("null","null"):void 0}function l(t){return"["+Error.prototype.toString.call(t)+"]"}function f(t,e,r,n,o){for(var i=[],s=0,a=e.length;a>s;++s)i.push(P(e,String(s))?p(t,e,r,n,String(s),!0):"");return o.forEach(function(o){o.match(/^\d+$/)||i.push(p(t,e,r,n,o,!0))}),i}function p(t,e,r,n,o,i){var s,a,c;if(c=Object.getOwnPropertyDescriptor(e,o)||{value:e[o]},c.get?a=c.set?t.stylize("[Getter/Setter]","special"):t.stylize("[Getter]","special"):c.set&&(a=t.stylize("[Setter]","special")),P(n,o)||(s="["+o+"]"),a||(t.seen.indexOf(c.value)<0?(a=g(r)?u(t,c.value,null):u(t,c.value,r-1),a.indexOf("\n")>-1&&(a=i?a.split("\n").map(function(t){return"  "+t}).join("\n").substr(2):"\n"+a.split("\n").map(function(t){return"   "+t}).join("\n"))):a=t.stylize("[Circular]","special")),E(s)){if(i&&o.match(/^\d+$/))return a;s=JSON.stringify(""+o),s.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)?(s=s.substr(1,s.length-2),s=t.stylize(s,"name")):(s=s.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'"),s=t.stylize(s,"string"))}return s+": "+a}function h(t,e,r){var n=0,o=t.reduce(function(t,e){return n++,e.indexOf("\n")>=0&&n++,t+e.replace(/\u001b\[\d\d?m/g,"").length+1},0);return o>60?r[0]+(""===e?"":e+"\n ")+" "+t.join(",\n  ")+" "+r[1]:r[0]+e+" "+t.join(", ")+" "+r[1]}function d(t){return Array.isArray(t)}function y(t){return"boolean"==typeof t}function g(t){return null===t}function m(t){return null==t}function v(t){return"number"==typeof t}function b(t){return"string"==typeof t}function w(t){return"symbol"==typeof t}function E(t){return void 0===t}function j(t){return _(t)&&"[object RegExp]"===A(t)}function _(t){return"object"==typeof t&&null!==t}function x(t){return _(t)&&"[object Date]"===A(t)}function O(t){return _(t)&&("[object Error]"===A(t)||t instanceof Error)}function S(t){return"function"==typeof t}function T(t){return null===t||"boolean"==typeof t||"number"==typeof t||"string"==typeof t||"symbol"==typeof t||"undefined"==typeof t}function A(t){return Object.prototype.toString.call(t)}function k(t){return 10>t?"0"+t.toString(10):t.toString(10)}function C(){var t=new Date,e=[k(t.getHours()),k(t.getMinutes()),k(t.getSeconds())].join(":");return[t.getDate(),z[t.getMonth()],e].join(" ")}function P(t,e){return Object.prototype.hasOwnProperty.call(t,e)}var q=/%[sdj%]/g;r.format=function(t){if(!b(t)){for(var e=[],r=0;r<arguments.length;r++)e.push(o(arguments[r]));return e.join(" ")}for(var r=1,n=arguments,i=n.length,s=String(t).replace(q,function(t){if("%%"===t)return"%";if(r>=i)return t;switch(t){case"%s":return String(n[r++]);case"%d":return Number(n[r++]);case"%j":try{return JSON.stringify(n[r++])}catch(e){return"[Circular]"}default:return t}}),a=n[r];i>r;a=n[++r])s+=g(a)||!_(a)?" "+a:" "+o(a);return s},r.deprecate=function(t,o){function i(){if(!s){if(e.throwDeprecation)throw new Error(o);e.traceDeprecation?console.trace(o):console.error(o),s=!0}return t.apply(this,arguments)}if(E(n.process))return function(){return r.deprecate(t,o).apply(this,arguments)};if(e.noDeprecation===!0)return t;var s=!1;return i};var D,N={};r.debuglog=function(t){if(E(D)&&(D=e.env.NODE_DEBUG||""),t=t.toUpperCase(),!N[t])if(new RegExp("\\b"+t+"\\b","i").test(D)){var n=e.pid;N[t]=function(){var e=r.format.apply(r,arguments);console.error("%s %d: %s",t,n,e)}}else N[t]=function(){};return N[t]},r.inspect=o,o.colors={bold:[1,22],italic:[3,23],underline:[4,24],inverse:[7,27],white:[37,39],grey:[90,39],black:[30,39],blue:[34,39],cyan:[36,39],green:[32,39],magenta:[35,39],red:[31,39],yellow:[33,39]},o.styles={special:"cyan",number:"yellow","boolean":"yellow",undefined:"grey","null":"bold",string:"green",date:"magenta",regexp:"red"},r.isArray=d,r.isBoolean=y,r.isNull=g,r.isNullOrUndefined=m,r.isNumber=v,r.isString=b,r.isSymbol=w,r.isUndefined=E,r.isRegExp=j,r.isObject=_,r.isDate=x,r.isError=O,r.isFunction=S,r.isPrimitive=T,r.isBuffer=t("./support/isBuffer");var z=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];r.log=function(){console.log("%s - %s",C(),r.format.apply(r,arguments))},r.inherits=t("inherits"),r._extend=function(t,e){if(!e||!_(e))return t;for(var r=Object.keys(e),n=r.length;n--;)t[r[n]]=e[r[n]];return t}}).call(this,t("_process"),"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./support/isBuffer":10,_process:9,inherits:8}],12:[function(e,r,n){(function(e){(function(){function o(t,e){function r(t){if(r[t]!==g)return r[t];var o;if("bug-string-char-index"==t)o="a"!="a"[0];else if("json"==t)o=r("json-stringify")&&r("json-parse");else{var s,a='{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';if("json-stringify"==t){var u=e.stringify,l="function"==typeof u&&b;if(l){(s=function(){return 1}).toJSON=s;try{l="0"===u(0)&&"0"===u(new n)&&'""'==u(new i)&&u(v)===g&&u(g)===g&&u()===g&&"1"===u(s)&&"[1]"==u([s])&&"[null]"==u([g])&&"null"==u(null)&&"[null,null,null]"==u([g,v,null])&&u({a:[s,!0,!1,null,"\x00\b\n\f\r	"]})==a&&"1"===u(null,s)&&"[\n 1,\n 2\n]"==u([1,2],null,1)&&'"-271821-04-20T00:00:00.000Z"'==u(new c(-864e13))&&'"+275760-09-13T00:00:00.000Z"'==u(new c(864e13))&&'"-000001-01-01T00:00:00.000Z"'==u(new c(-621987552e5))&&'"1969-12-31T23:59:59.999Z"'==u(new c(-1))}catch(f){l=!1}}o=l}if("json-parse"==t){var p=e.parse;if("function"==typeof p)try{if(0===p("0")&&!p(!1)){s=p(a);var h=5==s.a.length&&1===s.a[0];if(h){try{h=!p('"	"')}catch(f){}if(h)try{h=1!==p("01")}catch(f){}if(h)try{h=1!==p("1.")}catch(f){}}}}catch(f){h=!1}o=h}}return r[t]=!!o}t||(t=u.Object()),e||(e=u.Object());var n=t.Number||u.Number,i=t.String||u.String,a=t.Object||u.Object,c=t.Date||u.Date,l=t.SyntaxError||u.SyntaxError,f=t.TypeError||u.TypeError,p=t.Math||u.Math,h=t.JSON||u.JSON;"object"==typeof h&&h&&(e.stringify=h.stringify,e.parse=h.parse);var d,y,g,m=a.prototype,v=m.toString,b=new c(-0xc782b5b800cec);try{b=-109252==b.getUTCFullYear()&&0===b.getUTCMonth()&&1===b.getUTCDate()&&10==b.getUTCHours()&&37==b.getUTCMinutes()&&6==b.getUTCSeconds()&&708==b.getUTCMilliseconds()}catch(w){}if(!r("json")){var E="[object Function]",j="[object Date]",_="[object Number]",x="[object String]",O="[object Array]",S="[object Boolean]",T=r("bug-string-char-index");if(!b)var A=p.floor,k=[0,31,59,90,120,151,181,212,243,273,304,334],C=function(t,e){return k[e]+365*(t-1970)+A((t-1969+(e=+(e>1)))/4)-A((t-1901+e)/100)+A((t-1601+e)/400)};if((d=m.hasOwnProperty)||(d=function(t){var e,r={};return(r.__proto__=null,r.__proto__={toString:1},r).toString!=v?d=function(t){var e=this.__proto__,r=t in(this.__proto__=null,this);return this.__proto__=e,r}:(e=r.constructor,d=function(t){var r=(this.constructor||e).prototype;return t in this&&!(t in r&&this[t]===r[t])}),r=null,d.call(this,t)}),y=function(t,e){var r,n,o,i=0;(r=function(){this.valueOf=0}).prototype.valueOf=0,n=new r;for(o in n)d.call(n,o)&&i++;return r=n=null,i?y=2==i?function(t,e){var r,n={},o=v.call(t)==E;for(r in t)o&&"prototype"==r||d.call(n,r)||!(n[r]=1)||!d.call(t,r)||e(r)}:function(t,e){var r,n,o=v.call(t)==E;for(r in t)o&&"prototype"==r||!d.call(t,r)||(n="constructor"===r)||e(r);(n||d.call(t,r="constructor"))&&e(r)}:(n=["valueOf","toString","toLocaleString","propertyIsEnumerable","isPrototypeOf","hasOwnProperty","constructor"],y=function(t,e){var r,o,i=v.call(t)==E,a=!i&&"function"!=typeof t.constructor&&s[typeof t.hasOwnProperty]&&t.hasOwnProperty||d;for(r in t)i&&"prototype"==r||!a.call(t,r)||e(r);for(o=n.length;r=n[--o];a.call(t,r)&&e(r));}),y(t,e)},!r("json-stringify")){var P={92:"\\\\",34:'\\"',8:"\\b",12:"\\f",10:"\\n",13:"\\r",9:"\\t"},q="000000",D=function(t,e){return(q+(e||0)).slice(-t)},N="\\u00",z=function(t){for(var e='"',r=0,n=t.length,o=!T||n>10,i=o&&(T?t.split(""):t);n>r;r++){var s=t.charCodeAt(r);switch(s){case 8:case 9:case 10:case 12:case 13:case 34:case 92:e+=P[s];break;default:if(32>s){e+=N+D(2,s.toString(16));break}e+=o?i[r]:t.charAt(r)}}return e+'"'},U=function(t,e,r,n,o,i,s){var a,u,c,l,p,h,m,b,w,E,T,k,P,q,N,$;try{a=e[t]}catch(H){}if("object"==typeof a&&a)if(u=v.call(a),u!=j||d.call(a,"toJSON"))"function"==typeof a.toJSON&&(u!=_&&u!=x&&u!=O||d.call(a,"toJSON"))&&(a=a.toJSON(t));else if(a>-1/0&&1/0>a){if(C){for(p=A(a/864e5),c=A(p/365.2425)+1970-1;C(c+1,0)<=p;c++);for(l=A((p-C(c,0))/30.42);C(c,l+1)<=p;l++);p=1+p-C(c,l),h=(a%864e5+864e5)%864e5,m=A(h/36e5)%24,b=A(h/6e4)%60,w=A(h/1e3)%60,E=h%1e3}else c=a.getUTCFullYear(),l=a.getUTCMonth(),p=a.getUTCDate(),m=a.getUTCHours(),b=a.getUTCMinutes(),w=a.getUTCSeconds(),E=a.getUTCMilliseconds();a=(0>=c||c>=1e4?(0>c?"-":"+")+D(6,0>c?-c:c):D(4,c))+"-"+D(2,l+1)+"-"+D(2,p)+"T"+D(2,m)+":"+D(2,b)+":"+D(2,w)+"."+D(3,E)+"Z"}else a=null;if(r&&(a=r.call(e,t,a)),null===a)return"null";if(u=v.call(a),u==S)return""+a;if(u==_)return a>-1/0&&1/0>a?""+a:"null";if(u==x)return z(""+a);if("object"==typeof a){for(q=s.length;q--;)if(s[q]===a)throw f();if(s.push(a),T=[],N=i,i+=o,u==O){for(P=0,q=a.length;q>P;P++)k=U(P,a,r,n,o,i,s),T.push(k===g?"null":k);$=T.length?o?"[\n"+i+T.join(",\n"+i)+"\n"+N+"]":"["+T.join(",")+"]":"[]"}else y(n||a,function(t){var e=U(t,a,r,n,o,i,s);e!==g&&T.push(z(t)+":"+(o?" ":"")+e)}),$=T.length?o?"{\n"+i+T.join(",\n"+i)+"\n"+N+"}":"{"+T.join(",")+"}":"{}";return s.pop(),$}};e.stringify=function(t,e,r){var n,o,i,a;if(s[typeof e]&&e)if((a=v.call(e))==E)o=e;else if(a==O){i={};for(var u,c=0,l=e.length;l>c;u=e[c++],a=v.call(u),(a==x||a==_)&&(i[u]=1));}if(r)if((a=v.call(r))==_){if((r-=r%1)>0)for(n="",r>10&&(r=10);n.length<r;n+=" ");}else a==x&&(n=r.length<=10?r:r.slice(0,10));return U("",(u={},u[""]=t,u),o,i,n,"",[])}}if(!r("json-parse")){var $,H,I=i.fromCharCode,M={92:"\\",34:'"',47:"/",98:"\b",116:"	",110:"\n",102:"\f",114:"\r"},L=function(){throw $=H=null,l()},J=function(){for(var t,e,r,n,o,i=H,s=i.length;s>$;)switch(o=i.charCodeAt($)){case 9:case 10:case 13:case 32:$++;break;case 123:case 125:case 91:case 93:case 58:case 44:return t=T?i.charAt($):i[$],$++,t;case 34:for(t="@",$++;s>$;)if(o=i.charCodeAt($),32>o)L();else if(92==o)switch(o=i.charCodeAt(++$)){case 92:case 34:case 47:case 98:case 116:case 110:case 102:case 114:t+=M[o],$++;break;case 117:for(e=++$,r=$+4;r>$;$++)o=i.charCodeAt($),o>=48&&57>=o||o>=97&&102>=o||o>=65&&70>=o||L();t+=I("0x"+i.slice(e,$));break;default:L()}else{if(34==o)break;for(o=i.charCodeAt($),e=$;o>=32&&92!=o&&34!=o;)o=i.charCodeAt(++$);t+=i.slice(e,$)}if(34==i.charCodeAt($))return $++,t;L();default:if(e=$,45==o&&(n=!0,o=i.charCodeAt(++$)),o>=48&&57>=o){for(48==o&&(o=i.charCodeAt($+1),o>=48&&57>=o)&&L(),n=!1;s>$&&(o=i.charCodeAt($),o>=48&&57>=o);$++);if(46==i.charCodeAt($)){for(r=++$;s>r&&(o=i.charCodeAt(r),o>=48&&57>=o);r++);r==$&&L(),$=r}if(o=i.charCodeAt($),101==o||69==o){for(o=i.charCodeAt(++$),(43==o||45==o)&&$++,r=$;s>r&&(o=i.charCodeAt(r),o>=48&&57>=o);r++);r==$&&L(),$=r}return+i.slice(e,$)}if(n&&L(),"true"==i.slice($,$+4))return $+=4,!0;if("false"==i.slice($,$+5))return $+=5,!1;if("null"==i.slice($,$+4))return $+=4,null;L()}return"$"},R=function(t){var e,r;if("$"==t&&L(),"string"==typeof t){if("@"==(T?t.charAt(0):t[0]))return t.slice(1);if("["==t){for(e=[];t=J(),"]"!=t;r||(r=!0))r&&(","==t?(t=J(),"]"==t&&L()):L()),","==t&&L(),e.push(R(t));return e}if("{"==t){for(e={};t=J(),"}"!=t;r||(r=!0))r&&(","==t?(t=J(),"}"==t&&L()):L()),(","==t||"string"!=typeof t||"@"!=(T?t.charAt(0):t[0])||":"!=J())&&L(),e[t.slice(1)]=R(J());return e}L()}return t},B=function(t,e,r){var n=F(t,e,r);n===g?delete t[e]:t[e]=n},F=function(t,e,r){var n,o=t[e];if("object"==typeof o&&o)if(v.call(o)==O)for(n=o.length;n--;)B(o,n,r);else y(o,function(t){B(o,t,r)});return r.call(t,e,o)};e.parse=function(t,e){var r,n;return $=0,H=""+t,r=R(J()),"$"!=J()&&L(),$=H=null,e&&v.call(e)==E?F((n={},n[""]=r,n),"",e):r}}}return e.runInContext=o,e}var i="function"==typeof t&&t.amd,s={"function":!0,object:!0},a=s[typeof n]&&n&&!n.nodeType&&n,u=s[typeof window]&&window||this,c=a&&s[typeof r]&&r&&!r.nodeType&&"object"==typeof e&&e;if(!c||c.global!==c&&c.window!==c&&c.self!==c||(u=c),a&&!i)o(u,a);else{var l=u.JSON,f=u.JSON3,p=!1,h=o(u,u.JSON3={noConflict:function(){return p||(p=!0,u.JSON=l,u.JSON3=f,l=f=null),h}});u.JSON={parse:h.parse,stringify:h.stringify}}i&&t(function(){return h})}).call(this)}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],13:[function(t,e){"use strict";var r=t("assert"),n=t("util");e.exports=function(t){var e=typeof t;return e="object"===e&&n.isArray(t)?"array":e,{is:function(o,i){switch(o=o.toLowerCase(),i=i||'Expected "'+o+'", but received "'+e+'".',o){case"object":r.equal("object"===e&&!n.isArray(t),!0,i);break;case"array":r.equal(n.isArray(t),!0,i);break;default:r.equal(e,o,i)}}}}},{assert:7,util:11}],14:[function(t,e){function r(){}function n(t){var e={}.toString.call(t);switch(e){case"[object File]":case"[object Blob]":case"[object FormData]":return!0;default:return!1}}function o(){if(g.XMLHttpRequest&&("file:"!=g.location.protocol||!g.ActiveXObject))return new XMLHttpRequest;try{return new ActiveXObject("Microsoft.XMLHTTP")}catch(t){}try{return new ActiveXObject("Msxml2.XMLHTTP.6.0")}catch(t){}try{return new ActiveXObject("Msxml2.XMLHTTP.3.0")}catch(t){}try{return new ActiveXObject("Msxml2.XMLHTTP")}catch(t){}return!1}function i(t){return t===Object(t)}function s(t){if(!i(t))return t;var e=[];for(var r in t)null!=t[r]&&e.push(encodeURIComponent(r)+"="+encodeURIComponent(t[r]));return e.join("&")}function a(t){for(var e,r,n={},o=t.split("&"),i=0,s=o.length;s>i;++i)r=o[i],e=r.split("="),n[decodeURIComponent(e[0])]=decodeURIComponent(e[1]);return n}function u(t){var e,r,n,o,i=t.split(/\r?\n/),s={};i.pop();for(var a=0,u=i.length;u>a;++a)r=i[a],e=r.indexOf(":"),n=r.slice(0,e).toLowerCase(),o=m(r.slice(e+1)),s[n]=o;return s}function c(t){return t.split(/ *; */).shift()}function l(t){return y(t.split(/ *; */),function(t,e){var r=e.split(/ *= */),n=r.shift(),o=r.shift();return n&&o&&(t[n]=o),t},{})}function f(t,e){e=e||{},this.req=t,this.xhr=this.req.xhr,this.text="HEAD"!=this.req.method?this.xhr.responseText:null,this.setStatusProperties(this.xhr.status),this.header=this.headers=u(this.xhr.getAllResponseHeaders()),this.header["content-type"]=this.xhr.getResponseHeader("content-type"),this.setHeaderProperties(this.header),this.body="HEAD"!=this.req.method?this.parseBody(this.text):null}function p(t,e){var r=this;d.call(this),this._query=this._query||[],this.method=t,this.url=e,this.header={},this._header={},this.on("end",function(){var t=null,e=null;try{e=new f(r)}catch(n){t=new Error("Parser is unable to parse the response"),t.parse=!0,t.original=n}r.callback(t,e)})}function h(t,e){return"function"==typeof e?new p("GET",t).end(e):1==arguments.length?new p("GET",t):new p(t,e)}var d=t("emitter"),y=t("reduce"),g="undefined"==typeof window?this:window,m="".trim?function(t){return t.trim()}:function(t){return t.replace(/(^\s*|\s*$)/g,"")};h.serializeObject=s,h.parseString=a,h.types={html:"text/html",json:"application/json",xml:"application/xml",urlencoded:"application/x-www-form-urlencoded",form:"application/x-www-form-urlencoded","form-data":"application/x-www-form-urlencoded"},h.serialize={"application/x-www-form-urlencoded":s,"application/json":JSON.stringify},h.parse={"application/x-www-form-urlencoded":a,"application/json":JSON.parse},f.prototype.get=function(t){return this.header[t.toLowerCase()]},f.prototype.setHeaderProperties=function(){var t=this.header["content-type"]||"";this.type=c(t);var e=l(t);for(var r in e)this[r]=e[r]},f.prototype.parseBody=function(t){var e=h.parse[this.type];return e&&t&&t.length?e(t):null},f.prototype.setStatusProperties=function(t){var e=t/100|0;this.status=t,this.statusType=e,this.info=1==e,this.ok=2==e,this.clientError=4==e,this.serverError=5==e,this.error=4==e||5==e?this.toError():!1,this.accepted=202==t,this.noContent=204==t||1223==t,this.badRequest=400==t,this.unauthorized=401==t,this.notAcceptable=406==t,this.notFound=404==t,this.forbidden=403==t},f.prototype.toError=function(){var t=this.req,e=t.method,r=t.url,n="cannot "+e+" "+r+" ("+this.status+")",o=new Error(n);return o.status=this.status,o.method=e,o.url=r,o},h.Response=f,d(p.prototype),p.prototype.use=function(t){return t(this),this},p.prototype.timeout=function(t){return this._timeout=t,this},p.prototype.clearTimeout=function(){return this._timeout=0,clearTimeout(this._timer),this},p.prototype.abort=function(){return this.aborted?void 0:(this.aborted=!0,this.xhr.abort(),this.clearTimeout(),this.emit("abort"),this)},p.prototype.set=function(t,e){if(i(t)){for(var r in t)this.set(r,t[r]);return this}return this._header[t.toLowerCase()]=e,this.header[t]=e,this},p.prototype.unset=function(t){return delete this._header[t.toLowerCase()],delete this.header[t],this},p.prototype.getHeader=function(t){return this._header[t.toLowerCase()]},p.prototype.type=function(t){return this.set("Content-Type",h.types[t]||t),this},p.prototype.accept=function(t){return this.set("Accept",h.types[t]||t),this},p.prototype.auth=function(t,e){var r=btoa(t+":"+e);return this.set("Authorization","Basic "+r),this},p.prototype.query=function(t){return"string"!=typeof t&&(t=s(t)),t&&this._query.push(t),this},p.prototype.field=function(t,e){return this._formData||(this._formData=new FormData),this._formData.append(t,e),this},p.prototype.attach=function(t,e,r){return this._formData||(this._formData=new FormData),this._formData.append(t,e,r),this},p.prototype.send=function(t){var e=i(t),r=this.getHeader("Content-Type");if(e&&i(this._data))for(var n in t)this._data[n]=t[n];else"string"==typeof t?(r||this.type("form"),r=this.getHeader("Content-Type"),this._data="application/x-www-form-urlencoded"==r?this._data?this._data+"&"+t:t:(this._data||"")+t):this._data=t;return e?(r||this.type("json"),this):this},p.prototype.callback=function(t,e){var r=this._callback;return this.clearTimeout(),2==r.length?r(t,e):t?this.emit("error",t):void r(e)},p.prototype.crossDomainError=function(){var t=new Error("Origin is not allowed by Access-Control-Allow-Origin");t.crossDomain=!0,this.callback(t)},p.prototype.timeoutError=function(){var t=this._timeout,e=new Error("timeout of "+t+"ms exceeded");e.timeout=t,this.callback(e)},p.prototype.withCredentials=function(){return this._withCredentials=!0,this},p.prototype.end=function(t){var e=this,i=this.xhr=o(),s=this._query.join("&"),a=this._timeout,u=this._formData||this._data;if(this._callback=t||r,i.onreadystatechange=function(){return 4==i.readyState?0==i.status?e.aborted?e.timeoutError():e.crossDomainError():void e.emit("end"):void 0},i.upload&&(i.upload.onprogress=function(t){t.percent=t.loaded/t.total*100,e.emit("progress",t)}),a&&!this._timer&&(this._timer=setTimeout(function(){e.abort()},a)),s&&(s=h.serializeObject(s),this.url+=~this.url.indexOf("?")?"&"+s:"?"+s),i.open(this.method,this.url,!0),this._withCredentials&&(i.withCredentials=!0),"GET"!=this.method&&"HEAD"!=this.method&&"string"!=typeof u&&!n(u)){var c=h.serialize[this.getHeader("Content-Type")];c&&(u=c(u))}for(var l in this.header)null!=this.header[l]&&i.setRequestHeader(l,this.header[l]);return this.emit("request",this),i.send(u),this},h.Request=p,h.get=function(t,e,r){var n=h("GET",t);return"function"==typeof e&&(r=e,e=null),e&&n.query(e),r&&n.end(r),n},h.head=function(t,e,r){var n=h("HEAD",t);return"function"==typeof e&&(r=e,e=null),e&&n.send(e),r&&n.end(r),n},h.del=function(t,e){var r=h("DELETE",t);return e&&r.end(e),r},h.patch=function(t,e,r){var n=h("PATCH",t);return"function"==typeof e&&(r=e,e=null),e&&n.send(e),r&&n.end(r),n},h.post=function(t,e,r){var n=h("POST",t);return"function"==typeof e&&(r=e,e=null),e&&n.send(e),r&&n.end(r),n},h.put=function(t,e,r){var n=h("PUT",t);return"function"==typeof e&&(r=e,e=null),e&&n.send(e),r&&n.end(r),n},e.exports=h},{emitter:15,reduce:16}],15:[function(t,e){function r(t){return t?n(t):void 0}function n(t){for(var e in r.prototype)t[e]=r.prototype[e];return t}e.exports=r,r.prototype.on=r.prototype.addEventListener=function(t,e){return this._callbacks=this._callbacks||{},(this._callbacks[t]=this._callbacks[t]||[]).push(e),this},r.prototype.once=function(t,e){function r(){n.off(t,r),e.apply(this,arguments)}var n=this;return this._callbacks=this._callbacks||{},r.fn=e,this.on(t,r),this},r.prototype.off=r.prototype.removeListener=r.prototype.removeAllListeners=r.prototype.removeEventListener=function(t,e){if(this._callbacks=this._callbacks||{},0==arguments.length)return this._callbacks={},this;var r=this._callbacks[t];if(!r)return this;if(1==arguments.length)return delete this._callbacks[t],this;for(var n,o=0;o<r.length;o++)if(n=r[o],n===e||n.fn===e){r.splice(o,1);break}return this},r.prototype.emit=function(t){this._callbacks=this._callbacks||{};var e=[].slice.call(arguments,1),r=this._callbacks[t];if(r){r=r.slice(0);for(var n=0,o=r.length;o>n;++n)r[n].apply(this,e)}return this},r.prototype.listeners=function(t){return this._callbacks=this._callbacks||{},this._callbacks[t]||[]},r.prototype.hasListeners=function(t){return!!this.listeners(t).length}},{}],16:[function(t,e){e.exports=function(t,e,r){for(var n=0,o=t.length,i=3==arguments.length?r:t[n++];o>n;)i=e.call(null,i,t[n],++n,t);
return i}},{}],17:[function(t,e){function r(t){var e,n,o,i,s;return this instanceof r?(t instanceof Error||"object"==typeof t?e=Array.prototype.slice.call(arguments,1):(e=Array.prototype.slice.call(arguments,0),t=void 0),t&&t.strict||(e=e.map(function(t){return null===t?"null":void 0===t?"undefined":t})),s=e.length>0?u.sprintf.apply(null,e):"",this.jse_shortmsg=s,this.jse_summary=s,t&&(o=t.cause,o&&t.cause instanceof Error||(o=t),o&&o instanceof Error&&(this.jse_cause=o,this.jse_summary+=": "+o.message)),this.message=this.jse_summary,Error.call(this,this.jse_summary),Error.captureStackTrace&&(i=t?t.constructorOpt:void 0,i=i||arguments.callee,Error.captureStackTrace(this,i)),this):(e=Array.prototype.slice.call(arguments,0),n=Object.create(r.prototype),r.apply(n,arguments),n)}function n(){var t,e,o,i;if(e={},e.constructorOpt=n,arguments[0]instanceof Error)e.cause=arguments[0],t=Array.prototype.slice.call(arguments,1);else if("object"==typeof arguments[0]){for(o in arguments[0])e[o]=arguments[0][o];t=Array.prototype.slice.call(arguments,1)}else t=Array.prototype.slice.call(arguments,0);e.strict=!0,i=[e].concat(t),r.apply(this,i)}function o(t){s.ok(t.length>0),this.ase_errors=t,r.call(this,t[0],"first of %d error%s",t.length,1==t.length?"":"s")}function i(t){Error.call(this);var e,r,n;"object"==typeof t?e=Array.prototype.slice.call(arguments,1):(e=Array.prototype.slice.call(arguments,0),t=void 0),this.message=e.length>0?u.sprintf.apply(null,e):"",t&&(t instanceof Error?r=t:(r=t.cause,n=t.constructorOpt)),Error.captureStackTrace(this,n||this.constructor),r&&this.cause(r)}var s=t("assert"),a=t("util"),u=t("extsprintf");e.exports=r,r.VError=r,r.SError=n,r.WError=i,r.MultiError=o,a.inherits(r,Error),r.prototype.name="VError",r.prototype.toString=function(){var t=this.hasOwnProperty("name")&&this.name||this.constructor.name||this.constructor.prototype.name;return this.message&&(t+=": "+this.message),t},r.prototype.cause=function(){return this.jse_cause},a.inherits(n,r),a.inherits(o,r),a.inherits(i,Error),i.prototype.name="WError",i.prototype.toString=function(){var t=this.hasOwnProperty("name")&&this.name||this.constructor.name||this.constructor.prototype.name;return this.message&&(t+=": "+this.message),this.we_cause&&this.we_cause.message&&(t+="; caused by "+this.we_cause.toString()),t},i.prototype.cause=function(t){return t instanceof Error&&(this.we_cause=t),this.we_cause}},{assert:7,extsprintf:18,util:11}],18:[function(t,e,r){(function(e){function n(t){var e,r,n,o,c,l,f,p,h,d=["([^%]*)","%","(['\\-+ #0]*?)","([1-9]\\d*)?","(\\.([1-9]\\d*))?","[lhjztL]*?","([diouxXfFeEgGaAcCsSp%jr])"].join(""),y=new RegExp(d),g=Array.prototype.slice.call(arguments,1),m="",v=1;for(a.equal("string",typeof t);null!==(h=y.exec(t));)if(m+=h[1],t=t.substring(h[0].length),e=h[2]||"",r=h[3]||0,n=h[4]||"",o=h[6],c=!1,f=!1,l=" ","%"!=o){if(0===g.length)throw new Error("too few args to sprintf");if(p=g.shift(),v++,e.match(/[\' #]/))throw new Error("unsupported flags: "+e);if(n.length>0)throw new Error("non-zero precision not supported");switch(e.match(/-/)&&(c=!0),e.match(/0/)&&(l="0"),e.match(/\+/)&&(f=!0),o){case"s":if(void 0===p||null===p)throw new Error("argument "+v+": attempted to print undefined or null as a string");m+=i(l,r,c,p.toString());break;case"d":p=Math.floor(p);case"f":f=f&&p>0?"+":"",m+=f+i(l,r,c,p.toString());break;case"x":m+=i(l,r,c,p.toString(16));break;case"j":0===r&&(r=10),m+=u.inspect(p,!1,r);break;case"r":m+=s(p);break;default:throw new Error("unsupported conversion: "+o)}}else m+="%";return m+=t}function o(){e.stdout.write(n.apply(this,arguments))}function i(t,e,r,n){for(var o=n;o.length<e;)r?o+=t:o=t+o;return o}function s(t){var e;if(!(t instanceof Error))throw new Error(n("invalid type for %%r: %j",t));if(e="EXCEPTION: "+t.constructor.name+": "+t.stack,t.cause&&"function"==typeof t.cause){var r=t.cause();r&&(e+="\nCaused by: "+s(r))}return e}var a=t("assert"),u=t("util");r.sprintf=n,r.printf=o}).call(this,t("_process"))},{_process:9,assert:7,util:11}]},{},[1])(1)});