module.exports = function ($scope) {
    var maxValue = 0,
        minValue = Infinity;


    var axisValueToString = {
        day: function (value) {
            var days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
            return days[value - 1] || value;
        },
        hour: function (value) {
            if(value + 1 === 12) {
                return "12p"
            }
            return value + 1 <= 11 ? value + 1 + "a" : value - 11 + "p";
        }
    };

    var generateColor = function (value) {
        value = parseInt(value);

        var oldRange = maxValue - minValue,
            newRange = 100;

        value = (((value - minValue) * newRange) / oldRange);

        var r = Math.floor((255 * value) / 100),
            g = Math.floor((255 * (100 - value)) / 100),
            b = 0;

        return {
            "background-color": "rgb(" + r + "," + g + "," + b + ")"
        }
    };



    $scope.$watch('mapData', function (mapData) {
        var axisXfieldName = $scope.axisX === 'day' ? $scope.dayField : $scope.hourField,
            axisYfieldName = $scope.axisY === 'day' ? $scope.dayField : $scope.hourField;

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
            var value = dayItem.data[$scope.entryDataField][0].value;

            if(maxValue < value) {
                maxValue = value;
            }
            if(minValue > value) {
                minValue = value;
            }
        });

        //normalize data for rendering
        mapData.forEach(function (dayItem) {
            var axisValueX = dayItem.index[axisXfieldName],
                axisValueY = dayItem.index[axisYfieldName];

            chartData[axisValueY] = chartData[axisValueY] || {};

            axisValuesX[axisValueX] = axisValueToString[$scope.axisX](axisValueX);
            axisValuesY[axisValueY] = axisValueToString[$scope.axisY](axisValueY);

            chartData[axisValueY][axisValueX] = {
                entity: axisValueY,
                data: dayItem.data[$scope.entryDataField][0],
                color: generateColor(dayItem.data[$scope.entryDataField][0].value)
            };
        });

        axisRangeX = $scope.axisX === 'day' ? 8 : 24;
        axisRangeY = $scope.axisY === 'day' ? 8 : 24;

        // add missed days and hours
        for (var i = $scope.axisY === 'day' ? 1 : 0; i < axisRangeY; i++) {
            if(!chartData[i]) {
                chartData[i] = {};
            }
            for(var j = $scope.axisX === 'day' ? 1 : 0; j < axisRangeX; j++) {
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