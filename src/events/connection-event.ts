import { Order } from "../database/schemas";
import { io } from "../services/socket-io";

export async function connectionEvent() {
  io.on("connection", async (socket) => {
    const orders = await Order.find();

    if (orders.length > 0)
      socket.emit('consume-orders', JSON.stringify(orders))
  });
}