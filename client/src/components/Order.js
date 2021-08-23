import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography, Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import useOrderStyles from '../styles/order.css';

const Order = ({ order, setOrder, completed, setCompleted }) => {

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

    const handleClick = () => {

        // TODO: add user
        const newItem = {
            userId: "610dc53368fd6b5bd0a7b699",
            orderItems: order,
            createdOn: new Date()
          };

        const reqObj = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newItem)
          };

          fetch('/checkouts', reqObj)
          .then(resp => resp.json())
          .then(checkout => {
            if (checkout.acknowledged === false) {
                alert(`Error: ${checkout.error}`)
            } else {
                setCompleted(true)
                console.log(checkout)
                setOrder([])
            }
          });
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

            <Typography variant="h5" component="h2" style={{ color: 'black', textAlign: 'center', marginTop: 20}}>Total: ${totalCost}</Typography>
            <Button variant="contained" color="primary" onClick={handleClick}>Check Out</Button>
            { completed ? <Typography variant="h5" style={{ float: 'left', color: 'green' }}>Your order has been placed!</Typography> : null  }
        </>
    )
}

export default Order;
