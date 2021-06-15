import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { img, name } = this.props;
    return (
      <section>
        <img src={ img } alt="Token" data-testid="header-profile-picture" />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">Pontuacao</p>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  img: state.user.image,
  name: state.user.name,
});

Header.propTypes = {
  img: PropTypes.shape(Object).isRequired,
  name: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Header);
