'use strict';

var angular = require('angular');

angular.module('app', [
    require('angular-ui-router'),
    require('./modules/charts').name,
    require('./modules/heatMap').name
])

    .config(require('./common/routes'))
    .controller('AppController', require('./common/AppCtrl'));
