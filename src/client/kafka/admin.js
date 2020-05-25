

const { Kafka, logLevel } = require('kafkajs');

const host = 'localhost';

const kafka = new Kafka({
  logLevel: logLevel.INFO,
  brokers: [`${host}:9092`],
  clientId: '1',
})
const admin = kafka.admin()
var topics = require('../kafka/event').TOPICS;
const kafkaTopics = [
  { topic: topics.USER_CREATED_SUCCESS_EVENT },
  { topic: topics.USER_DELETED_FAILED_EVENT }];

run = async () => {
  await admin.connect()
  await admin.createTopics({
    topics: kafkaTopics,
    waitForLeaders: true,
    validateOnly: false,
    timeout: 10000,
  })
  kafkaTopics.forEach(topic => console.info(`Kafka Admin created topic ${topic.topic}`));
}

module.exports = { run }