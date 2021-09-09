export interface FileStateInterface {
  isDefaultProfile: boolean;
  savedFiles: Array<string>;
}

function state(): FileStateInterface {
  return {
    isDefaultProfile: false,
    savedFiles: []
  }
};

export default state;
