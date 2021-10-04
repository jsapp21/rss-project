/* eslint-disable no-debugger */
/* eslint-disable no-console */
import { useState } from 'react';

function useOrders(initialValue) {
  const [value, setValue] = useState(initialValue);

  const toggleValue = () => setValue(!value);
  console.log(value, 'value');
  console.log(toggleValue, 'toggleValue');

  return [value, toggleValue];
}

export default useOrders;
