import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { fetchQuestions } from '../helpers/fetchs';
import { getToken } from '../helpers/store';
import actionAddAssertion from '../Redux/action/actionAddAssertion';

const ZERO_POINT_FIVE = 0.5;

class GamePlayer extends React.Component {
  constructor() {
    super();
    this.state = {
      question: 0,
      results: [],
    };

    this.fetchQuestions = this.fetchQuestions.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
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

  render() {
    const { results, question } = this.state;
    const { handleCorretAnswer } = this.props;
    return (
      <>
        <Header />
        {results.length > 0
          && (
            <div>
              <h2 data-testid="question-category">{results[question].category}</h2>
              <p data-testid="question-text">{results[question].question}</p>
              <section>
                {results[question].incorrect_answers
                  .map((answer, index) => (
                    <button
                      key={ index }
                      type="button"
                      data-testid={ `wrong-answer-${index}` }
                      onClick={ this.handleNextClick }
                    >
                      {answer}
                    </button>))
                  .concat((
                    <button
                      type="button"
                      data-testid="correct-answer"
                      onClick={ () => {
                        handleCorretAnswer();
                        this.handleNextClick();
                      } }
                    >
                      {results[question].correct_answer}
                    </button>
                  )).sort(() => Math.random() - ZERO_POINT_FIVE)}
              </section>
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
