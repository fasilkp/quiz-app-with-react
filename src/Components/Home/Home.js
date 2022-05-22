import React from 'react'
import './Home.css'
function Home() {
  return (
      <div className="home">
           <div className="head">
               <h1>Quiz Time!</h1>
           </div>
           <div className="quiz-body">
               <div className="question-no"><h4>Question 1</h4></div>
               <div className="question">In the Batman comics, by what other name is the villain 
                Dr. Jonathan Crane known?</div>
                <div className="anser-container">
                    <div className="options">Option 1</div>
                    <div className="options">Option 2</div>
                    <div className="options">Option 3</div>
                    <div className="options">Option 4</div>
                </div>
           </div>
      </div>
  )
}

export default Home