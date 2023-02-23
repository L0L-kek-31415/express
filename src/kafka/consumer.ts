import { logger } from '@typegoose/typegoose/lib/logSettings';
import { getRandomValues } from 'crypto';
import { Kafka } from 'kafkajs';
import { UserService } from '../services/user.service';
import { ProjectService } from '../services/project.service';

type MyValues = {
  id: number;
  name: string;
  method: string; 
  add?: boolean;
  time?: number;
} 

export class KafkaConsumer {
  private readonly kafka = new Kafka({
    brokers: ['kafka:9092'],
  })
  private readonly consumer = this.kafka.consumer({groupId: ' '})


  getValues = (value: any)=> {
    const newValue: MyValues = value.toJSON()
    const anotherValue: MyValues = JSON.parse(value.toString())
    console.log(newValue)
    console.log(anotherValue)
    return anotherValue
  }

  logValues = (topic: any, partition: any, message: any) => {
    console.log('Received message', {
      topic,
      partition,
      key: (message.key ? message.key.toString() : "yeban"), 
      value: (message.value ? message.value.toString() : "yeban")
      })
  }

  user = async (value: MyValues) => {
    switch (value.method){
      case "create":
        await UserService.create(value.id, value.name)
        break
      case "delete": 
        await UserService.delete(value.id)
        break
      default: 
        if (value.add){
          await UserService.update(value.id, value.method, 1)
        }
        else {
          await UserService.update(value.id, value.method, -1)
        }
    }
  }
  
  project = async (value: MyValues) => {
    switch (value.method){
      case "create":
        ProjectService.create(value.id, value.name)
        break
      case "delete": 
        ProjectService.delete(value.id)
        break

      default: 
        if (value.add){
          ProjectService.update (value.id, value.method, 1)
        }
        else {
          if (value.method == "tickets") {
            // @ts-ignore
            ProjectService.delTicket(value.id, value.time)
          }
          ProjectService.update(value.id, value.method, -1)
        }
    }
  }

  main = async () => {
    await this.consumer.connect()
    const admin = await this.kafka.admin()
    await admin.connect()
    await this.consumer.subscribe({
      topics: ["project", "user"],
      fromBeginning: false,
    })
    await this.consumer.run({
      //@ts-ignore
      eachMessage: async ({ topic, partition, message }) => {
        const x = this.getValues(message.value)
        switch(topic) {
          case 'user': 
            console.log("user switch")
            await this.user(x)
            break
          case 'project': 
            await this.project(x)
            break
          default :
            logger.error("NO such topic")
        }
      }
      })
    }
  start = async () => {
    this.main().catch(async error => {
      console.error(error)
      try {
      await this.consumer.disconnect()
      } catch (e) {
      console.error('Failed to gracefully disconnect consumer', e)
      }
      process.exit(1)
    })
  }
}

