const kNode = (coord, nodeParent = null) => {
  const coords = coord;
  let parent = nodeParent;
  let a = null;
  let b = null;
  let c = null;
  let d = null;
  let e = null;
  let f = null;
  let g = null;
  let h = null;
  return { coords, parent, a, b, c, d, e, f, g, h };
};

const createBoardArr = () => {
  const board = [];
  for (let i = 0; i < 8; i++) {
    const row = [];
    for (let j = 0; j < 8; j++) {
      row.push(false);
    }
    board.push(row);
  }
  return board;
};

const addVecs = (v1, v2) => {
  return [v1[0] + v2[0], v1[1] + v2[1]];
};

const isInBoard = ([x, y]) => {
  if (x > 7 || x < 0 || y > 7 || y < 0) return false;
  return true;
};

const getNextNodes = (node, board) => {
  const aVec = [1, 2];
  const bVec = [2, 1];
  const cVec = [2, -1];
  const dVec = [1, -2];
  const eVec = [-1, -2];
  const fVec = [-2, -1];
  const gVec = [-2, 1];
  const hVec = [-1, 2];
  const nextNodes = [aVec, bVec, cVec, dVec, eVec, fVec, gVec, hVec].map(
    (vec) => {
      const newCoords = addVecs(node.coords, vec);
      if (!isInBoard(newCoords) || board[newCoords[1]][newCoords[0]]) {
        return null;
      }
      return kNode(newCoords, node);
    },
  );
  return nextNodes;
};

const buildKTree = (start) => {
  const root = kNode(start);
  let queue = [root];
  const board = createBoardArr();

  while (queue.length) {
    const node = queue.shift();
    const coords = node.coords;
    board[coords[1]][coords[0]] = true;
    const nextNodes = getNextNodes(node, board);
    node.a = nextNodes[0];
    node.b = nextNodes[1];
    node.c = nextNodes[2];
    node.d = nextNodes[3];
    node.e = nextNodes[4];
    node.f = nextNodes[5];
    node.g = nextNodes[6];
    node.h = nextNodes[7];
    const uniqueAndValidMoves = nextNodes.filter((nextNode) => nextNode);
    uniqueAndValidMoves.forEach((move) => {
      board[move.coords[1]][move.coords[0]] = true;
    });
    queue = queue.concat(uniqueAndValidMoves);
  }
  return root;
};

const bst = (targetCoords, queue) => {
  const node = queue.shift();
  if (isEqualVec(node.coords, targetCoords)) {
    const path = [];
    let temp = node;
    while (temp) {
      path.unshift(temp.coords);
      temp = temp.parent;
    }
    return path;
  }
  if (node.a) queue.push(node.a);
  if (node.b) queue.push(node.b);
  if (node.c) queue.push(node.c);
  if (node.d) queue.push(node.d);
  if (node.e) queue.push(node.e);
  if (node.f) queue.push(node.f);
  if (node.g) queue.push(node.g);
  if (node.h) queue.push(node.h);
  if (queue.length) return bst(targetCoords, queue);
  return null;
};

const knightMoves = (startCoords, targetCoords) => {
  const tree = buildKTree(startCoords);
  const path = bst(targetCoords, [tree]);
  return path;
};

const isEqualVec = ([x1, y1], [x2, y2]) => {
  if (x1 === x2 && y1 === y2) return true;
  return false;
};

console.log(buildKTree([0, 0]));
console.log(knightMoves([0, 0], [4, 3]));
