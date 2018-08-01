webpackJsonp([0],{

/***/ 13:
/* no static exports found */
/* all exports used */
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($, global) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CCarambaController = __webpack_require__(/*! ./parts/CCaramba */ 4);
var CTools = __webpack_require__(/*! ./parts/CTools */ 2);

Promise.config({
	// Enable warnings
	warnings: !false,
	// Enable long stack traces
	longStackTraces: !false,
	// Enable cancellation
	cancellation: !false,
	// Enable monitoring
	monitoring: !false
});

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

				_this.initSmartLabels();
				_this.initCustomSelects();
				_this.initMasks();
				_this.initCustomFormValidators();

				_this.cCarambaController.init();
			});
		}

		/**
   * Инициализация умных плейсхолдеров
   */

	}, {
		key: 'initSmartLabels',
		value: function initSmartLabels() {
			var $smartLabels = $('.js-smart-label--input');

			if ($smartLabels.length) {
				$smartLabels.on('blur', function () {
					var $this = $(this);

					$this.toggleClass('is-fill', $this.val() !== '');
				}).blur();
			}
		}

		/**
   * Инициализация кастомных селектов
   */

	}, {
		key: 'initCustomSelects',
		value: function initCustomSelects() {
			var $selects = $('[data-is-custom-select]');

			if ($selects.length) {
				$selects.select2({});
			}
		}

		/**
   * Кастомные типы валидаций
   */

	}, {
		key: 'initCustomFormValidators',
		value: function initCustomFormValidators() {
			window.Parsley.addValidator('productionYear', {
				validateString: function validateString(value) {
					return Number(value) >= 1980 && Number(value) <= new Date().getFullYear();
				},
				messages: {
					ru: '\u0413\u043E\u0434 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u0437\u0430\u0434\u0430\u043D \u043E\u0442 1980 \u0434\u043E ' + new Date().getFullYear()
				}
			});
		}

		/**
   * Маски
   */

	}, {
		key: 'initMasks',
		value: function initMasks() {
			var $yearMask = $('[data-year-mask]');
			var $moneyMask = $('[data-money-mask]');

			if ($yearMask.length) {
				$yearMask.mask('9999');
			}

			if ($moneyMask.length) {
				//ru
				$moneyMask.maskMoney({
					thousands: ' ',
					decimal: '.',
					allowNoDecimal: true
				});
			}
		}
	}]);

	return CAppController;
}();

var cAppController = new CAppController();

$(document).ready(function () {
	cAppController.init().then(function () {
		//выбрасываем в global для доступа
		global.AC = cAppController;
	});
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ 1), __webpack_require__(/*! ./../../~/webpack/buildin/global.js */ 0)))

/***/ }),

/***/ 2:
/* no static exports found */
/* all exports used */
/*!********************************!*\
  !*** ./src/js/parts/CTools.js ***!
  \********************************/
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
  * Клонирование объекта без привязки по ссылке
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

/***/ }),

/***/ 4:
/* no static exports found */
/* all exports used */
/*!**********************************!*\
  !*** ./src/js/parts/CCaramba.js ***!
  \**********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CTools = __webpack_require__(/*! ./CTools */ 2);

/**
 * Контроллер для работы с подргрузкой и обновлением табличных данных об автомобилях
 * Т.к. по одной странице нельзя ничего сказать о всем проекте в целом, то данный контроллер
 * служит скорее для демонстрацинных целей и заточен под работу с конкретными данными и конкретнйо формой
 */

var CCarambaController = function () {
	function CCarambaController() {
		_classCallCheck(this, CCarambaController);

		//данные для загрузки
		this.loadUrl = 'https://rawgit.com/Varinetz/e6cbadec972e76a340c41a65fcc2a6b3/raw/90191826a3bac2ff0761040ed1d95c59f14eaf26/frontend_test_table.json';

		/**
   * Локализация. В перспективах равзития это следует выносить в отдельный json-файл,
   * либо как-то пробрасывать из базы.
   * @type {{ru: {status: {pending: string, out_of_stock: string, in_stock: string}, removeButtonText: string}, en: {}}}
   */
		this.text = {
			ru: {
				'status--pending': 'Ожидается',
				'status--out_of_stock': 'Нет в наличии',
				'status--in_stock': 'В наличии',
				'error--load_error': 'Ошибка загрузки данных',
				'error--empty_data': 'Нет данных для отображения',
				remove_button_text: 'Удалить',
				currency: 'руб.'
			},
			en: {}
		};

		//локаль
		this.locale = 'ru';
		//значение налоговой ставки по-умолчанию
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
   * scaffold - скелет разметки. Также в нем присутствуют опциональные части, которые описание в optional
   * @type {{scaffold: string, optional: {description: string, colorBox: string}}}
   */
		this.markupTemplate = {
			scaffold: '\n\t\t\t\t<div class="b-custom-table__row" data-row-id="{{id}}">\n\t\t\t\t  <div class="b-custom-table__cell b-custom-table__cell--title">\n\t\t\t\t    <div class="title">{{title}}</div>\n\t\t\t\t    {{optionalDescription}}\n\t\t\t\t  </div>\n\t\t\t\t  <div class="b-custom-table__cell b-custom-table__cell--year">{{year}}</div>\n\t\t\t\t  <div class="b-custom-table__cell b-custom-table__cell--color">\n\t\t\t\t    {{optionalColorbox}}\n\t\t\t\t  </div>\n\t\t\t\t  <div class="b-custom-table__cell b-custom-table__cell--status">{{status}}</div>\n\t\t\t\t  <div class="b-custom-table__cell b-custom-table__cell--price">\n\t\t\t\t    <nobr class="price js-price" data-original-price="{{price}}">{{formattedPrice}}</nobr>\n\t\t\t\t    <nobr class="price-with-tax js-price-with-tax" data-original-price-with-tax="{{priceWithTax}}">{{formattedPriceWithTax}}</nobr>\n\t\t\t\t  </div>\n\t\t\t\t  <div class="b-custom-table__cell b-custom-table__cell--action">\n\t\t\t\t    <button class="i-button i-button--ellipse i-button--size-small js-delete-trigger">{{removeButtonText}}</button>\n\t\t\t\t  </div>\n\t\t\t\t</div>\n\t\t\t',
			optional: {
				description: '<div class="description">{{description}}</div>',
				colorBox: '<div class="i-color-box" style="background-color: {{colorCode}}"></div>'
			}
		};

		this.$tableWrapper = null;
	}

	/**
  * Инициализация логики работы контроллера
  */


	_createClass(CCarambaController, [{
		key: 'init',
		value: function init() {
			var _this = this;

			//таблица
			this.$tableWrapper = $('#caramba-table');
			//форма
			this.$form = $('#caramba-form');

			if (this.$tableWrapper.length && this.$form.length) {
				//тело таблицы
				this.$tableRowContainer = this.$tableWrapper.find('.js-body');
				//блок для уведомлений
				this.$tableNoty = this.$tableWrapper.find('.js-noty');
				//итоговая цена
				this.$tableSummaryPrice = this.$tableWrapper.find('.js-summary-price');

				//триггер для удаления строк
				this.initDeleteTrigger();
				//инициализации логики работы с формой
				this.initForm();

				this.lockTable();
				this.loadData().then(function (data) {
					return Promise.resolve().delay(1000) //эмуляция долгого ответа от сервера
					.then(function () {
						if (Object.keys(data).length) {
							//обновление данных в таблицк
							_this.updateTableWithData(data);
						} else {
							_this.showTableNotification(_this.getText('error--empty_data'));
						}
					});
				}).then(function () {
					_this.unlockTable();
				}).catch(function (msg) {
					//TODO обработка ошибок
					_this.unlockTable();
					_this.showTableNotification(_this.getText('error--load_error'));
				});
			}
		}

		/**
   * Инициализация работы с формой
   */

	}, {
		key: 'initForm',
		value: function initForm() {
			var _this2 = this;

			this.$form.parsley().on('form:submit', function (form) {
				var data = {};

				if (_this2.isTableLock()) {
					return false;
				}

				_this2.lockTable();

				//обходим все поля формы и собираем данные
				for (var field in form.fields) {
					if (form.fields.hasOwnProperty(field)) {
						var fieldName = form.fields[field].$element.attr('data-field-type');
						var value = form.fields[field].getValue();

						if (fieldName == 'price') {
							data[fieldName] = value.replace(/\s/g, '').replace(/,/g, '.');
						} else {
							data[fieldName] = value;
						}
					}
				}

				//получаем условно уникальный ID для нового элемента
				data.id = _this2.generateUniqRowID();

				var preparedData = [];
				preparedData.push(data);

				//добавляем элементв в локальное хранилищец
				_this2.addRowToLocalStorage(data);

				//обновление
				_this2.updateTableWithData(preparedData, true);

				_this2.resetForm(form);

				_this2.unlockTable();

				return false;
			});
		}

		/**
   * Сбросить поля в форме
   * @param parsleyForm
   */

	}, {
		key: 'resetForm',
		value: function resetForm(parsleyForm) {
			var $form = $(parsleyForm.$element);
			var $customSelects = $form.find('[data-is-custom-select]');

			//сбрасываем значения форм
			parsleyForm.$element[0].reset();
			$form.parsley().reset();

			//обходим все поля формы и сбрасываем заполненность полей
			for (var field in parsleyForm.fields) {
				if (parsleyForm.fields.hasOwnProperty(field)) {
					parsleyForm.fields[field].$element.removeClass('is-fill');
				}
			}

			if ($customSelects.length) {
				$.each($customSelects, function (i, select) {
					$(select).val('').trigger('change');
				});
			}
		}

		/**
   * Инициализация логики удаления строк из таблицы
   */

	}, {
		key: 'initDeleteTrigger',
		value: function initDeleteTrigger() {
			var _this3 = this;

			this.$tableWrapper.on('click', '.js-delete-trigger', function (e) {
				var $this = $(e.currentTarget);
				var $row = $this.closest('[data-row-id]');

				if ($row.length) {
					var rowID = $row.attr('data-row-id');

					_this3.lockTable();

					Promise.resolve().delay(100) //чисто для демонстрации работы с сервером
					.then(function () {
						$row.remove();
						_this3.deleteRowFromLocalStorage(rowID);
						_this3.updateTableViewStatus();
						_this3.updateSummaryPrice();
						_this3.unlockTable();
					});
				}
			});
		}

		/**
   * Подгрузка данный с удаленного источника
   * Баг в IE10 и IE11 на Windows 7 и Windows 8.1 http://take.ms/zBF8j
   * @returns {Promise.<TResult>}
   */

	}, {
		key: 'loadData',
		value: function loadData() {
			var _this4 = this;

			return new Promise(function (resolve, reject) {
				$.ajax({
					url: _this4.loadUrl,
					data: {},
					dataType: 'json',
					success: function success(data) {
						resolve(data);
					},
					error: function error(jqXHR, textStatus, _error) {
						reject();
					},
					cache: false
				});
			}).then(function (data) {
				var localData = _this4.getAllRowsFromLocalStorage();

				if (localData) {
					return $.extend({}, localData, data);
				} else {
					return data;
				}
			});
		}

		/**
   * Вывод данных в шаблонную строку и добавление данныех
   * TODO дополнительная безопасная обработка данных с серва
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
					if (typeof data[row].id != 'undefined' && typeof data[row].title != 'undefined') {
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
         * Цвета вывожу прямо в виде текста, но по-хорошему нужно отдавать хэш через API
         */
								if (fieldName == 'color') {
									if (value) {
										rowMarkup = rowMarkup.replace(/{{optionalColorbox}}/g, this.markupTemplate.optional.colorBox);
										rowMarkup = rowMarkup.replace(/{{colorCode}}/g, value);
									} else {
										rowMarkup = rowMarkup.replace(/{{optionalColorbox}}/g, '');
									}
								}

								if (fieldName == 'year') {
									rowMarkup = rowMarkup.replace(/{{year}}/g, value);
								}

								if (fieldName == 'status') {
									//опечатка в статусе, в таком виде прилетает с АПИ
									if (value == 'pednding') {
										value = 'pending';
									}

									var statusText = this.getText('status--' + value);
									rowMarkup = rowMarkup.replace(/{{status}}/g, statusText ? statusText : '-');
								}

								if (fieldName == 'price') {
									var price = typeof value == 'string' ? value.replace(/\s/g, '').replace(/,/g, '.') : value;
									var priceWithTax = CTools.getPriceWithTax(price, this.tax, 2);
									var formattedPrice = CTools.formatMoney(price, this.locale);
									var formattedPriceWithTax = CTools.formatMoney(priceWithTax, this.locale);

									rowMarkup = rowMarkup.replace(/{{price}}/g, price);
									rowMarkup = rowMarkup.replace(/{{formattedPrice}}/g, formattedPrice + ' ' + this.getText('currency'));
									rowMarkup = rowMarkup.replace(/{{priceWithTax}}/g, priceWithTax);
									rowMarkup = rowMarkup.replace(/{{formattedPriceWithTax}}/g, formattedPriceWithTax + ' ' + this.getText('currency'));
								}
							}
						}

						rowMarkup = rowMarkup.replace(/{{removeButtonText}}/g, this.getText('remove_button_text'));

						resultMarkup.push(rowMarkup);
					}
				}
			}

			if (bAppend) {
				this.$tableRowContainer.append(resultMarkup.join(''));
			} else {
				this.$tableRowContainer.html('');
				this.$tableRowContainer.append(resultMarkup.join(''));
			}

			this.updateSummaryPrice();
			this.updateTableViewStatus();
		}

		/**
   * Обновление итоговой суммы таблицы
   */

	}, {
		key: 'updateSummaryPrice',
		value: function updateSummaryPrice() {
			var summaryPrice = 0;

			$.each(this.getRows(), function (i, row) {
				var $row = $(row);
				var price = $row.find('.js-price-with-tax').length ? $row.find('.js-price-with-tax').attr('data-original-price-with-tax') : $row.find('.js-price').attr('data-original-price');

				if (price) {
					if (!isNaN(summaryPrice) && !isNaN(price)) {
						summaryPrice = Number(summaryPrice) + Number(price);
					}
				}
			});

			this.$tableSummaryPrice.html(CTools.formatMoney(Number(summaryPrice), this.locale) + ' ' + this.getText('currency'));
		}

		/**
   * Получить все строки из таблицы
   */

	}, {
		key: 'getRows',
		value: function getRows() {
			return this.$tableRowContainer.find('[data-row-id]');
		}

		/**
   * Добавить данные о записи в localStorage
   * @param data
   */

	}, {
		key: 'addRowToLocalStorage',
		value: function addRowToLocalStorage(data) {
			if (data && data.id && localStorage) {
				localStorage.setItem('autoParts--row-' + data.id, JSON.stringify(data));
			}
		}

		/**
   * Получить данные из localStorage
   * @returns {*}
   */

	}, {
		key: 'getAllRowsFromLocalStorage',
		value: function getAllRowsFromLocalStorage() {
			var data = {};

			if (!localStorage) {
				return false;
			}

			for (var key in localStorage) {
				if (localStorage.hasOwnProperty(key)) {
					if (key.indexOf('autoParts--row') != -1) {
						var obj = JSON.parse(localStorage.getItem(key));
						data[obj.id] = obj;
					}
				}
			}

			return Object.keys(data).length ? data : false;
		}

		/**
   * Удалить данные из localStorage
   * @param id
   */

	}, {
		key: 'deleteRowFromLocalStorage',
		value: function deleteRowFromLocalStorage(id) {
			if (localStorage.getItem('autoParts--row-' + id)) {
				localStorage.removeItem('autoParts--row-' + id);
			}
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
			var _this5 = this;

			var locale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'ru';
			var text = arguments[1];

			return function (text) {
				return _this5.text && _this5.text[locale] && _this5.text[locale][text] ? _this5.text[locale][text] : false;
			};
		}

		/**
   * Получить условно уникальный id
   * @returns {number}
   */

	}, {
		key: 'generateUniqRowID',
		value: function generateUniqRowID() {
			var uniqID = 0;
			var existedID = [];

			$.each(this.getRows(), function (i, row) {
				existedID.push($(row).attr('data-row-id'));
			});

			if (existedID.length) {
				var max = Math.max.apply(null, existedID.map(Number));
				uniqID = max + 1;
			}

			return uniqID;
		}

		/**
   * Выводит сообщение в информационном табличном блоке
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

		/**
   * Проверяет, есть ли в таблице данные для показа. Если нет - выводит уведомление
   */

	}, {
		key: 'updateTableViewStatus',
		value: function updateTableViewStatus() {
			if (this.isNoRows()) {
				this.showTableNotification(this.getText('error--empty_data'));
			} else {
				this.$tableWrapper.removeClass('is-noty');
			}
		}

		/**
   * Проверяет, пуста ил таблица
   * @returns {boolean}
   */

	}, {
		key: 'isNoRows',
		value: function isNoRows() {
			return this.getRows().length == 0;
		}

		/**
   * Блокировка таблицы
   */

	}, {
		key: 'lockTable',
		value: function lockTable() {
			this.$tableWrapper.addClass('is-preloading');
		}

		/**
   * Разблокировка таблицы
   */

	}, {
		key: 'unlockTable',
		value: function unlockTable() {
			this.$tableWrapper.removeClass('is-preloading');
		}

		/**
   * Таблица заблокирована?
   */

	}, {
		key: 'isTableLock',
		value: function isTableLock() {
			return this.$tableWrapper.hasClass('is-preloading');
		}
	}]);

	return CCarambaController;
}();

module.exports = CCarambaController;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ 1)))

/***/ })

},[13]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcGFydHMvQ1Rvb2xzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9wYXJ0cy9DQ2FyYW1iYS5qcyJdLCJuYW1lcyI6WyJDQ2FyYW1iYUNvbnRyb2xsZXIiLCJyZXF1aXJlIiwiQ1Rvb2xzIiwiUHJvbWlzZSIsImNvbmZpZyIsIndhcm5pbmdzIiwibG9uZ1N0YWNrVHJhY2VzIiwiY2FuY2VsbGF0aW9uIiwibW9uaXRvcmluZyIsInByb2R1Y3Rpb24iLCJDQXBwQ29udHJvbGxlciIsImNDYXJhbWJhQ29udHJvbGxlciIsImNUb29scyIsInJlc29sdmUiLCJ0aGVuIiwiaW5pdFNtYXJ0TGFiZWxzIiwiaW5pdEN1c3RvbVNlbGVjdHMiLCJpbml0TWFza3MiLCJpbml0Q3VzdG9tRm9ybVZhbGlkYXRvcnMiLCJpbml0IiwiJHNtYXJ0TGFiZWxzIiwiJCIsImxlbmd0aCIsIm9uIiwiJHRoaXMiLCJ0b2dnbGVDbGFzcyIsInZhbCIsImJsdXIiLCIkc2VsZWN0cyIsInNlbGVjdDIiLCJ3aW5kb3ciLCJQYXJzbGV5IiwiYWRkVmFsaWRhdG9yIiwidmFsaWRhdGVTdHJpbmciLCJ2YWx1ZSIsIk51bWJlciIsIkRhdGUiLCJnZXRGdWxsWWVhciIsIm1lc3NhZ2VzIiwicnUiLCIkeWVhck1hc2siLCIkbW9uZXlNYXNrIiwibWFzayIsIm1hc2tNb25leSIsInRob3VzYW5kcyIsImRlY2ltYWwiLCJhbGxvd05vRGVjaW1hbCIsImNBcHBDb250cm9sbGVyIiwiZG9jdW1lbnQiLCJyZWFkeSIsImdsb2JhbCIsIkFDIiwib2JqZWN0IiwiSlNPTiIsInBhcnNlIiwic3RyaW5naWZ5IiwicHJpY2UiLCJsb2NhbGUiLCJuUHJpY2UiLCJpc05hTiIsInRvTG9jYWxlU3RyaW5nIiwidGF4IiwicHJlY2lzaW9uIiwiblRheCIsInByaWNlV2l0aFRheCIsInRvRml4ZWQiLCJtb2R1bGUiLCJleHBvcnRzIiwibG9hZFVybCIsInRleHQiLCJyZW1vdmVfYnV0dG9uX3RleHQiLCJjdXJyZW5jeSIsImVuIiwiZ2V0VGV4dCIsImdldFRleHRCeUxvY2FsZSIsIm1hcmt1cFRlbXBsYXRlIiwic2NhZmZvbGQiLCJvcHRpb25hbCIsImRlc2NyaXB0aW9uIiwiY29sb3JCb3giLCIkdGFibGVXcmFwcGVyIiwiJGZvcm0iLCIkdGFibGVSb3dDb250YWluZXIiLCJmaW5kIiwiJHRhYmxlTm90eSIsIiR0YWJsZVN1bW1hcnlQcmljZSIsImluaXREZWxldGVUcmlnZ2VyIiwiaW5pdEZvcm0iLCJsb2NrVGFibGUiLCJsb2FkRGF0YSIsImRhdGEiLCJkZWxheSIsIk9iamVjdCIsImtleXMiLCJ1cGRhdGVUYWJsZVdpdGhEYXRhIiwic2hvd1RhYmxlTm90aWZpY2F0aW9uIiwidW5sb2NrVGFibGUiLCJjYXRjaCIsIm1zZyIsInBhcnNsZXkiLCJmb3JtIiwiaXNUYWJsZUxvY2siLCJmaWVsZCIsImZpZWxkcyIsImhhc093blByb3BlcnR5IiwiZmllbGROYW1lIiwiJGVsZW1lbnQiLCJhdHRyIiwiZ2V0VmFsdWUiLCJyZXBsYWNlIiwiaWQiLCJnZW5lcmF0ZVVuaXFSb3dJRCIsInByZXBhcmVkRGF0YSIsInB1c2giLCJhZGRSb3dUb0xvY2FsU3RvcmFnZSIsInJlc2V0Rm9ybSIsInBhcnNsZXlGb3JtIiwiJGN1c3RvbVNlbGVjdHMiLCJyZXNldCIsInJlbW92ZUNsYXNzIiwiZWFjaCIsImkiLCJzZWxlY3QiLCJ0cmlnZ2VyIiwiZSIsImN1cnJlbnRUYXJnZXQiLCIkcm93IiwiY2xvc2VzdCIsInJvd0lEIiwicmVtb3ZlIiwiZGVsZXRlUm93RnJvbUxvY2FsU3RvcmFnZSIsInVwZGF0ZVRhYmxlVmlld1N0YXR1cyIsInVwZGF0ZVN1bW1hcnlQcmljZSIsInJlamVjdCIsImFqYXgiLCJ1cmwiLCJkYXRhVHlwZSIsInN1Y2Nlc3MiLCJlcnJvciIsImpxWEhSIiwidGV4dFN0YXR1cyIsImNhY2hlIiwibG9jYWxEYXRhIiwiZ2V0QWxsUm93c0Zyb21Mb2NhbFN0b3JhZ2UiLCJleHRlbmQiLCJiQXBwZW5kIiwicmVzdWx0TWFya3VwIiwicm93IiwidGl0bGUiLCJyb3dNYXJrdXAiLCJzdGF0dXNUZXh0IiwiZ2V0UHJpY2VXaXRoVGF4IiwiZm9ybWF0dGVkUHJpY2UiLCJmb3JtYXRNb25leSIsImZvcm1hdHRlZFByaWNlV2l0aFRheCIsImFwcGVuZCIsImpvaW4iLCJodG1sIiwic3VtbWFyeVByaWNlIiwiZ2V0Um93cyIsImxvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJrZXkiLCJpbmRleE9mIiwib2JqIiwiZ2V0SXRlbSIsInJlbW92ZUl0ZW0iLCJ1bmlxSUQiLCJleGlzdGVkSUQiLCJtYXgiLCJNYXRoIiwiYXBwbHkiLCJtYXAiLCJhZGRDbGFzcyIsImlzTm9Sb3dzIiwiaGFzQ2xhc3MiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBTUEscUJBQXFCLG1CQUFBQyxDQUFRLHlCQUFSLENBQTNCO0FBQ0EsSUFBTUMsU0FBUyxtQkFBQUQsQ0FBUSx1QkFBUixDQUFmOztBQUVBRSxRQUFRQyxNQUFSLENBQWU7QUFDZDtBQUNBQyxXQUFVLENBQUMsS0FGRztBQUdkO0FBQ0FDLGtCQUFpQixDQUFDLEtBSko7QUFLZDtBQUNBQyxlQUFjLENBQUMsS0FORDtBQU9kO0FBQ0FDLGFBQVksQ0FBQyxLQUFBQztBQVJDLENBQWY7O0FBV0E7Ozs7SUFHTUMsYztBQUNMLDJCQUFjO0FBQUE7O0FBQ2IsT0FBS0Msa0JBQUwsR0FBMEIsSUFBSVgsa0JBQUosRUFBMUI7QUFDQSxPQUFLWSxNQUFMLEdBQWMsSUFBSVYsTUFBSixFQUFkO0FBQ0E7Ozs7eUJBRU07QUFBQTs7QUFDTixVQUFPQyxRQUFRVSxPQUFSLEdBQ0xDLElBREssQ0FDQSxZQUFNOztBQUVYLFVBQUtDLGVBQUw7QUFDQSxVQUFLQyxpQkFBTDtBQUNBLFVBQUtDLFNBQUw7QUFDQSxVQUFLQyx3QkFBTDs7QUFFQSxVQUFLUCxrQkFBTCxDQUF3QlEsSUFBeEI7QUFDQSxJQVRL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QjZGLFFBQW5CLENBQTRCLFNBQTVCO0FBQ0E7QUFDRDs7QUFFRDs7Ozs7OzBDQUd3QjtBQUN2QixPQUFJLEtBQUtDLFFBQUwsRUFBSixFQUFxQjtBQUNwQixTQUFLL0UscUJBQUwsQ0FBMkIsS0FBS3RCLE9BQUwsQ0FBYSxtQkFBYixDQUEzQjtBQUNBLElBRkQsTUFFTztBQUNOLFNBQUtPLGFBQUwsQ0FBbUJ1QyxXQUFuQixDQUErQixTQUEvQjtBQUNBO0FBQ0Q7O0FBRUQ7Ozs7Ozs7NkJBSVc7QUFDVixVQUFPLEtBQUt3QyxPQUFMLEdBQWV6SSxNQUFmLElBQXlCLENBQWhDO0FBQ0E7O0FBRUQ7Ozs7Ozs4QkFHWTtBQUNYLFFBQUswRCxhQUFMLENBQW1CNkYsUUFBbkIsQ0FBNEIsZUFBNUI7QUFDQTs7QUFFRDs7Ozs7O2dDQUdjO0FBQ2IsUUFBSzdGLGFBQUwsQ0FBbUJ1QyxXQUFuQixDQUErQixlQUEvQjtBQUNBOztBQUVEOzs7Ozs7Z0NBR2M7QUFDYixVQUFPLEtBQUt2QyxhQUFMLENBQW1CK0YsUUFBbkIsQ0FBNEIsZUFBNUIsQ0FBUDtBQUNBOzs7Ozs7QUFHRjdHLE9BQU9DLE9BQVAsR0FBaUJuRSxrQkFBakIsQyIsImZpbGUiOiJtYWluLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IENDYXJhbWJhQ29udHJvbGxlciA9IHJlcXVpcmUoJy4vcGFydHMvQ0NhcmFtYmEnKTtcbmNvbnN0IENUb29scyA9IHJlcXVpcmUoJy4vcGFydHMvQ1Rvb2xzJyk7XG5cblByb21pc2UuY29uZmlnKHtcblx0Ly8gRW5hYmxlIHdhcm5pbmdzXG5cdHdhcm5pbmdzOiAhcHJvZHVjdGlvbixcblx0Ly8gRW5hYmxlIGxvbmcgc3RhY2sgdHJhY2VzXG5cdGxvbmdTdGFja1RyYWNlczogIXByb2R1Y3Rpb24sXG5cdC8vIEVuYWJsZSBjYW5jZWxsYXRpb25cblx0Y2FuY2VsbGF0aW9uOiAhcHJvZHVjdGlvbixcblx0Ly8gRW5hYmxlIG1vbml0b3Jpbmdcblx0bW9uaXRvcmluZzogIXByb2R1Y3Rpb25cbn0pO1xuXG4vKipcbiAqINCT0LvQsNCy0L3Ri9C5INC60L7QvdGC0YDQvtC70LvQtdGAXG4gKi9cbmNsYXNzIENBcHBDb250cm9sbGVyIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0dGhpcy5jQ2FyYW1iYUNvbnRyb2xsZXIgPSBuZXcgQ0NhcmFtYmFDb250cm9sbGVyKCk7XG5cdFx0dGhpcy5jVG9vbHMgPSBuZXcgQ1Rvb2xzKCk7XG5cdH1cblxuXHRpbml0KCkge1xuXHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxuXHRcdFx0LnRoZW4oKCkgPT4ge1xuXG5cdFx0XHRcdHRoaXMuaW5pdFNtYXJ0TGFiZWxzKCk7XG5cdFx0XHRcdHRoaXMuaW5pdEN1c3RvbVNlbGVjdHMoKTtcblx0XHRcdFx0dGhpcy5pbml0TWFza3MoKTtcblx0XHRcdFx0dGhpcy5pbml0Q3VzdG9tRm9ybVZhbGlkYXRvcnMoKTtcblxuXHRcdFx0XHR0aGlzLmNDYXJhbWJhQ29udHJvbGxlci5pbml0KCk7XG5cdFx0XHR9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiDQmNC90LjRhtC40LDQu9C40LfQsNGG0LjRjyDRg9C80L3Ri9GFINC/0LvQtdC50YHRhdC+0LvQtNC10YDQvtCyXG5cdCAqL1xuXHRpbml0U21hcnRMYWJlbHMoKSB7XG5cdFx0Y29uc3QgJHNtYXJ0TGFiZWxzID0gJCgnLmpzLXNtYXJ0LWxhYmVsLS1pbnB1dCcpO1xuXG5cdFx0aWYgKCRzbWFydExhYmVscy5sZW5ndGgpIHtcblx0XHRcdCRzbWFydExhYmVscy5vbignYmx1cicsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0bGV0ICR0aGlzID0gJCh0aGlzKTtcblxuXHRcdFx0XHQkdGhpcy50b2dnbGVDbGFzcygnaXMtZmlsbCcsICR0aGlzLnZhbCgpICE9PSAnJyk7XG5cdFx0XHR9KS5ibHVyKCk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqINCY0L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPINC60LDRgdGC0L7QvNC90YvRhSDRgdC10LvQtdC60YLQvtCyXG5cdCAqL1xuXHRpbml0Q3VzdG9tU2VsZWN0cygpIHtcblx0XHRjb25zdCAkc2VsZWN0cyA9ICQoJ1tkYXRhLWlzLWN1c3RvbS1zZWxlY3RdJyk7XG5cblx0XHRpZiAoJHNlbGVjdHMubGVuZ3RoKSB7XG5cdFx0XHQkc2VsZWN0cy5zZWxlY3QyKHtcblxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqINCa0LDRgdGC0L7QvNC90YvQtSDRgtC40L/RiyDQstCw0LvQuNC00LDRhtC40Llcblx0ICovXG5cdGluaXRDdXN0b21Gb3JtVmFsaWRhdG9ycygpIHtcblx0XHR3aW5kb3cuUGFyc2xleS5hZGRWYWxpZGF0b3IoJ3Byb2R1Y3Rpb25ZZWFyJywge1xuXHRcdFx0dmFsaWRhdGVTdHJpbmc6IGZ1bmN0aW9uICh2YWx1ZSkge1xuXHRcdFx0XHRyZXR1cm4gTnVtYmVyKHZhbHVlKSA+PSAxOTgwICYmIE51bWJlcih2YWx1ZSkgPD0gbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpO1xuXHRcdFx0fSxcblx0XHRcdG1lc3NhZ2VzOiB7XG5cdFx0XHRcdHJ1OiBg0JPQvtC0INC80L7QttC10YIg0LHRi9GC0Ywg0LfQsNC00LDQvSDQvtGCIDE5ODAg0LTQviAke25ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKX1gXG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0fVxuXG5cdC8qKlxuXHQgKiDQnNCw0YHQutC4XG5cdCAqL1xuXHRpbml0TWFza3MoKSB7XG5cdFx0bGV0ICR5ZWFyTWFzayA9ICQoJ1tkYXRhLXllYXItbWFza10nKTtcblx0XHRsZXQgJG1vbmV5TWFzayA9ICQoJ1tkYXRhLW1vbmV5LW1hc2tdJyk7XG5cblx0XHRpZiAoJHllYXJNYXNrLmxlbmd0aCkge1xuXHRcdFx0JHllYXJNYXNrLm1hc2soJzk5OTknKTtcblx0XHR9XG5cblx0XHRpZiAoJG1vbmV5TWFzay5sZW5ndGgpIHtcblx0XHRcdC8vcnVcblx0XHRcdCRtb25leU1hc2subWFza01vbmV5KHtcblx0XHRcdFx0dGhvdXNhbmRzOiAnICcsXG5cdFx0XHRcdGRlY2ltYWw6ICcuJyxcblx0XHRcdFx0YWxsb3dOb0RlY2ltYWw6IHRydWVcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxufVxuXG5jb25zdCBjQXBwQ29udHJvbGxlciA9IG5ldyBDQXBwQ29udHJvbGxlcigpO1xuXG4kKGRvY3VtZW50KS5yZWFkeSgoKSA9PiB7XG5cdGNBcHBDb250cm9sbGVyLmluaXQoKVxuXHRcdC50aGVuKCgpID0+IHtcblx0XHRcdC8v0LLRi9Cx0YDQsNGB0YvQstCw0LXQvCDQsiBnbG9iYWwg0LTQu9GPINC00L7RgdGC0YPQv9CwXG5cdFx0XHRnbG9iYWwuQUMgPSBjQXBwQ29udHJvbGxlcjtcblx0XHR9KTtcbn0pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL21haW4uanMiLCIvKipcbiAqINCS0YHQv9C+0LzQvtCz0LDRgtC10LvRjNC90YvQtSDRhNGD0L3QutGG0LjQuFxuICovXG5jbGFzcyBDVG9vbHMge1xuXHRjb25zdHJ1Y3RvcigpIHt9XG5cblx0LyoqXG5cdCAqINCa0LvQvtC90LjRgNC+0LLQsNC90LjQtSDQvtCx0YrQtdC60YLQsCDQsdC10Lcg0L/RgNC40LLRj9C30LrQuCDQv9C+INGB0YHRi9C70LrQtVxuXHQgKiBAcGFyYW0gb2JqZWN0XG5cdCAqL1xuXHRzdGF0aWMgY2xvbmVPYmplY3Qob2JqZWN0ID0ge30pIHtcblx0XHRyZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvYmplY3QpKTtcblx0fVxuXG5cdC8qKlxuXHQgKiDQpNC+0YDQvNCw0YLQuNGA0L7QsNC90LjQtSDRgdGC0YDQvtC60Lgg0LIg0LTQtdC90LXQttC90YvQuSDQstC40LRcblx0ICogQHBhcmFtIHByaWNlXG5cdCAqIEBwYXJhbSBsb2NhbGVcblx0ICogQHJldHVybnMgeyp9XG5cdCAqL1xuXHRzdGF0aWMgZm9ybWF0TW9uZXkocHJpY2UsIGxvY2FsZSA9ICdydScpIHtcblx0XHRsZXQgblByaWNlID0gTnVtYmVyKHByaWNlKTtcblxuXHRcdGlmICghaXNOYU4oblByaWNlKSkge1xuXHRcdFx0cmV0dXJuIG5QcmljZS50b0xvY2FsZVN0cmluZyhsb2NhbGUpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gcHJpY2U7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqINCm0LXQvdCwICsg0L3QsNC70L7Qs1xuXHQgKiBAcGFyYW0gcHJpY2Vcblx0ICogQHBhcmFtIHRheFxuXHQgKiBAcGFyYW0gcHJlY2lzaW9uXG5cdCAqL1xuXHRzdGF0aWMgZ2V0UHJpY2VXaXRoVGF4KHByaWNlLCB0YXggPSAxMywgcHJlY2lzaW9uID0gMCkge1xuXHRcdGxldCBuUHJpY2UgPSBOdW1iZXIocHJpY2UpO1xuXHRcdGxldCBuVGF4ID0gTnVtYmVyKHRheCk7XG5cblx0XHRpZiAoIWlzTmFOKG5QcmljZSkgJiYgIWlzTmFOKG5UYXgpKSB7XG5cdFx0XHRsZXQgcHJpY2VXaXRoVGF4ID0gKChuUHJpY2UgKiBuVGF4IC8gMTAwKSArIG5QcmljZSk7XG5cdFx0XHRyZXR1cm4gKHByaWNlV2l0aFRheCAlIDEgPT09IDApID8gcHJpY2VXaXRoVGF4IDogcHJpY2VXaXRoVGF4LnRvRml4ZWQocHJlY2lzaW9uKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIHByaWNlO1xuXHRcdH1cblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IENUb29scztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9wYXJ0cy9DVG9vbHMuanMiLCJjb25zdCBDVG9vbHMgPSByZXF1aXJlKCcuL0NUb29scycpO1xuXG4vKipcbiAqINCa0L7QvdGC0YDQvtC70LvQtdGAINC00LvRjyDRgNCw0LHQvtGC0Ysg0YEg0L/QvtC00YDQs9GA0YPQt9C60L7QuSDQuCDQvtCx0L3QvtCy0LvQtdC90LjQtdC8INGC0LDQsdC70LjRh9C90YvRhSDQtNCw0L3QvdGL0YUg0L7QsSDQsNCy0YLQvtC80L7QsdC40LvRj9GFXG4gKiDQoi7Qui4g0L/QviDQvtC00L3QvtC5INGB0YLRgNCw0L3QuNGG0LUg0L3QtdC70YzQt9GPINC90LjRh9C10LPQviDRgdC60LDQt9Cw0YLRjCDQviDQstGB0LXQvCDQv9GA0L7QtdC60YLQtSDQsiDRhtC10LvQvtC8LCDRgtC+INC00LDQvdC90YvQuSDQutC+0L3RgtGA0L7Qu9C70LXRgFxuICog0YHQu9GD0LbQuNGCINGB0LrQvtGA0LXQtSDQtNC70Y8g0LTQtdC80L7QvdGB0YLRgNCw0YbQuNC90L3Ri9GFINGG0LXQu9C10Lkg0Lgg0LfQsNGC0L7Rh9C10L0g0L/QvtC0INGA0LDQsdC+0YLRgyDRgSDQutC+0L3QutGA0LXRgtC90YvQvNC4INC00LDQvdC90YvQvNC4INC4INC60L7QvdC60YDQtdGC0L3QudC+INGE0L7RgNC80L7QuVxuICovXG5jbGFzcyBDQ2FyYW1iYUNvbnRyb2xsZXIge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHQvL9C00LDQvdC90YvQtSDQtNC70Y8g0LfQsNCz0YDRg9C30LrQuFxuXHRcdHRoaXMubG9hZFVybCA9ICdodHRwczovL3Jhd2dpdC5jb20vVmFyaW5ldHovZTZjYmFkZWM5NzJlNzZhMzQwYzQxYTY1ZmNjMmE2YjMvcmF3LzkwMTkxODI2YTNiYWMyZmYwNzYxMDQwZWQxZDk1YzU5ZjE0ZWFmMjYvZnJvbnRlbmRfdGVzdF90YWJsZS5qc29uJztcblxuXHRcdC8qKlxuXHRcdCAqINCb0L7QutCw0LvQuNC30LDRhtC40Y8uINCSINC/0LXRgNGB0L/QtdC60YLQuNCy0LDRhSDRgNCw0LLQt9C40YLQuNGPINGN0YLQviDRgdC70LXQtNGD0LXRgiDQstGL0L3QvtGB0LjRgtGMINCyINC+0YLQtNC10LvRjNC90YvQuSBqc29uLdGE0LDQudC7LFxuXHRcdCAqINC70LjQsdC+INC60LDQui3RgtC+INC/0YDQvtCx0YDQsNGB0YvQstCw0YLRjCDQuNC3INCx0LDQt9GLLlxuXHRcdCAqIEB0eXBlIHt7cnU6IHtzdGF0dXM6IHtwZW5kaW5nOiBzdHJpbmcsIG91dF9vZl9zdG9jazogc3RyaW5nLCBpbl9zdG9jazogc3RyaW5nfSwgcmVtb3ZlQnV0dG9uVGV4dDogc3RyaW5nfSwgZW46IHt9fX1cblx0XHQgKi9cblx0XHR0aGlzLnRleHQgPSB7XG5cdFx0XHRydToge1xuXHRcdFx0XHQnc3RhdHVzLS1wZW5kaW5nJzogJ9Ce0LbQuNC00LDQtdGC0YHRjycsXG5cdFx0XHRcdCdzdGF0dXMtLW91dF9vZl9zdG9jayc6ICfQndC10YIg0LIg0L3QsNC70LjRh9C40LgnLFxuXHRcdFx0XHQnc3RhdHVzLS1pbl9zdG9jayc6ICfQkiDQvdCw0LvQuNGH0LjQuCcsXG5cdFx0XHRcdCdlcnJvci0tbG9hZF9lcnJvcic6ICfQntGI0LjQsdC60LAg0LfQsNCz0YDRg9C30LrQuCDQtNCw0L3QvdGL0YUnLFxuXHRcdFx0XHQnZXJyb3ItLWVtcHR5X2RhdGEnOiAn0J3QtdGCINC00LDQvdC90YvRhSDQtNC70Y8g0L7RgtC+0LHRgNCw0LbQtdC90LjRjycsXG5cdFx0XHRcdHJlbW92ZV9idXR0b25fdGV4dDogJ9Cj0LTQsNC70LjRgtGMJyxcblx0XHRcdFx0Y3VycmVuY3k6ICfRgNGD0LEuJ1xuXHRcdFx0fSxcblx0XHRcdGVuOiB7XG5cblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0Ly/Qu9C+0LrQsNC70Yxcblx0XHR0aGlzLmxvY2FsZSA9ICdydSc7XG5cdFx0Ly/Qt9C90LDRh9C10L3QuNC1INC90LDQu9C+0LPQvtCy0L7QuSDRgdGC0LDQstC60Lgg0L/Qvi3Rg9C80L7Qu9GH0LDQvdC40Y5cblx0XHR0aGlzLnRheCA9IDEzO1xuXG5cdFx0LyoqXG5cdFx0ICog0J/QvtC70YPRh9C10L3QuNC1INGC0LXQutGB0YLQsCDQv9C+INC60L7QtNGDLiDQm9C+0LrQsNC70Ywg0L/QtdGA0LXQtNCw0L3QsCDRh9C10YDQtdC3INC60LDRgNGA0LjRgNC+0LLQsNC90LjQtVxuXHRcdCAqL1xuXHRcdHRoaXMuZ2V0VGV4dCA9IHRoaXMuZ2V0VGV4dEJ5TG9jYWxlKHRoaXMubG9jYWxlKTtcblxuXHRcdC8qKlxuXHRcdCAqINCf0L7Rh9C10LzRgyDQuNC80LXQvdC90L4g0YLQsNC60L7QtSDRgNC10YjQtdC90LjQtT9cblx0XHQgKiDQmNC30L3QsNGH0LDQu9GM0L3QviDRgyDQvNC10L3RjyDQsdGL0LvQsCDQuNC00LXRjyDRhdGA0LDQvdC40YLRjCDRjdGC0L4g0LIg0LLQuNC00LUganNvbi3QtNC10YDQtdCy0LAg0L/QviDRgtC40L/RgyB4bWwsINC+0LTQvdCw0LrQviDRjdGC0L4g0YPRgdC70L7QttC90Y/QtdGCXG5cdFx0ICog0YPRgdC70L7QttC90Y/QtdGCINGH0LjRgtCw0LXQvNC+0YHRgtGMINGA0LDQt9C80LXRgtC60LguINCSINC/0LXRgNGB0L/QtdC60YLQuNCy0LDRhSDRgNCw0LfQstC40YLQuNGPINGN0YLQviDQvNC+0LbQvdC+INCy0YvQvdC10YHRgtC4INCyINCy0LjQtNC1XG5cdFx0ICog0YLQsNC60L7Qs9C+INC20LUg0L7QsdGK0LXQutGC0LAg0LIg0L7QtNC90LXQu9GM0L3RiyBqc29uLdGB0L3QuNC/0L/QtdGCINC4INC/0L7QtNCz0YDRg9C20LDRgtGMINCw0YHQuNC90YXRgNC+0L3QvdC+LCDQvdCw0L/RgNC40LzQtdGALiDQndC+INCyINGA0LDQvNC60LDRhSDQtNCw0L3QvdC+0LPQvlxuXHRcdCAqINC30LDQtNCw0L3QuNGPINC4INC/0YDQuCDQvdC10LjQt9Cy0LXRgdGC0L3QvtC5INCw0YDRhdC40YLQtdC60YLRg9GA0LUg0L/RgNC+0YfQuNGFINGH0LDRgdGC0LXQuSDQv9GA0L7QtNGD0LrRgtCwLCDRjyDRgNC10YjQuNC7INC90LUg0YPRgdC70L7QttC90Y/RgtGMINGN0YLQviDQtNC+INGC0LDQutC+0Lkg0YHRgtC10L/QtdC90LguXG5cdFx0ICogc2NhZmZvbGQgLSDRgdC60LXQu9C10YIg0YDQsNC30LzQtdGC0LrQuC4g0KLQsNC60LbQtSDQsiDQvdC10Lwg0L/RgNC40YHRg9GC0YHRgtCy0YPRjtGCINC+0L/RhtC40L7QvdCw0LvRjNC90YvQtSDRh9Cw0YHRgtC4LCDQutC+0YLQvtGA0YvQtSDQvtC/0LjRgdCw0L3QuNC1INCyIG9wdGlvbmFsXG5cdFx0ICogQHR5cGUge3tzY2FmZm9sZDogc3RyaW5nLCBvcHRpb25hbDoge2Rlc2NyaXB0aW9uOiBzdHJpbmcsIGNvbG9yQm94OiBzdHJpbmd9fX1cblx0XHQgKi9cblx0XHR0aGlzLm1hcmt1cFRlbXBsYXRlID0ge1xuXHRcdFx0c2NhZmZvbGQ6IGBcblx0XHRcdFx0PGRpdiBjbGFzcz1cImItY3VzdG9tLXRhYmxlX19yb3dcIiBkYXRhLXJvdy1pZD1cInt7aWR9fVwiPlxuXHRcdFx0XHQgIDxkaXYgY2xhc3M9XCJiLWN1c3RvbS10YWJsZV9fY2VsbCBiLWN1c3RvbS10YWJsZV9fY2VsbC0tdGl0bGVcIj5cblx0XHRcdFx0ICAgIDxkaXYgY2xhc3M9XCJ0aXRsZVwiPnt7dGl0bGV9fTwvZGl2PlxuXHRcdFx0XHQgICAge3tvcHRpb25hbERlc2NyaXB0aW9ufX1cblx0XHRcdFx0ICA8L2Rpdj5cblx0XHRcdFx0ICA8ZGl2IGNsYXNzPVwiYi1jdXN0b20tdGFibGVfX2NlbGwgYi1jdXN0b20tdGFibGVfX2NlbGwtLXllYXJcIj57e3llYXJ9fTwvZGl2PlxuXHRcdFx0XHQgIDxkaXYgY2xhc3M9XCJiLWN1c3RvbS10YWJsZV9fY2VsbCBiLWN1c3RvbS10YWJsZV9fY2VsbC0tY29sb3JcIj5cblx0XHRcdFx0ICAgIHt7b3B0aW9uYWxDb2xvcmJveH19XG5cdFx0XHRcdCAgPC9kaXY+XG5cdFx0XHRcdCAgPGRpdiBjbGFzcz1cImItY3VzdG9tLXRhYmxlX19jZWxsIGItY3VzdG9tLXRhYmxlX19jZWxsLS1zdGF0dXNcIj57e3N0YXR1c319PC9kaXY+XG5cdFx0XHRcdCAgPGRpdiBjbGFzcz1cImItY3VzdG9tLXRhYmxlX19jZWxsIGItY3VzdG9tLXRhYmxlX19jZWxsLS1wcmljZVwiPlxuXHRcdFx0XHQgICAgPG5vYnIgY2xhc3M9XCJwcmljZSBqcy1wcmljZVwiIGRhdGEtb3JpZ2luYWwtcHJpY2U9XCJ7e3ByaWNlfX1cIj57e2Zvcm1hdHRlZFByaWNlfX08L25vYnI+XG5cdFx0XHRcdCAgICA8bm9iciBjbGFzcz1cInByaWNlLXdpdGgtdGF4IGpzLXByaWNlLXdpdGgtdGF4XCIgZGF0YS1vcmlnaW5hbC1wcmljZS13aXRoLXRheD1cInt7cHJpY2VXaXRoVGF4fX1cIj57e2Zvcm1hdHRlZFByaWNlV2l0aFRheH19PC9ub2JyPlxuXHRcdFx0XHQgIDwvZGl2PlxuXHRcdFx0XHQgIDxkaXYgY2xhc3M9XCJiLWN1c3RvbS10YWJsZV9fY2VsbCBiLWN1c3RvbS10YWJsZV9fY2VsbC0tYWN0aW9uXCI+XG5cdFx0XHRcdCAgICA8YnV0dG9uIGNsYXNzPVwiaS1idXR0b24gaS1idXR0b24tLWVsbGlwc2UgaS1idXR0b24tLXNpemUtc21hbGwganMtZGVsZXRlLXRyaWdnZXJcIj57e3JlbW92ZUJ1dHRvblRleHR9fTwvYnV0dG9uPlxuXHRcdFx0XHQgIDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdGAsXG5cdFx0XHRvcHRpb25hbDoge1xuXHRcdFx0XHRkZXNjcmlwdGlvbjogYDxkaXYgY2xhc3M9XCJkZXNjcmlwdGlvblwiPnt7ZGVzY3JpcHRpb259fTwvZGl2PmAsXG5cdFx0XHRcdGNvbG9yQm94OiBgPGRpdiBjbGFzcz1cImktY29sb3ItYm94XCIgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiB7e2NvbG9yQ29kZX19XCI+PC9kaXY+YCxcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0dGhpcy4kdGFibGVXcmFwcGVyID0gbnVsbDtcblx0fVxuXG5cdC8qKlxuXHQgKiDQmNC90LjRhtC40LDQu9C40LfQsNGG0LjRjyDQu9C+0LPQuNC60Lgg0YDQsNCx0L7RgtGLINC60L7QvdGC0YDQvtC70LvQtdGA0LBcblx0ICovXG5cdGluaXQoKSB7XG5cdFx0Ly/RgtCw0LHQu9C40YbQsFxuXHRcdHRoaXMuJHRhYmxlV3JhcHBlciA9ICQoJyNjYXJhbWJhLXRhYmxlJyk7XG5cdFx0Ly/RhNC+0YDQvNCwXG5cdFx0dGhpcy4kZm9ybSA9ICQoJyNjYXJhbWJhLWZvcm0nKTtcblxuXHRcdGlmICh0aGlzLiR0YWJsZVdyYXBwZXIubGVuZ3RoICYmIHRoaXMuJGZvcm0ubGVuZ3RoKSB7XG5cdFx0XHQvL9GC0LXQu9C+INGC0LDQsdC70LjRhtGLXG5cdFx0XHR0aGlzLiR0YWJsZVJvd0NvbnRhaW5lciA9IHRoaXMuJHRhYmxlV3JhcHBlci5maW5kKCcuanMtYm9keScpO1xuXHRcdFx0Ly/QsdC70L7QuiDQtNC70Y8g0YPQstC10LTQvtC80LvQtdC90LjQuVxuXHRcdFx0dGhpcy4kdGFibGVOb3R5ID0gdGhpcy4kdGFibGVXcmFwcGVyLmZpbmQoJy5qcy1ub3R5Jyk7XG5cdFx0XHQvL9C40YLQvtCz0L7QstCw0Y8g0YbQtdC90LBcblx0XHRcdHRoaXMuJHRhYmxlU3VtbWFyeVByaWNlID0gdGhpcy4kdGFibGVXcmFwcGVyLmZpbmQoJy5qcy1zdW1tYXJ5LXByaWNlJyk7XG5cblx0XHRcdC8v0YLRgNC40LPQs9C10YAg0LTQu9GPINGD0LTQsNC70LXQvdC40Y8g0YHRgtGA0L7QulxuXHRcdFx0dGhpcy5pbml0RGVsZXRlVHJpZ2dlcigpO1xuXHRcdFx0Ly/QuNC90LjRhtC40LDQu9C40LfQsNGG0LjQuCDQu9C+0LPQuNC60Lgg0YDQsNCx0L7RgtGLINGBINGE0L7RgNC80L7QuVxuXHRcdFx0dGhpcy5pbml0Rm9ybSgpO1xuXG5cdFx0XHR0aGlzLmxvY2tUYWJsZSgpO1xuXHRcdFx0dGhpcy5sb2FkRGF0YSgpXG5cdFx0XHRcdC50aGVuKChkYXRhKSA9PiB7XG5cdFx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXG5cdFx0XHRcdFx0XHQuZGVsYXkoMTAwMCkgLy/RjdC80YPQu9GP0YbQuNGPINC00L7Qu9Cz0L7Qs9C+INC+0YLQstC10YLQsCDQvtGCINGB0LXRgNCy0LXRgNCwXG5cdFx0XHRcdFx0XHQudGhlbigoKSA9PiB7XG5cdFx0XHRcdFx0XHRcdGlmIChPYmplY3Qua2V5cyhkYXRhKS5sZW5ndGgpIHtcblx0XHRcdFx0XHRcdFx0XHQvL9C+0LHQvdC+0LLQu9C10L3QuNC1INC00LDQvdC90YvRhSDQsiDRgtCw0LHQu9C40YbQulxuXHRcdFx0XHRcdFx0XHRcdHRoaXMudXBkYXRlVGFibGVXaXRoRGF0YShkYXRhKTtcblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLnNob3dUYWJsZU5vdGlmaWNhdGlvbih0aGlzLmdldFRleHQoJ2Vycm9yLS1lbXB0eV9kYXRhJykpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSlcblx0XHRcdFx0LnRoZW4oKCkgPT4ge1xuXHRcdFx0XHRcdHRoaXMudW5sb2NrVGFibGUoKTtcblx0XHRcdFx0fSlcblx0XHRcdFx0LmNhdGNoKChtc2cpID0+IHtcblx0XHRcdFx0XHQvL1RPRE8g0L7QsdGA0LDQsdC+0YLQutCwINC+0YjQuNCx0L7QulxuXHRcdFx0XHRcdHRoaXMudW5sb2NrVGFibGUoKTtcblx0XHRcdFx0XHR0aGlzLnNob3dUYWJsZU5vdGlmaWNhdGlvbih0aGlzLmdldFRleHQoJ2Vycm9yLS1sb2FkX2Vycm9yJykpO1xuXHRcdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICog0JjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y8g0YDQsNCx0L7RgtGLINGBINGE0L7RgNC80L7QuVxuXHQgKi9cblx0aW5pdEZvcm0oKSB7XG5cdFx0dGhpcy4kZm9ybS5wYXJzbGV5KClcblx0XHRcdC5vbignZm9ybTpzdWJtaXQnLCAoZm9ybSkgPT4ge1xuXHRcdFx0XHRsZXQgZGF0YSA9IHt9O1xuXG5cdFx0XHRcdGlmICh0aGlzLmlzVGFibGVMb2NrKCkpIHtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aGlzLmxvY2tUYWJsZSgpO1xuXG5cdFx0XHRcdC8v0L7QsdGF0L7QtNC40Lwg0LLRgdC1INC/0L7Qu9GPINGE0L7RgNC80Ysg0Lgg0YHQvtCx0LjRgNCw0LXQvCDQtNCw0L3QvdGL0LVcblx0XHRcdFx0Zm9yIChsZXQgZmllbGQgaW4gZm9ybS5maWVsZHMpIHtcblx0XHRcdFx0XHRpZiAoZm9ybS5maWVsZHMuaGFzT3duUHJvcGVydHkoZmllbGQpKSB7XG5cdFx0XHRcdFx0XHRsZXQgZmllbGROYW1lID0gZm9ybS5maWVsZHNbZmllbGRdLiRlbGVtZW50LmF0dHIoJ2RhdGEtZmllbGQtdHlwZScpO1xuXHRcdFx0XHRcdFx0bGV0IHZhbHVlID0gZm9ybS5maWVsZHNbZmllbGRdLmdldFZhbHVlKCk7XG5cblx0XHRcdFx0XHRcdGlmIChmaWVsZE5hbWUgPT0gJ3ByaWNlJykge1xuXHRcdFx0XHRcdFx0XHRkYXRhW2ZpZWxkTmFtZV0gPSB2YWx1ZS5yZXBsYWNlKC9cXHMvZywgJycpLnJlcGxhY2UoLywvZywgJy4nKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdGRhdGFbZmllbGROYW1lXSA9IHZhbHVlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8v0L/QvtC70YPRh9Cw0LXQvCDRg9GB0LvQvtCy0L3QviDRg9C90LjQutCw0LvRjNC90YvQuSBJRCDQtNC70Y8g0L3QvtCy0L7Qs9C+INGN0LvQtdC80LXQvdGC0LBcblx0XHRcdFx0ZGF0YS5pZCA9IHRoaXMuZ2VuZXJhdGVVbmlxUm93SUQoKTtcblxuXHRcdFx0XHRsZXQgcHJlcGFyZWREYXRhID0gW107XG5cdFx0XHRcdHByZXBhcmVkRGF0YS5wdXNoKGRhdGEpO1xuXG5cdFx0XHRcdC8v0LTQvtCx0LDQstC70Y/QtdC8INGN0LvQtdC80LXQvdGC0LIg0LIg0LvQvtC60LDQu9GM0L3QvtC1INGF0YDQsNC90LjQu9C40YnQtdGGXG5cdFx0XHRcdHRoaXMuYWRkUm93VG9Mb2NhbFN0b3JhZ2UoZGF0YSk7XG5cblx0XHRcdFx0Ly/QvtCx0L3QvtCy0LvQtdC90LjQtVxuXHRcdFx0XHR0aGlzLnVwZGF0ZVRhYmxlV2l0aERhdGEocHJlcGFyZWREYXRhLCB0cnVlKTtcblxuXHRcdFx0XHR0aGlzLnJlc2V0Rm9ybShmb3JtKTtcblxuXHRcdFx0XHR0aGlzLnVubG9ja1RhYmxlKCk7XG5cblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fSk7XG5cdH1cblxuXHQvKipcblx0ICog0KHQsdGA0L7RgdC40YLRjCDQv9C+0LvRjyDQsiDRhNC+0YDQvNC1XG5cdCAqIEBwYXJhbSBwYXJzbGV5Rm9ybVxuXHQgKi9cblx0cmVzZXRGb3JtKHBhcnNsZXlGb3JtKSB7XG5cdFx0bGV0ICRmb3JtID0gJChwYXJzbGV5Rm9ybS4kZWxlbWVudCk7XG5cdFx0bGV0ICRjdXN0b21TZWxlY3RzID0gJGZvcm0uZmluZCgnW2RhdGEtaXMtY3VzdG9tLXNlbGVjdF0nKTtcblxuXHRcdC8v0YHQsdGA0LDRgdGL0LLQsNC10Lwg0LfQvdCw0YfQtdC90LjRjyDRhNC+0YDQvFxuXHRcdHBhcnNsZXlGb3JtLiRlbGVtZW50WzBdLnJlc2V0KCk7XG5cdFx0JGZvcm0ucGFyc2xleSgpLnJlc2V0KCk7XG5cblx0XHQvL9C+0LHRhdC+0LTQuNC8INCy0YHQtSDQv9C+0LvRjyDRhNC+0YDQvNGLINC4INGB0LHRgNCw0YHRi9Cy0LDQtdC8INC30LDQv9C+0LvQvdC10L3QvdC+0YHRgtGMINC/0L7Qu9C10Llcblx0XHRmb3IgKGxldCBmaWVsZCBpbiBwYXJzbGV5Rm9ybS5maWVsZHMpIHtcblx0XHRcdGlmIChwYXJzbGV5Rm9ybS5maWVsZHMuaGFzT3duUHJvcGVydHkoZmllbGQpKSB7XG5cdFx0XHRcdHBhcnNsZXlGb3JtLmZpZWxkc1tmaWVsZF0uJGVsZW1lbnQucmVtb3ZlQ2xhc3MoJ2lzLWZpbGwnKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoJGN1c3RvbVNlbGVjdHMubGVuZ3RoKSB7XG5cdFx0XHQkLmVhY2goJGN1c3RvbVNlbGVjdHMsIChpLCBzZWxlY3QpID0+IHtcblx0XHRcdFx0JChzZWxlY3QpLnZhbCgnJykudHJpZ2dlcignY2hhbmdlJyk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXG5cdC8qKlxuXHQgKiDQmNC90LjRhtC40LDQu9C40LfQsNGG0LjRjyDQu9C+0LPQuNC60Lgg0YPQtNCw0LvQtdC90LjRjyDRgdGC0YDQvtC6INC40Lcg0YLQsNCx0LvQuNGG0Ytcblx0ICovXG5cdGluaXREZWxldGVUcmlnZ2VyKCkge1xuXHRcdHRoaXMuJHRhYmxlV3JhcHBlci5vbignY2xpY2snLCAnLmpzLWRlbGV0ZS10cmlnZ2VyJywgKGUpID0+IHtcblx0XHRcdGxldCAkdGhpcyA9ICQoZS5jdXJyZW50VGFyZ2V0KTtcblx0XHRcdGxldCAkcm93ID0gJHRoaXMuY2xvc2VzdCgnW2RhdGEtcm93LWlkXScpO1xuXG5cdFx0XHRpZiAoJHJvdy5sZW5ndGgpIHtcblx0XHRcdFx0bGV0IHJvd0lEID0gJHJvdy5hdHRyKCdkYXRhLXJvdy1pZCcpO1xuXG5cdFx0XHRcdHRoaXMubG9ja1RhYmxlKCk7XG5cblx0XHRcdFx0UHJvbWlzZS5yZXNvbHZlKClcblx0XHRcdFx0XHQuZGVsYXkoMTAwKSAvL9GH0LjRgdGC0L4g0LTQu9GPINC00LXQvNC+0L3RgdGC0YDQsNGG0LjQuCDRgNCw0LHQvtGC0Ysg0YEg0YHQtdGA0LLQtdGA0L7QvFxuXHRcdFx0XHRcdC50aGVuKCgpID0+IHtcblx0XHRcdFx0XHRcdCRyb3cucmVtb3ZlKCk7XG5cdFx0XHRcdFx0XHR0aGlzLmRlbGV0ZVJvd0Zyb21Mb2NhbFN0b3JhZ2Uocm93SUQpO1xuXHRcdFx0XHRcdFx0dGhpcy51cGRhdGVUYWJsZVZpZXdTdGF0dXMoKTtcblx0XHRcdFx0XHRcdHRoaXMudXBkYXRlU3VtbWFyeVByaWNlKCk7XG5cdFx0XHRcdFx0XHR0aGlzLnVubG9ja1RhYmxlKCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHQvKipcblx0ICog0J/QvtC00LPRgNGD0LfQutCwINC00LDQvdC90YvQuSDRgSDRg9C00LDQu9C10L3QvdC+0LPQviDQuNGB0YLQvtGH0L3QuNC60LBcblx0ICog0JHQsNCzINCyIElFMTAg0LggSUUxMSDQvdCwIFdpbmRvd3MgNyDQuCBXaW5kb3dzIDguMSBodHRwOi8vdGFrZS5tcy96QkY4alxuXHQgKiBAcmV0dXJucyB7UHJvbWlzZS48VFJlc3VsdD59XG5cdCAqL1xuXHRsb2FkRGF0YSgpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0JC5hamF4KHtcblx0XHRcdFx0dXJsOiB0aGlzLmxvYWRVcmwsXG5cdFx0XHRcdGRhdGE6IHt9LFxuXHRcdFx0XHRkYXRhVHlwZTogJ2pzb24nLFxuXHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xuXHRcdFx0XHRcdHJlc29sdmUoZGF0YSk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGVycm9yOiAoanFYSFIsIHRleHRTdGF0dXMsIGVycm9yKSA9PiB7XG5cdFx0XHRcdFx0cmVqZWN0KCk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGNhY2hlOiBmYWxzZVxuXHRcdFx0fSk7XG5cdFx0fSlcblx0XHRcdC50aGVuKChkYXRhKSA9PiB7XG5cdFx0XHRcdGxldCBsb2NhbERhdGEgPSB0aGlzLmdldEFsbFJvd3NGcm9tTG9jYWxTdG9yYWdlKCk7XG5cblx0XHRcdFx0aWYgKGxvY2FsRGF0YSkge1xuXHRcdFx0XHRcdHJldHVybiAkLmV4dGVuZCh7fSwgbG9jYWxEYXRhLCBkYXRhKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZXR1cm4gZGF0YTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdH1cblxuXHQvKipcblx0ICog0JLRi9Cy0L7QtCDQtNCw0L3QvdGL0YUg0LIg0YjQsNCx0LvQvtC90L3Rg9GOINGB0YLRgNC+0LrRgyDQuCDQtNC+0LHQsNCy0LvQtdC90LjQtSDQtNCw0L3QvdGL0LXRhVxuXHQgKiBUT0RPINC00L7Qv9C+0LvQvdC40YLQtdC70YzQvdCw0Y8g0LHQtdC30L7Qv9Cw0YHQvdCw0Y8g0L7QsdGA0LDQsdC+0YLQutCwINC00LDQvdC90YvRhSDRgSDRgdC10YDQstCwXG5cdCAqIEBwYXJhbSBkYXRhXG5cdCAqIEBwYXJhbSBiQXBwZW5kIC0g0L3QtSDQvtGH0LjRidCw0YLRjCDRgdGD0YnQtdGB0YLQstGD0Y7RidC40LUg0LTQsNC90L3Ri9C1INCyINGC0LDQsdC70LjRhtC1XG5cdCAqL1xuXHR1cGRhdGVUYWJsZVdpdGhEYXRhKGRhdGEsIGJBcHBlbmQgPSBmYWxzZSkge1xuXHRcdGxldCByZXN1bHRNYXJrdXAgPSBbXTtcblxuXHRcdGZvciAobGV0IHJvdyBpbiBkYXRhKSB7XG5cdFx0XHRpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eShyb3cpKSB7XG5cdFx0XHRcdC8v0L3QtdGCINGB0LzRi9GB0LvRiyDQstGL0LLQvtC00LjRgtGMINGB0YLRgNC+0LrRgywg0LXRgdC70Lgg0L7RgtGB0YLRg9GC0YHQstGD0LXRgiBJRCDQuNC70LggVElUTEVcblx0XHRcdFx0aWYgKHR5cGVvZiBkYXRhW3Jvd10uaWQgIT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGRhdGFbcm93XS50aXRsZSAhPSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRcdGxldCByb3dNYXJrdXAgPSB0aGlzLm1hcmt1cFRlbXBsYXRlLnNjYWZmb2xkO1xuXG5cdFx0XHRcdFx0Zm9yIChsZXQgZmllbGROYW1lIGluIGRhdGFbcm93XSkge1xuXHRcdFx0XHRcdFx0aWYgKGRhdGFbcm93XS5oYXNPd25Qcm9wZXJ0eShmaWVsZE5hbWUpKSB7XG5cdFx0XHRcdFx0XHRcdGxldCB2YWx1ZSA9IGRhdGFbcm93XVtmaWVsZE5hbWVdO1xuXG5cdFx0XHRcdFx0XHRcdGlmIChmaWVsZE5hbWUgPT0gJ2lkJykge1xuXHRcdFx0XHRcdFx0XHRcdHJvd01hcmt1cCA9IHJvd01hcmt1cC5yZXBsYWNlKC97e2lkfX0vZywgdmFsdWUpO1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0aWYgKGZpZWxkTmFtZSA9PSAndGl0bGUnKSB7XG5cdFx0XHRcdFx0XHRcdFx0cm93TWFya3VwID0gcm93TWFya3VwLnJlcGxhY2UoL3t7dGl0bGV9fS9nLCB2YWx1ZSk7XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRpZiAoZmllbGROYW1lID09ICdkZXNjcmlwdGlvbicpIHtcblx0XHRcdFx0XHRcdFx0XHRyb3dNYXJrdXAgPSByb3dNYXJrdXAucmVwbGFjZSgve3tvcHRpb25hbERlc2NyaXB0aW9ufX0vZywgdGhpcy5tYXJrdXBUZW1wbGF0ZS5vcHRpb25hbC5kZXNjcmlwdGlvbik7XG5cdFx0XHRcdFx0XHRcdFx0cm93TWFya3VwID0gcm93TWFya3VwLnJlcGxhY2UoL3t7ZGVzY3JpcHRpb259fS9nLCB2YWx1ZSk7XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHQvKipcblx0XHRcdFx0XHRcdFx0ICog0KbQstC10YLQsCDQstGL0LLQvtC20YMg0L/RgNGP0LzQviDQsiDQstC40LTQtSDRgtC10LrRgdGC0LAsINC90L4g0L/Qvi3RhdC+0YDQvtGI0LXQvNGDINC90YPQttC90L4g0L7RgtC00LDQstCw0YLRjCDRhdGN0Ygg0YfQtdGA0LXQtyBBUElcblx0XHRcdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0XHRcdGlmIChmaWVsZE5hbWUgPT0gJ2NvbG9yJykge1xuXHRcdFx0XHRcdFx0XHRcdGlmICh2YWx1ZSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0cm93TWFya3VwID0gcm93TWFya3VwLnJlcGxhY2UoL3t7b3B0aW9uYWxDb2xvcmJveH19L2csIHRoaXMubWFya3VwVGVtcGxhdGUub3B0aW9uYWwuY29sb3JCb3gpO1xuXHRcdFx0XHRcdFx0XHRcdFx0cm93TWFya3VwID0gcm93TWFya3VwLnJlcGxhY2UoL3t7Y29sb3JDb2RlfX0vZywgdmFsdWUpO1xuXHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRyb3dNYXJrdXAgPSByb3dNYXJrdXAucmVwbGFjZSgve3tvcHRpb25hbENvbG9yYm94fX0vZywgJycpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdGlmIChmaWVsZE5hbWUgPT0gJ3llYXInKSB7XG5cdFx0XHRcdFx0XHRcdFx0cm93TWFya3VwID0gcm93TWFya3VwLnJlcGxhY2UoL3t7eWVhcn19L2csIHZhbHVlKTtcblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdGlmIChmaWVsZE5hbWUgPT0gJ3N0YXR1cycpIHtcblx0XHRcdFx0XHRcdFx0XHQvL9C+0L/QtdGH0LDRgtC60LAg0LIg0YHRgtCw0YLRg9GB0LUsINCyINGC0LDQutC+0Lwg0LLQuNC00LUg0L/RgNC40LvQtdGC0LDQtdGCINGBINCQ0J/QmFxuXHRcdFx0XHRcdFx0XHRcdGlmICh2YWx1ZSA9PSAncGVkbmRpbmcnKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHR2YWx1ZSA9ICdwZW5kaW5nJztcblx0XHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0XHRsZXQgc3RhdHVzVGV4dCA9IHRoaXMuZ2V0VGV4dChgc3RhdHVzLS0ke3ZhbHVlfWApO1xuXHRcdFx0XHRcdFx0XHRcdHJvd01hcmt1cCA9IHJvd01hcmt1cC5yZXBsYWNlKC97e3N0YXR1c319L2csIChzdGF0dXNUZXh0KSA/IHN0YXR1c1RleHQgOiAnLScpO1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0aWYgKGZpZWxkTmFtZSA9PSAncHJpY2UnKSB7XG5cdFx0XHRcdFx0XHRcdFx0bGV0IHByaWNlID0gdHlwZW9mIHZhbHVlID09ICdzdHJpbmcnID8gdmFsdWUucmVwbGFjZSgvXFxzL2csICcnKS5yZXBsYWNlKC8sL2csICcuJykgOiB2YWx1ZTtcblx0XHRcdFx0XHRcdFx0XHRsZXQgcHJpY2VXaXRoVGF4ID0gQ1Rvb2xzLmdldFByaWNlV2l0aFRheChwcmljZSwgdGhpcy50YXgsIDIpO1xuXHRcdFx0XHRcdFx0XHRcdGxldCBmb3JtYXR0ZWRQcmljZSA9IENUb29scy5mb3JtYXRNb25leShwcmljZSwgdGhpcy5sb2NhbGUpO1xuXHRcdFx0XHRcdFx0XHRcdGxldCBmb3JtYXR0ZWRQcmljZVdpdGhUYXggPSBDVG9vbHMuZm9ybWF0TW9uZXkocHJpY2VXaXRoVGF4LCB0aGlzLmxvY2FsZSk7XG5cblx0XHRcdFx0XHRcdFx0XHRyb3dNYXJrdXAgPSByb3dNYXJrdXAucmVwbGFjZSgve3twcmljZX19L2csIHByaWNlKTtcblx0XHRcdFx0XHRcdFx0XHRyb3dNYXJrdXAgPSByb3dNYXJrdXAucmVwbGFjZSgve3tmb3JtYXR0ZWRQcmljZX19L2csIGAke2Zvcm1hdHRlZFByaWNlfSAke3RoaXMuZ2V0VGV4dCgnY3VycmVuY3knKX1gKTtcblx0XHRcdFx0XHRcdFx0XHRyb3dNYXJrdXAgPSByb3dNYXJrdXAucmVwbGFjZSgve3twcmljZVdpdGhUYXh9fS9nLCBwcmljZVdpdGhUYXgpO1xuXHRcdFx0XHRcdFx0XHRcdHJvd01hcmt1cCA9IHJvd01hcmt1cC5yZXBsYWNlKC97e2Zvcm1hdHRlZFByaWNlV2l0aFRheH19L2csIGAke2Zvcm1hdHRlZFByaWNlV2l0aFRheH0gJHt0aGlzLmdldFRleHQoJ2N1cnJlbmN5Jyl9YCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyb3dNYXJrdXAgPSByb3dNYXJrdXBcblx0XHRcdFx0XHRcdC5yZXBsYWNlKC97e3JlbW92ZUJ1dHRvblRleHR9fS9nLCB0aGlzLmdldFRleHQoJ3JlbW92ZV9idXR0b25fdGV4dCcpKTtcblxuXHRcdFx0XHRcdHJlc3VsdE1hcmt1cC5wdXNoKHJvd01hcmt1cCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoYkFwcGVuZCkge1xuXHRcdFx0dGhpcy4kdGFibGVSb3dDb250YWluZXIuYXBwZW5kKHJlc3VsdE1hcmt1cC5qb2luKCcnKSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuJHRhYmxlUm93Q29udGFpbmVyLmh0bWwoJycpO1xuXHRcdFx0dGhpcy4kdGFibGVSb3dDb250YWluZXIuYXBwZW5kKHJlc3VsdE1hcmt1cC5qb2luKCcnKSk7XG5cdFx0fVxuXG5cdFx0dGhpcy51cGRhdGVTdW1tYXJ5UHJpY2UoKTtcblx0XHR0aGlzLnVwZGF0ZVRhYmxlVmlld1N0YXR1cygpO1xuXHR9XG5cblx0LyoqXG5cdCAqINCe0LHQvdC+0LLQu9C10L3QuNC1INC40YLQvtCz0L7QstC+0Lkg0YHRg9C80LzRiyDRgtCw0LHQu9C40YbRi1xuXHQgKi9cblx0dXBkYXRlU3VtbWFyeVByaWNlKCkge1xuXHRcdGxldCBzdW1tYXJ5UHJpY2UgPSAwO1xuXG5cdFx0JC5lYWNoKHRoaXMuZ2V0Um93cygpLCAoaSwgcm93KSA9PiB7XG5cdFx0XHRsZXQgJHJvdyA9ICQocm93KTtcblx0XHRcdGxldCBwcmljZSA9ICgkcm93LmZpbmQoJy5qcy1wcmljZS13aXRoLXRheCcpLmxlbmd0aClcblx0XHRcdFx0PyAkcm93LmZpbmQoJy5qcy1wcmljZS13aXRoLXRheCcpLmF0dHIoJ2RhdGEtb3JpZ2luYWwtcHJpY2Utd2l0aC10YXgnKVxuXHRcdFx0XHQ6ICRyb3cuZmluZCgnLmpzLXByaWNlJykuYXR0cignZGF0YS1vcmlnaW5hbC1wcmljZScpO1xuXG5cdFx0XHRpZiAocHJpY2UpIHtcblx0XHRcdFx0aWYgKCFpc05hTihzdW1tYXJ5UHJpY2UpICYmICFpc05hTihwcmljZSkpIHtcblx0XHRcdFx0XHRzdW1tYXJ5UHJpY2UgPSBOdW1iZXIoc3VtbWFyeVByaWNlKSArIE51bWJlcihwcmljZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdHRoaXMuJHRhYmxlU3VtbWFyeVByaWNlLmh0bWwoYCR7Q1Rvb2xzLmZvcm1hdE1vbmV5KE51bWJlcihzdW1tYXJ5UHJpY2UpLCB0aGlzLmxvY2FsZSl9ICR7dGhpcy5nZXRUZXh0KCdjdXJyZW5jeScpfWApO1xuXHR9XG5cblx0LyoqXG5cdCAqINCf0L7Qu9GD0YfQuNGC0Ywg0LLRgdC1INGB0YLRgNC+0LrQuCDQuNC3INGC0LDQsdC70LjRhtGLXG5cdCAqL1xuXHRnZXRSb3dzKCkge1xuXHRcdHJldHVybiB0aGlzLiR0YWJsZVJvd0NvbnRhaW5lci5maW5kKCdbZGF0YS1yb3ctaWRdJyk7XG5cdH1cblxuXHQvKipcblx0ICog0JTQvtCx0LDQstC40YLRjCDQtNCw0L3QvdGL0LUg0L4g0LfQsNC/0LjRgdC4INCyIGxvY2FsU3RvcmFnZVxuXHQgKiBAcGFyYW0gZGF0YVxuXHQgKi9cblx0YWRkUm93VG9Mb2NhbFN0b3JhZ2UoZGF0YSkge1xuXHRcdGlmIChkYXRhICYmIGRhdGEuaWQgJiYgbG9jYWxTdG9yYWdlKSB7XG5cdFx0XHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgYXV0b1BhcnRzLS1yb3ctJHtkYXRhLmlkfWAsIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICog0J/QvtC70YPRh9C40YLRjCDQtNCw0L3QvdGL0LUg0LjQtyBsb2NhbFN0b3JhZ2Vcblx0ICogQHJldHVybnMgeyp9XG5cdCAqL1xuXHRnZXRBbGxSb3dzRnJvbUxvY2FsU3RvcmFnZSgpIHtcblx0XHRsZXQgZGF0YSA9IHt9O1xuXG5cdFx0aWYgKCFsb2NhbFN0b3JhZ2UpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRmb3IgKGxldCBrZXkgaW4gbG9jYWxTdG9yYWdlKSB7XG5cdFx0XHRpZiAobG9jYWxTdG9yYWdlLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdFx0aWYgKGtleS5pbmRleE9mKCdhdXRvUGFydHMtLXJvdycpICE9IC0xKSB7XG5cdFx0XHRcdFx0bGV0IG9iaiA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KSk7XG5cdFx0XHRcdFx0ZGF0YVtvYmouaWRdID0gb2JqO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIE9iamVjdC5rZXlzKGRhdGEpLmxlbmd0aCA/IGRhdGEgOiBmYWxzZTtcblx0fVxuXG5cdC8qKlxuXHQgKiDQo9C00LDQu9C40YLRjCDQtNCw0L3QvdGL0LUg0LjQtyBsb2NhbFN0b3JhZ2Vcblx0ICogQHBhcmFtIGlkXG5cdCAqL1xuXHRkZWxldGVSb3dGcm9tTG9jYWxTdG9yYWdlKGlkKSB7XG5cdFx0aWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGBhdXRvUGFydHMtLXJvdy0ke2lkfWApKSB7XG5cdFx0XHRsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShgYXV0b1BhcnRzLS1yb3ctJHtpZH1gKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICog0J/QvtC70YPRh9C40YLRjCDRgtC10LrRgdGCINC/0L4g0LrQvtC00YMg0LTQu9GPINC/0LXRgNC10LTQsNC90L3QvtC5INC70L7QutCw0LvQuFxuXHQgKiBAcGFyYW0gbG9jYWxlIC0g0LvQvtC60LDQu9GMXG5cdCAqIEBwYXJhbSB0ZXh0IC0g0YLQtdC60YHRglxuXHQgKiBAcmV0dXJucyB7ZnVuY3Rpb24oKil9XG5cdCAqL1xuXHRnZXRUZXh0QnlMb2NhbGUobG9jYWxlID0gJ3J1JywgdGV4dCkge1xuXHRcdHJldHVybiAodGV4dCkgPT4ge1xuXHRcdFx0cmV0dXJuICh0aGlzLnRleHQgJiYgdGhpcy50ZXh0W2xvY2FsZV0gJiYgdGhpcy50ZXh0W2xvY2FsZV1bdGV4dF0pID8gdGhpcy50ZXh0W2xvY2FsZV1bdGV4dF0gOiBmYWxzZTtcblx0XHR9O1xuXHR9XG5cblx0LyoqXG5cdCAqINCf0L7Qu9GD0YfQuNGC0Ywg0YPRgdC70L7QstC90L4g0YPQvdC40LrQsNC70YzQvdGL0LkgaWRcblx0ICogQHJldHVybnMge251bWJlcn1cblx0ICovXG5cdGdlbmVyYXRlVW5pcVJvd0lEKCkge1xuXHRcdGxldCB1bmlxSUQgPSAwO1xuXHRcdGxldCBleGlzdGVkSUQgPSBbXTtcblxuXHRcdCQuZWFjaCh0aGlzLmdldFJvd3MoKSwgKGksIHJvdykgPT4ge1xuXHRcdFx0ZXhpc3RlZElELnB1c2goJChyb3cpLmF0dHIoJ2RhdGEtcm93LWlkJykpO1xuXHRcdH0pO1xuXG5cdFx0aWYgKGV4aXN0ZWRJRC5sZW5ndGgpIHtcblx0XHRcdGxldCBtYXggPSBNYXRoLm1heC5hcHBseShudWxsLCBleGlzdGVkSUQubWFwKE51bWJlcikpO1xuXHRcdFx0dW5pcUlEID0gbWF4ICsgMTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdW5pcUlEO1xuXHR9XG5cblx0LyoqXG5cdCAqINCS0YvQstC+0LTQuNGCINGB0L7QvtCx0YnQtdC90LjQtSDQsiDQuNC90YTQvtGA0LzQsNGG0LjQvtC90L3QvtC8INGC0LDQsdC70LjRh9C90L7QvCDQsdC70L7QutC1XG5cdCAqIEBwYXJhbSBtc2dcblx0ICovXG5cdHNob3dUYWJsZU5vdGlmaWNhdGlvbihtc2cgPSAnJykge1xuXHRcdGlmIChtc2cpIHtcblx0XHRcdHRoaXMuJHRhYmxlTm90eS5odG1sKG1zZyk7XG5cdFx0XHR0aGlzLiR0YWJsZVdyYXBwZXIuYWRkQ2xhc3MoJ2lzLW5vdHknKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICog0J/RgNC+0LLQtdGA0Y/QtdGCLCDQtdGB0YLRjCDQu9C4INCyINGC0LDQsdC70LjRhtC1INC00LDQvdC90YvQtSDQtNC70Y8g0L/QvtC60LDQt9CwLiDQldGB0LvQuCDQvdC10YIgLSDQstGL0LLQvtC00LjRgiDRg9Cy0LXQtNC+0LzQu9C10L3QuNC1XG5cdCAqL1xuXHR1cGRhdGVUYWJsZVZpZXdTdGF0dXMoKSB7XG5cdFx0aWYgKHRoaXMuaXNOb1Jvd3MoKSkge1xuXHRcdFx0dGhpcy5zaG93VGFibGVOb3RpZmljYXRpb24odGhpcy5nZXRUZXh0KCdlcnJvci0tZW1wdHlfZGF0YScpKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy4kdGFibGVXcmFwcGVyLnJlbW92ZUNsYXNzKCdpcy1ub3R5Jyk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqINCf0YDQvtCy0LXRgNGP0LXRgiwg0L/Rg9GB0YLQsCDQuNC7INGC0LDQsdC70LjRhtCwXG5cdCAqIEByZXR1cm5zIHtib29sZWFufVxuXHQgKi9cblx0aXNOb1Jvd3MoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0Um93cygpLmxlbmd0aCA9PSAwO1xuXHR9XG5cblx0LyoqXG5cdCAqINCR0LvQvtC60LjRgNC+0LLQutCwINGC0LDQsdC70LjRhtGLXG5cdCAqL1xuXHRsb2NrVGFibGUoKSB7XG5cdFx0dGhpcy4kdGFibGVXcmFwcGVyLmFkZENsYXNzKCdpcy1wcmVsb2FkaW5nJyk7XG5cdH1cblxuXHQvKipcblx0ICog0KDQsNC30LHQu9C+0LrQuNGA0L7QstC60LAg0YLQsNCx0LvQuNGG0Ytcblx0ICovXG5cdHVubG9ja1RhYmxlKCkge1xuXHRcdHRoaXMuJHRhYmxlV3JhcHBlci5yZW1vdmVDbGFzcygnaXMtcHJlbG9hZGluZycpO1xuXHR9XG5cblx0LyoqXG5cdCAqINCi0LDQsdC70LjRhtCwINC30LDQsdC70L7QutC40YDQvtCy0LDQvdCwP1xuXHQgKi9cblx0aXNUYWJsZUxvY2soKSB7XG5cdFx0cmV0dXJuIHRoaXMuJHRhYmxlV3JhcHBlci5oYXNDbGFzcygnaXMtcHJlbG9hZGluZycpO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQ0NhcmFtYmFDb250cm9sbGVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3BhcnRzL0NDYXJhbWJhLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==