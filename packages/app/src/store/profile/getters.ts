import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { ProfileStateInterface } from './state';

const getters: GetterTree<ProfileStateInterface, StateInterface> = {
  someAction (/* context */) {
    // your code
  }
};

export default getters;
