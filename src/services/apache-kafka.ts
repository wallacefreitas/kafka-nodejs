import { Consumer, Kafka, Partitioners } from 'kafkajs'
import env from 'env-var'
import { allOrders } from '../shared';

export class ApacheKafkaService {
  private kafka: Kafka;
  private consumer: Consumer;

  constructor() {
    this.kafka = new Kafka({
      clientId: 'orders-events-processor',
      brokers: [env.get('KAFKA_BROKER_URL').required().asUrlString()],
    })

    this.consumer = this.kafka.consumer({ 
      groupId: 'orders-group' 
    })
  }

  public async produce(topic: string, message: object) {
    const producer = this.kafka.producer({
      createPartitioner: Partitioners.LegacyPartitioner
    });
    
    await producer.connect()
    await producer.send({
      topic,
      messages: [
        { value: JSON.stringify(message) }
      ]
    });
    
    await producer.disconnect();
  } 

  public async consume(topic: string) {
    await this.consumer.connect();
    await this.consumer.subscribe({
      topic,
      fromBeginning: true
    })
  
    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        //Simulate a persistence in database or another resource of storing
        allOrders.push(JSON.parse(message.value?.toString() || ''))
        allOrders.map((order) => console.log(order));
      }
    })
  }
}
