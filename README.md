### Introduction

This project was development to show an alternative to fetch data of lot origins and centralized in a them using a concept of queue.

### Languages & Frameworks

- Node.js
- TypeScript
- Docker
- Apache Kafka
- KafkaJS
- Zookeeper 
- Kafdrop

### How to execute

```yaml
# Starting Docker containers
docker compose -p orders-queue up -d

# Access src file
cd ./src

# Execute pnpm to install all modules
pnpm install

# After execute the below command to run application
pnpm run dev

# Access Kafdrop (Kafka Dashboard)
http://localhost:19000
```

