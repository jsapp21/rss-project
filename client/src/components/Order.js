import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import useAppStyles from '../styles/order.css';

const Order = ({ order, removeItem }) => {

    const classes = useAppStyles();
    let total = 0;

    return (
        <>
            <Typography variant="h5" component="h2" style={{ color: 'black', textAlign: 'center', marginTop: 20}}>🍳 Simple POS</Typography>
            {/* I want a border here but this is prob not the way to do so */}
            <Typography variant="h6" component="h6" style={{ color: 'black', textAlign: 'left', marginTop: 20 }}>
            - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            </Typography>
                        
            {order.map(i => {
                total += i.price
                return <Card classes={{root: classes.root}} key={i._id}>
                    {/* ER: need a unique key */}
                <CardContent>
                <Typography variant="body1" style={{ float: 'left' }}>{i.item}</Typography>
                <Typography color="textSecondary" style={{ float: 'right' }}>${i.price}</Typography>
                </CardContent>
                <Button className={classes.button} size="small" color="secondary" onClick={() => removeItem(i)}>Remove</Button>
            </Card>
            })}

            {/* When would you convert this number? Would a mongo schema help? */}
            <Typography variant="h5" component="h2" style={{ color: 'black', textAlign: 'center', marginTop: 20}}>Total: ${total}</Typography>
          </>
    )
}

export default Order;
