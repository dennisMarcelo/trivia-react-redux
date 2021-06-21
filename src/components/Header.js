import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../css/Header.css';

class Header extends React.Component {
  render() {
    const { img, name, score } = this.props;
    return (
      <header className="header-content">
        <img src={ img } alt="GavatarImage" data-testid="header-profile-picture" />
        <div>
          <span data-testid="header-player-name">{ name }</span>
        </div>
        <div>
          {'Score: '}
          <span data-testid="header-score">{ score }</span>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  img: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
});

Header.propTypes = {
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Header);
