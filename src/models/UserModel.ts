import mongoose from 'mongoose'; 


const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true}, 
    password: {type: String, required: true }, 
    name: {type: String, required: true},

    address: {
        street: String,
        city: String,
        state: String,
        country: String,
        zipCode: String,
    },
    createdAt: {type: Date, default:Date.now}, 
    updatedAt: {type: Date, default: Date.now}
})


export default mongoose.models.User || mongoose.model("User", userSchema);