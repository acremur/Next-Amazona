import Layout from '../../components/Layout'
import NextLink from 'next/link'
import Image from 'next/image'
import { 
    Button,
    Card,
    Grid, 
    Link, 
    List, 
    ListItem, 
    Typography
} from "@material-ui/core"
import useStyles from "../../utils/styles"
import Product from '../../models/Product'
import db from "../../utils/db"
import axios from 'axios'
import { useContext } from 'react'
import { Store } from '../../utils/Store'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'

export default function ProductScreen({ product }) {

    const classes = useStyles
    const { state, dispatch } = useContext(Store)
    const router = useRouter()
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()
    
    if (!product) {
        return <div>Product Not Found</div>
    }
    
    const { image, name, category, brand, rating, numReviews, description, price, countInStock } = product
    
    const addToCartHandler = async () => {
        closeSnackbar()
        
        const existItem = state.cart.cartItems.find(item => item._id === product._id)
        const quantity = existItem ? existItem.quantity + 1 : 1
        const { data } = await axios.get(`/api/products/${product._id}`)

        if (data.countInStock < quantity) {
            enqueueSnackbar('Sorry. Product is out of stock', { variant: 'warning' })
            return
        }
        
        dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } })
        router.push('/cart')
    }
    
    return (
        <div>
            <Layout title={name} description={description}>
                <div className={classes.section}>
                    <NextLink href='/' passHref>
                        <Link className='link'><h3>Back to product</h3></Link>
                    </NextLink>
                </div>
                <Grid container spacing={1}>
                    <Grid item md={6} xs={12}>
                        <Image 
                            src={image}
                            alt={name}
                            width={640}
                            height={640}
                            layout="responsive"
                            objectFit="contain"
                        />
                    </Grid>
                    <Grid item md={3} xs={12}>
                        <List>
                            <ListItem>
                                <Typography component='h1' variant='h1'>{name}</Typography>
                            </ListItem>
                            <ListItem>
                                <Typography>Category: {category}</Typography>
                            </ListItem>
                            <ListItem>
                                <Typography>Brand: {brand}</Typography>
                            </ListItem>
                            <ListItem>
                                <Typography>Rating: {rating} stars ({numReviews} reviews)</Typography>
                            </ListItem>
                            <ListItem>
                                <Typography>Description: {description}</Typography>
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item md={3} xs={12}>
                        <Card>
                            <List>
                                <ListItem>
                                    <Grid container>
                                        <Grid item xs={6}><Typography>Price</Typography></Grid>
                                        <Grid item xs={6}><Typography>{price}</Typography></Grid>
                                    </Grid>
                                </ListItem>
                                <ListItem>
                                    <Grid container>
                                        <Grid item xs={6}><Typography>Status</Typography></Grid>
                                        <Grid item xs={6}><Typography>{countInStock > 0 ? 'In Stock' : 'Unavailable'}</Typography></Grid>
                                    </Grid>
                                </ListItem>
                                <ListItem>
                                    <Button 
                                        onClick={addToCartHandler}
                                        type='button' 
                                        fullWidth variant='contained' 
                                        color='primary'
                                    >Add to cart</Button>
                                </ListItem>
                            </List>
                        </Card>
                    </Grid>
                </Grid>
            </Layout>
        </div>
    )
}

export async function getServerSideProps(context) {
    const { params } = context
    const { slug } = params
    
    await db.connect()
    const product = await Product.findOne({ slug }).lean()
    await db.disconnect()

    return {
      props: {
          product: db.convertDocToObj(product)
      }
    }
}