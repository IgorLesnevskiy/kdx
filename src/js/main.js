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
}

const cAppController = new CAppController();

$(document).ready(() => {
	cAppController.init()
		.then(() => {
			//выбрасываем в global для доступа
			global.AC = cAppController;
		});
});
