import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../css/Config.css';
import GetBack from '../images/icons8-retornar-96.png';
import { selectedCategory,
  questionsAmount,
  questionType,
  questionDifficulty }
  from '../Redux/action/actionsConfig';
import { fetchCategories } from '../helpers/fetchs';
import Loading from '../images/config-load(2).gif';

const SET_TIME_LOADING = 1000;

class Config extends React.Component {
  constructor() {
    super();
    this.state = { category: [], loading: true };
    this.handleNumerChange = this.handleNumerChange.bind(this);
    this.setCategoriesState = this.setCategoriesState.bind(this);
    this.handleDifficultyChange = this.handleDifficultyChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleSelectedCategory = this.handleSelectedCategory.bind(this);
  }

  componentDidMount() {
    this.setCategoriesState();
  }

  async setCategoriesState() {
    const response = await fetchCategories().then((res) => (
      res.trivia_categories.concat([{ id: 0, name: 'Any Category' }])
    ));
    response.sort((a, b) => a.id - b.id);
    setTimeout(() => {
      this.setState({ category: response }, () => this.setState({ loading: false }));
    }, SET_TIME_LOADING);
  }

  handleNumerChange({ target: { id, value } }) {
    const { goAmount } = this.props;
    goAmount(Number(value));
    this.setState({ [id]: value });
  }

  handleDifficultyChange({ target: { id, value } }) {
    const { goDifficulty } = this.props;
    if (value === '0') goDifficulty(Number(value));
    else goDifficulty(value);
    this.setState({ [id]: value });
  }

  handleTypeChange({ target: { id, value } }) {
    const { goType } = this.props;
    if (value === '0') goType(Number(value));
    else goType(value);
    this.setState({ [id]: value });
  }

  handleSelectedCategory({ target: { value } }) {
    const { goCategory } = this.props;
    goCategory(Number(value));
  }

  handleCategorySelect() {
    const { category } = this.state;
    return (
      <label htmlFor="category">
        Select Category:
        <select
          id="category"
          onChange={ this.handleSelectedCategory }
        >
          {category.map((ele) => (
            <option key={ ele.id } value={ ele.id }>{ele.name}</option>
          ))}
        </select>
      </label>
    );
  }

  render() {
    const { history } = this.props;
    const { loading } = this.state;
    return (
      !loading ? (
        <div className="config-container">
          <h1 data-testid="settings-title">Settings:</h1>
          <label htmlFor="amount">
            Number of Questions:
            <input
              id="amount"
              type="number"
              min="5"
              onChange={ this.handleNumerChange }
            />
          </label>
          <label htmlFor="difficulty" onChange={ this.handleDifficultyChange }>
            Select Difficulty:
            <select id="difficulty">
              <option value="0">Any Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </label>
          <label htmlFor="type-anwser" onChange={ this.handleTypeChange }>
            Select Type:
            <select id="type-anwser">
              <option value="0">Any Type</option>
              <option value="boolean">True or False</option>
              <option value="multiple">Multiple Choise</option>
            </select>
          </label>
          {this.handleCategorySelect()}
          <button type="button" onClick={ () => history.push('/') }>
            <img src={ GetBack } alt="Get back to home page" />
          </button>
        </div>)
        : (
          <div className="config-container">
            <img src={ Loading } width="100%" height="100%" alt="Other loading" />
          </div>)
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  goCategory: (category) => dispatch(selectedCategory(category)),
  goAmount: (amount) => dispatch(questionsAmount(amount)),
  goType: (type) => dispatch(questionType(type)),
  goDifficulty: (difficulty) => dispatch(questionDifficulty(difficulty)),
});

Config.propTypes = {
  goCategory: PropTypes.func.isRequired,
  goAmount: PropTypes.func.isRequired,
  goType: PropTypes.func.isRequired,
  goDifficulty: PropTypes.func.isRequired,
  history: PropTypes.shape(Object).isRequired,
};

export default connect(null, mapDispatchToProps)(Config);
