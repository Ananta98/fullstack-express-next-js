const BASE_URL_API = process.env.NEXT_PUBLIC_BASE_URL_API || "";

export async function getUserList(token: string) {
  return await fetch(`${BASE_URL_API}/users/fetch-user-data`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getUserProfile(token: string) {
  return await fetch(`${BASE_URL_API}/users/fetch-user-profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function updateUser(token: string, payload: any) {
  return await fetch(`${BASE_URL_API}/users/update-user-data`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: payload,
  });
}
