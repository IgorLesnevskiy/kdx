const CCarambaController = require('./parts/CCaramba');
const CTools = require('./parts/CTools');

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
	 * Инициализац
	 */
	initCustomSelects() {
		const $selects = $('[data-is-custom-select]');

		if ($selects.length) {
			$selects.select2({

			})
		}
	}
}

const cAppController = new CAppController();

$(document).ready(() => {
	cAppController.init()
		.then(() => {
			global.AC = cAppController;
		});
});
