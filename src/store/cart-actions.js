import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const sendCartData = (cart) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch('https://reduxcart-76496-default-rtdb.firebaseio.com/cart.json', {
        method: 'PUT',
        body: JSON.stringify({
          items: cart.items,
          totalQuantity: cart.totalQuantity,
          totalAmount: cart.totalAmount
        }),
      });
      if (!response.ok) {
        throw new Error('Sending cart data failed!');
      }
    }

    dispatch(uiActions.showNotification({
      status: "pending",
      title: "Sending...",
      message: 'Sending cart data!'
    }));

    try {
      await sendRequest();
      dispatch(uiActions.showNotification({
        status: "success",
        title: "Success!",
        message: 'Sent cart data successfully!'
      }))
    } catch (err) {
      dispatch(uiActions.showNotification({
        status: "error",
        title: "Error!",
        message: "Sending cart data failed!"
      }))
    }
  }
};

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchRequest = async () => {
      const response = await fetch('https://reduxcart-76496-default-rtdb.firebaseio.com/cart.json');
      if (!response.ok) {
        throw new Error('Fetching cart data failed!');
      }
      const data = await response.json();
      return data;
    }

    try {
      const cartData = await fetchRequest();
      dispatch(cartActions.replaceCart({
        items: cartData.items || [],
        totalQuantity: cartData.totalQuantity,
        totalAmount: cartData.totalAmount
      }));
    } catch (err) {
      dispatch(uiActions.showNotification({
        status: "error",
        title: "Error!",
        message: "Fetch cart data failed!"
      }))
    }
  }
}