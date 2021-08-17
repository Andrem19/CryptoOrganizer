import {SHOW_LOADER, HIDE_LOADER, CREATE_POST, DELETE_POST, FETCH_POSTS, CREATE_CRYPTO, CHANGE_STYLES1, CHANGE_STYLES2, CHANGE_STYLES3} from './types'

export function createPost(post) {
  return {
    type: CREATE_POST,
    payload: post
  }
}
export function createCryptoData(data) {
  return {
    type: CREATE_CRYPTO,
    payload: data
  }
}
export function deletePost(key) {
  return {
    type: DELETE_POST,
    payload: key
  }
}
export function showLoader() {
  return {
    type: SHOW_LOADER
  }
}
export function hideLoader() {
  return {
    type: HIDE_LOADER
  }
}
export function changeStyles1(key, am) {
  return {
    type: CHANGE_STYLES1,
    payload: key,
    amount: am
  }
}
export function changeStyles2(key, am) {
  return {
    type: CHANGE_STYLES2,
    payload: key,
    amount: am
  }
}
export function changeStyles3(key, am) {
  return {
    type: CHANGE_STYLES3,
    payload: key,
    amount: am
  }
}
export function fetchPosts() {
  return async dispatch => {
    dispatch(showLoader())
    const response = await fetch('https://api.coinpaprika.com/v1/tickers')
    const json = await response.json()
    dispatch({ type: FETCH_POSTS, payload: json })
    dispatch(hideLoader())
  }
}
