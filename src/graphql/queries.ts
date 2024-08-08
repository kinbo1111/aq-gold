export const getUserQuery = `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      username
      avatar
    }
  }
`;