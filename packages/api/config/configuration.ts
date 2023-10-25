export default () => ({
  database: {
    uri: process.env.MONGODB_URI || 'mongodb://mongodb:27017/inception',
  },
  eventstore: {
    category: process.env.EVENTSTORE_STREAM,
    connection:
      process.env.EVENTSTORE_URI || 'esdb://eventstore:2113?tls=false',
  },
})
