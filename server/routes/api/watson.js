// Import dependencies
const express = require("express");
const router = express.Router();
const AssistantV2 = require("ibm-watson/assistant/v2");
const { IamAuthenticator } = require("ibm-watson/auth")


// 2. Create Instance of Assistance

// 2.1 First Authenticate
const authenticator = new IamAuthenticator({
    apikey: process.env.WATSON_ASSISTANT_APIKEY
})

// 2.2 Connect to assistant
const assistant = new AssistantV2({
    version: "2022-03-21",
    authenticator: authenticator,
    url: process.env.WATSON_ASSISTANT_URL
})

// 3. Route to Handle session tokens
router.get("/session", async (req, res) => {
    try {
        const session = await assistant.createSession({
            assistantId: process.env.WATSON_ASSISTANT_ID
        })
        res.json(session['result'])

    } catch (error) {
        res.send("There was an error processing your request. ")
        console.log(error)
    }
})

// 4. Handle messages

router.post("/message", async (req, res) => {

    payload = {
        assistantId: process.env.WATSON_ASSISTANT_ID,
        sessionId: req.headers.session_id   ,
        input: {
            message_type: "text",
            text: req.body.input
        }
    }

    try {
        const message = await assistant.message(payload)
        res.json(message["result"])
    } catch (error) {
        res.send("There was an error processing your request. ")
        console.log(error)
    }
})

// 5. Export Routes

module.exports = router;