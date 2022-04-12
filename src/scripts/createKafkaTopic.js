const kafka = require('../middleware/kafka')

const topic = process.env.TOPIC
const admin = kafka.admin()

const main = async () => {
  await admin.connect()
  await admin.createTopics({
    topics: [{ topic }],
    waitForLeaders: true,
  })
}

main()
  .then(() => process.exit(0))
  .catch((error) => console.error(error))
