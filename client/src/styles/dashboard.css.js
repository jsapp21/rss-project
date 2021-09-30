import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  root: {
    width: 200,
    height: 180,
    margin: '5px 0 5px 10px',
    position: 'relative',
  },
  button: {
    margin: '5px 0 10px 10px',
  },
  orderButton: {
    margin: '5px 0 10px 5px',
    position: 'absolute',
    bottom: 0,
  },
  deleteButton: {
    margin: '5px 0 10px 5px',
    bottom: 0,
  },
  updateButton: {
    margin: '5px 0 10px 5px',
    bottom: 0,
  },
  buttonGrp: {
    margin: '5px 0 10px 20px',
    width: '150px',
    position: 'absolute',
    bottom: 0,
  },
});
