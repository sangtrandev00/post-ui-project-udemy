import postApi from './api/postApi';

console.log('Hello world from main.js');

async function main() {
  //   const response = await axiosClient.get('/posts');
  //   console.log(response);
  try {
    const queryParams = {
      _page: 1,
      _limit: 5,
    };
    const response = await postApi.getAll(queryParams);
    console.log(response);
  } catch (error) {
    console.log('error', error.response);

    if (!error.response) {
      throw new Error('Network error. Please try again later.');
    }

    // redirect to login if not login
    if (error.response.status === 401) {
      // Clear token

      window.location.assign('/login.html');
      return;
    }
  }
}

main();
