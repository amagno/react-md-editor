import React from 'react'
import * as showdown from 'showdown'
import * as axios from 'axios'
import * as oAuth from 'oauthio-web'

const url = 'http://localhost:4000/'
const clientId = '37b7f18f970f2b8bb52e'

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
    const response = await axios.post(`${url}post/create/`, {
      title: this.state.title,
      content: this.state.content
    });
    console.log(response);
  }
  handleLogin = async () => {
    console.log('SEND LOGIn')
    // const response = await axios.get(`https://github.com/login/oauth/authorize?client_id=${clientId}`)

    // const win = window.open(`https://github.com/login/oauth/authorize?client_id=${clientId}`, '_blank')
    const loginUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}`;
    // window.location.href = loginUrl
    // const code = window.location.pathname.match(/\?code=(.*)/)[1]
    
    // const code = new Promise((resolve, reject) => {
    //   const popup = window.open(loginUrl, '', 'height=600,width=300')
    //   popup.setInterval(() => {
    //     try {
          
    //       console.log('EXECUTING')
    //       // const params = popup.location.href
          
    //       console.log('EXECUTED ===>', popup.location.href)
    //       if (!popup || popup.closed !== false) {
    //         // this.close();
    //         reject(new Error('The popup was closed'));
    //         return;
    //       }

    //       // if (popup.location.href === loginUrl || popup.location.pathname === 'blank') {

    //       //   return;
    //       // }

          
    //       resolve('asdas');
          
    //     } catch (error) {
    //       /*
    //        * Ignore DOMException: Blocked a frame with origin from accessing a
    //        * cross-origin frame.
    //        */
    //     }
    //   }, 50)
    // })
    // console.log(await code)
  }
  handleLoginSuccess = (response) => {
    console.log(response)
  }
  handleLoginFail = (response) => {
    console.log(response)
  }
  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {/* <GithubLogin clientId="37b7f18f970f2b8bb52e" onSuccess={this.handleLoginSuccess} onFailure={this.handleLoginFail} /> */}
        <button onClick={this.handleLogin}>LOGIN</button>
        <input type="text" onChange={this.handleTitleChange}></input>
        <Editor content={this.state.html} handleChange={this.handleEditorChange} />
        <button onClick={this.handleClick}>Enviar</button>
      </div>
    )
  }
}

export default EditorPage;