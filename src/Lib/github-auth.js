import Github from 'github-api'
import axios from 'axios'


export const getToken = () => localStorage.getItem('github-token')

export const verifyIsLogged = () => typeof localStorage.getItem('github-token') === 'string'

export const getRepoToken = () => localStorage.getItem('repository-token')

export const verifyRepoSet = () => typeof localStorage.getItem('repository-token') === 'string' 

export const verifyIsAccessToken = () => {
  const match = window.location.href.match(/\?access_token=(.*)/);
  const accessUrl =  !!match ? match[1] : undefined;

  if (!!accessUrl) {
    const token = accessUrl.split('&')[0]
    localStorage.setItem('github-token', token)
    window.location = '/'
  }

}


export const githubApi = () => {
  if (!verifyIsLogged()) {
    throw new Error('github login is not valid');
  }
  // const response = await axios.get(`${API_URL}/github-access-token`);
  return new Github({ token: getToken() })
}



export const removeRepoToken = () => {
  localStorage.removeItem('repository-token')
  localStorage.removeItem('repository-name')
  delete axios.defaults.headers['Authorization']
}
export const setRepoToken = (token, name) => {
  localStorage.setItem('repository-token', token)
  localStorage.setItem('repository-name', name)
}

export const logout = () => {
  localStorage.removeItem('github-token');
  removeRepoToken();
  window.location.reload();
}

export const setRepoInfo = (repo) => {
  localStorage.setItem('repository-info', JSON.stringify(repo))
}
export const getRepoInfo = () => {
  return JSON.parse(localStorage.getItem('repository-info'))
}
export const removeRepoInfo = () => {
  localStorage.removeItem('repository-info')
}