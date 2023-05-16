import mongoose from "mongoose";

const clubSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  title: {
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
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
});

let Club: any;

try {
  Club = mongoose.model("Clubs");
} catch (e) {
  Club = mongoose.model("Clubs", clubSchema);
}

export default Club;
