import React, {useEffect, useState} from 'react'
import './Home.css'
import {ClipLoader} from 'react-spinners'
import axios from 'axios'
function Home() {
    const [selectedOption, setSelectedOption]=useState({value:"", index:""})
    const [options, setOptions]=useState([])
    const optionStyle={ option1:"", option2:"", option3:"", option4:"" }
    const [style, setStyle]=useState(optionStyle)
    const [questions, setQuestions]=useState([])
    const [load, setLoad]=useState(true)
    const [answerChecked, setAnswerChecked]=useState(false)
    const [questionNo, setQuestionNo]=useState(0)
    const [score, setScore]=useState(0)
    useEffect(()=>{
        axios.get('https://opentdb.com/api.php?amount=10&category=21&type=multiple')
            .then(function (response) {
                const result=response.data.results;
                setQuestions(result)
                var arr=[...result[questionNo].incorrect_answers]
                var rn=Math.floor(Math.random()*3)
                var temp=arr[rn];
                arr[rn]=result[questionNo].correct_answer;
                arr[3]=temp;
                setOptions([...arr])
                setLoad(false)
            }).catch(function (error) {
                console.log(error);
            })
    },[])
    const onCheck=()=>{
        setAnswerChecked(true)
        if(questions[questionNo].correct_answer==selectedOption.value){
            setScore(score+1)
            setStyle({...optionStyle, ["option"+options.indexOf(questions[questionNo].correct_answer)]:"selectedOptionCorrect"})
        }
        else{
            setStyle({...style, 
                ["option"+selectedOption.index]:"selectedOptionWrong",
                ["option"+options.indexOf(questions[questionNo].correct_answer)]:"selectedOptionCorrect"
            })
        }
       
    }
    const onNext=()=>{
        if(questionNo>=9){
            alert("Game over! Your Score : "+score)
        }
        else{
            setQuestionNo(questionNo+1)
            var arr=[...questions[questionNo+1].incorrect_answers]
            var rn=Math.floor(Math.random()*3)
            var temp=arr[rn];
            arr[rn]=questions[questionNo+1].correct_answer;
            arr[3]=temp;
            setOptions([...arr])
            setStyle({...optionStyle});
            setSelectedOption({value:"", index:""})
            setAnswerChecked(false)
        }

    }
  return (
      <div className="home">
           <div className="head">
               <h1>Quiz Time!</h1>
           </div>
           <div className="quiz-body">
               <div className="question-no"><h4>Question {questionNo+1}</h4></div>
               <div className="question">{questions?.[questionNo]?.question ? questions[questionNo].question : null}</div>
               <ClipLoader color="darkblue" loading={load} size={50} />
                <div className="answer-container">
                    {
                       options && options.map((item, index)=>{
                            return <label className="options"  key={index}>
                                <div className="option">   
                                <div className={style['option'+index]}
                                onClick={(e)=>{ 
                                    setSelectedOption({value:item, index:index})
                                    if(!answerChecked){
                                        setStyle({...optionStyle, ["option"+index]:"selectedOption"}) }}
                                    }>
                                    
                                    {index+1+". "+item}</div>
                                </div>
                            </label>
                        })
                    }
                </div>
           </div>
           <div className="btn-container">
               <button className="btn" onClick={onNext} disabled={!answerChecked}>Next</button>
               <button className="btn" onClick={onCheck} disabled={selectedOption.value=="" || answerChecked}>Check</button>
           </div>
           <div className="score-section">
               <div className="score-container">
                   <div className="score">Score : {score}/10</div>
                   <div className="q-no">Question : {questionNo+1}/10</div>
               </div>
           </div>
      </div>
  )
}

export default Home