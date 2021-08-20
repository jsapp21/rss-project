import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography, Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import useOrderStyles from '../styles/order.css';

const Order = ({ order, removeItem }) => {

    const classes = useOrderStyles();
    let total = 0;

    return (
        <>
            <Box borderBottom={10} borderColor="#000">
                <Typography variant="h5" style={{ color: 'black', textAlign: 'center', marginTop: 20 }}>🍳 Simple POS</Typography>
            </Box>
            {/* TODO: border here */}
           
            {order.map(i => {
                // total += i.price
                return <Card classes={{root: classes.root}} key={i._id}>
                    {/* TODO: quanity here */}
                <CardContent>
                <Typography variant="body1" style={{ float: 'left' }}>{i.name}</Typography>
                <Typography color="textSecondary" style={{ float: 'right' }}>${i.price}</Typography>
                </CardContent>
                <Button className={classes.button} size="small" color="secondary" onClick={() => removeItem(i)}>Remove</Button>
            </Card>
            })}

            {/* TODO: fix number price */}
            <Typography variant="h5" component="h2" style={{ color: 'black', textAlign: 'center', marginTop: 20}}>Total: ${total}</Typography>
            <Button variant="contained" color="primary">Check Out</Button>
            {/* TODO: wire up pay button */}
        </>
    )
}

export default Order;
