/* eslint-disable no-debugger */
/* eslint-disable no-console */
/* eslint-disable no-shadow */
import { useState } from 'react';

function useToggle(initialValue) {
  const [value, setValue] = useState(initialValue);

  const toggleValue = () => setValue(!value);

  return [value, toggleValue];
}

export default useToggle;
