import { Step, StepLabel, Stepper } from "@material-ui/core";
import useStyles from '../utils/styles'

export default function CheckoutWizard({ activeStep = 0 }) {

    const classes = useStyles()
    
    return (
        <Stepper 
            style={{ marginTop: '1rem'}} 
            activeStep={activeStep} 
            alternativeLabel
            className={classes.transparentBackground}
        > 
            {['Login', 'Shipping Address', 'Payment Method', 'Place Order'].map((step, index) => (
                <Step key={index}>
                    <StepLabel>{step}</StepLabel>
                </Step>
            ))}
        </Stepper>
    )
}