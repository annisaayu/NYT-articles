# NYT Application

This is a React-based web application that allows users to access the latest news articles from The New York Times (NYT). The app fetches articles from the NYT API and presents them in an easy-to-navigate interface with categories and search functionality.

## Features

- Display the latest news articles from The New York Times API.
- Filter articles by category (e.g., Arts, Technology, Movies).
- Search functionality to find specific articles.
- Click on articles to open the full article on The New York Times website.
- Responsive design for mobile and desktop devices.
- User-friendly interface for easy navigation.

## Tech Stack

- **Frontend**: React, React Router, Axios, Tailwind CSS
- **API**: New York Times API

## Setup

To run this project locally, follow the steps below:

### Prerequisites

- Node.js (version 18 or higher)
- NPM or Yarn
- NYT API key (you can get your key from [The New York Times API](https://developer.nytimes.com/))

### Installation

1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/your-username/nyt-application.git
   ```

2. Navigate to the project directory:
   ```bash
   cd nyt-application
   ```

3. Install the dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

4. Create a `.env` file in the root directory and add your NYT API key:
   ```env
   REACT_APP_API_KEY=your-nyt-api-key
   REACT_APP_BASE_URL=https://api.nytimes.com/svc/search/v2/articlesearch.json
   ```

5. Run the application:
   ```bash
   npm start
   # or
   yarn start
   ```

6. Open your browser and navigate to `http://localhost:3000`.

## Running Tests

This project includes unit and integration tests. To run the tests, follow the steps below:

1. Navigate to the `src/tests` directory:
   ```bash
   cd src/tests
   ```

2. Run the tests with the following command:
   ```bash
   npm test
   # or
   yarn test
   ```
Or run specifics file with the following command:
  ```bash
   npm test src/tests/Home.test.js
   # or
   yarn test src/tests/Home.test.js
   ```

The test results will be displayed in the terminal, and the tests will automatically re-run whenever you make changes to the test files.

## Usage

Once the application is running, you can:

- Browse the latest articles in different categories.
- Use the search bar to search for articles.
- Click on articles to open the full article on The New York Times website.