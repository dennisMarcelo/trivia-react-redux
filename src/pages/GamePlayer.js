import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { fetchQuestions } from '../helpers/fetchs';
import { getToken, savePlayer, saveRanking } from '../helpers/store';
import actionAddAssertion from '../Redux/action/actionAddAssertion';
import actionScore from '../Redux/action/actionScore';
import '../css/Game.css';
import NextImg from '../images/icons8-divisa-circulada-à-direita-96.png';
import Loading from '../components/Loading';
import Quiz from '../images/giphy (2).gif';
import TruthOrFalse from '../images/gif-Truth-is-out-there.gif';

const ZERO_POINT_FIVE = 0.5;
const ONE_SECOND = 1000;
const TEN = 10;
const HARD = 3;
const MEDIUM = 2;
const SET_TIME_LOADING = 2000;

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
      loading: true,
      multiple: false,
      boolean: false,
      test: 'test',
    };
    this.fetchQuestions = this.fetchQuestions.bind(this);
    this.handleNextQuestion = this.handleNextQuestion.bind(this);
    this.handleAnswersRender = this.handleAnswersRender.bind(this);
    this.handleCorrectClick = this.handleCorrectClick.bind(this);
    this.handleIncorrectClick = this.handleIncorrectClick.bind(this);
    this.renderButtonNext = this.renderButtonNext.bind(this);
  }

  componentDidMount() {
    this.fetchQuestions().then(() => this.setTimerState());
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
      if (question === results.length - 1 && timer === 0) clearInterval(interval);
    }, ONE_SECOND);
  }

  async fetchQuestions() {
    const { getReduxState: { config: { amount, diff, type, category } } } = this.props;
    const token = getToken();
    const { results } = await fetchQuestions(token)(amount, diff, type, category, token);
    results.forEach((el) => {
      el.sorted = el.incorrect_answers.concat(el.correct_answer)
        .sort(() => Math.random() - ZERO_POINT_FIVE);
    });
    setTimeout(() => {
      this.setState({ results },
        () => this.setState({ loading: false }));
    }, SET_TIME_LOADING);
    console.log(results);
  }

  handleNextQuestion() {
    const { results, question } = this.state;
    const { history, getReduxState: { player: {
      name, gravatarEmail, score } } } = this.props;
    if (question < results.length - 1) {
      if (results[question + 1].type === 'multiple') {
        this.setState({ multiple: true });
      }
      if (results[question + 1].type === 'boolean') {
        this.setState({ boolean: true });
      }
    } else {
      saveRanking({ name, score, picture: gravatarEmail });
      history.push('/feedback');
    }
    setTimeout(() => {
      if (question < results.length - 1) {
        this.setState((prevState) => ({
          question: prevState.question + 1,
          buttonCLick: false,
          incorrect: '',
          correct: '',
          isDisabled: false,
          timer: 30,
          multiple: false,
          boolean: false,
        }));
      }
    }, SET_TIME_LOADING);
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
    if (results[question].difficulty === 'hard') calculo = TEN + timer * HARD;
    if (results[question].difficulty === 'medium') calculo = TEN + timer * MEDIUM;
    if (results[question].difficulty === 'easy') calculo = TEN + timer;
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
    const { results, question, incorrect,
      correct, isDisabled, multiple, boolean, test } = this.state;
    if (multiple) {
      return (
        <div className="answers-btns">
          <img src={ Quiz } alt="Multipla escolha" width="400px" />
        </div>);
    }
    if (boolean) {
      return (
        <div className="answers-btns">
          <img src={ TruthOrFalse } alt="Verdadeiro ou Falso" width="350px" />
        </div>);
    } return (
      <aside className="answers-btns">
        {results[question].sorted
          .map((answer, index) => (
            answer !== results[question].correct_answer
              ? (
                <button
                  className={ `${incorrect} ${!isDisabled && test}` }
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
                  className={ `${correct} ${!isDisabled && test} ` }
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
        className="btn-next"
        type="button"
        data-testid="btn-next"
        onClick={ this.handleNextQuestion }
      >
        <img src={ NextImg } alt="next" />
      </button>
    );
  }

  render() {
    const { results, question, buttonCLick,
      timer, loading, multiple, boolean } = this.state;
    const hideInfo = !(multiple || boolean);
    return (
      <>
        <Header timer={ timer } />
        <div className="answer-question">
          {!loading && results.length > 0
            ? (
              <>
                {hideInfo && (
                  <>
                    <div className="timer">{`Timer: ${timer}`}</div>
                    <h3 data-testid="question-category">{results[question].category}</h3>
                    <p data-testid="question-text">{results[question].question}</p>
                  </>)}
                {this.handleAnswersRender()}
                {hideInfo && (
                  <div className="btn-next">
                    {buttonCLick && this.renderButtonNext() }
                  </div>)}
              </>)
            : <Loading />}
        </div>
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
  getReduxState: PropTypes.shape(Object).isRequired,
  addScore: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(GamePlayer);
