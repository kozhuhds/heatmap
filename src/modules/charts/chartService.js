module.exports = function ($http) {
    return {
        getChartData: function () {
            return $http.get('./data/heatwave.json').then(function (resp) {
                this.mapData = resp.data.result;
            }.bind(this));
        },
        getOtherData: function () {
            return $http.get('./data/heatwave2.json').then(function (resp) {
                this.otherData = resp.data.result;
            }.bind(this));
        }
    }
};