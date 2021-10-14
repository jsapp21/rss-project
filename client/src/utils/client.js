/* eslint-disable no-debugger */
const clientPost = (url, inputData) => {
  const reqObj = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(inputData),
  };

  fetch(url, reqObj).then(async (resp) => {
    const data = await resp.json();
    return data;
  });
};

export default clientPost;
