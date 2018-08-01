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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcGFydHMvQ1Rvb2xzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9wYXJ0cy9DQ2FyYW1iYS5qcyJdLCJuYW1lcyI6WyJDQ2FyYW1iYUNvbnRyb2xsZXIiLCJyZXF1aXJlIiwiQ1Rvb2xzIiwiUHJvbWlzZSIsImNvbmZpZyIsIndhcm5pbmdzIiwibG9uZ1N0YWNrVHJhY2VzIiwiY2FuY2VsbGF0aW9uIiwibW9uaXRvcmluZyIsInByb2R1Y3Rpb24iLCJDQXBwQ29udHJvbGxlciIsImNDYXJhbWJhQ29udHJvbGxlciIsImNUb29scyIsInJlc29sdmUiLCJ0aGVuIiwiaW5pdFNtYXJ0TGFiZWxzIiwiaW5pdEN1c3RvbVNlbGVjdHMiLCJpbml0TWFza3MiLCJpbml0Q3VzdG9tRm9ybVZhbGlkYXRvcnMiLCJpbml0IiwiJHNtYXJ0TGFiZWxzIiwiJCIsImxlbmd0aCIsIm9uIiwiJHRoaXMiLCJ0b2dnbGVDbGFzcyIsInZhbCIsImJsdXIiLCIkc2VsZWN0cyIsInNlbGVjdDIiLCJ3aW5kb3ciLCJQYXJzbGV5IiwiYWRkVmFsaWRhdG9yIiwidmFsaWRhdGVTdHJpbmciLCJ2YWx1ZSIsIk51bWJlciIsIkRhdGUiLCJnZXRGdWxsWWVhciIsIm1lc3NhZ2VzIiwicnUiLCIkeWVhck1hc2siLCIkbW9uZXlNYXNrIiwibWFzayIsIm1hc2tNb25leSIsInRob3VzYW5kcyIsImRlY2ltYWwiLCJhbGxvd05vRGVjaW1hbCIsImNBcHBDb250cm9sbGVyIiwiZG9jdW1lbnQiLCJyZWFkeSIsImdsb2JhbCIsIkFDIiwib2JqZWN0IiwiSlNPTiIsInBhcnNlIiwic3RyaW5naWZ5IiwicHJpY2UiLCJsb2NhbGUiLCJuUHJpY2UiLCJpc05hTiIsInRvTG9jYWxlU3RyaW5nIiwidGF4IiwicHJlY2lzaW9uIiwiblRheCIsInByaWNlV2l0aFRheCIsInRvRml4ZWQiLCJtb2R1bGUiLCJleHBvcnRzIiwibG9hZFVybCIsInRleHQiLCJyZW1vdmVfYnV0dG9uX3RleHQiLCJjdXJyZW5jeSIsImVuIiwiZ2V0VGV4dCIsImdldFRleHRCeUxvY2FsZSIsIm1hcmt1cFRlbXBsYXRlIiwic2NhZmZvbGQiLCJvcHRpb25hbCIsImRlc2NyaXB0aW9uIiwiY29sb3JCb3giLCIkdGFibGVXcmFwcGVyIiwiJGZvcm0iLCIkdGFibGVSb3dDb250YWluZXIiLCJmaW5kIiwiJHRhYmxlTm90eSIsIiR0YWJsZVN1bW1hcnlQcmljZSIsImluaXREZWxldGVUcmlnZ2VyIiwiaW5pdEZvcm0iLCJsb2NrVGFibGUiLCJsb2FkRGF0YSIsImRhdGEiLCJkZWxheSIsIk9iamVjdCIsImtleXMiLCJ1cGRhdGVUYWJsZVdpdGhEYXRhIiwic2hvd1RhYmxlTm90aWZpY2F0aW9uIiwidW5sb2NrVGFibGUiLCJjYXRjaCIsIm1zZyIsInBhcnNsZXkiLCJmb3JtIiwiaXNUYWJsZUxvY2siLCJmaWVsZCIsImZpZWxkcyIsImhhc093blByb3BlcnR5IiwiZmllbGROYW1lIiwiJGVsZW1lbnQiLCJhdHRyIiwiZ2V0VmFsdWUiLCJyZXBsYWNlIiwiaWQiLCJnZW5lcmF0ZVVuaXFSb3dJRCIsInByZXBhcmVkRGF0YSIsInB1c2giLCJhZGRSb3dUb0xvY2FsU3RvcmFnZSIsInJlc2V0Rm9ybSIsInBhcnNsZXlGb3JtIiwiJGN1c3RvbVNlbGVjdHMiLCJyZXNldCIsInJlbW92ZUNsYXNzIiwiZWFjaCIsImkiLCJzZWxlY3QiLCJ0cmlnZ2VyIiwiZSIsImN1cnJlbnRUYXJnZXQiLCIkcm93IiwiY2xvc2VzdCIsInJvd0lEIiwicmVtb3ZlIiwiZGVsZXRlUm93RnJvbUxvY2FsU3RvcmFnZSIsInVwZGF0ZVRhYmxlVmlld1N0YXR1cyIsInVwZGF0ZVN1bW1hcnlQcmljZSIsInJlamVjdCIsImFqYXgiLCJ1cmwiLCJkYXRhVHlwZSIsInN1Y2Nlc3MiLCJlcnJvciIsImpxWEhSIiwidGV4dFN0YXR1cyIsImxvY2FsRGF0YSIsImdldEFsbFJvd3NGcm9tTG9jYWxTdG9yYWdlIiwiYXNzaWduIiwiYkFwcGVuZCIsInJlc3VsdE1hcmt1cCIsInJvdyIsInRpdGxlIiwicm93TWFya3VwIiwic3RhdHVzVGV4dCIsImdldFByaWNlV2l0aFRheCIsImZvcm1hdHRlZFByaWNlIiwiZm9ybWF0TW9uZXkiLCJmb3JtYXR0ZWRQcmljZVdpdGhUYXgiLCJhcHBlbmQiLCJqb2luIiwiaHRtbCIsInN1bW1hcnlQcmljZSIsImdldFJvd3MiLCJsb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIiwia2V5IiwiaW5kZXhPZiIsIm9iaiIsImdldEl0ZW0iLCJyZW1vdmVJdGVtIiwidW5pcUlEIiwiZXhpc3RlZElEIiwibWF4IiwiTWF0aCIsImFwcGx5IiwibWFwIiwiYWRkQ2xhc3MiLCJpc05vUm93cyIsImhhc0NsYXNzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQU1BLHFCQUFxQixtQkFBQUMsQ0FBUSx5QkFBUixDQUEzQjtBQUNBLElBQU1DLFNBQVMsbUJBQUFELENBQVEsdUJBQVIsQ0FBZjs7QUFFQUUsUUFBUUMsTUFBUixDQUFlO0FBQ2Q7QUFDQUMsV0FBVSxDQUFDLEtBRkc7QUFHZDtBQUNBQyxrQkFBaUIsQ0FBQyxLQUpKO0FBS2Q7QUFDQUMsZUFBYyxDQUFDLEtBTkQ7QUFPZDtBQUNBQyxhQUFZLENBQUMsS0FBQUM7QUFSQyxDQUFmOztBQVdBOzs7O0lBR01DLGM7QUFDTCwyQkFBYztBQUFBOztBQUNiLE9BQUtDLGtCQUFMLEdBQTBCLElBQUlYLGtCQUFKLEVBQTFCO0FBQ0EsT0FBS1ksTUFBTCxHQUFjLElBQUlWLE1BQUosRUFBZDtBQUNBOzs7O3lCQUVNO0FBQUE7O0FBQ04sVUFBT0MsUUFBUVUsT0FBUixHQUNMQyxJQURLLENBQ0EsWUFBTTs7QUFFWCxVQUFLQyxlQUFMO0FBQ0EsVUFBS0MsaUJBQUw7QUFDQSxVQUFLQyxTQUFMO0FBQ0EsVUFBS0Msd0JBQUw7O0FBRUEsVUFBS1Asa0JBQUwsQ0FBd0JRLElBQXhCO0FBQ0EsSUFUSyxDQUFQO0FB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Ozs7OzswQ0FHd0I7QUFDdkIsT0FBSSxLQUFLQyxRQUFMLEVBQUosRUFBcUI7QUFDcEIsU0FBSzlFLHFCQUFMLENBQTJCLEtBQUt0QixPQUFMLENBQWEsbUJBQWIsQ0FBM0I7QUFDQSxJQUZELE1BRU87QUFDTixTQUFLTyxhQUFMLENBQW1CdUMsV0FBbkIsQ0FBK0IsU0FBL0I7QUFDQTtBQUNEOztBQUVEOzs7Ozs7OzZCQUlXO0FBQ1YsVUFBTyxLQUFLdUMsT0FBTCxHQUFleEksTUFBZixJQUF5QixDQUFoQztBQUNBOztBQUVEOzs7Ozs7OEJBR1k7QUFDWCxRQUFLMEQsYUFBTCxDQUFtQjRGLFFBQW5CLENBQTRCLGVBQTVCO0FBQ0E7O0FBRUQ7Ozs7OztnQ0FHYztBQUNiLFFBQUs1RixhQUFMLENBQW1CdUMsV0FBbkIsQ0FBK0IsZUFBL0I7QUFDQTs7QUFFRDs7Ozs7O2dDQUdjO0FBQ2IsVUFBTyxLQUFLdkMsYUFBTCxDQUFtQjhGLFFBQW5CLENBQTRCLGVBQTVCLENBQVA7QUFDQTs7Ozs7O0FBR0Y1RyxPQUFPQyxPQUFQLEdBQWlCbkUsa0JBQWpCLEMiLCJmaWxlIjoibWFpbi5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBDQ2FyYW1iYUNvbnRyb2xsZXIgPSByZXF1aXJlKCcuL3BhcnRzL0NDYXJhbWJhJyk7XG5jb25zdCBDVG9vbHMgPSByZXF1aXJlKCcuL3BhcnRzL0NUb29scycpO1xuXG5Qcm9taXNlLmNvbmZpZyh7XG5cdC8vIEVuYWJsZSB3YXJuaW5nc1xuXHR3YXJuaW5nczogIXByb2R1Y3Rpb24sXG5cdC8vIEVuYWJsZSBsb25nIHN0YWNrIHRyYWNlc1xuXHRsb25nU3RhY2tUcmFjZXM6ICFwcm9kdWN0aW9uLFxuXHQvLyBFbmFibGUgY2FuY2VsbGF0aW9uXG5cdGNhbmNlbGxhdGlvbjogIXByb2R1Y3Rpb24sXG5cdC8vIEVuYWJsZSBtb25pdG9yaW5nXG5cdG1vbml0b3Jpbmc6ICFwcm9kdWN0aW9uXG59KTtcblxuLyoqXG4gKiDQk9C70LDQstC90YvQuSDQutC+0L3RgtGA0L7Qu9C70LXRgFxuICovXG5jbGFzcyBDQXBwQ29udHJvbGxlciB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXMuY0NhcmFtYmFDb250cm9sbGVyID0gbmV3IENDYXJhbWJhQ29udHJvbGxlcigpO1xuXHRcdHRoaXMuY1Rvb2xzID0gbmV3IENUb29scygpO1xuXHR9XG5cblx0aW5pdCgpIHtcblx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcblx0XHRcdC50aGVuKCgpID0+IHtcblxuXHRcdFx0XHR0aGlzLmluaXRTbWFydExhYmVscygpO1xuXHRcdFx0XHR0aGlzLmluaXRDdXN0b21TZWxlY3RzKCk7XG5cdFx0XHRcdHRoaXMuaW5pdE1hc2tzKCk7XG5cdFx0XHRcdHRoaXMuaW5pdEN1c3RvbUZvcm1WYWxpZGF0b3JzKCk7XG5cblx0XHRcdFx0dGhpcy5jQ2FyYW1iYUNvbnRyb2xsZXIuaW5pdCgpO1xuXHRcdFx0fSk7XG5cdH1cblxuXHQvKipcblx0ICog0JjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y8g0YPQvNC90YvRhSDQv9C70LXQudGB0YXQvtC70LTQtdGA0L7QslxuXHQgKi9cblx0aW5pdFNtYXJ0TGFiZWxzKCkge1xuXHRcdGNvbnN0ICRzbWFydExhYmVscyA9ICQoJy5qcy1zbWFydC1sYWJlbC0taW5wdXQnKTtcblxuXHRcdGlmICgkc21hcnRMYWJlbHMubGVuZ3RoKSB7XG5cdFx0XHQkc21hcnRMYWJlbHMub24oJ2JsdXInLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdGxldCAkdGhpcyA9ICQodGhpcyk7XG5cblx0XHRcdFx0JHRoaXMudG9nZ2xlQ2xhc3MoJ2lzLWZpbGwnLCAkdGhpcy52YWwoKSAhPT0gJycpO1xuXHRcdFx0fSkuYmx1cigpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiDQmNC90LjRhtC40LDQu9C40LfQsNGG0LjRjyDQutCw0YHRgtC+0LzQvdGL0YUg0YHQtdC70LXQutGC0L7QslxuXHQgKi9cblx0aW5pdEN1c3RvbVNlbGVjdHMoKSB7XG5cdFx0Y29uc3QgJHNlbGVjdHMgPSAkKCdbZGF0YS1pcy1jdXN0b20tc2VsZWN0XScpO1xuXG5cdFx0aWYgKCRzZWxlY3RzLmxlbmd0aCkge1xuXHRcdFx0JHNlbGVjdHMuc2VsZWN0Mih7XG5cblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiDQmtCw0YHRgtC+0LzQvdGL0LUg0YLQuNC/0Ysg0LLQsNC70LjQtNCw0YbQuNC5XG5cdCAqL1xuXHRpbml0Q3VzdG9tRm9ybVZhbGlkYXRvcnMoKSB7XG5cdFx0d2luZG93LlBhcnNsZXkuYWRkVmFsaWRhdG9yKCdwcm9kdWN0aW9uWWVhcicsIHtcblx0XHRcdHZhbGlkYXRlU3RyaW5nOiBmdW5jdGlvbiAodmFsdWUpIHtcblx0XHRcdFx0cmV0dXJuIE51bWJlcih2YWx1ZSkgPj0gMTk4MCAmJiBOdW1iZXIodmFsdWUpIDw9IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKTtcblx0XHRcdH0sXG5cdFx0XHRtZXNzYWdlczoge1xuXHRcdFx0XHRydTogYNCT0L7QtCDQvNC+0LbQtdGCINCx0YvRgtGMINC30LDQtNCw0L0g0L7RgiAxOTgwINC00L4gJHtuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCl9YFxuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdH1cblxuXHQvKipcblx0ICog0JzQsNGB0LrQuFxuXHQgKi9cblx0aW5pdE1hc2tzKCkge1xuXHRcdGxldCAkeWVhck1hc2sgPSAkKCdbZGF0YS15ZWFyLW1hc2tdJyk7XG5cdFx0bGV0ICRtb25leU1hc2sgPSAkKCdbZGF0YS1tb25leS1tYXNrXScpO1xuXG5cdFx0aWYgKCR5ZWFyTWFzay5sZW5ndGgpIHtcblx0XHRcdCR5ZWFyTWFzay5tYXNrKCc5OTk5Jyk7XG5cdFx0fVxuXG5cdFx0aWYgKCRtb25leU1hc2subGVuZ3RoKSB7XG5cdFx0XHQvL3J1XG5cdFx0XHQkbW9uZXlNYXNrLm1hc2tNb25leSh7XG5cdFx0XHRcdHRob3VzYW5kczogJyAnLFxuXHRcdFx0XHRkZWNpbWFsOiAnLicsXG5cdFx0XHRcdGFsbG93Tm9EZWNpbWFsOiB0cnVlXG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cbn1cblxuY29uc3QgY0FwcENvbnRyb2xsZXIgPSBuZXcgQ0FwcENvbnRyb2xsZXIoKTtcblxuJChkb2N1bWVudCkucmVhZHkoKCkgPT4ge1xuXHRjQXBwQ29udHJvbGxlci5pbml0KClcblx0XHQudGhlbigoKSA9PiB7XG5cdFx0XHQvL9Cy0YvQsdGA0LDRgdGL0LLQsNC10Lwg0LIgZ2xvYmFsINC00LvRjyDQtNC+0YHRgtGD0L/QsFxuXHRcdFx0Z2xvYmFsLkFDID0gY0FwcENvbnRyb2xsZXI7XG5cdFx0fSk7XG59KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9tYWluLmpzIiwiLyoqXG4gKiDQktGB0L/QvtC80L7Qs9Cw0YLQtdC70YzQvdGL0LUg0YTRg9C90LrRhtC40LhcbiAqL1xuY2xhc3MgQ1Rvb2xzIHtcblx0Y29uc3RydWN0b3IoKSB7fVxuXG5cdC8qKlxuXHQgKiDQmtC70L7QvdC40YDQvtCy0LDQvdC40LUg0L7QsdGK0LXQutGC0LAg0LHQtdC3INC/0YDQuNCy0Y/Qt9C60Lgg0L/QviDRgdGB0YvQu9C60LVcblx0ICogQHBhcmFtIG9iamVjdFxuXHQgKi9cblx0c3RhdGljIGNsb25lT2JqZWN0KG9iamVjdCA9IHt9KSB7XG5cdFx0cmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2JqZWN0KSk7XG5cdH1cblxuXHQvKipcblx0ICog0KTQvtGA0LzQsNGC0LjRgNC+0LDQvdC40LUg0YHRgtGA0L7QutC4INCyINC00LXQvdC10LbQvdGL0Lkg0LLQuNC0XG5cdCAqIEBwYXJhbSBwcmljZVxuXHQgKiBAcGFyYW0gbG9jYWxlXG5cdCAqIEByZXR1cm5zIHsqfVxuXHQgKi9cblx0c3RhdGljIGZvcm1hdE1vbmV5KHByaWNlLCBsb2NhbGUgPSAncnUnKSB7XG5cdFx0bGV0IG5QcmljZSA9IE51bWJlcihwcmljZSk7XG5cblx0XHRpZiAoIWlzTmFOKG5QcmljZSkpIHtcblx0XHRcdHJldHVybiBuUHJpY2UudG9Mb2NhbGVTdHJpbmcobG9jYWxlKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIHByaWNlO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiDQptC10L3QsCArINC90LDQu9C+0LNcblx0ICogQHBhcmFtIHByaWNlXG5cdCAqIEBwYXJhbSB0YXhcblx0ICogQHBhcmFtIHByZWNpc2lvblxuXHQgKi9cblx0c3RhdGljIGdldFByaWNlV2l0aFRheChwcmljZSwgdGF4ID0gMTMsIHByZWNpc2lvbiA9IDApIHtcblx0XHRsZXQgblByaWNlID0gTnVtYmVyKHByaWNlKTtcblx0XHRsZXQgblRheCA9IE51bWJlcih0YXgpO1xuXG5cdFx0aWYgKCFpc05hTihuUHJpY2UpICYmICFpc05hTihuVGF4KSkge1xuXHRcdFx0bGV0IHByaWNlV2l0aFRheCA9ICgoblByaWNlICogblRheCAvIDEwMCkgKyBuUHJpY2UpO1xuXHRcdFx0cmV0dXJuIChwcmljZVdpdGhUYXggJSAxID09PSAwKSA/IHByaWNlV2l0aFRheCA6IHByaWNlV2l0aFRheC50b0ZpeGVkKHByZWNpc2lvbik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBwcmljZTtcblx0XHR9XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBDVG9vbHM7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvcGFydHMvQ1Rvb2xzLmpzIiwiY29uc3QgQ1Rvb2xzID0gcmVxdWlyZSgnLi9DVG9vbHMnKTtcblxuLyoqXG4gKiDQmtC+0L3RgtGA0L7Qu9C70LXRgCDQtNC70Y8g0YDQsNCx0L7RgtGLINGBINC/0L7QtNGA0LPRgNGD0LfQutC+0Lkg0Lgg0L7QsdC90L7QstC70LXQvdC40LXQvCDRgtCw0LHQu9C40YfQvdGL0YUg0LTQsNC90L3Ri9GFINC+0LEg0LDQstGC0L7QvNC+0LHQuNC70Y/RhVxuICog0KIu0LouINC/0L4g0L7QtNC90L7QuSDRgdGC0YDQsNC90LjRhtC1INC90LXQu9GM0LfRjyDQvdC40YfQtdCz0L4g0YHQutCw0LfQsNGC0Ywg0L4g0LLRgdC10Lwg0L/RgNC+0LXQutGC0LUg0LIg0YbQtdC70L7QvCwg0YLQviDQtNCw0L3QvdGL0Lkg0LrQvtC90YLRgNC+0LvQu9C10YBcbiAqINGB0LvRg9C20LjRgiDRgdC60L7RgNC10LUg0LTQu9GPINC00LXQvNC+0L3RgdGC0YDQsNGG0LjQvdC90YvRhSDRhtC10LvQtdC5INC4INC30LDRgtC+0YfQtdC9INC/0L7QtCDRgNCw0LHQvtGC0YMg0YEg0LrQvtC90LrRgNC10YLQvdGL0LzQuCDQtNCw0L3QvdGL0LzQuCDQuCDQutC+0L3QutGA0LXRgtC90LnQviDRhNC+0YDQvNC+0LlcbiAqL1xuY2xhc3MgQ0NhcmFtYmFDb250cm9sbGVyIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0Ly/QtNCw0L3QvdGL0LUg0LTQu9GPINC30LDQs9GA0YPQt9C60Lhcblx0XHR0aGlzLmxvYWRVcmwgPSAnaHR0cHM6Ly9yYXdnaXQuY29tL1ZhcmluZXR6L2U2Y2JhZGVjOTcyZTc2YTM0MGM0MWE2NWZjYzJhNmIzL3Jhdy85MDE5MTgyNmEzYmFjMmZmMDc2MTA0MGVkMWQ5NWM1OWYxNGVhZjI2L2Zyb250ZW5kX3Rlc3RfdGFibGUuanNvbic7XG5cblx0XHQvKipcblx0XHQgKiDQm9C+0LrQsNC70LjQt9Cw0YbQuNGPLiDQkiDQv9C10YDRgdC/0LXQutGC0LjQstCw0YUg0YDQsNCy0LfQuNGC0LjRjyDRjdGC0L4g0YHQu9C10LTRg9C10YIg0LLRi9C90L7RgdC40YLRjCDQsiDQvtGC0LTQtdC70YzQvdGL0LkganNvbi3RhNCw0LnQuyxcblx0XHQgKiDQu9C40LHQviDQutCw0Lot0YLQviDQv9GA0L7QsdGA0LDRgdGL0LLQsNGC0Ywg0LjQtyDQsdCw0LfRiy5cblx0XHQgKiBAdHlwZSB7e3J1OiB7c3RhdHVzOiB7cGVuZGluZzogc3RyaW5nLCBvdXRfb2Zfc3RvY2s6IHN0cmluZywgaW5fc3RvY2s6IHN0cmluZ30sIHJlbW92ZUJ1dHRvblRleHQ6IHN0cmluZ30sIGVuOiB7fX19XG5cdFx0ICovXG5cdFx0dGhpcy50ZXh0ID0ge1xuXHRcdFx0cnU6IHtcblx0XHRcdFx0J3N0YXR1cy0tcGVuZGluZyc6ICfQntC20LjQtNCw0LXRgtGB0Y8nLFxuXHRcdFx0XHQnc3RhdHVzLS1vdXRfb2Zfc3RvY2snOiAn0J3QtdGCINCyINC90LDQu9C40YfQuNC4Jyxcblx0XHRcdFx0J3N0YXR1cy0taW5fc3RvY2snOiAn0JIg0L3QsNC70LjRh9C40LgnLFxuXHRcdFx0XHQnZXJyb3ItLWxvYWRfZXJyb3InOiAn0J7RiNC40LHQutCwINC30LDQs9GA0YPQt9C60Lgg0LTQsNC90L3Ri9GFJyxcblx0XHRcdFx0J2Vycm9yLS1lbXB0eV9kYXRhJzogJ9Cd0LXRgiDQtNCw0L3QvdGL0YUg0LTQu9GPINC+0YLQvtCx0YDQsNC20LXQvdC40Y8nLFxuXHRcdFx0XHRyZW1vdmVfYnV0dG9uX3RleHQ6ICfQo9C00LDQu9C40YLRjCcsXG5cdFx0XHRcdGN1cnJlbmN5OiAn0YDRg9CxLidcblx0XHRcdH0sXG5cdFx0XHRlbjoge1xuXG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdC8v0LvQvtC60LDQu9GMXG5cdFx0dGhpcy5sb2NhbGUgPSAncnUnO1xuXHRcdC8v0LfQvdCw0YfQtdC90LjQtSDQvdCw0LvQvtCz0L7QstC+0Lkg0YHRgtCw0LLQutC4INC/0L4t0YPQvNC+0LvRh9Cw0L3QuNGOXG5cdFx0dGhpcy50YXggPSAxMztcblxuXHRcdC8qKlxuXHRcdCAqINCf0L7Qu9GD0YfQtdC90LjQtSDRgtC10LrRgdGC0LAg0L/QviDQutC+0LTRgy4g0JvQvtC60LDQu9GMINC/0LXRgNC10LTQsNC90LAg0YfQtdGA0LXQtyDQutCw0YDRgNC40YDQvtCy0LDQvdC40LVcblx0XHQgKi9cblx0XHR0aGlzLmdldFRleHQgPSB0aGlzLmdldFRleHRCeUxvY2FsZSh0aGlzLmxvY2FsZSk7XG5cblx0XHQvKipcblx0XHQgKiDQn9C+0YfQtdC80YMg0LjQvNC10L3QvdC+INGC0LDQutC+0LUg0YDQtdGI0LXQvdC40LU/XG5cdFx0ICog0JjQt9C90LDRh9Cw0LvRjNC90L4g0YMg0LzQtdC90Y8g0LHRi9C70LAg0LjQtNC10Y8g0YXRgNCw0L3QuNGC0Ywg0Y3RgtC+INCyINCy0LjQtNC1IGpzb24t0LTQtdGA0LXQstCwINC/0L4g0YLQuNC/0YMgeG1sLCDQvtC00L3QsNC60L4g0Y3RgtC+INGD0YHQu9C+0LbQvdGP0LXRglxuXHRcdCAqINGD0YHQu9C+0LbQvdGP0LXRgiDRh9C40YLQsNC10LzQvtGB0YLRjCDRgNCw0LfQvNC10YLQutC4LiDQkiDQv9C10YDRgdC/0LXQutGC0LjQstCw0YUg0YDQsNC30LLQuNGC0LjRjyDRjdGC0L4g0LzQvtC20L3QviDQstGL0L3QtdGB0YLQuCDQsiDQstC40LTQtVxuXHRcdCAqINGC0LDQutC+0LPQviDQttC1INC+0LHRitC10LrRgtCwINCyINC+0LTQvdC10LvRjNC90YsganNvbi3RgdC90LjQv9C/0LXRgiDQuCDQv9C+0LTQs9GA0YPQttCw0YLRjCDQsNGB0LjQvdGF0YDQvtC90L3Qviwg0L3QsNC/0YDQuNC80LXRgC4g0J3QviDQsiDRgNCw0LzQutCw0YUg0LTQsNC90L3QvtCz0L5cblx0XHQgKiDQt9Cw0LTQsNC90LjRjyDQuCDQv9GA0Lgg0L3QtdC40LfQstC10YHRgtC90L7QuSDQsNGA0YXQuNGC0LXQutGC0YPRgNC1INC/0YDQvtGH0LjRhSDRh9Cw0YHRgtC10Lkg0L/RgNC+0LTRg9C60YLQsCwg0Y8g0YDQtdGI0LjQuyDQvdC1INGD0YHQu9C+0LbQvdGP0YLRjCDRjdGC0L4g0LTQviDRgtCw0LrQvtC5INGB0YLQtdC/0LXQvdC4LlxuXHRcdCAqIHNjYWZmb2xkIC0g0YHQutC10LvQtdGCINGA0LDQt9C80LXRgtC60LguINCi0LDQutC20LUg0LIg0L3QtdC8INC/0YDQuNGB0YPRgtGB0YLQstGD0Y7RgiDQvtC/0YbQuNC+0L3QsNC70YzQvdGL0LUg0YfQsNGB0YLQuCwg0LrQvtGC0L7RgNGL0LUg0L7Qv9C40YHQsNC90LjQtSDQsiBvcHRpb25hbFxuXHRcdCAqIEB0eXBlIHt7c2NhZmZvbGQ6IHN0cmluZywgb3B0aW9uYWw6IHtkZXNjcmlwdGlvbjogc3RyaW5nLCBjb2xvckJveDogc3RyaW5nfX19XG5cdFx0ICovXG5cdFx0dGhpcy5tYXJrdXBUZW1wbGF0ZSA9IHtcblx0XHRcdHNjYWZmb2xkOiBgXG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJiLWN1c3RvbS10YWJsZV9fcm93XCIgZGF0YS1yb3ctaWQ9XCJ7e2lkfX1cIj5cblx0XHRcdFx0ICA8ZGl2IGNsYXNzPVwiYi1jdXN0b20tdGFibGVfX2NlbGwgYi1jdXN0b20tdGFibGVfX2NlbGwtLXRpdGxlXCI+XG5cdFx0XHRcdCAgICA8ZGl2IGNsYXNzPVwidGl0bGVcIj57e3RpdGxlfX08L2Rpdj5cblx0XHRcdFx0ICAgIHt7b3B0aW9uYWxEZXNjcmlwdGlvbn19XG5cdFx0XHRcdCAgPC9kaXY+XG5cdFx0XHRcdCAgPGRpdiBjbGFzcz1cImItY3VzdG9tLXRhYmxlX19jZWxsIGItY3VzdG9tLXRhYmxlX19jZWxsLS15ZWFyXCI+e3t5ZWFyfX08L2Rpdj5cblx0XHRcdFx0ICA8ZGl2IGNsYXNzPVwiYi1jdXN0b20tdGFibGVfX2NlbGwgYi1jdXN0b20tdGFibGVfX2NlbGwtLWNvbG9yXCI+XG5cdFx0XHRcdCAgICB7e29wdGlvbmFsQ29sb3Jib3h9fVxuXHRcdFx0XHQgIDwvZGl2PlxuXHRcdFx0XHQgIDxkaXYgY2xhc3M9XCJiLWN1c3RvbS10YWJsZV9fY2VsbCBiLWN1c3RvbS10YWJsZV9fY2VsbC0tc3RhdHVzXCI+e3tzdGF0dXN9fTwvZGl2PlxuXHRcdFx0XHQgIDxkaXYgY2xhc3M9XCJiLWN1c3RvbS10YWJsZV9fY2VsbCBiLWN1c3RvbS10YWJsZV9fY2VsbC0tcHJpY2VcIj5cblx0XHRcdFx0ICAgIDxub2JyIGNsYXNzPVwicHJpY2UganMtcHJpY2VcIiBkYXRhLW9yaWdpbmFsLXByaWNlPVwie3twcmljZX19XCI+e3tmb3JtYXR0ZWRQcmljZX19PC9ub2JyPlxuXHRcdFx0XHQgICAgPG5vYnIgY2xhc3M9XCJwcmljZS13aXRoLXRheCBqcy1wcmljZS13aXRoLXRheFwiIGRhdGEtb3JpZ2luYWwtcHJpY2Utd2l0aC10YXg9XCJ7e3ByaWNlV2l0aFRheH19XCI+e3tmb3JtYXR0ZWRQcmljZVdpdGhUYXh9fTwvbm9icj5cblx0XHRcdFx0ICA8L2Rpdj5cblx0XHRcdFx0ICA8ZGl2IGNsYXNzPVwiYi1jdXN0b20tdGFibGVfX2NlbGwgYi1jdXN0b20tdGFibGVfX2NlbGwtLWFjdGlvblwiPlxuXHRcdFx0XHQgICAgPGJ1dHRvbiBjbGFzcz1cImktYnV0dG9uIGktYnV0dG9uLS1lbGxpcHNlIGktYnV0dG9uLS1zaXplLXNtYWxsIGpzLWRlbGV0ZS10cmlnZ2VyXCI+e3tyZW1vdmVCdXR0b25UZXh0fX08L2J1dHRvbj5cblx0XHRcdFx0ICA8L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRgLFxuXHRcdFx0b3B0aW9uYWw6IHtcblx0XHRcdFx0ZGVzY3JpcHRpb246IGA8ZGl2IGNsYXNzPVwiZGVzY3JpcHRpb25cIj57e2Rlc2NyaXB0aW9ufX08L2Rpdj5gLFxuXHRcdFx0XHRjb2xvckJveDogYDxkaXYgY2xhc3M9XCJpLWNvbG9yLWJveFwiIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjoge3tjb2xvckNvZGV9fVwiPjwvZGl2PmAsXG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHRoaXMuJHRhYmxlV3JhcHBlciA9IG51bGw7XG5cdH1cblxuXHQvKipcblx0ICog0JjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y8g0LvQvtCz0LjQutC4INGA0LDQsdC+0YLRiyDQutC+0L3RgtGA0L7Qu9C70LXRgNCwXG5cdCAqL1xuXHRpbml0KCkge1xuXHRcdC8v0YLQsNCx0LvQuNGG0LBcblx0XHR0aGlzLiR0YWJsZVdyYXBwZXIgPSAkKCcjY2FyYW1iYS10YWJsZScpO1xuXHRcdC8v0YTQvtGA0LzQsFxuXHRcdHRoaXMuJGZvcm0gPSAkKCcjY2FyYW1iYS1mb3JtJyk7XG5cblx0XHRpZiAodGhpcy4kdGFibGVXcmFwcGVyLmxlbmd0aCAmJiB0aGlzLiRmb3JtLmxlbmd0aCkge1xuXHRcdFx0Ly/RgtC10LvQviDRgtCw0LHQu9C40YbRi1xuXHRcdFx0dGhpcy4kdGFibGVSb3dDb250YWluZXIgPSB0aGlzLiR0YWJsZVdyYXBwZXIuZmluZCgnLmpzLWJvZHknKTtcblx0XHRcdC8v0LHQu9C+0Log0LTQu9GPINGD0LLQtdC00L7QvNC70LXQvdC40Llcblx0XHRcdHRoaXMuJHRhYmxlTm90eSA9IHRoaXMuJHRhYmxlV3JhcHBlci5maW5kKCcuanMtbm90eScpO1xuXHRcdFx0Ly/QuNGC0L7Qs9C+0LLQsNGPINGG0LXQvdCwXG5cdFx0XHR0aGlzLiR0YWJsZVN1bW1hcnlQcmljZSA9IHRoaXMuJHRhYmxlV3JhcHBlci5maW5kKCcuanMtc3VtbWFyeS1wcmljZScpO1xuXG5cdFx0XHQvL9GC0YDQuNCz0LPQtdGAINC00LvRjyDRg9C00LDQu9C10L3QuNGPINGB0YLRgNC+0Lpcblx0XHRcdHRoaXMuaW5pdERlbGV0ZVRyaWdnZXIoKTtcblx0XHRcdC8v0LjQvdC40YbQuNCw0LvQuNC30LDRhtC40Lgg0LvQvtCz0LjQutC4INGA0LDQsdC+0YLRiyDRgSDRhNC+0YDQvNC+0Llcblx0XHRcdHRoaXMuaW5pdEZvcm0oKTtcblxuXHRcdFx0dGhpcy5sb2NrVGFibGUoKTtcblx0XHRcdHRoaXMubG9hZERhdGEoKVxuXHRcdFx0XHQudGhlbigoZGF0YSkgPT4ge1xuXHRcdFx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxuXHRcdFx0XHRcdFx0LmRlbGF5KDEwMDApIC8v0Y3QvNGD0LvRj9GG0LjRjyDQtNC+0LvQs9C+0LPQviDQvtGC0LLQtdGC0LAg0L7RgiDRgdC10YDQstC10YDQsFxuXHRcdFx0XHRcdFx0LnRoZW4oKCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRpZiAoT2JqZWN0LmtleXMoZGF0YSkubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHRcdFx0Ly/QvtCx0L3QvtCy0LvQtdC90LjQtSDQtNCw0L3QvdGL0YUg0LIg0YLQsNCx0LvQuNGG0Lpcblx0XHRcdFx0XHRcdFx0XHR0aGlzLnVwZGF0ZVRhYmxlV2l0aERhdGEoZGF0YSk7XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5zaG93VGFibGVOb3RpZmljYXRpb24odGhpcy5nZXRUZXh0KCdlcnJvci0tZW1wdHlfZGF0YScpKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0pXG5cdFx0XHRcdC50aGVuKCgpID0+IHtcblx0XHRcdFx0XHR0aGlzLnVubG9ja1RhYmxlKCk7XG5cdFx0XHRcdH0pXG5cdFx0XHRcdC5jYXRjaCgobXNnKSA9PiB7XG5cdFx0XHRcdFx0Ly9UT0RPINC+0LHRgNCw0LHQvtGC0LrQsCDQvtGI0LjQsdC+0Lpcblx0XHRcdFx0XHR0aGlzLnNob3dUYWJsZU5vdGlmaWNhdGlvbih0aGlzLmdldFRleHQoJ2Vycm9yLS1sb2FkX2Vycm9yJykpO1xuXHRcdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICog0JjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y8g0YDQsNCx0L7RgtGLINGBINGE0L7RgNC80L7QuVxuXHQgKi9cblx0aW5pdEZvcm0oKSB7XG5cdFx0dGhpcy4kZm9ybS5wYXJzbGV5KClcblx0XHRcdC5vbignZm9ybTpzdWJtaXQnLCAoZm9ybSkgPT4ge1xuXHRcdFx0XHRsZXQgZGF0YSA9IHt9O1xuXG5cdFx0XHRcdGlmICh0aGlzLmlzVGFibGVMb2NrKCkpIHtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aGlzLmxvY2tUYWJsZSgpO1xuXG5cdFx0XHRcdC8v0L7QsdGF0L7QtNC40Lwg0LLRgdC1INC/0L7Qu9GPINGE0L7RgNC80Ysg0Lgg0YHQvtCx0LjRgNCw0LXQvCDQtNCw0L3QvdGL0LVcblx0XHRcdFx0Zm9yIChsZXQgZmllbGQgaW4gZm9ybS5maWVsZHMpIHtcblx0XHRcdFx0XHRpZiAoZm9ybS5maWVsZHMuaGFzT3duUHJvcGVydHkoZmllbGQpKSB7XG5cdFx0XHRcdFx0XHRsZXQgZmllbGROYW1lID0gZm9ybS5maWVsZHNbZmllbGRdLiRlbGVtZW50LmF0dHIoJ2RhdGEtZmllbGQtdHlwZScpO1xuXHRcdFx0XHRcdFx0bGV0IHZhbHVlID0gZm9ybS5maWVsZHNbZmllbGRdLmdldFZhbHVlKCk7XG5cblx0XHRcdFx0XHRcdGlmIChmaWVsZE5hbWUgPT0gJ3ByaWNlJykge1xuXHRcdFx0XHRcdFx0XHRkYXRhW2ZpZWxkTmFtZV0gPSB2YWx1ZS5yZXBsYWNlKC9cXHMvLCAnJykucmVwbGFjZSgvLC8sICcuJyk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRkYXRhW2ZpZWxkTmFtZV0gPSB2YWx1ZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvL9C/0L7Qu9GD0YfQsNC10Lwg0YPRgdC70L7QstC90L4g0YPQvdC40LrQsNC70YzQvdGL0LkgSUQg0LTQu9GPINC90L7QstC+0LPQviDRjdC70LXQvNC10L3RgtCwXG5cdFx0XHRcdGRhdGEuaWQgPSB0aGlzLmdlbmVyYXRlVW5pcVJvd0lEKCk7XG5cblx0XHRcdFx0bGV0IHByZXBhcmVkRGF0YSA9IFtdO1xuXHRcdFx0XHRwcmVwYXJlZERhdGEucHVzaChkYXRhKTtcblxuXHRcdFx0XHQvL9C00L7QsdCw0LLQu9GP0LXQvCDRjdC70LXQvNC10L3RgtCyINCyINC70L7QutCw0LvRjNC90L7QtSDRhdGA0LDQvdC40LvQuNGJ0LXRhlxuXHRcdFx0XHR0aGlzLmFkZFJvd1RvTG9jYWxTdG9yYWdlKGRhdGEpO1xuXG5cdFx0XHRcdC8v0L7QsdC90L7QstC70LXQvdC40LVcblx0XHRcdFx0dGhpcy51cGRhdGVUYWJsZVdpdGhEYXRhKHByZXBhcmVkRGF0YSwgdHJ1ZSk7XG5cblx0XHRcdFx0dGhpcy5yZXNldEZvcm0oZm9ybSk7XG5cblx0XHRcdFx0dGhpcy51bmxvY2tUYWJsZSgpO1xuXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqINCh0LHRgNC+0YHQuNGC0Ywg0L/QvtC70Y8g0LIg0YTQvtGA0LzQtVxuXHQgKiBAcGFyYW0gcGFyc2xleUZvcm1cblx0ICovXG5cdHJlc2V0Rm9ybShwYXJzbGV5Rm9ybSkge1xuXHRcdGxldCAkZm9ybSA9ICQocGFyc2xleUZvcm0uJGVsZW1lbnQpO1xuXHRcdGxldCAkY3VzdG9tU2VsZWN0cyA9ICRmb3JtLmZpbmQoJ1tkYXRhLWlzLWN1c3RvbS1zZWxlY3RdJyk7XG5cblx0XHQvL9GB0LHRgNCw0YHRi9Cy0LDQtdC8INC30L3QsNGH0LXQvdC40Y8g0YTQvtGA0Lxcblx0XHRwYXJzbGV5Rm9ybS4kZWxlbWVudFswXS5yZXNldCgpO1xuXHRcdCRmb3JtLnBhcnNsZXkoKS5yZXNldCgpO1xuXG5cdFx0Ly/QvtCx0YXQvtC00LjQvCDQstGB0LUg0L/QvtC70Y8g0YTQvtGA0LzRiyDQuCDRgdCx0YDQsNGB0YvQstCw0LXQvCDQt9Cw0L/QvtC70L3QtdC90L3QvtGB0YLRjCDQv9C+0LvQtdC5XG5cdFx0Zm9yIChsZXQgZmllbGQgaW4gcGFyc2xleUZvcm0uZmllbGRzKSB7XG5cdFx0XHRpZiAocGFyc2xleUZvcm0uZmllbGRzLmhhc093blByb3BlcnR5KGZpZWxkKSkge1xuXHRcdFx0XHRwYXJzbGV5Rm9ybS5maWVsZHNbZmllbGRdLiRlbGVtZW50LnJlbW92ZUNsYXNzKCdpcy1maWxsJyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKCRjdXN0b21TZWxlY3RzLmxlbmd0aCkge1xuXHRcdFx0JC5lYWNoKCRjdXN0b21TZWxlY3RzLCAoaSwgc2VsZWN0KSA9PiB7XG5cdFx0XHRcdCQoc2VsZWN0KS52YWwoJycpLnRyaWdnZXIoJ2NoYW5nZScpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cblxuXHQvKipcblx0ICog0JjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y8g0LvQvtCz0LjQutC4INGD0LTQsNC70LXQvdC40Y8g0YHRgtGA0L7QuiDQuNC3INGC0LDQsdC70LjRhtGLXG5cdCAqL1xuXHRpbml0RGVsZXRlVHJpZ2dlcigpIHtcblx0XHR0aGlzLiR0YWJsZVdyYXBwZXIub24oJ2NsaWNrJywgJy5qcy1kZWxldGUtdHJpZ2dlcicsIChlKSA9PiB7XG5cdFx0XHRsZXQgJHRoaXMgPSAkKGUuY3VycmVudFRhcmdldCk7XG5cdFx0XHRsZXQgJHJvdyA9ICR0aGlzLmNsb3Nlc3QoJ1tkYXRhLXJvdy1pZF0nKTtcblxuXHRcdFx0aWYgKCRyb3cubGVuZ3RoKSB7XG5cdFx0XHRcdGxldCByb3dJRCA9ICRyb3cuYXR0cignZGF0YS1yb3ctaWQnKTtcblxuXHRcdFx0XHR0aGlzLmxvY2tUYWJsZSgpO1xuXG5cdFx0XHRcdFByb21pc2UucmVzb2x2ZSgpXG5cdFx0XHRcdFx0LmRlbGF5KDEwMCkgLy/Rh9C40YHRgtC+INC00LvRjyDQtNC10LzQvtC90YHRgtGA0LDRhtC40Lgg0YDQsNCx0L7RgtGLINGBINGB0LXRgNCy0LXRgNC+0Lxcblx0XHRcdFx0XHQudGhlbigoKSA9PiB7XG5cdFx0XHRcdFx0XHQkcm93LnJlbW92ZSgpO1xuXHRcdFx0XHRcdFx0dGhpcy5kZWxldGVSb3dGcm9tTG9jYWxTdG9yYWdlKHJvd0lEKTtcblx0XHRcdFx0XHRcdHRoaXMudXBkYXRlVGFibGVWaWV3U3RhdHVzKCk7XG5cdFx0XHRcdFx0XHR0aGlzLnVwZGF0ZVN1bW1hcnlQcmljZSgpO1xuXHRcdFx0XHRcdFx0dGhpcy51bmxvY2tUYWJsZSgpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqINCf0L7QtNCz0YDRg9C30LrQsCDQtNCw0L3QvdGL0Lkg0YEg0YPQtNCw0LvQtdC90L3QvtCz0L4g0LjRgdGC0L7Rh9C90LjQutCwXG5cdCAqINCR0LDQsyDQsiBJRTEwINC4IElFMTEg0L3QsCBXaW5kb3dzIDcg0LggV2luZG93cyA4LjEgaHR0cDovL3Rha2UubXMvekJGOGpcblx0ICogQHJldHVybnMge1Byb21pc2UuPFRSZXN1bHQ+fVxuXHQgKi9cblx0bG9hZERhdGEoKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdCQuYWpheCh7XG5cdFx0XHRcdHVybDogdGhpcy5sb2FkVXJsLFxuXHRcdFx0XHRkYXRhOiB7fSxcblx0XHRcdFx0ZGF0YVR5cGU6ICdqc29uJyxcblx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcblx0XHRcdFx0XHRyZXNvbHZlKGRhdGEpO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRlcnJvcjogKGpxWEhSLCB0ZXh0U3RhdHVzLCBlcnJvcikgPT4ge1xuXHRcdFx0XHRcdHJlamVjdCgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9KVxuXHRcdFx0LnRoZW4oKGRhdGEpID0+IHtcblx0XHRcdFx0bGV0IGxvY2FsRGF0YSA9IHRoaXMuZ2V0QWxsUm93c0Zyb21Mb2NhbFN0b3JhZ2UoKTtcblxuXHRcdFx0XHRpZiAobG9jYWxEYXRhKSB7XG5cdFx0XHRcdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIGxvY2FsRGF0YSwgZGF0YSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqINCS0YvQstC+0LQg0LTQsNC90L3Ri9GFINCyINGI0LDQsdC70L7QvdC90YPRjiDRgdGC0YDQvtC60YMg0Lgg0LTQvtCx0LDQstC70LXQvdC40LUg0LTQsNC90L3Ri9C10YVcblx0ICogVE9ETyDQtNC+0L/QvtC70L3QuNGC0LXQu9GM0L3QsNGPINCx0LXQt9C+0L/QsNGB0L3QsNGPINC+0LHRgNCw0LHQvtGC0LrQsCDQtNCw0L3QvdGL0YUg0YEg0YHQtdGA0LLQsFxuXHQgKiBAcGFyYW0gZGF0YVxuXHQgKiBAcGFyYW0gYkFwcGVuZCAtINC90LUg0L7Rh9C40YnQsNGC0Ywg0YHRg9GJ0LXRgdGC0LLRg9GO0YnQuNC1INC00LDQvdC90YvQtSDQsiDRgtCw0LHQu9C40YbQtVxuXHQgKi9cblx0dXBkYXRlVGFibGVXaXRoRGF0YShkYXRhLCBiQXBwZW5kID0gZmFsc2UpIHtcblx0XHRsZXQgcmVzdWx0TWFya3VwID0gW107XG5cblx0XHRmb3IgKGxldCByb3cgaW4gZGF0YSkge1xuXHRcdFx0aWYgKGRhdGEuaGFzT3duUHJvcGVydHkocm93KSkge1xuXHRcdFx0XHQvL9C90LXRgiDRgdC80YvRgdC70Ysg0LLRi9Cy0L7QtNC40YLRjCDRgdGC0YDQvtC60YMsINC10YHQu9C4INC+0YLRgdGC0YPRgtGB0LLRg9C10YIgSUQg0LjQu9C4IFRJVExFXG5cdFx0XHRcdGlmICh0eXBlb2YgZGF0YVtyb3ddLmlkICE9ICd1bmRlZmluZWQnICYmIHR5cGVvZiBkYXRhW3Jvd10udGl0bGUgIT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0XHRsZXQgcm93TWFya3VwID0gdGhpcy5tYXJrdXBUZW1wbGF0ZS5zY2FmZm9sZDtcblxuXHRcdFx0XHRcdGZvciAobGV0IGZpZWxkTmFtZSBpbiBkYXRhW3Jvd10pIHtcblx0XHRcdFx0XHRcdGlmIChkYXRhW3Jvd10uaGFzT3duUHJvcGVydHkoZmllbGROYW1lKSkge1xuXHRcdFx0XHRcdFx0XHRsZXQgdmFsdWUgPSBkYXRhW3Jvd11bZmllbGROYW1lXTtcblxuXHRcdFx0XHRcdFx0XHRpZiAoZmllbGROYW1lID09ICdpZCcpIHtcblx0XHRcdFx0XHRcdFx0XHRyb3dNYXJrdXAgPSByb3dNYXJrdXAucmVwbGFjZSgve3tpZH19L2csIHZhbHVlKTtcblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdGlmIChmaWVsZE5hbWUgPT0gJ3RpdGxlJykge1xuXHRcdFx0XHRcdFx0XHRcdHJvd01hcmt1cCA9IHJvd01hcmt1cC5yZXBsYWNlKC97e3RpdGxlfX0vZywgdmFsdWUpO1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0aWYgKGZpZWxkTmFtZSA9PSAnZGVzY3JpcHRpb24nKSB7XG5cdFx0XHRcdFx0XHRcdFx0cm93TWFya3VwID0gcm93TWFya3VwLnJlcGxhY2UoL3t7b3B0aW9uYWxEZXNjcmlwdGlvbn19L2csIHRoaXMubWFya3VwVGVtcGxhdGUub3B0aW9uYWwuZGVzY3JpcHRpb24pO1xuXHRcdFx0XHRcdFx0XHRcdHJvd01hcmt1cCA9IHJvd01hcmt1cC5yZXBsYWNlKC97e2Rlc2NyaXB0aW9ufX0vZywgdmFsdWUpO1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0LyoqXG5cdFx0XHRcdFx0XHRcdCAqINCm0LLQtdGC0LAg0LLRi9Cy0L7QttGDINC/0YDRj9C80L4g0LIg0LLQuNC00LUg0YLQtdC60YHRgtCwLCDQvdC+INC/0L4t0YXQvtGA0L7RiNC10LzRgyDQvdGD0LbQvdC+INC+0YLQtNCw0LLQsNGC0Ywg0YXRjdGIINGH0LXRgNC10LcgQVBJXG5cdFx0XHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdFx0XHRpZiAoZmllbGROYW1lID09ICdjb2xvcicpIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAodmFsdWUpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHJvd01hcmt1cCA9IHJvd01hcmt1cC5yZXBsYWNlKC97e29wdGlvbmFsQ29sb3Jib3h9fS9nLCB0aGlzLm1hcmt1cFRlbXBsYXRlLm9wdGlvbmFsLmNvbG9yQm94KTtcblx0XHRcdFx0XHRcdFx0XHRcdHJvd01hcmt1cCA9IHJvd01hcmt1cC5yZXBsYWNlKC97e2NvbG9yQ29kZX19L2csIHZhbHVlKTtcblx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0cm93TWFya3VwID0gcm93TWFya3VwLnJlcGxhY2UoL3t7b3B0aW9uYWxDb2xvcmJveH19L2csICcnKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRpZiAoZmllbGROYW1lID09ICd5ZWFyJykge1xuXHRcdFx0XHRcdFx0XHRcdHJvd01hcmt1cCA9IHJvd01hcmt1cC5yZXBsYWNlKC97e3llYXJ9fS9nLCB2YWx1ZSk7XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRpZiAoZmllbGROYW1lID09ICdzdGF0dXMnKSB7XG5cdFx0XHRcdFx0XHRcdFx0Ly/QvtC/0LXRh9Cw0YLQutCwINCyINGB0YLQsNGC0YPRgdC1LCDQsiDRgtCw0LrQvtC8INCy0LjQtNC1INC/0YDQuNC70LXRgtCw0LXRgiDRgSDQkNCf0Jhcblx0XHRcdFx0XHRcdFx0XHRpZiAodmFsdWUgPT0gJ3BlZG5kaW5nJykge1xuXHRcdFx0XHRcdFx0XHRcdFx0dmFsdWUgPSAncGVuZGluZyc7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0bGV0IHN0YXR1c1RleHQgPSB0aGlzLmdldFRleHQoYHN0YXR1cy0tJHt2YWx1ZX1gKTtcblx0XHRcdFx0XHRcdFx0XHRyb3dNYXJrdXAgPSByb3dNYXJrdXAucmVwbGFjZSgve3tzdGF0dXN9fS9nLCAoc3RhdHVzVGV4dCkgPyBzdGF0dXNUZXh0IDogJy0nKTtcblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdGlmIChmaWVsZE5hbWUgPT0gJ3ByaWNlJykge1xuXHRcdFx0XHRcdFx0XHRcdGxldCBwcmljZSA9IHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJyA/IHZhbHVlLnJlcGxhY2UoL1xccy8sICcnKS5yZXBsYWNlKC8sLywgJy4nKSA6IHZhbHVlO1xuXHRcdFx0XHRcdFx0XHRcdGxldCBwcmljZVdpdGhUYXggPSBDVG9vbHMuZ2V0UHJpY2VXaXRoVGF4KHByaWNlLCB0aGlzLnRheCwgMik7XG5cdFx0XHRcdFx0XHRcdFx0bGV0IGZvcm1hdHRlZFByaWNlID0gQ1Rvb2xzLmZvcm1hdE1vbmV5KHByaWNlLCB0aGlzLmxvY2FsZSk7XG5cdFx0XHRcdFx0XHRcdFx0bGV0IGZvcm1hdHRlZFByaWNlV2l0aFRheCA9IENUb29scy5mb3JtYXRNb25leShwcmljZVdpdGhUYXgsIHRoaXMubG9jYWxlKTtcblxuXHRcdFx0XHRcdFx0XHRcdHJvd01hcmt1cCA9IHJvd01hcmt1cC5yZXBsYWNlKC97e3ByaWNlfX0vZywgcHJpY2UpO1xuXHRcdFx0XHRcdFx0XHRcdHJvd01hcmt1cCA9IHJvd01hcmt1cC5yZXBsYWNlKC97e2Zvcm1hdHRlZFByaWNlfX0vZywgYCR7Zm9ybWF0dGVkUHJpY2V9ICR7dGhpcy5nZXRUZXh0KCdjdXJyZW5jeScpfWApO1xuXHRcdFx0XHRcdFx0XHRcdHJvd01hcmt1cCA9IHJvd01hcmt1cC5yZXBsYWNlKC97e3ByaWNlV2l0aFRheH19L2csIHByaWNlV2l0aFRheCk7XG5cdFx0XHRcdFx0XHRcdFx0cm93TWFya3VwID0gcm93TWFya3VwLnJlcGxhY2UoL3t7Zm9ybWF0dGVkUHJpY2VXaXRoVGF4fX0vZywgYCR7Zm9ybWF0dGVkUHJpY2VXaXRoVGF4fSAke3RoaXMuZ2V0VGV4dCgnY3VycmVuY3knKX1gKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJvd01hcmt1cCA9IHJvd01hcmt1cFxuXHRcdFx0XHRcdFx0LnJlcGxhY2UoL3t7cmVtb3ZlQnV0dG9uVGV4dH19L2csIHRoaXMuZ2V0VGV4dCgncmVtb3ZlX2J1dHRvbl90ZXh0JykpO1xuXG5cdFx0XHRcdFx0cmVzdWx0TWFya3VwLnB1c2gocm93TWFya3VwKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChiQXBwZW5kKSB7XG5cdFx0XHR0aGlzLiR0YWJsZVJvd0NvbnRhaW5lci5hcHBlbmQocmVzdWx0TWFya3VwLmpvaW4oJycpKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy4kdGFibGVSb3dDb250YWluZXIuaHRtbCgnJyk7XG5cdFx0XHR0aGlzLiR0YWJsZVJvd0NvbnRhaW5lci5hcHBlbmQocmVzdWx0TWFya3VwLmpvaW4oJycpKTtcblx0XHR9XG5cblx0XHR0aGlzLnVwZGF0ZVN1bW1hcnlQcmljZSgpO1xuXHRcdHRoaXMudXBkYXRlVGFibGVWaWV3U3RhdHVzKCk7XG5cdH1cblxuXHQvKipcblx0ICog0J7QsdC90L7QstC70LXQvdC40LUg0LjRgtC+0LPQvtCy0L7QuSDRgdGD0LzQvNGLINGC0LDQsdC70LjRhtGLXG5cdCAqL1xuXHR1cGRhdGVTdW1tYXJ5UHJpY2UoKSB7XG5cdFx0bGV0IHN1bW1hcnlQcmljZSA9IDA7XG5cblx0XHQkLmVhY2godGhpcy5nZXRSb3dzKCksIChpLCByb3cpID0+IHtcblx0XHRcdGxldCAkcm93ID0gJChyb3cpO1xuXHRcdFx0bGV0IHByaWNlID0gKCRyb3cuZmluZCgnLmpzLXByaWNlLXdpdGgtdGF4JykubGVuZ3RoKVxuXHRcdFx0XHQ/ICRyb3cuZmluZCgnLmpzLXByaWNlLXdpdGgtdGF4JykuYXR0cignZGF0YS1vcmlnaW5hbC1wcmljZS13aXRoLXRheCcpXG5cdFx0XHRcdDogJHJvdy5maW5kKCcuanMtcHJpY2UnKS5hdHRyKCdkYXRhLW9yaWdpbmFsLXByaWNlJyk7XG5cblx0XHRcdGlmIChwcmljZSkge1xuXHRcdFx0XHRpZiAoIWlzTmFOKHN1bW1hcnlQcmljZSkgJiYgIWlzTmFOKHByaWNlKSkge1xuXHRcdFx0XHRcdHN1bW1hcnlQcmljZSA9IE51bWJlcihzdW1tYXJ5UHJpY2UpICsgTnVtYmVyKHByaWNlKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0dGhpcy4kdGFibGVTdW1tYXJ5UHJpY2UuaHRtbChgJHtDVG9vbHMuZm9ybWF0TW9uZXkoTnVtYmVyKHN1bW1hcnlQcmljZSksIHRoaXMubG9jYWxlKX0gJHt0aGlzLmdldFRleHQoJ2N1cnJlbmN5Jyl9YCk7XG5cdH1cblxuXHQvKipcblx0ICog0J/QvtC70YPRh9C40YLRjCDQstGB0LUg0YHRgtGA0L7QutC4INC40Lcg0YLQsNCx0LvQuNGG0Ytcblx0ICovXG5cdGdldFJvd3MoKSB7XG5cdFx0cmV0dXJuIHRoaXMuJHRhYmxlUm93Q29udGFpbmVyLmZpbmQoJ1tkYXRhLXJvdy1pZF0nKTtcblx0fVxuXG5cdC8qKlxuXHQgKiDQlNC+0LHQsNCy0LjRgtGMINC00LDQvdC90YvQtSDQviDQt9Cw0L/QuNGB0Lgg0LIgbG9jYWxTdG9yYWdlXG5cdCAqIEBwYXJhbSBkYXRhXG5cdCAqL1xuXHRhZGRSb3dUb0xvY2FsU3RvcmFnZShkYXRhKSB7XG5cdFx0aWYgKGRhdGEgJiYgZGF0YS5pZCAmJiBsb2NhbFN0b3JhZ2UpIHtcblx0XHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKGBhdXRvUGFydHMtLXJvdy0ke2RhdGEuaWR9YCwgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiDQn9C+0LvRg9GH0LjRgtGMINC00LDQvdC90YvQtSDQuNC3IGxvY2FsU3RvcmFnZVxuXHQgKiBAcmV0dXJucyB7Kn1cblx0ICovXG5cdGdldEFsbFJvd3NGcm9tTG9jYWxTdG9yYWdlKCkge1xuXHRcdGxldCBkYXRhID0ge307XG5cblx0XHRpZiAoIWxvY2FsU3RvcmFnZSkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdGZvciAobGV0IGtleSBpbiBsb2NhbFN0b3JhZ2UpIHtcblx0XHRcdGlmIChsb2NhbFN0b3JhZ2UuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRpZiAoa2V5LmluZGV4T2YoJ2F1dG9QYXJ0cy0tcm93JykgIT0gLTEpIHtcblx0XHRcdFx0XHRsZXQgb2JqID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpKTtcblx0XHRcdFx0XHRkYXRhW29iai5pZF0gPSBvYmo7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gT2JqZWN0LmtleXMoZGF0YSkubGVuZ3RoID8gZGF0YSA6IGZhbHNlO1xuXHR9XG5cblx0LyoqXG5cdCAqINCj0LTQsNC70LjRgtGMINC00LDQvdC90YvQtSDQuNC3IGxvY2FsU3RvcmFnZVxuXHQgKiBAcGFyYW0gaWRcblx0ICovXG5cdGRlbGV0ZVJvd0Zyb21Mb2NhbFN0b3JhZ2UoaWQpIHtcblx0XHRpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oYGF1dG9QYXJ0cy0tcm93LSR7aWR9YCkpIHtcblx0XHRcdGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGBhdXRvUGFydHMtLXJvdy0ke2lkfWApO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiDQn9C+0LvRg9GH0LjRgtGMINGC0LXQutGB0YIg0L/QviDQutC+0LTRgyDQtNC70Y8g0L/QtdGA0LXQtNCw0L3QvdC+0Lkg0LvQvtC60LDQu9C4XG5cdCAqIEBwYXJhbSBsb2NhbGUgLSDQu9C+0LrQsNC70Yxcblx0ICogQHBhcmFtIHRleHQgLSDRgtC10LrRgdGCXG5cdCAqIEByZXR1cm5zIHtmdW5jdGlvbigqKX1cblx0ICovXG5cdGdldFRleHRCeUxvY2FsZShsb2NhbGUgPSAncnUnLCB0ZXh0KSB7XG5cdFx0cmV0dXJuICh0ZXh0KSA9PiB7XG5cdFx0XHRyZXR1cm4gKHRoaXMudGV4dCAmJiB0aGlzLnRleHRbbG9jYWxlXSAmJiB0aGlzLnRleHRbbG9jYWxlXVt0ZXh0XSkgPyB0aGlzLnRleHRbbG9jYWxlXVt0ZXh0XSA6IGZhbHNlO1xuXHRcdH07XG5cdH1cblxuXHQvKipcblx0ICog0J/QvtC70YPRh9C40YLRjCDRg9GB0LvQvtCy0L3QviDRg9C90LjQutCw0LvRjNC90YvQuSBpZFxuXHQgKiBAcmV0dXJucyB7bnVtYmVyfVxuXHQgKi9cblx0Z2VuZXJhdGVVbmlxUm93SUQoKSB7XG5cdFx0bGV0IHVuaXFJRCA9IDA7XG5cdFx0bGV0IGV4aXN0ZWRJRCA9IFtdO1xuXG5cdFx0JC5lYWNoKHRoaXMuZ2V0Um93cygpLCAoaSwgcm93KSA9PiB7XG5cdFx0XHRleGlzdGVkSUQucHVzaCgkKHJvdykuYXR0cignZGF0YS1yb3ctaWQnKSk7XG5cdFx0fSk7XG5cblx0XHRpZiAoZXhpc3RlZElELmxlbmd0aCkge1xuXHRcdFx0bGV0IG1heCA9IE1hdGgubWF4LmFwcGx5KG51bGwsIGV4aXN0ZWRJRC5tYXAoTnVtYmVyKSk7XG5cdFx0XHR1bmlxSUQgPSBtYXggKyAxO1xuXHRcdH1cblxuXHRcdHJldHVybiB1bmlxSUQ7XG5cdH1cblxuXHQvKipcblx0ICog0JLRi9Cy0L7QtNC40YIg0YHQvtC+0LHRidC10L3QuNC1INCyINC40L3RhNC+0YDQvNCw0YbQuNC+0L3QvdC+0Lwg0YLQsNCx0LvQuNGH0L3QvtC8INCx0LvQvtC60LVcblx0ICogQHBhcmFtIG1zZ1xuXHQgKi9cblx0c2hvd1RhYmxlTm90aWZpY2F0aW9uKG1zZyA9ICcnKSB7XG5cdFx0aWYgKG1zZykge1xuXHRcdFx0dGhpcy4kdGFibGVOb3R5Lmh0bWwobXNnKTtcblx0XHRcdHRoaXMuJHRhYmxlV3JhcHBlci5hZGRDbGFzcygnaXMtbm90eScpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiDQn9GA0L7QstC10YDRj9C10YIsINC10YHRgtGMINC70Lgg0LIg0YLQsNCx0LvQuNGG0LUg0LTQsNC90L3Ri9C1INC00LvRjyDQv9C+0LrQsNC30LAuINCV0YHQu9C4INC90LXRgiAtINCy0YvQstC+0LTQuNGCINGD0LLQtdC00L7QvNC70LXQvdC40LVcblx0ICovXG5cdHVwZGF0ZVRhYmxlVmlld1N0YXR1cygpIHtcblx0XHRpZiAodGhpcy5pc05vUm93cygpKSB7XG5cdFx0XHR0aGlzLnNob3dUYWJsZU5vdGlmaWNhdGlvbih0aGlzLmdldFRleHQoJ2Vycm9yLS1lbXB0eV9kYXRhJykpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLiR0YWJsZVdyYXBwZXIucmVtb3ZlQ2xhc3MoJ2lzLW5vdHknKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICog0J/RgNC+0LLQtdGA0Y/QtdGCLCDQv9GD0YHRgtCwINC40Lsg0YLQsNCx0LvQuNGG0LBcblx0ICogQHJldHVybnMge2Jvb2xlYW59XG5cdCAqL1xuXHRpc05vUm93cygpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRSb3dzKCkubGVuZ3RoID09IDA7XG5cdH1cblxuXHQvKipcblx0ICog0JHQu9C+0LrQuNGA0L7QstC60LAg0YLQsNCx0LvQuNGG0Ytcblx0ICovXG5cdGxvY2tUYWJsZSgpIHtcblx0XHR0aGlzLiR0YWJsZVdyYXBwZXIuYWRkQ2xhc3MoJ2lzLXByZWxvYWRpbmcnKTtcblx0fVxuXG5cdC8qKlxuXHQgKiDQoNCw0LfQsdC70L7QutC40YDQvtCy0LrQsCDRgtCw0LHQu9C40YbRi1xuXHQgKi9cblx0dW5sb2NrVGFibGUoKSB7XG5cdFx0dGhpcy4kdGFibGVXcmFwcGVyLnJlbW92ZUNsYXNzKCdpcy1wcmVsb2FkaW5nJyk7XG5cdH1cblxuXHQvKipcblx0ICog0KLQsNCx0LvQuNGG0LAg0LfQsNCx0LvQvtC60LjRgNC+0LLQsNC90LA/XG5cdCAqL1xuXHRpc1RhYmxlTG9jaygpIHtcblx0XHRyZXR1cm4gdGhpcy4kdGFibGVXcmFwcGVyLmhhc0NsYXNzKCdpcy1wcmVsb2FkaW5nJyk7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBDQ2FyYW1iYUNvbnRyb2xsZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvcGFydHMvQ0NhcmFtYmEuanMiXSwic291cmNlUm9vdCI6IiJ9