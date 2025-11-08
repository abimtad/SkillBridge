# React `useEffect` Hook: Workshop Boilerplate

Welcome to the `useEffect` hook workshop! This project contains the starting boilerplate for our coding session.

## 1. Setup and Configuration

Follow these steps to get the project running on your local machine.

### Step 1: Install Dependencies

Open your terminal and run the following command to install the necessary packages:

```bash
npm install
```

### Step 2: Configure the API Key

This project uses The Movie Database (TMDB) API to fetch movies. You will need an API key to make requests.

1.  Create a new file in the root of the project directory called `.env`.
2.  Add the following line to the `.env` file, replacing `YOUR_API_KEY` with the key you were provided:

    ```
    REACT_APP_TMDB_API_KEY=YOUR_API_KEY
    ```

> **Note:** Because we are using Create React App, your environment variable **must** start with `REACT_APP_` for it to be accessible in the code.

### Step 3: Start the Application

Once the installation and configuration are complete, you can start the development server:

```bash
npm start
```

The application will open in your browser at `http://localhost:3000`.

---

## 2. Understanding the TMDB API

We will be fetching a list of popular movies from the TMDB API. It's helpful to know what the data we're getting back looks like.

### API Endpoint

We will be making a `GET` request to the following URL:

```
https://api.themoviedb.org/3/movie/popular?api_key=YOUR_API_KEY&language=en-US&page=1
```

### API Response Structure

The API will send back a JSON object. The list of movies is inside the `results` array.

```json
{
  "page": 1,
  "results": [
    {
      "id": 12345,
      "title": "The Awesome Movie",
      "overview": "An exciting adventure of a hero saving the world.",
      "poster_path": "/path/to/the/poster.jpg",
      "release_date": "2023-10-26"
    }
    // ... more movie objects
  ],
  "total_pages": 500,
  "total_results": 10000
}
```

For our application, we will primarily be using the following properties from each movie object:

- `id`: A unique identifier for the `key` prop in our list.
- `title`: The name of the movie.
- `poster_path`: The path to the movie's poster image. We will need to prepend `https://image.tmdb.org/t/p/w200` to this path to get the full image URL.

Now you're all set to start coding!
