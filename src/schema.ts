// Import necessary types and functions from the "jazz-tools" library.
import { CoList, CoMap, co } from "jazz-tools";

// Define a class named "Message" that extends the "CoMap" class from "jazz-tools".
// This class represents a single message in a chat.
export class Message extends CoMap {
  // Define a property named "text" of type "string".
  // This property stores the content of the message.
  text = co.string;
}

// Define a class named "Chat" that extends a "CoList" of "Message" references.
// This class represents a collection of messages, forming a chat log.
export class Chat extends CoList.Of(co.ref(Message)) {}
