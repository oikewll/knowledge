// { "framework": "Vue"} 

webpackJsonp([4],{

/***/ 15:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(16)
)

/* script */
__vue_exports__ = __webpack_require__(17)

/* template */
var __vue_template__ = __webpack_require__(18)
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
__vue_options__.__file = "J:\\work\\goochin\\douknow\\src\\views\\home.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-5a4bed13"
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


/***/ }),

/***/ 16:
/***/ (function(module, exports) {

module.exports = {
  "mod-loading": {
    "height": "120",
    "lineHeight": "120",
    "textAlign": "center",
    "color": "#999999",
    "fontSize": "24"
  },
  "loadimg": {
    "height": "70"
  },
  "item-list": {
    "background": "#f4f4f4",
    "color": "#666666",
    "paddingTop": "30",
    "paddingRight": "30",
    "paddingLeft": "30",
    "height": 100
  },
  "title": {
    "fontSize": "60",
    "color": "#666666",
    "marginBottom": "30"
  },
  "items": {
    "border": "1px solid #d8d8d8",
    "borderRadius": "8",
    "background": "#fff",
    "paddingTop": "40",
    "paddingLeft": "30",
    "paddingRight": "30",
    "paddingBottom": "40",
    "marginBottom": "40"
  },
  "item-tit": {
    "fontSize": "40",
    "marginBottom": "40"
  },
  "item-cont": {
    "marginBottom": "40",
    "flexDirection": "row"
  },
  "images": {
    "width": "130",
    "height": "130",
    "background": "#e0e0e0"
  },
  "content": {
    "fontSize": "32",
    "lineHeight": 1.6,
    "color": "#666666",
    "paddingLeft": "30",
    "flex": 2,
    "marginTop": "-8"
  },
  "item-btm": {
    "fontSize": "28",
    "position": "relative",
    "flexDirection": "row",
    "justifyContent": "space-between",
    "alignItems": "center"
  },
  "read": {
    "display": "inline-block",
    "color": "#999999",
    "fontSize": "28"
  },
  "tags": {
    "right": 0,
    "top": 0,
    "flexDirection": "row",
    "justifyContent": "flex-end"
  },
  "tag": {
    "fontSize": "26",
    "color": "#999999",
    "border": "1px solid #e0e0e0",
    "minWidth": "50",
    "lineHeight": 1.6,
    "paddingLeft": "20",
    "paddingRight": "20",
    "marginLeft": "20"
  }
}

/***/ }),

/***/ 17:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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

var modal = weex.requireModule('modal');
var stream = weex.requireModule('stream');
exports.default = {
	name: 'App',
	data: function data() {
		return {
			pageload: true,
			cout: 15,
			page: 1,
			keyWord: '',
			list: [],
			endload: false,
			type: ['全部', '人物', '社会', '生活', '文化', '娱乐', '健康', '历史', '科学']
		};
	},
	created: function created() {
		this.getList();
	},

	methods: {
		showItem: function showItem(link, obj) {
			console.log(link, obj);
			/**
    * 这里点击后用av的查询id，
    * 如果没有的就存储一份到数据库
    */
			this.$router.push({
				path: '/web',
				query: {
					url: link
				}
			});
		},
		getList: function getList() {
			var that = this;
			stream.fetch({
				method: 'GET',
				url: that.config.baseurl + '/list?count=' + that.cout + '&page=' + that.page + '&keyWord=' + that.keyWord,
				type: 'json'
			}, function (ret) {
				if (!ret.ok) {
					modal.toast({
						message: '请求错误',
						duration: 1.4
					});
					return;
				}

				if (that.page > 1) {
					// 除了第一页以外，都需要把旧的数据和新的数据合并
					that.list = [].concat(_toConsumableArray(that.list), _toConsumableArray(ret.data));
				} else {
					that.list = ret.data;
					that.pageload = false;
				}

				that.endload = false;
			}, function (err) {
				console.error(err);
			});
		},
		loadmore: function loadmore() {
			var that = this;
			that.page = that.page + 1;
			that.endload = true;

			that.getList();
		}
	}
};

/***/ }),

/***/ 18:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('list', {
    staticClass: ["item-list"],
    attrs: {
      "loadmoreoffset": "40"
    },
    on: {
      "loadmore": _vm.loadmore
    }
  }, [_c('cell', {
    staticClass: ["title"],
    appendAsTree: true,
    attrs: {
      "append": "tree"
    }
  }, [_vm._v("你知道吗？")]), (_vm.pageload) ? _c('cell', {
    staticClass: ["mod-loading"],
    appendAsTree: true,
    attrs: {
      "append": "tree"
    }
  }, [_c('image', {
    staticClass: ["loadimg"],
    attrs: {
      "src": "https://static.xiaoxiaoge.com/icon/ellipsis.svg"
    }
  })]) : _vm._l((_vm.list), function(item, index) {
    return _c('cell', {
      key: item.itemId,
      staticClass: ["items"],
      appendAsTree: true,
      attrs: {
        "dataId": item.itemId,
        "append": "tree"
      },
      on: {
        "click": function($event) {
          _vm.showItem(item.wapLink, item)
        }
      }
    }, [_c('text', {
      staticClass: ["item-tit"]
    }, [_vm._v(_vm._s(item.title))]), _c('div', {
      staticClass: ["item-cont"]
    }, [_c('image', {
      staticClass: ["images"],
      attrs: {
        "resize": "cover",
        "src": item.pic
      }
    }), _c('text', {
      staticClass: ["content"]
    }, [_vm._v(_vm._s(item.desc))])]), _c('div', {
      staticClass: ["item-btm"]
    }, [_c('text', {
      staticClass: ["read"]
    }, [_vm._v("阅读：" + _vm._s(item.pv))]), _c('div', {
      staticClass: ["tags"]
    }, _vm._l((item.related), function(tag) {
      return _c('text', {
        staticClass: ["tag"],
        on: {
          "click": function($event) {
            _vm.showItem(tag.url, null)
          }
        }
      }, [_vm._v(_vm._s(tag.title))])
    }))])])
  }), (_vm.endload) ? _c('cell', {
    staticClass: ["mod-loading"],
    appendAsTree: true,
    attrs: {
      "append": "tree"
    }
  }, [_vm._v("加载中…")]) : _vm._e()], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ })

});