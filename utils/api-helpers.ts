export async function fetchPostJSon(url: string, data?: {}) {
  try {
    //default oprions are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', //no-cors, *cors, same-origin
      cache: 'no-cache', //*default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', //include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow', //manual, *follow, error
      referrerPolicy: 'no-referrer', //no-refferer, *client
      body: JSON.stringify(data || {}), //body data type must match 'Content-Type' header
    });
    return await response.json(); //parse JSON response into native JS object
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw error;
  }
}
