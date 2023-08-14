const ERROR = {
  password: {
    length: 'Password must be at least 8 characters long',
    upper: 'Password must contain at least one uppercase letter (A-Z)',
    lower: 'Password must contain at least one lowercase letter (a-z)',
    digit: 'Password must contain at least one digit (0-9)',
    space: 'Password must not contain whitespaces',
  },
  email: {
    separator: 'Type valid e-mail. Separator @ is missing',
  },
};

export default ERROR;
