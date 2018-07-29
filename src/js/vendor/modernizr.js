/*! modernizr 3.6.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-flexbox-flexboxlegacy-flexboxtweener-flexwrap-video-videoautoplay-videocrossorigin-videoloop-videopreload-printshiv-setclasses-cssclassprefix:feature- !*/
!(function (A, e, t) {
	function n(A, e) {
		return typeof A === e;
	} function o() {
		var A, e, t, o, r, i, a;for (var l in w) {
			if (w.hasOwnProperty(l)) {
				if (A = [], e = w[l], e.name && (A.push(e.name.toLowerCase()), e.options && e.options.aliases && e.options.aliases.length)) {
					for (t = 0;t < e.options.aliases.length;t++) {
						A.push(e.options.aliases[t].toLowerCase());
					}
				} for (o = n(e.fn, 'function') ? e.fn() : e.fn, r = 0;r < A.length;r++) {
					i = A[r], a = i.split('.'), a.length === 1 ? Modernizr[a[0]] = o : (!Modernizr[a[0]] || Modernizr[a[0]] instanceof Boolean || (Modernizr[a[0]] = new Boolean(Modernizr[a[0]])), Modernizr[a[0]][a[1]] = o), E.push((o ? '' : 'no-') + a.join('-'));
				}
			}
		}
	} function r(A) {
		var e = R.className, t = Modernizr._config.classPrefix || '';if (F && (e = e.baseVal), Modernizr._config.enableJSClass) {
			var n = new RegExp('(^|\\s)' + t + 'no-js(\\s|$)');e = e.replace(n, '$1' + t + 'js$2');
		}Modernizr._config.enableClasses && (e += ' ' + t + A.join(' ' + t), F ? R.className.baseVal = e : R.className = e);
	} function i() {
		return typeof e.createElement != 'function' ? e.createElement(arguments[0]) : F ? e.createElementNS.call(e, 'http://www.w3.org/2000/svg', arguments[0]) : e.createElement.apply(e, arguments);
	} function a(A, e) {
		if (typeof A == 'object') {
			for (var t in A) {
				B(A, t) && a(t, A[t]);
			}
		} else {
			A = A.toLowerCase();var n = A.split('.'), o = Modernizr[n[0]];if (n.length == 2 && (o = o[n[1]]), typeof o != 'undefined') {
				return Modernizr;
			}e = typeof e == 'function' ? e() : e, n.length == 1 ? Modernizr[n[0]] = e : (!Modernizr[n[0]] || Modernizr[n[0]] instanceof Boolean || (Modernizr[n[0]] = new Boolean(Modernizr[n[0]])), Modernizr[n[0]][n[1]] = e), r([(e && e != 0 ? '' : 'no-') + n.join('-')]), Modernizr._trigger(A, e);
		} return Modernizr;
	} function l(A, e) {
		return Boolean(~(String(A)).indexOf(e));
	} function s(A) {
		return A.replace(/([a-z])-([a-z])/g, function (A, e, t) {
			return e + t.toUpperCase();
		}).replace(/^-/, '');
	} function c(A, e) {
		return function () {
			return A.apply(e, arguments);
		};
	} function d(A, e, t) {
		var o;for (var r in A) {
			if (A[r] in e) {
				return t === !1 ? A[r] : (o = e[A[r]], n(o, 'function') ? c(o, t || e) : o);
			}
		} return !1;
	} function u(A) {
		return A.replace(/([A-Z])/g, function (A, e) {
			return '-' + e.toLowerCase();
		}).replace(/^ms-/, '-ms-');
	} function f(e, t, n) {
		var o;if ('getComputedStyle' in A) {
			o = getComputedStyle.call(A, e, t);var r = A.console;if (o !== null) {
				n && (o = o.getPropertyValue(n));
			} else if (r) {
				var i = r.error ? 'error' : 'log';r[i].call(r, 'getComputedStyle returning null, its possible modernizr test results are inaccurate');
			}
		} else {
			o = !t && e.currentStyle && e.currentStyle[n];
		} return o;
	} function p() {
		var A = e.body;return A || (A = i(F ? 'svg' : 'body'), A.fake = !0), A;
	} function h(A, t, n, o) {
		var r, a, l, s, c = 'modernizr', d = i('div'), u = p();if (parseInt(n, 10)) {
			for (;n--;) {
				l = i('div'), l.id = o ? o[n] : c + (n + 1), d.appendChild(l);
			}
		} return r = i('style'), r.type = 'text/css', r.id = 's' + c, (u.fake ? u : d).appendChild(r), u.appendChild(d), r.styleSheet ? r.styleSheet.cssText = A : r.appendChild(e.createTextNode(A)), d.id = c, u.fake && (u.style.background = '', u.style.overflow = 'hidden', s = R.style.overflow, R.style.overflow = 'hidden', R.appendChild(u)), a = t(d, A), u.fake ? (u.parentNode.removeChild(u), R.style.overflow = s, R.offsetHeight) : d.parentNode.removeChild(d), Boolean(a);
	} function m(e, n) {
		var o = e.length;if ('CSS' in A && 'supports' in A.CSS) {
			for (;o--;) {
				if (A.CSS.supports(u(e[o]), n)) {
					return !0;
				}
			} return !1;
		} if ('CSSSupportsRule' in A) {
			for (var r = [];o--;) {
				r.push('(' + u(e[o]) + ':' + n + ')');
			} return r = r.join(' or '), h('@supports (' + r + ') { #modernizr { position: absolute; } }', function (A) {
				return f(A, null, 'position') == 'absolute';
			});
		} return t;
	} function g(A, e, o, r) {
		function a() {
			d && (delete Q.style, delete Q.modElem);
		} if (r = n(r, 'undefined') ? !1 : r, !n(o, 'undefined')) {
			var c = m(A, o);if (!n(c, 'undefined')) {
				return c;
			}
		} for (var d, u, f, p, h, g = ['modernizr', 'tspan', 'samp'];!Q.style && g.length;) {
			d = !0, Q.modElem = i(g.shift()), Q.style = Q.modElem.style;
		} for (f = A.length, u = 0;f > u;u++) {
			if (p = A[u], h = Q.style[p], l(p, '-') && (p = s(p)), Q.style[p] !== t) {
				if (r || n(o, 'undefined')) {
					return a(), e == 'pfx' ? p : !0;
				} try {
					Q.style[p] = o;
				} catch (v) {} if (Q.style[p] != h) {
					return a(), e == 'pfx' ? p : !0;
				}
			}
		} return a(), !1;
	} function v(A, e, t, o, r) {
		var i = A.charAt(0).toUpperCase() + A.slice(1), a = (A + ' ' + x.join(i + ' ') + i).split(' ');return n(e, 'string') || n(e, 'undefined') ? g(a, e, o, r) : (a = (A + ' ' + C.join(i + ' ') + i).split(' '), d(a, e, t));
	} function y(A, e, n) {
		return v(A, t, t, e, n);
	} var E = [], w = [], T = {_version: '3.6.0', _config: {classPrefix: 'feature-', enableClasses: !0, enableJSClass: !0, usePrefixes: !0}, _q: [], on: function (A, e) {
			var t = this;setTimeout(function () {
				e(t[A]);
			}, 0);
		}, addTest: function (A, e, t) {
			w.push({name: A, fn: e, options: t});
		}, addAsyncTest: function (A) {
			w.push({name: null, fn: A});
		}}, Modernizr = function () {};Modernizr.prototype = T, Modernizr = new Modernizr;var R = e.documentElement, F = R.nodeName.toLowerCase() === 'svg';F || !(function (A, e) {
		function t(A, e) {
			var t = A.createElement('p'), n = A.getElementsByTagName('head')[0] || A.documentElement;return t.innerHTML = 'x<style>' + e + '</style>', n.insertBefore(t.lastChild, n.firstChild);
		} function n() {
			var A = F.elements;return typeof A == 'string' ? A.split(' ') : A;
		} function o(A, e) {
			var t = F.elements;typeof t != 'string' && (t = t.join(' ')), typeof A != 'string' && (A = A.join(' ')), F.elements = t + ' ' + A, s(e);
		} function r(A) {
			var e = R[A[w]];return e || (e = {}, T++, A[w] = T, R[T] = e), e;
		} function i(A, t, n) {
			if (t || (t = e), m) {
				return t.createElement(A);
			}n || (n = r(t));var o;return o = n.cache[A] ? n.cache[A].cloneNode() : E.test(A) ? (n.cache[A] = n.createElem(A)).cloneNode() : n.createElem(A), !o.canHaveChildren || y.test(A) || o.tagUrn ? o : n.frag.appendChild(o);
		} function a(A, t) {
			if (A || (A = e), m) {
				return A.createDocumentFragment();
			}t = t || r(A);for (var o = t.frag.cloneNode(), i = 0, a = n(), l = a.length;l > i;i++) {
				o.createElement(a[i]);
			} return o;
		} function l(A, e) {
			e.cache || (e.cache = {}, e.createElem = A.createElement, e.createFrag = A.createDocumentFragment, e.frag = e.createFrag()), A.createElement = function (t) {
				return F.shivMethods ? i(t, A, e) : e.createElem(t);
			}, A.createDocumentFragment = Function('h,f', 'return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(' + n().join().replace(/[\w\-:]+/g, function (A) {
				return e.createElem(A), e.frag.createElement(A), 'c("' + A + '")';
			}) + ');return n}')(F, e.frag);
		} function s(A) {
			A || (A = e);var n = r(A);return !F.shivCSS || h || n.hasCSS || (n.hasCSS = Boolean(t(A, 'article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}'))), m || l(A, n), A;
		} function c(A) {
			for (var e, t = A.getElementsByTagName('*'), o = t.length, r = RegExp('^(?:' + n().join('|') + ')$', 'i'), i = [];o--;) {
				e = t[o], r.test(e.nodeName) && i.push(e.applyElement(d(e)));
			} return i;
		} function d(A) {
			for (var e, t = A.attributes, n = t.length, o = A.ownerDocument.createElement(G + ':' + A.nodeName);n--;) {
				e = t[n], e.specified && o.setAttribute(e.nodeName, e.nodeValue);
			} return o.style.cssText = A.style.cssText, o;
		} function u(A) {
			for (var e, t = A.split('{'), o = t.length, r = RegExp('(^|[\\s,>+~])(' + n().join('|') + ')(?=[[\\s,>+~#.:]|$)', 'gi'), i = '$1' + G + '\\:$2';o--;) {
				e = t[o] = t[o].split('}'), e[e.length - 1] = e[e.length - 1].replace(r, i), t[o] = e.join('}');
			} return t.join('{');
		} function f(A) {
			for (var e = A.length;e--;) {
				A[e].removeNode();
			}
		} function p(A) {
			function e() {
				clearTimeout(i._removeSheetTimer), n && n.removeNode(!0), n = null;
			} var n, o, i = r(A), a = A.namespaces, l = A.parentWindow;return !x || A.printShived ? A : (typeof a[G] == 'undefined' && a.add(G), l.attachEvent('onbeforeprint', function () {
				e();for (var r, i, a, l = A.styleSheets, s = [], d = l.length, f = Array(d);d--;) {
					f[d] = l[d];
				} for (;a = f.pop();) {
					if (!a.disabled && B.test(a.media)) {
						try {
							r = a.imports, i = r.length;
						} catch (p) {
							i = 0;
						} for (d = 0;i > d;d++) {
							f.push(r[d]);
						} try {
							s.push(a.cssText);
						} catch (p) {}
					}
				}s = u(s.reverse().join('')), o = c(A), n = t(A, s);
			}), l.attachEvent('onafterprint', function () {
				f(o), clearTimeout(i._removeSheetTimer), i._removeSheetTimer = setTimeout(e, 500);
			}), A.printShived = !0, A);
		} var h, m, g = '3.7.3', v = A.html5 || {}, y = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i, E = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i, w = '_html5shiv', T = 0, R = {};!(function () {
			try {
				var A = e.createElement('a');A.innerHTML = '<xyz></xyz>', h = 'hidden' in A, m = A.childNodes.length == 1 || (function () {
					e.createElement('a');var A = e.createDocumentFragment();return typeof A.cloneNode == 'undefined' || typeof A.createDocumentFragment == 'undefined' || typeof A.createElement == 'undefined';
				}());
			} catch (t) {
				h = !0, m = !0;
			}
		}());var F = {elements: v.elements || 'abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video', version: g, shivCSS: v.shivCSS !== !1, supportsUnknownElements: m, shivMethods: v.shivMethods !== !1, type: 'default', shivDocument: s, createElement: i, createDocumentFragment: a, addElements: o};A.html5 = F, s(e);var B = /^$|\b(?:all|print)\b/, G = 'html5shiv', x = !m && (function () {
			var t = e.documentElement;return !(typeof e.namespaces == 'undefined' || typeof e.parentWindow == 'undefined' || typeof t.applyElement == 'undefined' || typeof t.removeNode == 'undefined' || typeof A.attachEvent == 'undefined');
		}());F.type += ' print', F.shivPrint = p, p(e), typeof module == 'object' && module.exports && (module.exports = F);
	}(typeof A != 'undefined' ? A : this, e)), Modernizr.addTest('video', function () {
		var A = i('video'), e = !1;try {
			e = Boolean(A.canPlayType), e && (e = new Boolean(e), e.ogg = A.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ''), e.h264 = A.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ''), e.webm = A.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, ''), e.vp9 = A.canPlayType('video/webm; codecs="vp9"').replace(/^no$/, ''), e.hls = A.canPlayType('application/x-mpegURL; codecs="avc1.42E01E"').replace(/^no$/, ''));
		} catch (t) {} return e;
	}), Modernizr.addTest('videocrossorigin', 'crossOrigin' in i('video')), Modernizr.addTest('videoloop', 'loop' in i('video')), Modernizr.addTest('videopreload', 'preload' in i('video'));var B;!(function () {
		var A = {}.hasOwnProperty;B = n(A, 'undefined') || n(A.call, 'undefined') ? function (A, e) {
			return e in A && n(A.constructor.prototype[e], 'undefined');
		} : function (e, t) {
			return A.call(e, t);
		};
	}()), T._l = {}, T.on = function (A, e) {
		this._l[A] || (this._l[A] = []), this._l[A].push(e), Modernizr.hasOwnProperty(A) && setTimeout(function () {
			Modernizr._trigger(A, Modernizr[A]);
		}, 0);
	}, T._trigger = function (A, e) {
		if (this._l[A]) {
			var t = this._l[A];setTimeout(function () {
				var A, n;for (A = 0;A < t.length;A++) {
					(n = t[A])(e);
				}
			}, 0), delete this._l[A];
		}
	}, Modernizr._q.push(function () {
		T.addTest = a;
	}), Modernizr.addAsyncTest(function () {
		function A(i) {
			o++, clearTimeout(e);var l = i && i.type === 'playing' || r.currentTime !== 0;return !l && n > o ? void (e = setTimeout(A, t)) : (r.removeEventListener('playing', A, !1), a('videoautoplay', l), void (r.parentNode && r.parentNode.removeChild(r)));
		} var e, t = 200, n = 5, o = 0, r = i('video'), l = r.style;if (!(Modernizr.video && 'autoplay' in r)) {
			return void a('videoautoplay', !1);
		}l.position = 'absolute', l.height = 0, l.width = 0;try {
			if (Modernizr.video.ogg) {
				r.src = 'data:video/ogg;base64,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';
			} else {
				if (!Modernizr.video.h264) {
					return void a('videoautoplay', !1);
				}r.src = 'data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAAAs1tZGF0AAACrgYF//+q3EXpvebZSLeWLNgg2SPu73gyNjQgLSBjb3JlIDE0OCByMjYwMSBhMGNkN2QzIC0gSC4yNjQvTVBFRy00IEFWQyBjb2RlYyAtIENvcHlsZWZ0IDIwMDMtMjAxNSAtIGh0dHA6Ly93d3cudmlkZW9sYW4ub3JnL3gyNjQuaHRtbCAtIG9wdGlvbnM6IGNhYmFjPTEgcmVmPTMgZGVibG9jaz0xOjA6MCBhbmFseXNlPTB4MzoweDExMyBtZT1oZXggc3VibWU9NyBwc3k9MSBwc3lfcmQ9MS4wMDowLjAwIG1peGVkX3JlZj0xIG1lX3JhbmdlPTE2IGNocm9tYV9tZT0xIHRyZWxsaXM9MSA4eDhkY3Q9MSBjcW09MCBkZWFkem9uZT0yMSwxMSBmYXN0X3Bza2lwPTEgY2hyb21hX3FwX29mZnNldD0tMiB0aHJlYWRzPTEgbG9va2FoZWFkX3RocmVhZHM9MSBzbGljZWRfdGhyZWFkcz0wIG5yPTAgZGVjaW1hdGU9MSBpbnRlcmxhY2VkPTAgYmx1cmF5X2NvbXBhdD0wIGNvbnN0cmFpbmVkX2ludHJhPTAgYmZyYW1lcz0zIGJfcHlyYW1pZD0yIGJfYWRhcHQ9MSBiX2JpYXM9MCBkaXJlY3Q9MSB3ZWlnaHRiPTEgb3Blbl9nb3A9MCB3ZWlnaHRwPTIga2V5aW50PTI1MCBrZXlpbnRfbWluPTEwIHNjZW5lY3V0PTQwIGludHJhX3JlZnJlc2g9MCByY19sb29rYWhlYWQ9NDAgcmM9Y3JmIG1idHJlZT0xIGNyZj0yMy4wIHFjb21wPTAuNjAgcXBtaW49MCBxcG1heD02OSBxcHN0ZXA9NCBpcF9yYXRpbz0xLjQwIGFxPTE6MS4wMACAAAAAD2WIhAA3//728P4FNjuZQQAAAu5tb292AAAAbG12aGQAAAAAAAAAAAAAAAAAAAPoAAAAZAABAAABAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAACGHRyYWsAAABcdGtoZAAAAAMAAAAAAAAAAAAAAAEAAAAAAAAAZAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAAgAAAAIAAAAAACRlZHRzAAAAHGVsc3QAAAAAAAAAAQAAAGQAAAAAAAEAAAAAAZBtZGlhAAAAIG1kaGQAAAAAAAAAAAAAAAAAACgAAAAEAFXEAAAAAAAtaGRscgAAAAAAAAAAdmlkZQAAAAAAAAAAAAAAAFZpZGVvSGFuZGxlcgAAAAE7bWluZgAAABR2bWhkAAAAAQAAAAAAAAAAAAAAJGRpbmYAAAAcZHJlZgAAAAAAAAABAAAADHVybCAAAAABAAAA+3N0YmwAAACXc3RzZAAAAAAAAAABAAAAh2F2YzEAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAgACAEgAAABIAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY//8AAAAxYXZjQwFkAAr/4QAYZ2QACqzZX4iIhAAAAwAEAAADAFA8SJZYAQAGaOvjyyLAAAAAGHN0dHMAAAAAAAAAAQAAAAEAAAQAAAAAHHN0c2MAAAAAAAAAAQAAAAEAAAABAAAAAQAAABRzdHN6AAAAAAAAAsUAAAABAAAAFHN0Y28AAAAAAAAAAQAAADAAAABidWR0YQAAAFptZXRhAAAAAAAAACFoZGxyAAAAAAAAAABtZGlyYXBwbAAAAAAAAAAAAAAAAC1pbHN0AAAAJal0b28AAAAdZGF0YQAAAAEAAAAATGF2ZjU2LjQwLjEwMQ==';
			}
		} catch (s) {
			return void a('videoautoplay', !1);
		}r.setAttribute('autoplay', ''), l.cssText = 'display:none', R.appendChild(r), setTimeout(function () {
			r.addEventListener('playing', A, !1), e = setTimeout(A, t);
		}, 0);
	});var G = 'Moz O ms Webkit', x = T._config.usePrefixes ? G.split(' ') : [];T._cssomPrefixes = x;var C = T._config.usePrefixes ? G.toLowerCase().split(' ') : [];T._domPrefixes = C;var b = {elem: i('modernizr')};Modernizr._q.push(function () {
		delete b.elem;
	});var Q = {style: b.elem.style};Modernizr._q.unshift(function () {
		delete Q.style;
	}), T.testAllProps = v, T.testAllProps = y, Modernizr.addTest('flexbox', y('flexBasis', '1px', !0)), Modernizr.addTest('flexboxlegacy', y('boxDirection', 'reverse', !0)), Modernizr.addTest('flexboxtweener', y('flexAlign', 'end', !0)), Modernizr.addTest('flexwrap', y('flexWrap', 'wrap', !0)), o(), r(E), delete T.addTest, delete T.addAsyncTest;for (var S = 0;S < Modernizr._q.length;S++) {
		Modernizr._q[S]();
	}A.Modernizr = Modernizr;
}(window, document));
