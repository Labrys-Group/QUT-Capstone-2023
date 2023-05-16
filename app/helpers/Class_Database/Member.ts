import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
});

let Member: any;

try {
  Member = mongoose.model("Members");
} catch (e) {
  Member = mongoose.model("Members", memberSchema);
}

export default Member;
