import {CREATE_POST, DELETE_POST, FETCH_POSTS, CREATE_CRYPTO, CHANGE_STYLES1, CHANGE_STYLES2, CHANGE_STYLES3} from './types'

const initialState = {
  posts: [],
  fetchedPosts: [],
  data: []
}
//Pure functions
export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_POST:
      return {...state, posts: state.posts.concat([action.payload])}
      //return {...state, posts: [...state.posts, action.payload]}
    case DELETE_POST:
    return {...state, posts: state.posts.filter((post) => post.id !== action.payload)
    }
    case FETCH_POSTS:
    return {...state, fetchedPosts: action.payload}
    case CREATE_CRYPTO:
    return {...state, data: state.data.concat([action.payload])}
    case CHANGE_STYLES1:
    return {...state, posts: state.posts.map((post) => post.id === action.payload ?{...post, complete1: !post.complete1, amount: (post.amount-action.amount).toFixed(3), buyPrice: post.step1, d1: false} : {...post})}
    case CHANGE_STYLES2:
    return {...state, posts: state.posts.map((post) => post.id === action.payload ?{...post, complete2: !post.complete2, amount: (post.amount-action.amount).toFixed(3), buyPrice: post.step2, d2: false} : {...post})}
    case CHANGE_STYLES3:
    return {...state, posts: state.posts.map((post) => post.id === action.payload ?{...post, complete3: !post.complete3, amount: (post.amount-action.amount).toFixed(3), buyPrice: post.step3, d3: false} : {...post})}
      default: return state
  }
}
