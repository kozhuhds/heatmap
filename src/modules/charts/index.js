'use strict';


module.exports = angular.module('app.charts', [])
    .controller('ChartsCtrl', require('./ChartsCtrl'))
    .factory('chartService', require('./chartService'));