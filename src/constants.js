export const grid = createGrid();

function createGrid() {
  let arr = [];
  for (let i = 0; i < 400; i++) {
    arr.push(i);
  }
  return arr;
}