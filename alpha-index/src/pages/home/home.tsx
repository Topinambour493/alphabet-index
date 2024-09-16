import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import "./home.css"
import {typeQuestionsSelect} from "../../types";
import {indexToLetter, isGoodAwnser, loadNewQuestion} from "../../utils/utils";
import {useNavigate} from "react-router-dom";


export default function Home() {
  const typeQuestionsSelect: typeQuestionsSelect[] = ["index vers lettre", "lettre vers index", "tout"];

  const navigate = useNavigate()
  let [hideAlphabet, setHideAlphabet] = useState<boolean>(true)
  let [lettersByRow, setLettersByRow] = useState<number>(10)
  let [question, setQuestion] = useState<string>("")
  let [awnser, setAwnser] = useState<string>("")
  let [awnserInput, setAwnserInput] = useState<string>("")
  let [typeQuestions, setTypeQestions] = useState<typeQuestionsSelect>("tout")


  function verifyAwnserAndLoadNewQuestion(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    let awnserDiv = document.getElementById("awnserInput")!
    if (isGoodAwnser(awnser, awnserInput)) {
      awnserDiv.className = "good"
    } else {
      awnserDiv.className = "bad"
    }
    loadNewQuestion(typeQuestions, setQuestion, setAwnser, setAwnserInput)
  }


  function createContainerLetters() {
    let containerLetters = document.createElement("div")
    containerLetters.className = "container-letters"
    return containerLetters
  }

  function createLetterByIndex(index: number) {
    let letter = document.createElement("div")
    let letterName = indexToLetter(index)
    letter.className = "container-letter"
    letter.innerHTML = `<div class="letter">${letterName}</div><div class='index-letter'>${index}</div>`
    return letter
  }

  function createAlphabetIndexDynamic() {
    let arrayAlphabet = document.getElementById("arrayAlphabet")!
    let containerLetters = createContainerLetters()
    let letter;
    for (let i = 1; i < 27; i++) {
      if ((lettersByRow === 1) || (((i - 1) % lettersByRow === 0) && (i !== 1))) {
        arrayAlphabet.appendChild(containerLetters)
        containerLetters = createContainerLetters()
      }
      letter = createLetterByIndex(i)
      containerLetters.appendChild(letter)

    }
    arrayAlphabet.appendChild(containerLetters)

  }

  function deleteAlphabetIndexDynamic() {
    document.getElementById("arrayAlphabet")!.innerHTML = ""
  }

  function hideArray() {
    let arrayAlphabet = document.getElementById("arrayAlphabet")!
    let arrayAlphabetForm = document.getElementById("arrayAlphabetForm")!
    setHideAlphabet(!hideAlphabet)
    if (hideAlphabet) {
      arrayAlphabet.style.visibility = "hidden";
      arrayAlphabetForm.style.visibility = "hidden";
    } else {
      arrayAlphabet.style.visibility = "visible";
      arrayAlphabetForm.style.visibility = "visible";
    }
  }

  useEffect(() => {
    deleteAlphabetIndexDynamic()
    createAlphabetIndexDynamic()
  }, [lettersByRow])

  useEffect(() => {
    loadNewQuestion(typeQuestions, setQuestion, setAwnser, setAwnserInput)
  }, [])


  return <div id={"home"}>
    <h1>Alpha-index est un site pour connaître la position des lettres dans l'alphabet</h1>
    <form id={"arrayAlphabetForm"}>
      <label>Nombre de lettres par lignes
        <input id="letters-by-row" min="1" max="26" type="number" value={lettersByRow}
               onChange={(e) => setLettersByRow(parseInt(e.target.value))}/>
      </label>
    </form>
    <div id={"arrayAlphabet"} className={"center-column"}></div>
    <div id={"testZone"}>
      <h2>Zone d'entrainement</h2>
      <form id={"testZoneForm"}>
        <label>Voir le tableau
          <input type="checkbox" checked={hideAlphabet} id="hideArray"
                 onChange={() => hideArray()}/>
        </label>
        <label>Type de questions
          <select
            id="type-quastions-select"
            value={typeQuestions}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setTypeQestions(e.target.value.toLowerCase() as typeQuestionsSelect)}
          >
            {typeQuestionsSelect.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
      </form>
      <div className={"center-column"}>
        <div id={"question"}>{question}</div>
        <form id={"awnser"} onSubmit={(e: FormEvent<HTMLFormElement>) => verifyAwnserAndLoadNewQuestion(e)}>
          <input type={"text"} onChange={(e: ChangeEvent<HTMLInputElement>) => setAwnserInput(e.target.value.toLowerCase())}
                 value={awnserInput} id={"awnserInput"} autoCapitalize="none" required></input>
          <button type={"submit"}>valider</button>
        </form>
      </div>
    </div>
  </div>
}