import NextLink from 'next/link'
import { 
  Button,
  Card, 
  CardActionArea, 
  CardActions, 
  CardContent, 
  CardMedia, 
  Grid, 
  Typography
} from '@material-ui/core';
import Layout from '../components/Layout'
import db from '../utils/db'
import Product from '../models/Product'
import axios from 'axios';
// import { useRouter } from 'next/router';
import { useContext } from 'react';
import { Store } from '../utils/Store';
import { useSnackbar } from 'notistack';

export default function Home({ products }) {

  const { state, dispatch } = useContext(Store)
  // const router = useRouter()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const addToCartHandler = async product => {
    closeSnackbar()
    
    const existItem = state.cart.cartItems.find(item => item._id === product._id)
    const quantity = existItem ? existItem.quantity + 1 : 1
    const { data } = await axios.get(`/api/products/${product._id}`)

    if (data.countInStock < quantity) {
      enqueueSnackbar('Sorry. Product is out of stock', { variant: 'warning' })
      return
    }
    
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } })
    // router.push('/cart')
    enqueueSnackbar('Added to cart', { variant: 'success' })
  }
  
  return (
    <Layout>
      <div>
        <h1>Products</h1>
        <Grid container spacing={3}>
          {products.map(product => (
            <Grid item md={4} key={product.name}>
              <Card>
                <NextLink href={`/product/${product.slug}`} passHref>  
                  <CardActionArea>
                    <CardMedia component='img' image={product.image} title={product.name} />
                    <CardContent>
                      <Typography>{product.name}</Typography>
                    </CardContent>
                  </CardActionArea>
                </NextLink>
                <CardActions>
                  <Typography>{product.price}€</Typography>
                  <Button 
                    size='small' 
                    color='primary'
                    onClick={() => addToCartHandler(product)}
                  >Add to cart</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  await db.connect()
  const products = await Product.find({}).lean()
  await db.disconnect()
  
  return {
    props: {
      products: products.map(db.convertDocToObj)
    }
  }
}