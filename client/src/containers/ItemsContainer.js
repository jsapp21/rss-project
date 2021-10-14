import React from 'react';
import MenuItems from '../components/MenuItems';
import ItemForm from '../components/ItemForm';

const ItemsContainer = () => {
  return (
    <div className="clear-both grid gap-10 grid-cols-2">
      <MenuItems />
      <ItemForm />
    </div>
  );
};

export default ItemsContainer;
