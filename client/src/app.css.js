import { makeStyles } from "@material-ui/core";

export const appStyles = makeStyles({
    root: {
      width: 200,
      height: 180,
      margin: '0 10px 10px 0',
      float: 'left' 
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 12,
    },
    pos: {
      marginBottom: 12,
    },
});