import React from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Divider from 'material-ui/Divider';
import List, { ListItem, ListItemText } from 'material-ui/List';
import {capitalize} from '../../utils/helpers';
import {ALL_CATEGORY} from '../../utils/constants.js'

const CategoryDrawer = ({classes, categories}) => (
  <div>
    <div className={classes.drawerHeader} />
        {categories && categories.map(category => (
          <div key={category}>
            <Divider />
            <List>
                <ListItem button component={Link} to={category === ALL_CATEGORY ? "/" : `/${category}`}>
                  <ListItemText primary={capitalize(category)} />
                </ListItem>
            </List>
          </div>
        ))}
      <Divider />
  </div>
);

CategoryDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
}

export default CategoryDrawer;
