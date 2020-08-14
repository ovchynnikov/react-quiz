import React, {Component} from 'react';
import classes from './Quiz.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';

class Quiz extends Component {
    state= {
        results: {}, // { [id]: success error }
        isFinished: false,
        activeQuestion: 0,
        answerState: null,// { [id]: 'success' 'error' }
        quiz: [
            {   question: 'Do you have work experience in Canada?',
                rightAnswerId: 2, /* logic will be changed*/
                id: 1,
                answers: [
                    {text: 'No or less than a year', id:1},
                    {text: '2 year', id:2},
                    {text: '3 years', id:3},
                    {text: '4 or more years', id:4}
                ]
            },
            {   question: 'Marriage status',
                rightAnswerId: 1, /* logic will be changed*/
                id: 2,
                answers: [
                    {text: 'Not Married', id:1},
                    {text: 'Married', id:2},
                    {text: 'Divorced', id:3},
                    {text: 'Widow', id:4}
                ]
            }
        ]
    }


    onAnswerClickHandler = (answerId) => {
        if(this.state.answerState){
            const key = Object.keys(this.state.answerState)[0]
            if (this.state.answerState[key] === 'success') {
                return
            }
        }

        console.log('Answer Id: ', answerId)

        const question = this.state.quiz[this.state.activeQuestion]
        const results = this.state.results;
        
        if (question.rightAnswerId === answerId) {
            if(!results[answerId]){
                results[answerId] = 'success'
            }
           

            this.setState({
                answerState: {[answerId]: 'success'}
            })
            console.log('Matching CORRECT AnswerId is: ', answerId , ' and question.rightAnswerId: ', question.rightAnswerId )
            const timeout = window.setTimeout(() => {
                if (this.isQuizFinished()) {
                    this.setState({
                        isFinished: true
                    })
                    console.log("Finished")
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }

                window.clearTimeout(timeout)
            }, 1000)

            
        } else {
            results[question.id] = 'error'
            this.setState({
                answerState: {[answerId]: 'error'},
                results: results  // can be written in 1 word                    
            })
        }
    }

    isQuizFinished() {
        return (this.state.activeQuestion + 1 === this.state.quiz.length);
    }   

    retryHandler = () => {
        this.setState({
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
            results: {}
        })
    }

    render(){
        return(
            <div className={classes.Quiz}>
                
                <div className={classes.QuizWrapper}>
                <h1>Please answer all questions to complete</h1>
                {
                    this.state.isFinished 
                ? <FinishedQuiz 
                    onRetry={this.retryHandler}
                    results = {this.state.results}
                    quiz = {this.state.quiz}
                
                
                /> 
                : <ActiveQuiz 
                answers={this.state.quiz[this.state.activeQuestion].answers} 
                question={this.state.quiz[this.state.activeQuestion].question}
                onAnswerClick={this.onAnswerClickHandler}
                quizLength={this.state.quiz.length}
                answerNumber={this.state.activeQuestion + 1}
                state={this.state.answerState}
                
                />
                }
                
                </div>
                
            </div>
        )
    }
} 

export default Quiz;