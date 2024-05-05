import { getOrdersCRM, getOrdersSalesForce, getOrdersSenior } from './gateway/get-orders'
import { ApacheKafkaService } from './services/apache-kafka'

const ordersCRM = getOrdersCRM();
const ordersSalesForce = getOrdersSalesForce();
const ordersSenior = getOrdersSenior();

const apacheKafkaService = new ApacheKafkaService();

//Creating topics
apacheKafkaService.createTopic('topic-orders-crm', 1);
apacheKafkaService.createTopic('topic-orders-salesforce', 1);
apacheKafkaService.createTopic('topic-orders-senior', 1);

//Producing messages of each Sales Platform
apacheKafkaService.produce('topic-orders-crm', ordersCRM);
apacheKafkaService.produce('topic-orders-salesforce', ordersSalesForce);
apacheKafkaService.produce('topic-orders-senior', ordersSenior);

//Consume messages of each Sales Platform to send ERP
apacheKafkaService.consume('topic-orders-crm');
apacheKafkaService.consume('topic-orders-salesforce');
apacheKafkaService.consume('topic-orders-senior');