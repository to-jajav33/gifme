import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { FileStateInterface } from './state';

const actions: ActionTree<FileStateInterface, StateInterface> = {
  someAction (/* context */) {
    // your code
  }
};

export default actions;
