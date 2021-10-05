/* eslint-disable no-debugger */
export const initialState = {
  orderPage: true,
  menuItemsPage: false,
  reportPage: false,
};

export const dashboardReducer = (state, action) => {
  switch (action.type) {
    case 'ORDER_PAGE':
      return initialState;
    case 'MENU_OPTIONS_PAGE':
      return {
        orderPage: false,
        menuItemsPage: true,
        reportPage: false,
      };
    case 'REPORT_PAGE':
      return {
        orderPage: false,
        menuItemsPage: false,
        reportPage: true,
      };
    default:
      throw new Error();
  }
};
