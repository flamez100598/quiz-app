import React, { Component, Fragment } from 'react';

import { Helmet } from 'react-helmet';
import M from 'materialize-css';
import isEmpty from '../../ultils/is-empty';
import axios from 'axios';
class Play extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            currentQuestion: {},
            nextQuestion: {},
            previousQuestion: {},
            answer: '',
            numberOfQuestions: 0,
            numberOfAnsweredQuestion: 0,
            currentQuestionIndex: 0,
            score: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            hints: 5,
            fiftyFifty: 2,
            usedFiftyfifty: false,
            time: {},
            play: false,
            numbersHints: []
        }
        this.interval = null;

    }
    audio = new Audio('http://streaming.tdiradio.com:8000/house.mp3');
    togglePlay = () => {
        this.setState({ play: !this.state.play }, () => {
            this.state.play ? this.audio.play() : this.audio.pause();
        });
    }
    componentDidMount() {
        let vm = this;
        axios.get('/quiz-app/master/src/question.json')
            .then(function (response) {
                vm.setState({
                    questions: response.data
                })
                const { questions, currentQuestion, nextQuestion, previousQuestion } = vm.state;
                vm.displayQuestions(questions, currentQuestion, nextQuestion, previousQuestion);

            })
            .catch(function (error) {
                console.log(error);
            })
            this.startTimer();

    }
    displayQuestions = (questions = this.state.questions, currentQuestion, nextQuestion, previousQuestion, ) => {
        let { currentQuestionIndex } = this.state;
        if (!isEmpty(questions)) {
            questions = this.state.questions;
            currentQuestion = questions[currentQuestionIndex];
            nextQuestion = questions[currentQuestionIndex + 1];
            previousQuestion = questions[currentQuestionIndex - 1];
            const answer = currentQuestion.answer;
            this.setState({
                currentQuestion,
                nextQuestion,
                previousQuestion,
                answer,
                numbersHints: [],
                usedFiftyfifty: false
            }, () => {
                this.showOptions();
            })
        }
    }
    handleOptionClick = (e) => {
        if (e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
            this.conrrectAnswer();
        } else
            this.wrongAnswer();
    }
    conrrectAnswer = () => {
        M.toast({
            html: 'Correct answer!!',
            classes: 'toast-valid',
            displayLength: 1500
        });
        this.audio.play();
        this.setState(prevState => ({
            score: prevState.score + 1,
            correctAnswers: prevState.correctAnswers + 1,
            currentQuestionIndex: (prevState.currentQuestionIndex + 1) !== this.state.questions.length ? prevState.currentQuestionIndex + 1 : prevState.currentQuestionIndex,
            numberOfAnsweredQuestion: prevState.numberOfAnsweredQuestion + 1

        }), () => {
            this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion)
        })
    }

    wrongAnswer = () => {
        navigator.vibrate(1000);
        M.toast({
            html: 'Wrong Answer!!',
            classes: 'toast-invalid',
            displayLength: 1500
        });
        this.audio.pause();
        this.setState(prevState => ({
            wrongAnswers: prevState.wrongAnswers + 1,
            currentQuestionIndex: prevState.currentQuestionIndex !== this.state.questions.length ? prevState.currentQuestionIndex + 1 : prevState.currentQuestionIndex,
            numberOfAnsweredQuestion: prevState.numberOfAnsweredQuestion + 1
        }), () => {
            this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion)
        })
    }
    clickNextButton = () => {
        if (this.state.nextQuestion !== undefined) {
            this.setState(
                prevState => ({
                    currentQuestionIndex: prevState.currentQuestionIndex + 1
                }), () => {
                    this.displayQuestions(this.state.state, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion)
                })
        }
    }
    clickPreButton = () => {
        if (this.state.previousQuestion !== undefined) {
            this.setState(
                prevState => ({
                    currentQuestionIndex: prevState.currentQuestionIndex - 1
                }), () => {
                    this.displayQuestions(this.state.state, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion)
                })
        }
    }
    clickQuitButtonClick = () => {
        if (window.confirm('Are you sure want to quit!')) {
            this.props.history.push("/");
        }
    }
    handleButtonClick = (e) => {
        switch (e.target.id) {
            case 'next-btn-click':
                this.clickNextButton();
                break;
            case 'previous-btn-click':
                this.clickPreButton();
                break;
            case 'quit-btn':
                this.clickQuitButtonClick();
                break;
            default:

        }
    }
    handleHints = (e) => {
        if (this.state.hints > 0) {
            const options = document.querySelectorAll('.option');
            let indexOfAnswer;

            options.forEach((option, index) => {
                if (option.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
                    indexOfAnswer = index;
                }
            })
            while (true) {
                const randomNumber = Math.round(Math.random() * 3);
                if (randomNumber !== indexOfAnswer && !this.state.numbersHints.includes(randomNumber)) {
                    options.forEach((option, index) => {
                        if (index === randomNumber) {
                            option.style.visibility = 'hidden';
                            this.setState((prevState) => ({
                                hints: prevState.hints - 1,
                                numbersHints: prevState.numbersHints.concat(randomNumber),
                                usedFiftyfifty: true,
                            }))
                        }
                    })
                    break;
                }
                if (this.state.numbersHints.length >= 3) {
                    break;
                }
            }
        }
    }
    handleFiftyFifty = () => {
        if (this.state.fiftyFifty > 0 && !this.state.usedFiftyfifty) {
            const options = document.querySelectorAll('.option');
            let indexOfAnswer;
            const randomNumbers = [];

            options.forEach((option, index) => {
                if (option.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
                    indexOfAnswer = index;
                }
            })
            let count = 0;
            do {
                const randomNumber = Math.round(Math.random() * 3);
                if (randomNumber !== indexOfAnswer) {
                    if (randomNumbers.length < 2 && !randomNumbers.includes(randomNumber) && !randomNumbers.includes(indexOfAnswer)) {
                        count++;
                        randomNumbers.push(randomNumber);
                    } else {
                        while (true) {
                            const newRandomNumber = Math.round(Math.random() * 3);
                            if (!randomNumbers.includes(newRandomNumber) && !randomNumbers.includes(indexOfAnswer)) {
                                count++;
                                randomNumbers.push(newRandomNumber);
                                break;
                            }
                            if (randomNumbers >= 3) {
                                break;
                            }
                            break;
                        }
                    }
                }
            } while (count < 2);

            options.forEach((option, index) => {
                if (randomNumbers.includes(index)) {
                    option.style.visibility = 'hidden';
                }
            })
            this.setState((prevState) => ({
                fiftyFifty: prevState.fiftyFifty - 1,
                usedFiftyfifty: true,
                numbersHints: prevState.numbersHints.concat(randomNumbers)
            }))
        }
    }
    showOptions = () => {
        const options = document.querySelectorAll('.option');
        options.forEach(option => {
            option.style.visibility = 'visible'
        })
    }

    startTimer = () => {
        const countDownTime = Date.now() + 180000;
        console.log(countDownTime)

        this.interval = setInterval(() => {
            const now = new Date();
            const distance = countDownTime - now;
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor(((distance % (1000 * 60 * 60)) / 1000));
            if (distance < 0) {
                clearInterval(this.interval);
                this.setState({
                    time: {
                        minutes: 0,
                        seconds: 0
                    }
                }, this.endedGame())
            } else {
                this.setState({
                    time: {
                        minutes: minutes,
                        seconds: seconds - minutes * 60
                    }
                })
            }
        }, 1000);
    }
    componentDidUpdate() {
        if (this.state.numberOfAnsweredQuestion === this.state.questions.length) {
            this.endedGame();
        }
    }
    endedGame = () => {
        alert("Quiz has ended");
        this.props.history.push('/')
    }
    render() {
        const { time, hints, currentQuestion, currentQuestionIndex, questions, fiftyFifty } = this.state;
        return (
            <Fragment>
                <Helmet>
                    <title>Quiz Page</title>
                </Helmet>
                <Fragment>
                    <div>
                    </div>

                </Fragment>
                <div className="questions">
                    <h2>Quiz mode</h2>
                    <div className="lifeline-container">
                        <p onClick={this.handleFiftyFifty} style={{ cursor: 'pointer' }}>
                            <span className="mdi mdi-set-center mdi-24px lifeline-icon"></span><span className="lifeline">{fiftyFifty}</span>
                        </p>
                        <p onClick={this.handleHints} style={{ cursor: 'pointer' }}>
                            <span className="mdi mdi-lightbulb-on-outline mdi-24px lifeline-icon"></span><span className="lifeline">{hints}</span>
                        </p>
                    </div>
                    <div className="lifeline-container">
                        <p>
                            <span>{currentQuestionIndex + 1} of {questions.length}</span>

                        </p>
                        <p>
                            <span className="mdi mdi-clock-outline mdi-24px"></span> {time.minutes} : {time.seconds}
                        </p>
                    </div>
                    <h5>{currentQuestion.question}</h5>
                    <div className="options-container">
                        <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionA}</p>
                        <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionB}</p>
                    </div>
                    <div className="options-container">
                        <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionC}</p>
                        <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionD}</p>
                    </div>
                    <div className="button-container">
                        <button id="previous-btn-click" onClick={this.handleButtonClick} >Previous</button>
                        <button id="next-btn-click" onClick={this.handleButtonClick} >Next</button>
                        <button id="quit-btn" onClick={this.handleButtonClick} >Quit</button>
                    </div>
                </div>

            </Fragment>
        );
    }
}

export default Play;
