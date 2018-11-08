import React from 'react'
import showdown from 'showdown'
import axios from 'axios'
import { API_URL } from '../config'
import { verifyRepoSet, getRepoToken } from '../Lib/github-auth';



class Editor extends React.Component {
 
  render() {
    return (
      <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
        <div style={{ width: '50%', display: 'flex', flexDirection: 'column', padding: '1em', border: '1px solid black' }}>
          <span>Editor</span>
          <textarea value={this.props.value} style={{ width: '800px', height: '600px' }} onChange={this.props.handleChange}></textarea>
        </div>
        <div style={{ padding: '1em', display: 'flex', flexDirection: 'column', border: '1px solid black', width: '100%' }}>
          Conteúdo
          <div dangerouslySetInnerHTML={{ __html: this.props.content }}></div>
        </div>
      </div>
    )
  }
}

class EditorPage extends React.Component {
  state = {
    html: '',
    content: '',
    title: '',
    posts: []
  }
  fecthPosts = async () => {
    const response = await axios.get(`${API_URL}/post`);
      
    console.log('POSTS', response.data)
    if (Array.isArray(response.data)) {
      this.setState(state => ({ ...state,  posts: response.data }))
    }
  }
  componentDidMount = async () => {
    if (verifyRepoSet()) {
      axios.defaults.headers['Authorization'] = `Bearer ${getRepoToken()}`
      await this.fecthPosts();
    } else {
      console.log('error on sen post de repo information is not set')
    }
  }
  handleTitleChange = ({ target: { value }}) => {
    this.setState(state => ({ ...state, title: value }))
  }
  handleEditorChange = ({ target: { value }}) => {
    if (typeof value !== 'string') {
      return
    }
    const converter = new showdown.Converter()
    this.setState(state => ({ ...state, content: value, html: converter.makeHtml(value) }))
  }
  handleClick = async () => {
    const repo = this.props.repoInfo

    if (typeof repo === 'undefined') {
      throw new Error('invalid repository prop on editor')
    }

    

    const response = await axios.post(`${API_URL}/post`, {
      title: this.state.title,
      content: this.state.content,
      // repo_name: repo.name,
      // git_url: repo.git_url
    });

    console.log(response)
    this.fecthPosts();
  

    
    
  }
  handleClickClear = () => {
    this.setState(state => ({
        ...state,
        html: '',
        content: '',
        title: '',
    }))
  }
  handleClickPost = async (postName) => {
    console.log('get post', postName)
    const response = await axios.get(`${API_URL}/post/${postName}`)
    const converter = new showdown.Converter()
    this.setState(state => ({ ...state, title: postName, content: response.data, html: converter.makeHtml(response.data) }))
  }
  render() {
    console.log(this.state)
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        
        {/* <GithubLogin clientId="37b7f18f970f2b8bb52e" onSuccess={this.handleLoginSuccess} onFailure={this.handleLoginFail} /> */}
        
        <div style={{ marginTop: 10, padding: 20 }}>
          <h3>{this.props.repoInfo.name}</h3>
          <button onClick={this.handleClickClear}>Limpar</button> 
          <input style={{ width: '100%', marginBottom: 10 }} type="text" onChange={this.handleTitleChange} value={this.state.title}></input>
          <Editor value={this.state.content} content={this.state.html} handleChange={this.handleEditorChange} />
          <button onClick={this.handleClick}>Enviar</button>


          <div>
            <hr/>
            <h3> Posts: </h3>
            <ul>
              {this.state.posts.map((name, i) => (
                <li key={i} style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => this.handleClickPost(name)}>
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </div>


        
      </div>
    )
  }
}

export default EditorPage;