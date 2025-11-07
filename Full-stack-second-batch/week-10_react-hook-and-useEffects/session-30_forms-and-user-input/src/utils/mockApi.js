/*
  mockApi.js
  - Small helper that simulates network submission with delays.
  - Used so learners can see submission flow, successes and failures.
*/
export function submitForm(payload) {
  console.log("mockApi.submitForm called with", payload);
  return new Promise((resolve, reject) => {
    // Simulate network latency
    setTimeout(() => {
      // Simple failure mode based on content to demo error handling
      if (payload && payload.username === "error") {
        reject(new Error('Simulated server error for username="error"'));
        return;
      }

      // Otherwise succeed and echo back a server-like body
      resolve({ id: Date.now(), received: payload });
    }, 700);
  });
}
