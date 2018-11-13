import React from 'react'
import axios from 'axios'
import { API_URL } from '../config';
import { socket } from '../Lib/socket';
import { getRepoToken } from '../Lib/github-auth';

class DeployForm extends React.Component {
  state = {
    url: '',
    deployIsRunning: false,
    // socketId: undefined
  }
  componentDidMount = () => {
    socket.open()
    socket.on('deploy-fail', msg => {
      console.log('fail', msg);
      this.setState(state => ({
        ...state,
        deployIsRunning: false
      }))
    })

    // socket.on('socket-id', id => {
    //   console.log('RECEIVE ID', id);
    //   this.setState(state => ({
    //     ...state,
    //     socketId: id
    //   }))
    // })
  }
  handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post(`${API_URL}/deploy`, {
      url: this.state.url,
      token: getRepoToken()
    });
    console.log(response.data)
    if (response.status === 200) {
      this.setState(state => ({
        ...state,
        deployIsRunning: true
      }))
    }
  }
  handleChange = (name) => ({ target: { value }}) => {
    this.setState(state => ({
      ...state,
      [name]: value
    }))
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.url} name="url" onChange={this.handleChange('url')}/>
        <button disabled={this.state.deployIsRunning} type="submit">
          Deploy
        </button>
        { this.state.deployIsRunning ? <span>Running</span> : '' }
      </form>
    )
  }
}

export default DeployForm