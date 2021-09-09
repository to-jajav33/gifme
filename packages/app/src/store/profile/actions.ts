import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { ProfileStateInterface } from './state';

const actions: ActionTree<ProfileStateInterface, StateInterface> = {
  someAction (/* context */) {
    // your code
  }
};

export default actions;
