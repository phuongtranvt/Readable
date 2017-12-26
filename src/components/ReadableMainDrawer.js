import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import styles from '../style/drawerStyle'
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Hidden from 'material-ui/Hidden';
import MenuIcon from 'material-ui-icons/Menu';
import CategoryDrawerContainer from './category/CategoryDrawerContainer'

class ReadableMainDrawer extends React.Component {
  state = {
    mobileOpen: false,
  };

  render() {
    const {classes, theme} = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          {this.createAppBar(classes)}
          {this.createHiddenDrawer(theme, classes)}

          <main className={classes.content}>
            {this.props.children}
          </main>
        </div>
      </div>
    );
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  createAppBar = (classes) => (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <IconButton
          color="contrast"
          aria-label="open drawer"
          onClick={this.handleDrawerToggle}
          className={classes.navIconHide}
        >
          <MenuIcon />
        </IconButton>
        <Typography type="title" color="inherit" noWrap>
          Readable
        </Typography>
      </Toolbar>
    </AppBar>
  )

  createHiddenDrawer = (theme, classes) => (
    <div>
      <Hidden mdUp>
        <Drawer
          type="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={this.state.mobileOpen}
          classes={{
            paper: classes.drawerPaper,
          }}
          onClose={this.handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <CategoryDrawerContainer classes={classes} />
        </Drawer>
      </Hidden>
      <Hidden mdDown implementation="css">
        <Drawer
          type="permanent"
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
}

ReadableMainDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ReadableMainDrawer);
