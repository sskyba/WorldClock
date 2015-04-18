'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('ClockCtrl', ['$scope', '$http', '$interval', function($scope, $http, $interval) {
    $scope.city0 = 'Toronto';
    $scope.city1 = 'London';
    $scope.city2 = 'Sydney';

    $scope.shift1 = -6;
    $scope.shift2 = -13;

    $scope.isSetTimeValid = true;
    $scope.isShift1Valid = true;
    $scope.isShift2Valid = true;

    var timer;

    $scope.setTime = function() {
      $scope.isSetTimeValid = $scope.isTimeValid($scope.t0);
      if (!$scope.isSetTimeValid) return;
      if ( !angular.isDefined(timer) ) {
        timer = $interval(function() {
          var d = new Date();
          $scope.t0 = ((d.getHours()<10)?'0':'') + d.getHours() + ':';
          $scope.t0 += ((d.getMinutes()<10)?'0':'') + d.getMinutes() + ':';
          $scope.t0 += ((d.getSeconds()<10)?'0':'') + d.getSeconds();
          $scope.setShifts()
        }, 5000);
      }
      $scope.setShifts();
    }
    $scope.setShifts = function() {
      $scope.isShift1Valid = $scope.isShiftValid($scope.shift1);
      $scope.isShift2Valid = $scope.isShiftValid($scope.shift2);
      if (!$scope.isShift1Valid || !$scope.isShift2Valid) return;

      $scope.t1 = $scope.getTimeShifted($scope.t0, $scope.shift1);
      $scope.t2 = $scope.getTimeShifted($scope.t0, $scope.shift2);
    }
    $scope.isTimeValid = function(t) {
      var patt = new RegExp(/([01]\d|2[0-3]):([0-5]\d):([0-5]\d)/g);
      return patt.test(t);
    }
    $scope.isShiftValid = function(s) {
      var patt = new RegExp(/([+-]?\d{1,2})/g);
      return (patt.test(s) && (s<24) && (s>-24));
    }
    $scope.getTimeShifted = function(time,shift) {
      if (!$scope.isTimeValid(time)) return time;
      if (!$scope.isShiftValid(shift)) return time;

      shift = '' + shift;
      if (shift.substring(0,1)=='+') shift = shift.substring(1);
      var result = parseInt(time.substring(0,2));
      if (shift.substring(0,1)=='-') {
        result -= parseInt(shift.substring(1));
      } else {
        result += parseInt(shift);
      }
      if (result<0) result = 24 + result;
      if (result>23) result -= 24;
      if (result<10) result = '0' + result;
      result += time.substring(2);
      return result;
    }

  }]);
