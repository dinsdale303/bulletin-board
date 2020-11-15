import React from 'react';
import { shallow } from 'enzyme';
import { MenuBtnComponent } from './MenuBtn';

describe('Component MenuBtn', () => {
  it('should render without crashing', () => {
    const component = shallow(<MenuBtnComponent />);
    expect(component).toBeTruthy();
  });
});
