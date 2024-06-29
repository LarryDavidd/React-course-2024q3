import { Component } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router/routes';
import { MainHeader } from '@widgets/MainHeader';
import { DataProvider } from '@entities/Cards';

export default class App extends Component {
  render(): JSX.Element {
    return (
      <DataProvider>
        <MainHeader />
        <RouterProvider router={router} />
      </DataProvider>
    );
  }
}
