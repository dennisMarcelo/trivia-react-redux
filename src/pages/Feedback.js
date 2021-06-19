import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import '../css/Feedback.css';

const MIN_SCORE = 3;

class Feedback extends React.Component {
  render() {
    const { assertions, score, history } = this.props;
    return (
      <div className="feedback-container">
        <Header />
        <h1 data-testid="feedback-text">
          {assertions >= MIN_SCORE ? 'Mandou bem!' : 'Podia ser melhor...'}
        </h1>

        <h3 data-testid="feedback-total-question">
          { assertions }
        </h3>

        <h3 data-testid="feedback-total-score">
          { score }
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
