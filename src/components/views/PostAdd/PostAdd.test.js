import React from 'react';
import { shallow } from 'enzyme';
import { PostAddComponent } from './PostAdd';

describe('Component PostAdd', () => {
  it('should render without crashing', () => {
    const component = shallow(<PostAddComponent auth0 = {{user: {}}}/>);
    expect(component).toBeTruthy();
  });
});
