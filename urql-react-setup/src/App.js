import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery, useSubscription } from 'urql';

const GET_USERS = gql`
	query getUsers {
		getUsers {
			id
			username
			groups {
				id
				name
			}
		}
	}
`;

const GET_LATEST_MESSAGES = gql`
	query getLatestMessages {
		getLatestMessages
	}
`;

const NEW_MESSAGE = gql`
	subscription newMessage {
		newMessage {
			from
			to
			content
			type
			createdAt
			id
		}
	}
`;

function App() {
	let messages;
	// const [
	// 	messages,
	// 	setMessages
	// ] = useState([]);
	const handleSubscription = (messages = [], response) => {
		return [
			response.newMessage,
			...messages
		];
	};
	const [
		res
	] = useSubscription({ query: NEW_MESSAGE }, handleSubscription);
	if (!res.data) {
		return <p>No new messages</p>;
	}
	else {
		console.log(res);
		// setMessages([
		// 	...res.data
		// ]);
		messages = res.data;
	}
	// const [
	// 	result,
	// 	reexecuteQuery
	// ] = useQuery({
	// 	query : GET_LATEST_MESSAGES
	// });
	// const { error, fetching, data } = result;
	// console.log(result);
	// if (fetching) return <p>Loading...</p>;
	// if (error) return <p>Oh no... {error.message}</p>;
	// return <ul>{Object.keys(data.getLatestMessages).map((user) => <li key={user}>{user}</li>)}</ul>;
	return (
		<div>
			{messages.map((m) => {
				return <h3>{m.content}</h3>;
			})}
		</div>
	);
}

export default App;
