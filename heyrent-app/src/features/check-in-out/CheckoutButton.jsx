import { useCheckout } from "./useCheckout";

function CheckoutButton({ rentId }) {
  const { checkout, isCheckingOut } = useCheckout();

  return (
    <button
      className="btn btn-sm btn-success font-light"
      onClick={() => {
        checkout(rentId);
      }}
      disabled={isCheckingOut}
    >
      تحویل خودرو
    </button>
  );
}

export default CheckoutButton;
