import { getOrdersCRM } from './gateway/get-orders'
import { ApacheKafkaService } from './services/apache-kafka'

const ordersCRM = getOrdersCRM();
const apacheKafkaService = new ApacheKafkaService();

apacheKafkaService.produce('topic-orders-crm', ordersCRM);
