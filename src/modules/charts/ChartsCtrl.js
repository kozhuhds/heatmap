module.exports = function ($scope, chartService) {
    $scope.chartService = chartService;
    chartService.getChartData();
};