import {queryString} from '../util';
import {ERR_OK} from '../errCode';

const ENV = 1;
const BASEURL = ['http://127.0.0.1:3000','http://116.62.240.91:3000'][ENV];

const _fetch = {
  get (url, toggleBaseUrl = false) {
    return new Promise((resolve, reject) => {
      fetch(!toggleBaseUrl ? `${BASEURL}${url}` : `${url}`)
        .then(res => {
          if (res.ok) {
            return res.json()
          }
        })
        .then(resText => {
          if (toggleBaseUrl) {
            resolve(resText)
          } else {
            if (resText.errCode === ERR_OK) {
              resolve(resText)
            }
          }
        })
        .catch(err => {
          console.log(err)
        })
    })
  },
  post (url, params, toggleBaseUrl = false) {
    return new Promise((resolve, reject) => {
      fetch(!toggleBaseUrl ? `${BASEURL}${url}` : `${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: queryString.stringify(params)
      })
        .then(res => {
          if (res.ok) {
            return res.json()
          }
        })
        .then(resText => {
          resolve(resText)
        })
        .catch(err => {
          console.log(err)
        })
    })
  }
}

export default _fetch;
