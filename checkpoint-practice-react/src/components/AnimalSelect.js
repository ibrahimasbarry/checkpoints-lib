import React, { Component } from 'react';

export default class AnimalSelect extends Component {

  constructor (props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (evt) {
    this.props.submitAnimal(evt.target.value);
  }

  render () {

    const animalOptions = this.props.animals.map(animal => {
      return <option key={animal}>{animal}</option>;
    });

    return (
      <form>
        <label>Select an Animal: </label>
        <select
          onChange={this.handleChange}>
          {animalOptions}
        </select>
      </form>
    );

  }

}

