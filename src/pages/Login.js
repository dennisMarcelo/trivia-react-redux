import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import logo from '../trivia.png';
import setUserAction from '../Redux/action/setUserAction';
import { fetchToken } from '../helpers/fetchs';
import { saveToken } from '../helpers/store';
import reloadAction from '../Redux/action/reloadAction';

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

  componentDidMount() {
    const { clearUser } = this.props;
    clearUser();
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
    const gravatarEmail = `https://www.gravatar.com/avatar/${md5(email).toString()}`;

    setUser(name, gravatarEmail);

    const token = await fetchToken();
    saveToken(token);

    history.push('/gameplayer');
  }

  render() {
    const { isValidMail, isValidName } = this.state;
    const { history } = this.props;

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
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ () => history.push('/config') }
        >
          Configuração
        </button>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setUser: (name, gravatarEmail) => dispatch(setUserAction(name, gravatarEmail)),
  clearUser: () => dispatch(reloadAction()),
});

Login.propTypes = {
  history: PropTypes.shape(Object).isRequired,
  setUser: PropTypes.func.isRequired,
  clearUser: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
