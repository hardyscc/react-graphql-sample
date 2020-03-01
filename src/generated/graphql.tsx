import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type CreateUserInput = {
  name: Scalars['String'],
  nickName?: Maybe<Scalars['String']>,
};

export type Mutation = {
   __typename?: 'Mutation',
  createUser: User,
  removeUser: Scalars['Boolean'],
};


export type MutationCreateUserArgs = {
  input: CreateUserInput
};


export type MutationRemoveUserArgs = {
  id: Scalars['String']
};

export type Query = {
   __typename?: 'Query',
  user: User,
  users: Array<User>,
};


export type QueryUserArgs = {
  id: Scalars['String']
};

export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  name: Scalars['String'],
  nickName?: Maybe<Scalars['String']>,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput
};


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & { createUser: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'nickName'>
  ) }
);

export type RemoveUserMutationVariables = {
  id: Scalars['String']
};


export type RemoveUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeUser'>
);

export type UsersQueryVariables = {};


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'nickName'>
  )> }
);


export const CreateUserDocument = gql`
    mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    name
    nickName
  }
}
    `;
export type CreateUserMutationFn = ApolloReactCommon.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;
export type CreateUserMutationResult = ApolloReactCommon.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const RemoveUserDocument = gql`
    mutation RemoveUser($id: String!) {
  removeUser(id: $id)
}
    `;
export type RemoveUserMutationFn = ApolloReactCommon.MutationFunction<RemoveUserMutation, RemoveUserMutationVariables>;
export type RemoveUserMutationResult = ApolloReactCommon.MutationResult<RemoveUserMutation>;
export type RemoveUserMutationOptions = ApolloReactCommon.BaseMutationOptions<RemoveUserMutation, RemoveUserMutationVariables>;
export const UsersDocument = gql`
    query Users {
  users {
    id
    name
    nickName
  }
}
    `;
export type UsersQueryResult = ApolloReactCommon.QueryResult<UsersQuery, UsersQueryVariables>;