// Solution 1
function solution1(dartResult) {
  let totalScore = 0;
  const darts = dartResult.split('');
  const stack = [];
  let temp = 0;

  for (let i = 0; i < darts.length - 1; i++) {
    if (darts[i] === '1' && darts[i + 1] === '0') {
      darts.splice(i, 2, '10');
    }
  }

  darts.forEach((e) => {
    if (!isNaN(e)) {
      temp = Number(e);
    } else {
      if (e === 'S') {
        stack.push(temp);
      } else if (e === 'D') {
        stack.push(Math.pow(temp, 2));
      } else if (e === 'T') {
        stack.push(Math.pow(temp, 3));
      } else if (e === '*') {
        if (stack.length === 1) {
          stack.push(stack.pop() * 2);
        } else {
          const cur = stack.pop();
          const prev = stack.pop();

          stack.push(prev * 2);
          stack.push(cur * 2);
        }
      } else if (e === '#') {
        stack.push(stack.pop() * -1);
      }
    }
  });

  totalScore = stack.reduce((acc, cur) => acc + cur, 0);

  return totalScore;
}

// Solution 2
function solution2(dartResult) {
  let totalScore = 0;
  const darts = dartResult.split('');
  const stack = [];

  for (let i = 0; i < darts.length - 1; i++) {
    if (darts[i] === '1' && darts[i + 1] === '0') {
      darts.splice(i, 2, '10');
    }
  }

  darts.forEach((e) => {
    switch (e) {
      case 'S':
        break;
      case 'D':
        stack.push(Math.pow(stack.pop(), 2));
        break;
      case 'T':
        stack.push(Math.pow(stack.pop(), 3));
        break;
      case '*':
        if (stack.length === 1) {
          stack.push(stack.pop() * 2);
        } else {
          const cur = stack.pop() * 2;
          const prev = stack.pop() * 2;

          stack.push(...[prev, cur]);
        }
        break;
      case '#':
        stack.push(stack.pop() * -1);
        break;
      default:
        stack.push(Number(e));
    }
  });

  totalScore = stack.reduce((acc, cur) => acc + cur, 0);

  return totalScore;
}

// Solution 3
function solution3(dartResult) {
  const totalDarts = [];
  const gameScores = [];
  let darts = [];

  for (const element of dartResult) {
    if (!isNaN(element)) {
      if (darts.length > 0) {
        if (element === '0' && darts[0] === '1') {
          darts = ['10'];
          continue;
        } else {
          totalDarts.push(darts);
        }
      }

      darts = [element];
    } else {
      darts.push(element);
    }
  }

  if (darts.length > 0) {
    totalDarts.push(darts);
  }

  totalDarts.forEach((darts, index) => {
    const [score, bonus, option] = darts;
    let n;

    switch (bonus) {
      case 'S':
        n = 1;
        break;
      case 'D':
        n = 2;
        break;
      case 'T':
        n = 3;
        break;
    }

    let gameScore = Math.pow(score, n);

    if (option) {
      switch (option) {
        case '*':
          gameScore *= 2;

          if (index > 0) {
            gameScores[index - 1] *= 2;
          }
          break;
        case '#':
          gameScore *= -1;
      }
    }

    gameScores.push(gameScore);
  });

  const totalScore = gameScores.reduce((acc, score) => acc + score, 0);

  return totalScore;
}
