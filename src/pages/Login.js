import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import logo from '../trivia.png';
import setUserAction from '../Redux/action/setUserAction';
import fetchToken from '../helpers/fetchs';
import { saveToken } from '../helpers/store';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      isValidMail: false,
      isValidName: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.mailAndNameValidation = this.mailAndNameValidation.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidUpdate(_, prevState) {
    const { email, name } = this.state;
    if (prevState.email !== email || prevState.name !== name) {
      this.mailAndNameValidation();
    }
  }

  handleChange({ target }) {
    const { id, value } = target;
    this.setState({ [id]: value });
  }

  mailAndNameValidation() {
    const nameMin = 3;
    const { email, name } = this.state;
    this.setState({
      isValidMail: email.match(/[a-z]+@[a-z]+.com/g),
      isValidName: name.length >= nameMin,
    });
  }

  async handleClick() {
    const { setUser, history } = this.props;
    const { name, email } = this.state;
    const image = `https://www.gravatar.com/avatar/${md5(email).toString()}`;

    setUser(name, image);
    console.log(typeof history);

    const token = await fetchToken();
    saveToken(token);

    history.push('/gameplayer');
  }

  render() {
    const { isValidMail, isValidName } = this.state;

    return (
      <section>
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>
            SUA VEZ
          </p>
        </header>
        <label htmlFor="name">
          <input
            type="text"
            data-testid="input-player-name"
            id="name"
            placeholder="Name"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="email">
          <input
            type="text"
            data-testid="input-gravatar-email"
            id="email"
            placeholder="Email"
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          data-testid="btn-play"
          disabled={ !(isValidMail && isValidName) }
          onClick={ () => this.handleClick() }
        >
          Jogar
        </button>
      </section>
    );
  }
}

Login.propTypes = {
  setUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setUser: (name, image) => dispatch(setUserAction(name, image)),
});

Login.propTypes = {
  history: PropTypes.shape(Object).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
