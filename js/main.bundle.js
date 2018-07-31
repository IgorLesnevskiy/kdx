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
			scaffold: '\n\t\t\t\t<div class="b-custom-table__row" data-row-id="{{id}}">\n\t\t\t\t  <div class="b-custom-table__cell b-custom-table__cell--title">\n\t\t\t\t    <div class="title">{{title}}</div>\n\t\t\t\t    {{optionalDescription}}\n\t\t\t\t  </div>\n\t\t\t\t  <div class="b-custom-table__cell b-custom-table__cell--year">{{year}}</div>\n\t\t\t\t  <div class="b-custom-table__cell b-custom-table__cell--color">\n\t\t\t\t    {{optionalColorbox}}\n\t\t\t\t  </div>\n\t\t\t\t  <div class="b-custom-table__cell b-custom-table__cell--status">{{status}}</div>\n\t\t\t\t  <div class="b-custom-table__cell b-custom-table__cell--price">\n\t\t\t\t    <nobr class="price js-price" data-original-price="{{price}}">{{formattedPrice}}</nobr>\n\t\t\t\t    <nobr class="price-with-tax js-price-with-tax" data-original-price-with-tax="{{priceWithTax}}">{{formattedPriceWithTax}} (+13%)</nobr>\n\t\t\t\t  </div>\n\t\t\t\t  <div class="b-custom-table__cell b-custom-table__cell--action">\n\t\t\t\t    <button class="i-button i-button--ellipse i-button--size-small js-delete-trigger">{{removeButtonText}}</button>\n\t\t\t\t  </div>\n\t\t\t\t</div>\n\t\t\t',
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
							data[fieldName] = value.replace(/\s/, '').replace(/,/, '.');
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
					}
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
									rowMarkup = rowMarkup.replace(/{{optionalColorbox}}/g, this.markupTemplate.optional.colorBox);
									rowMarkup = rowMarkup.replace(/{{colorCode}}/g, value);
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
									var price = typeof value == 'string' ? value.replace(/\s/, '').replace(/,/, '.') : value;
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

						rowMarkup = rowMarkup.replace(/{{optionalDescription}}/g, '').replace(/{{optionalColorbox}}/g, '').replace(/{{removeButtonText}}/g, this.getText('remove_button_text'));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcGFydHMvQ1Rvb2xzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9wYXJ0cy9DQ2FyYW1iYS5qcyJdLCJuYW1lcyI6WyJDQ2FyYW1iYUNvbnRyb2xsZXIiLCJyZXF1aXJlIiwiQ1Rvb2xzIiwiUHJvbWlzZSIsImNvbmZpZyIsIndhcm5pbmdzIiwibG9uZ1N0YWNrVHJhY2VzIiwiY2FuY2VsbGF0aW9uIiwibW9uaXRvcmluZyIsInByb2R1Y3Rpb24iLCJDQXBwQ29udHJvbGxlciIsImNDYXJhbWJhQ29udHJvbGxlciIsImNUb29scyIsInJlc29sdmUiLCJ0aGVuIiwiaW5pdFNtYXJ0TGFiZWxzIiwiaW5pdEN1c3RvbVNlbGVjdHMiLCJpbml0TWFza3MiLCJpbml0Q3VzdG9tRm9ybVZhbGlkYXRvcnMiLCJpbml0IiwiJHNtYXJ0TGFiZWxzIiwiJCIsImxlbmd0aCIsIm9uIiwiJHRoaXMiLCJ0b2dnbGVDbGFzcyIsInZhbCIsImJsdXIiLCIkc2VsZWN0cyIsInNlbGVjdDIiLCJ3aW5kb3ciLCJQYXJzbGV5IiwiYWRkVmFsaWRhdG9yIiwidmFsaWRhdGVTdHJpbmciLCJ2YWx1ZSIsIk51bWJlciIsIkRhdGUiLCJnZXRGdWxsWWVhciIsIm1lc3NhZ2VzIiwicnUiLCIkeWVhck1hc2siLCIkbW9uZXlNYXNrIiwibWFzayIsIm1hc2tNb25leSIsInRob3VzYW5kcyIsImRlY2ltYWwiLCJhbGxvd05vRGVjaW1hbCIsImNBcHBDb250cm9sbGVyIiwiZG9jdW1lbnQiLCJyZWFkeSIsImdsb2JhbCIsIkFDIiwib2JqZWN0IiwiSlNPTiIsInBhcnNlIiwic3RyaW5naWZ5IiwicHJpY2UiLCJsb2NhbGUiLCJuUHJpY2UiLCJpc05hTiIsInRvTG9jYWxlU3RyaW5nIiwidGF4IiwicHJlY2lzaW9uIiwiblRheCIsInByaWNlV2l0aFRheCIsInRvRml4ZWQiLCJtb2R1bGUiLCJleHBvcnRzIiwibG9hZFVybCIsInRleHQiLCJyZW1vdmVfYnV0dG9uX3RleHQiLCJjdXJyZW5jeSIsImVuIiwiZ2V0VGV4dCIsImdldFRleHRCeUxvY2FsZSIsIm1hcmt1cFRlbXBsYXRlIiwic2NhZmZvbGQiLCJvcHRpb25hbCIsImRlc2NyaXB0aW9uIiwiY29sb3JCb3giLCIkdGFibGVXcmFwcGVyIiwiJGZvcm0iLCIkdGFibGVSb3dDb250YWluZXIiLCJmaW5kIiwiJHRhYmxlTm90eSIsIiR0YWJsZVN1bW1hcnlQcmljZSIsImluaXREZWxldGVUcmlnZ2VyIiwiaW5pdEZvcm0iLCJsb2NrVGFibGUiLCJsb2FkRGF0YSIsImRhdGEiLCJkZWxheSIsIk9iamVjdCIsImtleXMiLCJ1cGRhdGVUYWJsZVdpdGhEYXRhIiwic2hvd1RhYmxlTm90aWZpY2F0aW9uIiwidW5sb2NrVGFibGUiLCJjYXRjaCIsIm1zZyIsInBhcnNsZXkiLCJmb3JtIiwiaXNUYWJsZUxvY2siLCJmaWVsZCIsImZpZWxkcyIsImhhc093blByb3BlcnR5IiwiZmllbGROYW1lIiwiJGVsZW1lbnQiLCJhdHRyIiwiZ2V0VmFsdWUiLCJyZXBsYWNlIiwiaWQiLCJnZW5lcmF0ZVVuaXFSb3dJRCIsInByZXBhcmVkRGF0YSIsInB1c2giLCJhZGRSb3dUb0xvY2FsU3RvcmFnZSIsInJlc2V0Rm9ybSIsInBhcnNsZXlGb3JtIiwiJGN1c3RvbVNlbGVjdHMiLCJyZXNldCIsInJlbW92ZUNsYXNzIiwiZWFjaCIsImkiLCJzZWxlY3QiLCJ0cmlnZ2VyIiwiZSIsImN1cnJlbnRUYXJnZXQiLCIkcm93IiwiY2xvc2VzdCIsInJvd0lEIiwicmVtb3ZlIiwiZGVsZXRlUm93RnJvbUxvY2FsU3RvcmFnZSIsInVwZGF0ZVRhYmxlVmlld1N0YXR1cyIsInVwZGF0ZVN1bW1hcnlQcmljZSIsInJlamVjdCIsImFqYXgiLCJ1cmwiLCJkYXRhVHlwZSIsInN1Y2Nlc3MiLCJlcnJvciIsImpxWEhSIiwidGV4dFN0YXR1cyIsImxvY2FsRGF0YSIsImdldEFsbFJvd3NGcm9tTG9jYWxTdG9yYWdlIiwiYXNzaWduIiwiYkFwcGVuZCIsInJlc3VsdE1hcmt1cCIsInJvdyIsInRpdGxlIiwicm93TWFya3VwIiwic3RhdHVzVGV4dCIsImdldFByaWNlV2l0aFRheCIsImZvcm1hdHRlZFByaWNlIiwiZm9ybWF0TW9uZXkiLCJmb3JtYXR0ZWRQcmljZVdpdGhUYXgiLCJhcHBlbmQiLCJqb2luIiwiaHRtbCIsInN1bW1hcnlQcmljZSIsImdldFJvd3MiLCJsb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIiwia2V5IiwiaW5kZXhPZiIsIm9iaiIsImdldEl0ZW0iLCJyZW1vdmVJdGVtIiwidW5pcUlEIiwiZXhpc3RlZElEIiwibWF4IiwiTWF0aCIsImFwcGx5IiwibWFwIiwiYWRkQ2xhc3MiLCJpc05vUm93cyIsImhhc0NsYXNzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQU1BLHFCQUFxQixtQkFBQUMsQ0FBUSx5QkFBUixDQUEzQjtBQUNBLElBQU1DLFNBQVMsbUJBQUFELENBQVEsdUJBQVIsQ0FBZjs7QUFFQUUsUUFBUUMsTUFBUixDQUFlO0FBQ2Q7QUFDQUMsV0FBVSxDQUFDLEtBRkc7QUFHZDtBQUNBQyxrQkFBaUIsQ0FBQyxLQUpKO0FBS2Q7QUFDQUMsZUFBYyxDQUFDLEtBTkQ7QUFPZDtBQUNBQyxhQUFZLENBQUMsS0FBQUM7QUFSQyxDQUFmOztBQVdBOzs7O0lBR01DLGM7QUFDTCwyQkFBYztBQUFBOztBQUNiLE9BQUtDLGtCQUFMLEdBQTBCLElBQUlYLGtCQUFKLEVBQTFCO0FBQ0EsT0FBS1ksTUFBTCxHQUFjLElBQUlWLE1BQUosRUFBZDtBQUNBOzs7O3lCQUVNO0FBQUE7O0FBQ04sVUFBT0MsUUFBUVUsT0FBUixHQUNMQyxJQURLLENBQ0EsWUFBTTs7QUFFWCxVQUFLQyxlQUFMO0FBQ0EsVUFBS0MsaUJBQUw7QUFDQSxVQUFLQyxTQUFMO0FBQ0EsVUFBS0Msd0JBQUw7O0FBRUEsVUFBS1Asa0JBQUwsQ0FBd0JRLElBQXhCO0FBQ0EsSUFUSyxDQUFQO0FB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UUFBTCxFQUFKLEVBQXFCO0FBQ3BCLFNBQUs5RSxxQkFBTCxDQUEyQixLQUFLdEIsT0FBTCxDQUFhLG1CQUFiLENBQTNCO0FBQ0EsSUFGRCxNQUVPO0FBQ04sU0FBS08sYUFBTCxDQUFtQnVDLFdBQW5CLENBQStCLFNBQS9CO0FBQ0E7QUFDRDs7QUFFRDs7Ozs7Ozs2QkFJVztBQUNWLFVBQU8sS0FBS3VDLE9BQUwsR0FBZXhJLE1BQWYsSUFBeUIsQ0FBaEM7QUFDQTs7QUFFRDs7Ozs7OzhCQUdZO0FBQ1gsUUFBSzBELGFBQUwsQ0FBbUI0RixRQUFuQixDQUE0QixlQUE1QjtBQUNBOztBQUVEOzs7Ozs7Z0NBR2M7QUFDYixRQUFLNUYsYUFBTCxDQUFtQnVDLFdBQW5CLENBQStCLGVBQS9CO0FBQ0E7O0FBRUQ7Ozs7OztnQ0FHYztBQUNiLFVBQU8sS0FBS3ZDLGFBQUwsQ0FBbUI4RixRQUFuQixDQUE0QixlQUE1QixDQUFQO0FBQ0E7Ozs7OztBQUdGNUcsT0FBT0MsT0FBUCxHQUFpQm5FLGtCQUFqQixDIiwiZmlsZSI6Im1haW4uYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgQ0NhcmFtYmFDb250cm9sbGVyID0gcmVxdWlyZSgnLi9wYXJ0cy9DQ2FyYW1iYScpO1xuY29uc3QgQ1Rvb2xzID0gcmVxdWlyZSgnLi9wYXJ0cy9DVG9vbHMnKTtcblxuUHJvbWlzZS5jb25maWcoe1xuXHQvLyBFbmFibGUgd2FybmluZ3Ncblx0d2FybmluZ3M6ICFwcm9kdWN0aW9uLFxuXHQvLyBFbmFibGUgbG9uZyBzdGFjayB0cmFjZXNcblx0bG9uZ1N0YWNrVHJhY2VzOiAhcHJvZHVjdGlvbixcblx0Ly8gRW5hYmxlIGNhbmNlbGxhdGlvblxuXHRjYW5jZWxsYXRpb246ICFwcm9kdWN0aW9uLFxuXHQvLyBFbmFibGUgbW9uaXRvcmluZ1xuXHRtb25pdG9yaW5nOiAhcHJvZHVjdGlvblxufSk7XG5cbi8qKlxuICog0JPQu9Cw0LLQvdGL0Lkg0LrQvtC90YLRgNC+0LvQu9C10YBcbiAqL1xuY2xhc3MgQ0FwcENvbnRyb2xsZXIge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHR0aGlzLmNDYXJhbWJhQ29udHJvbGxlciA9IG5ldyBDQ2FyYW1iYUNvbnRyb2xsZXIoKTtcblx0XHR0aGlzLmNUb29scyA9IG5ldyBDVG9vbHMoKTtcblx0fVxuXG5cdGluaXQoKSB7XG5cdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXG5cdFx0XHQudGhlbigoKSA9PiB7XG5cblx0XHRcdFx0dGhpcy5pbml0U21hcnRMYWJlbHMoKTtcblx0XHRcdFx0dGhpcy5pbml0Q3VzdG9tU2VsZWN0cygpO1xuXHRcdFx0XHR0aGlzLmluaXRNYXNrcygpO1xuXHRcdFx0XHR0aGlzLmluaXRDdXN0b21Gb3JtVmFsaWRhdG9ycygpO1xuXG5cdFx0XHRcdHRoaXMuY0NhcmFtYmFDb250cm9sbGVyLmluaXQoKTtcblx0XHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqINCY0L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPINGD0LzQvdGL0YUg0L/Qu9C10LnRgdGF0L7Qu9C00LXRgNC+0LJcblx0ICovXG5cdGluaXRTbWFydExhYmVscygpIHtcblx0XHRjb25zdCAkc21hcnRMYWJlbHMgPSAkKCcuanMtc21hcnQtbGFiZWwtLWlucHV0Jyk7XG5cblx0XHRpZiAoJHNtYXJ0TGFiZWxzLmxlbmd0aCkge1xuXHRcdFx0JHNtYXJ0TGFiZWxzLm9uKCdibHVyJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRsZXQgJHRoaXMgPSAkKHRoaXMpO1xuXG5cdFx0XHRcdCR0aGlzLnRvZ2dsZUNsYXNzKCdpcy1maWxsJywgJHRoaXMudmFsKCkgIT09ICcnKTtcblx0XHRcdH0pLmJsdXIoKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICog0JjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y8g0LrQsNGB0YLQvtC80L3Ri9GFINGB0LXQu9C10LrRgtC+0LJcblx0ICovXG5cdGluaXRDdXN0b21TZWxlY3RzKCkge1xuXHRcdGNvbnN0ICRzZWxlY3RzID0gJCgnW2RhdGEtaXMtY3VzdG9tLXNlbGVjdF0nKTtcblxuXHRcdGlmICgkc2VsZWN0cy5sZW5ndGgpIHtcblx0XHRcdCRzZWxlY3RzLnNlbGVjdDIoe1xuXG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICog0JrQsNGB0YLQvtC80L3Ri9C1INGC0LjQv9GLINCy0LDQu9C40LTQsNGG0LjQuVxuXHQgKi9cblx0aW5pdEN1c3RvbUZvcm1WYWxpZGF0b3JzKCkge1xuXHRcdHdpbmRvdy5QYXJzbGV5LmFkZFZhbGlkYXRvcigncHJvZHVjdGlvblllYXInLCB7XG5cdFx0XHR2YWxpZGF0ZVN0cmluZzogZnVuY3Rpb24gKHZhbHVlKSB7XG5cdFx0XHRcdHJldHVybiBOdW1iZXIodmFsdWUpID49IDE5ODAgJiYgTnVtYmVyKHZhbHVlKSA8PSBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCk7XG5cdFx0XHR9LFxuXHRcdFx0bWVzc2FnZXM6IHtcblx0XHRcdFx0cnU6IGDQk9C+0LQg0LzQvtC20LXRgiDQsdGL0YLRjCDQt9Cw0LTQsNC9INC+0YIgMTk4MCDQtNC+ICR7bmV3IERhdGUoKS5nZXRGdWxsWWVhcigpfWBcblx0XHRcdH1cblx0XHR9KTtcblxuXHR9XG5cblx0LyoqXG5cdCAqINCc0LDRgdC60Lhcblx0ICovXG5cdGluaXRNYXNrcygpIHtcblx0XHRsZXQgJHllYXJNYXNrID0gJCgnW2RhdGEteWVhci1tYXNrXScpO1xuXHRcdGxldCAkbW9uZXlNYXNrID0gJCgnW2RhdGEtbW9uZXktbWFza10nKTtcblxuXHRcdGlmICgkeWVhck1hc2subGVuZ3RoKSB7XG5cdFx0XHQkeWVhck1hc2subWFzaygnOTk5OScpO1xuXHRcdH1cblxuXHRcdGlmICgkbW9uZXlNYXNrLmxlbmd0aCkge1xuXHRcdFx0Ly9ydVxuXHRcdFx0JG1vbmV5TWFzay5tYXNrTW9uZXkoe1xuXHRcdFx0XHR0aG91c2FuZHM6ICcgJyxcblx0XHRcdFx0ZGVjaW1hbDogJy4nLFxuXHRcdFx0XHRhbGxvd05vRGVjaW1hbDogdHJ1ZVxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG59XG5cbmNvbnN0IGNBcHBDb250cm9sbGVyID0gbmV3IENBcHBDb250cm9sbGVyKCk7XG5cbiQoZG9jdW1lbnQpLnJlYWR5KCgpID0+IHtcblx0Y0FwcENvbnRyb2xsZXIuaW5pdCgpXG5cdFx0LnRoZW4oKCkgPT4ge1xuXHRcdFx0Ly/QstGL0LHRgNCw0YHRi9Cy0LDQtdC8INCyIGdsb2JhbCDQtNC70Y8g0LTQvtGB0YLRg9C/0LBcblx0XHRcdGdsb2JhbC5BQyA9IGNBcHBDb250cm9sbGVyO1xuXHRcdH0pO1xufSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvbWFpbi5qcyIsIi8qKlxuICog0JLRgdC/0L7QvNC+0LPQsNGC0LXQu9GM0L3Ri9C1INGE0YPQvdC60YbQuNC4XG4gKi9cbmNsYXNzIENUb29scyB7XG5cdGNvbnN0cnVjdG9yKCkge31cblxuXHQvKipcblx0ICog0JrQu9C+0L3QuNGA0L7QstCw0L3QuNC1INC+0LHRitC10LrRgtCwINCx0LXQtyDQv9GA0LjQstGP0LfQutC4INC/0L4g0YHRgdGL0LvQutC1XG5cdCAqIEBwYXJhbSBvYmplY3Rcblx0ICovXG5cdHN0YXRpYyBjbG9uZU9iamVjdChvYmplY3QgPSB7fSkge1xuXHRcdHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9iamVjdCkpO1xuXHR9XG5cblx0LyoqXG5cdCAqINCk0L7RgNC80LDRgtC40YDQvtCw0L3QuNC1INGB0YLRgNC+0LrQuCDQsiDQtNC10L3QtdC20L3Ri9C5INCy0LjQtFxuXHQgKiBAcGFyYW0gcHJpY2Vcblx0ICogQHBhcmFtIGxvY2FsZVxuXHQgKiBAcmV0dXJucyB7Kn1cblx0ICovXG5cdHN0YXRpYyBmb3JtYXRNb25leShwcmljZSwgbG9jYWxlID0gJ3J1Jykge1xuXHRcdGxldCBuUHJpY2UgPSBOdW1iZXIocHJpY2UpO1xuXG5cdFx0aWYgKCFpc05hTihuUHJpY2UpKSB7XG5cdFx0XHRyZXR1cm4gblByaWNlLnRvTG9jYWxlU3RyaW5nKGxvY2FsZSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBwcmljZTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICog0KbQtdC90LAgKyDQvdCw0LvQvtCzXG5cdCAqIEBwYXJhbSBwcmljZVxuXHQgKiBAcGFyYW0gdGF4XG5cdCAqIEBwYXJhbSBwcmVjaXNpb25cblx0ICovXG5cdHN0YXRpYyBnZXRQcmljZVdpdGhUYXgocHJpY2UsIHRheCA9IDEzLCBwcmVjaXNpb24gPSAwKSB7XG5cdFx0bGV0IG5QcmljZSA9IE51bWJlcihwcmljZSk7XG5cdFx0bGV0IG5UYXggPSBOdW1iZXIodGF4KTtcblxuXHRcdGlmICghaXNOYU4oblByaWNlKSAmJiAhaXNOYU4oblRheCkpIHtcblx0XHRcdGxldCBwcmljZVdpdGhUYXggPSAoKG5QcmljZSAqIG5UYXggLyAxMDApICsgblByaWNlKTtcblx0XHRcdHJldHVybiAocHJpY2VXaXRoVGF4ICUgMSA9PT0gMCkgPyBwcmljZVdpdGhUYXggOiBwcmljZVdpdGhUYXgudG9GaXhlZChwcmVjaXNpb24pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gcHJpY2U7XG5cdFx0fVxuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQ1Rvb2xzO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3BhcnRzL0NUb29scy5qcyIsImNvbnN0IENUb29scyA9IHJlcXVpcmUoJy4vQ1Rvb2xzJyk7XG5cbi8qKlxuICog0JrQvtC90YLRgNC+0LvQu9C10YAg0LTQu9GPINGA0LDQsdC+0YLRiyDRgSDQv9C+0LTRgNCz0YDRg9C30LrQvtC5INC4INC+0LHQvdC+0LLQu9C10L3QuNC10Lwg0YLQsNCx0LvQuNGH0L3Ri9GFINC00LDQvdC90YvRhSDQvtCxINCw0LLRgtC+0LzQvtCx0LjQu9GP0YVcbiAqINCiLtC6LiDQv9C+INC+0LTQvdC+0Lkg0YHRgtGA0LDQvdC40YbQtSDQvdC10LvRjNC30Y8g0L3QuNGH0LXQs9C+INGB0LrQsNC30LDRgtGMINC+INCy0YHQtdC8INC/0YDQvtC10LrRgtC1INCyINGG0LXQu9C+0LwsINGC0L4g0LTQsNC90L3Ri9C5INC60L7QvdGC0YDQvtC70LvQtdGAXG4gKiDRgdC70YPQttC40YIg0YHQutC+0YDQtdC1INC00LvRjyDQtNC10LzQvtC90YHRgtGA0LDRhtC40L3QvdGL0YUg0YbQtdC70LXQuSDQuCDQt9Cw0YLQvtGH0LXQvSDQv9C+0LQg0YDQsNCx0L7RgtGDINGBINC60L7QvdC60YDQtdGC0L3Ri9C80Lgg0LTQsNC90L3Ri9C80Lgg0Lgg0LrQvtC90LrRgNC10YLQvdC50L4g0YTQvtGA0LzQvtC5XG4gKi9cbmNsYXNzIENDYXJhbWJhQ29udHJvbGxlciB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdC8v0LTQsNC90L3Ri9C1INC00LvRjyDQt9Cw0LPRgNGD0LfQutC4XG5cdFx0dGhpcy5sb2FkVXJsID0gJ2h0dHBzOi8vcmF3Z2l0LmNvbS9WYXJpbmV0ei9lNmNiYWRlYzk3MmU3NmEzNDBjNDFhNjVmY2MyYTZiMy9yYXcvOTAxOTE4MjZhM2JhYzJmZjA3NjEwNDBlZDFkOTVjNTlmMTRlYWYyNi9mcm9udGVuZF90ZXN0X3RhYmxlLmpzb24nO1xuXG5cdFx0LyoqXG5cdFx0ICog0JvQvtC60LDQu9C40LfQsNGG0LjRjy4g0JIg0L/QtdGA0YHQv9C10LrRgtC40LLQsNGFINGA0LDQstC30LjRgtC40Y8g0Y3RgtC+INGB0LvQtdC00YPQtdGCINCy0YvQvdC+0YHQuNGC0Ywg0LIg0L7RgtC00LXQu9GM0L3Ri9C5IGpzb24t0YTQsNC50LssXG5cdFx0ICog0LvQuNCx0L4g0LrQsNC6LdGC0L4g0L/RgNC+0LHRgNCw0YHRi9Cy0LDRgtGMINC40Lcg0LHQsNC30YsuXG5cdFx0ICogQHR5cGUge3tydToge3N0YXR1czoge3BlbmRpbmc6IHN0cmluZywgb3V0X29mX3N0b2NrOiBzdHJpbmcsIGluX3N0b2NrOiBzdHJpbmd9LCByZW1vdmVCdXR0b25UZXh0OiBzdHJpbmd9LCBlbjoge319fVxuXHRcdCAqL1xuXHRcdHRoaXMudGV4dCA9IHtcblx0XHRcdHJ1OiB7XG5cdFx0XHRcdCdzdGF0dXMtLXBlbmRpbmcnOiAn0J7QttC40LTQsNC10YLRgdGPJyxcblx0XHRcdFx0J3N0YXR1cy0tb3V0X29mX3N0b2NrJzogJ9Cd0LXRgiDQsiDQvdCw0LvQuNGH0LjQuCcsXG5cdFx0XHRcdCdzdGF0dXMtLWluX3N0b2NrJzogJ9CSINC90LDQu9C40YfQuNC4Jyxcblx0XHRcdFx0J2Vycm9yLS1sb2FkX2Vycm9yJzogJ9Ce0YjQuNCx0LrQsCDQt9Cw0LPRgNGD0LfQutC4INC00LDQvdC90YvRhScsXG5cdFx0XHRcdCdlcnJvci0tZW1wdHlfZGF0YSc6ICfQndC10YIg0LTQsNC90L3Ri9GFINC00LvRjyDQvtGC0L7QsdGA0LDQttC10L3QuNGPJyxcblx0XHRcdFx0cmVtb3ZlX2J1dHRvbl90ZXh0OiAn0KPQtNCw0LvQuNGC0YwnLFxuXHRcdFx0XHRjdXJyZW5jeTogJ9GA0YPQsS4nXG5cdFx0XHR9LFxuXHRcdFx0ZW46IHtcblxuXHRcdFx0fVxuXHRcdH07XG5cblx0XHQvL9C70L7QutCw0LvRjFxuXHRcdHRoaXMubG9jYWxlID0gJ3J1Jztcblx0XHQvL9C30L3QsNGH0LXQvdC40LUg0L3QsNC70L7Qs9C+0LLQvtC5INGB0YLQsNCy0LrQuCDQv9C+LdGD0LzQvtC70YfQsNC90LjRjlxuXHRcdHRoaXMudGF4ID0gMTM7XG5cblx0XHQvKipcblx0XHQgKiDQn9C+0LvRg9GH0LXQvdC40LUg0YLQtdC60YHRgtCwINC/0L4g0LrQvtC00YMuINCb0L7QutCw0LvRjCDQv9C10YDQtdC00LDQvdCwINGH0LXRgNC10Lcg0LrQsNGA0YDQuNGA0L7QstCw0L3QuNC1XG5cdFx0ICovXG5cdFx0dGhpcy5nZXRUZXh0ID0gdGhpcy5nZXRUZXh0QnlMb2NhbGUodGhpcy5sb2NhbGUpO1xuXG5cdFx0LyoqXG5cdFx0ICog0J/QvtGH0LXQvNGDINC40LzQtdC90L3QviDRgtCw0LrQvtC1INGA0LXRiNC10L3QuNC1P1xuXHRcdCAqINCY0LfQvdCw0YfQsNC70YzQvdC+INGDINC80LXQvdGPINCx0YvQu9CwINC40LTQtdGPINGF0YDQsNC90LjRgtGMINGN0YLQviDQsiDQstC40LTQtSBqc29uLdC00LXRgNC10LLQsCDQv9C+INGC0LjQv9GDIHhtbCwg0L7QtNC90LDQutC+INGN0YLQviDRg9GB0LvQvtC20L3Rj9C10YJcblx0XHQgKiDRg9GB0LvQvtC20L3Rj9C10YIg0YfQuNGC0LDQtdC80L7RgdGC0Ywg0YDQsNC30LzQtdGC0LrQuC4g0JIg0L/QtdGA0YHQv9C10LrRgtC40LLQsNGFINGA0LDQt9Cy0LjRgtC40Y8g0Y3RgtC+INC80L7QttC90L4g0LLRi9C90LXRgdGC0Lgg0LIg0LLQuNC00LVcblx0XHQgKiDRgtCw0LrQvtCz0L4g0LbQtSDQvtCx0YrQtdC60YLQsCDQsiDQvtC00L3QtdC70YzQvdGLIGpzb24t0YHQvdC40L/Qv9C10YIg0Lgg0L/QvtC00LPRgNGD0LbQsNGC0Ywg0LDRgdC40L3RhdGA0L7QvdC90L4sINC90LDQv9GA0LjQvNC10YAuINCd0L4g0LIg0YDQsNC80LrQsNGFINC00LDQvdC90L7Qs9C+XG5cdFx0ICog0LfQsNC00LDQvdC40Y8g0Lgg0L/RgNC4INC90LXQuNC30LLQtdGB0YLQvdC+0Lkg0LDRgNGF0LjRgtC10LrRgtGD0YDQtSDQv9GA0L7Rh9C40YUg0YfQsNGB0YLQtdC5INC/0YDQvtC00YPQutGC0LAsINGPINGA0LXRiNC40Lsg0L3QtSDRg9GB0LvQvtC20L3Rj9GC0Ywg0Y3RgtC+INC00L4g0YLQsNC60L7QuSDRgdGC0LXQv9C10L3QuC5cblx0XHQgKiBzY2FmZm9sZCAtINGB0LrQtdC70LXRgiDRgNCw0LfQvNC10YLQutC4LiDQotCw0LrQttC1INCyINC90LXQvCDQv9GA0LjRgdGD0YLRgdGC0LLRg9GO0YIg0L7Qv9GG0LjQvtC90LDQu9GM0L3Ri9C1INGH0LDRgdGC0LgsINC60L7RgtC+0YDRi9C1INC+0L/QuNGB0LDQvdC40LUg0LIgb3B0aW9uYWxcblx0XHQgKiBAdHlwZSB7e3NjYWZmb2xkOiBzdHJpbmcsIG9wdGlvbmFsOiB7ZGVzY3JpcHRpb246IHN0cmluZywgY29sb3JCb3g6IHN0cmluZ319fVxuXHRcdCAqL1xuXHRcdHRoaXMubWFya3VwVGVtcGxhdGUgPSB7XG5cdFx0XHRzY2FmZm9sZDogYFxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwiYi1jdXN0b20tdGFibGVfX3Jvd1wiIGRhdGEtcm93LWlkPVwie3tpZH19XCI+XG5cdFx0XHRcdCAgPGRpdiBjbGFzcz1cImItY3VzdG9tLXRhYmxlX19jZWxsIGItY3VzdG9tLXRhYmxlX19jZWxsLS10aXRsZVwiPlxuXHRcdFx0XHQgICAgPGRpdiBjbGFzcz1cInRpdGxlXCI+e3t0aXRsZX19PC9kaXY+XG5cdFx0XHRcdCAgICB7e29wdGlvbmFsRGVzY3JpcHRpb259fVxuXHRcdFx0XHQgIDwvZGl2PlxuXHRcdFx0XHQgIDxkaXYgY2xhc3M9XCJiLWN1c3RvbS10YWJsZV9fY2VsbCBiLWN1c3RvbS10YWJsZV9fY2VsbC0teWVhclwiPnt7eWVhcn19PC9kaXY+XG5cdFx0XHRcdCAgPGRpdiBjbGFzcz1cImItY3VzdG9tLXRhYmxlX19jZWxsIGItY3VzdG9tLXRhYmxlX19jZWxsLS1jb2xvclwiPlxuXHRcdFx0XHQgICAge3tvcHRpb25hbENvbG9yYm94fX1cblx0XHRcdFx0ICA8L2Rpdj5cblx0XHRcdFx0ICA8ZGl2IGNsYXNzPVwiYi1jdXN0b20tdGFibGVfX2NlbGwgYi1jdXN0b20tdGFibGVfX2NlbGwtLXN0YXR1c1wiPnt7c3RhdHVzfX08L2Rpdj5cblx0XHRcdFx0ICA8ZGl2IGNsYXNzPVwiYi1jdXN0b20tdGFibGVfX2NlbGwgYi1jdXN0b20tdGFibGVfX2NlbGwtLXByaWNlXCI+XG5cdFx0XHRcdCAgICA8bm9iciBjbGFzcz1cInByaWNlIGpzLXByaWNlXCIgZGF0YS1vcmlnaW5hbC1wcmljZT1cInt7cHJpY2V9fVwiPnt7Zm9ybWF0dGVkUHJpY2V9fTwvbm9icj5cblx0XHRcdFx0ICAgIDxub2JyIGNsYXNzPVwicHJpY2Utd2l0aC10YXgganMtcHJpY2Utd2l0aC10YXhcIiBkYXRhLW9yaWdpbmFsLXByaWNlLXdpdGgtdGF4PVwie3twcmljZVdpdGhUYXh9fVwiPnt7Zm9ybWF0dGVkUHJpY2VXaXRoVGF4fX0gKCsxMyUpPC9ub2JyPlxuXHRcdFx0XHQgIDwvZGl2PlxuXHRcdFx0XHQgIDxkaXYgY2xhc3M9XCJiLWN1c3RvbS10YWJsZV9fY2VsbCBiLWN1c3RvbS10YWJsZV9fY2VsbC0tYWN0aW9uXCI+XG5cdFx0XHRcdCAgICA8YnV0dG9uIGNsYXNzPVwiaS1idXR0b24gaS1idXR0b24tLWVsbGlwc2UgaS1idXR0b24tLXNpemUtc21hbGwganMtZGVsZXRlLXRyaWdnZXJcIj57e3JlbW92ZUJ1dHRvblRleHR9fTwvYnV0dG9uPlxuXHRcdFx0XHQgIDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdGAsXG5cdFx0XHRvcHRpb25hbDoge1xuXHRcdFx0XHRkZXNjcmlwdGlvbjogYDxkaXYgY2xhc3M9XCJkZXNjcmlwdGlvblwiPnt7ZGVzY3JpcHRpb259fTwvZGl2PmAsXG5cdFx0XHRcdGNvbG9yQm94OiBgPGRpdiBjbGFzcz1cImktY29sb3ItYm94XCIgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiB7e2NvbG9yQ29kZX19XCI+PC9kaXY+YCxcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0dGhpcy4kdGFibGVXcmFwcGVyID0gbnVsbDtcblx0fVxuXG5cdC8qKlxuXHQgKiDQmNC90LjRhtC40LDQu9C40LfQsNGG0LjRjyDQu9C+0LPQuNC60Lgg0YDQsNCx0L7RgtGLINC60L7QvdGC0YDQvtC70LvQtdGA0LBcblx0ICovXG5cdGluaXQoKSB7XG5cdFx0Ly/RgtCw0LHQu9C40YbQsFxuXHRcdHRoaXMuJHRhYmxlV3JhcHBlciA9ICQoJyNjYXJhbWJhLXRhYmxlJyk7XG5cdFx0Ly/RhNC+0YDQvNCwXG5cdFx0dGhpcy4kZm9ybSA9ICQoJyNjYXJhbWJhLWZvcm0nKTtcblxuXHRcdGlmICh0aGlzLiR0YWJsZVdyYXBwZXIubGVuZ3RoICYmIHRoaXMuJGZvcm0ubGVuZ3RoKSB7XG5cdFx0XHQvL9GC0LXQu9C+INGC0LDQsdC70LjRhtGLXG5cdFx0XHR0aGlzLiR0YWJsZVJvd0NvbnRhaW5lciA9IHRoaXMuJHRhYmxlV3JhcHBlci5maW5kKCcuanMtYm9keScpO1xuXHRcdFx0Ly/QsdC70L7QuiDQtNC70Y8g0YPQstC10LTQvtC80LvQtdC90LjQuVxuXHRcdFx0dGhpcy4kdGFibGVOb3R5ID0gdGhpcy4kdGFibGVXcmFwcGVyLmZpbmQoJy5qcy1ub3R5Jyk7XG5cdFx0XHQvL9C40YLQvtCz0L7QstCw0Y8g0YbQtdC90LBcblx0XHRcdHRoaXMuJHRhYmxlU3VtbWFyeVByaWNlID0gdGhpcy4kdGFibGVXcmFwcGVyLmZpbmQoJy5qcy1zdW1tYXJ5LXByaWNlJyk7XG5cblx0XHRcdC8v0YLRgNC40LPQs9C10YAg0LTQu9GPINGD0LTQsNC70LXQvdC40Y8g0YHRgtGA0L7QulxuXHRcdFx0dGhpcy5pbml0RGVsZXRlVHJpZ2dlcigpO1xuXHRcdFx0Ly/QuNC90LjRhtC40LDQu9C40LfQsNGG0LjQuCDQu9C+0LPQuNC60Lgg0YDQsNCx0L7RgtGLINGBINGE0L7RgNC80L7QuVxuXHRcdFx0dGhpcy5pbml0Rm9ybSgpO1xuXG5cdFx0XHR0aGlzLmxvY2tUYWJsZSgpO1xuXHRcdFx0dGhpcy5sb2FkRGF0YSgpXG5cdFx0XHRcdC50aGVuKChkYXRhKSA9PiB7XG5cdFx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXG5cdFx0XHRcdFx0XHQuZGVsYXkoMTAwMCkgLy/RjdC80YPQu9GP0YbQuNGPINC00L7Qu9Cz0L7Qs9C+INC+0YLQstC10YLQsCDQvtGCINGB0LXRgNCy0LXRgNCwXG5cdFx0XHRcdFx0XHQudGhlbigoKSA9PiB7XG5cdFx0XHRcdFx0XHRcdGlmIChPYmplY3Qua2V5cyhkYXRhKS5sZW5ndGgpIHtcblx0XHRcdFx0XHRcdFx0XHQvL9C+0LHQvdC+0LLQu9C10L3QuNC1INC00LDQvdC90YvRhSDQsiDRgtCw0LHQu9C40YbQulxuXHRcdFx0XHRcdFx0XHRcdHRoaXMudXBkYXRlVGFibGVXaXRoRGF0YShkYXRhKTtcblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLnNob3dUYWJsZU5vdGlmaWNhdGlvbih0aGlzLmdldFRleHQoJ2Vycm9yLS1lbXB0eV9kYXRhJykpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSlcblx0XHRcdFx0LnRoZW4oKCkgPT4ge1xuXHRcdFx0XHRcdHRoaXMudW5sb2NrVGFibGUoKTtcblx0XHRcdFx0fSlcblx0XHRcdFx0LmNhdGNoKChtc2cpID0+IHtcblx0XHRcdFx0XHQvL1RPRE8g0L7QsdGA0LDQsdC+0YLQutCwINC+0YjQuNCx0L7QulxuXHRcdFx0XHRcdHRoaXMuc2hvd1RhYmxlTm90aWZpY2F0aW9uKHRoaXMuZ2V0VGV4dCgnZXJyb3ItLWxvYWRfZXJyb3InKSk7XG5cdFx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiDQmNC90LjRhtC40LDQu9C40LfQsNGG0LjRjyDRgNCw0LHQvtGC0Ysg0YEg0YTQvtGA0LzQvtC5XG5cdCAqL1xuXHRpbml0Rm9ybSgpIHtcblx0XHR0aGlzLiRmb3JtLnBhcnNsZXkoKVxuXHRcdFx0Lm9uKCdmb3JtOnN1Ym1pdCcsIChmb3JtKSA9PiB7XG5cdFx0XHRcdGxldCBkYXRhID0ge307XG5cblx0XHRcdFx0aWYgKHRoaXMuaXNUYWJsZUxvY2soKSkge1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRoaXMubG9ja1RhYmxlKCk7XG5cblx0XHRcdFx0Ly/QvtCx0YXQvtC00LjQvCDQstGB0LUg0L/QvtC70Y8g0YTQvtGA0LzRiyDQuCDRgdC+0LHQuNGA0LDQtdC8INC00LDQvdC90YvQtVxuXHRcdFx0XHRmb3IgKGxldCBmaWVsZCBpbiBmb3JtLmZpZWxkcykge1xuXHRcdFx0XHRcdGlmIChmb3JtLmZpZWxkcy5oYXNPd25Qcm9wZXJ0eShmaWVsZCkpIHtcblx0XHRcdFx0XHRcdGxldCBmaWVsZE5hbWUgPSBmb3JtLmZpZWxkc1tmaWVsZF0uJGVsZW1lbnQuYXR0cignZGF0YS1maWVsZC10eXBlJyk7XG5cdFx0XHRcdFx0XHRsZXQgdmFsdWUgPSBmb3JtLmZpZWxkc1tmaWVsZF0uZ2V0VmFsdWUoKTtcblxuXHRcdFx0XHRcdFx0aWYgKGZpZWxkTmFtZSA9PSAncHJpY2UnKSB7XG5cdFx0XHRcdFx0XHRcdGRhdGFbZmllbGROYW1lXSA9IHZhbHVlLnJlcGxhY2UoL1xccy8sICcnKS5yZXBsYWNlKC8sLywgJy4nKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdGRhdGFbZmllbGROYW1lXSA9IHZhbHVlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8v0L/QvtC70YPRh9Cw0LXQvCDRg9GB0LvQvtCy0L3QviDRg9C90LjQutCw0LvRjNC90YvQuSBJRCDQtNC70Y8g0L3QvtCy0L7Qs9C+INGN0LvQtdC80LXQvdGC0LBcblx0XHRcdFx0ZGF0YS5pZCA9IHRoaXMuZ2VuZXJhdGVVbmlxUm93SUQoKTtcblxuXHRcdFx0XHRsZXQgcHJlcGFyZWREYXRhID0gW107XG5cdFx0XHRcdHByZXBhcmVkRGF0YS5wdXNoKGRhdGEpO1xuXG5cdFx0XHRcdC8v0LTQvtCx0LDQstC70Y/QtdC8INGN0LvQtdC80LXQvdGC0LIg0LIg0LvQvtC60LDQu9GM0L3QvtC1INGF0YDQsNC90LjQu9C40YnQtdGGXG5cdFx0XHRcdHRoaXMuYWRkUm93VG9Mb2NhbFN0b3JhZ2UoZGF0YSk7XG5cblx0XHRcdFx0Ly/QvtCx0L3QvtCy0LvQtdC90LjQtVxuXHRcdFx0XHR0aGlzLnVwZGF0ZVRhYmxlV2l0aERhdGEocHJlcGFyZWREYXRhLCB0cnVlKTtcblxuXHRcdFx0XHR0aGlzLnJlc2V0Rm9ybShmb3JtKTtcblxuXHRcdFx0XHR0aGlzLnVubG9ja1RhYmxlKCk7XG5cblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fSk7XG5cdH1cblxuXHQvKipcblx0ICog0KHQsdGA0L7RgdC40YLRjCDQv9C+0LvRjyDQsiDRhNC+0YDQvNC1XG5cdCAqIEBwYXJhbSBwYXJzbGV5Rm9ybVxuXHQgKi9cblx0cmVzZXRGb3JtKHBhcnNsZXlGb3JtKSB7XG5cdFx0bGV0ICRmb3JtID0gJChwYXJzbGV5Rm9ybS4kZWxlbWVudCk7XG5cdFx0bGV0ICRjdXN0b21TZWxlY3RzID0gJGZvcm0uZmluZCgnW2RhdGEtaXMtY3VzdG9tLXNlbGVjdF0nKTtcblxuXHRcdC8v0YHQsdGA0LDRgdGL0LLQsNC10Lwg0LfQvdCw0YfQtdC90LjRjyDRhNC+0YDQvFxuXHRcdHBhcnNsZXlGb3JtLiRlbGVtZW50WzBdLnJlc2V0KCk7XG5cdFx0JGZvcm0ucGFyc2xleSgpLnJlc2V0KCk7XG5cblx0XHQvL9C+0LHRhdC+0LTQuNC8INCy0YHQtSDQv9C+0LvRjyDRhNC+0YDQvNGLINC4INGB0LHRgNCw0YHRi9Cy0LDQtdC8INC30LDQv9C+0LvQvdC10L3QvdC+0YHRgtGMINC/0L7Qu9C10Llcblx0XHRmb3IgKGxldCBmaWVsZCBpbiBwYXJzbGV5Rm9ybS5maWVsZHMpIHtcblx0XHRcdGlmIChwYXJzbGV5Rm9ybS5maWVsZHMuaGFzT3duUHJvcGVydHkoZmllbGQpKSB7XG5cdFx0XHRcdHBhcnNsZXlGb3JtLmZpZWxkc1tmaWVsZF0uJGVsZW1lbnQucmVtb3ZlQ2xhc3MoJ2lzLWZpbGwnKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoJGN1c3RvbVNlbGVjdHMubGVuZ3RoKSB7XG5cdFx0XHQkLmVhY2goJGN1c3RvbVNlbGVjdHMsIChpLCBzZWxlY3QpID0+IHtcblx0XHRcdFx0JChzZWxlY3QpLnZhbCgnJykudHJpZ2dlcignY2hhbmdlJyk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXG5cdC8qKlxuXHQgKiDQmNC90LjRhtC40LDQu9C40LfQsNGG0LjRjyDQu9C+0LPQuNC60Lgg0YPQtNCw0LvQtdC90LjRjyDRgdGC0YDQvtC6INC40Lcg0YLQsNCx0LvQuNGG0Ytcblx0ICovXG5cdGluaXREZWxldGVUcmlnZ2VyKCkge1xuXHRcdHRoaXMuJHRhYmxlV3JhcHBlci5vbignY2xpY2snLCAnLmpzLWRlbGV0ZS10cmlnZ2VyJywgKGUpID0+IHtcblx0XHRcdGxldCAkdGhpcyA9ICQoZS5jdXJyZW50VGFyZ2V0KTtcblx0XHRcdGxldCAkcm93ID0gJHRoaXMuY2xvc2VzdCgnW2RhdGEtcm93LWlkXScpO1xuXG5cdFx0XHRpZiAoJHJvdy5sZW5ndGgpIHtcblx0XHRcdFx0bGV0IHJvd0lEID0gJHJvdy5hdHRyKCdkYXRhLXJvdy1pZCcpO1xuXG5cdFx0XHRcdHRoaXMubG9ja1RhYmxlKCk7XG5cblx0XHRcdFx0UHJvbWlzZS5yZXNvbHZlKClcblx0XHRcdFx0XHQuZGVsYXkoMTAwKSAvL9GH0LjRgdGC0L4g0LTQu9GPINC00LXQvNC+0L3RgdGC0YDQsNGG0LjQuCDRgNCw0LHQvtGC0Ysg0YEg0YHQtdGA0LLQtdGA0L7QvFxuXHRcdFx0XHRcdC50aGVuKCgpID0+IHtcblx0XHRcdFx0XHRcdCRyb3cucmVtb3ZlKCk7XG5cdFx0XHRcdFx0XHR0aGlzLmRlbGV0ZVJvd0Zyb21Mb2NhbFN0b3JhZ2Uocm93SUQpO1xuXHRcdFx0XHRcdFx0dGhpcy51cGRhdGVUYWJsZVZpZXdTdGF0dXMoKTtcblx0XHRcdFx0XHRcdHRoaXMudXBkYXRlU3VtbWFyeVByaWNlKCk7XG5cdFx0XHRcdFx0XHR0aGlzLnVubG9ja1RhYmxlKCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHQvKipcblx0ICog0J/QvtC00LPRgNGD0LfQutCwINC00LDQvdC90YvQuSDRgSDRg9C00LDQu9C10L3QvdC+0LPQviDQuNGB0YLQvtGH0L3QuNC60LBcblx0ICog0JHQsNCzINCyIElFMTAg0LggSUUxMSDQvdCwIFdpbmRvd3MgNyDQuCBXaW5kb3dzIDguMSBodHRwOi8vdGFrZS5tcy96QkY4alxuXHQgKiBAcmV0dXJucyB7UHJvbWlzZS48VFJlc3VsdD59XG5cdCAqL1xuXHRsb2FkRGF0YSgpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0JC5hamF4KHtcblx0XHRcdFx0dXJsOiB0aGlzLmxvYWRVcmwsXG5cdFx0XHRcdGRhdGE6IHt9LFxuXHRcdFx0XHRkYXRhVHlwZTogJ2pzb24nLFxuXHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xuXHRcdFx0XHRcdHJlc29sdmUoZGF0YSk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGVycm9yOiAoanFYSFIsIHRleHRTdGF0dXMsIGVycm9yKSA9PiB7XG5cdFx0XHRcdFx0cmVqZWN0KCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0pXG5cdFx0XHQudGhlbigoZGF0YSkgPT4ge1xuXHRcdFx0XHRsZXQgbG9jYWxEYXRhID0gdGhpcy5nZXRBbGxSb3dzRnJvbUxvY2FsU3RvcmFnZSgpO1xuXG5cdFx0XHRcdGlmIChsb2NhbERhdGEpIHtcblx0XHRcdFx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgbG9jYWxEYXRhLCBkYXRhKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZXR1cm4gZGF0YTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdH1cblxuXHQvKipcblx0ICog0JLRi9Cy0L7QtCDQtNCw0L3QvdGL0YUg0LIg0YjQsNCx0LvQvtC90L3Rg9GOINGB0YLRgNC+0LrRgyDQuCDQtNC+0LHQsNCy0LvQtdC90LjQtSDQtNCw0L3QvdGL0LXRhVxuXHQgKiBUT0RPINC00L7Qv9C+0LvQvdC40YLQtdC70YzQvdCw0Y8g0LHQtdC30L7Qv9Cw0YHQvdCw0Y8g0L7QsdGA0LDQsdC+0YLQutCwINC00LDQvdC90YvRhSDRgSDRgdC10YDQstCwXG5cdCAqIEBwYXJhbSBkYXRhXG5cdCAqIEBwYXJhbSBiQXBwZW5kIC0g0L3QtSDQvtGH0LjRidCw0YLRjCDRgdGD0YnQtdGB0YLQstGD0Y7RidC40LUg0LTQsNC90L3Ri9C1INCyINGC0LDQsdC70LjRhtC1XG5cdCAqL1xuXHR1cGRhdGVUYWJsZVdpdGhEYXRhKGRhdGEsIGJBcHBlbmQgPSBmYWxzZSkge1xuXHRcdGxldCByZXN1bHRNYXJrdXAgPSBbXTtcblxuXHRcdGZvciAobGV0IHJvdyBpbiBkYXRhKSB7XG5cdFx0XHRpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eShyb3cpKSB7XG5cdFx0XHRcdC8v0L3QtdGCINGB0LzRi9GB0LvRiyDQstGL0LLQvtC00LjRgtGMINGB0YLRgNC+0LrRgywg0LXRgdC70Lgg0L7RgtGB0YLRg9GC0YHQstGD0LXRgiBJRCDQuNC70LggVElUTEVcblx0XHRcdFx0aWYgKHR5cGVvZiBkYXRhW3Jvd10uaWQgIT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGRhdGFbcm93XS50aXRsZSAhPSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRcdGxldCByb3dNYXJrdXAgPSB0aGlzLm1hcmt1cFRlbXBsYXRlLnNjYWZmb2xkO1xuXG5cdFx0XHRcdFx0Zm9yIChsZXQgZmllbGROYW1lIGluIGRhdGFbcm93XSkge1xuXHRcdFx0XHRcdFx0aWYgKGRhdGFbcm93XS5oYXNPd25Qcm9wZXJ0eShmaWVsZE5hbWUpKSB7XG5cdFx0XHRcdFx0XHRcdGxldCB2YWx1ZSA9IGRhdGFbcm93XVtmaWVsZE5hbWVdO1xuXG5cdFx0XHRcdFx0XHRcdGlmIChmaWVsZE5hbWUgPT0gJ2lkJykge1xuXHRcdFx0XHRcdFx0XHRcdHJvd01hcmt1cCA9IHJvd01hcmt1cC5yZXBsYWNlKC97e2lkfX0vZywgdmFsdWUpO1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0aWYgKGZpZWxkTmFtZSA9PSAndGl0bGUnKSB7XG5cdFx0XHRcdFx0XHRcdFx0cm93TWFya3VwID0gcm93TWFya3VwLnJlcGxhY2UoL3t7dGl0bGV9fS9nLCB2YWx1ZSk7XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRpZiAoZmllbGROYW1lID09ICdkZXNjcmlwdGlvbicpIHtcblx0XHRcdFx0XHRcdFx0XHRyb3dNYXJrdXAgPSByb3dNYXJrdXAucmVwbGFjZSgve3tvcHRpb25hbERlc2NyaXB0aW9ufX0vZywgdGhpcy5tYXJrdXBUZW1wbGF0ZS5vcHRpb25hbC5kZXNjcmlwdGlvbik7XG5cdFx0XHRcdFx0XHRcdFx0cm93TWFya3VwID0gcm93TWFya3VwLnJlcGxhY2UoL3t7ZGVzY3JpcHRpb259fS9nLCB2YWx1ZSk7XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHQvKipcblx0XHRcdFx0XHRcdFx0ICog0KbQstC10YLQsCDQstGL0LLQvtC20YMg0L/RgNGP0LzQviDQsiDQstC40LTQtSDRgtC10LrRgdGC0LAsINC90L4g0L/Qvi3RhdC+0YDQvtGI0LXQvNGDINC90YPQttC90L4g0L7RgtC00LDQstCw0YLRjCDRhdGN0Ygg0YfQtdGA0LXQtyBBUElcblx0XHRcdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0XHRcdGlmIChmaWVsZE5hbWUgPT0gJ2NvbG9yJykge1xuXHRcdFx0XHRcdFx0XHRcdHJvd01hcmt1cCA9IHJvd01hcmt1cC5yZXBsYWNlKC97e29wdGlvbmFsQ29sb3Jib3h9fS9nLCB0aGlzLm1hcmt1cFRlbXBsYXRlLm9wdGlvbmFsLmNvbG9yQm94KTtcblx0XHRcdFx0XHRcdFx0XHRyb3dNYXJrdXAgPSByb3dNYXJrdXAucmVwbGFjZSgve3tjb2xvckNvZGV9fS9nLCB2YWx1ZSk7XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRpZiAoZmllbGROYW1lID09ICd5ZWFyJykge1xuXHRcdFx0XHRcdFx0XHRcdHJvd01hcmt1cCA9IHJvd01hcmt1cC5yZXBsYWNlKC97e3llYXJ9fS9nLCB2YWx1ZSk7XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRpZiAoZmllbGROYW1lID09ICdzdGF0dXMnKSB7XG5cdFx0XHRcdFx0XHRcdFx0Ly/QvtC/0LXRh9Cw0YLQutCwINCyINGB0YLQsNGC0YPRgdC1LCDQsiDRgtCw0LrQvtC8INCy0LjQtNC1INC/0YDQuNC70LXRgtCw0LXRgiDRgSDQkNCf0Jhcblx0XHRcdFx0XHRcdFx0XHRpZiAodmFsdWUgPT0gJ3BlZG5kaW5nJykge1xuXHRcdFx0XHRcdFx0XHRcdFx0dmFsdWUgPSAncGVuZGluZyc7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0bGV0IHN0YXR1c1RleHQgPSB0aGlzLmdldFRleHQoYHN0YXR1cy0tJHt2YWx1ZX1gKTtcblx0XHRcdFx0XHRcdFx0XHRyb3dNYXJrdXAgPSByb3dNYXJrdXAucmVwbGFjZSgve3tzdGF0dXN9fS9nLCAoc3RhdHVzVGV4dCkgPyBzdGF0dXNUZXh0IDogJy0nKTtcblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdGlmIChmaWVsZE5hbWUgPT0gJ3ByaWNlJykge1xuXHRcdFx0XHRcdFx0XHRcdGxldCBwcmljZSA9IHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJyA/IHZhbHVlLnJlcGxhY2UoL1xccy8sICcnKS5yZXBsYWNlKC8sLywgJy4nKSA6IHZhbHVlO1xuXHRcdFx0XHRcdFx0XHRcdGxldCBwcmljZVdpdGhUYXggPSBDVG9vbHMuZ2V0UHJpY2VXaXRoVGF4KHByaWNlLCB0aGlzLnRheCwgMik7XG5cdFx0XHRcdFx0XHRcdFx0bGV0IGZvcm1hdHRlZFByaWNlID0gQ1Rvb2xzLmZvcm1hdE1vbmV5KHByaWNlLCB0aGlzLmxvY2FsZSk7XG5cdFx0XHRcdFx0XHRcdFx0bGV0IGZvcm1hdHRlZFByaWNlV2l0aFRheCA9IENUb29scy5mb3JtYXRNb25leShwcmljZVdpdGhUYXgsIHRoaXMubG9jYWxlKTtcblxuXHRcdFx0XHRcdFx0XHRcdHJvd01hcmt1cCA9IHJvd01hcmt1cC5yZXBsYWNlKC97e3ByaWNlfX0vZywgcHJpY2UpO1xuXHRcdFx0XHRcdFx0XHRcdHJvd01hcmt1cCA9IHJvd01hcmt1cC5yZXBsYWNlKC97e2Zvcm1hdHRlZFByaWNlfX0vZywgYCR7Zm9ybWF0dGVkUHJpY2V9ICR7dGhpcy5nZXRUZXh0KCdjdXJyZW5jeScpfWApO1xuXHRcdFx0XHRcdFx0XHRcdHJvd01hcmt1cCA9IHJvd01hcmt1cC5yZXBsYWNlKC97e3ByaWNlV2l0aFRheH19L2csIHByaWNlV2l0aFRheCk7XG5cdFx0XHRcdFx0XHRcdFx0cm93TWFya3VwID0gcm93TWFya3VwLnJlcGxhY2UoL3t7Zm9ybWF0dGVkUHJpY2VXaXRoVGF4fX0vZywgYCR7Zm9ybWF0dGVkUHJpY2VXaXRoVGF4fSAke3RoaXMuZ2V0VGV4dCgnY3VycmVuY3knKX1gKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJvd01hcmt1cCA9IHJvd01hcmt1cFxuXHRcdFx0XHRcdFx0LnJlcGxhY2UoL3t7b3B0aW9uYWxEZXNjcmlwdGlvbn19L2csICcnKVxuXHRcdFx0XHRcdFx0LnJlcGxhY2UoL3t7b3B0aW9uYWxDb2xvcmJveH19L2csICcnKVxuXHRcdFx0XHRcdFx0LnJlcGxhY2UoL3t7cmVtb3ZlQnV0dG9uVGV4dH19L2csIHRoaXMuZ2V0VGV4dCgncmVtb3ZlX2J1dHRvbl90ZXh0JykpO1xuXG5cdFx0XHRcdFx0cmVzdWx0TWFya3VwLnB1c2gocm93TWFya3VwKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChiQXBwZW5kKSB7XG5cdFx0XHR0aGlzLiR0YWJsZVJvd0NvbnRhaW5lci5hcHBlbmQocmVzdWx0TWFya3VwLmpvaW4oJycpKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy4kdGFibGVSb3dDb250YWluZXIuaHRtbCgnJyk7XG5cdFx0XHR0aGlzLiR0YWJsZVJvd0NvbnRhaW5lci5hcHBlbmQocmVzdWx0TWFya3VwLmpvaW4oJycpKTtcblx0XHR9XG5cblx0XHR0aGlzLnVwZGF0ZVN1bW1hcnlQcmljZSgpO1xuXHRcdHRoaXMudXBkYXRlVGFibGVWaWV3U3RhdHVzKCk7XG5cdH1cblxuXHQvKipcblx0ICog0J7QsdC90L7QstC70LXQvdC40LUg0LjRgtC+0LPQvtCy0L7QuSDRgdGD0LzQvNGLINGC0LDQsdC70LjRhtGLXG5cdCAqL1xuXHR1cGRhdGVTdW1tYXJ5UHJpY2UoKSB7XG5cdFx0bGV0IHN1bW1hcnlQcmljZSA9IDA7XG5cblx0XHQkLmVhY2godGhpcy5nZXRSb3dzKCksIChpLCByb3cpID0+IHtcblx0XHRcdGxldCAkcm93ID0gJChyb3cpO1xuXHRcdFx0bGV0IHByaWNlID0gKCRyb3cuZmluZCgnLmpzLXByaWNlLXdpdGgtdGF4JykubGVuZ3RoKVxuXHRcdFx0XHQ/ICRyb3cuZmluZCgnLmpzLXByaWNlLXdpdGgtdGF4JykuYXR0cignZGF0YS1vcmlnaW5hbC1wcmljZS13aXRoLXRheCcpXG5cdFx0XHRcdDogJHJvdy5maW5kKCcuanMtcHJpY2UnKS5hdHRyKCdkYXRhLW9yaWdpbmFsLXByaWNlJyk7XG5cblx0XHRcdGlmIChwcmljZSkge1xuXHRcdFx0XHRpZiAoIWlzTmFOKHN1bW1hcnlQcmljZSkgJiYgIWlzTmFOKHByaWNlKSkge1xuXHRcdFx0XHRcdHN1bW1hcnlQcmljZSA9IE51bWJlcihzdW1tYXJ5UHJpY2UpICsgTnVtYmVyKHByaWNlKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0dGhpcy4kdGFibGVTdW1tYXJ5UHJpY2UuaHRtbChgJHtDVG9vbHMuZm9ybWF0TW9uZXkoTnVtYmVyKHN1bW1hcnlQcmljZSksIHRoaXMubG9jYWxlKX0gJHt0aGlzLmdldFRleHQoJ2N1cnJlbmN5Jyl9YCk7XG5cdH1cblxuXHQvKipcblx0ICog0J/QvtC70YPRh9C40YLRjCDQstGB0LUg0YHRgtGA0L7QutC4INC40Lcg0YLQsNCx0LvQuNGG0Ytcblx0ICovXG5cdGdldFJvd3MoKSB7XG5cdFx0cmV0dXJuIHRoaXMuJHRhYmxlUm93Q29udGFpbmVyLmZpbmQoJ1tkYXRhLXJvdy1pZF0nKTtcblx0fVxuXG5cdC8qKlxuXHQgKiDQlNC+0LHQsNCy0LjRgtGMINC00LDQvdC90YvQtSDQviDQt9Cw0L/QuNGB0Lgg0LIgbG9jYWxTdG9yYWdlXG5cdCAqIEBwYXJhbSBkYXRhXG5cdCAqL1xuXHRhZGRSb3dUb0xvY2FsU3RvcmFnZShkYXRhKSB7XG5cdFx0aWYgKGRhdGEgJiYgZGF0YS5pZCAmJiBsb2NhbFN0b3JhZ2UpIHtcblx0XHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKGBhdXRvUGFydHMtLXJvdy0ke2RhdGEuaWR9YCwgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiDQn9C+0LvRg9GH0LjRgtGMINC00LDQvdC90YvQtSDQuNC3IGxvY2FsU3RvcmFnZVxuXHQgKiBAcmV0dXJucyB7Kn1cblx0ICovXG5cdGdldEFsbFJvd3NGcm9tTG9jYWxTdG9yYWdlKCkge1xuXHRcdGxldCBkYXRhID0ge307XG5cblx0XHRpZiAoIWxvY2FsU3RvcmFnZSkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdGZvciAobGV0IGtleSBpbiBsb2NhbFN0b3JhZ2UpIHtcblx0XHRcdGlmIChsb2NhbFN0b3JhZ2UuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRpZiAoa2V5LmluZGV4T2YoJ2F1dG9QYXJ0cy0tcm93JykgIT0gLTEpIHtcblx0XHRcdFx0XHRsZXQgb2JqID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpKTtcblx0XHRcdFx0XHRkYXRhW29iai5pZF0gPSBvYmo7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gT2JqZWN0LmtleXMoZGF0YSkubGVuZ3RoID8gZGF0YSA6IGZhbHNlO1xuXHR9XG5cblx0LyoqXG5cdCAqINCj0LTQsNC70LjRgtGMINC00LDQvdC90YvQtSDQuNC3IGxvY2FsU3RvcmFnZVxuXHQgKiBAcGFyYW0gaWRcblx0ICovXG5cdGRlbGV0ZVJvd0Zyb21Mb2NhbFN0b3JhZ2UoaWQpIHtcblx0XHRpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oYGF1dG9QYXJ0cy0tcm93LSR7aWR9YCkpIHtcblx0XHRcdGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGBhdXRvUGFydHMtLXJvdy0ke2lkfWApO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiDQn9C+0LvRg9GH0LjRgtGMINGC0LXQutGB0YIg0L/QviDQutC+0LTRgyDQtNC70Y8g0L/QtdGA0LXQtNCw0L3QvdC+0Lkg0LvQvtC60LDQu9C4XG5cdCAqIEBwYXJhbSBsb2NhbGUgLSDQu9C+0LrQsNC70Yxcblx0ICogQHBhcmFtIHRleHQgLSDRgtC10LrRgdGCXG5cdCAqIEByZXR1cm5zIHtmdW5jdGlvbigqKX1cblx0ICovXG5cdGdldFRleHRCeUxvY2FsZShsb2NhbGUgPSAncnUnLCB0ZXh0KSB7XG5cdFx0cmV0dXJuICh0ZXh0KSA9PiB7XG5cdFx0XHRyZXR1cm4gKHRoaXMudGV4dCAmJiB0aGlzLnRleHRbbG9jYWxlXSAmJiB0aGlzLnRleHRbbG9jYWxlXVt0ZXh0XSkgPyB0aGlzLnRleHRbbG9jYWxlXVt0ZXh0XSA6IGZhbHNlO1xuXHRcdH07XG5cdH1cblxuXHQvKipcblx0ICog0J/QvtC70YPRh9C40YLRjCDRg9GB0LvQvtCy0L3QviDRg9C90LjQutCw0LvRjNC90YvQuSBpZFxuXHQgKiBAcmV0dXJucyB7bnVtYmVyfVxuXHQgKi9cblx0Z2VuZXJhdGVVbmlxUm93SUQoKSB7XG5cdFx0bGV0IHVuaXFJRCA9IDA7XG5cdFx0bGV0IGV4aXN0ZWRJRCA9IFtdO1xuXG5cdFx0JC5lYWNoKHRoaXMuZ2V0Um93cygpLCAoaSwgcm93KSA9PiB7XG5cdFx0XHRleGlzdGVkSUQucHVzaCgkKHJvdykuYXR0cignZGF0YS1yb3ctaWQnKSk7XG5cdFx0fSk7XG5cblx0XHRpZiAoZXhpc3RlZElELmxlbmd0aCkge1xuXHRcdFx0bGV0IG1heCA9IE1hdGgubWF4LmFwcGx5KG51bGwsIGV4aXN0ZWRJRC5tYXAoTnVtYmVyKSk7XG5cdFx0XHR1bmlxSUQgPSBtYXggKyAxO1xuXHRcdH1cblxuXHRcdHJldHVybiB1bmlxSUQ7XG5cdH1cblxuXHQvKipcblx0ICog0JLRi9Cy0L7QtNC40YIg0YHQvtC+0LHRidC10L3QuNC1INCyINC40L3RhNC+0YDQvNCw0YbQuNC+0L3QvdC+0Lwg0YLQsNCx0LvQuNGH0L3QvtC8INCx0LvQvtC60LVcblx0ICogQHBhcmFtIG1zZ1xuXHQgKi9cblx0c2hvd1RhYmxlTm90aWZpY2F0aW9uKG1zZyA9ICcnKSB7XG5cdFx0aWYgKG1zZykge1xuXHRcdFx0dGhpcy4kdGFibGVOb3R5Lmh0bWwobXNnKTtcblx0XHRcdHRoaXMuJHRhYmxlV3JhcHBlci5hZGRDbGFzcygnaXMtbm90eScpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiDQn9GA0L7QstC10YDRj9C10YIsINC10YHRgtGMINC70Lgg0LIg0YLQsNCx0LvQuNGG0LUg0LTQsNC90L3Ri9C1INC00LvRjyDQv9C+0LrQsNC30LAuINCV0YHQu9C4INC90LXRgiAtINCy0YvQstC+0LTQuNGCINGD0LLQtdC00L7QvNC70LXQvdC40LVcblx0ICovXG5cdHVwZGF0ZVRhYmxlVmlld1N0YXR1cygpIHtcblx0XHRpZiAodGhpcy5pc05vUm93cygpKSB7XG5cdFx0XHR0aGlzLnNob3dUYWJsZU5vdGlmaWNhdGlvbih0aGlzLmdldFRleHQoJ2Vycm9yLS1lbXB0eV9kYXRhJykpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLiR0YWJsZVdyYXBwZXIucmVtb3ZlQ2xhc3MoJ2lzLW5vdHknKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICog0J/RgNC+0LLQtdGA0Y/QtdGCLCDQv9GD0YHRgtCwINC40Lsg0YLQsNCx0LvQuNGG0LBcblx0ICogQHJldHVybnMge2Jvb2xlYW59XG5cdCAqL1xuXHRpc05vUm93cygpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRSb3dzKCkubGVuZ3RoID09IDA7XG5cdH1cblxuXHQvKipcblx0ICog0JHQu9C+0LrQuNGA0L7QstC60LAg0YLQsNCx0LvQuNGG0Ytcblx0ICovXG5cdGxvY2tUYWJsZSgpIHtcblx0XHR0aGlzLiR0YWJsZVdyYXBwZXIuYWRkQ2xhc3MoJ2lzLXByZWxvYWRpbmcnKTtcblx0fVxuXG5cdC8qKlxuXHQgKiDQoNCw0LfQsdC70L7QutC40YDQvtCy0LrQsCDRgtCw0LHQu9C40YbRi1xuXHQgKi9cblx0dW5sb2NrVGFibGUoKSB7XG5cdFx0dGhpcy4kdGFibGVXcmFwcGVyLnJlbW92ZUNsYXNzKCdpcy1wcmVsb2FkaW5nJyk7XG5cdH1cblxuXHQvKipcblx0ICog0KLQsNCx0LvQuNGG0LAg0LfQsNCx0LvQvtC60LjRgNC+0LLQsNC90LA/XG5cdCAqL1xuXHRpc1RhYmxlTG9jaygpIHtcblx0XHRyZXR1cm4gdGhpcy4kdGFibGVXcmFwcGVyLmhhc0NsYXNzKCdpcy1wcmVsb2FkaW5nJyk7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBDQ2FyYW1iYUNvbnRyb2xsZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvcGFydHMvQ0NhcmFtYmEuanMiXSwic291cmNlUm9vdCI6IiJ9