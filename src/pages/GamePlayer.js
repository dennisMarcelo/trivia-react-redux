import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { fetchQuestions } from '../helpers/fetchs';
import { getToken, savePlayer, saveRanking } from '../helpers/store';
import actionAddAssertion from '../Redux/action/actionAddAssertion';
import actionScore from '../Redux/action/actionScore';

const ZERO_POINT_FIVE = 0.5;
const ONE_SECOND = 1000;
const TEN = 10;
const HARD = 3;
const MEDIUM = 2;

class GamePlayer extends React.Component {
  constructor() {
    super();
    this.state = {
      question: 0,
      results: [],
      buttonCLick: false,
      timer: 30,
      incorrect: '',
      correct: '',
      isDisabled: false,
    };

    this.fetchQuestions = this.fetchQuestions.bind(this);
    this.handleNextQuestion = this.handleNextQuestion.bind(this);
    this.handleAnswersRender = this.handleAnswersRender.bind(this);
    this.handleCorrectClick = this.handleCorrectClick.bind(this);
    this.handleIncorrectClick = this.handleIncorrectClick.bind(this);
    this.renderButtonNext = this.renderButtonNext.bind(this);
  }

  componentDidMount() {
    this.fetchQuestions();
    this.setTimerState();
  }

  setTimerState() {
    const interval = setInterval(() => {
      const { timer, isDisabled, question, results } = this.state;
      if (timer > 0) {
        this.setState((prevState) => ({
          timer: prevState.timer > 0 ? prevState.timer - 1 : 0,
        }));
      } else if (timer === 0) {
        this.setState((prevState) => ({
          timer: prevState.timer > 0 ? prevState.timer - 1 : 0,
          isDisabled: prevState.timer === 0,
          buttonCLick: prevState.timer === 0 || isDisabled,
          incorrect: 'incorrect',
          correct: 'correct',
        }));
      }
      if (question === results.length - 1 && timer === 0) {
        clearInterval(interval);
      }
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
    const { history, getReduxState: { player: {
      name, gravatarEmail, score } } } = this.props;
    if (question < results.length - 1) {
      this.setState((prevState) => ({
        question: prevState.question + 1,
        buttonCLick: false,
        incorrect: '',
        correct: '',
        isDisabled: false,
        timer: 30,
      }));
    } else {
      saveRanking({ name, score, picture: gravatarEmail });
      history.push('/feedback');
    }
  }

  handleCorrectClick() {
    this.setState({
      buttonCLick: true,
      incorrect: 'incorrect',
      correct: 'correct',
      isDisabled: true,
    });

    const { results, question, timer } = this.state;
    const { handleCorretAnswer, addScore, getReduxState } = this.props;

    let calculo = 0;
    if (results[question].difficulty === 'hard') {
      calculo = TEN + timer * HARD;
    }
    if (results[question].difficulty === 'medium') {
      calculo = TEN + timer * MEDIUM;
    }
    if (results[question].difficulty === 'easy') {
      calculo = TEN + timer;
    }
    addScore(calculo);
    handleCorretAnswer();
    getReduxState.player.score += calculo;
    getReduxState.player.assertions += 1;

    savePlayer(getReduxState);
  }

  handleIncorrectClick() {
    this.setState({
      buttonCLick: true,
      incorrect: 'incorrect',
      correct: 'correct',
      isDisabled: true,
    });
  }

  handleAnswersRender() {
    const { results, question, incorrect, correct, isDisabled } = this.state;
    return (
      <aside>
        {results[question].sorted
          .map((answer, index) => (
            answer !== results[question].correct_answer
              ? (
                <button
                  className={ incorrect }
                  key={ index }
                  type="button"
                  data-testid={ `wrong-answer-${index}` }
                  onClick={ this.handleIncorrectClick }
                  disabled={ isDisabled }
                >
                  {answer}
                </button>)
              : (
                <button
                  key="correct"
                  className={ correct }
                  type="button"
                  data-testid="correct-answer"
                  onClick={ this.handleCorrectClick }
                  disabled={ isDisabled }
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

const mapStateToProps = (state) => ({
  getReduxState: state,
});

const mapDispatchToProps = (dispatch) => ({
  handleCorretAnswer: () => dispatch(actionAddAssertion()),
  addScore: (score) => dispatch(actionScore(score)),
});

GamePlayer.propTypes = {
  history: PropTypes.shape(Object).isRequired,
  handleCorretAnswer: PropTypes.func.isRequired,
  getReduxState: PropTypes.func.isRequired,
  addScore: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(GamePlayer);
