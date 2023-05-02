import mongoose from "mongoose";

// interface Club extends Document {
//   name: string;
//   abi: { [key: string]: any };
//   address: string;
// }

const clubSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  abi: {
    type: Object,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

let Club;

try {
  Club = mongoose.model("Club");
} catch (e) {
  Club = mongoose.model("Club", clubSchema);
}

export default Club;
