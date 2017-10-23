/* global describe beforeEach it */

import React from 'react';

import { shallow } from 'enzyme';
import chai, { expect } from 'chai';
import { spy } from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);

import { CampusItem } from './CampusItem';

describe.only('Test for <CampusItem />', () => {
  let wrapper, campus, campusSpy;

  beforeEach(() => {
    campus = {
      id: 1,
      name: 'Carnegie Mellon University',
      image: 'https://upload.wikimedia.org/wikipedia/en/b/bb/Carnegie_Mellon_University_seal.svg',
      description: 'This is campus description for CMU.'
    };
    campusSpy = spy();
    wrapper = shallow(<CampusItem campus={campus} removeCampus={campusSpy} />);
  })

  it('renders the correct campus title', () => {
    expect(wrapper.find('.thumbnail strong').text()).to.be.equal(campus.name);
  })

  it('renders 1 campus image', () => {
    expect(wrapper.find('.thumbnail img')).to.have.lengthOf(1);
  })

  it('calls removeCampus when clicked', () => {
    wrapper.find('.thumbnail button').simulate('click');
    expect(campusSpy).to.have.been.called;
  })

})
