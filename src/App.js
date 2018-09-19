import React, { Component } from 'react';
import EditorPage from './Pages/EditorPage';
import GithubRepositories from './Pages/GithubRepositories';
import Login from './Pages/Login';
import { verifyIsLogged, setRepoInfo } from './Lib/github-auth';


class App extends Component {
  state = {
    repoInfo: undefined,
    teste: false
  }
  componentDidMount() {

  }
  sendRepo = async (repo) => {
    console.log('SET REPO', repo)
    setRepoInfo(repo)
    this.setState(state => ({ ...state, repoInfo: repo }))
  }
  render() {
    return (
      <div className="App">
        <Login />
        {/* {console.log(this.state.repoInfo)}
        { verifyIsLogged() ? this.state.teste ? <h1>show</h1>: <h1>not show</h1> : ''}
        <button onClick={() => this.setState(state => ({ ...state, teste: !state.teste }))}>teste</button> */}
        { verifyIsLogged() ? !!this.state.repoInfo ? <EditorPage /> : <GithubRepositories onSendRepo={this.sendRepo} /> : ''}
      </div>
    );
  }
}

export default App;
