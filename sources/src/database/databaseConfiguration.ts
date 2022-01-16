import { Guid } from 'guid-typescript';
import mongoose, { ConnectOptions } from 'mongoose';

// TODO make this WAYYYYY prettier now that the db has finally been connected. Especially with the connection handling.

const connectToDatabase = async () => {
  const connectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  } as ConnectOptions;

  const db_url = process.env.MONGODB_URL ?? '';
  const db_port = process.env.MONGODB_PORT ?? '';
  const db_name = 'testing';

  await mongoose.connect(`mongodb://localhost:45000/${db_name}`, connectOptions)

  // const connection = mongoose.connection;
  // connection.once('open', () => {
  //   console.log('MongoDB database connection established successfully')
  // });

  addSchemas().then(() => {
    console.log('added testing');
  })
  .catch((error) => {
    console.log(`Error: ${error}`);
  });
};

// TODO make this way better, just testing out connecting the database and adding a schema model
const addSchemas = async () => {
  const UserSchema = new mongoose.Schema({
    id: String,
    name: String,
    email: String,
    phone: String
  },
  { collection: 'user' });

  const UserDocument = mongoose.model('User', UserSchema);
  
  const doc = new UserDocument({ id: Guid.create(), name: 'Test', email: 'testing@gmail.com', phone: '1234567' });
  await doc.save();
}

export { connectToDatabase };