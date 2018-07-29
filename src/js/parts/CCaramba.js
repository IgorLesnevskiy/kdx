const CTools = require('./CTools');

/**
 * Контроллер для работы с подргрузкой и обновлением табличных данных об автомобилях
 * Т.к. по одной странице нельзя ничего сказать о всем проекте в целом, то данный контроллер
 * служит скорее для демонстрацинных целей и заточен под работу с конкретными данными и конкретнйо формой
 */
class CCarambaController {
	constructor() {
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
				'currency': 'руб.',
			},
			'en': {

			}
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
			'scaffold': `
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
			'optional': {
				'description': `<div class="description">{{description}}</div>`,
				'colorBox': `<div class="i-color-box" style="background-color: {{colorCode}}"></div>`,
			}
		};

		this.$tableWrapper = null;
	}

	init() {
		this.$tableWrapper = $('#caramba-table');

		if (this.$tableWrapper.length) {
			this.$tableRowContainer = this.$tableWrapper.find('.js-body');
			this.$tableNoty = this.$tableWrapper.find('.js-noty');
			this.$tableSummaryPrice = this.$tableWrapper.find('.js-summary-price');

			this.initDeleteTrigger();

			this.lockTable();

			this.loadData()
				.then((data) => {
					return Promise.resolve()
						.delay(1000) //эмуляция долго ответа
						.then(() => {
							if (Object.keys(data).length) {
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
				})
		}
	}

	loadData() {
		return new Promise((resolve, reject) => {
			$.ajax({
				url: this.loadUrl,
				data: {

				},
				dataType: 'json',
				success: (data) => {
					resolve(data);
				},
				error: (jqXHR, textStatus, error) => {
					reject('false');
				}
			})
		});
	}

	lockTable() {}

	/**
	 * Вывод данных в шаблонную строку и добавление данныех
	 * Дальнейшее развитие - дополнительная безопасная обработка данных с серва
	 * @param data
	 * @param bAppend - не очищать существующие данные в таблице
	 */
	updateTableWithData(data, bAppend = false) {
		let resultMarkup = [];

		for (let row in data) {
			if (data.hasOwnProperty(row)) {
				//нет смыслы выводить строку, если отстутсвует ID или TITLE
				if (data[row].id && data[row].title) {
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
			this.$tableRowContainer.append(resultMarkup.join(''));
		}

		this.updateSummaryPrice();
	}

	updateSummaryPrice() {
		let summaryPrice = 0;

		$.each(this.getRows(), (i, row) => {
			let $row = $(row);
			let price = ($row.find('.js-price-with-tax').length)
				? $row.find('.js-price-with-tax').attr('data-original-price-with-tax')
				: $row.find('.js-price').attr('data-original-price');

			if (price) {
				summaryPrice = Number(summaryPrice) + Number(price);
			}
		});

		this.$tableSummaryPrice.html(`${CTools.formatMoney(Number(summaryPrice), this.locale)} ${this.getText('currency')}`)
	}

	getRows() {
		return this.$tableRowContainer.find('[data-row-id]');
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
		}
	}

	lockTable() {
		this.$tableWrapper.addClass('is-preloading');
	}

	unlockTable() {
		this.$tableWrapper.removeClass('is-preloading');
	}

	isTableLock() {}

	/**
	 * Выводит сообщение в блоке вместо
	 * @param msg
	 */
	showTableNotification(msg = '') {
		if (msg) {
			this.$tableNoty.html(msg);
			this.$tableWrapper.addClass('is-noty');
		}
	}

	isNoRows() {
		return this.getRows().length == 0;
	}

	initDeleteTrigger() {
		this.$tableWrapper.on('click', '.js-delete-trigger', (e) => {
			let $this = $(e.currentTarget);
			let $row = $this.closest('[data-row-id]');

			if ($row.length) {
				this.lockTable();

				Promise.resolve()
					.delay(100) //чисто для демонстрации работы с сервером
					.then(() => {
						$row.remove();

						if (this.isNoRows()) {
							this.showTableNotification(this.getText('error--empty_data'));
						}

						this.updateSummaryPrice();
						this.unlockTable();
					})
			}
		})
	}
}

module.exports = CCarambaController;
