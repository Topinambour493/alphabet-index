import "./scoring.css"
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
export default function Scoring() {
  const  navigate = useNavigate();
  const locate = useLocation();

  function getRedToGreen(percent: number) {
    let r = percent < 50 ? 255 : Math.floor(255 - (percent * 2 - 100) * 255 / 100);
    let g = percent > 50 ? 255 : Math.floor((percent * 2) * 255 / 100);
    return 'rgb(' + r + ',' + g + ',0)';
  }

  function sleep(ms: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  async function incrementToFinalScore(finalScore: number) {
    for (let i = 0; i <= finalScore; i++) {
      document.documentElement.style.setProperty('--color-circle', getRedToGreen(i));
      document.getElementById("score").innerHTML = `${i}`
      await sleep(40)
    }
  }

  useEffect(() => {
    console.log(locate)
    incrementToFinalScore(locate.state?.totalScore || 0)
  }, [])

  return <>
    <div id={"score"}></div>
    <button onClick={()=>navigate('/test')}>Rejouer</button>
    <button onClick={()=>navigate('/')}>Repartir à l'entrainement</button>
  </>
}