import { API_BASE_URL } from './client'

async function getDocuments() {
  const token = localStorage.getItem('token')

  const response = await fetch(`${API_BASE_URL}/documents`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.json()
}

export { getDocuments }