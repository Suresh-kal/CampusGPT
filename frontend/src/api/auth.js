import { API_BASE_URL } from './client'

async function login(identifier, password) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: identifier,
      password,
    }),
  })

  return response.json()
}

async function changePassword(currentPassword, newPassword) {
  const token = localStorage.getItem('token')

  const response = await fetch(
    `${API_BASE_URL}/auth/change-password`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        currentPassword,
        newPassword,
      }),
    }
  )

  return response.json()
}

export { login, changePassword }