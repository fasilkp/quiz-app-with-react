import React, {useEffect, useState} from 'react'
import {useSound} from 'use-sound'
import clickSound1 from './click2.wav'
import clickSound2 from './click3.wav'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faQuestion } from '@fortawesome/free-solid-svg-icons'
import './Home.css'
import {ClipLoader} from 'react-spinners'
import axios from 'axios'
import AOS from "aos";
import "aos/dist/aos.css";
import AlertBox from '../AlertBox/AlertBox'
function Home() {
    const [selectedOption, setSelectedOption]=useState({value:null, index:""})
    const [options, setOptions]=useState([])
    const optionStyle={ option1:"", option2:"", option3:"", option4:"" }
    const [style, setStyle]=useState(optionStyle)
    const [questions, setQuestions]=useState([])
    const [load, setLoad]=useState(true)
    const [answerChecked, setAnswerChecked]=useState(false)
    const [questionNo, setQuestionNo]=useState(0)
    const [showAlert, setShowAlert]=useState(false)
    const [score, setScore]=useState(0)
    const [check, setCheck]=useState(0);
    const [play1] = useSound(clickSound1);
    const [play2] = useSound(clickSound2);
    useEffect(()=>{
        AOS.init();
        AOS.refresh();
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
        play1();
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
        play1();
        if(questionNo>=0){
            play2();
            setShowAlert(true)
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
            setSelectedOption({value:null, index:""})
            setAnswerChecked(false)
        }


    }
  return (
      <div className="home">
           <div className="head" data-aos="zoom-in-down" data-aos-duration="500">
               <h1>Quiz Time!</h1>
           </div> 
           <div className="quiz-body" data-aos="zoom-in-down" data-aos-duration="500">
               <div className="question-no"><h4>Question {questionNo+1}</h4></div>
               <div className="question">{questions?.[questionNo]?.question ? questions[questionNo].question : null}</div>
               <ClipLoader color="darkblue" loading={load} size={50} />
                <div className="answer-container">
                    {
                       options && options.map((item, index)=>{
                            return <label className="options"  key={index} data-aos="flip-up" data-aos-duration="1500">
                                <div className="option">   
                                <div className={style['option'+index]}
                                onClick={(e)=>{ 
                                    play1();
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
                <div className="btn-container">
               {
                   answerChecked ? <button className="btn" onClick={onNext}>Next <FontAwesomeIcon icon={faArrowRight} /></button>
                   :               <button className="btn" onClick={onCheck} disabled={selectedOption.value===null}>Check <FontAwesomeIcon icon={faQuestion}/></button>
               }
           </div>
           </div>
           
           <div className="score-section">
               <div className="score-container">
                   <div className="score">Score : {score}/10</div>
                   <div className="q-no">Question : {questionNo+1}/10</div>
               </div>
           </div>
           {showAlert && <AlertBox score={score}/>}
      </div>
  )
}

export default Home