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
			.then(() => this.cCarambaController.init());
	}
}

const cAppController = new CAppController();

$(document).ready(() => {
	cAppController.init()
		.then(() => {
			global.AC= cAppController;
		});
});
