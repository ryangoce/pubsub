# Introduction

This is a wrapper for the redis subscribe and unsubscribe feature. It uses a simpler interface compared to what the redis commands have

# Usage

```javascript
const pubsub = require('./index');

const pubsubClient = pubsub.createPubSubClient({
    createRedisClient: function (type) {
        switch (type) {
            case 'client':
                return redisClient;

            case 'subscriber':
                return new Redis(6379, 'localhost');

            default:
                throw new Error('not known type');
        }
    }
});

const subscriptionToken = await pubsubClient.subscribe('user_created', function(error, message) {
    if (error) {
        console.error('error in subscribe', error);
    } else {
        console.log('got pubsub message', message);
    }
});

await pubsubClient.publish('user_created', JSON.stringify({ user: 'user_1', name: 'ryan goce' }));

setTimeout(async function() {
    // unsubscribe after 10 seconds
    await pubsubClient.unsubscribe(subscriptionToken);
}, 10000);

```