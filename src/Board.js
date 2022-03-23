// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var sum = 0;
      for ( var i = 0; i < rowIndex.length; i++) {
        sum += rowIndex[i];
      }
      var result;
      sum > 1 ? result = true : result = false;
      return result;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var bool = false;
      for (var key in this.attributes) {
        if (bool === true) {
          return true;
        }
        bool = this.hasRowConflictAt(this.attributes[key]);
      }
      return bool; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var sum = 0;
      var size = this.attributes.n;
      for (var i = 0; i < size; i++) {
        sum += this.attributes[i][colIndex];
      }
      var result;
      sum > 1 ? result = true : result = false;
      return result; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var bool = false;
      var size = this.attributes.n;
      for (var i = 0; i < size; i++) {
        if (bool === true) {
          return true;
        }
        bool = this.hasColConflictAt(i);
      }
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var incrementVal = 0;
      var sum = 0;
      var size = this.attributes.n;
      while (incrementVal < size) {
        if (this.attributes[incrementVal][majorDiagonalColumnIndexAtFirstRow]) {
          sum += this.attributes[incrementVal][majorDiagonalColumnIndexAtFirstRow];
        }
        majorDiagonalColumnIndexAtFirstRow++;
        incrementVal++;
      }
      var result;
      sum > 1 ? result = true : result = false;
      return result;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var bool = false;
      var size = this.attributes.n;
      for (var i = (-size + 1); i < size; i++) {
        if (bool === true) {
          return true;
        }
        bool = this.hasMajorDiagonalConflictAt(i);
      }
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var incrementVal = 0;
      var sum = 0;
      var size = this.attributes.n;
      while (incrementVal < size) {
        if (this.attributes[incrementVal][minorDiagonalColumnIndexAtFirstRow]) {
          sum += this.attributes[incrementVal][minorDiagonalColumnIndexAtFirstRow];
        }
        minorDiagonalColumnIndexAtFirstRow--;
        incrementVal++;
      }
      var result;
      sum > 1 ? result = true : result = false;
      return result;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var bool = false;
      var size = this.attributes.n;
      for (var i = ((2 * size) - 2); i > -1; i--) {
        if (bool === true) {
          return true;
        }
        bool = this.hasMinorDiagonalConflictAt(i);
      }
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
