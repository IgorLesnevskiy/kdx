const CTools = require('./CTools');

/**
 * Контроллер для работы с подргрузкой и обновлением табличных данных об автомобилях
 * Т.к. по одной странице нельзя ничего сказать о всем проекте в целом, то данный контроллер
 * служит скорее для демонстрацинных целей и заточен под работу с конкретными данными и конкретнйо формой
 */
class CCarambaController {
	constructor() {
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
			en: {

			}
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
			scaffold: `
				<div class="b-custom-table__row" data-row-id="{{id}}">
				  <div class="b-custom-table__cell b-custom-table__cell--title">
				    <div class="title">{{title}}</div>
				    {{optionalDescription}}
				  </div>
				  <div class="b-custom-table__cell b-custom-table__cell--year">{{year}}</div>
				  <div class="b-custom-table__cell b-custom-table__cell--color">
				    {{optionalColorbox}}
				  </div>
				  <div class="b-custom-table__cell b-custom-table__cell--status">{{status}}</div>
				  <div class="b-custom-table__cell b-custom-table__cell--price">
				    <nobr class="price js-price" data-original-price="{{price}}">{{formattedPrice}}</nobr>
				    <nobr class="price-with-tax js-price-with-tax" data-original-price-with-tax="{{priceWithTax}}">{{formattedPriceWithTax}} (+13%)</nobr>
				  </div>
				  <div class="b-custom-table__cell b-custom-table__cell--action">
				    <button class="i-button i-button--ellipse i-button--size-small js-delete-trigger">{{removeButtonText}}</button>
				  </div>
				</div>
			`,
			optional: {
				description: `<div class="description">{{description}}</div>`,
				colorBox: `<div class="i-color-box" style="background-color: {{colorCode}}"></div>`,
			}
		};

		this.$tableWrapper = null;
	}

	/**
	 * Инициализация логики работы контроллера
	 */
	init() {
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
			this.loadData()
				.then((data) => {
					return Promise.resolve()
						.delay(1000) //эмуляция долгого ответа от сервера
						.then(() => {
							if (Object.keys(data).length) {
								//обновление данных в таблицк
								this.updateTableWithData(data);
							} else {
								this.showTableNotification(this.getText('error--empty_data'));
							}
						});
				})
				.then(() => {
					this.unlockTable();
				})
				.catch((msg) => {
					//TODO обработка ошибок
					this.showTableNotification(this.getText('error--load_error'));
				});
		}
	}

	/**
	 * Инициализация работы с формой
	 */
	initForm() {
		this.$form.parsley()
			.on('form:submit', (form) => {
				let data = {};

				if (this.isTableLock()) {
					return false;
				}

				this.lockTable();

				//обходим все поля формы и собираем данные
				for (let field in form.fields) {
					if (form.fields.hasOwnProperty(field)) {
						let fieldName = form.fields[field].$element.attr('data-field-type');

						data[fieldName] = form.fields[field].getValue();
					}
				}

				//получаем условно уникальный ID для нового элемента
				data.id = this.generateUniqRowID();

				let preparedData = [];
				preparedData.push(data);

				//добавляем элементв в локальное хранилищец
				this.addRowToLocalStorage(data);

				//обновление
				this.updateTableWithData(preparedData, true);

				this.resetForm(form);

				this.unlockTable();

				return false;
			});
	}

	/**
	 * Сбросить поля в форме
	 * @param parsleyForm
	 */
	resetForm(parsleyForm) {
		let $form = $(parsleyForm.$element);
		let $customSelects = $form.find('[data-is-custom-select]');

		//сбрасываем значения форм
		parsleyForm.$element[0].reset();
		$form.parsley().reset();

		//обходим все поля формы и сбрасываем заполненность полей
		for (let field in parsleyForm.fields) {
			if (parsleyForm.fields.hasOwnProperty(field)) {
				parsleyForm.fields[field].$element.removeClass('is-fill');
			}
		}

		if ($customSelects.length) {
			$.each($customSelects, (i, select) => {
				$(select).val('').trigger('change');
			});
		}
	}


	/**
	 * Инициализация логики удаления строк из таблицы
	 */
	initDeleteTrigger() {
		this.$tableWrapper.on('click', '.js-delete-trigger', (e) => {
			let $this = $(e.currentTarget);
			let $row = $this.closest('[data-row-id]');

			if ($row.length) {
				let rowID = $row.attr('data-row-id');

				this.lockTable();

				Promise.resolve()
					.delay(100) //чисто для демонстрации работы с сервером
					.then(() => {
						$row.remove();
						this.deleteRowFromLocalStorage(rowID);
						this.updateTableViewStatus();
						this.updateSummaryPrice();
						this.unlockTable();
					});
			}
		});
	}

	/**
	 * Подгрузка данный с удаленного источника
	 * @returns {Promise.<TResult>}
	 */
	loadData() {
		return new Promise((resolve, reject) => {
			$.ajax({
				url: this.loadUrl,
				data: {},
				dataType: 'json',
				success: (data) => {
					resolve(data);
				},
				error: (jqXHR, textStatus, error) => {
					reject();
				}
			});
		})
			.then((data) => {
				let localData = this.getAllRowsFromLocalStorage();

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
	updateTableWithData(data, bAppend = false) {
		let resultMarkup = [];

		for (let row in data) {
			if (data.hasOwnProperty(row)) {
				//нет смыслы выводить строку, если отстутсвует ID или TITLE
				if (typeof data[row].id != 'undefined' && typeof data[row].title != 'undefined') {
					let rowMarkup = this.markupTemplate.scaffold;

					for (let fieldName in data[row]) {
						if (data[row].hasOwnProperty(fieldName)) {
							let value = data[row][fieldName];

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

								let statusText = this.getText(`status--${value}`);
								rowMarkup = rowMarkup.replace(/{{status}}/g, (statusText) ? statusText : '-');
							}

							if (fieldName == 'price') {
								let price = value;
								let priceWithTax = CTools.getPriceWithTax(value, this.tax);
								let formattedPrice = CTools.formatMoney(value, this.locale);
								let formattedPriceWithTax = CTools.formatMoney(CTools.getPriceWithTax(value, this.tax), this.locale);

								rowMarkup = rowMarkup.replace(/{{price}}/g, price);
								rowMarkup = rowMarkup.replace(/{{formattedPrice}}/g, `${formattedPrice} ${this.getText('currency')}`);
								rowMarkup = rowMarkup.replace(/{{priceWithTax}}/g, priceWithTax);
								rowMarkup = rowMarkup.replace(/{{formattedPriceWithTax}}/g, `${formattedPriceWithTax} ${this.getText('currency')}`);
							}
						}
					}

					rowMarkup = rowMarkup
						.replace(/{{optionalDescription}}/g, '')
						.replace(/{{optionalColorbox}}/g, '')
						.replace(/{{removeButtonText}}/g, this.getText('remove_button_text'));

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
	updateSummaryPrice() {
		let summaryPrice = 0;

		$.each(this.getRows(), (i, row) => {
			let $row = $(row);
			let price = ($row.find('.js-price-with-tax').length)
				? $row.find('.js-price-with-tax').attr('data-original-price-with-tax')
				: $row.find('.js-price').attr('data-original-price');

			if (price) {
				if (!isNaN(summaryPrice) && !isNaN(price)) {
					summaryPrice = Number(summaryPrice) + Number(price);
				}
			}
		});

		this.$tableSummaryPrice.html(`${CTools.formatMoney(Number(summaryPrice), this.locale)} ${this.getText('currency')}`);
	}

	/**
	 * Получить все строки из таблицы
	 */
	getRows() {
		return this.$tableRowContainer.find('[data-row-id]');
	}

	/**
	 * Добавить данные о записи в localStorage
	 * @param data
	 */
	addRowToLocalStorage(data) {
		if (data && data.id && localStorage) {
			localStorage.setItem(`autoParts--row-${data.id}`, JSON.stringify(data));
		}
	}

	/**
	 * Получить данные из localStorage
	 * @returns {*}
	 */
	getAllRowsFromLocalStorage() {
		let data = {};

		if (!localStorage) {
			return false;
		}

		for (let key in localStorage) {
			if (localStorage.hasOwnProperty(key)) {
				if (key.indexOf('autoParts--row') != -1) {
					let obj = JSON.parse(localStorage.getItem(key));
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
	deleteRowFromLocalStorage(id) {
		if (localStorage.getItem(`autoParts--row-${id}`)) {
			localStorage.removeItem(`autoParts--row-${id}`);
		}
	}

	/**
	 * Получить текст по коду для переданной локали
	 * @param locale - локаль
	 * @param text - текст
	 * @returns {function(*)}
	 */
	getTextByLocale(locale = 'ru', text) {
		return (text) => {
			return (this.text && this.text[locale] && this.text[locale][text]) ? this.text[locale][text] : false;
		};
	}

	/**
	 * Получить условно уникальный id
	 * @returns {number}
	 */
	generateUniqRowID() {
		let uniqID = 0;
		let existedID = [];

		$.each(this.getRows(), (i, row) => {
			existedID.push($(row).attr('data-row-id'));
		});

		if (existedID.length) {
			let max = Math.max.apply(null, existedID.map(Number));
			uniqID = max + 1;
		}

		return uniqID;
	}

	/**
	 * Выводит сообщение в информационном табличном блоке
	 * @param msg
	 */
	showTableNotification(msg = '') {
		if (msg) {
			this.$tableNoty.html(msg);
			this.$tableWrapper.addClass('is-noty');
		}
	}

	/**
	 * Проверяет, есть ли в таблице данные для показа. Если нет - выводит уведомление
	 */
	updateTableViewStatus() {
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
	isNoRows() {
		return this.getRows().length == 0;
	}

	/**
	 * Блокировка таблицы
	 */
	lockTable() {
		this.$tableWrapper.addClass('is-preloading');
	}

	/**
	 * Разблокировка таблицы
	 */
	unlockTable() {
		this.$tableWrapper.removeClass('is-preloading');
	}

	/**
	 * Таблица заблокирована?
	 */
	isTableLock() {
		return this.$tableWrapper.hasClass('is-preloading');
	}
}

module.exports = CCarambaController;
