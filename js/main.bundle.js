webpackJsonp([0],{

/***/ 11:
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
				'remove_button_text': 'Удалить',
				'currency': 'руб.'
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

						data[fieldName] = form.fields[field].getValue();
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

},[11]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcGFydHMvQ1Rvb2xzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9wYXJ0cy9DQ2FyYW1iYS5qcyJdLCJuYW1lcyI6WyJDQ2FyYW1iYUNvbnRyb2xsZXIiLCJyZXF1aXJlIiwiQ1Rvb2xzIiwiUHJvbWlzZSIsImNvbmZpZyIsIndhcm5pbmdzIiwibG9uZ1N0YWNrVHJhY2VzIiwiY2FuY2VsbGF0aW9uIiwibW9uaXRvcmluZyIsInByb2R1Y3Rpb24iLCJDQXBwQ29udHJvbGxlciIsImNDYXJhbWJhQ29udHJvbGxlciIsImNUb29scyIsInJlc29sdmUiLCJ0aGVuIiwiaW5pdFNtYXJ0TGFiZWxzIiwiaW5pdEN1c3RvbVNlbGVjdHMiLCJpbml0IiwiJHNtYXJ0TGFiZWxzIiwiJCIsImxlbmd0aCIsIm9uIiwiJHRoaXMiLCJ0b2dnbGVDbGFzcyIsInZhbCIsImJsdXIiLCIkc2VsZWN0cyIsInNlbGVjdDIiLCJjQXBwQ29udHJvbGxlciIsImRvY3VtZW50IiwicmVhZHkiLCJnbG9iYWwiLCJBQyIsIm9iamVjdCIsIkpTT04iLCJwYXJzZSIsInN0cmluZ2lmeSIsInByaWNlIiwibG9jYWxlIiwiblByaWNlIiwiTnVtYmVyIiwiaXNOYU4iLCJ0b0xvY2FsZVN0cmluZyIsInRheCIsInByZWNpc2lvbiIsIm5UYXgiLCJwcmljZVdpdGhUYXgiLCJ0b0ZpeGVkIiwibW9kdWxlIiwiZXhwb3J0cyIsImxvYWRVcmwiLCJ0ZXh0IiwicnUiLCJlbiIsImdldFRleHQiLCJnZXRUZXh0QnlMb2NhbGUiLCJtYXJrdXBUZW1wbGF0ZSIsInNjYWZmb2xkIiwib3B0aW9uYWwiLCJkZXNjcmlwdGlvbiIsImNvbG9yQm94IiwiJHRhYmxlV3JhcHBlciIsIiRmb3JtIiwiJHRhYmxlUm93Q29udGFpbmVyIiwiZmluZCIsIiR0YWJsZU5vdHkiLCIkdGFibGVTdW1tYXJ5UHJpY2UiLCJpbml0RGVsZXRlVHJpZ2dlciIsImluaXRGb3JtIiwibG9ja1RhYmxlIiwibG9hZERhdGEiLCJkYXRhIiwiZGVsYXkiLCJPYmplY3QiLCJrZXlzIiwidXBkYXRlVGFibGVXaXRoRGF0YSIsInNob3dUYWJsZU5vdGlmaWNhdGlvbiIsInVubG9ja1RhYmxlIiwiY2F0Y2giLCJtc2ciLCJwYXJzbGV5IiwiZm9ybSIsImlzVGFibGVMb2NrIiwiZmllbGQiLCJmaWVsZHMiLCJoYXNPd25Qcm9wZXJ0eSIsImZpZWxkTmFtZSIsIiRlbGVtZW50IiwiYXR0ciIsImdldFZhbHVlIiwiaWQiLCJnZW5lcmF0ZVVuaXFSb3dJRCIsInByZXBhcmVkRGF0YSIsInB1c2giLCJhZGRSb3dUb0xvY2FsU3RvcmFnZSIsInJlc2V0Rm9ybSIsInBhcnNsZXlGb3JtIiwiJGN1c3RvbVNlbGVjdHMiLCJyZXNldCIsInJlbW92ZUNsYXNzIiwiZWFjaCIsImkiLCJzZWxlY3QiLCJ0cmlnZ2VyIiwiZSIsImN1cnJlbnRUYXJnZXQiLCIkcm93IiwiY2xvc2VzdCIsInJvd0lEIiwicmVtb3ZlIiwiZGVsZXRlUm93RnJvbUxvY2FsU3RvcmFnZSIsInVwZGF0ZVRhYmxlVmlld1N0YXR1cyIsInVwZGF0ZVN1bW1hcnlQcmljZSIsInJlamVjdCIsImFqYXgiLCJ1cmwiLCJkYXRhVHlwZSIsInN1Y2Nlc3MiLCJlcnJvciIsImpxWEhSIiwidGV4dFN0YXR1cyIsImxvY2FsRGF0YSIsImdldEFsbFJvd3NGcm9tTG9jYWxTdG9yYWdlIiwiYXNzaWduIiwiYkFwcGVuZCIsInJlc3VsdE1hcmt1cCIsInJvdyIsInRpdGxlIiwicm93TWFya3VwIiwidmFsdWUiLCJyZXBsYWNlIiwic3RhdHVzVGV4dCIsImdldFByaWNlV2l0aFRheCIsImZvcm1hdHRlZFByaWNlIiwiZm9ybWF0TW9uZXkiLCJmb3JtYXR0ZWRQcmljZVdpdGhUYXgiLCJhcHBlbmQiLCJqb2luIiwiaHRtbCIsInN1bW1hcnlQcmljZSIsImdldFJvd3MiLCJsb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIiwia2V5IiwiaW5kZXhPZiIsIm9iaiIsImdldEl0ZW0iLCJyZW1vdmVJdGVtIiwidW5pcUlEIiwiZXhpc3RlZElEIiwibWF4IiwiTWF0aCIsImFwcGx5IiwibWFwIiwiYWRkQ2xhc3MiLCJpc05vUm93cyIsImhhc0NsYXNzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQU1BLHFCQUFxQixtQkFBQUMsQ0FBUSx5QkFBUixDQUEzQjtBQUNBLElBQU1DLFNBQVMsbUJBQUFELENBQVEsdUJBQVIsQ0FBZjs7QUFFQUUsUUFBUUMsTUFBUixDQUFlO0FBQ2Q7QUFDQUMsV0FBVSxDQUFDLEtBRkc7QUFHZDtBQUNBQyxrQkFBaUIsQ0FBQyxLQUpKO0FBS2Q7QUFDQUMsZUFBYyxDQUFDLEtBTkQ7QUFPZDtBQUNBQyxhQUFZLENBQUMsS0FBQUM7QUFSQyxDQUFmOztBQVdBOzs7O0lBR01DLGM7QUFDTCwyQkFBYztBQUFBOztBQUNiLE9BQUtDLGtCQUFMLEdBQTBCLElBQUlYLGtCQUFKLEVBQTFCO0FBQ0EsT0FBS1ksTUFBTCxHQUFjLElBQUlWLE1BQUosRUFBZDtBQUNBOzs7O3lCQUVNO0FBQUE7O0FBQ04sVUFBT0MsUUFBUVUsT0FBUixHQUNMQyxJQURLLENBQ0EsWUFBTTs7QUFFWCxVQUFLQyxlQUFMO0FBQ0EsVUFBS0MsaUJBQUw7O0FBRUEsVUFBS0wsa0JBQUwsQ0FBd0JNLElBQXhCO0FBQ0EsSUFQSyxDQUFQO0FBUUE7O0FBRUQ7Ozs7OztvQ0FHa0I7QUFDakIsT0FBTUMsZUFBZUMsRUFBRSx3QkFBRixDQUFyQjs7QUFFQSxPQUFJRCxhQUFhRSxNQUFqQixFQUF5QjtBQUN4QkYsaUJBQWFHLEVBQWIsQ0FBZ0IsTUFBaEIsRUFBd0IsWUFBWTtBQUNuQyxTQUFJQyxRQUFRSCxFQUFFLElBQUYsQ0FBWjs7QUFFQUcsV0FBTUMsV0FBTixDQUFrQixTQUFsQixFQUE2QkQsTUFBTUUsR0FBTixPQUFnQixFQUE3QztBQUNBLEtBSkQsRUFJR0MsSUFKSDtBQUtBO0FBQ0Q7O0FBRUQ7Ozs7OztzQ0FHb0I7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Ozs4QkFHWTtBQUNYLFFBQUt5QyxhQUFMLENBQW1CNkYsUUFBbkIsQ0FBNEIsZUFBNUI7QUFDQTs7QUFFRDs7Ozs7O2dDQUdjO0FBQ2IsUUFBSzdGLGFBQUwsQ0FBbUJzQyxXQUFuQixDQUErQixlQUEvQjtBQUNBOztBQUVEOzs7Ozs7Z0NBR2M7QUFDYixVQUFPLEtBQUt0QyxhQUFMLENBQW1CK0YsUUFBbkIsQ0FBNEIsZUFBNUIsQ0FBUDtBQUNBOzs7Ozs7QUFHRjVHLE9BQU9DLE9BQVAsR0FBaUJqRCxrQkFBakIsQyIsImZpbGUiOiJtYWluLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IENDYXJhbWJhQ29udHJvbGxlciA9IHJlcXVpcmUoJy4vcGFydHMvQ0NhcmFtYmEnKTtcbmNvbnN0IENUb29scyA9IHJlcXVpcmUoJy4vcGFydHMvQ1Rvb2xzJyk7XG5cblByb21pc2UuY29uZmlnKHtcblx0Ly8gRW5hYmxlIHdhcm5pbmdzXG5cdHdhcm5pbmdzOiAhcHJvZHVjdGlvbixcblx0Ly8gRW5hYmxlIGxvbmcgc3RhY2sgdHJhY2VzXG5cdGxvbmdTdGFja1RyYWNlczogIXByb2R1Y3Rpb24sXG5cdC8vIEVuYWJsZSBjYW5jZWxsYXRpb25cblx0Y2FuY2VsbGF0aW9uOiAhcHJvZHVjdGlvbixcblx0Ly8gRW5hYmxlIG1vbml0b3Jpbmdcblx0bW9uaXRvcmluZzogIXByb2R1Y3Rpb25cbn0pO1xuXG4vKipcbiAqINCT0LvQsNCy0L3Ri9C5INC60L7QvdGC0YDQvtC70LvQtdGAXG4gKi9cbmNsYXNzIENBcHBDb250cm9sbGVyIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0dGhpcy5jQ2FyYW1iYUNvbnRyb2xsZXIgPSBuZXcgQ0NhcmFtYmFDb250cm9sbGVyKCk7XG5cdFx0dGhpcy5jVG9vbHMgPSBuZXcgQ1Rvb2xzKCk7XG5cdH1cblxuXHRpbml0KCkge1xuXHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxuXHRcdFx0LnRoZW4oKCkgPT4ge1xuXG5cdFx0XHRcdHRoaXMuaW5pdFNtYXJ0TGFiZWxzKCk7XG5cdFx0XHRcdHRoaXMuaW5pdEN1c3RvbVNlbGVjdHMoKTtcblxuXHRcdFx0XHR0aGlzLmNDYXJhbWJhQ29udHJvbGxlci5pbml0KCk7XG5cdFx0XHR9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiDQmNC90LjRhtC40LDQu9C40LfQsNGG0LjRjyDRg9C80L3Ri9GFINC/0LvQtdC50YHRhdC+0LvQtNC10YDQvtCyXG5cdCAqL1xuXHRpbml0U21hcnRMYWJlbHMoKSB7XG5cdFx0Y29uc3QgJHNtYXJ0TGFiZWxzID0gJCgnLmpzLXNtYXJ0LWxhYmVsLS1pbnB1dCcpO1xuXG5cdFx0aWYgKCRzbWFydExhYmVscy5sZW5ndGgpIHtcblx0XHRcdCRzbWFydExhYmVscy5vbignYmx1cicsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0bGV0ICR0aGlzID0gJCh0aGlzKTtcblxuXHRcdFx0XHQkdGhpcy50b2dnbGVDbGFzcygnaXMtZmlsbCcsICR0aGlzLnZhbCgpICE9PSAnJyk7XG5cdFx0XHR9KS5ibHVyKCk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqINCY0L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPINC60LDRgdGC0L7QvNC90YvRhSDRgdC10LvQtdC60YLQvtCyXG5cdCAqL1xuXHRpbml0Q3VzdG9tU2VsZWN0cygpIHtcblx0XHRjb25zdCAkc2VsZWN0cyA9ICQoJ1tkYXRhLWlzLWN1c3RvbS1zZWxlY3RdJyk7XG5cblx0XHRpZiAoJHNlbGVjdHMubGVuZ3RoKSB7XG5cdFx0XHQkc2VsZWN0cy5zZWxlY3QyKHtcblxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG59XG5cbmNvbnN0IGNBcHBDb250cm9sbGVyID0gbmV3IENBcHBDb250cm9sbGVyKCk7XG5cbiQoZG9jdW1lbnQpLnJlYWR5KCgpID0+IHtcblx0Y0FwcENvbnRyb2xsZXIuaW5pdCgpXG5cdFx0LnRoZW4oKCkgPT4ge1xuXHRcdFx0Ly/QstGL0LHRgNCw0YHRi9Cy0LDQtdC8INCyIGdsb2JhbCDQtNC70Y8g0LTQvtGB0YLRg9C/0LBcblx0XHRcdGdsb2JhbC5BQyA9IGNBcHBDb250cm9sbGVyO1xuXHRcdH0pO1xufSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvbWFpbi5qcyIsIi8qKlxuICog0JLRgdC/0L7QvNC+0LPQsNGC0LXQu9GM0L3Ri9C1INGE0YPQvdC60YbQuNC4XG4gKi9cbmNsYXNzIENUb29scyB7XG5cdGNvbnN0cnVjdG9yKCkge31cblxuXHQvKipcblx0ICog0JrQu9C+0L3QuNGA0L7QstCw0L3QuNC1INC+0LHRitC10LrRgtCwINCx0LXQtyDQv9GA0LjQstGP0LfQutC4INC/0L4g0YHRgdGL0LvQutC1XG5cdCAqIEBwYXJhbSBvYmplY3Rcblx0ICovXG5cdHN0YXRpYyBjbG9uZU9iamVjdChvYmplY3QgPSB7fSkge1xuXHRcdHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9iamVjdCkpO1xuXHR9XG5cblx0LyoqXG5cdCAqINCk0L7RgNC80LDRgtC40YDQvtCw0L3QuNC1INGB0YLRgNC+0LrQuCDQsiDQtNC10L3QtdC20L3Ri9C5INCy0LjQtFxuXHQgKiBAcGFyYW0gcHJpY2Vcblx0ICogQHBhcmFtIGxvY2FsZVxuXHQgKiBAcmV0dXJucyB7Kn1cblx0ICovXG5cdHN0YXRpYyBmb3JtYXRNb25leShwcmljZSwgbG9jYWxlID0gJ3J1Jykge1xuXHRcdGxldCBuUHJpY2UgPSBOdW1iZXIocHJpY2UpO1xuXG5cdFx0aWYgKCFpc05hTihuUHJpY2UpKSB7XG5cdFx0XHRyZXR1cm4gblByaWNlLnRvTG9jYWxlU3RyaW5nKGxvY2FsZSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBwcmljZTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICog0KbQtdC90LAgKyDQvdCw0LvQvtCzXG5cdCAqIEBwYXJhbSBwcmljZVxuXHQgKiBAcGFyYW0gdGF4XG5cdCAqIEBwYXJhbSBwcmVjaXNpb25cblx0ICovXG5cdHN0YXRpYyBnZXRQcmljZVdpdGhUYXgocHJpY2UsIHRheCA9IDEzLCBwcmVjaXNpb24gPSAwKSB7XG5cdFx0bGV0IG5QcmljZSA9IE51bWJlcihwcmljZSk7XG5cdFx0bGV0IG5UYXggPSBOdW1iZXIodGF4KTtcblxuXHRcdGlmICghaXNOYU4oblByaWNlKSAmJiAhaXNOYU4oblRheCkpIHtcblx0XHRcdGxldCBwcmljZVdpdGhUYXggPSAoKG5QcmljZSAqIG5UYXggLyAxMDApICsgblByaWNlKTtcblx0XHRcdHJldHVybiAocHJpY2VXaXRoVGF4ICUgMSA9PT0gMCkgPyBwcmljZVdpdGhUYXggOiBwcmljZVdpdGhUYXgudG9GaXhlZChwcmVjaXNpb24pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gcHJpY2U7XG5cdFx0fVxuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQ1Rvb2xzO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3BhcnRzL0NUb29scy5qcyIsImNvbnN0IENUb29scyA9IHJlcXVpcmUoJy4vQ1Rvb2xzJyk7XG5cbi8qKlxuICog0JrQvtC90YLRgNC+0LvQu9C10YAg0LTQu9GPINGA0LDQsdC+0YLRiyDRgSDQv9C+0LTRgNCz0YDRg9C30LrQvtC5INC4INC+0LHQvdC+0LLQu9C10L3QuNC10Lwg0YLQsNCx0LvQuNGH0L3Ri9GFINC00LDQvdC90YvRhSDQvtCxINCw0LLRgtC+0LzQvtCx0LjQu9GP0YVcbiAqINCiLtC6LiDQv9C+INC+0LTQvdC+0Lkg0YHRgtGA0LDQvdC40YbQtSDQvdC10LvRjNC30Y8g0L3QuNGH0LXQs9C+INGB0LrQsNC30LDRgtGMINC+INCy0YHQtdC8INC/0YDQvtC10LrRgtC1INCyINGG0LXQu9C+0LwsINGC0L4g0LTQsNC90L3Ri9C5INC60L7QvdGC0YDQvtC70LvQtdGAXG4gKiDRgdC70YPQttC40YIg0YHQutC+0YDQtdC1INC00LvRjyDQtNC10LzQvtC90YHRgtGA0LDRhtC40L3QvdGL0YUg0YbQtdC70LXQuSDQuCDQt9Cw0YLQvtGH0LXQvSDQv9C+0LQg0YDQsNCx0L7RgtGDINGBINC60L7QvdC60YDQtdGC0L3Ri9C80Lgg0LTQsNC90L3Ri9C80Lgg0Lgg0LrQvtC90LrRgNC10YLQvdC50L4g0YTQvtGA0LzQvtC5XG4gKi9cbmNsYXNzIENDYXJhbWJhQ29udHJvbGxlciB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdC8v0LTQsNC90L3Ri9C1INC00LvRjyDQt9Cw0LPRgNGD0LfQutC4XG5cdFx0dGhpcy5sb2FkVXJsID0gJ2h0dHBzOi8vcmF3Z2l0LmNvbS9WYXJpbmV0ei9lNmNiYWRlYzk3MmU3NmEzNDBjNDFhNjVmY2MyYTZiMy9yYXcvOTAxOTE4MjZhM2JhYzJmZjA3NjEwNDBlZDFkOTVjNTlmMTRlYWYyNi9mcm9udGVuZF90ZXN0X3RhYmxlLmpzb24nO1xuXG5cdFx0LyoqXG5cdFx0ICog0JvQvtC60LDQu9C40LfQsNGG0LjRjy4g0JIg0L/QtdGA0YHQv9C10LrRgtC40LLQsNGFINGA0LDQstC30LjRgtC40Y8g0Y3RgtC+INGB0LvQtdC00YPQtdGCINCy0YvQvdC+0YHQuNGC0Ywg0LIg0L7RgtC00LXQu9GM0L3Ri9C5IGpzb24t0YTQsNC50LssXG5cdFx0ICog0LvQuNCx0L4g0LrQsNC6LdGC0L4g0L/RgNC+0LHRgNCw0YHRi9Cy0LDRgtGMINC40Lcg0LHQsNC30YsuXG5cdFx0ICogQHR5cGUge3tydToge3N0YXR1czoge3BlbmRpbmc6IHN0cmluZywgb3V0X29mX3N0b2NrOiBzdHJpbmcsIGluX3N0b2NrOiBzdHJpbmd9LCByZW1vdmVCdXR0b25UZXh0OiBzdHJpbmd9LCBlbjoge319fVxuXHRcdCAqL1xuXHRcdHRoaXMudGV4dCA9IHtcblx0XHRcdHJ1OiB7XG5cdFx0XHRcdCdzdGF0dXMtLXBlbmRpbmcnOiAn0J7QttC40LTQsNC10YLRgdGPJyxcblx0XHRcdFx0J3N0YXR1cy0tb3V0X29mX3N0b2NrJzogJ9Cd0LXRgiDQsiDQvdCw0LvQuNGH0LjQuCcsXG5cdFx0XHRcdCdzdGF0dXMtLWluX3N0b2NrJzogJ9CSINC90LDQu9C40YfQuNC4Jyxcblx0XHRcdFx0J2Vycm9yLS1sb2FkX2Vycm9yJzogJ9Ce0YjQuNCx0LrQsCDQt9Cw0LPRgNGD0LfQutC4INC00LDQvdC90YvRhScsXG5cdFx0XHRcdCdlcnJvci0tZW1wdHlfZGF0YSc6ICfQndC10YIg0LTQsNC90L3Ri9GFINC00LvRjyDQvtGC0L7QsdGA0LDQttC10L3QuNGPJyxcblx0XHRcdFx0J3JlbW92ZV9idXR0b25fdGV4dCc6ICfQo9C00LDQu9C40YLRjCcsXG5cdFx0XHRcdCdjdXJyZW5jeSc6ICfRgNGD0LEuJ1xuXHRcdFx0fSxcblx0XHRcdGVuOiB7XG5cblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0Ly/Qu9C+0LrQsNC70Yxcblx0XHR0aGlzLmxvY2FsZSA9ICdydSc7XG5cdFx0Ly/Qt9C90LDRh9C10L3QuNC1INC90LDQu9C+0LPQvtCy0L7QuSDRgdGC0LDQstC60Lgg0L/Qvi3Rg9C80L7Qu9GH0LDQvdC40Y5cblx0XHR0aGlzLnRheCA9IDEzO1xuXG5cdFx0LyoqXG5cdFx0ICog0J/QvtC70YPRh9C10L3QuNC1INGC0LXQutGB0YLQsCDQv9C+INC60L7QtNGDLiDQm9C+0LrQsNC70Ywg0L/QtdGA0LXQtNCw0L3QsCDRh9C10YDQtdC3INC60LDRgNGA0LjRgNC+0LLQsNC90LjQtVxuXHRcdCAqL1xuXHRcdHRoaXMuZ2V0VGV4dCA9IHRoaXMuZ2V0VGV4dEJ5TG9jYWxlKHRoaXMubG9jYWxlKTtcblxuXHRcdC8qKlxuXHRcdCAqINCf0L7Rh9C10LzRgyDQuNC80LXQvdC90L4g0YLQsNC60L7QtSDRgNC10YjQtdC90LjQtT9cblx0XHQgKiDQmNC30L3QsNGH0LDQu9GM0L3QviDRgyDQvNC10L3RjyDQsdGL0LvQsCDQuNC00LXRjyDRhdGA0LDQvdC40YLRjCDRjdGC0L4g0LIg0LLQuNC00LUganNvbi3QtNC10YDQtdCy0LAg0L/QviDRgtC40L/RgyB4bWwsINC+0LTQvdCw0LrQviDRjdGC0L4g0YPRgdC70L7QttC90Y/QtdGCXG5cdFx0ICog0YPRgdC70L7QttC90Y/QtdGCINGH0LjRgtCw0LXQvNC+0YHRgtGMINGA0LDQt9C80LXRgtC60LguINCSINC/0LXRgNGB0L/QtdC60YLQuNCy0LDRhSDRgNCw0LfQstC40YLQuNGPINGN0YLQviDQvNC+0LbQvdC+INCy0YvQvdC10YHRgtC4INCyINCy0LjQtNC1XG5cdFx0ICog0YLQsNC60L7Qs9C+INC20LUg0L7QsdGK0LXQutGC0LAg0LIg0L7QtNC90LXQu9GM0L3RiyBqc29uLdGB0L3QuNC/0L/QtdGCINC4INC/0L7QtNCz0YDRg9C20LDRgtGMINCw0YHQuNC90YXRgNC+0L3QvdC+LCDQvdCw0L/RgNC40LzQtdGALiDQndC+INCyINGA0LDQvNC60LDRhSDQtNCw0L3QvdC+0LPQvlxuXHRcdCAqINC30LDQtNCw0L3QuNGPINC4INC/0YDQuCDQvdC10LjQt9Cy0LXRgdGC0L3QvtC5INCw0YDRhdC40YLQtdC60YLRg9GA0LUg0L/RgNC+0YfQuNGFINGH0LDRgdGC0LXQuSDQv9GA0L7QtNGD0LrRgtCwLCDRjyDRgNC10YjQuNC7INC90LUg0YPRgdC70L7QttC90Y/RgtGMINGN0YLQviDQtNC+INGC0LDQutC+0Lkg0YHRgtC10L/QtdC90LguXG5cdFx0ICogc2NhZmZvbGQgLSDRgdC60LXQu9C10YIg0YDQsNC30LzQtdGC0LrQuC4g0KLQsNC60LbQtSDQsiDQvdC10Lwg0L/RgNC40YHRg9GC0YHRgtCy0YPRjtGCINC+0L/RhtC40L7QvdCw0LvRjNC90YvQtSDRh9Cw0YHRgtC4LCDQutC+0YLQvtGA0YvQtSDQvtC/0LjRgdCw0L3QuNC1INCyIG9wdGlvbmFsXG5cdFx0ICogQHR5cGUge3tzY2FmZm9sZDogc3RyaW5nLCBvcHRpb25hbDoge2Rlc2NyaXB0aW9uOiBzdHJpbmcsIGNvbG9yQm94OiBzdHJpbmd9fX1cblx0XHQgKi9cblx0XHR0aGlzLm1hcmt1cFRlbXBsYXRlID0ge1xuXHRcdFx0c2NhZmZvbGQ6IGBcblx0XHRcdFx0PGRpdiBjbGFzcz1cImItY3VzdG9tLXRhYmxlX19yb3dcIiBkYXRhLXJvdy1pZD1cInt7aWR9fVwiPlxuXHRcdFx0XHQgIDxkaXYgY2xhc3M9XCJiLWN1c3RvbS10YWJsZV9fY2VsbCBiLWN1c3RvbS10YWJsZV9fY2VsbC0tdGl0bGVcIj5cblx0XHRcdFx0ICAgIDxkaXYgY2xhc3M9XCJ0aXRsZVwiPnt7dGl0bGV9fTwvZGl2PlxuXHRcdFx0XHQgICAge3tvcHRpb25hbERlc2NyaXB0aW9ufX1cblx0XHRcdFx0ICA8L2Rpdj5cblx0XHRcdFx0ICA8ZGl2IGNsYXNzPVwiYi1jdXN0b20tdGFibGVfX2NlbGwgYi1jdXN0b20tdGFibGVfX2NlbGwtLXllYXJcIj57e3llYXJ9fTwvZGl2PlxuXHRcdFx0XHQgIDxkaXYgY2xhc3M9XCJiLWN1c3RvbS10YWJsZV9fY2VsbCBiLWN1c3RvbS10YWJsZV9fY2VsbC0tY29sb3JcIj5cblx0XHRcdFx0ICAgIHt7b3B0aW9uYWxDb2xvcmJveH19XG5cdFx0XHRcdCAgPC9kaXY+XG5cdFx0XHRcdCAgPGRpdiBjbGFzcz1cImItY3VzdG9tLXRhYmxlX19jZWxsIGItY3VzdG9tLXRhYmxlX19jZWxsLS1zdGF0dXNcIj57e3N0YXR1c319PC9kaXY+XG5cdFx0XHRcdCAgPGRpdiBjbGFzcz1cImItY3VzdG9tLXRhYmxlX19jZWxsIGItY3VzdG9tLXRhYmxlX19jZWxsLS1wcmljZVwiPlxuXHRcdFx0XHQgICAgPG5vYnIgY2xhc3M9XCJwcmljZSBqcy1wcmljZVwiIGRhdGEtb3JpZ2luYWwtcHJpY2U9XCJ7e3ByaWNlfX1cIj57e2Zvcm1hdHRlZFByaWNlfX08L25vYnI+XG5cdFx0XHRcdCAgICA8bm9iciBjbGFzcz1cInByaWNlLXdpdGgtdGF4IGpzLXByaWNlLXdpdGgtdGF4XCIgZGF0YS1vcmlnaW5hbC1wcmljZS13aXRoLXRheD1cInt7cHJpY2VXaXRoVGF4fX1cIj57e2Zvcm1hdHRlZFByaWNlV2l0aFRheH19ICgrMTMlKTwvbm9icj5cblx0XHRcdFx0ICA8L2Rpdj5cblx0XHRcdFx0ICA8ZGl2IGNsYXNzPVwiYi1jdXN0b20tdGFibGVfX2NlbGwgYi1jdXN0b20tdGFibGVfX2NlbGwtLWFjdGlvblwiPlxuXHRcdFx0XHQgICAgPGJ1dHRvbiBjbGFzcz1cImktYnV0dG9uIGktYnV0dG9uLS1lbGxpcHNlIGktYnV0dG9uLS1zaXplLXNtYWxsIGpzLWRlbGV0ZS10cmlnZ2VyXCI+e3tyZW1vdmVCdXR0b25UZXh0fX08L2J1dHRvbj5cblx0XHRcdFx0ICA8L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRgLFxuXHRcdFx0b3B0aW9uYWw6IHtcblx0XHRcdFx0ZGVzY3JpcHRpb246IGA8ZGl2IGNsYXNzPVwiZGVzY3JpcHRpb25cIj57e2Rlc2NyaXB0aW9ufX08L2Rpdj5gLFxuXHRcdFx0XHRjb2xvckJveDogYDxkaXYgY2xhc3M9XCJpLWNvbG9yLWJveFwiIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjoge3tjb2xvckNvZGV9fVwiPjwvZGl2PmAsXG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHRoaXMuJHRhYmxlV3JhcHBlciA9IG51bGw7XG5cdH1cblxuXHQvKipcblx0ICog0JjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y8g0LvQvtCz0LjQutC4INGA0LDQsdC+0YLRiyDQutC+0L3RgtGA0L7Qu9C70LXRgNCwXG5cdCAqL1xuXHRpbml0KCkge1xuXHRcdC8v0YLQsNCx0LvQuNGG0LBcblx0XHR0aGlzLiR0YWJsZVdyYXBwZXIgPSAkKCcjY2FyYW1iYS10YWJsZScpO1xuXHRcdC8v0YTQvtGA0LzQsFxuXHRcdHRoaXMuJGZvcm0gPSAkKCcjY2FyYW1iYS1mb3JtJyk7XG5cblx0XHRpZiAodGhpcy4kdGFibGVXcmFwcGVyLmxlbmd0aCAmJiB0aGlzLiRmb3JtLmxlbmd0aCkge1xuXHRcdFx0Ly/RgtC10LvQviDRgtCw0LHQu9C40YbRi1xuXHRcdFx0dGhpcy4kdGFibGVSb3dDb250YWluZXIgPSB0aGlzLiR0YWJsZVdyYXBwZXIuZmluZCgnLmpzLWJvZHknKTtcblx0XHRcdC8v0LHQu9C+0Log0LTQu9GPINGD0LLQtdC00L7QvNC70LXQvdC40Llcblx0XHRcdHRoaXMuJHRhYmxlTm90eSA9IHRoaXMuJHRhYmxlV3JhcHBlci5maW5kKCcuanMtbm90eScpO1xuXHRcdFx0Ly/QuNGC0L7Qs9C+0LLQsNGPINGG0LXQvdCwXG5cdFx0XHR0aGlzLiR0YWJsZVN1bW1hcnlQcmljZSA9IHRoaXMuJHRhYmxlV3JhcHBlci5maW5kKCcuanMtc3VtbWFyeS1wcmljZScpO1xuXG5cdFx0XHQvL9GC0YDQuNCz0LPQtdGAINC00LvRjyDRg9C00LDQu9C10L3QuNGPINGB0YLRgNC+0Lpcblx0XHRcdHRoaXMuaW5pdERlbGV0ZVRyaWdnZXIoKTtcblx0XHRcdC8v0LjQvdC40YbQuNCw0LvQuNC30LDRhtC40Lgg0LvQvtCz0LjQutC4INGA0LDQsdC+0YLRiyDRgSDRhNC+0YDQvNC+0Llcblx0XHRcdHRoaXMuaW5pdEZvcm0oKTtcblxuXHRcdFx0dGhpcy5sb2NrVGFibGUoKTtcblx0XHRcdHRoaXMubG9hZERhdGEoKVxuXHRcdFx0XHQudGhlbigoZGF0YSkgPT4ge1xuXHRcdFx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxuXHRcdFx0XHRcdFx0LmRlbGF5KDEwMDApIC8v0Y3QvNGD0LvRj9GG0LjRjyDQtNC+0LvQs9C+0LPQviDQvtGC0LLQtdGC0LAg0L7RgiDRgdC10YDQstC10YDQsFxuXHRcdFx0XHRcdFx0LnRoZW4oKCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRpZiAoT2JqZWN0LmtleXMoZGF0YSkubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHRcdFx0Ly/QvtCx0L3QvtCy0LvQtdC90LjQtSDQtNCw0L3QvdGL0YUg0LIg0YLQsNCx0LvQuNGG0Lpcblx0XHRcdFx0XHRcdFx0XHR0aGlzLnVwZGF0ZVRhYmxlV2l0aERhdGEoZGF0YSk7XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5zaG93VGFibGVOb3RpZmljYXRpb24odGhpcy5nZXRUZXh0KCdlcnJvci0tZW1wdHlfZGF0YScpKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0pXG5cdFx0XHRcdC50aGVuKCgpID0+IHtcblx0XHRcdFx0XHR0aGlzLnVubG9ja1RhYmxlKCk7XG5cdFx0XHRcdH0pXG5cdFx0XHRcdC5jYXRjaCgobXNnKSA9PiB7XG5cdFx0XHRcdFx0Ly9UT0RPINC+0LHRgNCw0LHQvtGC0LrQsCDQvtGI0LjQsdC+0Lpcblx0XHRcdFx0XHR0aGlzLnNob3dUYWJsZU5vdGlmaWNhdGlvbih0aGlzLmdldFRleHQoJ2Vycm9yLS1sb2FkX2Vycm9yJykpO1xuXHRcdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICog0JjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y8g0YDQsNCx0L7RgtGLINGBINGE0L7RgNC80L7QuVxuXHQgKi9cblx0aW5pdEZvcm0oKSB7XG5cdFx0dGhpcy4kZm9ybS5wYXJzbGV5KClcblx0XHRcdC5vbignZm9ybTpzdWJtaXQnLCAoZm9ybSkgPT4ge1xuXHRcdFx0XHRsZXQgZGF0YSA9IHt9O1xuXG5cdFx0XHRcdGlmICh0aGlzLmlzVGFibGVMb2NrKCkpIHtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aGlzLmxvY2tUYWJsZSgpO1xuXG5cdFx0XHRcdC8v0L7QsdGF0L7QtNC40Lwg0LLRgdC1INC/0L7Qu9GPINGE0L7RgNC80Ysg0Lgg0YHQvtCx0LjRgNCw0LXQvCDQtNCw0L3QvdGL0LVcblx0XHRcdFx0Zm9yIChsZXQgZmllbGQgaW4gZm9ybS5maWVsZHMpIHtcblx0XHRcdFx0XHRpZiAoZm9ybS5maWVsZHMuaGFzT3duUHJvcGVydHkoZmllbGQpKSB7XG5cdFx0XHRcdFx0XHRsZXQgZmllbGROYW1lID0gZm9ybS5maWVsZHNbZmllbGRdLiRlbGVtZW50LmF0dHIoJ2RhdGEtZmllbGQtdHlwZScpO1xuXG5cdFx0XHRcdFx0XHRkYXRhW2ZpZWxkTmFtZV0gPSBmb3JtLmZpZWxkc1tmaWVsZF0uZ2V0VmFsdWUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvL9C/0L7Qu9GD0YfQsNC10Lwg0YPRgdC70L7QstC90L4g0YPQvdC40LrQsNC70YzQvdGL0LkgSUQg0LTQu9GPINC90L7QstC+0LPQviDRjdC70LXQvNC10L3RgtCwXG5cdFx0XHRcdGRhdGEuaWQgPSB0aGlzLmdlbmVyYXRlVW5pcVJvd0lEKCk7XG5cblx0XHRcdFx0bGV0IHByZXBhcmVkRGF0YSA9IFtdO1xuXHRcdFx0XHRwcmVwYXJlZERhdGEucHVzaChkYXRhKTtcblxuXHRcdFx0XHQvL9C00L7QsdCw0LLQu9GP0LXQvCDRjdC70LXQvNC10L3RgtCyINCyINC70L7QutCw0LvRjNC90L7QtSDRhdGA0LDQvdC40LvQuNGJ0LXRhlxuXHRcdFx0XHR0aGlzLmFkZFJvd1RvTG9jYWxTdG9yYWdlKGRhdGEpO1xuXG5cdFx0XHRcdC8v0L7QsdC90L7QstC70LXQvdC40LVcblx0XHRcdFx0dGhpcy51cGRhdGVUYWJsZVdpdGhEYXRhKHByZXBhcmVkRGF0YSwgdHJ1ZSk7XG5cblx0XHRcdFx0dGhpcy5yZXNldEZvcm0oZm9ybSk7XG5cblx0XHRcdFx0dGhpcy51bmxvY2tUYWJsZSgpO1xuXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqINCh0LHRgNC+0YHQuNGC0Ywg0L/QvtC70Y8g0LIg0YTQvtGA0LzQtVxuXHQgKiBAcGFyYW0gcGFyc2xleUZvcm1cblx0ICovXG5cdHJlc2V0Rm9ybShwYXJzbGV5Rm9ybSkge1xuXHRcdGxldCAkZm9ybSA9ICQocGFyc2xleUZvcm0uJGVsZW1lbnQpO1xuXHRcdGxldCAkY3VzdG9tU2VsZWN0cyA9ICRmb3JtLmZpbmQoJ1tkYXRhLWlzLWN1c3RvbS1zZWxlY3RdJyk7XG5cblx0XHQvL9GB0LHRgNCw0YHRi9Cy0LDQtdC8INC30L3QsNGH0LXQvdC40Y8g0YTQvtGA0Lxcblx0XHRwYXJzbGV5Rm9ybS4kZWxlbWVudFswXS5yZXNldCgpO1xuXHRcdCRmb3JtLnBhcnNsZXkoKS5yZXNldCgpO1xuXG5cdFx0Ly/QvtCx0YXQvtC00LjQvCDQstGB0LUg0L/QvtC70Y8g0YTQvtGA0LzRiyDQuCDRgdCx0YDQsNGB0YvQstCw0LXQvCDQt9Cw0L/QvtC70L3QtdC90L3QvtGB0YLRjCDQv9C+0LvQtdC5XG5cdFx0Zm9yIChsZXQgZmllbGQgaW4gcGFyc2xleUZvcm0uZmllbGRzKSB7XG5cdFx0XHRpZiAocGFyc2xleUZvcm0uZmllbGRzLmhhc093blByb3BlcnR5KGZpZWxkKSkge1xuXHRcdFx0XHRwYXJzbGV5Rm9ybS5maWVsZHNbZmllbGRdLiRlbGVtZW50LnJlbW92ZUNsYXNzKCdpcy1maWxsJyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKCRjdXN0b21TZWxlY3RzLmxlbmd0aCkge1xuXHRcdFx0JC5lYWNoKCRjdXN0b21TZWxlY3RzLCAoaSwgc2VsZWN0KSA9PiB7XG5cdFx0XHRcdCQoc2VsZWN0KS52YWwoJycpLnRyaWdnZXIoJ2NoYW5nZScpO1xuXHRcdFx0fSlcblx0XHR9XG5cdH1cblxuXG5cdC8qKlxuXHQgKiDQmNC90LjRhtC40LDQu9C40LfQsNGG0LjRjyDQu9C+0LPQuNC60Lgg0YPQtNCw0LvQtdC90LjRjyDRgdGC0YDQvtC6INC40Lcg0YLQsNCx0LvQuNGG0Ytcblx0ICovXG5cdGluaXREZWxldGVUcmlnZ2VyKCkge1xuXHRcdHRoaXMuJHRhYmxlV3JhcHBlci5vbignY2xpY2snLCAnLmpzLWRlbGV0ZS10cmlnZ2VyJywgKGUpID0+IHtcblx0XHRcdGxldCAkdGhpcyA9ICQoZS5jdXJyZW50VGFyZ2V0KTtcblx0XHRcdGxldCAkcm93ID0gJHRoaXMuY2xvc2VzdCgnW2RhdGEtcm93LWlkXScpO1xuXG5cdFx0XHRpZiAoJHJvdy5sZW5ndGgpIHtcblx0XHRcdFx0bGV0IHJvd0lEID0gJHJvdy5hdHRyKCdkYXRhLXJvdy1pZCcpO1xuXG5cdFx0XHRcdHRoaXMubG9ja1RhYmxlKCk7XG5cblx0XHRcdFx0UHJvbWlzZS5yZXNvbHZlKClcblx0XHRcdFx0XHQuZGVsYXkoMTAwKSAvL9GH0LjRgdGC0L4g0LTQu9GPINC00LXQvNC+0L3RgdGC0YDQsNGG0LjQuCDRgNCw0LHQvtGC0Ysg0YEg0YHQtdGA0LLQtdGA0L7QvFxuXHRcdFx0XHRcdC50aGVuKCgpID0+IHtcblx0XHRcdFx0XHRcdCRyb3cucmVtb3ZlKCk7XG5cdFx0XHRcdFx0XHR0aGlzLmRlbGV0ZVJvd0Zyb21Mb2NhbFN0b3JhZ2Uocm93SUQpO1xuXHRcdFx0XHRcdFx0dGhpcy51cGRhdGVUYWJsZVZpZXdTdGF0dXMoKTtcblx0XHRcdFx0XHRcdHRoaXMudXBkYXRlU3VtbWFyeVByaWNlKCk7XG5cdFx0XHRcdFx0XHR0aGlzLnVubG9ja1RhYmxlKCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHQvKipcblx0ICog0J/QvtC00LPRgNGD0LfQutCwINC00LDQvdC90YvQuSDRgSDRg9C00LDQu9C10L3QvdC+0LPQviDQuNGB0YLQvtGH0L3QuNC60LBcblx0ICogQHJldHVybnMge1Byb21pc2UuPFRSZXN1bHQ+fVxuXHQgKi9cblx0bG9hZERhdGEoKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdCQuYWpheCh7XG5cdFx0XHRcdHVybDogdGhpcy5sb2FkVXJsLFxuXHRcdFx0XHRkYXRhOiB7fSxcblx0XHRcdFx0ZGF0YVR5cGU6ICdqc29uJyxcblx0XHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcblx0XHRcdFx0XHRyZXNvbHZlKGRhdGEpO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRlcnJvcjogKGpxWEhSLCB0ZXh0U3RhdHVzLCBlcnJvcikgPT4ge1xuXHRcdFx0XHRcdHJlamVjdCgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9KVxuXHRcdFx0LnRoZW4oKGRhdGEpID0+IHtcblx0XHRcdFx0bGV0IGxvY2FsRGF0YSA9IHRoaXMuZ2V0QWxsUm93c0Zyb21Mb2NhbFN0b3JhZ2UoKTtcblxuXHRcdFx0XHRpZiAobG9jYWxEYXRhKSB7XG5cdFx0XHRcdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIGxvY2FsRGF0YSwgZGF0YSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqINCS0YvQstC+0LQg0LTQsNC90L3Ri9GFINCyINGI0LDQsdC70L7QvdC90YPRjiDRgdGC0YDQvtC60YMg0Lgg0LTQvtCx0LDQstC70LXQvdC40LUg0LTQsNC90L3Ri9C10YVcblx0ICogVE9ETyDQtNC+0L/QvtC70L3QuNGC0LXQu9GM0L3QsNGPINCx0LXQt9C+0L/QsNGB0L3QsNGPINC+0LHRgNCw0LHQvtGC0LrQsCDQtNCw0L3QvdGL0YUg0YEg0YHQtdGA0LLQsFxuXHQgKiBAcGFyYW0gZGF0YVxuXHQgKiBAcGFyYW0gYkFwcGVuZCAtINC90LUg0L7Rh9C40YnQsNGC0Ywg0YHRg9GJ0LXRgdGC0LLRg9GO0YnQuNC1INC00LDQvdC90YvQtSDQsiDRgtCw0LHQu9C40YbQtVxuXHQgKi9cblx0dXBkYXRlVGFibGVXaXRoRGF0YShkYXRhLCBiQXBwZW5kID0gZmFsc2UpIHtcblx0XHRsZXQgcmVzdWx0TWFya3VwID0gW107XG5cblx0XHRmb3IgKGxldCByb3cgaW4gZGF0YSkge1xuXHRcdFx0aWYgKGRhdGEuaGFzT3duUHJvcGVydHkocm93KSkge1xuXHRcdFx0XHQvL9C90LXRgiDRgdC80YvRgdC70Ysg0LLRi9Cy0L7QtNC40YLRjCDRgdGC0YDQvtC60YMsINC10YHQu9C4INC+0YLRgdGC0YPRgtGB0LLRg9C10YIgSUQg0LjQu9C4IFRJVExFXG5cdFx0XHRcdGlmICh0eXBlb2YgZGF0YVtyb3ddLmlkICE9ICd1bmRlZmluZWQnICYmIHR5cGVvZiBkYXRhW3Jvd10udGl0bGUgIT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0XHRsZXQgcm93TWFya3VwID0gdGhpcy5tYXJrdXBUZW1wbGF0ZS5zY2FmZm9sZDtcblxuXHRcdFx0XHRcdGZvciAobGV0IGZpZWxkTmFtZSBpbiBkYXRhW3Jvd10pIHtcblx0XHRcdFx0XHRcdGlmIChkYXRhW3Jvd10uaGFzT3duUHJvcGVydHkoZmllbGROYW1lKSkge1xuXHRcdFx0XHRcdFx0XHRsZXQgdmFsdWUgPSBkYXRhW3Jvd11bZmllbGROYW1lXTtcblxuXHRcdFx0XHRcdFx0XHRpZiAoZmllbGROYW1lID09ICdpZCcpIHtcblx0XHRcdFx0XHRcdFx0XHRyb3dNYXJrdXAgPSByb3dNYXJrdXAucmVwbGFjZSgve3tpZH19L2csIHZhbHVlKTtcblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdGlmIChmaWVsZE5hbWUgPT0gJ3RpdGxlJykge1xuXHRcdFx0XHRcdFx0XHRcdHJvd01hcmt1cCA9IHJvd01hcmt1cC5yZXBsYWNlKC97e3RpdGxlfX0vZywgdmFsdWUpO1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0aWYgKGZpZWxkTmFtZSA9PSAnZGVzY3JpcHRpb24nKSB7XG5cdFx0XHRcdFx0XHRcdFx0cm93TWFya3VwID0gcm93TWFya3VwLnJlcGxhY2UoL3t7b3B0aW9uYWxEZXNjcmlwdGlvbn19L2csIHRoaXMubWFya3VwVGVtcGxhdGUub3B0aW9uYWwuZGVzY3JpcHRpb24pO1xuXHRcdFx0XHRcdFx0XHRcdHJvd01hcmt1cCA9IHJvd01hcmt1cC5yZXBsYWNlKC97e2Rlc2NyaXB0aW9ufX0vZywgdmFsdWUpO1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0LyoqXG5cdFx0XHRcdFx0XHRcdCAqINCm0LLQtdGC0LAg0LLRi9Cy0L7QttGDINC/0YDRj9C80L4g0LIg0LLQuNC00LUg0YLQtdC60YHRgtCwLCDQvdC+INC/0L4t0YXQvtGA0L7RiNC10LzRgyDQvdGD0LbQvdC+INC+0YLQtNCw0LLQsNGC0Ywg0YXRjdGIINGH0LXRgNC10LcgQVBJXG5cdFx0XHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdFx0XHRpZiAoZmllbGROYW1lID09ICdjb2xvcicpIHtcblx0XHRcdFx0XHRcdFx0XHRyb3dNYXJrdXAgPSByb3dNYXJrdXAucmVwbGFjZSgve3tvcHRpb25hbENvbG9yYm94fX0vZywgdGhpcy5tYXJrdXBUZW1wbGF0ZS5vcHRpb25hbC5jb2xvckJveCk7XG5cdFx0XHRcdFx0XHRcdFx0cm93TWFya3VwID0gcm93TWFya3VwLnJlcGxhY2UoL3t7Y29sb3JDb2RlfX0vZywgdmFsdWUpO1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0aWYgKGZpZWxkTmFtZSA9PSAneWVhcicpIHtcblx0XHRcdFx0XHRcdFx0XHRyb3dNYXJrdXAgPSByb3dNYXJrdXAucmVwbGFjZSgve3t5ZWFyfX0vZywgdmFsdWUpO1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0aWYgKGZpZWxkTmFtZSA9PSAnc3RhdHVzJykge1xuXHRcdFx0XHRcdFx0XHRcdC8v0L7Qv9C10YfQsNGC0LrQsCDQsiDRgdGC0LDRgtGD0YHQtSwg0LIg0YLQsNC60L7QvCDQstC40LTQtSDQv9GA0LjQu9C10YLQsNC10YIg0YEg0JDQn9CYXG5cdFx0XHRcdFx0XHRcdFx0aWYgKHZhbHVlID09ICdwZWRuZGluZycpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHZhbHVlID0gJ3BlbmRpbmcnO1xuXHRcdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRcdGxldCBzdGF0dXNUZXh0ID0gdGhpcy5nZXRUZXh0KGBzdGF0dXMtLSR7dmFsdWV9YCk7XG5cdFx0XHRcdFx0XHRcdFx0cm93TWFya3VwID0gcm93TWFya3VwLnJlcGxhY2UoL3t7c3RhdHVzfX0vZywgKHN0YXR1c1RleHQpID8gc3RhdHVzVGV4dCA6ICctJyk7XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRpZiAoZmllbGROYW1lID09ICdwcmljZScpIHtcblx0XHRcdFx0XHRcdFx0XHRsZXQgcHJpY2UgPSB2YWx1ZTtcblx0XHRcdFx0XHRcdFx0XHRsZXQgcHJpY2VXaXRoVGF4ID0gQ1Rvb2xzLmdldFByaWNlV2l0aFRheCh2YWx1ZSwgdGhpcy50YXgpO1xuXHRcdFx0XHRcdFx0XHRcdGxldCBmb3JtYXR0ZWRQcmljZSA9IENUb29scy5mb3JtYXRNb25leSh2YWx1ZSwgdGhpcy5sb2NhbGUpO1xuXHRcdFx0XHRcdFx0XHRcdGxldCBmb3JtYXR0ZWRQcmljZVdpdGhUYXggPSBDVG9vbHMuZm9ybWF0TW9uZXkoQ1Rvb2xzLmdldFByaWNlV2l0aFRheCh2YWx1ZSwgdGhpcy50YXgpLCB0aGlzLmxvY2FsZSk7XG5cblx0XHRcdFx0XHRcdFx0XHRyb3dNYXJrdXAgPSByb3dNYXJrdXAucmVwbGFjZSgve3twcmljZX19L2csIHByaWNlKTtcblx0XHRcdFx0XHRcdFx0XHRyb3dNYXJrdXAgPSByb3dNYXJrdXAucmVwbGFjZSgve3tmb3JtYXR0ZWRQcmljZX19L2csIGAke2Zvcm1hdHRlZFByaWNlfSAke3RoaXMuZ2V0VGV4dCgnY3VycmVuY3knKX1gKTtcblx0XHRcdFx0XHRcdFx0XHRyb3dNYXJrdXAgPSByb3dNYXJrdXAucmVwbGFjZSgve3twcmljZVdpdGhUYXh9fS9nLCBwcmljZVdpdGhUYXgpO1xuXHRcdFx0XHRcdFx0XHRcdHJvd01hcmt1cCA9IHJvd01hcmt1cC5yZXBsYWNlKC97e2Zvcm1hdHRlZFByaWNlV2l0aFRheH19L2csIGAke2Zvcm1hdHRlZFByaWNlV2l0aFRheH0gJHt0aGlzLmdldFRleHQoJ2N1cnJlbmN5Jyl9YCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyb3dNYXJrdXAgPSByb3dNYXJrdXBcblx0XHRcdFx0XHRcdC5yZXBsYWNlKC97e29wdGlvbmFsRGVzY3JpcHRpb259fS9nLCAnJylcblx0XHRcdFx0XHRcdC5yZXBsYWNlKC97e29wdGlvbmFsQ29sb3Jib3h9fS9nLCAnJylcblx0XHRcdFx0XHRcdC5yZXBsYWNlKC97e3JlbW92ZUJ1dHRvblRleHR9fS9nLCB0aGlzLmdldFRleHQoJ3JlbW92ZV9idXR0b25fdGV4dCcpKTtcblxuXHRcdFx0XHRcdHJlc3VsdE1hcmt1cC5wdXNoKHJvd01hcmt1cCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoYkFwcGVuZCkge1xuXHRcdFx0dGhpcy4kdGFibGVSb3dDb250YWluZXIuYXBwZW5kKHJlc3VsdE1hcmt1cC5qb2luKCcnKSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuJHRhYmxlUm93Q29udGFpbmVyLmh0bWwoJycpO1xuXHRcdFx0dGhpcy4kdGFibGVSb3dDb250YWluZXIuYXBwZW5kKHJlc3VsdE1hcmt1cC5qb2luKCcnKSk7XG5cdFx0fVxuXG5cdFx0dGhpcy51cGRhdGVTdW1tYXJ5UHJpY2UoKTtcblx0XHR0aGlzLnVwZGF0ZVRhYmxlVmlld1N0YXR1cygpO1xuXHR9XG5cblx0LyoqXG5cdCAqINCe0LHQvdC+0LLQu9C10L3QuNC1INC40YLQvtCz0L7QstC+0Lkg0YHRg9C80LzRiyDRgtCw0LHQu9C40YbRi1xuXHQgKi9cblx0dXBkYXRlU3VtbWFyeVByaWNlKCkge1xuXHRcdGxldCBzdW1tYXJ5UHJpY2UgPSAwO1xuXG5cdFx0JC5lYWNoKHRoaXMuZ2V0Um93cygpLCAoaSwgcm93KSA9PiB7XG5cdFx0XHRsZXQgJHJvdyA9ICQocm93KTtcblx0XHRcdGxldCBwcmljZSA9ICgkcm93LmZpbmQoJy5qcy1wcmljZS13aXRoLXRheCcpLmxlbmd0aClcblx0XHRcdFx0PyAkcm93LmZpbmQoJy5qcy1wcmljZS13aXRoLXRheCcpLmF0dHIoJ2RhdGEtb3JpZ2luYWwtcHJpY2Utd2l0aC10YXgnKVxuXHRcdFx0XHQ6ICRyb3cuZmluZCgnLmpzLXByaWNlJykuYXR0cignZGF0YS1vcmlnaW5hbC1wcmljZScpO1xuXG5cdFx0XHRpZiAocHJpY2UpIHtcblx0XHRcdFx0aWYgKCFpc05hTihzdW1tYXJ5UHJpY2UpICYmICFpc05hTihwcmljZSkpIHtcblx0XHRcdFx0XHRzdW1tYXJ5UHJpY2UgPSBOdW1iZXIoc3VtbWFyeVByaWNlKSArIE51bWJlcihwcmljZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdHRoaXMuJHRhYmxlU3VtbWFyeVByaWNlLmh0bWwoYCR7Q1Rvb2xzLmZvcm1hdE1vbmV5KE51bWJlcihzdW1tYXJ5UHJpY2UpLCB0aGlzLmxvY2FsZSl9ICR7dGhpcy5nZXRUZXh0KCdjdXJyZW5jeScpfWApO1xuXHR9XG5cblx0LyoqXG5cdCAqINCf0L7Qu9GD0YfQuNGC0Ywg0LLRgdC1INGB0YLRgNC+0LrQuCDQuNC3INGC0LDQsdC70LjRhtGLXG5cdCAqL1xuXHRnZXRSb3dzKCkge1xuXHRcdHJldHVybiB0aGlzLiR0YWJsZVJvd0NvbnRhaW5lci5maW5kKCdbZGF0YS1yb3ctaWRdJyk7XG5cdH1cblxuXHQvKipcblx0ICog0JTQvtCx0LDQstC40YLRjCDQtNCw0L3QvdGL0LUg0L4g0LfQsNC/0LjRgdC4INCyIGxvY2FsU3RvcmFnZVxuXHQgKiBAcGFyYW0gZGF0YVxuXHQgKi9cblx0YWRkUm93VG9Mb2NhbFN0b3JhZ2UoZGF0YSkge1xuXHRcdGlmIChkYXRhICYmIGRhdGEuaWQgJiYgbG9jYWxTdG9yYWdlKSB7XG5cdFx0XHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgYXV0b1BhcnRzLS1yb3ctJHtkYXRhLmlkfWAsIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICog0J/QvtC70YPRh9C40YLRjCDQtNCw0L3QvdGL0LUg0LjQtyBsb2NhbFN0b3JhZ2Vcblx0ICogQHJldHVybnMgeyp9XG5cdCAqL1xuXHRnZXRBbGxSb3dzRnJvbUxvY2FsU3RvcmFnZSgpIHtcblx0XHRsZXQgZGF0YSA9IHt9O1xuXG5cdFx0aWYgKCFsb2NhbFN0b3JhZ2UpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRmb3IgKGxldCBrZXkgaW4gbG9jYWxTdG9yYWdlKSB7XG5cdFx0XHRpZiAobG9jYWxTdG9yYWdlLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdFx0aWYgKGtleS5pbmRleE9mKCdhdXRvUGFydHMtLXJvdycpICE9IC0xKSB7XG5cdFx0XHRcdFx0bGV0IG9iaiA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KSk7XG5cdFx0XHRcdFx0ZGF0YVtvYmouaWRdID0gb2JqO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIE9iamVjdC5rZXlzKGRhdGEpLmxlbmd0aCA/IGRhdGEgOiBmYWxzZTtcblx0fVxuXG5cdC8qKlxuXHQgKiDQo9C00LDQu9C40YLRjCDQtNCw0L3QvdGL0LUg0LjQtyBsb2NhbFN0b3JhZ2Vcblx0ICogQHBhcmFtIGlkXG5cdCAqL1xuXHRkZWxldGVSb3dGcm9tTG9jYWxTdG9yYWdlKGlkKSB7XG5cdFx0aWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGBhdXRvUGFydHMtLXJvdy0ke2lkfWApKSB7XG5cdFx0XHRsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShgYXV0b1BhcnRzLS1yb3ctJHtpZH1gKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICog0J/QvtC70YPRh9C40YLRjCDRgtC10LrRgdGCINC/0L4g0LrQvtC00YMg0LTQu9GPINC/0LXRgNC10LTQsNC90L3QvtC5INC70L7QutCw0LvQuFxuXHQgKiBAcGFyYW0gbG9jYWxlIC0g0LvQvtC60LDQu9GMXG5cdCAqIEBwYXJhbSB0ZXh0IC0g0YLQtdC60YHRglxuXHQgKiBAcmV0dXJucyB7ZnVuY3Rpb24oKil9XG5cdCAqL1xuXHRnZXRUZXh0QnlMb2NhbGUobG9jYWxlID0gJ3J1JywgdGV4dCkge1xuXHRcdHJldHVybiAodGV4dCkgPT4ge1xuXHRcdFx0cmV0dXJuICh0aGlzLnRleHQgJiYgdGhpcy50ZXh0W2xvY2FsZV0gJiYgdGhpcy50ZXh0W2xvY2FsZV1bdGV4dF0pID8gdGhpcy50ZXh0W2xvY2FsZV1bdGV4dF0gOiBmYWxzZTtcblx0XHR9O1xuXHR9XG5cblx0LyoqXG5cdCAqINCf0L7Qu9GD0YfQuNGC0Ywg0YPRgdC70L7QstC90L4g0YPQvdC40LrQsNC70YzQvdGL0LkgaWRcblx0ICogQHJldHVybnMge251bWJlcn1cblx0ICovXG5cdGdlbmVyYXRlVW5pcVJvd0lEKCkge1xuXHRcdGxldCB1bmlxSUQgPSAwO1xuXHRcdGxldCBleGlzdGVkSUQgPSBbXTtcblxuXHRcdCQuZWFjaCh0aGlzLmdldFJvd3MoKSwgKGksIHJvdykgPT4ge1xuXHRcdFx0ZXhpc3RlZElELnB1c2goJChyb3cpLmF0dHIoJ2RhdGEtcm93LWlkJykpO1xuXHRcdH0pO1xuXG5cdFx0aWYgKGV4aXN0ZWRJRC5sZW5ndGgpIHtcblx0XHRcdGxldCBtYXggPSBNYXRoLm1heC5hcHBseShudWxsLCBleGlzdGVkSUQubWFwKE51bWJlcikpO1xuXHRcdFx0dW5pcUlEID0gbWF4ICsgMTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdW5pcUlEO1xuXHR9XG5cblx0LyoqXG5cdCAqINCS0YvQstC+0LTQuNGCINGB0L7QvtCx0YnQtdC90LjQtSDQsiDQuNC90YTQvtGA0LzQsNGG0LjQvtC90L3QvtC8INGC0LDQsdC70LjRh9C90L7QvCDQsdC70L7QutC1XG5cdCAqIEBwYXJhbSBtc2dcblx0ICovXG5cdHNob3dUYWJsZU5vdGlmaWNhdGlvbihtc2cgPSAnJykge1xuXHRcdGlmIChtc2cpIHtcblx0XHRcdHRoaXMuJHRhYmxlTm90eS5odG1sKG1zZyk7XG5cdFx0XHR0aGlzLiR0YWJsZVdyYXBwZXIuYWRkQ2xhc3MoJ2lzLW5vdHknKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICog0J/RgNC+0LLQtdGA0Y/QtdGCLCDQtdGB0YLRjCDQu9C4INCyINGC0LDQsdC70LjRhtC1INC00LDQvdC90YvQtSDQtNC70Y8g0L/QvtC60LDQt9CwLiDQldGB0LvQuCDQvdC10YIgLSDQstGL0LLQvtC00LjRgiDRg9Cy0LXQtNC+0LzQu9C10L3QuNC1XG5cdCAqL1xuXHR1cGRhdGVUYWJsZVZpZXdTdGF0dXMoKSB7XG5cdFx0aWYgKHRoaXMuaXNOb1Jvd3MoKSkge1xuXHRcdFx0dGhpcy5zaG93VGFibGVOb3RpZmljYXRpb24odGhpcy5nZXRUZXh0KCdlcnJvci0tZW1wdHlfZGF0YScpKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy4kdGFibGVXcmFwcGVyLnJlbW92ZUNsYXNzKCdpcy1ub3R5Jyk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqINCf0YDQvtCy0LXRgNGP0LXRgiwg0L/Rg9GB0YLQsCDQuNC7INGC0LDQsdC70LjRhtCwXG5cdCAqIEByZXR1cm5zIHtib29sZWFufVxuXHQgKi9cblx0aXNOb1Jvd3MoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0Um93cygpLmxlbmd0aCA9PSAwO1xuXHR9XG5cblx0LyoqXG5cdCAqINCR0LvQvtC60LjRgNC+0LLQutCwINGC0LDQsdC70LjRhtGLXG5cdCAqL1xuXHRsb2NrVGFibGUoKSB7XG5cdFx0dGhpcy4kdGFibGVXcmFwcGVyLmFkZENsYXNzKCdpcy1wcmVsb2FkaW5nJyk7XG5cdH1cblxuXHQvKipcblx0ICog0KDQsNC30LHQu9C+0LrQuNGA0L7QstC60LAg0YLQsNCx0LvQuNGG0Ytcblx0ICovXG5cdHVubG9ja1RhYmxlKCkge1xuXHRcdHRoaXMuJHRhYmxlV3JhcHBlci5yZW1vdmVDbGFzcygnaXMtcHJlbG9hZGluZycpO1xuXHR9XG5cblx0LyoqXG5cdCAqINCi0LDQsdC70LjRhtCwINC30LDQsdC70L7QutC40YDQvtCy0LDQvdCwP1xuXHQgKi9cblx0aXNUYWJsZUxvY2soKSB7XG5cdFx0cmV0dXJuIHRoaXMuJHRhYmxlV3JhcHBlci5oYXNDbGFzcygnaXMtcHJlbG9hZGluZycpO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQ0NhcmFtYmFDb250cm9sbGVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3BhcnRzL0NDYXJhbWJhLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==