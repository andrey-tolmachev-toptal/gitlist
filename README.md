In the project directory:

Install dependencies with:
**yarn install**

Runs the app in the development mode:
**yarn start**

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

If required update API access token in **data/api.ts**

Notes:

As the GitHub REST API does not allow filtering repositories by name or open issues number 
all the available repos for the selected organization are cached and filtered locally.

GitHub allows maximum 1000 repos to be fetched for the company through the REST API.
