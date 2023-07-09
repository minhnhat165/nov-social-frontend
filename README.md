# NOV Social

## Overview

This is a social media platform built using React and Tailwind CSS. It provides a user-friendly interface for users to connect, share posts, and interact with each other.

![Home Feed](https://github.com/minhnhat165/nov-social-frontend/assets/72795828/c890f04a-a0b7-4bcc-9c0d-dfe762ec0012)

## Features

- User authentication: Users can create accounts, log in, and log out.
- Login by Google or Facebook: Users can log in to the platform using their Google or Facebook accounts.
- User profiles: Users can create and customize their profiles, upload profile pictures, and update their information include hobbies.
- Linking accounts: Users can link multiple social media accounts to their platform account.
- Post creation and interaction: Users can create posts, like and comment on posts, and view posts from other users.
- Tic Tac Toe game: Users can play a game of Tic Tac Toe with other users on the platform.
- Follow system: Users can follow other users and receive updates on their posts.
- Notifications: Users receive real-time notifications for likes, comments, and new followers.
- Bookmark feature: Users can save posts as bookmarks for easy access later.
- Search functionality: Users can search for other users and posts based on keywords.
- Dark/Light mode: Users can switch between dark and light themes for the platform.
- Responsive design: The platform is optimized for both desktop and mobile devices.

## Backend

The backend source code for the social media platform can be found in the following repository: [https://github.com/minhnhat165/nov-social-backend](https://github.com/minhnhat165/nov-social-backend). The backend is responsible for handling user authentication, managing data storage, and providing APIs for the frontend to communicate with.

Please refer to the backend repository for more information on setting up and running the backend server.

## Technologies Used

- Frontend: React, JavaScript, Tailwind CSS, Redux toolkit.
- Backend: Nodejs Express, JavaScript, Passport, Redis, MongoDB
- Authentication: JSON Web Tokens (JWT)
- Image upload: Cloudinary
- Real-time: Socket.io

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

## Screenshots
*Login Page*
![Login Page](https://github.com/minhnhat165/nov-social-frontend/assets/72795828/8ec86193-cb6d-40f1-bf45-f88ac00e7d17)


*Register Page*
![Register Page](https://github.com/minhnhat165/nov-social-frontend/assets/72795828/7700ec5b-3b79-4ce9-a88e-12979f84e0d8)

*Home Feed*
![Home Feed](https://github.com/minhnhat165/nov-social-frontend/assets/72795828/5d315d56-f3cf-47d8-8e00-b01d7de50e3a)
![Screenshot (42)](https://github.com/minhnhat165/nov-social-frontend/assets/72795828/72ff39fc-6439-4b26-997f-b6348da41097)
![Screenshot (43)](https://github.com/minhnhat165/nov-social-frontend/assets/72795828/3656a9e8-4bc9-4af5-b9fe-14a56be4f6f6)
![Screenshot (44)](https://github.com/minhnhat165/nov-social-frontend/assets/72795828/383cfa91-a7b7-45f3-aed5-f3e848bf2940)
![Screenshot (45)](https://github.com/minhnhat165/nov-social-frontend/assets/72795828/4e785074-0211-43cd-8e8f-b4b985655702)
![Screenshot (46)](https://github.com/minhnhat165/nov-social-frontend/assets/72795828/0759485a-1d08-4449-b22c-1f36632c1215)
![Screenshot (47)](https://github.com/minhnhat165/nov-social-frontend/assets/72795828/b4cf0a54-0fce-4873-a890-b68455a1787f)
![Screenshot (48)](https://github.com/minhnhat165/nov-social-frontend/assets/72795828/3e753d4a-4171-4fb5-a787-01e2dec12e02)
![Screenshot (51)](https://github.com/minhnhat165/nov-social-frontend/assets/72795828/218dbfa8-0a65-4120-bbe1-8a5949fa007c)
![Screenshot (52)](https://github.com/minhnhat165/nov-social-frontend/assets/72795828/2dd04d07-9e4f-4380-a10b-493ebbdf645b)
![Screenshot (53)](https://github.com/minhnhat165/nov-social-frontend/assets/72795828/cd8cfa35-13f9-498c-987a-f5fadd3b67a3)



*People Page*
![People Page](https://github.com/minhnhat165/nov-social-frontend/assets/72795828/6fb082bb-24e3-4dbb-bbc7-df2197a35c6d)


*Game Page*
![Game Page](https://github.com/minhnhat165/nov-social-frontend/assets/72795828/3d84f0ff-d3c2-499c-83ec-d86ec83f2053)

![Game Page 2](https://github.com/minhnhat165/nov-social-frontend/assets/72795828/3f40f217-2ca6-4c75-bc6b-9e786de7a5c3)

*Profile Page*
![Screenshot (54)](https://github.com/minhnhat165/nov-social-frontend/assets/72795828/6241b747-e17c-4d85-9d06-9182ac904d93)
![Screenshot (55)](https://github.com/minhnhat165/nov-social-frontend/assets/72795828/ff62ed93-e736-4a6a-ad55-c7692ad4802c)
![Screenshot (56)](https://github.com/minhnhat165/nov-social-frontend/assets/72795828/45ff70a4-c92d-4220-a38a-509b67cc6b1f)
![Screenshot (57)](https://github.com/minhnhat165/nov-social-frontend/assets/72795828/1d6a9904-3d24-47d9-bd38-ea12597cba38)
![Screenshot (58)](https://github.com/minhnhat165/nov-social-frontend/assets/72795828/4bfc79fd-d17e-412d-9c0e-ca149fd72968)
![Screenshot (59)](https://github.com/minhnhat165/nov-social-frontend/assets/72795828/999bb051-0668-4f20-993c-47b136a7725c)
![Screenshot (62)](https://github.com/minhnhat165/nov-social-frontend/assets/72795828/4938876f-a8c0-4897-93a7-c71ea379bdc6)

## Contributing
* [Nguyễn Minh Nhật](https://github.com/minhnhat165)
  
## License

[MIT](https://choosealicense.com/licenses/mit/)
