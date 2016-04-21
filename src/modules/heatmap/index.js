'use strict';


module.exports = angular.module('app.heatmap', [])
    .directive('heatMap', require('./heatMapDirective'))
    .controller('HeatMapCtrl', require('./heatMapCtrl'));