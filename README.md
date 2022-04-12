# Kafka Intro

- Simple project to get started with producer and consumer concept of Kafka

## Setup

- Create Docker image for personal docker account, for Mac M1 users, look [here](https://stackoverflow.com/questions/67181738/docker-kafka-on-macos-m1-issues-stuck-on-configuring/68739361#68739361)
  - Edit `docker-compose.yml`

```yml
# ~/docker-compose.yml

kafka:
  image: <your_username>/kafka_m1
```

## Start Kafka server, producer and consumer

```sh
# Start Kafka
docker-compose up

# To create new Kafka topic
npm run createKafkaTopic

# Start producer
npm run producer

# Start consumer
npm run consumer

# Curl command message should show up on your producer and consumer
curl -XPOST \
    -H "Content-Type: application/json" \
    -H "x-npm-signature: sha256=555de877c536848f3aaead79353c88a610668575c546e31aa8c6c7fd8241cb12" \
    -d '{"event":"package:publish","name":"@kafkajs/zstd","version":"1.0.0","hookOwner":{"username":"nevon"},"payload":{"name":"@kafkajs/zstd"},"change":{"version":"1.0.0"},"time":1603444214995}' \
    http://localhost:3000/hook
```
