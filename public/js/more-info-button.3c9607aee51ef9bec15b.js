"use strict";(self.webpackChunklinkspace=self.webpackChunklinkspace||[]).push([[683],{66303:(t,o,n)=>{n.r(o),n.d(o,{MoreInfoButton:()=>a});n(25728),n(60228),n(69373),n(59903),n(59749),n(86544),n(79288),n(84254),n(752),n(21694),n(76265);var e=n(19755);function r(t){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},r(t)}function i(t,o){for(var n=0;n<o.length;n++){var e=o[n];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(t,(i=e.key,a=void 0,a=function(t,o){if("object"!==r(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var e=n.call(t,o||"default");if("object"!==r(e))return e;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===o?String:Number)(t)}(i,"string"),"symbol"===r(a)?a:String(a)),e)}var i,a}var a=function(){function t(o){!function(t,o){if(!(t instanceof o))throw new TypeError("Cannot call a class as a function")}(this,t),this.initButton(o)}var o,n,r;return o=t,(n=[{key:"initButton",value:function(t){var o=this;e(t).on("click",(function(t){o.handleClickMoreInfo(t)}))}},{key:"handleClickMoreInfo",value:function(t){var o=e(t.target).closest(".btn"),n=o.data("record-id"),r=o.data("target"),i=e(document).find(r);i.find(".modal-title").text("Record ID: ".concat(n)),i.find(".modal-body").text("Loading..."),i.find(".modal-body").load("/record_body/"+n),i.one("show.bs.modal",(function(t){t.isDefaultPrevented()||i.one("hidden.bs.modal",(function(){o.is(":visible")&&o.trigger("focus")}))})),i.one("keyup",(function(t){27==t.keyCode&&t.stopPropagation()}))}}])&&i(o.prototype,n),r&&i(o,r),Object.defineProperty(o,"prototype",{writable:!1}),t}()}}]);