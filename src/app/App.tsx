import { Component } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router/routes';

export default class App extends Component {
  render(): JSX.Element {
    return <RouterProvider router={router} />;
  }
}
