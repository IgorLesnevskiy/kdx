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
					return Object.assign({}, localData, data);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcGFydHMvQ1Rvb2xzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9wYXJ0cy9DQ2FyYW1iYS5qcyJdLCJuYW1lcyI6WyJDQ2FyYW1iYUNvbnRyb2xsZXIiLCJyZXF1aXJlIiwiQ1Rvb2xzIiwiUHJvbWlzZSIsImNvbmZpZyIsIndhcm5pbmdzIiwibG9uZ1N0YWNrVHJhY2VzIiwiY2FuY2VsbGF0aW9uIiwibW9uaXRvcmluZyIsInByb2R1Y3Rpb24iLCJDQXBwQ29udHJvbGxlciIsImNDYXJhbWJhQ29udHJvbGxlciIsImNUb29scyIsInJlc29sdmUiLCJ0aGVuIiwiaW5pdFNtYXJ0TGFiZWxzIiwiaW5pdEN1c3RvbVNlbGVjdHMiLCJpbml0TWFza3MiLCJpbml0Q3VzdG9tRm9ybVZhbGlkYXRvcnMiLCJpbml0IiwiJHNtYXJ0TGFiZWxzIiwiJCIsImxlbmd0aCIsIm9uIiwiJHRoaXMiLCJ0b2dnbGVDbGFzcyIsInZhbCIsImJsdXIiLCIkc2VsZWN0cyIsInNlbGVjdDIiLCJ3aW5kb3ciLCJQYXJzbGV5IiwiYWRkVmFsaWRhdG9yIiwidmFsaWRhdGVTdHJpbmciLCJ2YWx1ZSIsIk51bWJlciIsIkRhdGUiLCJnZXRGdWxsWWVhciIsIm1lc3NhZ2VzIiwicnUiLCIkeWVhck1hc2siLCIkbW9uZXlNYXNrIiwibWFzayIsIm1hc2tNb25leSIsInRob3VzYW5kcyIsImRlY2ltYWwiLCJhbGxvd05vRGVjaW1hbCIsImNBcHBDb250cm9sbGVyIiwiZG9jdW1lbnQiLCJyZWFkeSIsImdsb2JhbCIsIkFDIiwib2JqZWN0IiwiSlNPTiIsInBhcnNlIiwic3RyaW5naWZ5IiwicHJpY2UiLCJsb2NhbGUiLCJuUHJpY2UiLCJpc05hTiIsInRvTG9jYWxlU3RyaW5nIiwidGF4IiwicHJlY2lzaW9uIiwiblRheCIsInByaWNlV2l0aFRheCIsInRvRml4ZWQiLCJtb2R1bGUiLCJleHBvcnRzIiwibG9hZFVybCIsInRleHQiLCJyZW1vdmVfYnV0dG9uX3RleHQiLCJjdXJyZW5jeSIsImVuIiwiZ2V0VGV4dCIsImdldFRleHRCeUxvY2FsZSIsIm1hcmt1cFRlbXBsYXRlIiwic2NhZmZvbGQiLCJvcHRpb25hbCIsImRlc2NyaXB0aW9uIiwiY29sb3JCb3giLCIkdGFibGVXcmFwcGVyIiwiJGZvcm0iLCIkdGFibGVSb3dDb250YWluZXIiLCJmaW5kIiwiJHRhYmxlTm90eSIsIiR0YWJsZVN1bW1hcnlQcmljZSIsImluaXREZWxldGVUcmlnZ2VyIiwiaW5pdEZvcm0iLCJsb2NrVGFibGUiLCJsb2FkRGF0YSIsImRhdGEiLCJkZWxheSIsIk9iamVjdCIsImtleXMiLCJ1cGRhdGVUYWJsZVdpdGhEYXRhIiwic2hvd1RhYmxlTm90aWZpY2F0aW9uIiwidW5sb2NrVGFibGUiLCJjYXRjaCIsIm1zZyIsInBhcnNsZXkiLCJmb3JtIiwiaXNUYWJsZUxvY2siLCJmaWVsZCIsImZpZWxkcyIsImhhc093blByb3BlcnR5IiwiZmllbGROYW1lIiwiJGVsZW1lbnQiLCJhdHRyIiwiZ2V0VmFsdWUiLCJyZXBsYWNlIiwiaWQiLCJnZW5lcmF0ZVVuaXFSb3dJRCIsInByZXBhcmVkRGF0YSIsInB1c2giLCJhZGRSb3dUb0xvY2FsU3RvcmFnZSIsInJlc2V0Rm9ybSIsInBhcnNsZXlGb3JtIiwiJGN1c3RvbVNlbGVjdHMiLCJyZXNldCIsInJlbW92ZUNsYXNzIiwiZWFjaCIsImkiLCJzZWxlY3QiLCJ0cmlnZ2VyIiwiZSIsImN1cnJlbnRUYXJnZXQiLCIkcm93IiwiY2xvc2VzdCIsInJvd0lEIiwicmVtb3ZlIiwiZGVsZXRlUm93RnJvbUxvY2FsU3RvcmFnZSIsInVwZGF0ZVRhYmxlVmlld1N0YXR1cyIsInVwZGF0ZVN1bW1hcnlQcmljZSIsInJlamVjdCIsImFqYXgiLCJ1cmwiLCJkYXRhVHlwZSIsInN1Y2Nlc3MiLCJlcnJvciIsImpxWEhSIiwidGV4dFN0YXR1cyIsImNhY2hlIiwibG9jYWxEYXRhIiwiZ2V0QWxsUm93c0Zyb21Mb2NhbFN0b3JhZ2UiLCJhc3NpZ24iLCJiQXBwZW5kIiwicmVzdWx0TWFya3VwIiwicm93IiwidGl0bGUiLCJyb3dNYXJrdXAiLCJzdGF0dXNUZXh0IiwiZ2V0UHJpY2VXaXRoVGF4IiwiZm9ybWF0dGVkUHJpY2UiLCJmb3JtYXRNb25leSIsImZvcm1hdHRlZFByaWNlV2l0aFRheCIsImFwcGVuZCIsImpvaW4iLCJodG1sIiwic3VtbWFyeVByaWNlIiwiZ2V0Um93cyIsImxvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJrZXkiLCJpbmRleE9mIiwib2JqIiwiZ2V0SXRlbSIsInJlbW92ZUl0ZW0iLCJ1bmlxSUQiLCJleGlzdGVkSUQiLCJtYXgiLCJNYXRoIiwiYXBwbHkiLCJtYXAiLCJhZGRDbGFzcyIsImlzTm9Sb3dzIiwiaGFzQ2xhc3MiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBTUEscUJBQXFCLG1CQUFBQyxDQUFRLHlCQUFSLENBQTNCO0FBQ0EsSUFBTUMsU0FBUyxtQkFBQUQsQ0FBUSx1QkFBUixDQUFmOztBQUVBRSxRQUFRQyxNQUFSLENBQWU7QUFDZDtBQUNBQyxXQUFVLENBQUMsS0FGRztBQUdkO0FBQ0FDLGtCQUFpQixDQUFDLEtBSko7QUFLZDtBQUNBQyxlQUFjLENBQUMsS0FORDtBQU9kO0FBQ0FDLGFBQVksQ0FBQyxLQUFBQztBQVJDLENBQWY7O0FBV0E7Ozs7SUFHTUMsYztBQUNMLDJCQUFjO0FBQUE7O0FBQ2IsT0FBS0Msa0JBQUwsR0FBMEIsSUFBSVgsa0JBQUosRUFBMUI7QUFDQSxPQUFLWSxNQUFMLEdBQWMsSUFBSVYsTUFBSixFQUFkO0FBQ0E7Ozs7eUJBRU07QUFBQTs7QUFDTixVQUFPQyxRQUFRVSxPQUFSLEdBQ0xDLElBREssQ0FDQSxZQUFNOztBQUVYLFVBQUtDLGVBQUw7QUFDQSxVQUFLQyxpQkFBTDtBQUNBLFVBQUtDLFNBQUw7QUFDQSxVQUFLQyx3QkFBTDs7QUFFQSxVQUFLUCxrQkFBTCxDQUF3QlEsSUFBeEI7QUFDQSxJQVRL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QW1CNkYsUUFBbkIsQ0FBNEIsU0FBNUI7QUFDQTtBQUNEOztBQUVEOzs7Ozs7MENBR3dCO0FBQ3ZCLE9BQUksS0FBS0MsUUFBTCxFQUFKLEVBQXFCO0FBQ3BCLFNBQUsvRSxxQkFBTCxDQUEyQixLQUFLdEIsT0FBTCxDQUFhLG1CQUFiLENBQTNCO0FBQ0EsSUFGRCxNQUVPO0FBQ04sU0FBS08sYUFBTCxDQUFtQnVDLFdBQW5CLENBQStCLFNBQS9CO0FBQ0E7QUFDRDs7QUFFRDs7Ozs7Ozs2QkFJVztBQUNWLFVBQU8sS0FBS3dDLE9BQUwsR0FBZXpJLE1BQWYsSUFBeUIsQ0FBaEM7QUFDQTs7QUFFRDs7Ozs7OzhCQUdZO0FBQ1gsUUFBSzBELGFBQUwsQ0FBbUI2RixRQUFuQixDQUE0QixlQUE1QjtBQUNBOztBQUVEOzs7Ozs7Z0NBR2M7QUFDYixRQUFLN0YsYUFBTCxDQUFtQnVDLFdBQW5CLENBQStCLGVBQS9CO0FBQ0E7O0FBRUQ7Ozs7OztnQ0FHYztBQUNiLFVBQU8sS0FBS3ZDLGFBQUwsQ0FBbUIrRixRQUFuQixDQUE0QixlQUE1QixDQUFQO0FBQ0E7Ozs7OztBQUdGN0csT0FBT0MsT0FBUCxHQUFpQm5FLGtCQUFqQixDIiwiZmlsZSI6Im1haW4uYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgQ0NhcmFtYmFDb250cm9sbGVyID0gcmVxdWlyZSgnLi9wYXJ0cy9DQ2FyYW1iYScpO1xuY29uc3QgQ1Rvb2xzID0gcmVxdWlyZSgnLi9wYXJ0cy9DVG9vbHMnKTtcblxuUHJvbWlzZS5jb25maWcoe1xuXHQvLyBFbmFibGUgd2FybmluZ3Ncblx0d2FybmluZ3M6ICFwcm9kdWN0aW9uLFxuXHQvLyBFbmFibGUgbG9uZyBzdGFjayB0cmFjZXNcblx0bG9uZ1N0YWNrVHJhY2VzOiAhcHJvZHVjdGlvbixcblx0Ly8gRW5hYmxlIGNhbmNlbGxhdGlvblxuXHRjYW5jZWxsYXRpb246ICFwcm9kdWN0aW9uLFxuXHQvLyBFbmFibGUgbW9uaXRvcmluZ1xuXHRtb25pdG9yaW5nOiAhcHJvZHVjdGlvblxufSk7XG5cbi8qKlxuICog0JPQu9Cw0LLQvdGL0Lkg0LrQvtC90YLRgNC+0LvQu9C10YBcbiAqL1xuY2xhc3MgQ0FwcENvbnRyb2xsZXIge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHR0aGlzLmNDYXJhbWJhQ29udHJvbGxlciA9IG5ldyBDQ2FyYW1iYUNvbnRyb2xsZXIoKTtcblx0XHR0aGlzLmNUb29scyA9IG5ldyBDVG9vbHMoKTtcblx0fVxuXG5cdGluaXQoKSB7XG5cdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXG5cdFx0XHQudGhlbigoKSA9PiB7XG5cblx0XHRcdFx0dGhpcy5pbml0U21hcnRMYWJlbHMoKTtcblx0XHRcdFx0dGhpcy5pbml0Q3VzdG9tU2VsZWN0cygpO1xuXHRcdFx0XHR0aGlzLmluaXRNYXNrcygpO1xuXHRcdFx0XHR0aGlzLmluaXRDdXN0b21Gb3JtVmFsaWRhdG9ycygpO1xuXG5cdFx0XHRcdHRoaXMuY0NhcmFtYmFDb250cm9sbGVyLmluaXQoKTtcblx0XHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqINCY0L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPINGD0LzQvdGL0YUg0L/Qu9C10LnRgdGF0L7Qu9C00LXRgNC+0LJcblx0ICovXG5cdGluaXRTbWFydExhYmVscygpIHtcblx0XHRjb25zdCAkc21hcnRMYWJlbHMgPSAkKCcuanMtc21hcnQtbGFiZWwtLWlucHV0Jyk7XG5cblx0XHRpZiAoJHNtYXJ0TGFiZWxzLmxlbmd0aCkge1xuXHRcdFx0JHNtYXJ0TGFiZWxzLm9uKCdibHVyJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRsZXQgJHRoaXMgPSAkKHRoaXMpO1xuXG5cdFx0XHRcdCR0aGlzLnRvZ2dsZUNsYXNzKCdpcy1maWxsJywgJHRoaXMudmFsKCkgIT09ICcnKTtcblx0XHRcdH0pLmJsdXIoKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICog0JjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y8g0LrQsNGB0YLQvtC80L3Ri9GFINGB0LXQu9C10LrRgtC+0LJcblx0ICovXG5cdGluaXRDdXN0b21TZWxlY3RzKCkge1xuXHRcdGNvbnN0ICRzZWxlY3RzID0gJCgnW2RhdGEtaXMtY3VzdG9tLXNlbGVjdF0nKTtcblxuXHRcdGlmICgkc2VsZWN0cy5sZW5ndGgpIHtcblx0XHRcdCRzZWxlY3RzLnNlbGVjdDIoe1xuXG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICog0JrQsNGB0YLQvtC80L3Ri9C1INGC0LjQv9GLINCy0LDQu9C40LTQsNGG0LjQuVxuXHQgKi9cblx0aW5pdEN1c3RvbUZvcm1WYWxpZGF0b3JzKCkge1xuXHRcdHdpbmRvdy5QYXJzbGV5LmFkZFZhbGlkYXRvcigncHJvZHVjdGlvblllYXInLCB7XG5cdFx0XHR2YWxpZGF0ZVN0cmluZzogZnVuY3Rpb24gKHZhbHVlKSB7XG5cdFx0XHRcdHJldHVybiBOdW1iZXIodmFsdWUpID49IDE5ODAgJiYgTnVtYmVyKHZhbHVlKSA8PSBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCk7XG5cdFx0XHR9LFxuXHRcdFx0bWVzc2FnZXM6IHtcblx0XHRcdFx0cnU6IGDQk9C+0LQg0LzQvtC20LXRgiDQsdGL0YLRjCDQt9Cw0LTQsNC9INC+0YIgMTk4MCDQtNC+ICR7bmV3IERhdGUoKS5nZXRGdWxsWWVhcigpfWBcblx0XHRcdH1cblx0XHR9KTtcblxuXHR9XG5cblx0LyoqXG5cdCAqINCc0LDRgdC60Lhcblx0ICovXG5cdGluaXRNYXNrcygpIHtcblx0XHRsZXQgJHllYXJNYXNrID0gJCgnW2RhdGEteWVhci1tYXNrXScpO1xuXHRcdGxldCAkbW9uZXlNYXNrID0gJCgnW2RhdGEtbW9uZXktbWFza10nKTtcblxuXHRcdGlmICgkeWVhck1hc2subGVuZ3RoKSB7XG5cdFx0XHQkeWVhck1hc2subWFzaygnOTk5OScpO1xuXHRcdH1cblxuXHRcdGlmICgkbW9uZXlNYXNrLmxlbmd0aCkge1xuXHRcdFx0Ly9ydVxuXHRcdFx0JG1vbmV5TWFzay5tYXNrTW9uZXkoe1xuXHRcdFx0XHR0aG91c2FuZHM6ICcgJyxcblx0XHRcdFx0ZGVjaW1hbDogJy4nLFxuXHRcdFx0XHRhbGxvd05vRGVjaW1hbDogdHJ1ZVxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG59XG5cbmNvbnN0IGNBcHBDb250cm9sbGVyID0gbmV3IENBcHBDb250cm9sbGVyKCk7XG5cbiQoZG9jdW1lbnQpLnJlYWR5KCgpID0+IHtcblx0Y0FwcENvbnRyb2xsZXIuaW5pdCgpXG5cdFx0LnRoZW4oKCkgPT4ge1xuXHRcdFx0Ly/QstGL0LHRgNCw0YHRi9Cy0LDQtdC8INCyIGdsb2JhbCDQtNC70Y8g0LTQvtGB0YLRg9C/0LBcblx0XHRcdGdsb2JhbC5BQyA9IGNBcHBDb250cm9sbGVyO1xuXHRcdH0pO1xufSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvbWFpbi5qcyIsIi8qKlxuICog0JLRgdC/0L7QvNC+0LPQsNGC0LXQu9GM0L3Ri9C1INGE0YPQvdC60YbQuNC4XG4gKi9cbmNsYXNzIENUb29scyB7XG5cdGNvbnN0cnVjdG9yKCkge31cblxuXHQvKipcblx0ICog0JrQu9C+0L3QuNGA0L7QstCw0L3QuNC1INC+0LHRitC10LrRgtCwINCx0LXQtyDQv9GA0LjQstGP0LfQutC4INC/0L4g0YHRgdGL0LvQutC1XG5cdCAqIEBwYXJhbSBvYmplY3Rcblx0ICovXG5cdHN0YXRpYyBjbG9uZU9iamVjdChvYmplY3QgPSB7fSkge1xuXHRcdHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9iamVjdCkpO1xuXHR9XG5cblx0LyoqXG5cdCAqINCk0L7RgNC80LDRgtC40YDQvtCw0L3QuNC1INGB0YLRgNC+0LrQuCDQsiDQtNC10L3QtdC20L3Ri9C5INCy0LjQtFxuXHQgKiBAcGFyYW0gcHJpY2Vcblx0ICogQHBhcmFtIGxvY2FsZVxuXHQgKiBAcmV0dXJucyB7Kn1cblx0ICovXG5cdHN0YXRpYyBmb3JtYXRNb25leShwcmljZSwgbG9jYWxlID0gJ3J1Jykge1xuXHRcdGxldCBuUHJpY2UgPSBOdW1iZXIocHJpY2UpO1xuXG5cdFx0aWYgKCFpc05hTihuUHJpY2UpKSB7XG5cdFx0XHRyZXR1cm4gblByaWNlLnRvTG9jYWxlU3RyaW5nKGxvY2FsZSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBwcmljZTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICog0KbQtdC90LAgKyDQvdCw0LvQvtCzXG5cdCAqIEBwYXJhbSBwcmljZVxuXHQgKiBAcGFyYW0gdGF4XG5cdCAqIEBwYXJhbSBwcmVjaXNpb25cblx0ICovXG5cdHN0YXRpYyBnZXRQcmljZVdpdGhUYXgocHJpY2UsIHRheCA9IDEzLCBwcmVjaXNpb24gPSAwKSB7XG5cdFx0bGV0IG5QcmljZSA9IE51bWJlcihwcmljZSk7XG5cdFx0bGV0IG5UYXggPSBOdW1iZXIodGF4KTtcblxuXHRcdGlmICghaXNOYU4oblByaWNlKSAmJiAhaXNOYU4oblRheCkpIHtcblx0XHRcdGxldCBwcmljZVdpdGhUYXggPSAoKG5QcmljZSAqIG5UYXggLyAxMDApICsgblByaWNlKTtcblx0XHRcdHJldHVybiAocHJpY2VXaXRoVGF4ICUgMSA9PT0gMCkgPyBwcmljZVdpdGhUYXggOiBwcmljZVdpdGhUYXgudG9GaXhlZChwcmVjaXNpb24pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gcHJpY2U7XG5cdFx0fVxuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQ1Rvb2xzO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3BhcnRzL0NUb29scy5qcyIsImNvbnN0IENUb29scyA9IHJlcXVpcmUoJy4vQ1Rvb2xzJyk7XG5cbi8qKlxuICog0JrQvtC90YLRgNC+0LvQu9C10YAg0LTQu9GPINGA0LDQsdC+0YLRiyDRgSDQv9C+0LTRgNCz0YDRg9C30LrQvtC5INC4INC+0LHQvdC+0LLQu9C10L3QuNC10Lwg0YLQsNCx0LvQuNGH0L3Ri9GFINC00LDQvdC90YvRhSDQvtCxINCw0LLRgtC+0LzQvtCx0LjQu9GP0YVcbiAqINCiLtC6LiDQv9C+INC+0LTQvdC+0Lkg0YHRgtGA0LDQvdC40YbQtSDQvdC10LvRjNC30Y8g0L3QuNGH0LXQs9C+INGB0LrQsNC30LDRgtGMINC+INCy0YHQtdC8INC/0YDQvtC10LrRgtC1INCyINGG0LXQu9C+0LwsINGC0L4g0LTQsNC90L3Ri9C5INC60L7QvdGC0YDQvtC70LvQtdGAXG4gKiDRgdC70YPQttC40YIg0YHQutC+0YDQtdC1INC00LvRjyDQtNC10LzQvtC90YHRgtGA0LDRhtC40L3QvdGL0YUg0YbQtdC70LXQuSDQuCDQt9Cw0YLQvtGH0LXQvSDQv9C+0LQg0YDQsNCx0L7RgtGDINGBINC60L7QvdC60YDQtdGC0L3Ri9C80Lgg0LTQsNC90L3Ri9C80Lgg0Lgg0LrQvtC90LrRgNC10YLQvdC50L4g0YTQvtGA0LzQvtC5XG4gKi9cbmNsYXNzIENDYXJhbWJhQ29udHJvbGxlciB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdC8v0LTQsNC90L3Ri9C1INC00LvRjyDQt9Cw0LPRgNGD0LfQutC4XG5cdFx0dGhpcy5sb2FkVXJsID0gJ2h0dHBzOi8vcmF3Z2l0LmNvbS9WYXJpbmV0ei9lNmNiYWRlYzk3MmU3NmEzNDBjNDFhNjVmY2MyYTZiMy9yYXcvOTAxOTE4MjZhM2JhYzJmZjA3NjEwNDBlZDFkOTVjNTlmMTRlYWYyNi9mcm9udGVuZF90ZXN0X3RhYmxlLmpzb24nO1xuXG5cdFx0LyoqXG5cdFx0ICog0JvQvtC60LDQu9C40LfQsNGG0LjRjy4g0JIg0L/QtdGA0YHQv9C10LrRgtC40LLQsNGFINGA0LDQstC30LjRgtC40Y8g0Y3RgtC+INGB0LvQtdC00YPQtdGCINCy0YvQvdC+0YHQuNGC0Ywg0LIg0L7RgtC00LXQu9GM0L3Ri9C5IGpzb24t0YTQsNC50LssXG5cdFx0ICog0LvQuNCx0L4g0LrQsNC6LdGC0L4g0L/RgNC+0LHRgNCw0YHRi9Cy0LDRgtGMINC40Lcg0LHQsNC30YsuXG5cdFx0ICogQHR5cGUge3tydToge3N0YXR1czoge3BlbmRpbmc6IHN0cmluZywgb3V0X29mX3N0b2NrOiBzdHJpbmcsIGluX3N0b2NrOiBzdHJpbmd9LCByZW1vdmVCdXR0b25UZXh0OiBzdHJpbmd9LCBlbjoge319fVxuXHRcdCAqL1xuXHRcdHRoaXMudGV4dCA9IHtcblx0XHRcdHJ1OiB7XG5cdFx0XHRcdCdzdGF0dXMtLXBlbmRpbmcnOiAn0J7QttC40LTQsNC10YLRgdGPJyxcblx0XHRcdFx0J3N0YXR1cy0tb3V0X29mX3N0b2NrJzogJ9Cd0LXRgiDQsiDQvdCw0LvQuNGH0LjQuCcsXG5cdFx0XHRcdCdzdGF0dXMtLWluX3N0b2NrJzogJ9CSINC90LDQu9C40YfQuNC4Jyxcblx0XHRcdFx0J2Vycm9yLS1sb2FkX2Vycm9yJzogJ9Ce0YjQuNCx0LrQsCDQt9Cw0LPRgNGD0LfQutC4INC00LDQvdC90YvRhScsXG5cdFx0XHRcdCdlcnJvci0tZW1wdHlfZGF0YSc6ICfQndC10YIg0LTQsNC90L3Ri9GFINC00LvRjyDQvtGC0L7QsdGA0LDQttC10L3QuNGPJyxcblx0XHRcdFx0cmVtb3ZlX2J1dHRvbl90ZXh0OiAn0KPQtNCw0LvQuNGC0YwnLFxuXHRcdFx0XHRjdXJyZW5jeTogJ9GA0YPQsS4nXG5cdFx0XHR9LFxuXHRcdFx0ZW46IHtcblxuXHRcdFx0fVxuXHRcdH07XG5cblx0XHQvL9C70L7QutCw0LvRjFxuXHRcdHRoaXMubG9jYWxlID0gJ3J1Jztcblx0XHQvL9C30L3QsNGH0LXQvdC40LUg0L3QsNC70L7Qs9C+0LLQvtC5INGB0YLQsNCy0LrQuCDQv9C+LdGD0LzQvtC70YfQsNC90LjRjlxuXHRcdHRoaXMudGF4ID0gMTM7XG5cblx0XHQvKipcblx0XHQgKiDQn9C+0LvRg9GH0LXQvdC40LUg0YLQtdC60YHRgtCwINC/0L4g0LrQvtC00YMuINCb0L7QutCw0LvRjCDQv9C10YDQtdC00LDQvdCwINGH0LXRgNC10Lcg0LrQsNGA0YDQuNGA0L7QstCw0L3QuNC1XG5cdFx0ICovXG5cdFx0dGhpcy5nZXRUZXh0ID0gdGhpcy5nZXRUZXh0QnlMb2NhbGUodGhpcy5sb2NhbGUpO1xuXG5cdFx0LyoqXG5cdFx0ICog0J/QvtGH0LXQvNGDINC40LzQtdC90L3QviDRgtCw0LrQvtC1INGA0LXRiNC10L3QuNC1P1xuXHRcdCAqINCY0LfQvdCw0YfQsNC70YzQvdC+INGDINC80LXQvdGPINCx0YvQu9CwINC40LTQtdGPINGF0YDQsNC90LjRgtGMINGN0YLQviDQsiDQstC40LTQtSBqc29uLdC00LXRgNC10LLQsCDQv9C+INGC0LjQv9GDIHhtbCwg0L7QtNC90LDQutC+INGN0YLQviDRg9GB0LvQvtC20L3Rj9C10YJcblx0XHQgKiDRg9GB0LvQvtC20L3Rj9C10YIg0YfQuNGC0LDQtdC80L7RgdGC0Ywg0YDQsNC30LzQtdGC0LrQuC4g0JIg0L/QtdGA0YHQv9C10LrRgtC40LLQsNGFINGA0LDQt9Cy0LjRgtC40Y8g0Y3RgtC+INC80L7QttC90L4g0LLRi9C90LXRgdGC0Lgg0LIg0LLQuNC00LVcblx0XHQgKiDRgtCw0LrQvtCz0L4g0LbQtSDQvtCx0YrQtdC60YLQsCDQsiDQvtC00L3QtdC70YzQvdGLIGpzb24t0YHQvdC40L/Qv9C10YIg0Lgg0L/QvtC00LPRgNGD0LbQsNGC0Ywg0LDRgdC40L3RhdGA0L7QvdC90L4sINC90LDQv9GA0LjQvNC10YAuINCd0L4g0LIg0YDQsNC80LrQsNGFINC00LDQvdC90L7Qs9C+XG5cdFx0ICog0LfQsNC00LDQvdC40Y8g0Lgg0L/RgNC4INC90LXQuNC30LLQtdGB0YLQvdC+0Lkg0LDRgNGF0LjRgtC10LrRgtGD0YDQtSDQv9GA0L7Rh9C40YUg0YfQsNGB0YLQtdC5INC/0YDQvtC00YPQutGC0LAsINGPINGA0LXRiNC40Lsg0L3QtSDRg9GB0LvQvtC20L3Rj9GC0Ywg0Y3RgtC+INC00L4g0YLQsNC60L7QuSDRgdGC0LXQv9C10L3QuC5cblx0XHQgKiBzY2FmZm9sZCAtINGB0LrQtdC70LXRgiDRgNCw0LfQvNC10YLQutC4LiDQotCw0LrQttC1INCyINC90LXQvCDQv9GA0LjRgdGD0YLRgdGC0LLRg9GO0YIg0L7Qv9GG0LjQvtC90LDQu9GM0L3Ri9C1INGH0LDRgdGC0LgsINC60L7RgtC+0YDRi9C1INC+0L/QuNGB0LDQvdC40LUg0LIgb3B0aW9uYWxcblx0XHQgKiBAdHlwZSB7e3NjYWZmb2xkOiBzdHJpbmcsIG9wdGlvbmFsOiB7ZGVzY3JpcHRpb246IHN0cmluZywgY29sb3JCb3g6IHN0cmluZ319fVxuXHRcdCAqL1xuXHRcdHRoaXMubWFya3VwVGVtcGxhdGUgPSB7XG5cdFx0XHRzY2FmZm9sZDogYFxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwiYi1jdXN0b20tdGFibGVfX3Jvd1wiIGRhdGEtcm93LWlkPVwie3tpZH19XCI+XG5cdFx0XHRcdCAgPGRpdiBjbGFzcz1cImItY3VzdG9tLXRhYmxlX19jZWxsIGItY3VzdG9tLXRhYmxlX19jZWxsLS10aXRsZVwiPlxuXHRcdFx0XHQgICAgPGRpdiBjbGFzcz1cInRpdGxlXCI+e3t0aXRsZX19PC9kaXY+XG5cdFx0XHRcdCAgICB7e29wdGlvbmFsRGVzY3JpcHRpb259fVxuXHRcdFx0XHQgIDwvZGl2PlxuXHRcdFx0XHQgIDxkaXYgY2xhc3M9XCJiLWN1c3RvbS10YWJsZV9fY2VsbCBiLWN1c3RvbS10YWJsZV9fY2VsbC0teWVhclwiPnt7eWVhcn19PC9kaXY+XG5cdFx0XHRcdCAgPGRpdiBjbGFzcz1cImItY3VzdG9tLXRhYmxlX19jZWxsIGItY3VzdG9tLXRhYmxlX19jZWxsLS1jb2xvclwiPlxuXHRcdFx0XHQgICAge3tvcHRpb25hbENvbG9yYm94fX1cblx0XHRcdFx0ICA8L2Rpdj5cblx0XHRcdFx0ICA8ZGl2IGNsYXNzPVwiYi1jdXN0b20tdGFibGVfX2NlbGwgYi1jdXN0b20tdGFibGVfX2NlbGwtLXN0YXR1c1wiPnt7c3RhdHVzfX08L2Rpdj5cblx0XHRcdFx0ICA8ZGl2IGNsYXNzPVwiYi1jdXN0b20tdGFibGVfX2NlbGwgYi1jdXN0b20tdGFibGVfX2NlbGwtLXByaWNlXCI+XG5cdFx0XHRcdCAgICA8bm9iciBjbGFzcz1cInByaWNlIGpzLXByaWNlXCIgZGF0YS1vcmlnaW5hbC1wcmljZT1cInt7cHJpY2V9fVwiPnt7Zm9ybWF0dGVkUHJpY2V9fTwvbm9icj5cblx0XHRcdFx0ICAgIDxub2JyIGNsYXNzPVwicHJpY2Utd2l0aC10YXgganMtcHJpY2Utd2l0aC10YXhcIiBkYXRhLW9yaWdpbmFsLXByaWNlLXdpdGgtdGF4PVwie3twcmljZVdpdGhUYXh9fVwiPnt7Zm9ybWF0dGVkUHJpY2VXaXRoVGF4fX08L25vYnI+XG5cdFx0XHRcdCAgPC9kaXY+XG5cdFx0XHRcdCAgPGRpdiBjbGFzcz1cImItY3VzdG9tLXRhYmxlX19jZWxsIGItY3VzdG9tLXRhYmxlX19jZWxsLS1hY3Rpb25cIj5cblx0XHRcdFx0ICAgIDxidXR0b24gY2xhc3M9XCJpLWJ1dHRvbiBpLWJ1dHRvbi0tZWxsaXBzZSBpLWJ1dHRvbi0tc2l6ZS1zbWFsbCBqcy1kZWxldGUtdHJpZ2dlclwiPnt7cmVtb3ZlQnV0dG9uVGV4dH19PC9idXR0b24+XG5cdFx0XHRcdCAgPC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0YCxcblx0XHRcdG9wdGlvbmFsOiB7XG5cdFx0XHRcdGRlc2NyaXB0aW9uOiBgPGRpdiBjbGFzcz1cImRlc2NyaXB0aW9uXCI+e3tkZXNjcmlwdGlvbn19PC9kaXY+YCxcblx0XHRcdFx0Y29sb3JCb3g6IGA8ZGl2IGNsYXNzPVwiaS1jb2xvci1ib3hcIiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6IHt7Y29sb3JDb2RlfX1cIj48L2Rpdj5gLFxuXHRcdFx0fVxuXHRcdH07XG5cblx0XHR0aGlzLiR0YWJsZVdyYXBwZXIgPSBudWxsO1xuXHR9XG5cblx0LyoqXG5cdCAqINCY0L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPINC70L7Qs9C40LrQuCDRgNCw0LHQvtGC0Ysg0LrQvtC90YLRgNC+0LvQu9C10YDQsFxuXHQgKi9cblx0aW5pdCgpIHtcblx0XHQvL9GC0LDQsdC70LjRhtCwXG5cdFx0dGhpcy4kdGFibGVXcmFwcGVyID0gJCgnI2NhcmFtYmEtdGFibGUnKTtcblx0XHQvL9GE0L7RgNC80LBcblx0XHR0aGlzLiRmb3JtID0gJCgnI2NhcmFtYmEtZm9ybScpO1xuXG5cdFx0aWYgKHRoaXMuJHRhYmxlV3JhcHBlci5sZW5ndGggJiYgdGhpcy4kZm9ybS5sZW5ndGgpIHtcblx0XHRcdC8v0YLQtdC70L4g0YLQsNCx0LvQuNGG0Ytcblx0XHRcdHRoaXMuJHRhYmxlUm93Q29udGFpbmVyID0gdGhpcy4kdGFibGVXcmFwcGVyLmZpbmQoJy5qcy1ib2R5Jyk7XG5cdFx0XHQvL9Cx0LvQvtC6INC00LvRjyDRg9Cy0LXQtNC+0LzQu9C10L3QuNC5XG5cdFx0XHR0aGlzLiR0YWJsZU5vdHkgPSB0aGlzLiR0YWJsZVdyYXBwZXIuZmluZCgnLmpzLW5vdHknKTtcblx0XHRcdC8v0LjRgtC+0LPQvtCy0LDRjyDRhtC10L3QsFxuXHRcdFx0dGhpcy4kdGFibGVTdW1tYXJ5UHJpY2UgPSB0aGlzLiR0YWJsZVdyYXBwZXIuZmluZCgnLmpzLXN1bW1hcnktcHJpY2UnKTtcblxuXHRcdFx0Ly/RgtGA0LjQs9Cz0LXRgCDQtNC70Y8g0YPQtNCw0LvQtdC90LjRjyDRgdGC0YDQvtC6XG5cdFx0XHR0aGlzLmluaXREZWxldGVUcmlnZ2VyKCk7XG5cdFx0XHQvL9C40L3QuNGG0LjQsNC70LjQt9Cw0YbQuNC4INC70L7Qs9C40LrQuCDRgNCw0LHQvtGC0Ysg0YEg0YTQvtGA0LzQvtC5XG5cdFx0XHR0aGlzLmluaXRGb3JtKCk7XG5cblx0XHRcdHRoaXMubG9ja1RhYmxlKCk7XG5cdFx0XHR0aGlzLmxvYWREYXRhKClcblx0XHRcdFx0LnRoZW4oKGRhdGEpID0+IHtcblx0XHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcblx0XHRcdFx0XHRcdC5kZWxheSgxMDAwKSAvL9GN0LzRg9C70Y/RhtC40Y8g0LTQvtC70LPQvtCz0L4g0L7RgtCy0LXRgtCwINC+0YIg0YHQtdGA0LLQtdGA0LBcblx0XHRcdFx0XHRcdC50aGVuKCgpID0+IHtcblx0XHRcdFx0XHRcdFx0aWYgKE9iamVjdC5rZXlzKGRhdGEpLmxlbmd0aCkge1xuXHRcdFx0XHRcdFx0XHRcdC8v0L7QsdC90L7QstC70LXQvdC40LUg0LTQsNC90L3Ri9GFINCyINGC0LDQsdC70LjRhtC6XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy51cGRhdGVUYWJsZVdpdGhEYXRhKGRhdGEpO1xuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMuc2hvd1RhYmxlTm90aWZpY2F0aW9uKHRoaXMuZ2V0VGV4dCgnZXJyb3ItLWVtcHR5X2RhdGEnKSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9KVxuXHRcdFx0XHQudGhlbigoKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy51bmxvY2tUYWJsZSgpO1xuXHRcdFx0XHR9KVxuXHRcdFx0XHQuY2F0Y2goKG1zZykgPT4ge1xuXHRcdFx0XHRcdC8vVE9ETyDQvtCx0YDQsNCx0L7RgtC60LAg0L7RiNC40LHQvtC6XG5cdFx0XHRcdFx0dGhpcy51bmxvY2tUYWJsZSgpO1xuXHRcdFx0XHRcdHRoaXMuc2hvd1RhYmxlTm90aWZpY2F0aW9uKHRoaXMuZ2V0VGV4dCgnZXJyb3ItLWxvYWRfZXJyb3InKSk7XG5cdFx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiDQmNC90LjRhtC40LDQu9C40LfQsNGG0LjRjyDRgNCw0LHQvtGC0Ysg0YEg0YTQvtGA0LzQvtC5XG5cdCAqL1xuXHRpbml0Rm9ybSgpIHtcblx0XHR0aGlzLiRmb3JtLnBhcnNsZXkoKVxuXHRcdFx0Lm9uKCdmb3JtOnN1Ym1pdCcsIChmb3JtKSA9PiB7XG5cdFx0XHRcdGxldCBkYXRhID0ge307XG5cblx0XHRcdFx0aWYgKHRoaXMuaXNUYWJsZUxvY2soKSkge1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRoaXMubG9ja1RhYmxlKCk7XG5cblx0XHRcdFx0Ly/QvtCx0YXQvtC00LjQvCDQstGB0LUg0L/QvtC70Y8g0YTQvtGA0LzRiyDQuCDRgdC+0LHQuNGA0LDQtdC8INC00LDQvdC90YvQtVxuXHRcdFx0XHRmb3IgKGxldCBmaWVsZCBpbiBmb3JtLmZpZWxkcykge1xuXHRcdFx0XHRcdGlmIChmb3JtLmZpZWxkcy5oYXNPd25Qcm9wZXJ0eShmaWVsZCkpIHtcblx0XHRcdFx0XHRcdGxldCBmaWVsZE5hbWUgPSBmb3JtLmZpZWxkc1tmaWVsZF0uJGVsZW1lbnQuYXR0cignZGF0YS1maWVsZC10eXBlJyk7XG5cdFx0XHRcdFx0XHRsZXQgdmFsdWUgPSBmb3JtLmZpZWxkc1tmaWVsZF0uZ2V0VmFsdWUoKTtcblxuXHRcdFx0XHRcdFx0aWYgKGZpZWxkTmFtZSA9PSAncHJpY2UnKSB7XG5cdFx0XHRcdFx0XHRcdGRhdGFbZmllbGROYW1lXSA9IHZhbHVlLnJlcGxhY2UoL1xccy9nLCAnJykucmVwbGFjZSgvLC9nLCAnLicpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0ZGF0YVtmaWVsZE5hbWVdID0gdmFsdWU7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly/Qv9C+0LvRg9GH0LDQtdC8INGD0YHQu9C+0LLQvdC+INGD0L3QuNC60LDQu9GM0L3Ri9C5IElEINC00LvRjyDQvdC+0LLQvtCz0L4g0Y3Qu9C10LzQtdC90YLQsFxuXHRcdFx0XHRkYXRhLmlkID0gdGhpcy5nZW5lcmF0ZVVuaXFSb3dJRCgpO1xuXG5cdFx0XHRcdGxldCBwcmVwYXJlZERhdGEgPSBbXTtcblx0XHRcdFx0cHJlcGFyZWREYXRhLnB1c2goZGF0YSk7XG5cblx0XHRcdFx0Ly/QtNC+0LHQsNCy0LvRj9C10Lwg0Y3Qu9C10LzQtdC90YLQsiDQsiDQu9C+0LrQsNC70YzQvdC+0LUg0YXRgNCw0L3QuNC70LjRidC10YZcblx0XHRcdFx0dGhpcy5hZGRSb3dUb0xvY2FsU3RvcmFnZShkYXRhKTtcblxuXHRcdFx0XHQvL9C+0LHQvdC+0LLQu9C10L3QuNC1XG5cdFx0XHRcdHRoaXMudXBkYXRlVGFibGVXaXRoRGF0YShwcmVwYXJlZERhdGEsIHRydWUpO1xuXG5cdFx0XHRcdHRoaXMucmVzZXRGb3JtKGZvcm0pO1xuXG5cdFx0XHRcdHRoaXMudW5sb2NrVGFibGUoKTtcblxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiDQodCx0YDQvtGB0LjRgtGMINC/0L7Qu9GPINCyINGE0L7RgNC80LVcblx0ICogQHBhcmFtIHBhcnNsZXlGb3JtXG5cdCAqL1xuXHRyZXNldEZvcm0ocGFyc2xleUZvcm0pIHtcblx0XHRsZXQgJGZvcm0gPSAkKHBhcnNsZXlGb3JtLiRlbGVtZW50KTtcblx0XHRsZXQgJGN1c3RvbVNlbGVjdHMgPSAkZm9ybS5maW5kKCdbZGF0YS1pcy1jdXN0b20tc2VsZWN0XScpO1xuXG5cdFx0Ly/RgdCx0YDQsNGB0YvQstCw0LXQvCDQt9C90LDRh9C10L3QuNGPINGE0L7RgNC8XG5cdFx0cGFyc2xleUZvcm0uJGVsZW1lbnRbMF0ucmVzZXQoKTtcblx0XHQkZm9ybS5wYXJzbGV5KCkucmVzZXQoKTtcblxuXHRcdC8v0L7QsdGF0L7QtNC40Lwg0LLRgdC1INC/0L7Qu9GPINGE0L7RgNC80Ysg0Lgg0YHQsdGA0LDRgdGL0LLQsNC10Lwg0LfQsNC/0L7Qu9C90LXQvdC90L7RgdGC0Ywg0L/QvtC70LXQuVxuXHRcdGZvciAobGV0IGZpZWxkIGluIHBhcnNsZXlGb3JtLmZpZWxkcykge1xuXHRcdFx0aWYgKHBhcnNsZXlGb3JtLmZpZWxkcy5oYXNPd25Qcm9wZXJ0eShmaWVsZCkpIHtcblx0XHRcdFx0cGFyc2xleUZvcm0uZmllbGRzW2ZpZWxkXS4kZWxlbWVudC5yZW1vdmVDbGFzcygnaXMtZmlsbCcpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmICgkY3VzdG9tU2VsZWN0cy5sZW5ndGgpIHtcblx0XHRcdCQuZWFjaCgkY3VzdG9tU2VsZWN0cywgKGksIHNlbGVjdCkgPT4ge1xuXHRcdFx0XHQkKHNlbGVjdCkudmFsKCcnKS50cmlnZ2VyKCdjaGFuZ2UnKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cblx0LyoqXG5cdCAqINCY0L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPINC70L7Qs9C40LrQuCDRg9C00LDQu9C10L3QuNGPINGB0YLRgNC+0Log0LjQtyDRgtCw0LHQu9C40YbRi1xuXHQgKi9cblx0aW5pdERlbGV0ZVRyaWdnZXIoKSB7XG5cdFx0dGhpcy4kdGFibGVXcmFwcGVyLm9uKCdjbGljaycsICcuanMtZGVsZXRlLXRyaWdnZXInLCAoZSkgPT4ge1xuXHRcdFx0bGV0ICR0aGlzID0gJChlLmN1cnJlbnRUYXJnZXQpO1xuXHRcdFx0bGV0ICRyb3cgPSAkdGhpcy5jbG9zZXN0KCdbZGF0YS1yb3ctaWRdJyk7XG5cblx0XHRcdGlmICgkcm93Lmxlbmd0aCkge1xuXHRcdFx0XHRsZXQgcm93SUQgPSAkcm93LmF0dHIoJ2RhdGEtcm93LWlkJyk7XG5cblx0XHRcdFx0dGhpcy5sb2NrVGFibGUoKTtcblxuXHRcdFx0XHRQcm9taXNlLnJlc29sdmUoKVxuXHRcdFx0XHRcdC5kZWxheSgxMDApIC8v0YfQuNGB0YLQviDQtNC70Y8g0LTQtdC80L7QvdGB0YLRgNCw0YbQuNC4INGA0LDQsdC+0YLRiyDRgSDRgdC10YDQstC10YDQvtC8XG5cdFx0XHRcdFx0LnRoZW4oKCkgPT4ge1xuXHRcdFx0XHRcdFx0JHJvdy5yZW1vdmUoKTtcblx0XHRcdFx0XHRcdHRoaXMuZGVsZXRlUm93RnJvbUxvY2FsU3RvcmFnZShyb3dJRCk7XG5cdFx0XHRcdFx0XHR0aGlzLnVwZGF0ZVRhYmxlVmlld1N0YXR1cygpO1xuXHRcdFx0XHRcdFx0dGhpcy51cGRhdGVTdW1tYXJ5UHJpY2UoKTtcblx0XHRcdFx0XHRcdHRoaXMudW5sb2NrVGFibGUoKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiDQn9C+0LTQs9GA0YPQt9C60LAg0LTQsNC90L3Ri9C5INGBINGD0LTQsNC70LXQvdC90L7Qs9C+INC40YHRgtC+0YfQvdC40LrQsFxuXHQgKiDQkdCw0LMg0LIgSUUxMCDQuCBJRTExINC90LAgV2luZG93cyA3INC4IFdpbmRvd3MgOC4xIGh0dHA6Ly90YWtlLm1zL3pCRjhqXG5cdCAqIEByZXR1cm5zIHtQcm9taXNlLjxUUmVzdWx0Pn1cblx0ICovXG5cdGxvYWREYXRhKCkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHQkLmFqYXgoe1xuXHRcdFx0XHR1cmw6IHRoaXMubG9hZFVybCxcblx0XHRcdFx0ZGF0YToge30sXG5cdFx0XHRcdGRhdGFUeXBlOiAnanNvbicsXG5cdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XG5cdFx0XHRcdFx0cmVzb2x2ZShkYXRhKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0ZXJyb3I6IChqcVhIUiwgdGV4dFN0YXR1cywgZXJyb3IpID0+IHtcblx0XHRcdFx0XHRyZWplY3QoKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0Y2FjaGU6IGZhbHNlXG5cdFx0XHR9KTtcblx0XHR9KVxuXHRcdFx0LnRoZW4oKGRhdGEpID0+IHtcblx0XHRcdFx0bGV0IGxvY2FsRGF0YSA9IHRoaXMuZ2V0QWxsUm93c0Zyb21Mb2NhbFN0b3JhZ2UoKTtcblxuXHRcdFx0XHRpZiAobG9jYWxEYXRhKSB7XG5cdFx0XHRcdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIGxvY2FsRGF0YSwgZGF0YSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqINCS0YvQstC+0LQg0LTQsNC90L3Ri9GFINCyINGI0LDQsdC70L7QvdC90YPRjiDRgdGC0YDQvtC60YMg0Lgg0LTQvtCx0LDQstC70LXQvdC40LUg0LTQsNC90L3Ri9C10YVcblx0ICogVE9ETyDQtNC+0L/QvtC70L3QuNGC0LXQu9GM0L3QsNGPINCx0LXQt9C+0L/QsNGB0L3QsNGPINC+0LHRgNCw0LHQvtGC0LrQsCDQtNCw0L3QvdGL0YUg0YEg0YHQtdGA0LLQsFxuXHQgKiBAcGFyYW0gZGF0YVxuXHQgKiBAcGFyYW0gYkFwcGVuZCAtINC90LUg0L7Rh9C40YnQsNGC0Ywg0YHRg9GJ0LXRgdGC0LLRg9GO0YnQuNC1INC00LDQvdC90YvQtSDQsiDRgtCw0LHQu9C40YbQtVxuXHQgKi9cblx0dXBkYXRlVGFibGVXaXRoRGF0YShkYXRhLCBiQXBwZW5kID0gZmFsc2UpIHtcblx0XHRsZXQgcmVzdWx0TWFya3VwID0gW107XG5cblx0XHRmb3IgKGxldCByb3cgaW4gZGF0YSkge1xuXHRcdFx0aWYgKGRhdGEuaGFzT3duUHJvcGVydHkocm93KSkge1xuXHRcdFx0XHQvL9C90LXRgiDRgdC80YvRgdC70Ysg0LLRi9Cy0L7QtNC40YLRjCDRgdGC0YDQvtC60YMsINC10YHQu9C4INC+0YLRgdGC0YPRgtGB0LLRg9C10YIgSUQg0LjQu9C4IFRJVExFXG5cdFx0XHRcdGlmICh0eXBlb2YgZGF0YVtyb3ddLmlkICE9ICd1bmRlZmluZWQnICYmIHR5cGVvZiBkYXRhW3Jvd10udGl0bGUgIT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0XHRsZXQgcm93TWFya3VwID0gdGhpcy5tYXJrdXBUZW1wbGF0ZS5zY2FmZm9sZDtcblxuXHRcdFx0XHRcdGZvciAobGV0IGZpZWxkTmFtZSBpbiBkYXRhW3Jvd10pIHtcblx0XHRcdFx0XHRcdGlmIChkYXRhW3Jvd10uaGFzT3duUHJvcGVydHkoZmllbGROYW1lKSkge1xuXHRcdFx0XHRcdFx0XHRsZXQgdmFsdWUgPSBkYXRhW3Jvd11bZmllbGROYW1lXTtcblxuXHRcdFx0XHRcdFx0XHRpZiAoZmllbGROYW1lID09ICdpZCcpIHtcblx0XHRcdFx0XHRcdFx0XHRyb3dNYXJrdXAgPSByb3dNYXJrdXAucmVwbGFjZSgve3tpZH19L2csIHZhbHVlKTtcblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdGlmIChmaWVsZE5hbWUgPT0gJ3RpdGxlJykge1xuXHRcdFx0XHRcdFx0XHRcdHJvd01hcmt1cCA9IHJvd01hcmt1cC5yZXBsYWNlKC97e3RpdGxlfX0vZywgdmFsdWUpO1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0aWYgKGZpZWxkTmFtZSA9PSAnZGVzY3JpcHRpb24nKSB7XG5cdFx0XHRcdFx0XHRcdFx0cm93TWFya3VwID0gcm93TWFya3VwLnJlcGxhY2UoL3t7b3B0aW9uYWxEZXNjcmlwdGlvbn19L2csIHRoaXMubWFya3VwVGVtcGxhdGUub3B0aW9uYWwuZGVzY3JpcHRpb24pO1xuXHRcdFx0XHRcdFx0XHRcdHJvd01hcmt1cCA9IHJvd01hcmt1cC5yZXBsYWNlKC97e2Rlc2NyaXB0aW9ufX0vZywgdmFsdWUpO1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0LyoqXG5cdFx0XHRcdFx0XHRcdCAqINCm0LLQtdGC0LAg0LLRi9Cy0L7QttGDINC/0YDRj9C80L4g0LIg0LLQuNC00LUg0YLQtdC60YHRgtCwLCDQvdC+INC/0L4t0YXQvtGA0L7RiNC10LzRgyDQvdGD0LbQvdC+INC+0YLQtNCw0LLQsNGC0Ywg0YXRjdGIINGH0LXRgNC10LcgQVBJXG5cdFx0XHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdFx0XHRpZiAoZmllbGROYW1lID09ICdjb2xvcicpIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAodmFsdWUpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHJvd01hcmt1cCA9IHJvd01hcmt1cC5yZXBsYWNlKC97e29wdGlvbmFsQ29sb3Jib3h9fS9nLCB0aGlzLm1hcmt1cFRlbXBsYXRlLm9wdGlvbmFsLmNvbG9yQm94KTtcblx0XHRcdFx0XHRcdFx0XHRcdHJvd01hcmt1cCA9IHJvd01hcmt1cC5yZXBsYWNlKC97e2NvbG9yQ29kZX19L2csIHZhbHVlKTtcblx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0cm93TWFya3VwID0gcm93TWFya3VwLnJlcGxhY2UoL3t7b3B0aW9uYWxDb2xvcmJveH19L2csICcnKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRpZiAoZmllbGROYW1lID09ICd5ZWFyJykge1xuXHRcdFx0XHRcdFx0XHRcdHJvd01hcmt1cCA9IHJvd01hcmt1cC5yZXBsYWNlKC97e3llYXJ9fS9nLCB2YWx1ZSk7XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRpZiAoZmllbGROYW1lID09ICdzdGF0dXMnKSB7XG5cdFx0XHRcdFx0XHRcdFx0Ly/QvtC/0LXRh9Cw0YLQutCwINCyINGB0YLQsNGC0YPRgdC1LCDQsiDRgtCw0LrQvtC8INCy0LjQtNC1INC/0YDQuNC70LXRgtCw0LXRgiDRgSDQkNCf0Jhcblx0XHRcdFx0XHRcdFx0XHRpZiAodmFsdWUgPT0gJ3BlZG5kaW5nJykge1xuXHRcdFx0XHRcdFx0XHRcdFx0dmFsdWUgPSAncGVuZGluZyc7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0bGV0IHN0YXR1c1RleHQgPSB0aGlzLmdldFRleHQoYHN0YXR1cy0tJHt2YWx1ZX1gKTtcblx0XHRcdFx0XHRcdFx0XHRyb3dNYXJrdXAgPSByb3dNYXJrdXAucmVwbGFjZSgve3tzdGF0dXN9fS9nLCAoc3RhdHVzVGV4dCkgPyBzdGF0dXNUZXh0IDogJy0nKTtcblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdGlmIChmaWVsZE5hbWUgPT0gJ3ByaWNlJykge1xuXHRcdFx0XHRcdFx0XHRcdGxldCBwcmljZSA9IHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJyA/IHZhbHVlLnJlcGxhY2UoL1xccy9nLCAnJykucmVwbGFjZSgvLC9nLCAnLicpIDogdmFsdWU7XG5cdFx0XHRcdFx0XHRcdFx0bGV0IHByaWNlV2l0aFRheCA9IENUb29scy5nZXRQcmljZVdpdGhUYXgocHJpY2UsIHRoaXMudGF4LCAyKTtcblx0XHRcdFx0XHRcdFx0XHRsZXQgZm9ybWF0dGVkUHJpY2UgPSBDVG9vbHMuZm9ybWF0TW9uZXkocHJpY2UsIHRoaXMubG9jYWxlKTtcblx0XHRcdFx0XHRcdFx0XHRsZXQgZm9ybWF0dGVkUHJpY2VXaXRoVGF4ID0gQ1Rvb2xzLmZvcm1hdE1vbmV5KHByaWNlV2l0aFRheCwgdGhpcy5sb2NhbGUpO1xuXG5cdFx0XHRcdFx0XHRcdFx0cm93TWFya3VwID0gcm93TWFya3VwLnJlcGxhY2UoL3t7cHJpY2V9fS9nLCBwcmljZSk7XG5cdFx0XHRcdFx0XHRcdFx0cm93TWFya3VwID0gcm93TWFya3VwLnJlcGxhY2UoL3t7Zm9ybWF0dGVkUHJpY2V9fS9nLCBgJHtmb3JtYXR0ZWRQcmljZX0gJHt0aGlzLmdldFRleHQoJ2N1cnJlbmN5Jyl9YCk7XG5cdFx0XHRcdFx0XHRcdFx0cm93TWFya3VwID0gcm93TWFya3VwLnJlcGxhY2UoL3t7cHJpY2VXaXRoVGF4fX0vZywgcHJpY2VXaXRoVGF4KTtcblx0XHRcdFx0XHRcdFx0XHRyb3dNYXJrdXAgPSByb3dNYXJrdXAucmVwbGFjZSgve3tmb3JtYXR0ZWRQcmljZVdpdGhUYXh9fS9nLCBgJHtmb3JtYXR0ZWRQcmljZVdpdGhUYXh9ICR7dGhpcy5nZXRUZXh0KCdjdXJyZW5jeScpfWApO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cm93TWFya3VwID0gcm93TWFya3VwXG5cdFx0XHRcdFx0XHQucmVwbGFjZSgve3tyZW1vdmVCdXR0b25UZXh0fX0vZywgdGhpcy5nZXRUZXh0KCdyZW1vdmVfYnV0dG9uX3RleHQnKSk7XG5cblx0XHRcdFx0XHRyZXN1bHRNYXJrdXAucHVzaChyb3dNYXJrdXApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKGJBcHBlbmQpIHtcblx0XHRcdHRoaXMuJHRhYmxlUm93Q29udGFpbmVyLmFwcGVuZChyZXN1bHRNYXJrdXAuam9pbignJykpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLiR0YWJsZVJvd0NvbnRhaW5lci5odG1sKCcnKTtcblx0XHRcdHRoaXMuJHRhYmxlUm93Q29udGFpbmVyLmFwcGVuZChyZXN1bHRNYXJrdXAuam9pbignJykpO1xuXHRcdH1cblxuXHRcdHRoaXMudXBkYXRlU3VtbWFyeVByaWNlKCk7XG5cdFx0dGhpcy51cGRhdGVUYWJsZVZpZXdTdGF0dXMoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiDQntCx0L3QvtCy0LvQtdC90LjQtSDQuNGC0L7Qs9C+0LLQvtC5INGB0YPQvNC80Ysg0YLQsNCx0LvQuNGG0Ytcblx0ICovXG5cdHVwZGF0ZVN1bW1hcnlQcmljZSgpIHtcblx0XHRsZXQgc3VtbWFyeVByaWNlID0gMDtcblxuXHRcdCQuZWFjaCh0aGlzLmdldFJvd3MoKSwgKGksIHJvdykgPT4ge1xuXHRcdFx0bGV0ICRyb3cgPSAkKHJvdyk7XG5cdFx0XHRsZXQgcHJpY2UgPSAoJHJvdy5maW5kKCcuanMtcHJpY2Utd2l0aC10YXgnKS5sZW5ndGgpXG5cdFx0XHRcdD8gJHJvdy5maW5kKCcuanMtcHJpY2Utd2l0aC10YXgnKS5hdHRyKCdkYXRhLW9yaWdpbmFsLXByaWNlLXdpdGgtdGF4Jylcblx0XHRcdFx0OiAkcm93LmZpbmQoJy5qcy1wcmljZScpLmF0dHIoJ2RhdGEtb3JpZ2luYWwtcHJpY2UnKTtcblxuXHRcdFx0aWYgKHByaWNlKSB7XG5cdFx0XHRcdGlmICghaXNOYU4oc3VtbWFyeVByaWNlKSAmJiAhaXNOYU4ocHJpY2UpKSB7XG5cdFx0XHRcdFx0c3VtbWFyeVByaWNlID0gTnVtYmVyKHN1bW1hcnlQcmljZSkgKyBOdW1iZXIocHJpY2UpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHR0aGlzLiR0YWJsZVN1bW1hcnlQcmljZS5odG1sKGAke0NUb29scy5mb3JtYXRNb25leShOdW1iZXIoc3VtbWFyeVByaWNlKSwgdGhpcy5sb2NhbGUpfSAke3RoaXMuZ2V0VGV4dCgnY3VycmVuY3knKX1gKTtcblx0fVxuXG5cdC8qKlxuXHQgKiDQn9C+0LvRg9GH0LjRgtGMINCy0YHQtSDRgdGC0YDQvtC60Lgg0LjQtyDRgtCw0LHQu9C40YbRi1xuXHQgKi9cblx0Z2V0Um93cygpIHtcblx0XHRyZXR1cm4gdGhpcy4kdGFibGVSb3dDb250YWluZXIuZmluZCgnW2RhdGEtcm93LWlkXScpO1xuXHR9XG5cblx0LyoqXG5cdCAqINCU0L7QsdCw0LLQuNGC0Ywg0LTQsNC90L3Ri9C1INC+INC30LDQv9C40YHQuCDQsiBsb2NhbFN0b3JhZ2Vcblx0ICogQHBhcmFtIGRhdGFcblx0ICovXG5cdGFkZFJvd1RvTG9jYWxTdG9yYWdlKGRhdGEpIHtcblx0XHRpZiAoZGF0YSAmJiBkYXRhLmlkICYmIGxvY2FsU3RvcmFnZSkge1xuXHRcdFx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oYGF1dG9QYXJ0cy0tcm93LSR7ZGF0YS5pZH1gLCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqINCf0L7Qu9GD0YfQuNGC0Ywg0LTQsNC90L3Ri9C1INC40LcgbG9jYWxTdG9yYWdlXG5cdCAqIEByZXR1cm5zIHsqfVxuXHQgKi9cblx0Z2V0QWxsUm93c0Zyb21Mb2NhbFN0b3JhZ2UoKSB7XG5cdFx0bGV0IGRhdGEgPSB7fTtcblxuXHRcdGlmICghbG9jYWxTdG9yYWdlKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Zm9yIChsZXQga2V5IGluIGxvY2FsU3RvcmFnZSkge1xuXHRcdFx0aWYgKGxvY2FsU3RvcmFnZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdGlmIChrZXkuaW5kZXhPZignYXV0b1BhcnRzLS1yb3cnKSAhPSAtMSkge1xuXHRcdFx0XHRcdGxldCBvYmogPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSkpO1xuXHRcdFx0XHRcdGRhdGFbb2JqLmlkXSA9IG9iajtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBPYmplY3Qua2V5cyhkYXRhKS5sZW5ndGggPyBkYXRhIDogZmFsc2U7XG5cdH1cblxuXHQvKipcblx0ICog0KPQtNCw0LvQuNGC0Ywg0LTQsNC90L3Ri9C1INC40LcgbG9jYWxTdG9yYWdlXG5cdCAqIEBwYXJhbSBpZFxuXHQgKi9cblx0ZGVsZXRlUm93RnJvbUxvY2FsU3RvcmFnZShpZCkge1xuXHRcdGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgYXV0b1BhcnRzLS1yb3ctJHtpZH1gKSkge1xuXHRcdFx0bG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oYGF1dG9QYXJ0cy0tcm93LSR7aWR9YCk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqINCf0L7Qu9GD0YfQuNGC0Ywg0YLQtdC60YHRgiDQv9C+INC60L7QtNGDINC00LvRjyDQv9C10YDQtdC00LDQvdC90L7QuSDQu9C+0LrQsNC70Lhcblx0ICogQHBhcmFtIGxvY2FsZSAtINC70L7QutCw0LvRjFxuXHQgKiBAcGFyYW0gdGV4dCAtINGC0LXQutGB0YJcblx0ICogQHJldHVybnMge2Z1bmN0aW9uKCopfVxuXHQgKi9cblx0Z2V0VGV4dEJ5TG9jYWxlKGxvY2FsZSA9ICdydScsIHRleHQpIHtcblx0XHRyZXR1cm4gKHRleHQpID0+IHtcblx0XHRcdHJldHVybiAodGhpcy50ZXh0ICYmIHRoaXMudGV4dFtsb2NhbGVdICYmIHRoaXMudGV4dFtsb2NhbGVdW3RleHRdKSA/IHRoaXMudGV4dFtsb2NhbGVdW3RleHRdIDogZmFsc2U7XG5cdFx0fTtcblx0fVxuXG5cdC8qKlxuXHQgKiDQn9C+0LvRg9GH0LjRgtGMINGD0YHQu9C+0LLQvdC+INGD0L3QuNC60LDQu9GM0L3Ri9C5IGlkXG5cdCAqIEByZXR1cm5zIHtudW1iZXJ9XG5cdCAqL1xuXHRnZW5lcmF0ZVVuaXFSb3dJRCgpIHtcblx0XHRsZXQgdW5pcUlEID0gMDtcblx0XHRsZXQgZXhpc3RlZElEID0gW107XG5cblx0XHQkLmVhY2godGhpcy5nZXRSb3dzKCksIChpLCByb3cpID0+IHtcblx0XHRcdGV4aXN0ZWRJRC5wdXNoKCQocm93KS5hdHRyKCdkYXRhLXJvdy1pZCcpKTtcblx0XHR9KTtcblxuXHRcdGlmIChleGlzdGVkSUQubGVuZ3RoKSB7XG5cdFx0XHRsZXQgbWF4ID0gTWF0aC5tYXguYXBwbHkobnVsbCwgZXhpc3RlZElELm1hcChOdW1iZXIpKTtcblx0XHRcdHVuaXFJRCA9IG1heCArIDE7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHVuaXFJRDtcblx0fVxuXG5cdC8qKlxuXHQgKiDQktGL0LLQvtC00LjRgiDRgdC+0L7QsdGJ0LXQvdC40LUg0LIg0LjQvdGE0L7RgNC80LDRhtC40L7QvdC90L7QvCDRgtCw0LHQu9C40YfQvdC+0Lwg0LHQu9C+0LrQtVxuXHQgKiBAcGFyYW0gbXNnXG5cdCAqL1xuXHRzaG93VGFibGVOb3RpZmljYXRpb24obXNnID0gJycpIHtcblx0XHRpZiAobXNnKSB7XG5cdFx0XHR0aGlzLiR0YWJsZU5vdHkuaHRtbChtc2cpO1xuXHRcdFx0dGhpcy4kdGFibGVXcmFwcGVyLmFkZENsYXNzKCdpcy1ub3R5Jyk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqINCf0YDQvtCy0LXRgNGP0LXRgiwg0LXRgdGC0Ywg0LvQuCDQsiDRgtCw0LHQu9C40YbQtSDQtNCw0L3QvdGL0LUg0LTQu9GPINC/0L7QutCw0LfQsC4g0JXRgdC70Lgg0L3QtdGCIC0g0LLRi9Cy0L7QtNC40YIg0YPQstC10LTQvtC80LvQtdC90LjQtVxuXHQgKi9cblx0dXBkYXRlVGFibGVWaWV3U3RhdHVzKCkge1xuXHRcdGlmICh0aGlzLmlzTm9Sb3dzKCkpIHtcblx0XHRcdHRoaXMuc2hvd1RhYmxlTm90aWZpY2F0aW9uKHRoaXMuZ2V0VGV4dCgnZXJyb3ItLWVtcHR5X2RhdGEnKSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuJHRhYmxlV3JhcHBlci5yZW1vdmVDbGFzcygnaXMtbm90eScpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiDQn9GA0L7QstC10YDRj9C10YIsINC/0YPRgdGC0LAg0LjQuyDRgtCw0LHQu9C40YbQsFxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn1cblx0ICovXG5cdGlzTm9Sb3dzKCkge1xuXHRcdHJldHVybiB0aGlzLmdldFJvd3MoKS5sZW5ndGggPT0gMDtcblx0fVxuXG5cdC8qKlxuXHQgKiDQkdC70L7QutC40YDQvtCy0LrQsCDRgtCw0LHQu9C40YbRi1xuXHQgKi9cblx0bG9ja1RhYmxlKCkge1xuXHRcdHRoaXMuJHRhYmxlV3JhcHBlci5hZGRDbGFzcygnaXMtcHJlbG9hZGluZycpO1xuXHR9XG5cblx0LyoqXG5cdCAqINCg0LDQt9Cx0LvQvtC60LjRgNC+0LLQutCwINGC0LDQsdC70LjRhtGLXG5cdCAqL1xuXHR1bmxvY2tUYWJsZSgpIHtcblx0XHR0aGlzLiR0YWJsZVdyYXBwZXIucmVtb3ZlQ2xhc3MoJ2lzLXByZWxvYWRpbmcnKTtcblx0fVxuXG5cdC8qKlxuXHQgKiDQotCw0LHQu9C40YbQsCDQt9Cw0LHQu9C+0LrQuNGA0L7QstCw0L3QsD9cblx0ICovXG5cdGlzVGFibGVMb2NrKCkge1xuXHRcdHJldHVybiB0aGlzLiR0YWJsZVdyYXBwZXIuaGFzQ2xhc3MoJ2lzLXByZWxvYWRpbmcnKTtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IENDYXJhbWJhQ29udHJvbGxlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9wYXJ0cy9DQ2FyYW1iYS5qcyJdLCJzb3VyY2VSb290IjoiIn0=