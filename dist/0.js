// { "framework": "Vue"} 

webpackJsonp([0],{

/***/ 13:
/***/ (function(module, exports) {

module.exports = {
  "wrapper": {
    "width": 100,
    "height": 100,
    "background": "url(https://static.xiaoxiaoge.com/icon/ellipsis.svg) no-repeat center",
    "backgroundSize": "auto 70px"
  },
  "webview": {
    "width": 100,
    "height": 100,
    "background": "url(https://static.xiaoxiaoge.com/icon/ellipsis.svg) no-repeat center",
    "backgroundSize": "auto 70px"
  },
  "mod-loading": {
    "height": "120",
    "lineHeight": "120",
    "textAlign": "center",
    "color": "#999999",
    "fontSize": "24"
  },
  "loadimg": {
    "height": "70",
    "position": "relative",
    "top": 50
  },
  "pageload": {
    "height": "500",
    "lineHeight": "500"
  }
}

/***/ }),

/***/ 14:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
	name: 'webview',
	data: function data() {
		return {
			pageload: !true,
			url: '',
			pagestart: '',
			pagefinish: '',
			title: '',
			error: ''
		};
	},

	created: function created() {
		var that = this,
		    url = that.$route.query.url;

		that.url = decodeURIComponent(url);
	},
	methods: {
		onPageStart: function onPageStart(e) {
			console.log('onPageStart', e);
		},
		onPageFinish: function onPageFinish(e) {
			console.log('onPageFinish', e);
			this.pageload = false;
		},
		onError: function onError(e) {
			console.log('onError', e);
		}
	}
};

/***/ }),

/***/ 15:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["wrapper"]
  }, [(_vm.pageload) ? _c('cell', {
    staticClass: ["mod-loading", "pageload"],
    appendAsTree: true,
    attrs: {
      "append": "tree"
    }
  }, [_c('image', {
    staticClass: ["loadimg"],
    attrs: {
      "src": "https://static.xiaoxiaoge.com/icon/ellipsis.svg"
    }
  })]) : _c('web', {
    staticClass: ["webview"],
    attrs: {
      "src": _vm.url
    },
    on: {
      "pagestart": _vm.onPageStart,
      "pagefinish": _vm.onPageFinish,
      "error": _vm.onError
    }
  })])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),

/***/ 8:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(13)
)

/* script */
__vue_exports__ = __webpack_require__(14)

/* template */
var __vue_template__ = __webpack_require__(15)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "J:\\work\\goochin\\douknow\\src\\views\\webview.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-9991d116"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ })

});