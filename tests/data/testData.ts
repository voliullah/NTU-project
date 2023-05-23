export const testData: {
  Login: {
    username: string;
    password: string;
  };
  WrongCredentials: {
    wrongPassword: string;
    wrongUsername: string;
  };
} = {
  Login: {
    username: 'jens@gmail.com',
    password: '123456',
  },
  WrongCredentials: {
    wrongPassword: '12345',
    wrongUsername: 'jeans@gmail.com',
  },
};
