import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography, Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import useOrderStyles from '../styles/order.css';

const Order = ({ order, setOrder }) => {

    const classes = useOrderStyles();
    let totalCost = 0;

    const subtractTotal = (i) => {
        let totalItemPrice = i.quanity * i.price
        totalCost -= totalItemPrice
        return totalCost
    };

    const addTotal = (i) => {
        let totalItemPrice = i.quanity * i.price
        totalCost += totalItemPrice
        return totalCost
    };
    
    const removeItem = (i) => {
        subtractTotal(i)
        let updatedOrder = order.filter(item => item._id !== i._id)
        setOrder(updatedOrder)
    };

    return (
        <>
            <Box borderBottom={10} borderColor="#000">
                <Typography variant="h5" style={{ color: 'black', textAlign: 'center', marginTop: 20 }}>🍳 Simple POS</Typography>
            </Box>
            {/* TODO: style */}
           
            {order.map(i => {
                addTotal(i)
                return <Card classes={{root: classes.root}} key={i._id}>
                <CardContent>
                <Typography variant="body1" style={{ float: 'left' }}>{i.quanity} - {i.name}</Typography>
                <Typography color="textSecondary" style={{ float: 'right' }}>${i.price}</Typography>
                </CardContent>
                <Button className={classes.button} size="small" color="secondary" onClick={() => removeItem(i)}>Remove</Button>
            </Card>
            })}

            {/* TODO: fix float to print correclty */}
            <Typography variant="h5" component="h2" style={{ color: 'black', textAlign: 'center', marginTop: 20}}>Total: ${totalCost}</Typography>
            <Button variant="contained" color="primary">Check Out</Button>
            {/* TODO: wire up pay button */}
        </>
    )
}

export default Order;
