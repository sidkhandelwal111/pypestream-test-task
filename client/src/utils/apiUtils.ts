const API_URL = "http://localhost:8000/";

export const getMessages = async () => {
  const response = await fetch(API_URL + 'topics');
  return response.json();
}

export const getFilteredMessages = async (query: string) => {
  const response = await fetch(API_URL + 'topics?' + 'search=' + query);
  return response.json();
}

export const subscribe = async (email: string, topic: string) => {
  const response = await fetch(API_URL + 'topics/' + topic + '/subscribe', {
    method: 'POST',
    body: JSON.stringify({ email }),
    headers: {
      'Content-Type': 'application/json'
    },
  });

  return response.json();
}

export const publishMessage = async (topic: string, message: string) => {
  const response = await fetch(API_URL + 'topics/' + topic + '/publish', {
    method: 'POST',
    body: JSON.stringify({ message }),
    headers: {
      'Content-Type': 'application/json'
    },
  });

  return response.json();
}