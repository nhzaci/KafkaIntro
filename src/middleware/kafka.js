const { Kafka } = require('kafkajs')
require('dotenv').config()

const { KAFKA_USERNAME: username, KAFKA_PASSWORD: password } = process.env
const sasl  = username && password ? {username, password, mechanism: 'plain'} : undefined
const ssl = !!sasl

// Creates client instance that is configured to connect ot Kafka broker provided by environment
// var KAFKA_BOOTSTRAP_SERVER

const kafka = new Kafka({
  clientId: 'npm-slack-notifier',
  brokers: [process.env.KAFKA_BOOTSTRAP_SERVER],
  ssl,
  sasl
})

module.exports = kafka