import * as ReadableAPI from '../utils/ReadableAPI';
import {
  RECEIVE_CATEGORIES,
  CATEGORIES_LOADING_DATA,
} from './types';
import {setErrorAction, startLoadDataAction} from './payloadActions'

const receiveAllCategories = (categories) => ({
  type: RECEIVE_CATEGORIES,
  categories,
})

export const fetchAllCategories = () => dispatch => {
    dispatch(startLoadDataAction(CATEGORIES_LOADING_DATA));

    ReadableAPI.getAllCategories()
      .then(res => {
        const categories = res.reduce((acc, category) => {
          acc[category.name] = category;
          return acc;
        }, {});

        dispatch(receiveAllCategories(categories))
      })
      .catch((e) => dispatch(setErrorAction(`Error at fetchAllCategories: ${e.message}`)))
}
