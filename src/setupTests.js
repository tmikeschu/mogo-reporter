import 'jest-enzyme';
import {
  configure,
  shallow,
} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

global.shallow = shallow;
