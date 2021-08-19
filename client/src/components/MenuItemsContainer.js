import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import useAppStyles from '../app.css';

const MenuItemsContainer = ({ menu }) => {

    const classes = useAppStyles();

    return (
        <div>
            {menu.map(i => {
                return <Card classes={{root: classes.root}} key={i._id}>
                <CardContent>
                <Typography variant="h5" component="h2">{i.item}</Typography>
                <Typography className={classes.pos} color="textSecondary">${i.price}</Typography>
                </CardContent>
                <CardActions>
                <Button size="small">Order</Button>
                </CardActions>
            </Card>
            })}
          </div>
    )
}

export default MenuItemsContainer;