import React, { Component } from 'react';
import './App.css';
import Main from './Component/main';
import {BrowserRouter} from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
        <ApolloProvider client={client}>
          <Main />
        </ApolloProvider>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
