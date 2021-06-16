import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { fetchQuestions } from '../helpers/fetchs';
import { getToken } from '../helpers/store';
import actionAddAssertion from '../Redux/action/actionAddAssertion';

const ZERO_POINT_FIVE = 0.5;
const FIVE_SECONDS = 5000;
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
    };

    this.fetchQuestions = this.fetchQuestions.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handleAnswersRender = this.handleAnswersRender.bind(this);
    this.handleCorrectClick = this.handleCorrectClick.bind(this);
    this.handleIncorrectClick = this.handleIncorrectClick.bind(this);
  }

  componentDidMount() {
    this.fetchQuestions();
  }

  async fetchQuestions() {
    const token = getToken();
    const { results } = await fetchQuestions(token);
    this.setState({ results });
    console.log(results);
  }

  handleNextClick() {
    const { results, question } = this.state;
    const { history } = this.props;

    if (question < results.length - 1) {
      this.setState((prevState) => ({
        question: prevState.question + 1,
      }));
    } else {
      history.push('/feedback');
    }
  }

  handleCorrectClick() {
    const { handleCorretAnswer } = this.props;
    handleCorretAnswer();
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
    setTimeout(() => {
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
      this.handleNextClick();
    }, FIVE_SECONDS);
  }

  handleIncorrectClick() {
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
    setTimeout(() => {
      getCorrect.style.border = ORIGINAL_BORDER_COLOR;
      getCorrect.style.backgroundColor = ORIGINAL_BORDER_COLOR;
      if (results[question].type === 'multiple') {
        getIncorrects.forEach((el) => {
          el.style.border = ORIGINAL_BORDER_COLOR;
          el.style.backgroundColor = ORIGINAL_BACKGROUND_COLOR;
        });
      } else if (results[question].type === 'boolean') {
        getIncorrects.style.border = ORIGINAL_BORDER_COLOR;
        getIncorrects.style.backgroundColor = ORIGINAL_BACKGROUND_COLOR;
      }
      this.handleNextClick();
    }, FIVE_SECONDS);
  }

  handleAnswersRender() {
    const { results, question } = this.state;
    return (
      <aside>
        {results[question].incorrect_answers
          .map((answer, index) => (
            <button
              className="incorrect"
              key={ index }
              type="button"
              data-testid={ `wrong-answer-${index}` }
              onClick={ this.handleIncorrectClick }
            >
              {answer}
            </button>))
          .concat((
            <button
              key="correct"
              id="correct"
              type="button"
              data-testid="correct-answer"
              onClick={ this.handleCorrectClick }
            >
              {results[question].correct_answer}
            </button>
          )).sort(() => Math.random() - ZERO_POINT_FIVE)}
      </aside>
    );
  }

  render() {
    const { results, question } = this.state;
    return (
      <>
        <Header />
        {results.length > 0
          && (
            <div>
              <h2 data-testid="question-category">{results[question].category}</h2>
              <p data-testid="question-text">{results[question].question}</p>
              {this.handleAnswersRender()}
              {question > 0
              && (
                <button
                  type="button"
                  data-testid="btn-next"
                  onClick={ this.handleNextClick }
                >
                  Next
                </button>
              )}
            </div>)}
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleCorretAnswer: () => dispatch(actionAddAssertion()),
});

GamePlayer.propTypes = {
  history: PropTypes.shape(Object).isRequired,
  handleCorretAnswer: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(GamePlayer);
