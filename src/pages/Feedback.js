import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import '../css/Feedback.css';
import Cheers from '../images/Cheers.gif';
import Damn from '../images/Damn.gif';
import recomeçar from '../images/icons8-reiniciar-96.png';
import rankin from '../images/icons8-pódio-96.png';

const MIN_SCORE = 3;

class Feedback extends React.Component {
  buttonsControlers() {
    const { history } = this.props;
    return (
      <>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => history.push('/') }
        >
          <img src={ recomeçar } alt="Jogar Novamente" />
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ () => history.push('/ranking') }
        >
          <img src={ rankin } alt="ranking" />
        </button>
      </>
    );
  }

  render() {
    const { assertions, score } = this.props;
    return (
      <div className="container-padding-top">
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
          <h3>
            {'Voce acertou '}
            <span data-testid="feedback-total-question">{assertions}</span>
            {assertions === 1 ? ' questao' : ' questoes' }
          </h3>
          <h3>
            { 'Seu score total foi de: '}
            <span data-testid="feedback-total-score">
              {score}
            </span>
            {'  pontos'}
          </h3>
          <div className="buttons-controlers">
            {this.buttonsControlers()}
          </div>
        </div>
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
