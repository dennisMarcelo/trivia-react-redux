import React from 'react';

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

  render() {
    const { isValidMail, isValidName } = this.state;
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
        >
          Jogar
        </button>
      </section>
    );
  }
}

export default Login;
