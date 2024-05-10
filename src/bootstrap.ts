import mongoose from "mongoose";
import { ApacheKafkaService } from "./services/apache-kafka";
import { consumeOrdersEvent } from "./events/orders-event";
import { connectMongooseDB } from "./database/mongoose";
import { connectionEvent } from "./events/connection-event";

const apacheKafkaService = new ApacheKafkaService();
const createTopicsInKakfa = () => [
  apacheKafkaService.createTopic('topic-orders-crm', 1),
  apacheKafkaService.createTopic('topic-orders-salesforce', 1),
  apacheKafkaService.createTopic('topic-orders-senior', 1)
];

const loadEvents = async () => {
  await connectionEvent()
  await consumeOrdersEvent()
}

const bootstrap = () => {
  const stepsToExecute = [
    createTopicsInKakfa(),
    connectMongooseDB()
  ];

  Promise.all(stepsToExecute)
    .then(() => loadEvents())
    .catch((error) => console.error(`🔴 Failed to load bootstrap`, error))
}

export {
  apacheKafkaService,
  bootstrap
}