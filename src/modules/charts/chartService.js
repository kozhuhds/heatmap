module.exports = function ($http) {
    return {
        getChartData: function () {
            return $http.get('./data/heatwave.json').then(function (resp) {
                this.mapData = resp.data.result;
            }.bind(this));
        }
    }
};