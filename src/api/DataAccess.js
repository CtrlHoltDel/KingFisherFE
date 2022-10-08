const TLD = process.env.REACT_APP_TLD;

const postReq = async (body, path) => {
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

const register = async (username, password) => {
  const response = await postReq({ username, password }, '/auth/register');
  return { error: response.error, response: response.user }
};

const login = async (username, password) => {
    const response = await postReq({ username, password }, '/auth/login');
    return { error: response.error, response: response.user }
}

export const DAC = { register, login }