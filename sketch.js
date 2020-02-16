let bc;
let rc;
let sS;
let men;

function setup() {
  createCanvas(425, 425);
  bc = color(0, 0, 0);
  rc = color(191, 0, 0);
  sS = min(width, height) / 9;
  men = [spawnPiece(0, 0, false, sS), spawnPiece(2, 0, false, sS), spawnPiece(4, 0, false, sS), spawnPiece(6, 0, false, sS), spawnPiece(1, 1, false, sS), spawnPiece(3, 1, false, sS), spawnPiece(5, 1, false, sS), spawnPiece(7, 1, false, sS), spawnPiece(0, 2, false, sS), spawnPiece(2, 2, false, sS), spawnPiece(4, 2, false, sS), spawnPiece(6, 2, false, sS), spawnPiece(1, 5, true, sS), spawnPiece(3, 5, true, sS), spawnPiece(5, 5, true, sS), spawnPiece(7, 5, true, sS), spawnPiece(0, 6, true, sS), spawnPiece(2, 6, true, sS), spawnPiece(4, 6, true, sS), spawnPiece(6, 6, true, sS), spawnPiece(1, 7, true, sS), spawnPiece(3, 7, true, sS), spawnPiece(5, 7, true, sS), spawnPiece(7, 7, true, sS)];
  gui();
}

function draw() {
  background(0);
  noStroke();
  board();
  for (let i = 0; i < men.length; i++) {
    men[i].draw();
  }
  pMoves();
}

function board() {
  noStroke();
  rectMode(CORNERS);
  for (let i = 0; i < 8 * sS; i += sS) {
    for (let j = 0; j < 8 * sS; j += sS) {
      if (((i / sS) % 2 + (j / sS % 2)) % 2 == 0) {
        fill(bc);
      } else {
        fill(rc);
      }
      rect(i, j, i + sS, j + sS);
    }
  }
  fill(255);
  rect(8 * sS, 0, width, height);
  rect(0, 8 * sS, width, height);
  fill(0);
  textSize(sS/2);
  textAlign(CENTER,CENTER);
  for(let cb = 0; cb < 8; cb++) {
    text(char(65+cb), sS*(cb+0.5), 8.5* sS)
  }
  for(let cb = 0; cb < 8; cb++) {
    text(cb+1, 8.5* sS ,sS*(cb+0.5))
  }
  if (rTurn) {
    txt.html('Red\'s turn')
  }else {
    txt.html('Black\'s turn')
  }
}

function pMoves() {
  noFill();
  stroke(255, 255, 0);
  strokeWeight(5);
  let a = unchar(split(inputA.value(), '')[0].toUpperCase()) - 65;
  let b = int(split(inputA.value(), '')[1]) - 1;
  if (0 <= a && a <= 7 && 0 <= b && b <= 7) {
    rect(sS * a, sS * b, sS * (a + 1), sS * (b + 1));
    let num = isMan(a, b);
    if (num != -1) {
      if ((men[num].side && rTurn) || (!men[num].side && men[num].kinged && !rTurn)) {
        if (b - 1 >= 0 && isMan((a + 7) % 8, b - 1) == -1) {
          highL((a + 7) % 8, b - 1, 0);
        } else if (b - 2 >= 0 && isMan((a + 6) % 8, b - 2) == -1 && isMan((a + 7) % 8, b - 1) != -1) {
          if (xor(men[num].side, men[isMan((a + 7) % 8, b - 1)].side)) {
            highL((a + 6) % 8, b - 2, 1);
          }
        }
        if (b - 1 >= 0 && isMan((a + 1) % 8, b - 1) == -1) {
          highL((a + 1) % 8, b - 1, 2);
        } else if (b - 2 >= 0 && isMan((a + 2) % 8, b - 2) == -1 && isMan((a + 1) % 8, b - 1) != -1) {
          if (xor(men[num].side, men[isMan((a + 1) % 8, b - 1)].side)) {
            highL((a + 2) % 8, b - 2, 3);
          }
        }
      }
      if ((!men[num].side && !rTurn) || (men[num].side && men[num].kinged && rTurn)) {
        if (b + 1 <= 7 && isMan((a + 7) % 8, b + 1) == -1) {
          highL((a + 7) % 8, b + 1, 4);
        } else if (b + 2 <= 7 && isMan((a + 6) % 8, b + 2) == -1 && isMan((a + 7) % 8, b + 1) != -1) {
          if (xor(men[num].side, men[isMan((a + 7) % 8, b + 1)].side)) {
            highL((a + 6) % 8, b + 2, 5);
          }
        }
        if (b + 1 <= 7 && isMan((a + 1) % 8, b + 1) == -1) {
          highL((a + 1) % 8, b + 1, 6);
        } else if (b + 2 <= 7 && isMan((a + 2) % 8, b + 2) == -1 && isMan((a + 1) % 8, b + 1) != -1) {
          if (xor(men[num].side, men[isMan((a + 1) % 8, b + 1)].side)) {
            highL((a + 2) % 8, b + 2, 7);
          }
        }
      }
    }
  }
}

function xor(a, b) {
  return !((a && b) || (!a && !b));
}

function highL(q, w, val) {
  fill(color(255, 255, 0, 191))
  noStroke();
  rect(sS * q, sS * w, sS * (q + 1), sS * (w + 1));
  textAlign(CENTER, CENTER);
  fill(0);
  text(val, sS * (q + 0.5), sS * (w + 0.5));
}
