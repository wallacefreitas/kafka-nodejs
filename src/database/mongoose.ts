import mongoose from 'mongoose'
import env from 'env-var'

export const connectMongooseDB = async () => {
  try {
    await mongoose.connect(`mongodb://${env.get('MONGODB_URL').required().asUrlString()}`)
    console.log(`✓ Mongoose was connected with success...`)
  } catch(error) {
    console.error("Error to connect Mongoose: ", error)
  }
}