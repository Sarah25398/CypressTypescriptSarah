export interface LoginCredentials {
  email: string;
  password: string;
}

export interface InvalidLoginCase {
  title: string;
  credentials: LoginCredentials;
  expectedError: string;
}

export const createLoginUser = (): LoginCredentials => {
  return {
    email: `login_${Date.now()}_${Math.random().toString(36).slice(2, 8)}@mail.com`,
    password: `StrongPass_${Math.random().toString(36).slice(2, 14)}1234`,
  };
};

export const buildInvalidLoginCases = (
  validUser: LoginCredentials
): InvalidLoginCase[] => [
  {
    title: "shows an error for an unknown email",
    credentials: {
      email: `unknown_${Date.now()}@mail.com`,
      password: "StrongPassword123456",
    },
    expectedError: "Error: A user could not be found with this email address.",
  },
  {
    title: "shows an error for an invalid password",
    credentials: {
      email: validUser.email,
      password: "WrongPassword123456",
    },
    expectedError: "Error: The password you entered for the email address",
  },
];
