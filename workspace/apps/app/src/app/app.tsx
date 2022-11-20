// eslint-disable-next-line @typescript-eslint/no-unused-vars
import './app.scss';

import { Route, Routes, Link } from 'react-router-dom';
import LoadingComponent from './components/loading';

export function App() {
  return (
    <>
      <div />
      <br />
      <hr />
      <br />
      <div role="navigation">
      </div>
      <div className="App">
        <h1>HELLO!</h1>
        <LoadingComponent />
        <p>developing...</p>
        <br />
        <br />
        <p>The website is currently under development as an open-source project.</p>
        <p>Please access the following address to see the development status.</p>
        <a href='https://github.com/JoHyukJun/aimyon'>GITHUB</a>
        <p>Anyone can participate in the development at any time, so please join in our project.</p>
      </div>

      <Routes>
        <Route path="/robots.txt" />
      </Routes>
    </>
  );
}

export default App;
