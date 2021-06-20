import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import '../css/Feedback.css';
import Cheers from '../images/Cheers.gif';
import Damn from '../images/Damn.gif';

const MIN_SCORE = 3;

class Feedback extends React.Component {
  render() {
    const { assertions, score, history } = this.props;
    return (
      <div className="feedback-container">
        <Header />
        <h1 data-testid="feedback-text">
          {assertions >= MIN_SCORE
            ? (
              <>
                <span>Mandou bem!</span>
                <img src={ Cheers } alt="Vibrating" height="80px" />
              </>)
            : (
              <>
                <img src={ Damn } alt="Try Againg" height="80px" />
                <span>Podia ser melhor...</span>
              </>)}
        </h1>

        <h3 data-testid="feedback-total-question">
          {`Voce acertou ${assertions} questoes`}
        </h3>

        <h3 data-testid="feedback-total-score">
          {`Seu score total foi de: ${score} pontos`}
        </h3>

        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => history.push('/') }
        >
          Jogar novamente
        </button>

        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ () => history.push('/ranking') }
        >
          Ver Ranking
        </button>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: Number(state.player.assertions),
  score: state.player.score,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape(Object).isRequired,
};

export default connect(mapStateToProps)(Feedback);
