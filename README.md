# React GraphQL Frontend Tutorial

## Overview

Build a basic CRUD frontend application with React & GraphQL, also includes Gitlab's CI/CD Pipeline setup which enable the auto deployment into OpenShift.

## Technologies

1. [TypeScript](https://www.typescriptlang.org/)
1. [React](https://reactjs.org/)
1. [Create React App](https://create-react-app.dev/)
1. [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
1. [GraphQL Code Generator](https://graphql-code-generator.com/)

## Create an Empty Project

1. Setup an empty project using `Create React App`

   ```bash
   npm init react-app react-graphql-sample --use-npm --template typescript
   cd react-graphql-sample
   ```

2. Start the server in watch mode.

   ```bash
   npm start
   ```

   A Browser will popup with http://localhost:3000, and you should see the default React web page.

   > If you cannot start the server, make sure the global `create-react-app` tool is removed then redo from Step 1 again.
   >
   > ```bash
   > npm -g remove create-react-app
   > yarn global remove create-react-app
   > ```

## Build the Simple React UI Components

1. Create the `src/component/UserList.tsx` component.

   ```tsx
   import React, { useState } from "react";

   export const UserList = () => {
     const [users] = useState<Array<{ id: string; name: string }>>([
       { id: "1", name: "John" },
       { id: "2", name: "Mary" },
     ]);

     return (
       <ul>
         {users.map((user) => (
           <li key={user.id}>
             {user.name} <button>x</button>
           </li>
         ))}
       </ul>
     );
   };
   ```

1. Create the `src/component/AddUser.tsx` component.

   ```tsx
   import React, { useState } from "react";

   export const AddUser = () => {
     const [name, setName] = useState("");

     return (
       <div>
         <input value={name} onChange={(e) => setName(e.target.value)} />
         <button disabled={!name}>Add</button>
       </div>
     );
   };
   ```

1. Update the main `App.tsx` as follow.

   ```tsx
   import React from "react";
   import "./App.css";
   import { AddUser } from "./component/AddUser";
   import { UserList } from "./component/UserList";

   function App() {
     return (
       <div className="App">
         <header className="App-header">
           <UserList />
           <AddUser />
         </header>
       </div>
     );
   }

   export default App;
   ```

Start the React server by `npm start`, you should see the `UserList` and `AddUser` components correctly rendered.

## GraphQL Client Setup

The previous [NodeJS GraphQL Backend Tutorial](../../../nodejs-graphql-sample) will be reused as the GraphQL backend.

### Install GraphQL Client Libraries

Install Apollo Boost and Apollo React Hooks client libraries.

```bash
npm install apollo-boost @apollo/react-hooks @apollo/react-testing graphql
```

> for more information, please see [Apollo React Get Started](https://www.apollographql.com/docs/react/get-started/).

### Install and Setup GraphQL Code Generator

`GraphQL Code Generator` Tool will be used to generate the React client code out of backend's GraphQL schema, you can use the generated code to access the GraphQL backend easily.

```bash
npm install -D @graphql-codegen/cli
npx graphql-codegen init
```

The following questions will be asked during the setup, please answer them accordingly.

1. What type of application are you building? `Application built with React`
1. Where is your schema?: (path or url) `http://localhost:4000/graphql`
1. Where are your operations and fragments?: `src/**/*.graphql`
1. Pick plugins:
   1. `TypeScript (required by other typescript plugins)`
   1. `TypeScript Operations (operations and fragments)`
   1. `TypeScript React Apollo (typed components and HOCs)`
1. Where to write the output: `src/generated/graphql.tsx`
1. Do you want to generate an introspection file? `No`
1. How to name the config file? `codegen.yml`
1. What script in package.json should run the codegen? `codegen`

After generated the `codegen.yml` file, the `package.json` will also be updated to include the plugins packages, please run the following to install them.

```bash
npm install
```

Add the following `config` at the end of `codegen.yml` file to enable the code generation for React Hooks.

```text
...
generates:
  src/generated/graphql.tsx:
    plugins:
      ...
    <b>config:
      withHOC: false
      withComponent: false
      withHooks: true</b>
```

> In this tutorial we will only use the React Hooks, therefore the `HOC` and `Component` code generation are disabled.

Create the following GraphQL query and mutation files for the generator.

1. `src/graphql/Users.graphql`

   ```graphql
   query Users {
     users {
       id
       name
       nickName
     }
   }
   ```

1. `src/graphql/CreateUser.graphql`

   ```graphql
   mutation CreateUser($input: CreateUserInput!) {
     createUser(input: $input) {
       id
       name
       nickName
     }
   }
   ```

1. `src/graphql/DeleteUser.graphql`

   ```graphql
   mutation DeleteUser($id: ID!) {
     deleteUser(id: $id)
   }
   ```

Start the GraphQL server from previous [NodeJS GraphQL Backend Tutorial](tutorial-nodejs-graphql.md).

```bash
cd nodejs-graphql-sample
npm run start:dev
```

> Please make sure the GraphQL server is running on http://localhost:4000/graphql.

Now we can do the actually generation now.

```bash
npm run codegen
```

Notes that a Typescript file `src/generated/graphql.tsx` will be generated, and the Apollo React Hooks are ready to import.

## Connect to GraphQL Backend

### Connect the Backend using Apollo React Hooks

1. Add Apollo Provider into `src/index.tsx`.

   ```tsx
   import { ApolloProvider } from "@apollo/react-hooks";
   import ApolloClient from "apollo-boost";
   ...

   const client = new ApolloClient({
     uri: (process.env.SERVER_URL || "http://localhost:4000") + "/graphql"
   });

   ReactDOM.render(
     <ApolloProvider client={client}>
       <App />
     </ApolloProvider>,
     document.getElementById("root")
   );
   ...
   ```

1. Update the `src/component/UserList.tsx` component and use the generated `useUsersQuery` and `useDeleteUserMutation` React hooks.

   ```tsx
   import React from "react";
   import {
     useDeleteUserMutation,
     UsersDocument,
     UsersQuery,
     useUsersQuery,
   } from "../generated/graphql";

   export const UserList = () => {
     const { data, loading, error } = useUsersQuery();

     const [deleteUser] = useDeleteUserMutation({
       update(cache, { data }) {
         if (data?.deleteUser) {
           const cached = cache.readQuery<UsersQuery>({
             query: UsersDocument,
           });
           if (cached) {
             cache.writeQuery({
               query: UsersDocument,
               data: {
                 users: cached.users.filter(
                   (user) => user.id !== data.deleteUser
                 ),
               },
             });
           }
         }
       },
     });

     if (!data || loading) return <h2>Loading...</h2>;
     if (error) return <h2>Error: {error}</h2>;

     return (
       <ul>
         {data.users.map((user) => (
           <li key={user.id}>
             {user.name}
             <button
               onClick={() =>
                 deleteUser({
                   variables: { id: user.id },
                 })
               }
             >
               x
             </button>
           </li>
         ))}
       </ul>
     );
   };
   ```

1. Update the `src/component/AddUser.tsx` component and use the generated `useCreateUserMutation` React hooks.

   ```tsx
   import React, { useState } from "react";
   import {
     useCreateUserMutation,
     UsersDocument,
     UsersQuery,
   } from "../generated/graphql";

   export const AddUser = () => {
     const [name, setName] = useState("");

     const [createUser] = useCreateUserMutation({
       update(cache, { data }) {
         if (data) {
           const cached = cache.readQuery<UsersQuery>({
             query: UsersDocument,
           });
           if (cached) {
             cache.writeQuery({
               query: UsersDocument,
               data: { users: [...cached.users, data.createUser] },
             });
           }
         }
       },
     });

     return (
       <div>
         <input value={name} onChange={(e) => setName(e.target.value)} />
         <button
           disabled={!name}
           onClick={() => {
             createUser({
               variables: { input: { name } },
             }).then(({ data }) => {
               if (data?.createUser) {
                 setName("");
               }
             });
           }}
         >
           Add
         </button>
       </div>
     );
   };
   ```

### Setup and Run the Unit Test

1. Install `cross-env` package to enable cross environment variable setup for both window and unix based system.

   ```bash
   npm install -D cross-env
   ```

1. Replace the following line under the `package.json`.

   From :

   ```json
       "test": "react-scripts test",
   ```

   To :

   ```json
       "test": "cross-env CI=true react-scripts test --coverage",
   ```

1. Update the unit test case `src/App.test.tsx`.

   ```tsx
   import { MockedProvider } from "@apollo/react-testing";
   import { render, waitForElement } from "@testing-library/react";
   import React from "react";
   import App from "./App";
   import { UsersDocument } from "./generated/graphql";

   const mocks = [
     {
       request: {
         query: UsersDocument,
       },
       result: {
         data: {
           users: [
             { __typename: "User", id: "1", name: "John", nickName: null },
           ],
         },
       },
     },
   ];

   test("renders UserList", async () => {
     const { getByText } = render(
       <MockedProvider mocks={mocks}>
         <App />
       </MockedProvider>
     );

     const element = await waitForElement(() => getByText("John"));
     expect(element).toBeInTheDocument();
   });
   ```

1. Run the unit test case.

   ```bash
   npm test
   ```

   You should see the following output:

   ```text
   > react-graphql-sample@0.1.0 test /Users/cct125/Workspaces/nest/react-graphql-sample
   > cross-env CI=true react-scripts test --coverage

   PASS src/App.test.tsx
     ✓ renders UserList (78ms)

   -------------------|----------|----------|----------|----------|-------------------|
   File               |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
   -------------------|----------|----------|----------|----------|-------------------|
   All files          |    24.68 |     9.62 |    22.58 |       24 |                   |
    src               |     2.33 |        0 |     5.88 |     2.33 |                   |
     App.tsx          |      100 |      100 |      100 |      100 |                   |
     index.tsx        |        0 |        0 |      100 |        0 |           9,13,23 |
     serviceWorker.ts |        0 |        0 |        0 |        0 |... 40,141,143,146 |
    src/component     |    44.44 |    27.78 |       30 |       44 |                   |
     AddUser.tsx      |    33.33 |        0 |       20 |    33.33 |... 18,29,33,36,37 |
     UserList.tsx     |    53.33 |    41.67 |       40 |    53.85 | 14,15,18,19,22,40 |
    src/generated     |    85.71 |      100 |       75 |    85.71 |                   |
     graphql.tsx      |    85.71 |      100 |       75 |    85.71 |               181 |
   -------------------|----------|----------|----------|----------|-------------------|
   Test Suites: 1 passed, 1 total
   Tests:       1 passed, 1 total
   Snapshots:   0 total
   Time:        2.489s
   Ran all test suites.
   ```

### React Client Application Testing

Start the React client server.

```bash
cd react-graphql-sample
npm start
```

> You should see the `UserList` and `AddUser` components correctly rendered, and all the CRUD operations should work normally.