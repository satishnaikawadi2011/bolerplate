import { cacheExchange, createClient, dedupExchange, fetchExchange, subscriptionExchange, Provider } from 'urql';
import React from 'react';
import { SubscriptionClient } from 'subscriptions-transport-ws';
const token =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNjBiZDQ3ZjUwYTc2MjhlNGY4NzQwNyIsImdyb3VwcyI6WyJTYXR5MiJdLCJjb250YWN0cyI6WyJtYWhpIl0sImltYWdlVXJsIjoiaHR0cHM6Ly9jZG4ucGl4YWJheS5jb20vcGhvdG8vMjAxNS8xMC8wNS8yMi8zNy9ibGFuay1wcm9maWxlLXBpY3R1cmUtOTczNDYwXzk2MF83MjAucG5nIiwiX2lkIjoiNWY2MGJkNDdmNTBhNzYyOGU0Zjg3NDA3IiwicGFzc3dvcmQiOiIkMmEkMDYkbzM0NGVoTC5Hd0FOOWJaWVVUamROZU41V25FNnpNaEsva3hiVEQuYVdteXpiSnNSd1BNRnEiLCJ1c2VybmFtZSI6InNhdHkiLCJjcmVhdGVkQXQiOiIyMDIwLTA5LTE1VDEzOjEwOjMxLjQ5OVoiLCJ1cGRhdGVkQXQiOiIyMDIwLTA5LTE3VDE5OjI3OjE4Ljc0MloiLCJfX3YiOjM0LCJpYXQiOjE2MDE5OTExMTYsImV4cCI6MTYwMTk5ODMxNn0.kHCDIMFA5XHdmupP16PrOcPnN0dGsoT9aMV3i7eaZZ8';
const subscriptionClient = new SubscriptionClient('ws://localhost:2020/graphql', {
	reconnect        : true,
	connectionParams : {
		Authorization : `Bearer ${token}`
	}
});

const subscriptions = subscriptionExchange({
	forwardSubscription : (operation) => subscriptionClient.request(operation)
});

const client = createClient({
	url          : 'http://localhost:2020/graphql',
	fetchOptions : () => {
		return { headers: { Authorization: `Bearer ${token}` } };
	},
	exchanges    : [
		dedupExchange,
		cacheExchange,
		fetchExchange,
		subscriptions
	]
});

export default function UrqlProvider(props) {
	return <Provider value={client} {...props} />;
}
