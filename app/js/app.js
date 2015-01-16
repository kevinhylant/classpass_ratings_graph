(function(){
  'use strict';

  var a = angular.module('classPassRatings', []);

  a.controller("RatingsController", function(){
    this.reviews = reviews;
    this.activities = activities;
    // this.graph = graph;
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
      rating: 5,
      activities: { 'Strength Training': true }
    },{
      studio: 'EPIC Hybrid Training',
      author: 'Kevin Hylant',
      rating: 1,
      activities: { 'Strength Training': true }
    },
    {
      studio: 'EPIC Hybrid Training',
      author: 'Kevin Hylant',
      rating: 5,
      activities: { 'Strength Training': true }
    },
    {
      studio: 'EPIC Hybrid Training',
      author: 'Kevin Hylant',
      rating: 5,
      activities: { 'Strength Training': true }
    },
    {
      studio: 'EPIC Hybrid Training',
      author: 'Kevin Hylant',
      rating: 4,
      activities: { 'Strength Training': true }
    },
    {
      studio: 'EPIC Hybrid Training',
      author: 'Kevin Hylant',
      rating: 4,
      activities: { 'Strength Training': true }
    },
    {
      studio: 'EPIC Hybrid Training',
      author: 'Kevin Hylant',
      rating: 3,
      activities: { 'Strength Training': true }
    },
    {
      studio: 'EPIC Hybrid Training',
      author: 'Kevin Hylant',
      rating: 2,
      activities: { 'Strength Training': true }
    },
    {
      studio: 'EPIC Hybrid Training',
      author: 'Kevin Hylant',
      rating: 4,
      activities: { 'Strength Training': true }
    },

    {
      studio: 'The Average Joe Crossfit Gym',
      author: 'Kevin Hylant',
      rating: 1,
      activities: { 'Strength Training': true }
    },
    {
      studio: 'The Average Joe Crossfit Gym',
      author: 'Kevin Hylant',
      rating: 3,
      activities: { 'Strength Training': true }
    },
    {
      studio: 'The Average Joe Crossfit Gym',
      author: 'Kevin Hylant',
      rating: 3,
      activities: { 'Strength Training': true }
    },
    {
      studio: 'The Average Joe Crossfit Gym',
      author: 'Kevin Hylant',
      rating: 2,
      activities: { 'Strength Training': true }
    },
    {
      studio: 'The Average Joe Crossfit Gym',
      author: 'Kevin Hylant',
      rating: 4,
      activities: { 'Strength Training': true }
    },
    {
      studio: 'The Average Joe Crossfit Gym',
      author: 'Kevin Hylant',
      rating: 4,
      activities: { 'Strength Training': true }
    }

  ];

  // ====== GRAPH START ====== //
  var selected_studio = "EPIC Hybrid Training";
  var selected_rating_totals = {}
    selected_rating_totals.count = 0;
    selected_rating_totals.total_ratings = 0;
  var rating_totals = {};
    rating_totals.count = 0;
  var curr_rating = 0;

  for(var i=0 ; i<reviews.length ; i++){
    curr_rating = reviews[i].rating
    if(!rating_totals[curr_rating]){
      rating_totals[curr_rating] = 1;
      rating_totals.count++;
    }
    else{
      rating_totals[curr_rating] += 1;
    }
    if(reviews[i].studio == selected_studio){
      if(!selected_rating_totals[curr_rating]){
        selected_rating_totals[curr_rating] = 1;
        selected_rating_totals.count++;
      }
      else{
        selected_rating_totals[curr_rating] += 1;
      }
      selected_rating_totals.total_ratings++;
    }
  }
  var avg_breakdown = {};
  var selected_studio_breakdown = {};
  var sel_tot = selected_rating_totals.total_ratings

  for(var j=1 ; j<=rating_totals.count ; j++){
      avg_breakdown[j] = (rating_totals[j]/reviews.length);
      if(selected_rating_totals[j]){
        selected_studio_breakdown[j] = (selected_rating_totals[j]/sel_tot);
      }
      else{
        selected_studio_breakdown[j] = 0;
      }
  }

  var graph = new Rickshaw.Graph( {
        element: document.getElementById('chart'),
        renderer: 'bar',
        stack: false,
        series: [{
                data: [ { x: 0, y: selected_studio_breakdown[1] }, { x: 1, y: selected_studio_breakdown[2] },{ x: 2, y: selected_studio_breakdown[3] },{ x: 3, y: selected_studio_breakdown[4] },{ x: 4, y: selected_studio_breakdown[5] }],
                color: '#40C6B9'
        }, {
                data: [ { x: 0, y: avg_breakdown[1] }, { x: 1, y:  avg_breakdown[2] }, { x: 2, y:  avg_breakdown[3] }, { x: 3, y:  avg_breakdown[4] }, { x: 4, y:  avg_breakdown[5] }],
                color: '#494B57'
        }]
  });
  var hoverDetail = new Rickshaw.Graph.HoverDetail( {
    graph: graph,
    xFormatter: function(x) { return x + " Star Rating" },
    yFormatter: function(y) { return Math.floor(y*100) + "% of total" }
  });

  graph.render();

  // ====== GRAPH END ====== //
})();