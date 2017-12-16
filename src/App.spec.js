import React from 'react';
import App from './App';

describe('<App />', () => {
  const wrapper = shallow(<App />);

  it('renders without crashing', () => {
    expect(wrapper).toBeTruthy()
    expect(wrapper).toMatchSnapshot()
  });
});
