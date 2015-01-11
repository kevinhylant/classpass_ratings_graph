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
      title: 'A Game of Thrones: A Song of Ice and Fire',
      author: 'George R.R. Martin',
      isbn: '0553593714',
      review: 'The most inventive and entertaining fantasy saga of our time—warrants one hell of an introduction. I loved this book!',
      rating: 4,
      genres: { 'non-fiction': true, fantasy: true }
    }
  ];
})();