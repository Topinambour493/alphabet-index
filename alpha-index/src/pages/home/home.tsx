import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import "./home.css"
import {typeQuestionsSelect} from "../../types";
import Scoring from "../../components/scoring/scoring";
import {alphabet, indexToLetter, isGoodAwnser, letterToIndex, loadNewQuestion} from "../../utils/utils";
import {useNavigate} from "react-router-dom";



export default function Home() {
  const typeQuestionsSelect: typeQuestionsSelect[] = ["index vers lettre", "lettre vers index", "tout"];

  const navigate = useNavigate()
  let [lettersUppercase, setLettersUppercase] = useState<boolean>(false)
  let [hideAlphabet, setHideAlphabet ] = useState<boolean>(true)
  let [lettersByRow, setLettersByRow] = useState<number>(10)
  let [question, setQuestion] = useState<string>("")
  let [awnser, setAwnser] = useState<string>("")
  let [awnserInput, setAwnserInput] = useState<string>("")
  let [typeQuestions, setTypeQestions] = useState<typeQuestionsSelect>("tout")


  function verifyAwnserAndLoadNewQuestion(e: FormEvent<HTMLFormElement>){
    e.preventDefault()
    let awnserDiv =  document.getElementById("awnserInput")!
    if (isGoodAwnser(awnser, awnserInput)){
      awnserDiv.className = "good"
    } else {
      awnserDiv.className = "bad"
    }
    loadNewQuestion(typeQuestions, lettersUppercase, setQuestion, setAwnser, setAwnserInput)
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
    loadNewQuestion(typeQuestions, lettersUppercase, setQuestion, setAwnser, setAwnserInput)
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
      onChange={(e: ChangeEvent<HTMLSelectElement>)=> setTypeQestions(e.target.value.toLowerCase() as typeQuestionsSelect)}
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
      <form onSubmit={(e: FormEvent<HTMLFormElement>) => verifyAwnserAndLoadNewQuestion(e)}>
        <input type={"text"}  onChange={(e: ChangeEvent<HTMLInputElement>) => setAwnserInput(e.target.value) }
               value={awnserInput} id={"awnserInput"}></input>
        <button type={"submit"}>valider</button>
      </form>
      <button onClick={()=>navigate("/test")}>Passer à l'évalation (100 questions)</button>
    </div>
  </>
}