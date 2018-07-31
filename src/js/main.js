const CCarambaController = require('./parts/CCaramba');
const CTools = require('./parts/CTools');

Promise.config({
	// Enable warnings
	warnings: !production,
	// Enable long stack traces
	longStackTraces: !production,
	// Enable cancellation
	cancellation: !production,
	// Enable monitoring
	monitoring: !production
});

/**
 * Главный контроллер
 */
class CAppController {
	constructor() {
		this.cCarambaController = new CCarambaController();
		this.cTools = new CTools();
	}

	init() {
		return Promise.resolve()
			.then(() => {

				this.initSmartLabels();
				this.initCustomSelects();
				this.initMasks();
				this.initCustomFormValidators();

				this.cCarambaController.init();
			});
	}

	/**
	 * Инициализация умных плейсхолдеров
	 */
	initSmartLabels() {
		const $smartLabels = $('.js-smart-label--input');

		if ($smartLabels.length) {
			$smartLabels.on('blur', function () {
				let $this = $(this);

				$this.toggleClass('is-fill', $this.val() !== '');
			}).blur();
		}
	}

	/**
	 * Инициализация кастомных селектов
	 */
	initCustomSelects() {
		const $selects = $('[data-is-custom-select]');

		if ($selects.length) {
			$selects.select2({

			});
		}
	}

	/**
	 * Кастомные типы валидаций
	 */
	initCustomFormValidators() {
		window.Parsley.addValidator('productionYear', {
			validateString: function(value) {
				return Number(value) >= 1980 && Number(value) <= new Date().getFullYear();
			},
			messages: {
				ru: `Год может быть задан от 1980 до ${new Date().getFullYear()}`
			}
		});

	}

	/**
	 * Маски
	 */
	initMasks() {
		let $yearMask = $('[data-year-mask]');
		let $moneyMask = $('[data-money-mask]');

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
}

const cAppController = new CAppController();

$(document).ready(() => {
	cAppController.init()
		.then(() => {
			//выбрасываем в global для доступа
			global.AC = cAppController;
		});
});
