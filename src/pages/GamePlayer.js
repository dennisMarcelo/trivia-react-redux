import React from 'react';
import Header from '../components/Header';

class GamePlayer extends React.Component {
  render() {
    return (
      <>
        <Header />
        <h2 data-testid="question-category">Category</h2>
        <p data-testid="question-text">Question</p>
        <section>
          <button type="button" data-testid="correct-answer">Correta</button>
          <button type="button" data-testid="wrong-answer-${index}">Erro1</button>
        </section>
      </>
    );
  }
}

export default GamePlayer;
