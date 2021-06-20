import React from 'react';
import { connect } from 'react-redux';
import '../css/Config.css';
import actionSelectedCategory from '../Redux/action/actionCategory';

class Config extends React.Component {
  constructor() {
    super();
    this.state = { selectedCategory: 'Enterteinment: Music' };
    this.handleSelectedCategory = this.handleSelectedCategory.bind(this);
  }

  handleSelectedCategory({ target: { value } }) {
    const { goCategory } = this.props;
    this.setState({ selectedCategory: value }, () => {
      const { selectedCategory } = this.state;
      goCategory(selectedCategory);
    });
  }

  render() {
    return (
      <div className="config-container">
        <h1 data-testid="settings-title">Configuração</h1>
        <label htmlFor="category">
          Selecione a Categoria:
          <select id="category" onChange={ this.handleSelectedCategory }>
            <option>Enterteinment: Music</option>
            <option>Science and Nature</option>
            <option>Science: Computers</option>
            <option>Video Games</option>
            <option>Board Games</option>
            <option>Japonese Anime and Manga</option>
          </select>
        </label>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  goCategory: (category) => dispatch(actionSelectedCategory(category)),
});

export default connect(null, mapDispatchToProps)(Config);
