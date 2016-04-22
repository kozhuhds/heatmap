module.exports = function ($scope) {
    var maxValue = 0;
    var axisValueToString = {
        dowId: function (value) {
            var days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
            return days[value - 1] || value;
        },
        hourId: function (value) {
            if(value + 1 === 12) {
                return "12p"
            }
            return value + 1 <= 11 ? value + 1 + "a" : value - 11 + "p";
        }
    };

    var generateColor = function (value) {
        value = parseInt(parseInt(value) / maxValue * 100);
        var r = Math.floor((255 * value) / 100),
            g = Math.floor((255 * (100 - value)) / 100),
            b = 0;

        return {
            "background-color": "rgb(" + r + "," + g + "," + b + ")"
        }
    };



    $scope.$watch('mapData', function (mapData) {
        if(!mapData) {
          return
        }

        var chartData = {},
            axisValuesX = {},
            axisValuesY = {},
            axisRangeX = null,
            axisRangeY = null;

        //find max value
        mapData.forEach(function (dayItem) {
            if(maxValue < dayItem.data[$scope.entryDataField][0].value) {
                maxValue = dayItem.data[$scope.entryDataField][0].value
            }
        });

        //normalize data for rendering
        mapData.forEach(function (dayItem) {
            var axisValueX = dayItem.index[$scope.axisX],
                axisValueY = dayItem.index[$scope.axisY];

            chartData[axisValueY] = chartData[axisValueY] || {};

            axisValuesX[axisValueX] = axisValueToString[$scope.axisX](axisValueX);
            axisValuesY[axisValueY] = axisValueToString[$scope.axisY](axisValueY);

            chartData[axisValueY][axisValueX] = {
                entity: axisValueY,
                data: dayItem.data[$scope.entryDataField][0],
                color: generateColor(dayItem.data[$scope.entryDataField][0].value)
            };
        });

        axisRangeX = $scope.axisX === 'dowId' ? Object.keys(axisValuesX).length + 1 : Object.keys(axisValuesX).length;
        axisRangeY = $scope.axisY === 'dowId' ? Object.keys(axisValuesY).length + 1 : Object.keys(axisValuesY).length;

        // add missed days and hours
        for (var i = $scope.axisY === 'dowId' ? 1 : 0; i < axisRangeY; i++) {
            if(!chartData[i]) {
                chartData[i] = {};
            }
            for(var j = $scope.axisX === 'dowId' ? 1 : 0; j < axisRangeX; j++) {
                if(!chartData[i][j]) {
                    chartData[i][j] = {
                        color: {'background-color': '#127580'}
                    };
                }
            }
        }

        $scope.chartData = chartData;
        $scope.axisValuesX = axisValuesX;
        $scope.axisValuesY = axisValuesY;
    });

};