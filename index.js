var jackrabbit = require("jackrabbit");
const fs = require("fs");
var url =
  process.env.AMQP_URL || "amqp://testing:bloddy_mary_789@139.59.46.189:5672/";
var topic = process.env.TOPIC || "celery";

console.log("Opening connection to RabbitMQ");

var rabbit = jackrabbit(url);
var exchange = rabbit.default();

const msgQueue = exchange.queue({ name: topic, durable: true });

msgQueue.consume(function (data, ack, nack, msg) {
  sendMsg(data);
  nack();
});

counter = 0;
function sendMsg(data) {
  counter++;
  process.stdout.write("\033[0G");
  process.stdout.write(`${counter}/11000000`);
  fs.appendFileSync("messages.txt", `${data[0]}\n`);
}
