import * as ReadableAPI from '../utils/ReadableAPI';
import {
  FETCH_CATEGORIES,
} from './types';
import {setErrorAction} from './payloadActions'

const receiveAllCategories = (categories) => ({
  type: FETCH_CATEGORIES,
  categories,
})

export const fetchAllCategories = () => dispatch => (
   ReadableAPI.getAllCategories()
    .then(res => {
      const categories = res.reduce((acc, category) => {
        acc[category.name] = category;
        return acc;
      }, {});

      dispatch(receiveAllCategories(categories))
    })
    .catch((e) => dispatch(setErrorAction(`Error at fetchAllCategories: ${e.message}`)))
)
