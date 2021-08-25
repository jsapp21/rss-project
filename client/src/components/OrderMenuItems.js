import React from 'react';
import PropTypes from 'prop-types';
import MenuItems from './MenuItems';
import Order from './Order';

const OrderMenuItems = ({ menuItems, order, setOrder, completed, setCompleted, menu }) => {
  return (
    <div className="clear-both grid gap-10 grid-cols-2">
      <MenuItems
        menuItems={menuItems}
        order={order}
        setOrder={setOrder}
        completed={completed}
        setCompleted={setCompleted}
      />
      <Order order={order} setOrder={setOrder} completed={completed} setCompleted={setCompleted} menu={menu} />
    </div>
  );
};

export default OrderMenuItems;

OrderMenuItems.propTypes = {
  order: PropTypes.arrayOf(
    PropTypes.shape({
      menuId: PropTypes.string,
      price: PropTypes.number,
      quanity: PropTypes.number,
      _id: PropTypes.string,
    }),
  ).isRequired,
  setOrder: PropTypes.arrayOf(
    PropTypes.shape({
      menuId: PropTypes.string,
      price: PropTypes.number,
      quanity: PropTypes.number,
      _id: PropTypes.string,
    }),
  ).isRequired,
  completed: PropTypes.bool.isRequired,
  setCompleted: PropTypes.bool.isRequired,
  menuItems: PropTypes.arrayOf.isRequired,
  menu: PropTypes.shape({ name: PropTypes.string, _id: PropTypes.string }).isRequired,
};
