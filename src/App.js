import './App.css';
import React, {Component} from 'react';
import { Controlled } from 'react-codemirror2';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/css/css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import {  withStyles} from '@material-ui/core/styles';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import clsx from 'clsx';

const drawerWidth = 220;

const useStyles = theme => ({
  root: {
    display: 'flex',
    height:"100%",
    width: "100%"
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor:"#2d112b",
    color: "white"
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  typography: {
    flexGrow: 1,
    align: "center",
    color: "white"
  },
  typography2: {
    flexGrow: 1,
    align: "center",
    color: "white",
    fontSize:"22px",
    fontWeight:"1200"
  }
})
;

const theme = createTheme({
  typography: {
    fontFamily: "raleway"
  },
  palette: {
    primary: {main: "#530031"},
    secondary: {main: "#550b30"},
  },
});

class App extends Component{
constructor() {
        super();
        this.state = {
          html: '',
          css: '',
          js: '',
          showResults:false,
          showEditor1: true,
          showEditor2: false,
          showEditor3: false,
          open: false
        };
        this.hideComponent = this.hideComponent.bind(this);
      }

      //Function to set which editor should display (1-html, 2-css, 3-js)
      hideComponent(name) {
      console.log(name);
      switch (name) {
        case "html":
          this.setState({ showEditor1: true, showEditor2:false, showEditor3:false });
          break;
        case "css":
          this.setState({ showEditor1: false, showEditor2:true, showEditor3:false });
          break;
        case "js":
          this.setState({ showEditor1: false, showEditor2:false, showEditor3:true });
          break;
      }
  }     
    
      componentDidUpdate() {
        this.runCode();
      }
    
       onClick = () => {
        this.setState({ 
          showResults: !this.showResults,
         });
      }

      //to open side bar when snack button is pressed

      handleDrawerOpen = () => {
        this.setState({open: true});
      }

      //to close side bar when chevron left button is pressed

      handleDrawerClose = () => {
        this.setState({open: false});
      }

    
      runCode = () => {
        const { html, css, js } = this.state; //saving html, css, js codes
    
        const iframe = this.refs.iframe;
        const document = iframe.contentDocument; 
        // to map what's typed in the editor into a html doc in the iframe
        const documentContents = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Document</title>
            <style>
              ${css}
            </style>
          </head>
          <body>
            ${html}
    
            <script type="text/javascript">
              ${js}
            </script>
          </body>
          </html>
        `;
    
        document.open();
        document.write(documentContents);
        document.close();
      };

    
      render() {
        const { classes } = this.props;
        const { html, js, css } = this.state;
        //setting styles in codemirror
        const codeMirrorOptions = {
          theme: 'material',
          lineNumbers: true,
          scrollbarStyle: null,
          lineWrapping: true,
        };  
                      
    
        return (
          <div className={classes.root}>
            <ThemeProvider theme={theme}>
            <AppBar
              position="fixed"
              color="primary"
              className={clsx(classes.appBar, {
                [classes.appBarShift]: this.state.open,
              })}
              >
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={this.handleDrawerOpen}
                  edge="start"
                  className={clsx(classes.menuButton, this.open && classes.hide)}
                >
                  <MenuIcon />
                </IconButton>
                <Typography  backgroundColor="secondary" variant="h6" noWrap>
                  Code Editor
                </Typography>
              </Toolbar>
            </AppBar>

            {/* Collapsible Side menu */}
            <Drawer
              className={classes.drawer}
              variant="persistent"
              anchor="left"
              open={this.state.open}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <div className={classes.drawerHeader}>
                <Typography className={classes.typography2} >&nbsp;&nbsp;&nbsp;File Explorer</Typography>
                <IconButton onClick={this.handleDrawerClose}>
                  
                  <ChevronLeftIcon style={{color:"white"}} />
                </IconButton>
                
              </div>
              <Divider />
              <List>
                <ListItem button onClick={() => this.hideComponent("html")}>
                  <InsertDriveFileIcon style={{color:"white"}} />&nbsp;&nbsp;
                  <ListItemText primary="index.html" />
                </ListItem>
                <ListItem button onClick={() => this.hideComponent("css")}>
                  <InsertDriveFileIcon style={{color:"white"}} />&nbsp;&nbsp;
                  <ListItemText primary="index.css" />
                </ListItem>
                <ListItem button onClick={() => this.hideComponent("js")}>
                  <InsertDriveFileIcon style={{color:"white"}} />&nbsp;&nbsp;
                  <ListItemText primary="index.js" />
                </ListItem>
              </List>
              <Divider />
            </Drawer>

            {/* Main Content: Editors + Live View */}

            <main
              className={clsx(classes.content, {
                [classes.contentShift]: this.state.open,
              })}
            >

            <div className="live-view">    
            <br/><br/><br/>         
            
            {/* Check if 'index.html' is pressed, if yes, then render HTML editor */}
              { this.state.showEditor1 ? 
              <div>
                <Toolbar >
                    <Typography className={classes.typography} align="center" color="white" variant="h6">HTML</Typography>
                  </Toolbar>  
                <Controlled
                  value={html}
                  options={{
                    mode: 'htmlmixed',
                    ...codeMirrorOptions,
                  }}
                  onBeforeChange={(editor, data, html) => {
                    this.setState({ html });
                  }}
                />
              </div>
              : null }
              {/* Check if 'index.css' is pressed, if yes, then render CSS editor */}
              {this.state.showEditor2 ? 
              <div className="code-editor">
                  <Toolbar>
                    <Typography className={classes.typography} align="center" variant="h6">CSS</Typography>
                  </Toolbar>
                <Controlled style={{height: "100%"}}
                  value={css}
                  options={{
                    mode: 'css',
                    ...codeMirrorOptions,
                  }}
                  onBeforeChange={(editor, data, css) => {
                    this.setState({ css });
                  }}
                />
              </div>
              : null}

              {/* Check if 'index.js' is pressed, if yes, then render JS editor */}
              {this.state.showEditor3 ? 
              <div className="code-editor js-code">
                <Toolbar>
                    <Typography className={classes.typography}  align="center" variant="h6">JavaScript</Typography>
                  </Toolbar>
                <Controlled
                  value={js}
                  options={{
                    mode: 'javascript',
                    ...codeMirrorOptions,
                  }}
                  onBeforeChange={(editor, data, js) => {
                    this.setState({ js });
                  }}
                />
              </div>
              :null}
            </div>
            <div>
              <div className="live-view">
                <Toolbar>
                    <Typography className={classes.typography}  align="center" variant="h6">Live View</Typography>
                  </Toolbar>                
            </div>
            </div>
            {/* Render result/iframe showing live view of the html doc */}
            <section className="result">
              <iframe className="iframe" ref="iframe" />
            </section>
            </main>
            </ThemeProvider>
          </div>
          
        );
      }
    }
export default withStyles(useStyles)(App);
