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
				$yearMask.mask("9999");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcGFydHMvQ1Rvb2xzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9wYXJ0cy9DQ2FyYW1iYS5qcyJdLCJuYW1lcyI6WyJDQ2FyYW1iYUNvbnRyb2xsZXIiLCJyZXF1aXJlIiwiQ1Rvb2xzIiwiUHJvbWlzZSIsImNvbmZpZyIsIndhcm5pbmdzIiwibG9uZ1N0YWNrVHJhY2VzIiwiY2FuY2VsbGF0aW9uIiwibW9uaXRvcmluZyIsInByb2R1Y3Rpb24iLCJDQXBwQ29udHJvbGxlciIsImNDYXJhbWJhQ29udHJvbGxlciIsImNUb29scyIsInJlc29sdmUiLCJ0aGVuIiwiaW5pdFNtYXJ0TGFiZWxzIiwiaW5pdEN1c3RvbVNlbGVjdHMiLCJpbml0TWFza3MiLCJpbml0Q3VzdG9tRm9ybVZhbGlkYXRvcnMiLCJpbml0IiwiJHNtYXJ0TGFiZWxzIiwiJCIsImxlbmd0aCIsIm9uIiwiJHRoaXMiLCJ0b2dnbGVDbGFzcyIsInZhbCIsImJsdXIiLCIkc2VsZWN0cyIsInNlbGVjdDIiLCJ3aW5kb3ciLCJQYXJzbGV5IiwiYWRkVmFsaWRhdG9yIiwidmFsaWRhdGVTdHJpbmciLCJ2YWx1ZSIsIk51bWJlciIsIkRhdGUiLCJnZXRGdWxsWWVhciIsIm1lc3NhZ2VzIiwicnUiLCIkeWVhck1hc2siLCIkbW9uZXlNYXNrIiwibWFzayIsIm1hc2tNb25leSIsInRob3VzYW5kcyIsImRlY2ltYWwiLCJhbGxvd05vRGVjaW1hbCIsImNBcHBDb250cm9sbGVyIiwiZG9jdW1lbnQiLCJyZWFkeSIsImdsb2JhbCIsIkFDIiwib2JqZWN0IiwiSlNPTiIsInBhcnNlIiwic3RyaW5naWZ5IiwicHJpY2UiLCJsb2NhbGUiLCJuUHJpY2UiLCJpc05hTiIsInRvTG9jYWxlU3RyaW5nIiwidGF4IiwicHJlY2lzaW9uIiwiblRheCIsInByaWNlV2l0aFRheCIsInRvRml4ZWQiLCJtb2R1bGUiLCJleHBvcnRzIiwibG9hZFVybCIsInRleHQiLCJyZW1vdmVfYnV0dG9uX3RleHQiLCJjdXJyZW5jeSIsImVuIiwiZ2V0VGV4dCIsImdldFRleHRCeUxvY2FsZSIsIm1hcmt1cFRlbXBsYXRlIiwic2NhZmZvbGQiLCJvcHRpb25hbCIsImRlc2NyaXB0aW9uIiwiY29sb3JCb3giLCIkdGFibGVXcmFwcGVyIiwiJGZvcm0iLCIkdGFibGVSb3dDb250YWluZXIiLCJmaW5kIiwiJHRhYmxlTm90eSIsIiR0YWJsZVN1bW1hcnlQcmljZSIsImluaXREZWxldGVUcmlnZ2VyIiwiaW5pdEZvcm0iLCJsb2NrVGFibGUiLCJsb2FkRGF0YSIsImRhdGEiLCJkZWxheSIsIk9iamVjdCIsImtleXMiLCJ1cGRhdGVUYWJsZVdpdGhEYXRhIiwic2hvd1RhYmxlTm90aWZpY2F0aW9uIiwidW5sb2NrVGFibGUiLCJjYXRjaCIsIm1zZyIsInBhcnNsZXkiLCJmb3JtIiwiaXNUYWJsZUxvY2siLCJmaWVsZCIsImZpZWxkcyIsImhhc093blByb3BlcnR5IiwiZmllbGROYW1lIiwiJGVsZW1lbnQiLCJhdHRyIiwiZ2V0VmFsdWUiLCJyZXBsYWNlIiwiaWQiLCJnZW5lcmF0ZVVuaXFSb3dJRCIsInByZXBhcmVkRGF0YSIsInB1c2giLCJhZGRSb3dUb0xvY2FsU3RvcmFnZSIsInJlc2V0Rm9ybSIsInBhcnNsZXlGb3JtIiwiJGN1c3RvbVNlbGVjdHMiLCJyZXNldCIsInJlbW92ZUNsYXNzIiwiZWFjaCIsImkiLCJzZWxlY3QiLCJ0cmlnZ2VyIiwiZSIsImN1cnJlbnRUYXJnZXQiLCIkcm93IiwiY2xvc2VzdCIsInJvd0lEIiwicmVtb3ZlIiwiZGVsZXRlUm93RnJvbUxvY2FsU3RvcmFnZSIsInVwZGF0ZVRhYmxlVmlld1N0YXR1cyIsInVwZGF0ZVN1bW1hcnlQcmljZSIsInJlamVjdCIsImFqYXgiLCJ1cmwiLCJkYXRhVHlwZSIsInN1Y2Nlc3MiLCJlcnJvciIsImpxWEhSIiwidGV4dFN0YXR1cyIsImxvY2FsRGF0YSIsImdldEFsbFJvd3NGcm9tTG9jYWxTdG9yYWdlIiwiYXNzaWduIiwiYkFwcGVuZCIsInJlc3VsdE1hcmt1cCIsInJvdyIsInRpdGxlIiwicm93TWFya3VwIiwic3RhdHVzVGV4dCIsImdldFByaWNlV2l0aFRheCIsImZvcm1hdHRlZFByaWNlIiwiZm9ybWF0TW9uZXkiLCJmb3JtYXR0ZWRQcmljZVdpdGhUYXgiLCJhcHBlbmQiLCJqb2luIiwiaHRtbCIsInN1bW1hcnlQcmljZSIsImdldFJvd3MiLCJsb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIiwia2V5IiwiaW5kZXhPZiIsIm9iaiIsImdldEl0ZW0iLCJyZW1vdmVJdGVtIiwidW5pcUlEIiwiZXhpc3RlZElEIiwibWF4IiwiTWF0aCIsImFwcGx5IiwibWFwIiwiYWRkQ2xhc3MiLCJpc05vUm93cyIsImhhc0NsYXNzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQU1BLHFCQUFxQixtQkFBQUMsQ0FBUSx5QkFBUixDQUEzQjtBQUNBLElBQU1DLFNBQVMsbUJBQUFELENBQVEsdUJBQVIsQ0FBZjs7QUFFQUUsUUFBUUMsTUFBUixDQUFlO0FBQ2Q7QUFDQUMsV0FBVSxDQUFDLEtBRkc7QUFHZDtBQUNBQyxrQkFBaUIsQ0FBQyxLQUpKO0FBS2Q7QUFDQUMsZUFBYyxDQUFDLEtBTkQ7QUFPZDtBQUNBQyxhQUFZLENBQUMsS0FBQUM7QUFSQyxDQUFmOztBQVdBOzs7O0lBR01DLGM7QUFDTCwyQkFBYztBQUFBOztBQUNiLE9BQUtDLGtCQUFMLEdBQTBCLElBQUlYLGtCQUFKLEVBQTFCO0FBQ0EsT0FBS1ksTUFBTCxHQUFjLElBQUlWLE1BQUosRUFBZDtBQUNBOzs7O3lCQUVNO0FBQUE7O0FBQ04sVUFBT0MsUUFBUVUsT0FBUixHQUNMQyxJQURLLENBQ0EsWUFBTTs7QUFFWCxVQUFLQyxlQUFMO0FBQ0EsVUFBS0MsaUJBQUw7QUFDQSxVQUFLQyxTQUFMO0FBQ0EsVUFBS0Msd0JBQUw7O0FBRUEsVUFBS1Asa0JBQUwsQ0FBd0JRLElBQXhCO0FBQ0EsSUFUSyxDQUFQO0FB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UUFBTCxFQUFKLEVBQXFCO0FBQ3BCLFNBQUs5RSxxQkFBTCxDQUEyQixLQUFLdEIsT0FBTCxDQUFhLG1CQUFiLENBQTNCO0FBQ0EsSUFGRCxNQUVPO0FBQ04sU0FBS08sYUFBTCxDQUFtQnVDLFdBQW5CLENBQStCLFNBQS9CO0FBQ0E7QUFDRDs7QUFFRDs7Ozs7Ozs2QkFJVztBQUNWLFVBQU8sS0FBS3VDLE9BQUwsR0FBZXhJLE1BQWYsSUFBeUIsQ0FBaEM7QUFDQTs7QUFFRDs7Ozs7OzhCQUdZO0FBQ1gsUUFBSzBELGFBQUwsQ0FBbUI0RixRQUFuQixDQUE0QixlQUE1QjtBQUNBOztBQUVEOzs7Ozs7Z0NBR2M7QUFDYixRQUFLNUYsYUFBTCxDQUFtQnVDLFdBQW5CLENBQStCLGVBQS9CO0FBQ0E7O0FBRUQ7Ozs7OztnQ0FHYztBQUNiLFVBQU8sS0FBS3ZDLGFBQUwsQ0FBbUI4RixRQUFuQixDQUE0QixlQUE1QixDQUFQO0FBQ0E7Ozs7OztBQUdGNUcsT0FBT0MsT0FBUCxHQUFpQm5FLGtCQUFqQixDIiwiZmlsZSI6Im1haW4uYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgQ0NhcmFtYmFDb250cm9sbGVyID0gcmVxdWlyZSgnLi9wYXJ0cy9DQ2FyYW1iYScpO1xuY29uc3QgQ1Rvb2xzID0gcmVxdWlyZSgnLi9wYXJ0cy9DVG9vbHMnKTtcblxuUHJvbWlzZS5jb25maWcoe1xuXHQvLyBFbmFibGUgd2FybmluZ3Ncblx0d2FybmluZ3M6ICFwcm9kdWN0aW9uLFxuXHQvLyBFbmFibGUgbG9uZyBzdGFjayB0cmFjZXNcblx0bG9uZ1N0YWNrVHJhY2VzOiAhcHJvZHVjdGlvbixcblx0Ly8gRW5hYmxlIGNhbmNlbGxhdGlvblxuXHRjYW5jZWxsYXRpb246ICFwcm9kdWN0aW9uLFxuXHQvLyBFbmFibGUgbW9uaXRvcmluZ1xuXHRtb25pdG9yaW5nOiAhcHJvZHVjdGlvblxufSk7XG5cbi8qKlxuICog0JPQu9Cw0LLQvdGL0Lkg0LrQvtC90YLRgNC+0LvQu9C10YBcbiAqL1xuY2xhc3MgQ0FwcENvbnRyb2xsZXIge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHR0aGlzLmNDYXJhbWJhQ29udHJvbGxlciA9IG5ldyBDQ2FyYW1iYUNvbnRyb2xsZXIoKTtcblx0XHR0aGlzLmNUb29scyA9IG5ldyBDVG9vbHMoKTtcblx0fVxuXG5cdGluaXQoKSB7XG5cdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXG5cdFx0XHQudGhlbigoKSA9PiB7XG5cblx0XHRcdFx0dGhpcy5pbml0U21hcnRMYWJlbHMoKTtcblx0XHRcdFx0dGhpcy5pbml0Q3VzdG9tU2VsZWN0cygpO1xuXHRcdFx0XHR0aGlzLmluaXRNYXNrcygpO1xuXHRcdFx0XHR0aGlzLmluaXRDdXN0b21Gb3JtVmFsaWRhdG9ycygpO1xuXG5cdFx0XHRcdHRoaXMuY0NhcmFtYmFDb250cm9sbGVyLmluaXQoKTtcblx0XHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqINCY0L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPINGD0LzQvdGL0YUg0L/Qu9C10LnRgdGF0L7Qu9C00LXRgNC+0LJcblx0ICovXG5cdGluaXRTbWFydExhYmVscygpIHtcblx0XHRjb25zdCAkc21hcnRMYWJlbHMgPSAkKCcuanMtc21hcnQtbGFiZWwtLWlucHV0Jyk7XG5cblx0XHRpZiAoJHNtYXJ0TGFiZWxzLmxlbmd0aCkge1xuXHRcdFx0JHNtYXJ0TGFiZWxzLm9uKCdibHVyJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRsZXQgJHRoaXMgPSAkKHRoaXMpO1xuXG5cdFx0XHRcdCR0aGlzLnRvZ2dsZUNsYXNzKCdpcy1maWxsJywgJHRoaXMudmFsKCkgIT09ICcnKTtcblx0XHRcdH0pLmJsdXIoKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICog0JjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y8g0LrQsNGB0YLQvtC80L3Ri9GFINGB0LXQu9C10LrRgtC+0LJcblx0ICovXG5cdGluaXRDdXN0b21TZWxlY3RzKCkge1xuXHRcdGNvbnN0ICRzZWxlY3RzID0gJCgnW2RhdGEtaXMtY3VzdG9tLXNlbGVjdF0nKTtcblxuXHRcdGlmICgkc2VsZWN0cy5sZW5ndGgpIHtcblx0XHRcdCRzZWxlY3RzLnNlbGVjdDIoe1xuXG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICog0JrQsNGB0YLQvtC80L3Ri9C1INGC0LjQv9GLINCy0LDQu9C40LTQsNGG0LjQuVxuXHQgKi9cblx0aW5pdEN1c3RvbUZvcm1WYWxpZGF0b3JzKCkge1xuXHRcdHdpbmRvdy5QYXJzbGV5LmFkZFZhbGlkYXRvcigncHJvZHVjdGlvblllYXInLCB7XG5cdFx0XHR2YWxpZGF0ZVN0cmluZzogZnVuY3Rpb24odmFsdWUpIHtcblx0XHRcdFx0cmV0dXJuIE51bWJlcih2YWx1ZSkgPj0gMTk4MCAmJiBOdW1iZXIodmFsdWUpIDw9IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKTtcblx0XHRcdH0sXG5cdFx0XHRtZXNzYWdlczoge1xuXHRcdFx0XHRydTogYNCT0L7QtCDQvNC+0LbQtdGCINCx0YvRgtGMINC30LDQtNCw0L0g0L7RgiAxOTgwINC00L4gJHtuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCl9YFxuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdH1cblxuXHQvKipcblx0ICog0JzQsNGB0LrQuFxuXHQgKi9cblx0aW5pdE1hc2tzKCkge1xuXHRcdGxldCAkeWVhck1hc2sgPSAkKCdbZGF0YS15ZWFyLW1hc2tdJyk7XG5cdFx0bGV0ICRtb25leU1hc2sgPSAkKCdbZGF0YS1tb25leS1tYXNrXScpO1xuXG5cdFx0aWYgKCR5ZWFyTWFzay5sZW5ndGgpIHtcblx0XHRcdCR5ZWFyTWFzay5tYXNrKFwiOTk5OVwiKTtcblx0XHR9XG5cblx0XHRpZiAoJG1vbmV5TWFzay5sZW5ndGgpIHtcblx0XHRcdC8vcnVcblx0XHRcdCRtb25leU1hc2subWFza01vbmV5KHtcblx0XHRcdFx0dGhvdXNhbmRzOiAnICcsXG5cdFx0XHRcdGRlY2ltYWw6ICcuJyxcblx0XHRcdFx0YWxsb3dOb0RlY2ltYWw6IHRydWVcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxufVxuXG5jb25zdCBjQXBwQ29udHJvbGxlciA9IG5ldyBDQXBwQ29udHJvbGxlcigpO1xuXG4kKGRvY3VtZW50KS5yZWFkeSgoKSA9PiB7XG5cdGNBcHBDb250cm9sbGVyLmluaXQoKVxuXHRcdC50aGVuKCgpID0+IHtcblx0XHRcdC8v0LLRi9Cx0YDQsNGB0YvQstCw0LXQvCDQsiBnbG9iYWwg0LTQu9GPINC00L7RgdGC0YPQv9CwXG5cdFx0XHRnbG9iYWwuQUMgPSBjQXBwQ29udHJvbGxlcjtcblx0XHR9KTtcbn0pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL21haW4uanMiLCIvKipcbiAqINCS0YHQv9C+0LzQvtCz0LDRgtC10LvRjNC90YvQtSDRhNGD0L3QutGG0LjQuFxuICovXG5jbGFzcyBDVG9vbHMge1xuXHRjb25zdHJ1Y3RvcigpIHt9XG5cblx0LyoqXG5cdCAqINCa0LvQvtC90LjRgNC+0LLQsNC90LjQtSDQvtCx0YrQtdC60YLQsCDQsdC10Lcg0L/RgNC40LLRj9C30LrQuCDQv9C+INGB0YHRi9C70LrQtVxuXHQgKiBAcGFyYW0gb2JqZWN0XG5cdCAqL1xuXHRzdGF0aWMgY2xvbmVPYmplY3Qob2JqZWN0ID0ge30pIHtcblx0XHRyZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvYmplY3QpKTtcblx0fVxuXG5cdC8qKlxuXHQgKiDQpNC+0YDQvNCw0YLQuNGA0L7QsNC90LjQtSDRgdGC0YDQvtC60Lgg0LIg0LTQtdC90LXQttC90YvQuSDQstC40LRcblx0ICogQHBhcmFtIHByaWNlXG5cdCAqIEBwYXJhbSBsb2NhbGVcblx0ICogQHJldHVybnMgeyp9XG5cdCAqL1xuXHRzdGF0aWMgZm9ybWF0TW9uZXkocHJpY2UsIGxvY2FsZSA9ICdydScpIHtcblx0XHRsZXQgblByaWNlID0gTnVtYmVyKHByaWNlKTtcblxuXHRcdGlmICghaXNOYU4oblByaWNlKSkge1xuXHRcdFx0cmV0dXJuIG5QcmljZS50b0xvY2FsZVN0cmluZyhsb2NhbGUpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gcHJpY2U7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqINCm0LXQvdCwICsg0L3QsNC70L7Qs1xuXHQgKiBAcGFyYW0gcHJpY2Vcblx0ICogQHBhcmFtIHRheFxuXHQgKiBAcGFyYW0gcHJlY2lzaW9uXG5cdCAqL1xuXHRzdGF0aWMgZ2V0UHJpY2VXaXRoVGF4KHByaWNlLCB0YXggPSAxMywgcHJlY2lzaW9uID0gMCkge1xuXHRcdGxldCBuUHJpY2UgPSBOdW1iZXIocHJpY2UpO1xuXHRcdGxldCBuVGF4ID0gTnVtYmVyKHRheCk7XG5cblx0XHRpZiAoIWlzTmFOKG5QcmljZSkgJiYgIWlzTmFOKG5UYXgpKSB7XG5cdFx0XHRsZXQgcHJpY2VXaXRoVGF4ID0gKChuUHJpY2UgKiBuVGF4IC8gMTAwKSArIG5QcmljZSk7XG5cdFx0XHRyZXR1cm4gKHByaWNlV2l0aFRheCAlIDEgPT09IDApID8gcHJpY2VXaXRoVGF4IDogcHJpY2VXaXRoVGF4LnRvRml4ZWQocHJlY2lzaW9uKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIHByaWNlO1xuXHRcdH1cblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IENUb29scztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9wYXJ0cy9DVG9vbHMuanMiLCJjb25zdCBDVG9vbHMgPSByZXF1aXJlKCcuL0NUb29scycpO1xuXG4vKipcbiAqINCa0L7QvdGC0YDQvtC70LvQtdGAINC00LvRjyDRgNCw0LHQvtGC0Ysg0YEg0L/QvtC00YDQs9GA0YPQt9C60L7QuSDQuCDQvtCx0L3QvtCy0LvQtdC90LjQtdC8INGC0LDQsdC70LjRh9C90YvRhSDQtNCw0L3QvdGL0YUg0L7QsSDQsNCy0YLQvtC80L7QsdC40LvRj9GFXG4gKiDQoi7Qui4g0L/QviDQvtC00L3QvtC5INGB0YLRgNCw0L3QuNGG0LUg0L3QtdC70YzQt9GPINC90LjRh9C10LPQviDRgdC60LDQt9Cw0YLRjCDQviDQstGB0LXQvCDQv9GA0L7QtdC60YLQtSDQsiDRhtC10LvQvtC8LCDRgtC+INC00LDQvdC90YvQuSDQutC+0L3RgtGA0L7Qu9C70LXRgFxuICog0YHQu9GD0LbQuNGCINGB0LrQvtGA0LXQtSDQtNC70Y8g0LTQtdC80L7QvdGB0YLRgNCw0YbQuNC90L3Ri9GFINGG0LXQu9C10Lkg0Lgg0LfQsNGC0L7Rh9C10L0g0L/QvtC0INGA0LDQsdC+0YLRgyDRgSDQutC+0L3QutGA0LXRgtC90YvQvNC4INC00LDQvdC90YvQvNC4INC4INC60L7QvdC60YDQtdGC0L3QudC+INGE0L7RgNC80L7QuVxuICovXG5jbGFzcyBDQ2FyYW1iYUNvbnRyb2xsZXIge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHQvL9C00LDQvdC90YvQtSDQtNC70Y8g0LfQsNCz0YDRg9C30LrQuFxuXHRcdHRoaXMubG9hZFVybCA9ICdodHRwczovL3Jhd2dpdC5jb20vVmFyaW5ldHovZTZjYmFkZWM5NzJlNzZhMzQwYzQxYTY1ZmNjMmE2YjMvcmF3LzkwMTkxODI2YTNiYWMyZmYwNzYxMDQwZWQxZDk1YzU5ZjE0ZWFmMjYvZnJvbnRlbmRfdGVzdF90YWJsZS5qc29uJztcblxuXHRcdC8qKlxuXHRcdCAqINCb0L7QutCw0LvQuNC30LDRhtC40Y8uINCSINC/0LXRgNGB0L/QtdC60YLQuNCy0LDRhSDRgNCw0LLQt9C40YLQuNGPINGN0YLQviDRgdC70LXQtNGD0LXRgiDQstGL0L3QvtGB0LjRgtGMINCyINC+0YLQtNC10LvRjNC90YvQuSBqc29uLdGE0LDQudC7LFxuXHRcdCAqINC70LjQsdC+INC60LDQui3RgtC+INC/0YDQvtCx0YDQsNGB0YvQstCw0YLRjCDQuNC3INCx0LDQt9GLLlxuXHRcdCAqIEB0eXBlIHt7cnU6IHtzdGF0dXM6IHtwZW5kaW5nOiBzdHJpbmcsIG91dF9vZl9zdG9jazogc3RyaW5nLCBpbl9zdG9jazogc3RyaW5nfSwgcmVtb3ZlQnV0dG9uVGV4dDogc3RyaW5nfSwgZW46IHt9fX1cblx0XHQgKi9cblx0XHR0aGlzLnRleHQgPSB7XG5cdFx0XHRydToge1xuXHRcdFx0XHQnc3RhdHVzLS1wZW5kaW5nJzogJ9Ce0LbQuNC00LDQtdGC0YHRjycsXG5cdFx0XHRcdCdzdGF0dXMtLW91dF9vZl9zdG9jayc6ICfQndC10YIg0LIg0L3QsNC70LjRh9C40LgnLFxuXHRcdFx0XHQnc3RhdHVzLS1pbl9zdG9jayc6ICfQkiDQvdCw0LvQuNGH0LjQuCcsXG5cdFx0XHRcdCdlcnJvci0tbG9hZF9lcnJvcic6ICfQntGI0LjQsdC60LAg0LfQsNCz0YDRg9C30LrQuCDQtNCw0L3QvdGL0YUnLFxuXHRcdFx0XHQnZXJyb3ItLWVtcHR5X2RhdGEnOiAn0J3QtdGCINC00LDQvdC90YvRhSDQtNC70Y8g0L7RgtC+0LHRgNCw0LbQtdC90LjRjycsXG5cdFx0XHRcdHJlbW92ZV9idXR0b25fdGV4dDogJ9Cj0LTQsNC70LjRgtGMJyxcblx0XHRcdFx0Y3VycmVuY3k6ICfRgNGD0LEuJ1xuXHRcdFx0fSxcblx0XHRcdGVuOiB7XG5cblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0Ly/Qu9C+0LrQsNC70Yxcblx0XHR0aGlzLmxvY2FsZSA9ICdydSc7XG5cdFx0Ly/Qt9C90LDRh9C10L3QuNC1INC90LDQu9C+0LPQvtCy0L7QuSDRgdGC0LDQstC60Lgg0L/Qvi3Rg9C80L7Qu9GH0LDQvdC40Y5cblx0XHR0aGlzLnRheCA9IDEzO1xuXG5cdFx0LyoqXG5cdFx0ICog0J/QvtC70YPRh9C10L3QuNC1INGC0LXQutGB0YLQsCDQv9C+INC60L7QtNGDLiDQm9C+0LrQsNC70Ywg0L/QtdGA0LXQtNCw0L3QsCDRh9C10YDQtdC3INC60LDRgNGA0LjRgNC+0LLQsNC90LjQtVxuXHRcdCAqL1xuXHRcdHRoaXMuZ2V0VGV4dCA9IHRoaXMuZ2V0VGV4dEJ5TG9jYWxlKHRoaXMubG9jYWxlKTtcblxuXHRcdC8qKlxuXHRcdCAqINCf0L7Rh9C10LzRgyDQuNC80LXQvdC90L4g0YLQsNC60L7QtSDRgNC10YjQtdC90LjQtT9cblx0XHQgKiDQmNC30L3QsNGH0LDQu9GM0L3QviDRgyDQvNC10L3RjyDQsdGL0LvQsCDQuNC00LXRjyDRhdGA0LDQvdC40YLRjCDRjdGC0L4g0LIg0LLQuNC00LUganNvbi3QtNC10YDQtdCy0LAg0L/QviDRgtC40L/RgyB4bWwsINC+0LTQvdCw0LrQviDRjdGC0L4g0YPRgdC70L7QttC90Y/QtdGCXG5cdFx0ICog0YPRgdC70L7QttC90Y/QtdGCINGH0LjRgtCw0LXQvNC+0YHRgtGMINGA0LDQt9C80LXRgtC60LguINCSINC/0LXRgNGB0L/QtdC60YLQuNCy0LDRhSDRgNCw0LfQstC40YLQuNGPINGN0YLQviDQvNC+0LbQvdC+INCy0YvQvdC10YHRgtC4INCyINCy0LjQtNC1XG5cdFx0ICog0YLQsNC60L7Qs9C+INC20LUg0L7QsdGK0LXQutGC0LAg0LIg0L7QtNC90LXQu9GM0L3RiyBqc29uLdGB0L3QuNC/0L/QtdGCINC4INC/0L7QtNCz0YDRg9C20LDRgtGMINCw0YHQuNC90YXRgNC+0L3QvdC+LCDQvdCw0L/RgNC40LzQtdGALiDQndC+INCyINGA0LDQvNC60LDRhSDQtNCw0L3QvdC+0LPQvlxuXHRcdCAqINC30LDQtNCw0L3QuNGPINC4INC/0YDQuCDQvdC10LjQt9Cy0LXRgdGC0L3QvtC5INCw0YDRhdC40YLQtdC60YLRg9GA0LUg0L/RgNC+0YfQuNGFINGH0LDRgdGC0LXQuSDQv9GA0L7QtNGD0LrRgtCwLCDRjyDRgNC10YjQuNC7INC90LUg0YPRgdC70L7QttC90Y/RgtGMINGN0YLQviDQtNC+INGC0LDQutC+0Lkg0YHRgtC10L/QtdC90LguXG5cdFx0ICogc2NhZmZvbGQgLSDRgdC60LXQu9C10YIg0YDQsNC30LzQtdGC0LrQuC4g0KLQsNC60LbQtSDQsiDQvdC10Lwg0L/RgNC40YHRg9GC0YHRgtCy0YPRjtGCINC+0L/RhtC40L7QvdCw0LvRjNC90YvQtSDRh9Cw0YHRgtC4LCDQutC+0YLQvtGA0YvQtSDQvtC/0LjRgdCw0L3QuNC1INCyIG9wdGlvbmFsXG5cdFx0ICogQHR5cGUge3tzY2FmZm9sZDogc3RyaW5nLCBvcHRpb25hbDoge2Rlc2NyaXB0aW9uOiBzdHJpbmcsIGNvbG9yQm94OiBzdHJpbmd9fX1cblx0XHQgKi9cblx0XHR0aGlzLm1hcmt1cFRlbXBsYXRlID0ge1xuXHRcdFx0c2NhZmZvbGQ6IGBcblx0XHRcdFx0PGRpdiBjbGFzcz1cImItY3VzdG9tLXRhYmxlX19yb3dcIiBkYXRhLXJvdy1pZD1cInt7aWR9fVwiPlxuXHRcdFx0XHQgIDxkaXYgY2xhc3M9XCJiLWN1c3RvbS10YWJsZV9fY2VsbCBiLWN1c3RvbS10YWJsZV9fY2VsbC0tdGl0bGVcIj5cblx0XHRcdFx0ICAgIDxkaXYgY2xhc3M9XCJ0aXRsZVwiPnt7dGl0bGV9fTwvZGl2PlxuXHRcdFx0XHQgICAge3tvcHRpb25hbERlc2NyaXB0aW9ufX1cblx0XHRcdFx0ICA8L2Rpdj5cblx0XHRcdFx0ICA8ZGl2IGNsYXNzPVwiYi1jdXN0b20tdGFibGVfX2NlbGwgYi1jdXN0b20tdGFibGVfX2NlbGwtLXllYXJcIj57e3llYXJ9fTwvZGl2PlxuXHRcdFx0XHQgIDxkaXYgY2xhc3M9XCJiLWN1c3RvbS10YWJsZV9fY2VsbCBiLWN1c3RvbS10YWJsZV9fY2VsbC0tY29sb3JcIj5cblx0XHRcdFx0ICAgIHt7b3B0aW9uYWxDb2xvcmJveH19XG5cdFx0XHRcdCAgPC9kaXY+XG5cdFx0XHRcdCAgPGRpdiBjbGFzcz1cImItY3VzdG9tLXRhYmxlX19jZWxsIGItY3VzdG9tLXRhYmxlX19jZWxsLS1zdGF0dXNcIj57e3N0YXR1c319PC9kaXY+XG5cdFx0XHRcdCAgPGRpdiBjbGFzcz1cImItY3VzdG9tLXRhYmxlX19jZWxsIGItY3VzdG9tLXRhYmxlX19jZWxsLS1wcmljZVwiPlxuXHRcdFx0XHQgICAgPG5vYnIgY2xhc3M9XCJwcmljZSBqcy1wcmljZVwiIGRhdGEtb3JpZ2luYWwtcHJpY2U9XCJ7e3ByaWNlfX1cIj57e2Zvcm1hdHRlZFByaWNlfX08L25vYnI+XG5cdFx0XHRcdCAgICA8bm9iciBjbGFzcz1cInByaWNlLXdpdGgtdGF4IGpzLXByaWNlLXdpdGgtdGF4XCIgZGF0YS1vcmlnaW5hbC1wcmljZS13aXRoLXRheD1cInt7cHJpY2VXaXRoVGF4fX1cIj57e2Zvcm1hdHRlZFByaWNlV2l0aFRheH19ICgrMTMlKTwvbm9icj5cblx0XHRcdFx0ICA8L2Rpdj5cblx0XHRcdFx0ICA8ZGl2IGNsYXNzPVwiYi1jdXN0b20tdGFibGVfX2NlbGwgYi1jdXN0b20tdGFibGVfX2NlbGwtLWFjdGlvblwiPlxuXHRcdFx0XHQgICAgPGJ1dHRvbiBjbGFzcz1cImktYnV0dG9uIGktYnV0dG9uLS1lbGxpcHNlIGktYnV0dG9uLS1zaXplLXNtYWxsIGpzLWRlbGV0ZS10cmlnZ2VyXCI+e3tyZW1vdmVCdXR0b25UZXh0fX08L2J1dHRvbj5cblx0XHRcdFx0ICA8L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRgLFxuXHRcdFx0b3B0aW9uYWw6IHtcblx0XHRcdFx0ZGVzY3JpcHRpb246IGA8ZGl2IGNsYXNzPVwiZGVzY3JpcHRpb25cIj57e2Rlc2NyaXB0aW9ufX08L2Rpdj5gLFxuXHRcdFx0XHRjb2xvckJveDogYDxkaXYgY2xhc3M9XCJpLWNvbG9yLWJveFwiIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjoge3tjb2xvckNvZGV9fVwiPjwvZGl2PmAsXG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHRoaXMuJHRhYmxlV3JhcHBlciA9IG51bGw7XG5cdH1cblxuXHQvKipcblx0ICog0JjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y8g0LvQvtCz0LjQutC4INGA0LDQsdC+0YLRiyDQutC+0L3RgtGA0L7Qu9C70LXRgNCwXG5cdCAqL1xuXHRpbml0KCkge1xuXHRcdC8v0YLQsNCx0LvQuNGG0LBcblx0XHR0aGlzLiR0YWJsZVdyYXBwZXIgPSAkKCcjY2FyYW1iYS10YWJsZScpO1xuXHRcdC8v0YTQvtGA0LzQsFxuXHRcdHRoaXMuJGZvcm0gPSAkKCcjY2FyYW1iYS1mb3JtJyk7XG5cblx0XHRpZiAodGhpcy4kdGFibGVXcmFwcGVyLmxlbmd0aCAmJiB0aGlzLiRmb3JtLmxlbmd0aCkge1xuXHRcdFx0Ly/RgtC10LvQviDRgtCw0LHQu9C40YbRi1xuXHRcdFx0dGhpcy4kdGFibGVSb3dDb250YWluZXIgPSB0aGlzLiR0YWJsZVdyYXBwZXIuZmluZCgnLmpzLWJvZHknKTtcblx0XHRcdC8v0LHQu9C+0Log0LTQu9GPINGD0LLQtdC00L7QvNC70LXQvdC40Llcblx0XHRcdHRoaXMuJHRhYmxlTm90eSA9IHRoaXMuJHRhYmxlV3JhcHBlci5maW5kKCcuanMtbm90eScpO1xuXHRcdFx0Ly/QuNGC0L7Qs9C+0LLQsNGPINGG0LXQvdCwXG5cdFx0XHR0aGlzLiR0YWJsZVN1bW1hcnlQcmljZSA9IHRoaXMuJHRhYmxlV3JhcHBlci5maW5kKCcuanMtc3VtbWFyeS1wcmljZScpO1xuXG5cdFx0XHQvL9GC0YDQuNCz0LPQtdGAINC00LvRjyDRg9C00LDQu9C10L3QuNGPINGB0YLRgNC+0Lpcblx0XHRcdHRoaXMuaW5pdERlbGV0ZVRyaWdnZXIoKTtcblx0XHRcdC8v0LjQvdC40YbQuNCw0LvQuNC30LDRhtC40Lgg0LvQvtCz0LjQutC4INGA0LDQsdC+0YLRiyDRgSDRhNC+0YDQvNC+0Llcblx0XHRcdHRoaXMuaW5pdEZvcm0oKTtcblxuXHRcdFx0dGhpcy5sb2NrVGFibGUoKTtcblx0XHRcdHRoaXMubG9hZERhdGEoKVxuXHRcdFx0XHQudGhlbigoZGF0YSkgPT4ge1xuXHRcdFx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxuXHRcdFx0XHRcdFx0LmRlbGF5KDEwMDApIC8v0Y3QvNGD0LvRj9GG0LjRjyDQtNC+0LvQs9C+0LPQviDQvtGC0LLQtdGC0LAg0L7RgiDRgdC10YDQstC10YDQsFxuXHRcdFx0XHRcdFx0LnRoZW4oKCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRpZiAoT2JqZWN0LmtleXMoZGF0YSkubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHRcdFx0Ly/QvtCx0L3QvtCy0LvQtdC90LjQtSDQtNCw0L3QvdGL0YUg0LIg0YLQsNCx0LvQuNGG0Lpcblx0XHRcdFx0XHRcdFx0XHR0aGlzLnVwZGF0ZVRhYmxlV2l0aERhdGEoZGF0YSk7XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5zaG93VGFibGVOb3RpZmljYXRpb24odGhpcy5nZXRUZXh0KCdlcnJvci0tZW1wdHlfZGF0YScpKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0pXG5cdFx0XHRcdC50aGVuKCgpID0+IHtcblx0XHRcdFx0XHR0aGlzLnVubG9ja1RhYmxlKCk7XG5cdFx0XHRcdH0pXG5cdFx0XHRcdC5jYXRjaCgobXNnKSA9PiB7XG5cdFx0XHRcdFx0Ly9UT0RPINC+0LHRgNCw0LHQvtGC0LrQsCDQvtGI0LjQsdC+0Lpcblx0XHRcdFx0XHR0aGlzLnNob3dUYWJsZU5vdGlmaWNhdGlvbih0aGlzLmdldFRleHQoJ2Vycm9yLS1sb2FkX2Vycm9yJykpO1xuXHRcdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICog0JjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y8g0YDQsNCx0L7RgtGLINGBINGE0L7RgNC80L7QuVxuXHQgKi9cblx0aW5pdEZvcm0oKSB7XG5cdFx0dGhpcy4kZm9ybS5wYXJzbGV5KClcblx0XHRcdC5vbignZm9ybTpzdWJtaXQnLCAoZm9ybSkgPT4ge1xuXHRcdFx0XHRsZXQgZGF0YSA9IHt9O1xuXG5cdFx0XHRcdGlmICh0aGlzLmlzVGFibGVMb2NrKCkpIHtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aGlzLmxvY2tUYWJsZSgpO1xuXG5cdFx0XHRcdC8v0L7QsdGF0L7QtNC40Lwg0LLRgdC1INC/0L7Qu9GPINGE0L7RgNC80Ysg0Lgg0YHQvtCx0LjRgNCw0LXQvCDQtNCw0L3QvdGL0LVcblx0XHRcdFx0Zm9yIChsZXQgZmllbGQgaW4gZm9ybS5maWVsZHMpIHtcblx0XHRcdFx0XHRpZiAoZm9ybS5maWVsZHMuaGFzT3duUHJvcGVydHkoZmllbGQpKSB7XG5cdFx0XHRcdFx0XHRsZXQgZmllbGROYW1lID0gZm9ybS5maWVsZHNbZmllbGRdLiRlbGVtZW50LmF0dHIoJ2RhdGEtZmllbGQtdHlwZScpO1xuXHRcdFx0XHRcdFx0bGV0IHZhbHVlID0gZm9ybS5maWVsZHNbZmllbGRdLmdldFZhbHVlKCk7XG5cblx0XHRcdFx0XHRcdGlmIChmaWVsZE5hbWUgPT0gJ3ByaWNlJykge1xuXHRcdFx0XHRcdFx0XHRkYXRhW2ZpZWxkTmFtZV0gPSB2YWx1ZS5yZXBsYWNlKC9cXHMvLCAnJykucmVwbGFjZSgvLC8sJy4nKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdGRhdGFbZmllbGROYW1lXSA9IHZhbHVlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8v0L/QvtC70YPRh9Cw0LXQvCDRg9GB0LvQvtCy0L3QviDRg9C90LjQutCw0LvRjNC90YvQuSBJRCDQtNC70Y8g0L3QvtCy0L7Qs9C+INGN0LvQtdC80LXQvdGC0LBcblx0XHRcdFx0ZGF0YS5pZCA9IHRoaXMuZ2VuZXJhdGVVbmlxUm93SUQoKTtcblxuXHRcdFx0XHRsZXQgcHJlcGFyZWREYXRhID0gW107XG5cdFx0XHRcdHByZXBhcmVkRGF0YS5wdXNoKGRhdGEpO1xuXG5cdFx0XHRcdC8v0LTQvtCx0LDQstC70Y/QtdC8INGN0LvQtdC80LXQvdGC0LIg0LIg0LvQvtC60LDQu9GM0L3QvtC1INGF0YDQsNC90LjQu9C40YnQtdGGXG5cdFx0XHRcdHRoaXMuYWRkUm93VG9Mb2NhbFN0b3JhZ2UoZGF0YSk7XG5cblx0XHRcdFx0Ly/QvtCx0L3QvtCy0LvQtdC90LjQtVxuXHRcdFx0XHR0aGlzLnVwZGF0ZVRhYmxlV2l0aERhdGEocHJlcGFyZWREYXRhLCB0cnVlKTtcblxuXHRcdFx0XHR0aGlzLnJlc2V0Rm9ybShmb3JtKTtcblxuXHRcdFx0XHR0aGlzLnVubG9ja1RhYmxlKCk7XG5cblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fSk7XG5cdH1cblxuXHQvKipcblx0ICog0KHQsdGA0L7RgdC40YLRjCDQv9C+0LvRjyDQsiDRhNC+0YDQvNC1XG5cdCAqIEBwYXJhbSBwYXJzbGV5Rm9ybVxuXHQgKi9cblx0cmVzZXRGb3JtKHBhcnNsZXlGb3JtKSB7XG5cdFx0bGV0ICRmb3JtID0gJChwYXJzbGV5Rm9ybS4kZWxlbWVudCk7XG5cdFx0bGV0ICRjdXN0b21TZWxlY3RzID0gJGZvcm0uZmluZCgnW2RhdGEtaXMtY3VzdG9tLXNlbGVjdF0nKTtcblxuXHRcdC8v0YHQsdGA0LDRgdGL0LLQsNC10Lwg0LfQvdCw0YfQtdC90LjRjyDRhNC+0YDQvFxuXHRcdHBhcnNsZXlGb3JtLiRlbGVtZW50WzBdLnJlc2V0KCk7XG5cdFx0JGZvcm0ucGFyc2xleSgpLnJlc2V0KCk7XG5cblx0XHQvL9C+0LHRhdC+0LTQuNC8INCy0YHQtSDQv9C+0LvRjyDRhNC+0YDQvNGLINC4INGB0LHRgNCw0YHRi9Cy0LDQtdC8INC30LDQv9C+0LvQvdC10L3QvdC+0YHRgtGMINC/0L7Qu9C10Llcblx0XHRmb3IgKGxldCBmaWVsZCBpbiBwYXJzbGV5Rm9ybS5maWVsZHMpIHtcblx0XHRcdGlmIChwYXJzbGV5Rm9ybS5maWVsZHMuaGFzT3duUHJvcGVydHkoZmllbGQpKSB7XG5cdFx0XHRcdHBhcnNsZXlGb3JtLmZpZWxkc1tmaWVsZF0uJGVsZW1lbnQucmVtb3ZlQ2xhc3MoJ2lzLWZpbGwnKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoJGN1c3RvbVNlbGVjdHMubGVuZ3RoKSB7XG5cdFx0XHQkLmVhY2goJGN1c3RvbVNlbGVjdHMsIChpLCBzZWxlY3QpID0+IHtcblx0XHRcdFx0JChzZWxlY3QpLnZhbCgnJykudHJpZ2dlcignY2hhbmdlJyk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXG5cdC8qKlxuXHQgKiDQmNC90LjRhtC40LDQu9C40LfQsNGG0LjRjyDQu9C+0LPQuNC60Lgg0YPQtNCw0LvQtdC90LjRjyDRgdGC0YDQvtC6INC40Lcg0YLQsNCx0LvQuNGG0Ytcblx0ICovXG5cdGluaXREZWxldGVUcmlnZ2VyKCkge1xuXHRcdHRoaXMuJHRhYmxlV3JhcHBlci5vbignY2xpY2snLCAnLmpzLWRlbGV0ZS10cmlnZ2VyJywgKGUpID0+IHtcblx0XHRcdGxldCAkdGhpcyA9ICQoZS5jdXJyZW50VGFyZ2V0KTtcblx0XHRcdGxldCAkcm93ID0gJHRoaXMuY2xvc2VzdCgnW2RhdGEtcm93LWlkXScpO1xuXG5cdFx0XHRpZiAoJHJvdy5sZW5ndGgpIHtcblx0XHRcdFx0bGV0IHJvd0lEID0gJHJvdy5hdHRyKCdkYXRhLXJvdy1pZCcpO1xuXG5cdFx0XHRcdHRoaXMubG9ja1RhYmxlKCk7XG5cblx0XHRcdFx0UHJvbWlzZS5yZXNvbHZlKClcblx0XHRcdFx0XHQuZGVsYXkoMTAwKSAvL9GH0LjRgdGC0L4g0LTQu9GPINC00LXQvNC+0L3RgdGC0YDQsNGG0LjQuCDRgNCw0LHQvtGC0Ysg0YEg0YHQtdGA0LLQtdGA0L7QvFxuXHRcdFx0XHRcdC50aGVuKCgpID0+IHtcblx0XHRcdFx0XHRcdCRyb3cucmVtb3ZlKCk7XG5cdFx0XHRcdFx0XHR0aGlzLmRlbGV0ZVJvd0Zyb21Mb2NhbFN0b3JhZ2Uocm93SUQpO1xuXHRcdFx0XHRcdFx0dGhpcy51cGRhdGVUYWJsZVZpZXdTdGF0dXMoKTtcblx0XHRcdFx0XHRcdHRoaXMudXBkYXRlU3VtbWFyeVByaWNlKCk7XG5cdFx0XHRcdFx0XHR0aGlzLnVubG9ja1RhYmxlKCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHQvKipcblx0ICog0J/QvtC00LPRgNGD0LfQutCwINC00LDQvdC90YvQuSDRgSDRg9C00LDQu9C10L3QvdC+0LPQviDQuNGB0YLQvtGH0L3QuNC60LBcblx0ICog0JHQsNCzINCyIElFMTAg0LggSUUxMSDQvdCwIFdpbmRvd3MgNyDQuCBXaW5kb3dzIDguMSBodHRwOi8vdGFrZS5tcy96QkY4alxuXHQgKiBAcmV0dXJucyB7UHJvbWlzZS48VFJlc3VsdD59XG5cdCAqL1xuXHRsb2FkRGF0YSgpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0JC5hamF4KHtcblx0XHRcdFx0dXJsOiB0aGlzLmxvYWRVcmwsXG5cdFx0XHRcdGRhdGE6IHt9LFxuXHRcdFx0XHRkYXRhVHlwZTogJ2pzb24nLFxuXHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xuXHRcdFx0XHRcdHJlc29sdmUoZGF0YSk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGVycm9yOiAoanFYSFIsIHRleHRTdGF0dXMsIGVycm9yKSA9PiB7XG5cdFx0XHRcdFx0cmVqZWN0KCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0pXG5cdFx0XHQudGhlbigoZGF0YSkgPT4ge1xuXHRcdFx0XHRsZXQgbG9jYWxEYXRhID0gdGhpcy5nZXRBbGxSb3dzRnJvbUxvY2FsU3RvcmFnZSgpO1xuXG5cdFx0XHRcdGlmIChsb2NhbERhdGEpIHtcblx0XHRcdFx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgbG9jYWxEYXRhLCBkYXRhKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZXR1cm4gZGF0YTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdH1cblxuXHQvKipcblx0ICog0JLRi9Cy0L7QtCDQtNCw0L3QvdGL0YUg0LIg0YjQsNCx0LvQvtC90L3Rg9GOINGB0YLRgNC+0LrRgyDQuCDQtNC+0LHQsNCy0LvQtdC90LjQtSDQtNCw0L3QvdGL0LXRhVxuXHQgKiBUT0RPINC00L7Qv9C+0LvQvdC40YLQtdC70YzQvdCw0Y8g0LHQtdC30L7Qv9Cw0YHQvdCw0Y8g0L7QsdGA0LDQsdC+0YLQutCwINC00LDQvdC90YvRhSDRgSDRgdC10YDQstCwXG5cdCAqIEBwYXJhbSBkYXRhXG5cdCAqIEBwYXJhbSBiQXBwZW5kIC0g0L3QtSDQvtGH0LjRidCw0YLRjCDRgdGD0YnQtdGB0YLQstGD0Y7RidC40LUg0LTQsNC90L3Ri9C1INCyINGC0LDQsdC70LjRhtC1XG5cdCAqL1xuXHR1cGRhdGVUYWJsZVdpdGhEYXRhKGRhdGEsIGJBcHBlbmQgPSBmYWxzZSkge1xuXHRcdGxldCByZXN1bHRNYXJrdXAgPSBbXTtcblxuXHRcdGZvciAobGV0IHJvdyBpbiBkYXRhKSB7XG5cdFx0XHRpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eShyb3cpKSB7XG5cdFx0XHRcdC8v0L3QtdGCINGB0LzRi9GB0LvRiyDQstGL0LLQvtC00LjRgtGMINGB0YLRgNC+0LrRgywg0LXRgdC70Lgg0L7RgtGB0YLRg9GC0YHQstGD0LXRgiBJRCDQuNC70LggVElUTEVcblx0XHRcdFx0aWYgKHR5cGVvZiBkYXRhW3Jvd10uaWQgIT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGRhdGFbcm93XS50aXRsZSAhPSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRcdGxldCByb3dNYXJrdXAgPSB0aGlzLm1hcmt1cFRlbXBsYXRlLnNjYWZmb2xkO1xuXG5cdFx0XHRcdFx0Zm9yIChsZXQgZmllbGROYW1lIGluIGRhdGFbcm93XSkge1xuXHRcdFx0XHRcdFx0aWYgKGRhdGFbcm93XS5oYXNPd25Qcm9wZXJ0eShmaWVsZE5hbWUpKSB7XG5cdFx0XHRcdFx0XHRcdGxldCB2YWx1ZSA9IGRhdGFbcm93XVtmaWVsZE5hbWVdO1xuXG5cdFx0XHRcdFx0XHRcdGlmIChmaWVsZE5hbWUgPT0gJ2lkJykge1xuXHRcdFx0XHRcdFx0XHRcdHJvd01hcmt1cCA9IHJvd01hcmt1cC5yZXBsYWNlKC97e2lkfX0vZywgdmFsdWUpO1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0aWYgKGZpZWxkTmFtZSA9PSAndGl0bGUnKSB7XG5cdFx0XHRcdFx0XHRcdFx0cm93TWFya3VwID0gcm93TWFya3VwLnJlcGxhY2UoL3t7dGl0bGV9fS9nLCB2YWx1ZSk7XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRpZiAoZmllbGROYW1lID09ICdkZXNjcmlwdGlvbicpIHtcblx0XHRcdFx0XHRcdFx0XHRyb3dNYXJrdXAgPSByb3dNYXJrdXAucmVwbGFjZSgve3tvcHRpb25hbERlc2NyaXB0aW9ufX0vZywgdGhpcy5tYXJrdXBUZW1wbGF0ZS5vcHRpb25hbC5kZXNjcmlwdGlvbik7XG5cdFx0XHRcdFx0XHRcdFx0cm93TWFya3VwID0gcm93TWFya3VwLnJlcGxhY2UoL3t7ZGVzY3JpcHRpb259fS9nLCB2YWx1ZSk7XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHQvKipcblx0XHRcdFx0XHRcdFx0ICog0KbQstC10YLQsCDQstGL0LLQvtC20YMg0L/RgNGP0LzQviDQsiDQstC40LTQtSDRgtC10LrRgdGC0LAsINC90L4g0L/Qvi3RhdC+0YDQvtGI0LXQvNGDINC90YPQttC90L4g0L7RgtC00LDQstCw0YLRjCDRhdGN0Ygg0YfQtdGA0LXQtyBBUElcblx0XHRcdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0XHRcdGlmIChmaWVsZE5hbWUgPT0gJ2NvbG9yJykge1xuXHRcdFx0XHRcdFx0XHRcdHJvd01hcmt1cCA9IHJvd01hcmt1cC5yZXBsYWNlKC97e29wdGlvbmFsQ29sb3Jib3h9fS9nLCB0aGlzLm1hcmt1cFRlbXBsYXRlLm9wdGlvbmFsLmNvbG9yQm94KTtcblx0XHRcdFx0XHRcdFx0XHRyb3dNYXJrdXAgPSByb3dNYXJrdXAucmVwbGFjZSgve3tjb2xvckNvZGV9fS9nLCB2YWx1ZSk7XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRpZiAoZmllbGROYW1lID09ICd5ZWFyJykge1xuXHRcdFx0XHRcdFx0XHRcdHJvd01hcmt1cCA9IHJvd01hcmt1cC5yZXBsYWNlKC97e3llYXJ9fS9nLCB2YWx1ZSk7XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRpZiAoZmllbGROYW1lID09ICdzdGF0dXMnKSB7XG5cdFx0XHRcdFx0XHRcdFx0Ly/QvtC/0LXRh9Cw0YLQutCwINCyINGB0YLQsNGC0YPRgdC1LCDQsiDRgtCw0LrQvtC8INCy0LjQtNC1INC/0YDQuNC70LXRgtCw0LXRgiDRgSDQkNCf0Jhcblx0XHRcdFx0XHRcdFx0XHRpZiAodmFsdWUgPT0gJ3BlZG5kaW5nJykge1xuXHRcdFx0XHRcdFx0XHRcdFx0dmFsdWUgPSAncGVuZGluZyc7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0bGV0IHN0YXR1c1RleHQgPSB0aGlzLmdldFRleHQoYHN0YXR1cy0tJHt2YWx1ZX1gKTtcblx0XHRcdFx0XHRcdFx0XHRyb3dNYXJrdXAgPSByb3dNYXJrdXAucmVwbGFjZSgve3tzdGF0dXN9fS9nLCAoc3RhdHVzVGV4dCkgPyBzdGF0dXNUZXh0IDogJy0nKTtcblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdGlmIChmaWVsZE5hbWUgPT0gJ3ByaWNlJykge1xuXHRcdFx0XHRcdFx0XHRcdGxldCBwcmljZSA9IHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJyA/IHZhbHVlLnJlcGxhY2UoL1xccy8sICcnKS5yZXBsYWNlKC8sLywnLicpIDogdmFsdWU7XG5cdFx0XHRcdFx0XHRcdFx0bGV0IHByaWNlV2l0aFRheCA9IENUb29scy5nZXRQcmljZVdpdGhUYXgocHJpY2UsIHRoaXMudGF4LCAyKTtcblx0XHRcdFx0XHRcdFx0XHRsZXQgZm9ybWF0dGVkUHJpY2UgPSBDVG9vbHMuZm9ybWF0TW9uZXkocHJpY2UsIHRoaXMubG9jYWxlKTtcblx0XHRcdFx0XHRcdFx0XHRsZXQgZm9ybWF0dGVkUHJpY2VXaXRoVGF4ID0gQ1Rvb2xzLmZvcm1hdE1vbmV5KHByaWNlV2l0aFRheCwgdGhpcy5sb2NhbGUpO1xuXG5cdFx0XHRcdFx0XHRcdFx0cm93TWFya3VwID0gcm93TWFya3VwLnJlcGxhY2UoL3t7cHJpY2V9fS9nLCBwcmljZSk7XG5cdFx0XHRcdFx0XHRcdFx0cm93TWFya3VwID0gcm93TWFya3VwLnJlcGxhY2UoL3t7Zm9ybWF0dGVkUHJpY2V9fS9nLCBgJHtmb3JtYXR0ZWRQcmljZX0gJHt0aGlzLmdldFRleHQoJ2N1cnJlbmN5Jyl9YCk7XG5cdFx0XHRcdFx0XHRcdFx0cm93TWFya3VwID0gcm93TWFya3VwLnJlcGxhY2UoL3t7cHJpY2VXaXRoVGF4fX0vZywgcHJpY2VXaXRoVGF4KTtcblx0XHRcdFx0XHRcdFx0XHRyb3dNYXJrdXAgPSByb3dNYXJrdXAucmVwbGFjZSgve3tmb3JtYXR0ZWRQcmljZVdpdGhUYXh9fS9nLCBgJHtmb3JtYXR0ZWRQcmljZVdpdGhUYXh9ICR7dGhpcy5nZXRUZXh0KCdjdXJyZW5jeScpfWApO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cm93TWFya3VwID0gcm93TWFya3VwXG5cdFx0XHRcdFx0XHQucmVwbGFjZSgve3tvcHRpb25hbERlc2NyaXB0aW9ufX0vZywgJycpXG5cdFx0XHRcdFx0XHQucmVwbGFjZSgve3tvcHRpb25hbENvbG9yYm94fX0vZywgJycpXG5cdFx0XHRcdFx0XHQucmVwbGFjZSgve3tyZW1vdmVCdXR0b25UZXh0fX0vZywgdGhpcy5nZXRUZXh0KCdyZW1vdmVfYnV0dG9uX3RleHQnKSk7XG5cblx0XHRcdFx0XHRyZXN1bHRNYXJrdXAucHVzaChyb3dNYXJrdXApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKGJBcHBlbmQpIHtcblx0XHRcdHRoaXMuJHRhYmxlUm93Q29udGFpbmVyLmFwcGVuZChyZXN1bHRNYXJrdXAuam9pbignJykpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLiR0YWJsZVJvd0NvbnRhaW5lci5odG1sKCcnKTtcblx0XHRcdHRoaXMuJHRhYmxlUm93Q29udGFpbmVyLmFwcGVuZChyZXN1bHRNYXJrdXAuam9pbignJykpO1xuXHRcdH1cblxuXHRcdHRoaXMudXBkYXRlU3VtbWFyeVByaWNlKCk7XG5cdFx0dGhpcy51cGRhdGVUYWJsZVZpZXdTdGF0dXMoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiDQntCx0L3QvtCy0LvQtdC90LjQtSDQuNGC0L7Qs9C+0LLQvtC5INGB0YPQvNC80Ysg0YLQsNCx0LvQuNGG0Ytcblx0ICovXG5cdHVwZGF0ZVN1bW1hcnlQcmljZSgpIHtcblx0XHRsZXQgc3VtbWFyeVByaWNlID0gMDtcblxuXHRcdCQuZWFjaCh0aGlzLmdldFJvd3MoKSwgKGksIHJvdykgPT4ge1xuXHRcdFx0bGV0ICRyb3cgPSAkKHJvdyk7XG5cdFx0XHRsZXQgcHJpY2UgPSAoJHJvdy5maW5kKCcuanMtcHJpY2Utd2l0aC10YXgnKS5sZW5ndGgpXG5cdFx0XHRcdD8gJHJvdy5maW5kKCcuanMtcHJpY2Utd2l0aC10YXgnKS5hdHRyKCdkYXRhLW9yaWdpbmFsLXByaWNlLXdpdGgtdGF4Jylcblx0XHRcdFx0OiAkcm93LmZpbmQoJy5qcy1wcmljZScpLmF0dHIoJ2RhdGEtb3JpZ2luYWwtcHJpY2UnKTtcblxuXHRcdFx0aWYgKHByaWNlKSB7XG5cdFx0XHRcdGlmICghaXNOYU4oc3VtbWFyeVByaWNlKSAmJiAhaXNOYU4ocHJpY2UpKSB7XG5cdFx0XHRcdFx0c3VtbWFyeVByaWNlID0gTnVtYmVyKHN1bW1hcnlQcmljZSkgKyBOdW1iZXIocHJpY2UpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHR0aGlzLiR0YWJsZVN1bW1hcnlQcmljZS5odG1sKGAke0NUb29scy5mb3JtYXRNb25leShOdW1iZXIoc3VtbWFyeVByaWNlKSwgdGhpcy5sb2NhbGUpfSAke3RoaXMuZ2V0VGV4dCgnY3VycmVuY3knKX1gKTtcblx0fVxuXG5cdC8qKlxuXHQgKiDQn9C+0LvRg9GH0LjRgtGMINCy0YHQtSDRgdGC0YDQvtC60Lgg0LjQtyDRgtCw0LHQu9C40YbRi1xuXHQgKi9cblx0Z2V0Um93cygpIHtcblx0XHRyZXR1cm4gdGhpcy4kdGFibGVSb3dDb250YWluZXIuZmluZCgnW2RhdGEtcm93LWlkXScpO1xuXHR9XG5cblx0LyoqXG5cdCAqINCU0L7QsdCw0LLQuNGC0Ywg0LTQsNC90L3Ri9C1INC+INC30LDQv9C40YHQuCDQsiBsb2NhbFN0b3JhZ2Vcblx0ICogQHBhcmFtIGRhdGFcblx0ICovXG5cdGFkZFJvd1RvTG9jYWxTdG9yYWdlKGRhdGEpIHtcblx0XHRpZiAoZGF0YSAmJiBkYXRhLmlkICYmIGxvY2FsU3RvcmFnZSkge1xuXHRcdFx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oYGF1dG9QYXJ0cy0tcm93LSR7ZGF0YS5pZH1gLCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqINCf0L7Qu9GD0YfQuNGC0Ywg0LTQsNC90L3Ri9C1INC40LcgbG9jYWxTdG9yYWdlXG5cdCAqIEByZXR1cm5zIHsqfVxuXHQgKi9cblx0Z2V0QWxsUm93c0Zyb21Mb2NhbFN0b3JhZ2UoKSB7XG5cdFx0bGV0IGRhdGEgPSB7fTtcblxuXHRcdGlmICghbG9jYWxTdG9yYWdlKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Zm9yIChsZXQga2V5IGluIGxvY2FsU3RvcmFnZSkge1xuXHRcdFx0aWYgKGxvY2FsU3RvcmFnZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdGlmIChrZXkuaW5kZXhPZignYXV0b1BhcnRzLS1yb3cnKSAhPSAtMSkge1xuXHRcdFx0XHRcdGxldCBvYmogPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSkpO1xuXHRcdFx0XHRcdGRhdGFbb2JqLmlkXSA9IG9iajtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBPYmplY3Qua2V5cyhkYXRhKS5sZW5ndGggPyBkYXRhIDogZmFsc2U7XG5cdH1cblxuXHQvKipcblx0ICog0KPQtNCw0LvQuNGC0Ywg0LTQsNC90L3Ri9C1INC40LcgbG9jYWxTdG9yYWdlXG5cdCAqIEBwYXJhbSBpZFxuXHQgKi9cblx0ZGVsZXRlUm93RnJvbUxvY2FsU3RvcmFnZShpZCkge1xuXHRcdGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgYXV0b1BhcnRzLS1yb3ctJHtpZH1gKSkge1xuXHRcdFx0bG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oYGF1dG9QYXJ0cy0tcm93LSR7aWR9YCk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqINCf0L7Qu9GD0YfQuNGC0Ywg0YLQtdC60YHRgiDQv9C+INC60L7QtNGDINC00LvRjyDQv9C10YDQtdC00LDQvdC90L7QuSDQu9C+0LrQsNC70Lhcblx0ICogQHBhcmFtIGxvY2FsZSAtINC70L7QutCw0LvRjFxuXHQgKiBAcGFyYW0gdGV4dCAtINGC0LXQutGB0YJcblx0ICogQHJldHVybnMge2Z1bmN0aW9uKCopfVxuXHQgKi9cblx0Z2V0VGV4dEJ5TG9jYWxlKGxvY2FsZSA9ICdydScsIHRleHQpIHtcblx0XHRyZXR1cm4gKHRleHQpID0+IHtcblx0XHRcdHJldHVybiAodGhpcy50ZXh0ICYmIHRoaXMudGV4dFtsb2NhbGVdICYmIHRoaXMudGV4dFtsb2NhbGVdW3RleHRdKSA/IHRoaXMudGV4dFtsb2NhbGVdW3RleHRdIDogZmFsc2U7XG5cdFx0fTtcblx0fVxuXG5cdC8qKlxuXHQgKiDQn9C+0LvRg9GH0LjRgtGMINGD0YHQu9C+0LLQvdC+INGD0L3QuNC60LDQu9GM0L3Ri9C5IGlkXG5cdCAqIEByZXR1cm5zIHtudW1iZXJ9XG5cdCAqL1xuXHRnZW5lcmF0ZVVuaXFSb3dJRCgpIHtcblx0XHRsZXQgdW5pcUlEID0gMDtcblx0XHRsZXQgZXhpc3RlZElEID0gW107XG5cblx0XHQkLmVhY2godGhpcy5nZXRSb3dzKCksIChpLCByb3cpID0+IHtcblx0XHRcdGV4aXN0ZWRJRC5wdXNoKCQocm93KS5hdHRyKCdkYXRhLXJvdy1pZCcpKTtcblx0XHR9KTtcblxuXHRcdGlmIChleGlzdGVkSUQubGVuZ3RoKSB7XG5cdFx0XHRsZXQgbWF4ID0gTWF0aC5tYXguYXBwbHkobnVsbCwgZXhpc3RlZElELm1hcChOdW1iZXIpKTtcblx0XHRcdHVuaXFJRCA9IG1heCArIDE7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHVuaXFJRDtcblx0fVxuXG5cdC8qKlxuXHQgKiDQktGL0LLQvtC00LjRgiDRgdC+0L7QsdGJ0LXQvdC40LUg0LIg0LjQvdGE0L7RgNC80LDRhtC40L7QvdC90L7QvCDRgtCw0LHQu9C40YfQvdC+0Lwg0LHQu9C+0LrQtVxuXHQgKiBAcGFyYW0gbXNnXG5cdCAqL1xuXHRzaG93VGFibGVOb3RpZmljYXRpb24obXNnID0gJycpIHtcblx0XHRpZiAobXNnKSB7XG5cdFx0XHR0aGlzLiR0YWJsZU5vdHkuaHRtbChtc2cpO1xuXHRcdFx0dGhpcy4kdGFibGVXcmFwcGVyLmFkZENsYXNzKCdpcy1ub3R5Jyk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqINCf0YDQvtCy0LXRgNGP0LXRgiwg0LXRgdGC0Ywg0LvQuCDQsiDRgtCw0LHQu9C40YbQtSDQtNCw0L3QvdGL0LUg0LTQu9GPINC/0L7QutCw0LfQsC4g0JXRgdC70Lgg0L3QtdGCIC0g0LLRi9Cy0L7QtNC40YIg0YPQstC10LTQvtC80LvQtdC90LjQtVxuXHQgKi9cblx0dXBkYXRlVGFibGVWaWV3U3RhdHVzKCkge1xuXHRcdGlmICh0aGlzLmlzTm9Sb3dzKCkpIHtcblx0XHRcdHRoaXMuc2hvd1RhYmxlTm90aWZpY2F0aW9uKHRoaXMuZ2V0VGV4dCgnZXJyb3ItLWVtcHR5X2RhdGEnKSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuJHRhYmxlV3JhcHBlci5yZW1vdmVDbGFzcygnaXMtbm90eScpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiDQn9GA0L7QstC10YDRj9C10YIsINC/0YPRgdGC0LAg0LjQuyDRgtCw0LHQu9C40YbQsFxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn1cblx0ICovXG5cdGlzTm9Sb3dzKCkge1xuXHRcdHJldHVybiB0aGlzLmdldFJvd3MoKS5sZW5ndGggPT0gMDtcblx0fVxuXG5cdC8qKlxuXHQgKiDQkdC70L7QutC40YDQvtCy0LrQsCDRgtCw0LHQu9C40YbRi1xuXHQgKi9cblx0bG9ja1RhYmxlKCkge1xuXHRcdHRoaXMuJHRhYmxlV3JhcHBlci5hZGRDbGFzcygnaXMtcHJlbG9hZGluZycpO1xuXHR9XG5cblx0LyoqXG5cdCAqINCg0LDQt9Cx0LvQvtC60LjRgNC+0LLQutCwINGC0LDQsdC70LjRhtGLXG5cdCAqL1xuXHR1bmxvY2tUYWJsZSgpIHtcblx0XHR0aGlzLiR0YWJsZVdyYXBwZXIucmVtb3ZlQ2xhc3MoJ2lzLXByZWxvYWRpbmcnKTtcblx0fVxuXG5cdC8qKlxuXHQgKiDQotCw0LHQu9C40YbQsCDQt9Cw0LHQu9C+0LrQuNGA0L7QstCw0L3QsD9cblx0ICovXG5cdGlzVGFibGVMb2NrKCkge1xuXHRcdHJldHVybiB0aGlzLiR0YWJsZVdyYXBwZXIuaGFzQ2xhc3MoJ2lzLXByZWxvYWRpbmcnKTtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IENDYXJhbWJhQ29udHJvbGxlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9wYXJ0cy9DQ2FyYW1iYS5qcyJdLCJzb3VyY2VSb290IjoiIn0=