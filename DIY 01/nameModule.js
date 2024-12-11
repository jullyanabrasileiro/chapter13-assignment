function greetingName(firstName, lastName) {
    console.log (`Hello, ${firstName, lastName}!`);
}

function message (sender, message, receiver) {
   console.log(`${receiver}, you got a message from ${sender}: ${message}`);
}

module.exports = {greetingName, message};