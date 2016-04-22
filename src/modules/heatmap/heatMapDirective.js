'use strict';

module.exports = function ($timeout) {
    return {

        scope: {
            mapData: '='
        },
        restrict: 'E',
        controller: 'HeatMapCtrl',
        templateUrl: './templates/modules/heatmap/heatmap.html',
        link: function (scope, element, attrs) {
            scope.axisX = attrs.axisX;
            scope.axisY = attrs.axisY;
            scope.entryDataField = attrs.entryDataField;
            scope.title = attrs.title;
        }
    };
};