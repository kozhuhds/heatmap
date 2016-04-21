'use strict';

module.exports = function () {
    return {

        scope: {
            chartData: '=',
            isMaximized: '='
        },
        restrict: 'E',
        controller: 'HeatMapCtrl',
        templateUrl: './templates/modules/heatmap/heatmap.html',
        link: function (scope, element, attrs) {
            debugger;
        }
    };
};