const NUM_RUNS = 100

function selectBestMove(grid) {
  let bestScore = 0;
  let bestMove = -1;

  for (let i = 0; i < 4; i++) {
    let score = simulateRuns(grid, i, NUM_RUNS);

    if (score >= bestScore) {
      bestScore = score;
      bestMove = i;
    }
  }

  return { move: bestMove, score: bestScore };
}

function simulateRuns(grid, move, runs) {
  let total = 0.0;
  for (let i = 0; i < runs; i++) {
    let score = simulateRun(grid, move);
    if (score === -1) {
      return -1;
    }
    total += score;
  }
  return total / runs;
}

function simulateRun(grid, move) {
  let g = grid.clone();
  let score = 0;
  let result = computeMove(g, move);
  if (!result.moved) {
    return -1;
  }
  score += result.score;

  while (true) {
    if (!g.movesAvailable()) {
      break;
    }

    let result = g.move(Math.floor(Math.random() * 4));
    if (!result.moved) {
      continue;
    }

    score += result.score;
    g.addRandomTile();
  }
  return score;
}

function computeMove(grid, direction) {
  let result = grid.move(direction);
  if (result.moved) {
    grid.addRandomTile();
  }
  return result;
}
