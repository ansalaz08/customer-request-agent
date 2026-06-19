export async function submitRequirement(
  requirement: string
) {
  const response = await fetch(
    "http://localhost:3001/api/requirements",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ requirement }),
    }
  );

  return response.json();
}