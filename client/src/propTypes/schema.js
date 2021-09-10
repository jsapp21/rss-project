import PropTypes from 'prop-types';

export const menuPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
});

export const itemPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  menuId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  outOfStock: PropTypes.bool.isRequired,
});
