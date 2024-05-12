import { Order } from "../database/schemas";
import { io } from "../services/socket-io";

export async function connectionEvent() {
  io.on("connection", (socket) => {
    const orders = Order.find();
    socket.emit('consume-orders', JSON.stringify(orders))
  });
}