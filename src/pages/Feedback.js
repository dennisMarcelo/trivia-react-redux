import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

const MIN_SCORE = 3;

class Feedback extends React.Component {
  render() {
    const { score } = this.props;
    return (
      <>
        <Header />
        <h1
          data-testid="feedback-text"
        >
          {score >= MIN_SCORE ? 'Mandou bem!' : 'Podia ser melhor...'}
        </h1>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
});

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
