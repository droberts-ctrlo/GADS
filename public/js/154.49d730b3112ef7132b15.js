"use strict";(self.webpackChunklinkspace=self.webpackChunklinkspace||[]).push([[154],{17154:(t,e,n)=>{n.r(e),n.d(e,{default:()=>b});n(50886),n(25728),n(60228),n(34338),n(6203),n(752),n(73964),n(21694),n(76265),n(88052),n(76034),n(30050),n(69373),n(59903),n(59749),n(86544),n(79288),n(84254);var a=n(38042),i=n(39627),o=(n(12826),function(){var t=function(){return(65536*(1+Math.random())|0).toString(16).substring(1)};return t()+t()+"-"+t()+"-"+t()+"-"+t()+"-"+t()+t()+t()}),r=n(53865),l=n(22092),c=n(19755),d=n(19755);function u(t){return u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},u(t)}function s(t,e){for(var n=0;n<e.length;n++){var a=e[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,(i=a.key,o=void 0,o=function(t,e){if("object"!==u(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var a=n.call(t,e||"default");if("object"!==u(a))return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}(i,"string"),"symbol"===u(o)?o:String(o)),a)}var i,o}function f(t,e){return f=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},f(t,e)}function p(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,a=v(t);if(e){var i=v(this).constructor;n=Reflect.construct(a,arguments,i)}else n=a.apply(this,arguments);return function(t,e){if(e&&("object"===u(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(this,n)}}function v(t){return v=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},v(t)}const b=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&f(t,e)}(b,t);var e,a,u,v=p(b);function b(t){var e;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,b),(e=v.call(this,t)).context=void 0,e.wasInitialized||e.initCurvalModal(),e}return e=b,u=[{key:"allowReinitialization",get:function(){return!0}}],(a=[{key:"initCurvalModal",value:function(){this.setupModal(),this.setupSubmit()}},{key:"curvalModalValidationSucceeded",value:function(t,e){var a=t.serialize(),l=t.data("modal-field-ids"),u=t.data("curval-id"),s=t.data("instance-name"),f=t.data("guid"),p=c("<input>").attr({type:"hidden",name:"field"+u,value:a}),v=c("div[data-column-id="+u+"]");if("noshow"===v.data("value-selector")){var b=c('<tr class="table-curval-item">',this.context);d.map(l,(function(n){var a=t.find('[data-column-id="'+n+'"]'),o=(0,i.W)(a);o=e["field"+n],o=c("<div />",this.context).text(o).html(),b.append(c('<td class="curval-inner-text">',this.context).append(o))}));var m=c('<td>\n          <button type="button" class="btn btn-small btn-link btn-js-curval-modal" data-toggle="modal" data-target="#curvalModal" data-layout-id="'.concat(u,'" data-instance-name="').concat(s,'">\n            <span class="btn__title">Edit</span>\n          </button>\n          </td>'),this.context),h=c('<td>\n          <button type="button" class="btn btn-small btn-delete btn-js-curval-remove">\n            <span class="btn__title">Remove</span>\n          </button>\n        </td>',this.context);b.append(m.append(p)).append(h),(0,r.ez)(b[0]),f?c('input[data-guid="'+f+'"]',this.context).val(a).closest(".table-curval-item").replaceWith(b):(c("#curval_list_".concat(u)).find("tbody").prepend(b),c("#curval_list_".concat(u)).find(".dataTables_empty").hide())}else{var y=v.find(".select-widget").first(),g=y.hasClass("multi"),w=y.hasClass("select-widget--required"),_=v.find(".current"),k=_.find("[data-list-item]"),S=_.find(".search"),x=v.find(".available");g||(k.attr("hidden",""),x.find("li input").prop("checked",!1));var j=d.map(l,(function(t){var n=e["field"+t];return c("<div />").text(n).html()})).join(", ");f=o();var C="field".concat(u,"_").concat(f),O=g?'<button class="close select-widget-value__delete" aria-hidden="true" aria-label="delete" title="delete" tabindex="-1">&times;</button>':"";S.before('<li data-list-item="'.concat(C,'"><span class="widget-value__value">').concat(j,"</span>").concat(O,"</li>")).before(" ");var M=g?"checkbox":"radio",P=w?'required="required" aria-required="true" aria-errormessage="'.concat(y.attr("id"),'-err"'):"";x.append('<li class="answer" role="option">\n        <div class="control">\n          <div class="'.concat(g?"checkbox":"radio-group__option",'">\n            <input ').concat(P,' id="').concat(C,'" name="field').concat(u,'" type="').concat(M,'" value="').concat(a,'" class="').concat(g?"":"radio-group__input",'" checked aria-labelledby="').concat(C,'_label">\n            <label id="').concat(C,'_label" for="').concat(C,'" class="').concat(g?"":"radio-group__label",'">\n              <span>').concat(j,'</span>\n            </label>\n          </div>\n        </div>\n        <div class="details">\n          <button type="button" class="btn btn-small btn-danger btn-js-curval-remove">\n            <span class="btn__title">Remove</span>\n          </button>\n        </div>\n      </li>')),this.updateWidgetState(y,g,w),(0,r.ez)(v[0]),n.e(591).then(n.bind(n,21330)).then((function(t){new(0,t.default)(y[0])}))}c(this.element).modal("hide")}},{key:"updateWidgetState",value:function(t,e,n){var a=t.find(".current"),i=a.children("[data-list-item]:not([hidden])");a.toggleClass("empty",0===i.length),n&&(e?(0,l.TW)(t):(0,l.A_)(t))}},{key:"curvalModalValidationFailed",value:function(t,e){t.find(".alert").text(e).removeAttr("hidden"),t.parents(".modal-content").get(0).scrollIntoView(),t.find("button[type=submit]").prop("disabled",!1)}},{key:"setupModal",value:function(){var t=this;this.el.on("show.bs.modal",(function(e){var n,a=e.relatedTarget,i=c(a).data("layout-id"),l=c(a).data("instance-name"),d=c(a).data("current-id"),u=c(a).closest(".table-curval-item").find("input[name=field".concat(i,"]")),s=u.val(),f=u.length?"edit":"add",p=c(a).closest(".form-group");p.find(".table-curval-group").length?t.context=p.find(".table-curval-group"):p.find(".select-widget").length&&(t.context=p.find(".select-widget")),"edit"===f&&((n=u.data("guid"))||(n=o(),u.attr("data-guid",n)));var v=c(t.element);v.find(".modal-body").text("Loading...");var b=d?"/record/".concat(d):"/".concat(l,"/record/");v.find(".modal-body").load(t.getURL(b,i,s,p),(function(){"edit"===f&&v.find("form").data("guid",n),(0,r.ez)(this.element)})),v.on("focus",".datepicker",(function(){c(this).datepicker({format:v.attr("data-dateformat-datepicker"),autoclose:!0})})),v.off("hide.bs.modal").on("hide.bs.modal",(function(){return confirm("Closing this dialogue will cancel any work. Are you sure you want to do so?")}))}))}},{key:"getURL",value:function(t,e,n,a){return window.siteConfig&&window.siteConfig.urls.curvalTableForm&&window.siteConfig.urls.curvalSelectWidgetForm?"noshow"===a.data("value-selector")?window.siteConfig.urls.curvalTableForm:window.siteConfig.urls.curvalSelectWidgetForm:"".concat(t,"?include_draft&modal=").concat(e,"&").concat(n)}},{key:"setupSubmit",value:function(){c(this.element).on("submit",".curval-edit-form",(function(t){this.el.off("hide.bs.modal"),t.preventDefault();var e=c(this),n=e.serialize();e.addClass("edit-form--validating"),e.find(".alert").attr("hidden","");var a=window.siteConfig&&window.siteConfig.curvalData;a?this.curvalModalValidationSucceeded(e,a.values):c.post(e.attr("action")+"?validate&include_draft&source="+e.data("curval-id"),n,(function(t){if(0===t.error)this.curvalModalValidationSucceeded(e,t.values);else{var n=1===t.error?t.message:"Oops! Something went wrong.";this.curvalModalValidationFailed(e,n)}}),"json").fail((function(t,n,a){var i="Oops! Something went wrong: ".concat(n,": ").concat(a);this.curvalModalValidationFailed(e,i)})).always((function(){e.removeClass("edit-form--validating")}))}))}}])&&s(e.prototype,a),u&&s(e,u),Object.defineProperty(e,"prototype",{writable:!1}),b}(a.Z)}}]);