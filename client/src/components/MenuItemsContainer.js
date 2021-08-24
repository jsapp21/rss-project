import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import useDashboardStyles from '../styles/dashboard.css';

const MenuItemsContainer = ({ menu, order, setOrder, completed, setCompleted }) => {

    const classes = useDashboardStyles();

    const handleClick = (i) => {
        if (order.length === 0){
            setCompleted(false)
        }

        let itemToUpdate = order.find(orderedItem => orderedItem._id === i._id)

        if (!itemToUpdate){
           return setOrder([...order, { ...i, quanity: 1 }])
        } else {
           let updatedItem = {
               ...itemToUpdate,
               quanity: itemToUpdate.quanity + 1
           }

           let updatedOrder = order.map(item => {
               if (item._id === updatedItem._id){
                   return updatedItem
               } else {
                   return item
               }
           })
           setOrder(updatedOrder)
        }
    };

    return (
        <div>
            {menu.map(i => {
                return <Card classes={{root: classes.root}} key={i._id}>
                <CardContent>
                <Typography variant="h5" component="h2">{i.name}</Typography>
                <Typography className={classes.pos} color="textSecondary">${i.price}</Typography>
                </CardContent>
                <Button size="small" 
                className={classes.orderButton}  
                variant="contained"  
                color="primary" 
                onClick={() => handleClick(i)}
                >Order</Button>
            </Card>
            })}
          </div>
    )
}

export default MenuItemsContainer;
