module.exports = {
  run: async (consumer, topic, socket) => {
    console.info(`Kafka consumer subscribed ${topic}`);
    await consumer.subscribe({ topic: topic, fromBeginning: false })
  },
}