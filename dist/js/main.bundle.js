/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CCarambaController = __webpack_require__(/*! ./parts/CCaramba */ "./src/js/parts/CCaramba.js");
var CTools = __webpack_require__(/*! ./parts/CTools */ "./src/js/parts/CTools.js");

/**
 * Главный контроллер
 */

var CAppController = function () {
	function CAppController() {
		_classCallCheck(this, CAppController);

		this.cCarambaController = new CCarambaController();
		this.cTools = new CTools();
	}

	_createClass(CAppController, [{
		key: 'init',
		value: function init() {
			var _this = this;

			return Promise.resolve().then(function () {
				return _this.cCarambaController.init();
			});
		}
	}]);

	return CAppController;
}();

var cAppController = new CAppController();

$(document).ready(function () {
	cAppController.init().then(function () {
		global.AC = cAppController;
	});
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/js/parts/CCaramba.js":
/*!**********************************!*\
  !*** ./src/js/parts/CCaramba.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CTools = __webpack_require__(/*! ./CTools */ "./src/js/parts/CTools.js");

/**
 * Контроллер для работы с подргрузкой и обновлением табличных данных об автомобилях
 * Т.к. по одной странице нельзя ничего сказать о всем проекте в целом, то данный контроллер
 * служит скорее для демонстрацинных целей и заточен под работу с конкретными данными и конкретнйо формой
 */

var CCarambaController = function () {
	function CCarambaController() {
		_classCallCheck(this, CCarambaController);

		this.loadUrl = 'https://rawgit.com/Varinetz/e6cbadec972e76a340c41a65fcc2a6b3/raw/90191826a3bac2ff0761040ed1d95c59f14eaf26/frontend_test_table.json';

		/**
   * Локализация. В перспективах равзития это следует выносит в отдельный json-файл, либо как-то пробрасывать
   * из базы.
   * @type {{ru: {status: {pending: string, out_of_stock: string, in_stock: string}, removeButtonText: string}, en: {}}}
   */
		this.text = {
			'ru': {
				'status--pending': 'Ожидается',
				'status--out_of_stock': 'Нет в наличии',
				'status--in_stock': 'В наличии',
				'error--load_error': 'Ошибка загрузки данных',
				'error--empty_data': 'Нет данных для отображения',
				'remove_button_text': 'Удалить',
				'currency': 'руб.'
			},
			'en': {}
		};

		this.locale = 'ru';
		this.tax = 13;

		/**
   * Получение текста по коду. Локаль передана через каррирование
   */
		this.getText = this.getTextByLocale(this.locale);

		/**
   * Почему именно такое решение?
   * Изначально у меня была идея хранить это в виде json-дерева по типу xml, однако это усложняет
   * усложняет читаемость разметки. В перспективах развития это можно вынести в виде
   * такого же объекта в однельны json-сниппет и подгружать асинхронно, например. Но в рамках данного
   * задания и при неизвестной архитектуре прочих частей продукта, я решил не усложнять это до такой степени.
   * scaffold - скелет разметки. Также в нем присутствуют опциональные части, которые описание в optioanl
   * @type {{scaffold: string, optional: {description: string, colorBox: string}}}
   */
		this.markupTemplate = {
			'scaffold': '\n\t\t\t\t<div class="b-custom-table__row" data-row-id="{{id}}">\n\t\t\t\t  <div class="b-custom-table__cell b-custom-table__cell--title">\n\t\t\t\t    <div class="title">{{title}}</div>\n\t\t\t\t    {{optionalDescription}}\n\t\t\t\t  </div>\n\t\t\t\t  <div class="b-custom-table__cell b-custom-table__cell--year">{{year}}</div>\n\t\t\t\t  <div class="b-custom-table__cell b-custom-table__cell--color">\n\t\t\t\t    {{optionalColorbox}}\n\t\t\t\t  </div>\n\t\t\t\t  <div class="b-custom-table__cell b-custom-table__cell--status">{{status}}</div>\n\t\t\t\t  <div class="b-custom-table__cell b-custom-table__cell--price">\n\t\t\t\t    <nobr class="price js-price" data-original-price="{{price}}">{{formattedPrice}}</nobr>\n\t\t\t\t    <nobr class="price-with-tax js-price-with-tax" data-original-price-with-tax="{{priceWithTax}}">{{formattedPriceWithTax}} (+13%)</nobr>\n\t\t\t\t  </div>\n\t\t\t\t  <div class="b-custom-table__cell b-custom-table__cell--action">\n\t\t\t\t    <button class="i-button i-button--ellipse i-button--size-small js-delete-trigger">{{removeButtonText}}</button>\n\t\t\t\t  </div>\n\t\t\t\t</div>\n\t\t\t',
			'optional': {
				'description': '<div class="description">{{description}}</div>',
				'colorBox': '<div class="i-color-box" style="background-color: {{colorCode}}"></div>'
			}
		};

		this.$tableWrapper = null;
	}

	_createClass(CCarambaController, [{
		key: 'init',
		value: function init() {
			var _this = this;

			this.$tableWrapper = $('#caramba-table');

			if (this.$tableWrapper.length) {
				this.$tableRowContainer = this.$tableWrapper.find('.js-body');
				this.$tableNoty = this.$tableWrapper.find('.js-noty');
				this.$tableSummaryPrice = this.$tableWrapper.find('.js-summary-price');

				this.initDeleteTrigger();

				this.lockTable();

				this.loadData().then(function (data) {
					return Promise.resolve().delay(1000) //эмуляция долго ответа
					.then(function () {
						if (Object.keys(data).length) {
							_this.updateTableWithData(data);
						} else {
							_this.showTableNotification(_this.getText('error--empty_data'));
						}
					});
				}).then(function () {
					_this.unlockTable();
				}).catch(function (msg) {
					//TODO обработка ошибок
					_this.showTableNotification(_this.getText('error--load_error'));
				});
			}
		}
	}, {
		key: 'loadData',
		value: function loadData() {
			var _this2 = this;

			return new Promise(function (resolve, reject) {
				$.ajax({
					url: _this2.loadUrl,
					data: {},
					dataType: 'json',
					success: function success(data) {
						resolve(data);
					},
					error: function error(jqXHR, textStatus, _error) {
						reject('false');
					}
				});
			});
		}
	}, {
		key: 'lockTable',
		value: function lockTable() {}

		/**
   * Вывод данных в шаблонную строку и добавление данныех
   * Дальнейшее развитие - дополнительная безопасная обработка данных с серва
   * @param data
   * @param bAppend - не очищать существующие данные в таблице
   */

	}, {
		key: 'updateTableWithData',
		value: function updateTableWithData(data) {
			var bAppend = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

			var resultMarkup = [];

			for (var row in data) {
				if (data.hasOwnProperty(row)) {
					//нет смыслы выводить строку, если отстутсвует ID или TITLE
					if (data[row].id && data[row].title) {
						var rowMarkup = this.markupTemplate.scaffold;

						for (var fieldName in data[row]) {
							if (data[row].hasOwnProperty(fieldName)) {
								var value = data[row][fieldName];

								if (fieldName == 'id') {
									rowMarkup = rowMarkup.replace(/{{id}}/g, value);
								}

								if (fieldName == 'title') {
									rowMarkup = rowMarkup.replace(/{{title}}/g, value);
								}

								if (fieldName == 'description') {
									rowMarkup = rowMarkup.replace(/{{optionalDescription}}/g, this.markupTemplate.optional.description);
									rowMarkup = rowMarkup.replace(/{{description}}/g, value);
								}

								/**
         * Цвета вывожу прямо в виде текста, но по-хорошему нужно отдавать через API код
         */
								if (fieldName == 'color') {
									rowMarkup = rowMarkup.replace(/{{optionalColorbox}}/g, this.markupTemplate.optional.colorBox);
									rowMarkup = rowMarkup.replace(/{{colorCode}}/g, value);
								}

								if (fieldName == 'year') {
									rowMarkup = rowMarkup.replace(/{{year}}/g, value);
								}

								if (fieldName == 'status') {
									//опечатка в статусе, прилетает с АПИ
									if (value == 'pednding') {
										value = 'pending';
									}

									var statusText = this.getText('status--' + value);
									rowMarkup = rowMarkup.replace(/{{status}}/g, statusText ? statusText : '-');
								}

								if (fieldName == 'price') {
									var price = value;
									var priceWithTax = CTools.getPriceWithTax(value, this.tax);
									var formattedPrice = CTools.formatMoney(value, this.locale);
									var formattedPriceWithTax = CTools.formatMoney(CTools.getPriceWithTax(value, this.tax), this.locale);

									rowMarkup = rowMarkup.replace(/{{price}}/g, price);
									rowMarkup = rowMarkup.replace(/{{formattedPrice}}/g, formattedPrice + ' ' + this.getText('currency'));
									rowMarkup = rowMarkup.replace(/{{priceWithTax}}/g, priceWithTax);
									rowMarkup = rowMarkup.replace(/{{formattedPriceWithTax}}/g, formattedPriceWithTax + ' ' + this.getText('currency'));
								}
							}
						}

						rowMarkup = rowMarkup.replace(/{{optionalDescription}}/g, '').replace(/{{optionalColorbox}}/g, '').replace(/{{removeButtonText}}/g, this.getText('remove_button_text'));

						resultMarkup.push(rowMarkup);
					}
				}
			}

			if (bAppend) {
				this.$tableRowContainer.append(resultMarkup.join(''));
			} else {
				this.$tableRowContainer.append(resultMarkup.join(''));
			}

			this.updateSummaryPrice();
		}
	}, {
		key: 'updateSummaryPrice',
		value: function updateSummaryPrice() {
			var summaryPrice = 0;

			$.each(this.getRows(), function (i, row) {
				var $row = $(row);
				var price = $row.find('.js-price-with-tax').length ? $row.find('.js-price-with-tax').attr('data-original-price-with-tax') : $row.find('.js-price').attr('data-original-price');

				if (price) {
					summaryPrice = Number(summaryPrice) + Number(price);
				}
			});

			this.$tableSummaryPrice.html(CTools.formatMoney(Number(summaryPrice), this.locale) + ' ' + this.getText('currency'));
		}
	}, {
		key: 'getRows',
		value: function getRows() {
			return this.$tableRowContainer.find('[data-row-id]');
		}

		/**
   * Получить текст по коду для переданной локали
   * @param locale - локаль
   * @param text - текст
   * @returns {function(*)}
   */

	}, {
		key: 'getTextByLocale',
		value: function getTextByLocale() {
			var _this3 = this;

			var locale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'ru';
			var text = arguments[1];

			return function (text) {
				return _this3.text && _this3.text[locale] && _this3.text[locale][text] ? _this3.text[locale][text] : false;
			};
		}
	}, {
		key: 'lockTable',
		value: function lockTable() {
			this.$tableWrapper.addClass('is-preloading');
		}
	}, {
		key: 'unlockTable',
		value: function unlockTable() {
			this.$tableWrapper.removeClass('is-preloading');
		}
	}, {
		key: 'isTableLock',
		value: function isTableLock() {}

		/**
   * Выводит сообщение в блоке вместо
   * @param msg
   */

	}, {
		key: 'showTableNotification',
		value: function showTableNotification() {
			var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

			if (msg) {
				this.$tableNoty.html(msg);
				this.$tableWrapper.addClass('is-noty');
			}
		}
	}, {
		key: 'isNoRows',
		value: function isNoRows() {
			return this.getRows().length == 0;
		}
	}, {
		key: 'initDeleteTrigger',
		value: function initDeleteTrigger() {
			var _this4 = this;

			this.$tableWrapper.on('click', '.js-delete-trigger', function (e) {
				var $this = $(e.currentTarget);
				var $row = $this.closest('[data-row-id]');

				if ($row.length) {
					_this4.lockTable();

					Promise.resolve().delay(100) //чисто для демонстрации работы с сервером
					.then(function () {
						$row.remove();

						if (_this4.isNoRows()) {
							_this4.showTableNotification(_this4.getText('error--empty_data'));
						}

						_this4.updateSummaryPrice();
						_this4.unlockTable();
					});
				}
			});
		}
	}]);

	return CCarambaController;
}();

module.exports = CCarambaController;

/***/ }),

/***/ "./src/js/parts/CTools.js":
/*!********************************!*\
  !*** ./src/js/parts/CTools.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Вспомогательные функции
 */
var CTools = function () {
	function CTools() {
		_classCallCheck(this, CTools);
	}

	/**
  * клонирование объекта без привязки по ссылке
  * @param object
  */


	_createClass(CTools, null, [{
		key: 'cloneObject',
		value: function cloneObject() {
			var object = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			return JSON.parse(JSON.stringify(object));
		}

		/**
   * Форматироание строки в денежный вид
   * @param price
   * @param locale
   * @returns {*}
   */

	}, {
		key: 'formatMoney',
		value: function formatMoney(price) {
			var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'ru';

			var nPrice = Number(price);

			if (!isNaN(nPrice)) {
				return nPrice.toLocaleString(locale);
			} else {
				return price;
			}
		}

		/**
   * Цена + налог
   * @param price
   * @param tax
   * @param precision
   */

	}, {
		key: 'getPriceWithTax',
		value: function getPriceWithTax(price) {
			var tax = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 13;
			var precision = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

			var nPrice = Number(price);
			var nTax = Number(tax);

			if (!isNaN(nPrice) && !isNaN(nTax)) {
				var priceWithTax = nPrice * nTax / 100 + nPrice;
				return priceWithTax % 1 === 0 ? priceWithTax : priceWithTax.toFixed(precision);
			} else {
				return price;
			}
		}
	}]);

	return CTools;
}();

module.exports = CTools;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcGFydHMvQ0NhcmFtYmEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3BhcnRzL0NUb29scy5qcyJdLCJuYW1lcyI6WyJDQ2FyYW1iYUNvbnRyb2xsZXIiLCJyZXF1aXJlIiwiQ1Rvb2xzIiwiQ0FwcENvbnRyb2xsZXIiLCJjQ2FyYW1iYUNvbnRyb2xsZXIiLCJjVG9vbHMiLCJQcm9taXNlIiwicmVzb2x2ZSIsInRoZW4iLCJpbml0IiwiY0FwcENvbnRyb2xsZXIiLCIkIiwiZG9jdW1lbnQiLCJyZWFkeSIsImdsb2JhbCIsIkFDIiwibG9hZFVybCIsInRleHQiLCJsb2NhbGUiLCJ0YXgiLCJnZXRUZXh0IiwiZ2V0VGV4dEJ5TG9jYWxlIiwibWFya3VwVGVtcGxhdGUiLCIkdGFibGVXcmFwcGVyIiwibGVuZ3RoIiwiJHRhYmxlUm93Q29udGFpbmVyIiwiZmluZCIsIiR0YWJsZU5vdHkiLCIkdGFibGVTdW1tYXJ5UHJpY2UiLCJpbml0RGVsZXRlVHJpZ2dlciIsImxvY2tUYWJsZSIsImxvYWREYXRhIiwiZGF0YSIsImRlbGF5IiwiT2JqZWN0Iiwia2V5cyIsInVwZGF0ZVRhYmxlV2l0aERhdGEiLCJzaG93VGFibGVOb3RpZmljYXRpb24iLCJ1bmxvY2tUYWJsZSIsImNhdGNoIiwibXNnIiwicmVqZWN0IiwiYWpheCIsInVybCIsImRhdGFUeXBlIiwic3VjY2VzcyIsImVycm9yIiwianFYSFIiLCJ0ZXh0U3RhdHVzIiwiYkFwcGVuZCIsInJlc3VsdE1hcmt1cCIsInJvdyIsImhhc093blByb3BlcnR5IiwiaWQiLCJ0aXRsZSIsInJvd01hcmt1cCIsInNjYWZmb2xkIiwiZmllbGROYW1lIiwidmFsdWUiLCJyZXBsYWNlIiwib3B0aW9uYWwiLCJkZXNjcmlwdGlvbiIsImNvbG9yQm94Iiwic3RhdHVzVGV4dCIsInByaWNlIiwicHJpY2VXaXRoVGF4IiwiZ2V0UHJpY2VXaXRoVGF4IiwiZm9ybWF0dGVkUHJpY2UiLCJmb3JtYXRNb25leSIsImZvcm1hdHRlZFByaWNlV2l0aFRheCIsInB1c2giLCJhcHBlbmQiLCJqb2luIiwidXBkYXRlU3VtbWFyeVByaWNlIiwic3VtbWFyeVByaWNlIiwiZWFjaCIsImdldFJvd3MiLCJpIiwiJHJvdyIsImF0dHIiLCJOdW1iZXIiLCJodG1sIiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsIm9uIiwiZSIsIiR0aGlzIiwiY3VycmVudFRhcmdldCIsImNsb3Nlc3QiLCJyZW1vdmUiLCJpc05vUm93cyIsIm1vZHVsZSIsImV4cG9ydHMiLCJvYmplY3QiLCJKU09OIiwicGFyc2UiLCJzdHJpbmdpZnkiLCJuUHJpY2UiLCJpc05hTiIsInRvTG9jYWxlU3RyaW5nIiwicHJlY2lzaW9uIiwiblRheCIsInRvRml4ZWQiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNB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Ozs7Ozs7QUFHRjJCLE9BQU9DLE9BQVAsR0FBaUIxRixNQUFqQixDIiwiZmlsZSI6Im1haW4uYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvanMvbWFpbi5qc1wiKTtcbiIsInZhciBnO1xuXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxuZyA9IChmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXM7XG59KSgpO1xuXG50cnkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcblx0ZyA9IGcgfHwgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpIHx8ICgxLCBldmFsKShcInRoaXNcIik7XG59IGNhdGNoIChlKSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cdGlmICh0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKSBnID0gd2luZG93O1xufVxuXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGc7XG4iLCJjb25zdCBDQ2FyYW1iYUNvbnRyb2xsZXIgPSByZXF1aXJlKCcuL3BhcnRzL0NDYXJhbWJhJyk7XG5jb25zdCBDVG9vbHMgPSByZXF1aXJlKCcuL3BhcnRzL0NUb29scycpO1xuXG4vKipcbiAqINCT0LvQsNCy0L3Ri9C5INC60L7QvdGC0YDQvtC70LvQtdGAXG4gKi9cbmNsYXNzIENBcHBDb250cm9sbGVyIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0dGhpcy5jQ2FyYW1iYUNvbnRyb2xsZXIgPSBuZXcgQ0NhcmFtYmFDb250cm9sbGVyKCk7XG5cdFx0dGhpcy5jVG9vbHMgPSBuZXcgQ1Rvb2xzKCk7XG5cdH1cblxuXHRpbml0KCkge1xuXHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxuXHRcdFx0LnRoZW4oKCkgPT4gdGhpcy5jQ2FyYW1iYUNvbnRyb2xsZXIuaW5pdCgpKTtcblx0fVxufVxuXG5jb25zdCBjQXBwQ29udHJvbGxlciA9IG5ldyBDQXBwQ29udHJvbGxlcigpO1xuXG4kKGRvY3VtZW50KS5yZWFkeSgoKSA9PiB7XG5cdGNBcHBDb250cm9sbGVyLmluaXQoKVxuXHRcdC50aGVuKCgpID0+IHtcblx0XHRcdGdsb2JhbC5BQz0gY0FwcENvbnRyb2xsZXI7XG5cdFx0fSk7XG59KTtcbiIsImNvbnN0IENUb29scyA9IHJlcXVpcmUoJy4vQ1Rvb2xzJyk7XG5cbi8qKlxuICog0JrQvtC90YLRgNC+0LvQu9C10YAg0LTQu9GPINGA0LDQsdC+0YLRiyDRgSDQv9C+0LTRgNCz0YDRg9C30LrQvtC5INC4INC+0LHQvdC+0LLQu9C10L3QuNC10Lwg0YLQsNCx0LvQuNGH0L3Ri9GFINC00LDQvdC90YvRhSDQvtCxINCw0LLRgtC+0LzQvtCx0LjQu9GP0YVcbiAqINCiLtC6LiDQv9C+INC+0LTQvdC+0Lkg0YHRgtGA0LDQvdC40YbQtSDQvdC10LvRjNC30Y8g0L3QuNGH0LXQs9C+INGB0LrQsNC30LDRgtGMINC+INCy0YHQtdC8INC/0YDQvtC10LrRgtC1INCyINGG0LXQu9C+0LwsINGC0L4g0LTQsNC90L3Ri9C5INC60L7QvdGC0YDQvtC70LvQtdGAXG4gKiDRgdC70YPQttC40YIg0YHQutC+0YDQtdC1INC00LvRjyDQtNC10LzQvtC90YHRgtGA0LDRhtC40L3QvdGL0YUg0YbQtdC70LXQuSDQuCDQt9Cw0YLQvtGH0LXQvSDQv9C+0LQg0YDQsNCx0L7RgtGDINGBINC60L7QvdC60YDQtdGC0L3Ri9C80Lgg0LTQsNC90L3Ri9C80Lgg0Lgg0LrQvtC90LrRgNC10YLQvdC50L4g0YTQvtGA0LzQvtC5XG4gKi9cbmNsYXNzIENDYXJhbWJhQ29udHJvbGxlciB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXMubG9hZFVybCA9ICdodHRwczovL3Jhd2dpdC5jb20vVmFyaW5ldHovZTZjYmFkZWM5NzJlNzZhMzQwYzQxYTY1ZmNjMmE2YjMvcmF3LzkwMTkxODI2YTNiYWMyZmYwNzYxMDQwZWQxZDk1YzU5ZjE0ZWFmMjYvZnJvbnRlbmRfdGVzdF90YWJsZS5qc29uJztcblxuXHRcdC8qKlxuXHRcdCAqINCb0L7QutCw0LvQuNC30LDRhtC40Y8uINCSINC/0LXRgNGB0L/QtdC60YLQuNCy0LDRhSDRgNCw0LLQt9C40YLQuNGPINGN0YLQviDRgdC70LXQtNGD0LXRgiDQstGL0L3QvtGB0LjRgiDQsiDQvtGC0LTQtdC70YzQvdGL0LkganNvbi3RhNCw0LnQuywg0LvQuNCx0L4g0LrQsNC6LdGC0L4g0L/RgNC+0LHRgNCw0YHRi9Cy0LDRgtGMXG5cdFx0ICog0LjQtyDQsdCw0LfRiy5cblx0XHQgKiBAdHlwZSB7e3J1OiB7c3RhdHVzOiB7cGVuZGluZzogc3RyaW5nLCBvdXRfb2Zfc3RvY2s6IHN0cmluZywgaW5fc3RvY2s6IHN0cmluZ30sIHJlbW92ZUJ1dHRvblRleHQ6IHN0cmluZ30sIGVuOiB7fX19XG5cdFx0ICovXG5cdFx0dGhpcy50ZXh0ID0ge1xuXHRcdFx0J3J1Jzoge1xuXHRcdFx0XHQnc3RhdHVzLS1wZW5kaW5nJzogJ9Ce0LbQuNC00LDQtdGC0YHRjycsXG5cdFx0XHRcdCdzdGF0dXMtLW91dF9vZl9zdG9jayc6ICfQndC10YIg0LIg0L3QsNC70LjRh9C40LgnLFxuXHRcdFx0XHQnc3RhdHVzLS1pbl9zdG9jayc6ICfQkiDQvdCw0LvQuNGH0LjQuCcsXG5cdFx0XHRcdCdlcnJvci0tbG9hZF9lcnJvcic6ICfQntGI0LjQsdC60LAg0LfQsNCz0YDRg9C30LrQuCDQtNCw0L3QvdGL0YUnLFxuXHRcdFx0XHQnZXJyb3ItLWVtcHR5X2RhdGEnOiAn0J3QtdGCINC00LDQvdC90YvRhSDQtNC70Y8g0L7RgtC+0LHRgNCw0LbQtdC90LjRjycsXG5cdFx0XHRcdCdyZW1vdmVfYnV0dG9uX3RleHQnOiAn0KPQtNCw0LvQuNGC0YwnLFxuXHRcdFx0XHQnY3VycmVuY3knOiAn0YDRg9CxLicsXG5cdFx0XHR9LFxuXHRcdFx0J2VuJzoge1xuXG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHRoaXMubG9jYWxlID0gJ3J1Jztcblx0XHR0aGlzLnRheCA9IDEzO1xuXG5cdFx0LyoqXG5cdFx0ICog0J/QvtC70YPRh9C10L3QuNC1INGC0LXQutGB0YLQsCDQv9C+INC60L7QtNGDLiDQm9C+0LrQsNC70Ywg0L/QtdGA0LXQtNCw0L3QsCDRh9C10YDQtdC3INC60LDRgNGA0LjRgNC+0LLQsNC90LjQtVxuXHRcdCAqL1xuXHRcdHRoaXMuZ2V0VGV4dCA9IHRoaXMuZ2V0VGV4dEJ5TG9jYWxlKHRoaXMubG9jYWxlKTtcblxuXHRcdC8qKlxuXHRcdCAqINCf0L7Rh9C10LzRgyDQuNC80LXQvdC90L4g0YLQsNC60L7QtSDRgNC10YjQtdC90LjQtT9cblx0XHQgKiDQmNC30L3QsNGH0LDQu9GM0L3QviDRgyDQvNC10L3RjyDQsdGL0LvQsCDQuNC00LXRjyDRhdGA0LDQvdC40YLRjCDRjdGC0L4g0LIg0LLQuNC00LUganNvbi3QtNC10YDQtdCy0LAg0L/QviDRgtC40L/RgyB4bWwsINC+0LTQvdCw0LrQviDRjdGC0L4g0YPRgdC70L7QttC90Y/QtdGCXG5cdFx0ICog0YPRgdC70L7QttC90Y/QtdGCINGH0LjRgtCw0LXQvNC+0YHRgtGMINGA0LDQt9C80LXRgtC60LguINCSINC/0LXRgNGB0L/QtdC60YLQuNCy0LDRhSDRgNCw0LfQstC40YLQuNGPINGN0YLQviDQvNC+0LbQvdC+INCy0YvQvdC10YHRgtC4INCyINCy0LjQtNC1XG5cdFx0ICog0YLQsNC60L7Qs9C+INC20LUg0L7QsdGK0LXQutGC0LAg0LIg0L7QtNC90LXQu9GM0L3RiyBqc29uLdGB0L3QuNC/0L/QtdGCINC4INC/0L7QtNCz0YDRg9C20LDRgtGMINCw0YHQuNC90YXRgNC+0L3QvdC+LCDQvdCw0L/RgNC40LzQtdGALiDQndC+INCyINGA0LDQvNC60LDRhSDQtNCw0L3QvdC+0LPQvlxuXHRcdCAqINC30LDQtNCw0L3QuNGPINC4INC/0YDQuCDQvdC10LjQt9Cy0LXRgdGC0L3QvtC5INCw0YDRhdC40YLQtdC60YLRg9GA0LUg0L/RgNC+0YfQuNGFINGH0LDRgdGC0LXQuSDQv9GA0L7QtNGD0LrRgtCwLCDRjyDRgNC10YjQuNC7INC90LUg0YPRgdC70L7QttC90Y/RgtGMINGN0YLQviDQtNC+INGC0LDQutC+0Lkg0YHRgtC10L/QtdC90LguXG5cdFx0ICogc2NhZmZvbGQgLSDRgdC60LXQu9C10YIg0YDQsNC30LzQtdGC0LrQuC4g0KLQsNC60LbQtSDQsiDQvdC10Lwg0L/RgNC40YHRg9GC0YHRgtCy0YPRjtGCINC+0L/RhtC40L7QvdCw0LvRjNC90YvQtSDRh9Cw0YHRgtC4LCDQutC+0YLQvtGA0YvQtSDQvtC/0LjRgdCw0L3QuNC1INCyIG9wdGlvYW5sXG5cdFx0ICogQHR5cGUge3tzY2FmZm9sZDogc3RyaW5nLCBvcHRpb25hbDoge2Rlc2NyaXB0aW9uOiBzdHJpbmcsIGNvbG9yQm94OiBzdHJpbmd9fX1cblx0XHQgKi9cblx0XHR0aGlzLm1hcmt1cFRlbXBsYXRlID0ge1xuXHRcdFx0J3NjYWZmb2xkJzogYFxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwiYi1jdXN0b20tdGFibGVfX3Jvd1wiIGRhdGEtcm93LWlkPVwie3tpZH19XCI+XG5cdFx0XHRcdCAgPGRpdiBjbGFzcz1cImItY3VzdG9tLXRhYmxlX19jZWxsIGItY3VzdG9tLXRhYmxlX19jZWxsLS10aXRsZVwiPlxuXHRcdFx0XHQgICAgPGRpdiBjbGFzcz1cInRpdGxlXCI+e3t0aXRsZX19PC9kaXY+XG5cdFx0XHRcdCAgICB7e29wdGlvbmFsRGVzY3JpcHRpb259fVxuXHRcdFx0XHQgIDwvZGl2PlxuXHRcdFx0XHQgIDxkaXYgY2xhc3M9XCJiLWN1c3RvbS10YWJsZV9fY2VsbCBiLWN1c3RvbS10YWJsZV9fY2VsbC0teWVhclwiPnt7eWVhcn19PC9kaXY+XG5cdFx0XHRcdCAgPGRpdiBjbGFzcz1cImItY3VzdG9tLXRhYmxlX19jZWxsIGItY3VzdG9tLXRhYmxlX19jZWxsLS1jb2xvclwiPlxuXHRcdFx0XHQgICAge3tvcHRpb25hbENvbG9yYm94fX1cblx0XHRcdFx0ICA8L2Rpdj5cblx0XHRcdFx0ICA8ZGl2IGNsYXNzPVwiYi1jdXN0b20tdGFibGVfX2NlbGwgYi1jdXN0b20tdGFibGVfX2NlbGwtLXN0YXR1c1wiPnt7c3RhdHVzfX08L2Rpdj5cblx0XHRcdFx0ICA8ZGl2IGNsYXNzPVwiYi1jdXN0b20tdGFibGVfX2NlbGwgYi1jdXN0b20tdGFibGVfX2NlbGwtLXByaWNlXCI+XG5cdFx0XHRcdCAgICA8bm9iciBjbGFzcz1cInByaWNlIGpzLXByaWNlXCIgZGF0YS1vcmlnaW5hbC1wcmljZT1cInt7cHJpY2V9fVwiPnt7Zm9ybWF0dGVkUHJpY2V9fTwvbm9icj5cblx0XHRcdFx0ICAgIDxub2JyIGNsYXNzPVwicHJpY2Utd2l0aC10YXgganMtcHJpY2Utd2l0aC10YXhcIiBkYXRhLW9yaWdpbmFsLXByaWNlLXdpdGgtdGF4PVwie3twcmljZVdpdGhUYXh9fVwiPnt7Zm9ybWF0dGVkUHJpY2VXaXRoVGF4fX0gKCsxMyUpPC9ub2JyPlxuXHRcdFx0XHQgIDwvZGl2PlxuXHRcdFx0XHQgIDxkaXYgY2xhc3M9XCJiLWN1c3RvbS10YWJsZV9fY2VsbCBiLWN1c3RvbS10YWJsZV9fY2VsbC0tYWN0aW9uXCI+XG5cdFx0XHRcdCAgICA8YnV0dG9uIGNsYXNzPVwiaS1idXR0b24gaS1idXR0b24tLWVsbGlwc2UgaS1idXR0b24tLXNpemUtc21hbGwganMtZGVsZXRlLXRyaWdnZXJcIj57e3JlbW92ZUJ1dHRvblRleHR9fTwvYnV0dG9uPlxuXHRcdFx0XHQgIDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdGAsXG5cdFx0XHQnb3B0aW9uYWwnOiB7XG5cdFx0XHRcdCdkZXNjcmlwdGlvbic6IGA8ZGl2IGNsYXNzPVwiZGVzY3JpcHRpb25cIj57e2Rlc2NyaXB0aW9ufX08L2Rpdj5gLFxuXHRcdFx0XHQnY29sb3JCb3gnOiBgPGRpdiBjbGFzcz1cImktY29sb3ItYm94XCIgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiB7e2NvbG9yQ29kZX19XCI+PC9kaXY+YCxcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0dGhpcy4kdGFibGVXcmFwcGVyID0gbnVsbDtcblx0fVxuXG5cdGluaXQoKSB7XG5cdFx0dGhpcy4kdGFibGVXcmFwcGVyID0gJCgnI2NhcmFtYmEtdGFibGUnKTtcblxuXHRcdGlmICh0aGlzLiR0YWJsZVdyYXBwZXIubGVuZ3RoKSB7XG5cdFx0XHR0aGlzLiR0YWJsZVJvd0NvbnRhaW5lciA9IHRoaXMuJHRhYmxlV3JhcHBlci5maW5kKCcuanMtYm9keScpO1xuXHRcdFx0dGhpcy4kdGFibGVOb3R5ID0gdGhpcy4kdGFibGVXcmFwcGVyLmZpbmQoJy5qcy1ub3R5Jyk7XG5cdFx0XHR0aGlzLiR0YWJsZVN1bW1hcnlQcmljZSA9IHRoaXMuJHRhYmxlV3JhcHBlci5maW5kKCcuanMtc3VtbWFyeS1wcmljZScpO1xuXG5cdFx0XHR0aGlzLmluaXREZWxldGVUcmlnZ2VyKCk7XG5cblx0XHRcdHRoaXMubG9ja1RhYmxlKCk7XG5cblx0XHRcdHRoaXMubG9hZERhdGEoKVxuXHRcdFx0XHQudGhlbigoZGF0YSkgPT4ge1xuXHRcdFx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxuXHRcdFx0XHRcdFx0LmRlbGF5KDEwMDApIC8v0Y3QvNGD0LvRj9GG0LjRjyDQtNC+0LvQs9C+INC+0YLQstC10YLQsFxuXHRcdFx0XHRcdFx0LnRoZW4oKCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRpZiAoT2JqZWN0LmtleXMoZGF0YSkubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy51cGRhdGVUYWJsZVdpdGhEYXRhKGRhdGEpO1xuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMuc2hvd1RhYmxlTm90aWZpY2F0aW9uKHRoaXMuZ2V0VGV4dCgnZXJyb3ItLWVtcHR5X2RhdGEnKSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9KVxuXHRcdFx0XHQudGhlbigoKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy51bmxvY2tUYWJsZSgpO1xuXHRcdFx0XHR9KVxuXHRcdFx0XHQuY2F0Y2goKG1zZykgPT4ge1xuXHRcdFx0XHRcdC8vVE9ETyDQvtCx0YDQsNCx0L7RgtC60LAg0L7RiNC40LHQvtC6XG5cdFx0XHRcdFx0dGhpcy5zaG93VGFibGVOb3RpZmljYXRpb24odGhpcy5nZXRUZXh0KCdlcnJvci0tbG9hZF9lcnJvcicpKTtcblx0XHRcdFx0fSlcblx0XHR9XG5cdH1cblxuXHRsb2FkRGF0YSgpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0JC5hamF4KHtcblx0XHRcdFx0dXJsOiB0aGlzLmxvYWRVcmwsXG5cdFx0XHRcdGRhdGE6IHtcblxuXHRcdFx0XHR9LFxuXHRcdFx0XHRkYXRhVHlwZTogJ2pzb24nLFxuXHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xuXHRcdFx0XHRcdHJlc29sdmUoZGF0YSk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGVycm9yOiAoanFYSFIsIHRleHRTdGF0dXMsIGVycm9yKSA9PiB7XG5cdFx0XHRcdFx0cmVqZWN0KCdmYWxzZScpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KVxuXHRcdH0pO1xuXHR9XG5cblx0bG9ja1RhYmxlKCkge31cblxuXHQvKipcblx0ICog0JLRi9Cy0L7QtCDQtNCw0L3QvdGL0YUg0LIg0YjQsNCx0LvQvtC90L3Rg9GOINGB0YLRgNC+0LrRgyDQuCDQtNC+0LHQsNCy0LvQtdC90LjQtSDQtNCw0L3QvdGL0LXRhVxuXHQgKiDQlNCw0LvRjNC90LXQudGI0LXQtSDRgNCw0LfQstC40YLQuNC1IC0g0LTQvtC/0L7Qu9C90LjRgtC10LvRjNC90LDRjyDQsdC10LfQvtC/0LDRgdC90LDRjyDQvtCx0YDQsNCx0L7RgtC60LAg0LTQsNC90L3Ri9GFINGBINGB0LXRgNCy0LBcblx0ICogQHBhcmFtIGRhdGFcblx0ICogQHBhcmFtIGJBcHBlbmQgLSDQvdC1INC+0YfQuNGJ0LDRgtGMINGB0YPRidC10YHRgtCy0YPRjtGJ0LjQtSDQtNCw0L3QvdGL0LUg0LIg0YLQsNCx0LvQuNGG0LVcblx0ICovXG5cdHVwZGF0ZVRhYmxlV2l0aERhdGEoZGF0YSwgYkFwcGVuZCA9IGZhbHNlKSB7XG5cdFx0bGV0IHJlc3VsdE1hcmt1cCA9IFtdO1xuXG5cdFx0Zm9yIChsZXQgcm93IGluIGRhdGEpIHtcblx0XHRcdGlmIChkYXRhLmhhc093blByb3BlcnR5KHJvdykpIHtcblx0XHRcdFx0Ly/QvdC10YIg0YHQvNGL0YHQu9GLINCy0YvQstC+0LTQuNGC0Ywg0YHRgtGA0L7QutGDLCDQtdGB0LvQuCDQvtGC0YHRgtGD0YLRgdCy0YPQtdGCIElEINC40LvQuCBUSVRMRVxuXHRcdFx0XHRpZiAoZGF0YVtyb3ddLmlkICYmIGRhdGFbcm93XS50aXRsZSkge1xuXHRcdFx0XHRcdGxldCByb3dNYXJrdXAgPSB0aGlzLm1hcmt1cFRlbXBsYXRlLnNjYWZmb2xkO1xuXG5cdFx0XHRcdFx0Zm9yIChsZXQgZmllbGROYW1lIGluIGRhdGFbcm93XSkge1xuXHRcdFx0XHRcdFx0aWYgKGRhdGFbcm93XS5oYXNPd25Qcm9wZXJ0eShmaWVsZE5hbWUpKSB7XG5cdFx0XHRcdFx0XHRcdGxldCB2YWx1ZSA9IGRhdGFbcm93XVtmaWVsZE5hbWVdO1xuXG5cdFx0XHRcdFx0XHRcdGlmIChmaWVsZE5hbWUgPT0gJ2lkJykge1xuXHRcdFx0XHRcdFx0XHRcdHJvd01hcmt1cCA9IHJvd01hcmt1cC5yZXBsYWNlKC97e2lkfX0vZywgdmFsdWUpO1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0aWYgKGZpZWxkTmFtZSA9PSAndGl0bGUnKSB7XG5cdFx0XHRcdFx0XHRcdFx0cm93TWFya3VwID0gcm93TWFya3VwLnJlcGxhY2UoL3t7dGl0bGV9fS9nLCB2YWx1ZSk7XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRpZiAoZmllbGROYW1lID09ICdkZXNjcmlwdGlvbicpIHtcblx0XHRcdFx0XHRcdFx0XHRyb3dNYXJrdXAgPSByb3dNYXJrdXAucmVwbGFjZSgve3tvcHRpb25hbERlc2NyaXB0aW9ufX0vZywgdGhpcy5tYXJrdXBUZW1wbGF0ZS5vcHRpb25hbC5kZXNjcmlwdGlvbik7XG5cdFx0XHRcdFx0XHRcdFx0cm93TWFya3VwID0gcm93TWFya3VwLnJlcGxhY2UoL3t7ZGVzY3JpcHRpb259fS9nLCB2YWx1ZSk7XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHQvKipcblx0XHRcdFx0XHRcdFx0ICog0KbQstC10YLQsCDQstGL0LLQvtC20YMg0L/RgNGP0LzQviDQsiDQstC40LTQtSDRgtC10LrRgdGC0LAsINC90L4g0L/Qvi3RhdC+0YDQvtGI0LXQvNGDINC90YPQttC90L4g0L7RgtC00LDQstCw0YLRjCDRh9C10YDQtdC3IEFQSSDQutC+0LRcblx0XHRcdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0XHRcdGlmIChmaWVsZE5hbWUgPT0gJ2NvbG9yJykge1xuXHRcdFx0XHRcdFx0XHRcdHJvd01hcmt1cCA9IHJvd01hcmt1cC5yZXBsYWNlKC97e29wdGlvbmFsQ29sb3Jib3h9fS9nLCB0aGlzLm1hcmt1cFRlbXBsYXRlLm9wdGlvbmFsLmNvbG9yQm94KTtcblx0XHRcdFx0XHRcdFx0XHRyb3dNYXJrdXAgPSByb3dNYXJrdXAucmVwbGFjZSgve3tjb2xvckNvZGV9fS9nLCB2YWx1ZSk7XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRpZiAoZmllbGROYW1lID09ICd5ZWFyJykge1xuXHRcdFx0XHRcdFx0XHRcdHJvd01hcmt1cCA9IHJvd01hcmt1cC5yZXBsYWNlKC97e3llYXJ9fS9nLCB2YWx1ZSk7XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRpZiAoZmllbGROYW1lID09ICdzdGF0dXMnKSB7XG5cdFx0XHRcdFx0XHRcdFx0Ly/QvtC/0LXRh9Cw0YLQutCwINCyINGB0YLQsNGC0YPRgdC1LCDQv9GA0LjQu9C10YLQsNC10YIg0YEg0JDQn9CYXG5cdFx0XHRcdFx0XHRcdFx0aWYgKHZhbHVlID09ICdwZWRuZGluZycpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHZhbHVlID0gJ3BlbmRpbmcnO1xuXHRcdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRcdGxldCBzdGF0dXNUZXh0ID0gdGhpcy5nZXRUZXh0KGBzdGF0dXMtLSR7dmFsdWV9YCk7XG5cdFx0XHRcdFx0XHRcdFx0cm93TWFya3VwID0gcm93TWFya3VwLnJlcGxhY2UoL3t7c3RhdHVzfX0vZywgKHN0YXR1c1RleHQpID8gc3RhdHVzVGV4dCA6ICctJyk7XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRpZiAoZmllbGROYW1lID09ICdwcmljZScpIHtcblx0XHRcdFx0XHRcdFx0XHRsZXQgcHJpY2UgPSB2YWx1ZTtcblx0XHRcdFx0XHRcdFx0XHRsZXQgcHJpY2VXaXRoVGF4ID0gQ1Rvb2xzLmdldFByaWNlV2l0aFRheCh2YWx1ZSwgdGhpcy50YXgpO1xuXHRcdFx0XHRcdFx0XHRcdGxldCBmb3JtYXR0ZWRQcmljZSA9IENUb29scy5mb3JtYXRNb25leSh2YWx1ZSwgdGhpcy5sb2NhbGUpO1xuXHRcdFx0XHRcdFx0XHRcdGxldCBmb3JtYXR0ZWRQcmljZVdpdGhUYXggPSBDVG9vbHMuZm9ybWF0TW9uZXkoQ1Rvb2xzLmdldFByaWNlV2l0aFRheCh2YWx1ZSwgdGhpcy50YXgpLCB0aGlzLmxvY2FsZSk7XG5cblx0XHRcdFx0XHRcdFx0XHRyb3dNYXJrdXAgPSByb3dNYXJrdXAucmVwbGFjZSgve3twcmljZX19L2csIHByaWNlKTtcblx0XHRcdFx0XHRcdFx0XHRyb3dNYXJrdXAgPSByb3dNYXJrdXAucmVwbGFjZSgve3tmb3JtYXR0ZWRQcmljZX19L2csIGAke2Zvcm1hdHRlZFByaWNlfSAke3RoaXMuZ2V0VGV4dCgnY3VycmVuY3knKX1gKTtcblx0XHRcdFx0XHRcdFx0XHRyb3dNYXJrdXAgPSByb3dNYXJrdXAucmVwbGFjZSgve3twcmljZVdpdGhUYXh9fS9nLCBwcmljZVdpdGhUYXgpO1xuXHRcdFx0XHRcdFx0XHRcdHJvd01hcmt1cCA9IHJvd01hcmt1cC5yZXBsYWNlKC97e2Zvcm1hdHRlZFByaWNlV2l0aFRheH19L2csIGAke2Zvcm1hdHRlZFByaWNlV2l0aFRheH0gJHt0aGlzLmdldFRleHQoJ2N1cnJlbmN5Jyl9YCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyb3dNYXJrdXAgPSByb3dNYXJrdXBcblx0XHRcdFx0XHRcdC5yZXBsYWNlKC97e29wdGlvbmFsRGVzY3JpcHRpb259fS9nLCAnJylcblx0XHRcdFx0XHRcdC5yZXBsYWNlKC97e29wdGlvbmFsQ29sb3Jib3h9fS9nLCAnJylcblx0XHRcdFx0XHRcdC5yZXBsYWNlKC97e3JlbW92ZUJ1dHRvblRleHR9fS9nLCB0aGlzLmdldFRleHQoJ3JlbW92ZV9idXR0b25fdGV4dCcpKTtcblxuXHRcdFx0XHRcdHJlc3VsdE1hcmt1cC5wdXNoKHJvd01hcmt1cCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoYkFwcGVuZCkge1xuXHRcdFx0dGhpcy4kdGFibGVSb3dDb250YWluZXIuYXBwZW5kKHJlc3VsdE1hcmt1cC5qb2luKCcnKSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuJHRhYmxlUm93Q29udGFpbmVyLmFwcGVuZChyZXN1bHRNYXJrdXAuam9pbignJykpO1xuXHRcdH1cblxuXHRcdHRoaXMudXBkYXRlU3VtbWFyeVByaWNlKCk7XG5cdH1cblxuXHR1cGRhdGVTdW1tYXJ5UHJpY2UoKSB7XG5cdFx0bGV0IHN1bW1hcnlQcmljZSA9IDA7XG5cblx0XHQkLmVhY2godGhpcy5nZXRSb3dzKCksIChpLCByb3cpID0+IHtcblx0XHRcdGxldCAkcm93ID0gJChyb3cpO1xuXHRcdFx0bGV0IHByaWNlID0gKCRyb3cuZmluZCgnLmpzLXByaWNlLXdpdGgtdGF4JykubGVuZ3RoKVxuXHRcdFx0XHQ/ICRyb3cuZmluZCgnLmpzLXByaWNlLXdpdGgtdGF4JykuYXR0cignZGF0YS1vcmlnaW5hbC1wcmljZS13aXRoLXRheCcpXG5cdFx0XHRcdDogJHJvdy5maW5kKCcuanMtcHJpY2UnKS5hdHRyKCdkYXRhLW9yaWdpbmFsLXByaWNlJyk7XG5cblx0XHRcdGlmIChwcmljZSkge1xuXHRcdFx0XHRzdW1tYXJ5UHJpY2UgPSBOdW1iZXIoc3VtbWFyeVByaWNlKSArIE51bWJlcihwcmljZSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHR0aGlzLiR0YWJsZVN1bW1hcnlQcmljZS5odG1sKGAke0NUb29scy5mb3JtYXRNb25leShOdW1iZXIoc3VtbWFyeVByaWNlKSwgdGhpcy5sb2NhbGUpfSAke3RoaXMuZ2V0VGV4dCgnY3VycmVuY3knKX1gKVxuXHR9XG5cblx0Z2V0Um93cygpIHtcblx0XHRyZXR1cm4gdGhpcy4kdGFibGVSb3dDb250YWluZXIuZmluZCgnW2RhdGEtcm93LWlkXScpO1xuXHR9XG5cblx0LyoqXG5cdCAqINCf0L7Qu9GD0YfQuNGC0Ywg0YLQtdC60YHRgiDQv9C+INC60L7QtNGDINC00LvRjyDQv9C10YDQtdC00LDQvdC90L7QuSDQu9C+0LrQsNC70Lhcblx0ICogQHBhcmFtIGxvY2FsZSAtINC70L7QutCw0LvRjFxuXHQgKiBAcGFyYW0gdGV4dCAtINGC0LXQutGB0YJcblx0ICogQHJldHVybnMge2Z1bmN0aW9uKCopfVxuXHQgKi9cblx0Z2V0VGV4dEJ5TG9jYWxlKGxvY2FsZSA9ICdydScsIHRleHQpIHtcblx0XHRyZXR1cm4gKHRleHQpID0+IHtcblx0XHRcdHJldHVybiAodGhpcy50ZXh0ICYmIHRoaXMudGV4dFtsb2NhbGVdICYmIHRoaXMudGV4dFtsb2NhbGVdW3RleHRdKSA/IHRoaXMudGV4dFtsb2NhbGVdW3RleHRdIDogZmFsc2U7XG5cdFx0fVxuXHR9XG5cblx0bG9ja1RhYmxlKCkge1xuXHRcdHRoaXMuJHRhYmxlV3JhcHBlci5hZGRDbGFzcygnaXMtcHJlbG9hZGluZycpO1xuXHR9XG5cblx0dW5sb2NrVGFibGUoKSB7XG5cdFx0dGhpcy4kdGFibGVXcmFwcGVyLnJlbW92ZUNsYXNzKCdpcy1wcmVsb2FkaW5nJyk7XG5cdH1cblxuXHRpc1RhYmxlTG9jaygpIHt9XG5cblx0LyoqXG5cdCAqINCS0YvQstC+0LTQuNGCINGB0L7QvtCx0YnQtdC90LjQtSDQsiDQsdC70L7QutC1INCy0LzQtdGB0YLQvlxuXHQgKiBAcGFyYW0gbXNnXG5cdCAqL1xuXHRzaG93VGFibGVOb3RpZmljYXRpb24obXNnID0gJycpIHtcblx0XHRpZiAobXNnKSB7XG5cdFx0XHR0aGlzLiR0YWJsZU5vdHkuaHRtbChtc2cpO1xuXHRcdFx0dGhpcy4kdGFibGVXcmFwcGVyLmFkZENsYXNzKCdpcy1ub3R5Jyk7XG5cdFx0fVxuXHR9XG5cblx0aXNOb1Jvd3MoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0Um93cygpLmxlbmd0aCA9PSAwO1xuXHR9XG5cblx0aW5pdERlbGV0ZVRyaWdnZXIoKSB7XG5cdFx0dGhpcy4kdGFibGVXcmFwcGVyLm9uKCdjbGljaycsICcuanMtZGVsZXRlLXRyaWdnZXInLCAoZSkgPT4ge1xuXHRcdFx0bGV0ICR0aGlzID0gJChlLmN1cnJlbnRUYXJnZXQpO1xuXHRcdFx0bGV0ICRyb3cgPSAkdGhpcy5jbG9zZXN0KCdbZGF0YS1yb3ctaWRdJyk7XG5cblx0XHRcdGlmICgkcm93Lmxlbmd0aCkge1xuXHRcdFx0XHR0aGlzLmxvY2tUYWJsZSgpO1xuXG5cdFx0XHRcdFByb21pc2UucmVzb2x2ZSgpXG5cdFx0XHRcdFx0LmRlbGF5KDEwMCkgLy/Rh9C40YHRgtC+INC00LvRjyDQtNC10LzQvtC90YHRgtGA0LDRhtC40Lgg0YDQsNCx0L7RgtGLINGBINGB0LXRgNCy0LXRgNC+0Lxcblx0XHRcdFx0XHQudGhlbigoKSA9PiB7XG5cdFx0XHRcdFx0XHQkcm93LnJlbW92ZSgpO1xuXG5cdFx0XHRcdFx0XHRpZiAodGhpcy5pc05vUm93cygpKSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMuc2hvd1RhYmxlTm90aWZpY2F0aW9uKHRoaXMuZ2V0VGV4dCgnZXJyb3ItLWVtcHR5X2RhdGEnKSk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHRoaXMudXBkYXRlU3VtbWFyeVByaWNlKCk7XG5cdFx0XHRcdFx0XHR0aGlzLnVubG9ja1RhYmxlKCk7XG5cdFx0XHRcdFx0fSlcblx0XHRcdH1cblx0XHR9KVxuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQ0NhcmFtYmFDb250cm9sbGVyO1xuIiwiLyoqXG4gKiDQktGB0L/QvtC80L7Qs9Cw0YLQtdC70YzQvdGL0LUg0YTRg9C90LrRhtC40LhcbiAqL1xuY2xhc3MgQ1Rvb2xzIHtcblx0Y29uc3RydWN0b3IoKSB7fVxuXG5cdC8qKlxuXHQgKiDQutC70L7QvdC40YDQvtCy0LDQvdC40LUg0L7QsdGK0LXQutGC0LAg0LHQtdC3INC/0YDQuNCy0Y/Qt9C60Lgg0L/QviDRgdGB0YvQu9C60LVcblx0ICogQHBhcmFtIG9iamVjdFxuXHQgKi9cblx0c3RhdGljIGNsb25lT2JqZWN0IChvYmplY3QgPSB7fSkge1xuXHRcdHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9iamVjdCkpO1xuXHR9XG5cblx0LyoqXG5cdCAqINCk0L7RgNC80LDRgtC40YDQvtCw0L3QuNC1INGB0YLRgNC+0LrQuCDQsiDQtNC10L3QtdC20L3Ri9C5INCy0LjQtFxuXHQgKiBAcGFyYW0gcHJpY2Vcblx0ICogQHBhcmFtIGxvY2FsZVxuXHQgKiBAcmV0dXJucyB7Kn1cblx0ICovXG5cdHN0YXRpYyBmb3JtYXRNb25leShwcmljZSwgbG9jYWxlID0gJ3J1Jykge1xuXHRcdGxldCBuUHJpY2UgPSBOdW1iZXIocHJpY2UpO1xuXG5cdFx0aWYgKCFpc05hTihuUHJpY2UpKSB7XG5cdFx0XHRyZXR1cm4gblByaWNlLnRvTG9jYWxlU3RyaW5nKGxvY2FsZSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBwcmljZTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICog0KbQtdC90LAgKyDQvdCw0LvQvtCzXG5cdCAqIEBwYXJhbSBwcmljZVxuXHQgKiBAcGFyYW0gdGF4XG5cdCAqIEBwYXJhbSBwcmVjaXNpb25cblx0ICovXG5cdHN0YXRpYyBnZXRQcmljZVdpdGhUYXgocHJpY2UsIHRheCA9IDEzLCBwcmVjaXNpb24gPSAwKSB7XG5cdFx0bGV0IG5QcmljZSA9IE51bWJlcihwcmljZSk7XG5cdFx0bGV0IG5UYXggPSBOdW1iZXIodGF4KTtcblxuXHRcdGlmICghaXNOYU4oblByaWNlKSAmJiAhaXNOYU4oblRheCkpIHtcblx0XHRcdGxldCBwcmljZVdpdGhUYXggPSAoKG5QcmljZSAqIG5UYXggLyAxMDApICsgblByaWNlKTtcblx0XHRcdHJldHVybiAocHJpY2VXaXRoVGF4ICUgMSA9PT0gMCkgPyBwcmljZVdpdGhUYXggOiBwcmljZVdpdGhUYXgudG9GaXhlZChwcmVjaXNpb24pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gcHJpY2U7XG5cdFx0fVxuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQ1Rvb2xzO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==