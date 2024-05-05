import { CompressionTypes, Consumer, Kafka, Partitioners } from 'kafkajs'
import env from 'env-var'

export class ApacheKafkaService {
  private kafka: Kafka;
  private consumer: Consumer;

  constructor() {
    this.kafka = new Kafka({
      clientId: 'orders-events-processor',
      brokers: [env.get('KAFKA_BROKER_URL').required().asUrlString()]
    })

    this.consumer = this.kafka.consumer({ 
      groupId: 'orders-group' 
    })
  }

  public async createTopic(topic: string, numPartitions: number) {
    const admin = this.kafka.admin();

    await admin.connect();
    await admin.createTopics({
      topics: [
        {
          topic,
          numPartitions,
        },
      ],
    });
    
    await admin.disconnect()
  }

  public async produce(topic: string, message: object) {
    const producer = this.kafka.producer({
      createPartitioner: Partitioners.LegacyPartitioner
    });
    
    await producer.connect()
    await producer.send({
      topic,
      messages: [
        { key: "order", value: JSON.stringify(message) }
      ],
      compression: CompressionTypes.GZIP
    });
    
    await producer.disconnect();
  } 

  public async consume(topic: string, callback: Function) {
    await this.consumer.connect();
    await this.consumer.subscribe({
      topic,
      fromBeginning: true
    })
  
    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        //Simulate a persistence in database or another resource of storing
        callback(message.value?.toString());
      }
    })
  }
}
