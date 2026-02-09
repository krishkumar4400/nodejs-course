const EventEmitter = require("node:events");

const eventEmitter = new EventEmitter(); // create instance of event class

// define an event and attatch a listener to it
eventEmitter.on("greet", (name) => {
  console.log("Hello User", name);
});

eventEmitter.once("pushnotify", () => {
  console.log("This event will run only once");
});
eventEmitter.once("pushnotify", () => {
  console.log("This event will run only once");
});

// Emit the event
// eventEmitter.emit("greet");
// eventEmitter.emit("greet", "krish");
// eventEmitter.emit("pushnotify");
// eventEmitter.emit("pushnotify");
// eventEmitter.emit("greet");

const myListener = () => console.log("I am a test listener");
eventEmitter.on("test", myListener);
eventEmitter.emit("test");
eventEmitter.removeListener("test", myListener);
eventEmitter.emit("test");

console.log(eventEmitter.listenerCount("greet")); //1
console.log(eventEmitter.listeners("greet")); // [ [Function (anonymous)] ]
console.log(eventEmitter.listeners("pushnotify")); // [ [Function (anonymous)], [Function (anonymous)] ]

eventEmitter.on("error", (err) => {
  console.error(`Error occurred: ${err.message}`);
});

eventEmitter.emit("error", new Error("Something went wrong"));
