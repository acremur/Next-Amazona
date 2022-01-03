import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  navbar: {
    backgroundColor: '#203040',
    height: '70px',
    display: 'flex',
    justifyContent: 'center',
    '& a': {
      color: '#ffffff',
      marginLeft: 10
    },
  },
  brand: {
    fontWeight: 'bold',
    fontSize: '1.5rem'
  },
  grow: {
    flexGrow: 1
  },
  main: {
    minHeight: 'calc(100vh - 72px - 7rem)',
  },
  footer: {
    marginTop: 10,
    textAlign: 'center',
    backgroundColor: '#203040',
    color: 'white',
    padding: '2rem 0'
  },
  section: {
    marginTop: 10,
    marginBottom: 10
  },
  form: {
    width: '100%',
    maxWidth: 800,
    margin: '0 auto'
  },
  navbarButton: {
    color: 'white',
    textTransform: 'initial',
    fontWeight: '600',
    marginLeft: '0.5rem'
  },
  transparentBackground: {
    backgroundColor: 'transparent'
  }, 
  error: {
    color: '#f04040'
  },
  fullWidth: {
    width: '100%'
  }
})

export default useStyles;
