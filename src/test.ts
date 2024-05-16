import { ApacheKafkaService } from './services/apache-kafka';

(async function runTest() {
  const apacheKafkaService = new ApacheKafkaService();
  const ordersProduce = [
    apacheKafkaService.produce('topic-orders-crm', createOrdersMockup("crm")),
    apacheKafkaService.produce('topic-orders-salesforce', createOrdersMockup("salesforce")),
    apacheKafkaService.produce('topic-orders-senior', createOrdersMockup("senior"))
  ];

  Promise.all(ordersProduce)
    .then(() => console.log(`Test executed with success`))
    .catch((error) => console.log(`Test executed with error: `, error))
})()

function createOrdersMockup(origin: string) {
  const ordersMockup = []

  for(let i=0; i < 3; i++) {
    ordersMockup.push({
      order: {
        code: `ERP00${i.toString()}`,
        client: "000035",
        store: "0001",
        origin
      },
      items: [
        {
          product: `00000${i.toString()}`,
          description: `Product ${i.toString()}`,
          quantity: 63,
          price: 15.79
        }
      ]
    })
  }

  return ordersMockup
}
