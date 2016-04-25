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
            if(!attrs.dayField || !attrs.hourField || !attrs.entryDataField || !attrs.mapData) {
                throw new Error('Required attrs were not specified');
            }
            scope.axisX = attrs.axisX || 'day';
            scope.axisY = attrs.axisY || 'hour';
            scope.entryDataField = attrs.entryDataField;
            scope.title = attrs.title;
            scope.dayField = attrs.dayField;
            scope.hourField = attrs.hourField;
        }
    };
};