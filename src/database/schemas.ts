import mongoose, { Schema } from 'mongoose';

const Order = mongoose.model('Order', new Schema({
    code: String, // String is shorthand for {type: String}
    client: String,
    store: String,
    origin: String,
    items: [
      { 
        product: String, 
        description: String,
        quantity: Number,
        price: Number,
      }
    ]
  })
)

export {
  Order
}