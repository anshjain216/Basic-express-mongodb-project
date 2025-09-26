const mongoose = require('mongoose');
main().catch(err => console.log(err));
const chat = require("./models/chat");
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}
const allchat= [
  {
    from: "alice",
    to: "bob",
    msg: "Don’t forget the meeting at 5 PM",
    date: new Date(),
  },
  {
    from: "john",
    to: "sara",
    msg: "Can you send me the project report?",
    date: new Date(),
  },
  {
    from: "vikas",
    to: "neha",
    msg: "Good luck with your exam!",
    date: new Date(),
  },
  {
    from: "ravi",
    to: "meena",
    msg: "Let’s catch up this weekend",
    date: new Date(),
  },
  {
    from: "karan",
    to: "tina",
    msg: "Happy Birthday! 🎉",
    date: new Date(),
  },
]

chat.insertMany(allchat);