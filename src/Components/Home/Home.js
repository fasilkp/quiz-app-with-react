import Reac, {useEffect, useState} from 'react'
import './Home.css'
import axios from 'axios'
function Home() {
    const [selectedOption, setSelectedOption]=useState('')
    const [questions, setQuestions]=useState([])
    const [questionNo, setQuestionNo]=useState(0)
    const onSelectionChange=(e)=>{
        setSelectedOption(e.target.value)
        console.log(selectedOption);
    }
    const onNext=()=>{
        setQuestionNo(questionNo+1)
    }
    useEffect(()=>{
        axios.get('https://opentdb.com/api.php?amount=10&category=21&type=multiple')
            .then(function (response) {
                const result=response.data.results;
                console.log(result)
                setQuestions(result)
            })
            .catch(function (error) {
                console.log(error);
                alert("something went wrong")
            })
    },[])
  return (
      <div className="home">
           <div className="head">
               <h1>Quiz Time!</h1>
           </div>
           <div className="quiz-body">
               <div className="question-no"><h4>Question 1</h4></div>
               <div className="question">{questions?.[questionNo]?.question ? questions[questionNo].question : null}</div>
                <div className="answer-container">
                    <label className="options" >
                        <div><input type="radio" value="0" id="option1" name="options" onChange={onSelectionChange}></input>Option 1</div>
                    </label>
                    <label className="options" >
                        <div><input type="radio" value="1" id="option2" name="options" onChange={onSelectionChange}/>Option 1</div>
                    </label>
                    <label className="options" >
                        <div><input type="radio" value="2" id="option3" name="options" onChange={onSelectionChange}/>Option 1</div>
                    </label>
                    <label className="options" >
                        <div><input type="radio" value="3" id="option4" name="options" onChange={onSelectionChange}/>Option 1</div>
                    </label>
                </div>
           </div>
           <div className="btn-container">
               <button className="btn" onClick={onNext}>Next</button>
           </div>
           <div className="score-section">
               <div className="score-container">
                   <div className="score">Score : 7/10</div>
                   <div className="q-no">Question : {questionNo+1}/10</div>
               </div>
           </div>
      </div>
  )
}

export default Home