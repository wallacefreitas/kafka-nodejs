import mongoose from 'mongoose'

export const connectMongooseDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017')
    console.log(`✓ Mongoose was coneected with success...`)
  } catch(error) {
    console.error("Error to connect Mongoose: ", error)
  }
}