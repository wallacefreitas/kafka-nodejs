import { apacheKafkaService } from "../bootstrap";
import { io } from "../services/socket-io";
import { Order } from "../database/schemas";

export async function consumeOrdersEvent() {
  const eventName = 'consume-orders';
  
  Promise.all([
      apacheKafkaService.consume('topic-orders-crm', (message: string) => {
        io.emit(eventName, message)
        Order.create(JSON.parse(message))
      }),
      apacheKafkaService.consume('topic-orders-salesforce', (message: string) => {
        io.emit(eventName, message)
        Order.create(JSON.parse(message))
      }),
      apacheKafkaService.consume('topic-orders-senior', (message: string) => {
        io.emit(eventName, message)
        Order.create(JSON.parse(message))
      })
    ])
    .then(() => console.log(`🟢 Consume queues finally with success...`))
    .catch((error) => console.log(`🔴 Failed to consume queues: `, error))
}