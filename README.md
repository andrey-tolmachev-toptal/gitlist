In the project directory:

1.
Add .env file with the variable
REACT_APP_GITHUB_API_KEY = 'YOUR_GITHUB_API_TOKEN'

2.
Install dependencies with:
**yarn install**

3.
Runs the app in the development mode:
**yarn start**

4.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.



Notes:

As the GitHub REST API does not allow filtering repositories by name or open issues number 
all available repos for the selected organization are cached and filtered locally.

GitHub allows maximum 1000 repos to be fetched for the company through the REST API.
