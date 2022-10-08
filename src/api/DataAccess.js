const TLD = process.env.REACT_APP_TLD;

const post = async (body, path) => {
  const response = await fetch(`${TLD}${path}`, {
      method: "POST",
      mode: "cors",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
  });

  return await response.json();
}

const get = async (token, path) => {
  console.log(path)
  const response = await fetch(`${TLD}${path}`, {
      method: "GET",
      mode: "cors",
      headers: {
        'Content-Type': 'application/json',
        authorisation: `Bearer ${token}` 
      }
  });

  return await response.json();
}


const register = async (username, password) => {
  const response = await post({ username, password }, '/auth/register');
  return { error: response.error, response: response.user }
};

const login = async (username, password) => {
  const response = await post({ username, password }, '/auth/login');
  return { error: response.error, response: response.user }
}

const getPlayers = async (token, search) => {
  const response = await get(token, `/players${search ? `?search=${search}` : ''}`)
  return response
}

export const DAC = { register, login, getPlayers }