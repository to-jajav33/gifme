import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { FileStateInterface } from './state';

const getters: GetterTree<FileStateInterface, StateInterface> = {
  someAction (/* context */) {
    // your code
  }
};

export default getters;
