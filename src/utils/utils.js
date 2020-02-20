export const formIsValid = ({ password, passwordConfirmation }) => {
  return password === passwordConfirmation;
};
