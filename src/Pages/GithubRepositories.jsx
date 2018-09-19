import React from 'react'
import { githubApi, setRepoToken, setRepoInfo } from '../Lib/github-auth';
import axios from 'axios'
import { API_URL } from '../config';


class GithubRepositories extends React.Component {
  state = {
    repositories: [],
    loading: false
  }
  async componentDidMount() {
    const gh = githubApi()
    const me = gh.getUser()
    const { data } = await me.listRepos()
    console.log(data)
    this.setState(state => ({ ...state, repositories: data.sort((a, b) => a.name.localeCompare(b.name)) }))
  }
 
  // sendRepo = async (repo) => {
  //   setRepoInfo(repo)
  //   this.props.repoInfo = repo;
  //   // this.setState(state => ({ ...state, loading: true }))
  //   // const { data: { token, name } } = await axios.post(`${API_URL}/repository/init`, {
  //   //   name: repo.name,
  //   //   git_url: repo.git_url
  //   // })

  //   // if (typeof token !== 'string' || typeof name !== 'string') {
  //   //   throw new Error('repository token is invalid')
  //   // }
    
    
  //   // this.setState(state => ({ ...state, loading: false }))
  //   // const test = await axios.get(`${API_URL}/test`)
  //   // console.log(test)
  // }
  render() {
    return (
      <div style={{ width: '400px' }}>
        {this.state.loading ? (<span>Loading......</span>) : (
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
            {this.state.repositories.map(r => (
              <li key={r.id}>
                <button onClick={() => this.props.onSendRepo(r)}>{r.name}</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
}


export default GithubRepositories