import React, { useState } from 'react';
import './QuizComponent.scss'

interface QuizProps {
  number?: number; 
  question: string;
  choices: string[];
  correctAnswer: number; // index of the correct answer in the choices array
}

const QuizComponent: React.FC<QuizProps> = ({ number, question, choices, correctAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [attemptMade, setAttemptMade] = useState<boolean>(false);

  const correctIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check">
      <path d="M20 6L9 17l-5-5"/>
    </svg>
  );
  
  const incorrectIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x">
      <path d="M18 6L6 18M6 6l12 12"/>
    </svg>
  );
  

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);
    setAttemptMade(true);
  };

  const handleChange = (index: number) => {
    setSelectedAnswer(index);
    // Allow user to try again by enabling the submit button
    if (attemptMade) {
      setIsSubmitted(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="quiz-form">
     {/*  <fieldset> */}
     
     {/* Conditionally display "Question {number}:" if `number` is provided; otherwise, just display the question. */}
     <legend className="question">
        {number !== undefined ? `Question ${number}: ${question}` : question}
      </legend>
        {choices.map((choice, index) => (
          <label key={choice} className={`quiz-option ${selectedAnswer === index ? 'selected' : ''}`} onClick={() => handleChange(index)}>
            <input
              type="radio"
              name="choice"
              value={index}
              checked={selectedAnswer === index}
              onChange={() => handleChange(index)}
              disabled={isSubmitted && selectedAnswer === correctAnswer}
            />
            
            {choice}
          </label>
        ))}
      {/* </fieldset> */}
      <button type="submit" disabled={isSubmitted && selectedAnswer === correctAnswer}>
        Submit
      </button>
      {isSubmitted && selectedAnswer !== correctAnswer && (
        <div className="incorrect-feedback alert wrong animate-shake" role="alert">
          <div>{incorrectIcon}</div>
          <span>Incorrect. Try again!</span>
        </div>
      )}
      {isSubmitted && selectedAnswer === correctAnswer && (
        <div className="correct-feedback alert correct animate-tada" role="alert">
          <div>{correctIcon}</div>
          <span>Correct!</span>
        </div>
      )}
    </form>
  );
};

export default QuizComponent;
