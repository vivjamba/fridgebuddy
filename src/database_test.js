import { Client, Databases } from "appwrite";

const client = new Client();

const databases = new Databases(client);

client
    .setEndpoint('https://fridgebuddy.tech/v1') // Your API Endpoint
    .setProject('FridgeBuddy') // Your project ID
;

const promise = databases.listDocuments('636fbecba5326c783b1c', '636fc0c65d8890e04b5f');

promise.then(function (response) {
    console.log(response); // Success
}, function (error) {
    console.log(error); // Failure
});