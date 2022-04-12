require('dotenv').config()

const createHookReceiver = require('npm-hook-receiver')
const kafka = require('./middleware/kafka')

const producer = kafka.producer()

const main = async () => {
  // connect
  await producer.connect()

  console.log(`Hook secret ${process.env.HOOK_SECRET}`)

  const server = createHookReceiver({
    // Secret created when registering webhook with NPM
    // Used to validate payload
    secret: process.env.HOOK_SECRET,

    // Path for handler to be mounted on
    mount: '/hook',
  })

  const port = process.env.PORT || 3000

  server.on('package:publish', async (event) => {
    // Send message to Kafka
    try {
      const responses = await producer.send({
        topic: process.env.TOPIC,
        messages: [
          {
            // Name of published package as key, to make sure we process events in order
            key: event.name,

            // Message value is just bytes to Kafka, we need to serialize JS object into
            // a JSON string.
            value: JSON.stringify({
              package: event.name,
              version: event.version,
            }),
          },
        ],
      })

      console.log(`Published message`, { responses })
    } catch (error) {
      console.error(`Error publishing message`, error)
    }
  })

  server.listen(port, () => {
    console.log(`Server listening on port ${port}`)
  })
}

main().catch((error) => {
  console.error(error)
  process.exit(1) // error exit code
})
