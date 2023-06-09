const VALIDATIONS = {
  name: "^[A-Z]([^0-9]*)$",
  username: "^[a-zA-Z0-9]{6,}$",
  gender: "^(male|female)$",
  born: "^(19|20)\\d\\d([-])(0[1-9]|1[012])\\2(0[1-9]|[12][0-9]|3[01])$",
  location: "^[a-zA-Z]{3,}([^0-9]*)$",
  email: "^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$",
  cell: "[0-9-()+]{6,}",
};

export default VALIDATIONS;
