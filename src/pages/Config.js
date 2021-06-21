import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../css/Config.css';
import actionSelectedCategory from '../Redux/action/actionCategory';
import GetBack from '../images/icons8-retornar-96.png';
import actionQuestionsAmount from '../Redux/action/actionQuestionsAmount';

class Config extends React.Component {
  constructor() {
    super();
    this.state = { };
    this.handleSelectedCategory = this.handleSelectedCategory.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange({ target: { id, value } }) {
    const { goAmount } = this.props;
    goAmount(value);
    this.setState({ [id]: value });
  }

  handleSelectedCategory({ target: { id, value } }) {
    const { goCategory } = this.props;
    goCategory(Number(value));
    this.setState({ [id]: value });
  }

  handleCategorySelect() {
    const { category } = this.state;
    return (
      <label htmlFor="category">
        Selecione a Categoria:
        <select
          id="category"
          onChange={ this.handleSelectedCategory }
          value={ category }
        >
          <option value="9">General Knowledge</option>
          <option value="10">Enterteinment: Books</option>
          <option value="11">Enterteinment: Film</option>
          <option value="12">Enterteinment: Music</option>
          <option value="17">Science and Nature</option>
          <option value="18">Science: Computers</option>
          <option value="15">Video Games</option>
          <option value="16">Board Games</option>
          <option value="6">Japonese Anime and Manga</option>
        </select>
      </label>
    );
  }

  render() {
    const { history } = this.props;
    return (
      <div className="config-container">
        <h1 data-testid="settings-title">Configuração</h1>
        <label htmlFor="amount">
          Quantidade de perguntas:
          <input id="amount" type="number" onChange={ this.handleInputChange } />
        </label>
        {this.handleCategorySelect()}
        <button type="button" onClick={ () => history.push('/') }>
          <img src={ GetBack } alt="Get back to home page" />
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  goCategory: (category) => dispatch(actionSelectedCategory(category)),
  goAmount: (amount) => dispatch(actionQuestionsAmount(amount)),
});

Config.propTypes = {
  goCategory: PropTypes.func.isRequired,
  goAmount: PropTypes.func.isRequired,
  history: PropTypes.shape(Object).isRequired,
};

export default connect(null, mapDispatchToProps)(Config);
