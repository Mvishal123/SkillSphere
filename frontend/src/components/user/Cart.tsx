import { ShoppingCart } from "lucide-react";
import { Badge } from "@mui/material";
function Cart() {
  return (
    <div>
      <Badge badgeContent={"3"} color="secondary">
        <ShoppingCart />
      </Badge>
    </div>
  );
}

export default Cart;
