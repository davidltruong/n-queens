/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  if (arguments[1]) {
    var solution = arguments[1];
    var row = arguments[2];
    var col = arguments[3];
    var nPieces = arguments[4];
  } else {
    var solution = new Board({'n': n});
    var row = 0;
    var col = 0;
    var nPieces = 0;
  }

  if (nPieces === n) {
    return solution.rows();
  }

  for (row; row < n; row++) {
    for (col; col < n; col++) { //col = 2
      solution.togglePiece(row, col);
      nPieces++;
      row++;
      if (solution.hasAnyRooksConflicts()) {
        row--;
        solution.togglePiece(row, col);
        nPieces--;
      } else {
        return window.findNRooksSolution(n, solution, row, col, nPieces);
      }
    }
  }
  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme
  if (arguments[1]) {
    var solution = arguments[1];
    var row = arguments[2];
    var col = arguments[3];
    var nPieces = arguments[4];
  } else {
    var solution = new Board({'n': n}); // [1, 0, 0]
    var row = 0;
    var col = 0;
    var nPieces = 0;
  }

  if (nPieces === n) {
    solutionCount++;
    return solutionCount;
  }

  for (row; row < n; row++) {
    for (col; col < n; col++) { //col = 2
      solution.togglePiece(row, col);
      nPieces++;
      row++;
      if (solution.hasAnyRooksConflicts()) {
        row--;
        solution.togglePiece(row, col);
        nPieces--;
      } else {
        solutionCount += window.countNRooksSolutions(n, solution, row, 0, nPieces);
        row--;
        nPieces--;
        solution.togglePiece(row, col);
      }
    }
  }

  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {

  if (arguments[1]) {
    var solution = arguments[1];
    var row = arguments[2];
    var col = arguments[3];
  } else {
    var solution = new Board({'n': n}); // [1, 0, 0]
    var row = 0;
    var col = 0;
  }


  var helper = function (matrix) {
    var sum = 0;
    for (var i = 0; i < matrix.length; i++) {
      for (var j = 0; j < matrix[i].length; j++) {
        sum += matrix[i][j];
      }
    }
    return sum;
  };

  if (helper(solution.rows()) === n) {
    return solution.rows();
  }

  for (row; row < n; row++) {
    for (col; col < n; col++) { //col = 2
      solution.togglePiece(row, col);
      if (solution.hasAnyQueensConflicts()) {
        solution.togglePiece(row, col);
      } else {
        row++;
        window.findNQueensSolution(n, solution, row, 0);
        if (helper(solution.rows()) === n) {
          return solution.rows();
        } else {
          row--;
          solution.togglePiece(row, col);
        }
      }
    }
  }
  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; //fixme
  if (arguments[1]) {
    var solution = arguments[1];
    var row = arguments[2];
    var col = arguments[3];
    var nPieces = arguments[4];
  } else {
    var solution = new Board({'n': n}); // [1, 0, 0]
    var row = 0;
    var col = 0;
    var nPieces = 0;
  }

  if (nPieces === n) {
    solutionCount++;
    return solutionCount;
  }

  for (row; row < n; row++) {
    for (col; col < n; col++) { //col = 2
      solution.togglePiece(row, col);
      nPieces++;
      row++;
      if (solution.hasAnyQueensConflicts()) {
        row--;
        solution.togglePiece(row, col);
        nPieces--;
      } else {
        solutionCount += window.countNQueensSolutions(n, solution, row, 0, nPieces);
        row--;
        nPieces--;
        solution.togglePiece(row, col);
      }
    }
  }

  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};
