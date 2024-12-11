// Export a Name Module. It has 2 functions:
// 1. A function that receives first and last name and returns it with “hello”.
// 2. A function that receives sender name , message and subject and prints them.
// For Example: “Jack”, “Hello, how are you?”, “Dan”, the return message is: “Dan, you got a new
// message from Jack: Hello, how are you?”
// Create a program and use it.

const { greetingName, message } = require('./nameModule');

greetingName("Jullyana", "Brasileiro");

message("Dani", "Hello, how are you?", "John")