(function(){
  'use strict';

  var a = angular.module('readingList', []);

  a.controller("ReadingListController", function(){
    this.books = books;
    this.genres = genres;
  });

  a.directive("bookGenres", function(){
    return {
      restrict: 'E',
      templateUrl: 'partials/book-genres.html',
      replace: true,
      scope: {
        genres: '='
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

  a.directive("reviewForm", function(){
    return {
      restrict: 'E',
      templateUrl: 'partials/review-form.html',
      replace: true,
      controller: function(){
        this.showForm = false;
        this.book = {genres:{}};
        this.addReview = function(form){
          books.push(this.book);
          this.book = {genres:{}};
          form.$setPristine();
        };
      },
      controllerAs: 'reviewFormCtrl',
      scope: {
        books: '=',
        genres: '='
      }
    };
  });

  var genres = [ 'programming', 'javascript', 'ruby', 'php','python','rails','jquery','angular','node' ];

  var books = [
    {
      title: 'Speaking Javascript',
      author: 'Axel Rauschmayer',
      isbn: '1449365035',
      review: 'Tremendous JS reference book to read in addition to an MOOC',
      rating: 5,
      genres: { 'JavaScript': true }
    },
    {
      title: 'Learn to Program',
      author: 'Chris Pine',
      isbn: '1934356360',
      review: 'The single best intro to Ruby book out there. And programming in general. Introduces complex ideas in a fun,easy way.',
      rating: 5,
      genres: { 'Ruby': true }
    },
    {
      title: 'The Well Grounded Rubyist',
      author: 'David Black',
      isbn: '1933988657',
      review: 'Great book to help hone your Ruby skills!',
      rating: 5,
      genres: { 'Ruby': true }
    },
    {
      title: 'Pro AngularJS',
      author: 'Andy Freeman',
      isbn: '1430264489',
      review: 'SOlid book to complement on MOOC',
      rating: 4,
      genres: { 'AngularJS': true, 'JavaScript': true }
    }
  ];
})();