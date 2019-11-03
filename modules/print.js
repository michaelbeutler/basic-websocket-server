const moment = require('moment');
const config = require('../config');
const utils = require('./utils');

module.exports = {
    info: (txt) => {
        console.log(`${moment().format(config.log.timeFormat)} - ${txt}`);
    },
    warning: (txt) => {
        let { colors } = utils;
        console.log(`${colors.fg.Yellow}${moment().format(config.log.timeFormat)} - ${txt}${colors.Reset}`);
    },
    error: (txt) => {
        let { colors } = utils;
        console.log(`${colors.fg.Red}${moment().format(config.log.timeFormat)} - ${txt}${colors.Reset}`);
    },
    debug: (txt) => {
        if (config.debug) {
            console.log(`${moment().format(config.log.timeFormat)} - DEBUG ${txt}`);
        }
    }
}