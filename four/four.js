var piece = [[1, 2, 3, 4], [], []];
var arrow = [];
var camloc = 0;
var inventory = 0;

window.addEventListener("load", () => {
  dec();
  setTimeout(() => {
    intro();
  }, 10)
});

function left() {
  camloc -= 1;
  clampCamloc();

  arrow.push("left");

  document.querySelector(".left").animate(
    {
      borderWidth: ["3vmin 3vmin 3vmin 0"],
      marginRight: ["12vmin"]
    },
    {
      fill: "forwards",
      easing: "ease-in-out",
      duration: 200
    }
  );

  document.querySelector(".left").animate(
    {
      borderWidth: ["5vmin 5vmin 5vmin 0"],
      marginRight: ["10vmin"]
    },
    {
      fill: "forwards",
      easing: "ease-in-out",
      duration: 200
    }
  );

  document.querySelector("#number").innerHTML = piece[camloc].length;

  dec();
}

function right() {
  camloc += 1;
  clampCamloc();

  arrow.push("right");

  document.querySelector(".right").animate(
    {
      borderWidth: ["3vmin 0 3vmin 3vmin"],
      marginLeft: ["12vmin"]
    },
    {
      fill: "forwards",
      easing: "ease-in-out",
      duration: 200
    }
  );

  document.querySelector(".right").animate(
    {
      borderWidth: ["5vmin 0 5vmin 5vmin"],
      marginLeft: ["10vmin"]
    },
    {
      fill: "forwards",
      easing: "ease-in-out",
      duration: 200
    }
  );

  document.querySelector("#number").innerHTML = piece[camloc].length;

  dec();
}

function up() {
  if ((inventory == 0) & (piece[camloc].length > 0)) {
    inventory = piece[camloc][0];
    piece[camloc].splice(0, 1);
  }

  arrow.push("up");

  document.querySelector(".up").animate(
    {
      borderWidth: ["0 3vmin 3vmin 3vmin"],
      marginBottom: ["12vmin"]
    },
    {
      fill: "forwards",
      easing: "ease-in-out",
      duration: 200
    }
  );

  document.querySelector(".up").animate(
    {
      borderWidth: ["0 5vmin 5vmin 5vmin"],
      marginBottom: ["10vmin"]
    },
    {
      fill: "forwards",
      easing: "ease-in-out",
      duration: 200
    }
  );

  document.querySelector("#number").innerHTML = piece[camloc].length;

  dec();
}

function down() {
  if ((inventory != 0) & (piece[camloc][0] > inventory || piece[camloc] == 0)) {
    piece[camloc].unshift(inventory);
    inventory = 0;
  }

  arrow.push("down");

  document.querySelector(".down").animate(
    {
      borderWidth: ["3vmin 3vmin 0 3vmin"],
      marginTop: ["12vmin"]
    },
    {
      fill: "forwards",
      easing: "ease-in-out",
      duration: 200
    }
  );

  document.querySelector(".down").animate(
    {
      borderWidth: ["5vmin 5vmin 0 5vmin"],
      marginTop: ["10vmin"]
    },
    {
      fill: "forwards",
      easing: "ease-in-out",
      duration: 200
    }
  );

  document.querySelector("#number").innerHTML = piece[camloc].length;

  dec();
}

function easyAnimation(query, bw, mr) {
  document.querySelector(query).animate(
    {
      borderWidth: [bw],
      marginRight: [mr]
    },
    {
      fill: "forwards",
      easing: "ease-in-out",
      duration: 200
    }
  );
}

function clampCamloc() {
  camloc = (camloc + 3) % 3;
}

function dec() {
  if (piece[2].length == 4) {
    gameClear();
  }

  // if (String(arrow) == "up,down,up,down,left,right,up,up,right,right") {
  //   command()
  // }
  document.querySelector(".left").style.borderColor =
    "transparent #202020 transparent transparent";
  document.querySelector(".right").style.borderColor =
    "transparent transparent transparent #202020";
  if (camloc == 0) {
    document.querySelector(".left").style.borderColor =
      "transparent #de1d1d transparent transparent";
  } else if (camloc == 2) {
    document.querySelector(".right").style.borderColor =
      "transparent transparent transparent #de1d1d";
  }
}

function gameClear() {
  document.querySelector("#clear").style.display = "flex";
  document.querySelector("#TKFP").style.display = "flex";
  document.querySelector(".black").animate(
    {
      height: ["100vh"]
    },
    {
      fill: "forwards",
      easing: "ease-in-out",
      duration: 200
    }
  );
}

document.addEventListener("keydown", keydown_ivent);

function keydown_ivent(e) {
  switch (e.key) {
    case "ArrowUp":
      up();
      break;
    case "ArrowDown":
      down();
      break;
    case "ArrowLeft":
      left();
      break;
    case "ArrowRight":
      right();
      break;
  }
}

// function command() {
//   var commandInput = prompt("Enter a command...");
//   if (commandInput == "gameClear()") {
//     gameClear();
//   } else if (commandInput.includes("setPiece")) {
//     commandInput = commandInput.replace("setPiece(", "");
//     commandInput = commandInput.replace(")", "");
//     piece = commandInput.split(", ");
//     console.log(piece);
//     dec();
//   }
// }

function intro() {
  var small = document.querySelector('.piece-small');
  var big = document.querySelector('.piece-big');

  small.style.transition = 'transform 0.5s';
  big.style.transition = 'transform 0.5s';

  small.style.transform = 'translate(0vmin, 0vmin)';

  small.addEventListener('transitionend', function handler1() {
    small.style.transform = 'translate(calc(10vmin / 1.5), 0vmin)';

    small.removeEventListener('transitionend', handler1);

    small.addEventListener('transitionend', function handler2() {
      small.style.transform = 'translate(calc(10vmin / 1.5), 12.05vmin)';

      small.removeEventListener('transitionend', handler2);

      small.addEventListener('transitionend', function handler3() {
        big.style.transform = 'translate(0vmin, -2vmin)';

        small.removeEventListener('transitionend', handler3);

        big.addEventListener('transitionend', function handler4() {
          big.style.transform = 'translate(calc(10vmin / 0.75), -2vmin)';

          big.removeEventListener('transitionend', handler4);

          big.addEventListener('transitionend', function handler5() {
            big.style.transform = 'translate(calc(10vmin / 0.75), 10vmin)';

            big.removeEventListener('transitionend', handler5);

            big.addEventListener('transitionend', function handler6() {
              small.style.transform = 'translate(calc(10vmin / 1.5), 0vmin)';

              big.removeEventListener('transitionend', handler6);

              small.addEventListener('transitionend', function handler7() {
                small.style.transform = 'translate(calc(10vmin / 0.75), 0vmin)';

                small.removeEventListener('transitionend', handler7);

                small.addEventListener('transitionend', function handler8() {
                  small.style.transform = 'translate(calc(10vmin / 0.75), 10vmin)';

                  small.removeEventListener('transitionend', handler8);

                  small.addEventListener('transitionend', function handler9() {
                    document.querySelector(".loadingscreen").style.transition = 'opacity 1s';
                    document.querySelector(".loadingscreen").style.opacity = '0%';

                    small.removeEventListener('transitionend', handler9);
                    small.addEventListener('transitionend', function handler10() {
                      document.querySelector(".loadingscreen").style.transition = 'opacity 1s';
                      document.querySelector(".loadingscreen").style.opacity = '0%';
                      document.querySelector(".loadingscreen").style.display = 'none';
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });



}

setTimeout(() => {
  document.querySelector(".loadingscreen").style.display = 'none';
}, 5000)