import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {isGoodAwnser, loadNewQuestion} from "../../utils/utils";
import {useNavigate} from "react-router-dom";

export default function Test() {
  let [ actualQuestion, setActualQuestion ] = useState<number>(1)
  let [question, setQuestion] = useState<string>("")
  let [awnser, setAwnser] = useState<string>("")
  let [awnserInput, setAwnserInput] = useState<string>("")
  let [score, setScore] = useState<number>(0)
  let navigate = useNavigate()

  function verifyAwnserAndLoadNewQuestion(e: FormEvent<HTMLFormElement>){
    e.preventDefault()
    if (isGoodAwnser){
      setScore(score+1)
    }
    if (actualQuestion === 100){
      navigate('/scoring', {replace: true, state: {totalScore: score}})
    } else {
      setActualQuestion(actualQuestion+1)
    }
  }

  useEffect(()=>{
    loadNewQuestion("tout", true, setQuestion, setAwnser, setAwnserInput)
  },[actualQuestion])

  return <>
    <div>
      <h1>Test</h1>
      <div>{actualQuestion}/100</div>
      <div id={"testZone"}>
        <div id={"question"}>{question}</div>
        <form onSubmit={(e: FormEvent<HTMLFormElement>) => verifyAwnserAndLoadNewQuestion(e)}>
          <input type={"text"} onChange={(e: ChangeEvent<HTMLInputElement>) => setAwnserInput(e.target.value)}
                 value={awnserInput} id={"awnserInput"}></input>
          <button type={"submit"}>valider</button>
        </form>
      </div>
    </div>
  </>
}