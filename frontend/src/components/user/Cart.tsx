import { ShoppingCart } from "lucide-react";
import { Badge } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config";
function Cart() {
  const [cart, setCart] = useState(0);
  useEffect(() => {
    const init = async () => {
      const res = await axios.get(`${BASE_URL}/user/cartnumber`);
      console.log(res.data.number);
      setCart(res.data.number);
    };
    init();
  });
  return (
    <div>
      <Badge badgeContent={cart} color="secondary">
        <ShoppingCart />
      </Badge>
    </div>
  );
}

export default Cart;
