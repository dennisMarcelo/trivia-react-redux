import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import setUserAction from '../Redux/action/setUserAction';

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
    const nameMin = 6;
    const { email, name } = this.state;
    this.setState({
      isValidMail: email.match(/[a-z]+@[a-z]+.com/g),
      isValidName: name.length >= nameMin,
    });
  }

  handleClick() {
    // Salvar Token no LocalStorage
    // Enviar os dados do usuario para o state do Redux
    // Fazer requisicao a API
  }

  render() {
    const { isValidMail, isValidName, name, email } = this.state;
    const { setUser } = this.props;
    return (
      <section>
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
          onClick={ () => setUser(name, email) }
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
  setUser: (name, email) => dispatch(setUserAction(name, email)),
});

export default connect(null, mapDispatchToProps)(Login);
