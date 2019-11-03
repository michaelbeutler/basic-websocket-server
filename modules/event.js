const print = require(__dirname + '/print');

const validEvents = ["TEST_CLIENT1"];
module.exports = {
    handle: (message) => {
        if (message.type !== 'utf8') {
            // invalid message type
            print.warning(`invalid message type (!UTF8)`);
            return false;
        }

        // try to parse json
        let json;
        try {
            json = JSON.parse(message.utf8Data);
        } catch (error) {
            // invalid json
            print.warning(`invalid json`);
            print.debug(message.utf8Data.toString());
            return false;
        }

        // check if message contains event property
        if (!json.event) {
            print.warning(`message doesn't include event property`);
            return false;
        }

        // deconstruct json and convert event to uppercase
        let { event } = json;
        event = event.toUpperCase();

        // check if event is valid
        if (!validEvents.includes(event)) {
            // invalid event
            print.warning(`invalid event ${event}`);
            return false;
        }

        switch (event) {
            case value:
                return true;
        
            default:
                // no action defined yet but valid event
                print.warning(`no action defined for ${event} but event is valid`);
                return false;
        }
    }
}