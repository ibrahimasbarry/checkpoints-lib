import React, {Component} from 'react';
import AnimalSelect from './AnimalSelect';
import Cage from './Cage';

export default class Exhibit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedAnimal: props.selectedAnimal,
    };
    this.setAnimal = this.setAnimal.bind(this);
  }

  setAnimal (newAnimal) {
    this.setState({
      selectedAnimal: newAnimal
    });
  }

  render () {
    return (
      <div className="exhibit">
        <Cage selectedAnimal={this.state.selectedAnimal} />
        <AnimalSelect
          animals={this.props.animals}
          submitAnimal={this.setAnimal}
          />
      </div>
    );
  }

}
