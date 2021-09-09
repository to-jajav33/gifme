export interface ProfileStateInterface {
  isDefaultProfile: boolean;
  savedFiles: Array<string>;
}

function state(): ProfileStateInterface {
  return {
    isDefaultProfile: false,
    savedFiles: []
  }
};

export default state;
