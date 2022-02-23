const isValidWord = (word) =>{
  //todo: a ton of word handling to ensure guesses are valid words
  if (word.length == 5) return true;
  return false;
};

export default isValidWord;