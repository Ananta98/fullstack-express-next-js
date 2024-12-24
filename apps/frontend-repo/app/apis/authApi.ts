const BASE_URL_API = process.env.NEXT_PUBLIC_BASE_URL_API || "";

export async function signInApi(payload: any) {
  const response = await fetch(`${BASE_URL_API}/users/sign-in`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: payload,
  });
  return await response.json();
}

export async function signUpApi(payload: any) {
  const response = await fetch(`${BASE_URL_API}/users/sign-up`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: payload,
  });
  return await response.json();
}
