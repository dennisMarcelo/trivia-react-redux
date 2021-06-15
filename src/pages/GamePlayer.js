import React from 'react';
import Header from '../components/Header';
import { fetchQuestions } from '../helpers/fetchs';
import { getToken } from '../helpers/store';

class GamePlayer extends React.Component {
  constructor() {
    super();
    this.state = {
      question: 0,
      results: [],
      // loading: true,
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
    const { results } = this.state;
    this.setState((prevState) => ({
      question: prevState.question < results.length - 1 ? prevState.question + 1 : 0 }));
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
              <section>
                <button
                  type="button"
                  data-testid="correct-answer"
                >
                  {results[question].correct_answer}
                </button>
                {results[question].incorrect_answers
                  .map((answer, index) => (
                    <button
                      key={ index }
                      type="button"
                      data-testid={ `wrong-answer-${index}` }
                    >
                      {answer}
                    </button>))}
              </section>
              <button type="button" onClick={ this.handleNextClick }>Next</button>
            </div>)}
      </>
    );
  }
}

export default GamePlayer;
