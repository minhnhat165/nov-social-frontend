# NOV Social

## Overview

This is a social media platform built using React and Tailwind CSS. It provides a user-friendly interface for users to connect, share posts, and interact with each other.
## Features

- User authentication: Users can create accounts, log in, and log out.
- Login by Google or Facebook: Users can log in to the platform using their Google or Facebook accounts.
- User profiles: Users can create and customize their profiles, upload profile pictures, and update their information include hobbies.
- Post creation and interaction: Users can create posts, like and comment on posts, and view posts from other users.
- Tic Tac Toe game: Users can play a game of Tic Tac Toe with other users on the platform.
- Follow system: Users can follow other users and receive updates on their posts.
- Notifications: Users receive notifications for likes, comments, and new followers.
- Bookmark feature: Users can save posts as bookmarks for easy access later.
- Search functionality: Users can search for other users and posts based on keywords.
- Dark/Light mode: Users can switch between dark and light themes for the platform.
- Responsive design: The platform is optimized for both desktop and mobile devices.

## Technologies Used

- Frontend: React, JavaScript, Tailwind CSS, Redux toolkit.
- Backend: Nodejs Express, JavaScript, Passport
- Authentication: JSON Web Tokens (JWT)
- Image upload: Cloudinary

## Prerequisites
Make sure you have the following software installed on your machine:

* Node.js 16.8 or later.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/minhnhat165/nov-social-frontend.git
```

2. Navigate to the project directory:

```bash
cd nov-social-frontend
```

3. Install the dependencies:
```bash
yarn install
```

4. Set up environment variables:
* Make sure to set the values of these environment variables before running the app.
* Create a .env file in the root of the project.
* Define the following variables in the .env file:
  * `REACT_APP_API_URL`: The URL of the API server.
  * `REACT_APP_NAME`: The name of the app.
  * `REACT_APP_SERVER_URL`: The URL of the server.
  * `REACT_APP_CLOUDINARY_NAME`: The name of the Cloudinary account.
  * `REACT_APP_CLOUDINARY_UPLOAD_PRESET`: The upload preset for Cloudinary.
  * `REACT_APP_CLOUDINARY_API_SECRET`: The API secret for Cloudinary.
  * `REACT_APP_CLOUDINARY_API_KEY`: The API key for Cloudinary.
  * `REACT_APP_GOOGLE_CLIENT_ID`: The client ID for Google authentication.
  * `REACT_APP_FACEBOOK_APP_ID`: The app ID for Facebook authentication.
  * `REACT_APP_GOOGLE_CLIENT_SECRET`: The client secret for Google authentication.


```dotenv
# Example .env file
REACT_APP_API_URL=https://api.example.com
REACT_APP_NAME=Social Media Platform
REACT_APP_SERVER_URL=https://example.com
REACT_APP_CLOUDINARY_NAME=cloudname
REACT_APP_CLOUDINARY_UPLOAD_PRESET=<your-cloundinary-upload-preset>
REACT_APP_CLOUDINARY_API_SECRET=<your-cloundinary-api-secret>
REACT_APP_CLOUDINARY_API_KEY=<your-cloundinary-api-key>
REACT_APP_GOOGLE_CLIENT_ID=<your-google-client-id>
REACT_APP_FACEBOOK_APP_ID=<your-facebook-app-id>
REACT_APP_GOOGLE_CLIENT_SECRET=<your-google-client-secret>
```
5. Run in development mode

```bash
npm run start
# or
yarn start
# or
pnpm start
```
6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage
Watch in [NovSocial Youtube](https://www.youtube.com)

## Contributing
* [Nguyễn Minh Nhật](https://github.com/minhnhat165)

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
