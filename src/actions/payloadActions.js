import {
  SET_ERROR
} from './types'

export const setErrorAction = (error) => ({
  type: SET_ERROR,
  error,
})

export const startLoadDataAction = (type) => ({
  type: type,
})
