//modernizr
require('./vendor/modernizr');

//jQuery
require('expose-loader?$!expose-loader?jquery!expose-loader?jQuery!expose-loader?window.jQuery!jquery/dist/jquery.min.js');
//Bluebird
require('expose-loader?Promise!bluebird');
//Parsley
require("parsleyjs");
require('parsleyjs/dist/i18n/ru.js');
//Select2
require('expose-loader?Select2!select2');

require('jquery-mask-plugin');
require('./vendor/jquery.maskMoney.js');

