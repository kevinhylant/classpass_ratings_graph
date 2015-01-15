(function(){
  'use strict';

  var a = angular.module('readingList', []);

  a.controller("RatingsController", function(){
    this.reviews = reviews;
    this.activities = activities;
  });

  a.directive("activities", function(){
    return {
      restrict: 'E',
      templateUrl: 'partials/activities.html',
      replace: true,
      scope: {
        activities: '='
      }
    };
  });

  a.directive("bookCover", function(){
    return {
      restrict: 'E',
      templateUrl: 'partials/book-cover.html',
      replace: true
    };
  });

  a.directive("header", function(){
    return {
      restrict: 'E',
      templateUrl: 'partials/header.html',
      replace: true
    };
  });

  a.directive("reviewForm", function(){
    return {
      restrict: 'E',
      templateUrl: 'partials/review-form.html',
      replace: true,
      controller: function(){
        this.showForm = false;
        this.review = {activities:{}};
        this.addReview = function(form){
          reviews.push(this.review);
          this.review = {activities:{}};
          form.$setPristine();
        };
      },
      controllerAs: 'reviewFormCtrl',
      scope: {
        reviews: '=',
        activities: '='
      }
    };
  });

  var activities = [ 'Yoga', 'Cycling', 'Barre', 'Pilates','Strength Training','Dance'];

  var reviews = [
    {
      studio: 'EPIC Hybrid Training',
      author: 'Kevin Hylant',
      review_text: 'Leanne is the best trainer...period.',
      rating: 5,
      activities: { 'Strength Training': true }
    }
  ];
})();