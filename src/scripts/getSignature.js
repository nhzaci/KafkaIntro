require('dotenv').config()
const crypto = require('crypto')
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
})

const generateSignature = (secret, payload) =>
  crypto.createHmac('sha256', secret).update(payload).digest('hex')

const main = () => {
  const secret = process.env.HOOK_SECRET
  const payload = `{"event":"package:publish","name":"@kafkajs/zstd","version":"1.0.0","hookOwner":{"username":"nevon"},"payload":{"name":"@kafkajs/zstd"},"change":{"version":"1.0.0"},"time":1603444214995}`
  console.log(`Your signature is ${generateSignature(secret, payload)}`)
}

main()
