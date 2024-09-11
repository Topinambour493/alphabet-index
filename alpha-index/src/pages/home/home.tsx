import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import "./home.css"
import {typeQuestionsSelect} from "../../types";



export default function Home() {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'
  const typeQuestionsSelect: typeQuestionsSelect[] = ["index vers lettre", "lettre vers index", "tout"];

  let [lettersUppercase, setLettersUppercase] = useState<boolean>(false)
  let [hideAlphabet, setHideAlphabet ] = useState<boolean>(true)
  let [lettersByRow, setLettersByRow] = useState<number>(10)
  let [question, setQuestion] = useState<string>("")
  let [awnser, setAwnser] = useState<string>("")
  let [awnserInput, setAwnserInput] = useState<string>("")
  let [typeQuestions, setTypeQestions] = useState<typeQuestionsSelect>("tout")

  function loadNewQuestion(){
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

  function verifyAwnser(e: FormEvent<HTMLFormElement>){
    e.preventDefault()
    if (awnser === awnserInput){
      console.log("yes")
    } else {
      console.log("nope")
    }
    loadNewQuestion()
  }

  function letterToIndex(letter: string) {
    // letter between a and z
    return alphabet.indexOf(letter) + 1
  }

  function indexToLetter(index: number) {
    // index between 1 and 26
    return alphabet[index - 1]
  }

  function createContainerLetters() {
    let containerLetters = document.createElement("div")
    containerLetters.className = "container-letters"
    return containerLetters
  }

  function createLetterByIndex(index: number) {
    let letter = document.createElement("div")
    let letterName = indexToLetter(index)
    if (lettersUppercase) {
      letterName = letterName.toUpperCase()
    }
    letter.className = "container-letter"
    letter.innerHTML = `<div class="letter">${letterName}</div><div class='index-letter'>${index}</div>`
    return letter
  }


  function createAlphabetIndexDynamic() {
    let main = document.getElementById("main")!
    let containerLetters = createContainerLetters()
    let letter;
    for (let i = 1; i < 27; i++) {
      if ((lettersByRow === 1) || (((i - 1) % lettersByRow === 0) && (i !== 1))) {
        main.appendChild(containerLetters)
        containerLetters = createContainerLetters()
      }
      letter = createLetterByIndex(i)
      containerLetters.appendChild(letter)

    }
    main.appendChild(containerLetters)

  }

  function deleteAlphabetIndexDynamic() {
    document.getElementById("main")!.innerHTML = ""
  }

  function hideArray(){
    let main = document.getElementById("main")!
    setHideAlphabet(!hideAlphabet)
    if (hideAlphabet)
      main.style.display = "none";
    else
      main.style.display = "block";
  }

  useEffect(() => {
    deleteAlphabetIndexDynamic()
    createAlphabetIndexDynamic()
  }, [lettersUppercase, lettersByRow])

  useEffect(()=>{
    loadNewQuestion()
  },[])

  return <>
    <div>
      <label>Nombre de lettres par lignes</label>
      <input id="letters-by-row" min="1" max="26" type="number" value={lettersByRow}
             onChange={(e) => setLettersByRow(parseInt(e.target.value))}/>
      <label>Majuscule</label>
      <input type="checkbox" id="letters-uppercase" onChange={() => setLettersUppercase(!lettersUppercase)}/>
      <label>Voir le tableau</label>
      <input type="checkbox" checked={hideAlphabet} id="hideArray" onChange={() => hideArray()}/></div>
    <label>Type de questions</label>
    <select
      id="type-quastions-select"
      value={typeQuestions}
      onChange={(e: ChangeEvent<HTMLSelectElement>)=> setTypeQestions(e.target.value as typeQuestionsSelect)}
    >
      {typeQuestionsSelect.map((type, index) => (
        <option key={index} value={type}>
          {type}
        </option>
      ))}
    </select>
    <main id="main"></main>
    <div id={"testZone"}>
      <div id={"question"}>{question}</div>
      <form onSubmit={(e: FormEvent<HTMLFormElement>) => verifyAwnser(e)}>
        <input type={"text"} onChange={(e: ChangeEvent<HTMLInputElement>) => setAwnserInput(e.target.value)}
               value={awnserInput} id={"awnser"}></input>
        <button type={"submit"}>valider</button>
      </form>
    </div>
  </>
}