import { useState } from 'react'
import Head from 'next/head'
import NextLink from 'next/link'
import { 
  AppBar, 
  Container, 
  Toolbar, 
  Typography, 
  Link, 
  createTheme, 
  ThemeProvider, 
  CssBaseline,
  Switch,
  Badge,
  Button,
  Menu,
  MenuItem
} from '@material-ui/core'
import useStyles from '../utils/styles'
import { useContext } from 'react'
import { Store } from '../utils/Store'
import Cookies from 'js-cookie'
import Router, { useRouter } from 'next/router'

export default function Layout({ title, description, children }) {
  const { state, dispatch } = useContext(Store)
  const { darkMode, cart, userInfo } = state
  const theme = createTheme({
    typography: {
      h1: {
        fontSize: '1.6rem',
        fontWeight: 400,
        margin: '1rem 0'
      },
      h2: {
        fontSize: '1.4rem',
        fontWeight: 400,
        margin: '1rem 0'
      },
      body1: {
        fontWeight: 'normal'
      }
    },
    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: {
        main: '#f0c000'
      },
      secondary: {
        main: '#208080'
      }
    }
  })
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null)
  const router = useRouter()

  const darModeChangeHandler = () => {
    dispatch({ type: darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON' })
    const newDarkMode = !darkMode
    Cookies.set('darkMode', newDarkMode ? 'ON' : 'OFF')
  }

  const loginClickHandler = e => {
    setAnchorEl(e.currentTarget)
  }

  const loginMenuCloseHandler = (e, redirect) => {
    setAnchorEl(null)

    if (redirect) {
      router.push(redirect)
    }
  }

  const logoutClickHandler = () => {
    setAnchorEl(null)
    dispatch({ type: 'USER_LOGOUT' })
    Cookies.remove('userInfo')
    // Cookies.remove('cartItems')
    router.push('/')
  }

  return (
    <div>
      <Head>
        <title>{title ? `${title} - Next Amazona` : 'Next Amazona'}</title>
        {description && <meta name='description' content={description} />}
      </Head>

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" className={classes.navbar}>
          <Toolbar>
            <NextLink href='/' passHref>
              <Link className='link'>
                <Typography className={classes.brand}>amazona</Typography>
              </Link>
            </NextLink>
            <div className={classes.grow} />
            <div>
              <Switch checked={darkMode} onChange={darModeChangeHandler}></Switch>
              <NextLink href='/cart'>
                <Link className='link'>
                  {cart.cartItems.length > 0 ? (
                    <Badge 
                      badgeContent={cart.cartItems.length}
                      color='secondary'
                    >
                      Cart
                    </Badge>
                  ) : (
                    'Cart'
                  )}
                </Link>
              </NextLink>
              {userInfo ? (
                <>
                  <Button 
                    className={classes.navbarButton}
                    aria-controls='simple-menu'
                    aria-haspopup='true'
                    onClick={loginClickHandler}
                  >
                    {userInfo.name}
                  </Button>
                  <Menu
                    id='simple-menu'
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={loginMenuCloseHandler}
                  >
                    <MenuItem onClick={e => loginMenuCloseHandler(e, '/order-history')}>Order History</MenuItem>
                    <MenuItem onClick={e => loginMenuCloseHandler(e, '/profile')}>Profile</MenuItem>
                    <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                <NextLink href='/login'>
                  <Link style={{ marginLeft: '1rem' }} className='link'>Login</Link>
                </NextLink>
              )}
            </div>
          </Toolbar>
        </AppBar>
        <Container className={classes.main}>{children}</Container>
        <footer className={classes.footer}>
          <Typography>All rights reserved. Next Amazona.</Typography>
        </footer>
      </ThemeProvider>
    </div>
  )
}
