let rTurn = true;

function check() {
  let ma = 0;
  let mb = 0;
  let mc = 0;
  let md = 0;
  let me = 0;
  let mf = 0;
  let mg = 0;
  let mh = 0;

  let mC = int(inputB.value());
  let a = unchar(split(inputA.value(), '')[0].toUpperCase()) - 65;
  let b = int(split(inputA.value(), '')[1]) - 1;
  if (0 <= a && a <= 7 && 0 <= b && b <= 7) {
    rect(sS * a, sS * b, sS * (a + 1), sS * (b + 1));
    let num = isMan(a, b);
    if (num != -1) {
      if ((men[num].side && rTurn) || (!men[num].side && men[num].kinged && !rTurn)) {
        if (b - 1 >= 0 && isMan((a + 7) % 8, b - 1) == -1) {
          ma = 1;
        } else if (b - 2 >= 0 && isMan((a + 6) % 8, b - 2) == -1 && isMan((a + 7) % 8, b - 1) != -1) {
          if (xor(men[num].side, men[isMan((a + 7) % 8, b - 1)].side)) {
            mb = 1;
          }
        }
        if (b - 1 >= 0 && isMan((a + 1) % 8, b - 1) == -1) {
          mc = 1;
        } else if (b - 2 >= 0 && isMan((a + 2) % 8, b - 2) == -1 && isMan((a + 1) % 8, b - 1) != -1) {
          if (xor(men[num].side, men[isMan((a + 1) % 8, b - 1)].side)) {
            md = 1;
          }
        }
      }
      if ((!men[num].side && !rTurn) || (men[num].side && men[num].kinged && rTurn)) {
        if (b + 1 <= 7 && isMan((a + 7) % 8, b + 1) == -1) {
          me = 1;
        } else if (b + 2 <= 7 && isMan((a + 6) % 8, b + 2) == -1 && isMan((a + 7) % 8, b + 1) != -1) {
          if (xor(men[num].side, men[isMan((a + 7) % 8, b + 1)].side)) {
            mf = 1;
          }
        }
        if (b + 1 <= 7 && isMan((a + 1) % 8, b + 1) == -1) {
          mg = 1;
        } else if (b + 2 <= 7 && isMan((a + 2) % 8, b + 2) == -1 && isMan((a + 1) % 8, b + 1) != -1) {
          if (xor(men[num].side, men[isMan((a + 1) % 8, b + 1)].side)) {
            mh = 1;
          }
        }
      }
    }
    if (ma == 1 && mC == 0) {
      men[num].moveTo((a + 7) % 8, b - 1);
      rTurn = !rTurn;
    }
    if (mb == 1 && mC == 1) {
      men[num].moveTo((a + 6) % 8, b - 2);
      men.splice(isMan((a + 7) % 8, b - 1), 1);
      rTurn = !rTurn;
    }
    if (mc == 1 && mC == 2) {
      men[num].moveTo((a + 1) % 8, b - 1);
      rTurn = !rTurn;
    }
    if (md == 1 && mC == 3) {
      men[num].moveTo((a + 2) % 8, b - 2);
      men.splice(isMan((a + 1) % 8, b - 1), 1);
      rTurn = !rTurn;
    }
    if (me == 1 && mC == 4) {
      men[num].moveTo((a + 7) % 8, b + 1);
      rTurn = !rTurn;
    }
    if (mf == 1 && mC == 5) {
      men[num].moveTo((a + 6) % 8, b + 2);
      men.splice(isMan((a + 7) % 8, b + 1), 1);
      rTurn = !rTurn;
    }
    if (mg == 1 && mC == 6) {
      men[num].moveTo((a + 1) % 8, b + 1);
      rTurn = !rTurn;
    }
    if (mh == 1 && mC == 7) {
      men[num].moveTo((a + 2) % 8, b + 2);
      men.splice(isMan((a + 1) % 8, b + 1), 1);
      rTurn = !rTurn;
    }
    setKings();
    inputA.value('');
    inputB.value('');
  }
}

function setKings() {
  for (let a = 0; a < men.length; a++) {
    if ((men[a].side && men[a].y == 0) || (!men[a].side && men[a].y == 7)) {
      men[a].king();
    }
  }
}

function isMan(x, y) {
  let c = -1
  for (let a = 0; a < men.length; a++) {
    if (men[a].x == x && men[a].y == y) {
      c = a;
    }
  }
  return c;
}
