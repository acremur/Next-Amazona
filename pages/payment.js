import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import Layout from '../components/Layout'
import CheckoutWizard from '../components/CheckoutWizard'
import useStyles from '../utils/styles'
import { Button, FormControl, FormControlLabel, List, ListItem, Radio, RadioGroup, Typography } from '@material-ui/core'
import { Store } from '../utils/Store'
import { useSnackbar } from 'notistack'

export default function Payment() {

    const classes = useStyles()
    const [paymentMethod, setPaymentMethod] = useState('')
    const router = useRouter()
    const { state, dispatch } = useContext(Store)
    const { cart: { shippingAddress } } = state
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()

    useEffect(() => {
        if (!shippingAddress.address) {
            router.push('/shipping')
        } else {
            setPaymentMethod(Cookies.get('paymentMethod') || '')
        }
    }, [])

    const submitHandler = e => {
        closeSnackbar()
        e.preventDefault()

        if (!paymentMethod) {
            enqueueSnackbar('Payment method is required.', { variant: 'warning' })
        } else {
            dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethod })
            Cookies.set('paymentMethod', paymentMethod)
            router.push('/placeorder')
        }
    }
    
    return (
        <Layout title='Payment Method'>
            <CheckoutWizard activeStep={2} />
            <form className={classes.form} onSubmit={submitHandler}>
                <Typography component='h1' variant='h1'>Payment Method</Typography>
                <List>
                    <ListItem>
                        <FormControl component='fieldset'>
                            <RadioGroup 
                                arial-label='Payment Method' 
                                name='paymentMethod'
                                value={paymentMethod}
                                onChange={e => setPaymentMethod(e.target.value)}
                            >
                                <FormControlLabel label='PayPal' value='PayPal' control={<Radio />} />
                                <FormControlLabel label='Stripe' value='Stripe' control={<Radio />} />
                                <FormControlLabel label='Cash' value='Cash' control={<Radio />} />
                            </RadioGroup>
                        </FormControl>
                    </ListItem>
                    <ListItem>
                        <Button 
                            fullWidth 
                            type='submit' 
                            variant='contained'
                            color='primary'
                        >Continue</Button>
                    </ListItem>
                    <ListItem>
                    <Button 
                        fullWidth 
                        type='submit' 
                        variant='contained'
                        onClick={() => router.push('./shipping')}
                    >Back</Button>
                    </ListItem>
                </List>
            </form>
        </Layout>
    )
}
