
/* TABLE: High Precision Math */

// use algebraic expression: compare to https://fpcentral.tbb.torproject.org/fp#
function getMath1(x) {
      if (x === -Infinity) {
          return x;
      } else {
          return Math.log(x + Math.sqrt(x * x + 1));
      }
  }

function getMath2(x) {return Math.log(x + Math.sqrt(x * x - 1));}
function getMath3(x) {return Math.log((1 + x) / (1 - x)) / 2;}
function getMath4(x) {return Math.exp(x) - 1;}
function getMath5(x) {var y = Math.pow(Math.abs(x), 1 / 3); return x < 0 ? -y : y;}
function getMath6(x) {return Math.log(1 + x);}
function getMath7(x) {var y = Math.exp(x); return (y - 1 / y) / 2;}
function getMath8(x) {var y = Math.exp(x); return (y + 1 / y) / 2;}
function getMath9(x) {
      if (x === Infinity) {
          return 1;
      } else if (x === -Infinity) {
          return -1;
      } else {
          var y = Math.exp(2 * x);
          return (y - 1) / (y + 1);
      }
  }

document.getElementById("math1").innerHTML = getMath1(1);
document.getElementById("math2").innerHTML = getMath2(1e300);
document.getElementById("math3").innerHTML = getMath3(0.5)
document.getElementById("math4").innerHTML = getMath4(1);
document.getElementById("math5").innerHTML = getMath5(100);
document.getElementById("math6").innerHTML = getMath6(10);
document.getElementById("math7").innerHTML = getMath7(1);
document.getElementById("math8").innerHTML = getMath8(10);
document.getElementById("math9").innerHTML = getMath9(1);
