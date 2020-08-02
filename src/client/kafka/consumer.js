module.exports = {
  run: async (consumer, topic, socket) => {
    console.info(`Kafka consumer subscribed ${topic}`);
    return consumer.subscribe({topic: topic, fromBeginning: false});
  },
}