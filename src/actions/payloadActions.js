import {
  LOADING_DATA,
  SET_ERROR
} from './types'

export const setErrorAction = (error) => ({
  type: SET_ERROR,
  error,
})

export const startLoadDataAction = () => ({
  type: LOADING_DATA,
})
