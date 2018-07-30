const CCarambaController = require('./parts/CCaramba');
const CTools = require('./parts/CTools');

/**
 * Главный контроллер
 */
class CAppController {
	constructor() {
		this.cCarambaController = new CCarambaController();
		this.cTools = new CTools();

		$.fn.parsley = function (options) {
			if (this.length > 1) {
				var instances = [];

				this.each(function () {
					instances.push($(this).parsley(options));
				});

				return instances;
			}

			// Return undefined if applied to non existing DOM element
			if (this.length == 0) {
				return;
			}

			return new Parsley.Factory(this[0], options);
		};
	}

	init() {
		return Promise.resolve()
			.then(() => {
				this.initSmartLabels();

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
}

const cAppController = new CAppController();

$(document).ready(() => {
	cAppController.init()
		.then(() => {
			global.AC = cAppController;
		});
});
