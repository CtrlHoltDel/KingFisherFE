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

export const register = async (username, password) => {
  try {
    return await postReq({ username, password }, '/auth/register');
  } catch (err) {
    console.log(err);
  }
};
