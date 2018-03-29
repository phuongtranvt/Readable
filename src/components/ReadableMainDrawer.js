import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import styles from '../style/drawerStyle'
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List from 'material-ui/List';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Hidden from 'material-ui/Hidden';
import Divider from 'material-ui/Divider';
import MenuIcon from 'material-ui-icons/Menu';
import CategoryDrawerContainer from './category/CategoryDrawerContainer';

class ReadableMainDrawer extends React.Component {
  state = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  createHeaderAppBar = (classes) => (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={this.handleDrawerToggle}
          className={classes.navIconHide}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="title" color="inherit" noWrap>
          Readable
        </Typography>
      </Toolbar>
    </AppBar>
  )

  createHiddenDrawer = (classes, theme) => (
    <div>
      <Hidden mdUp>
        <Drawer
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={this.state.mobileOpen}
          onClose={this.handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <CategoryDrawerContainer classes={classes} />
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          variant="permanent"
          open
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <CategoryDrawerContainer classes={classes} />
        </Drawer>
      </Hidden>
    </div>
  )

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
        {this.createHeaderAppBar(classes)}
        {this.createHiddenDrawer(classes, theme)}

        <main className={classes.content}>
          <div className={classes.toolbar} />
            {this.props.children}
        </main>
      </div>
    );
  }
}

ReadableMainDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ReadableMainDrawer);
