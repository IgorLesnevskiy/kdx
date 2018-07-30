/**
 * Вспомогательные функции
 */
class CTools {
	constructor() {}

	/**
	 * клонирование объекта без привязки по ссылке
	 * @param object
	 */
	static cloneObject(object = {}) {
		return JSON.parse(JSON.stringify(object));
	}

	/**
	 * Форматироание строки в денежный вид
	 * @param price
	 * @param locale
	 * @returns {*}
	 */
	static formatMoney(price, locale = 'ru') {
		let nPrice = Number(price);

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
	static getPriceWithTax(price, tax = 13, precision = 0) {
		let nPrice = Number(price);
		let nTax = Number(tax);

		if (!isNaN(nPrice) && !isNaN(nTax)) {
			let priceWithTax = ((nPrice * nTax / 100) + nPrice);
			return (priceWithTax % 1 === 0) ? priceWithTax : priceWithTax.toFixed(precision);
		} else {
			return price;
		}
	}
}

module.exports = CTools;
