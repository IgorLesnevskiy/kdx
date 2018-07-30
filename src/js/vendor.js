//modernizr
require('./vendor/modernizr');
//jQuery
require('expose-loader?$!expose-loader?jquery!expose-loader?jQuery!jquery/dist/jquery.min.js');
//Bluebird
require('expose-loader?Promise!bluebird');
//Velocity-animate
require('expose-loader?Velocity!velocity-animate/velocity.min.js');
//Parsley

require('expose-loader?Parsley!parsleyjs/dist/parsley.min.js');
require('parsleyjs/dist/i18n/ru.js');

//jquery-mask-plugin
// require('./vendor/jquery.mask.plugin.min');
