import PropTypes from 'prop-types';

export const menuPropTypes = PropTypes.shape({
  _id: PropTypes.string,
  name: PropTypes.string,
});

export const itemPropTypes = PropTypes.shape({
  _id: PropTypes.string,
  menuId: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  outOfStock: PropTypes.bool,
});
