module.exports = function solveSudoku(board) {
  const size = 9;
  const boxSize = 3;

    const findEmpty = (board) =>{
      for(let r = 0; r < size; r++){
        for(let c = 0; c < size; c++){
          if(board[r][c] === 0) return [r,c]
        }
      }
      return null;
    }

  const solve = () =>{
    const currentEmptyNum = findEmpty(board);

    if(currentEmptyNum == null){
      return true;
    }

    for(let i = 1; i < size + 1; i++){
      const currentNum = i;
      const validate = isValid(currentNum, currentEmptyNum, board);

      if(validate){
        const [x,y] = currentEmptyNum;
        board[x][y] = currentNum;

        if(solve()){
          return true
        }

        board[x][y] = 0;
      }
    }
    return false;
  } 

  const isValid = (num, pos, board) =>{

    const [r,c] = pos;

    // cols
    for(let i = 0; i < size; i++){
      if(num === board[i][c] && i !== r){
        return false;
      }
    }
    // rows
    for(let j = 0; j < size; j++){
      if(num === board[r][j] && j !== c){
        return false;
      }
    }

    const boxRow = Math.floor(r/boxSize) * boxSize;
    const boxCol = Math.floor(c/boxSize) * boxSize;

    for(let i = boxRow; i < boxRow + boxSize; i++){
      for(let j = boxCol; j < boxCol + boxSize; j++){
        if(num === board[i][j] && i !== r && j !== c){
          return false;
        }
      }
    }

    return true;
  }

  solve()

  return board;
}
