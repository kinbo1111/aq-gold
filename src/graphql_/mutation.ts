export const createUserMutation = `
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      username
      avatar
    }
  }
`;