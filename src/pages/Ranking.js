import React from 'react';
import PropTypes from 'prop-types';
import { getRanking } from '../helpers/store';
import '../css/Ranking.css';
import recover from '../images/icons8-reiniciar-96.png';

class Ranking extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ranking: [],
    };
  }

  componentDidMount() {
    this.setRanking();
  }

  setRanking() {
    const ranking = getRanking();
    ranking.sort((a, b) => b.score - a.score);
    this.setState({
      ranking,
    });
  }

  userScore(user, i) {
    return (
      <li key={ i }>
        <img src={ user.picture } alt={ user.name } />
        <span data-testid={ `player-score-${i}` }>{`---${user.score}---`}</span>
        <span data-testid={ `player-name-${i}` }>{`${user.name}`}</span>
      </li>
    );
  }

  render() {
    const { history } = this.props;
    const { ranking } = this.state;

    return (
      <div className="container-padding-top">
        <section className="raking-container">
          <h1 data-testid="ranking-title">Ranking</h1>
          <ol>
            {ranking.map((user, i) => this.userScore(user, i))}
          </ol>
          <button
            type="button"
            data-testid="btn-go-home"
            onClick={ () => history.push('/') }
          >
            <img src={ recover } alt="recomeçar jogo" />
          </button>
        </section>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape(Object).isRequired,
};

export default Ranking;
