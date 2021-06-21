import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import setUserAction from '../Redux/action/setUserAction';
import { fetchToken } from '../helpers/fetchs';
import { savePlayer, saveToken } from '../helpers/store';
import reloadAction from '../Redux/action/reloadAction';
import '../css/Login.css';
import ConfigImg from '../images/icons8-settings-128.png';
import PlayGame from '../images/icons8-play-96.png';
import LoginImg from '../images/28_generated.jpg';

const REGEX_EMAIL = /^[a-z0-9.]+@[a-z0-9]+.[a-z]+(.[a-z]+)?$/i;

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
      isValidMail: email.match(REGEX_EMAIL),
      isValidName: name.length >= nameMin,
    });
  }

  async handleClick() {
    const { setUser, history } = this.props;
    const { name, email } = this.state;
    const gravatarEmail = `https://www.gravatar.com/avatar/${md5(email).toString()}`;

    setUser(name, gravatarEmail);

    savePlayer({ player: {
      name,
      assertions: 0,
      score: 0,
      gravatarEmail,
    } });

    const token = await fetchToken();
    saveToken(token);
    history.push('/gameplayer');
  }

  renderInputs() {
    return (
      <>
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
      </>
    );
  }

  render() {
    const { isValidMail, isValidName } = this.state;
    const { history } = this.props;

    return (
      <div className="container-padding-top">
        <div className="login-container">
          <img src={ LoginImg } alt="Trivia" width="400px" />

          {this.renderInputs()}
          <section>
            <button
              type="button"
              data-testid="btn-settings"
              onClick={ () => history.push('/config') }
              id="config"
            >
              <img src={ ConfigImg } alt="settings" />
            </button>
            <button
              type="button"
              data-testid="btn-play"
              disabled={ !(isValidMail && isValidName) }
              onClick={ () => this.handleClick() }
              id="play"
            >
              <img
                src={ PlayGame }
                alt="player"
                className={ !(isValidMail && isValidName) ? 'transparente' : '' }
              />
            </button>
          </section>
        </div>
      </div>
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
