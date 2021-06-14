import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <section>
        <img src="" alt="" data-testid="header-profile-picture" />
        <p data-testid="header-player-name">Name:</p>
        <p data-testid="header-score">Pontuacao</p>
      </section>
    );
  }
}

export default Header;
