import React from 'react'
import Enzyme, { shallow ,mount} from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Home from '../home'
Enzyme.configure({ adapter: new Adapter() })

describe('Home component renders correctly', () => {
  it('should render header', () => {
    const wrapper = shallow(<Home />)
    const headerElement  = wrapper.find('[data-test="header-label"]');
    expect(headerElement).toHaveLength(1);
    expect(headerElement.text()).toEqual('Hogwarts Teacher Schedule App');
  })
  it('should render attendance link button', () => {
    const wrapper = shallow(<Home />)
    const buttonElement  = wrapper.find('[data-test="attendance-button"]');
    expect(buttonElement).toHaveLength(1);
    expect(buttonElement.text()).toEqual('Attendance');
  })
  it('should render student schedule button', () => {
    const wrapper = shallow(<Home />)
    const buttonElement  = wrapper.find('[data-test="schedule-button"]');
    expect(buttonElement).toHaveLength(1);
    expect(buttonElement.text()).toEqual('Student Schedule');
  })
})