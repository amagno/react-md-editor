import React, { Component } from 'react';
import EditorPage from './Pages/EditorPage';
import GithubRepositories from './Pages/GithubRepositories';
import Login from './Pages/Login';
import { verifyIsLogged, setRepoInfo, getToken, setRepoToken, getRepoInfo, removeRepoInfo, removeRepoToken } from './Lib/github-auth';
import { API_URL } from './config'
import axios from 'axios'
import { socket } from './Lib/socket';







class App extends Component {
  state = {
    repoInfo: undefined,
    teste: false,
    loading: false,
  }
  componentDidMount() {
    socket.on('repositories-removed', () => {
      console.log('repository removed')
      this.setState(state => ({ ...state, repoInfo: undefined }))
      removeRepoInfo();
      removeRepoToken();
    });
  }
  sendRepo = async (repo) => {
    console.log('SET REPO', repo)
    this.setState(state => ({ ...state, loading: true }))

    const response = await axios.post(`${API_URL}/repository/init`, {
      name: repo.name,
      git_url: repo.git_url,
      owner: repo.owner.login,
      token: getToken()
    })
    console.log('RESPONSE', response.data);
    const { token, name } = response.data;
    
    if (typeof token !== 'string' || typeof name !== 'string') {
      throw new Error('repository token is invalid')
    }

    socket.emit('add', token);

    setRepoInfo(repo)
    setRepoToken(token, name)
    this.setState(state => ({ ...state, repoInfo: repo, loading: false }))
    
  }
  render() {
    return (
      <div className="App">
        <Login />
        {/* {console.log(this.state.repoInfo)}
        { verifyIsLogged() ? this.state.teste ? <h1>show</h1>: <h1>not show</h1> : ''}
        <button onClick={() => this.setState(state => ({ ...state, teste: !state.teste }))}>teste</button> */}
        { this.state.loading ? <h1>Loading</h1> : verifyIsLogged() ? typeof this.state.repoInfo === 'object' ?
          <EditorPage repoInfo={this.state.repoInfo} /> :
          <GithubRepositories onSendRepo={this.sendRepo} /> : ''
        }
      </div>
    );
  }
}

export default App;
