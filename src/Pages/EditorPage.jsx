import React from 'react'
import showdown from 'showdown'
import axios from 'axios'
import { API_URL } from '../config'



class Editor extends React.Component {
 
  render() {
    return (
      <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
        <div style={{ width: '50%', display: 'flex', flexDirection: 'column', padding: '1em' }}>
          <span>Editor</span>
          <textarea style={{ width: '100%', maxWidth: '100%' }} onChange={this.props.handleChange}></textarea>
        </div>
        <div style={{ padding: '1em', display: 'flex', flexDirection: 'column' }}>
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
    const repo = this.props.repository

    if (typeof repo === 'undefined') {
      throw new Error('invalid repository prop on editor')
    }
    
    const response = await axios.post(`${API_URL}/post/create/`, {
      title: this.state.title,
      content: this.state.content,
      repo_name: repo.name,
      git_url: repo.git_url
    });
    console.log(response);
  }
  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {/* <GithubLogin clientId="37b7f18f970f2b8bb52e" onSuccess={this.handleLoginSuccess} onFailure={this.handleLoginFail} /> */}
        
        <input type="text" onChange={this.handleTitleChange}></input>
        <Editor content={this.state.html} handleChange={this.handleEditorChange} />
        <button onClick={this.handleClick}>Enviar</button>
      </div>
    )
  }
}

export default EditorPage;