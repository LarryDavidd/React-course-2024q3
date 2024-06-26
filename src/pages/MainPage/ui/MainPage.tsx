import { Component } from 'react';

type MainPageState = {
  count: number;
};

export default class MainPage extends Component<object, MainPageState> {
  constructor(props: object) {
    super(props);
    this.state = {
      count: 0
    };
  }

  render(): JSX.Element {
    return (
      <>
        <div>
          <a
            href="https://vitejs.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="logo"
              alt="Vite logo"
            />
          </a>
          <a
            href="https://react.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="logo react"
              alt="React logo"
            />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => this.setState({ count: this.state.count + 1 })}>count is {this.state.count}</button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
      </>
    );
  }
}
