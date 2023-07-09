# NOV Social

## Overview

This is a social media platform built using React and Tailwind CSS. It provides a user-friendly interface for users to connect, share posts, and interact with each other.

![Home Feed](https://github.com/minhnhat165/nov-social-frontend/assets/72795828/f4b66d6d-52c9-4d70-bd0e-bb0e2e2a31dd)

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
![Login Page](https://github.com/minhnhat165/nov-social-frontend/assets/72795828/c1efe0ab-4e97-4a70-8336-9fb0c128a8e8)

*Register Page*
![Register Page](https://github.com/minhnhat165/nov-social-frontend/assets/72795828/8460471f-fe9b-4bb2-929a-39cdc0cc823e)

*Home Feed*
![Home Feed](https://github.com/minhnhat165/nov-social-frontend/assets/72795828/f4b66d6d-52c9-4d70-bd0e-bb0e2e2a31dd)
![Screenshot (42)](https://github.com/minhnhat165/nov-social-frontend/assets/72795828/95da89a2-63ef-45cf-acae-e2e7e0d0f364)
![Screenshot (43)](https://github.com/minhnhat165/nov-social-frontend/assets/72795828/7dfc8b32-a5a6-4aa4-b46b-6980f46135c8)
![Screenshot (44)](https://github.com/minhnhat165/nov-social-frontend/assets/72795828/0718bbf1-8d3b-4a95-b1bc-34f367bdfb86)
![Screenshot (45)](https://github.com/minhnhat165/nov-social-frontend/assets/72795828/cff14eae-3fcf-468c-bd13-daffd8e6bc9f)
![Screenshot (46)](https://github.com/minhnhat165/nov-social-frontend/assets/72795828/72b047ab-9aad-407a-a342-a5279d0f1332)
![Screenshot (47)](https://github.com/minhnhat165/nov-social-frontend/assets/72795828/84a20c04-6623-4e9a-b4b5-b83e6e061642)
![Screenshot (48)](https://github.com/minhnhat165/nov-social-frontend/assets/72795828/5617b01c-90b1-4e25-a186-223043368aba)
![Screenshot (51)](https://github.com/minhnhat165/nov-social-frontend/assets/72795828/418e994a-5d9e-4287-bf9a-e5524ba211e5)
![Screenshot (52)](https://github.com/minhnhat165/nov-social-frontend/assets/72795828/60aafc14-f82a-46ef-8858-70f402af8923)
![Screenshot (53)](https://github.com/minhnhat165/nov-social-frontend/assets/72795828/850f7a37-b0f9-4a14-853b-8fb11dd01467)


*People Page*
![People Page](https://github.com/minhnhat165/nov-social-frontend/assets/72795828/5800d4e0-0dd7-4e96-8bd2-8b75c010c7a3)

*Game Page*
![Game Page](https://github.com/minhnhat165/nov-social-frontend/assets/72795828/e904b0ec-24be-4598-9870-a962e0390626)
![Game Page 2](https://github.com/minhnhat165/nov-social-frontend/assets/72795828/dcd965ee-006b-4cf5-851e-566e1e5b2ba0)

*Profile Page*
![Screenshot (54)](https://github.com/minhnhat165/nov-social-frontend/assets/72795828/1ce1d282-b6fb-4b7a-b827-57164108672e)
![Screenshot (55)](https://github.com/minhnhat165/nov-social-frontend/assets/72795828/e6121430-5a01-4e73-a968-120c50c604b8)
![Screenshot (56)](https://github.com/minhnhat165/nov-social-frontend/assets/72795828/9d31ab2f-aa2a-4fa4-8bde-75c27122e22a)
![Screenshot (57)](https://github.com/minhnhat165/nov-social-frontend/assets/72795828/ef46b1ca-1e77-4fb9-9e97-d9ec4cb7fcea)
![Screenshot (58)](https://github.com/minhnhat165/nov-social-frontend/assets/72795828/398c4867-33db-4f17-b7eb-d4ee16e63a43)
![Screenshot (59)](https://github.com/minhnhat165/nov-social-frontend/assets/72795828/64d07ce8-9844-4efb-b9b2-5c634eff4b67)
![Screenshot (62)](https://github.com/minhnhat165/nov-social-frontend/assets/72795828/572938d7-32f4-4d2c-95d9-d0df3f29f8af)



## Contributing
* [Nguyễn Minh Nhật](https://github.com/minhnhat165)
  
## License

[MIT](https://choosealicense.com/licenses/mit/)
