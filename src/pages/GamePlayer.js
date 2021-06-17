import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { fetchQuestions } from '../helpers/fetchs';
import { getToken } from '../helpers/store';
import actionAddAssertion from '../Redux/action/actionAddAssertion';
import {
  actionScoreHard,
  actionScoreMedium,
  actionScoreEasy } from '../Redux/action/actionScore';

const ZERO_POINT_FIVE = 0.5;
const ONE_SECOND = 1000;
const FIVE_SECONDS = 5000;
const TIMER = 30;
const CORRECT_ANSWER_BORDER = '3px solid rgb(6, 240, 15)';
const INCORRECT_ANSWER_BORDER = '3px solid rgb(255, 0, 0)';
const CORRECT_ANSWER_BACKGROUND = 'rgb(6, 240, 15)';
const INCORRECT_ANSWER_BACKGROUND = 'rgb(255, 0, 0)';
const ORIGINAL_BORDER_COLOR = '3px solid rgb(239, 239, 239)';
const ORIGINAL_BACKGROUND_COLOR = 'rgb(239, 239, 239)';
const INCORRECT = '.incorrect';

class GamePlayer extends React.Component {
  constructor() {
    super();
    this.state = {
      question: 0,
      results: [],
      buttonCLick: false,
      timer: 30,
    };

    this.fetchQuestions = this.fetchQuestions.bind(this);
    this.handleNextQuestion = this.handleNextQuestion.bind(this);
    this.handleAnswersRender = this.handleAnswersRender.bind(this);
    this.handleCorrectClick = this.handleCorrectClick.bind(this);
    this.handleIncorrectClick = this.handleIncorrectClick.bind(this);
    this.renderButtonNext = this.renderButtonNext.bind(this);
    this.setTimerState = this.setTimerState.bind(this);
  }

  componentDidMount() {
    this.fetchQuestions();
    this.setTimerState();
  }

  setTimerState() {
    setInterval(() => {
      this.setState((prevState) => ({
        timer: prevState.timer > 0 ? prevState.timer - 1 : TIMER,
        question: prevState.timer === 0 ? prevState.question + 1 : prevState.question,
      }));
    }, ONE_SECOND);
  }

  async fetchQuestions() {
    const token = getToken();
    const { results } = await fetchQuestions(token);
    results.forEach((el) => {
      el.sorted = el.incorrect_answers.concat(el.correct_answer)
        .sort(() => Math.random() - ZERO_POINT_FIVE);
    });
    this.setState({ results });
    console.log(results);
  }

  handleNextQuestion() {
    const { results, question } = this.state;
    const { history } = this.props;
    if (question < results.length - 1) {
      this.setState((prevState) => ({
        question: prevState.question + 1,
        buttonCLick: false,
      }));
    } else {
      history.push('/feedback');
    }
  }

  showAnswers() {
    const { results, question } = this.state;
    const getCorrect = document.querySelector('#correct');
    const getIncorrects = results[question].incorrect_answers.length === 1
      ? document.querySelector(INCORRECT)
      : document.querySelectorAll(INCORRECT);
    getCorrect.style.border = CORRECT_ANSWER_BORDER;
    getCorrect.style.backgroundColor = CORRECT_ANSWER_BACKGROUND;
    if (results[question].type === 'multiple') {
      getIncorrects.forEach((el) => {
        el.style.border = INCORRECT_ANSWER_BORDER;
        el.style.backgroundColor = INCORRECT_ANSWER_BACKGROUND;
      });
    } else if (results[question].type === 'boolean') {
      getIncorrects.style.border = INCORRECT_ANSWER_BORDER;
      getIncorrects.style.backgroundColor = INCORRECT_ANSWER_BACKGROUND;
    }
  }

  resetAnswsers() {
    const { results, question } = this.state;
    const getCorrect = document.querySelector('#correct');
    const getIncorrects = results[question].incorrect_answers.length === 1
      ? document.querySelector(INCORRECT)
      : document.querySelectorAll(INCORRECT);
    getCorrect.style.border = ORIGINAL_BORDER_COLOR;
    getCorrect.style.backgroundColor = ORIGINAL_BACKGROUND_COLOR;
    if (results[question].type === 'multiple') {
      getIncorrects.forEach((el) => {
        el.style.border = ORIGINAL_BORDER_COLOR;
        el.style.backgroundColor = ORIGINAL_BACKGROUND_COLOR;
      });
    } else if (results[question].type === 'boolean') {
      getIncorrects.style.border = ORIGINAL_BORDER_COLOR;
      getIncorrects.style.backgroundColor = ORIGINAL_BACKGROUND_COLOR;
    }
  }

  handleCorrectClick() {
    const { results, question, timer } = this.state;
    this.setState({ buttonCLick: true });
    const {
      handleCorretAnswer,
      handleHardScore,
      handleMediumScore,
      handleEasyScore } = this.props;
    if (results[question].difficulty === 'hard') { handleHardScore(timer); }
    if (results[question].difficulty === 'medium') { handleMediumScore(timer); }
    if (results[question].difficulty === 'easy') { handleEasyScore(timer); }
    handleCorretAnswer();
    this.showAnswers();
    setTimeout(() => {
      this.resetAnswsers();
      this.handleNextQuestion();
      this.setState({ timer: 30 });
    }, FIVE_SECONDS);
  }

  handleIncorrectClick() {
    this.setState({ buttonCLick: true });
    this.showAnswers();
    setTimeout(() => {
      console.log('oi');
      this.resetAnswsers();
      this.handleNextQuestion();
      this.setState({ timer: 30 });
    }, FIVE_SECONDS);
  }

  handleAnswersRender() {
    const { results, question } = this.state;
    return (
      <aside>
        {results[question].sorted
          .map((answer, index) => (
            answer === results[question].incorrect_answers
              ? (
                <button
                  className="incorrect"
                  key={ index }
                  type="button"
                  data-testid={ `wrong-answer-${index}` }
                  onClick={ this.handleIncorrectClick }
                >
                  {answer}
                </button>)
              : (
                <button
                  key="correct"
                  id="correct"
                  type="button"
                  data-testid="correct-answer"
                  onClick={ this.handleCorrectClick }
                >
                  {answer}
                </button>)
          ))}
      </aside>);
  }

  renderButtonNext() {
    return (
      <button
        type="button"
        data-testid="btn-next"
        onClick={ this.handleNextQuestion }
      >
        Next
      </button>
    );
  }

  render() {
    const { results, question, buttonCLick, timer } = this.state;
    return (
      <>
        <Header />
        <p>{timer}</p>
        {results.length > 0
          && (
            <div>
              <h2 data-testid="question-category">{results[question].category}</h2>
              <p data-testid="question-text">{results[question].question}</p>
              {this.handleAnswersRender()}
              {buttonCLick && this.renderButtonNext() }
            </div>)}
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleCorretAnswer: () => dispatch(actionAddAssertion()),
  handleHardScore: (time) => dispatch(actionScoreHard(time)),
  handleMediumScore: (time) => dispatch(actionScoreMedium(time)),
  handleEasyScore: (time) => dispatch(actionScoreEasy(time)),
});

GamePlayer.propTypes = {
  history: PropTypes.shape(Object).isRequired,
  handleCorretAnswer: PropTypes.func.isRequired,
  handleHardScore: PropTypes.func.isRequired,
  handleMediumScore: PropTypes.func.isRequired,
  handleEasyScore: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(GamePlayer);
