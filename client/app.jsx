import React from 'react';
import parseRoute from './lib/parse-route';
import Header from './pages/header';
import Students from './pages/students';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '' || route.path === 'students') {
      return <Students/>;
    }
  }

  render() {
    return (
      <>
        <div className='students-container'>
          <Header/>
          <main>
            {this.renderPage()}
          </main>
        </div>
      </>
    );
  }
}

// http://localhost:3000/
