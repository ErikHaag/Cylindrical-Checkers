let txt;
let button;
let inputA;
let inputB;

function gui() {
  txt = createDiv('');
  txt.position(8.5 * sS, height+180);
  inputA = createInput();
  inputB = createInput();
  inputA.position(0, height+180);
  inputB.position(3*sS, height + 180);
  inputA.size(100, 20);
  inputB.size(100, 20);
  button = createButton('make move');
  button.position(6*sS, height + 180);
  button.size(100, 20);
  button.mousePressed(check);
}