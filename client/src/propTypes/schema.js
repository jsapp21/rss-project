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
  tempOutOfStock: PropTypes.bool.isRequired,
});

export const orderedItemsPropTypes = PropTypes.shape({
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  outOfStock: PropTypes.bool.isRequired,
  tempOutOfStock: PropTypes.bool.isRequired,
});

export const userPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
});

export const ordersPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  menuId: PropTypes.string.isRequired,
  orderItems: PropTypes.arrayOf(orderedItemsPropTypes).isRequired,
  orderTotal: PropTypes.number.isRequired,
  userId: PropTypes.string.isRequired,
  createdOn: PropTypes.string.isRequired,
});
