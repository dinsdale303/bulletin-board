import React from 'react';
import { shallow } from 'enzyme';
import { CardComponent } from './Card';

describe('Component Card', () => {
  it('should render without crashing', () => {
    const component = shallow(<CardComponent />);
    expect(component).toBeTruthy();
  });
});
