import {typeQuestionsSelect} from "../types";

export const alphabet = 'abcdefghijklmnopqrstuvwxyz'

export function letterToIndex(letter: string) {
  // letter between a and z
  return alphabet.indexOf(letter) + 1
}

export function indexToLetter(index: number) {
  // index between 1 and 26
  return alphabet[index - 1]
}

export function loadNewQuestion(typeQuestions: typeQuestionsSelect, setQuestion: (question: string) => void , setAwnser :(awnser: string) => void , setAwnserInput:  (awnserInput: string) => void ){
  let newQuestion;
  let typeQuestion;
  if (typeQuestions === "tout"){
    // je choisis au hasard le type de la prochaine question
    typeQuestion = ["lettre vers index", "index vers lettre"][ Math.floor(Math.random()*2)]
  } else {
    typeQuestion = typeQuestions
  }
  if (typeQuestion === "index vers lettre"){
    newQuestion = Math.floor(1 + Math.random()*26)
    setQuestion(newQuestion.toString())
    setAwnser(indexToLetter(newQuestion))
  } else if (typeQuestion === "lettre vers index") {
    newQuestion = alphabet[Math.floor(1 + Math.random()*26)]
    setQuestion(newQuestion)
    setAwnser(letterToIndex(newQuestion).toString())
  }
  setAwnserInput("")
}

export function isGoodAwnser(awnser: string, awnserInput: string){
  return awnser === awnserInput
}