'use strict';


module.exports = function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('charts', {
            url: '/charts',
            templateUrl: './templates/modules/charts/charts.html',
            controller: 'ChartsCtrl'
        });

    $urlRouterProvider.otherwise('/charts');
};