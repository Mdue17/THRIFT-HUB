# THRIFT-HUB

'THRIFT-HUB' is a Social Network and e-commerce site for SELLING AND BUYING second hand goods - Users can login to their profile, make posts, comment on other Sellers’s posts, upload, add stories, as well as make purchases of desired goods via Stripe Checkout.

You can checkout it out here: [THRIFTHUB](https://www.thrift.co.za/)

## How it's Made
Tech Used: AWS SES, AWS S3, Stripe, Service Workers, Tailwind, Daisy UI, EJS, Node.js, Croppie.js, Nodemailer, Javascript, Express.js, MongoDB, Passport - Google oAuth.

## Features

- ###  **Login via Google OAuth, Sell stuff by posting images of it **


- ### **Custom User Dashboards, Feeds and Commenting System**

- ### ** Check stats via Push Notification Service Worker**

- ### **Purchase your products via Stripe Checkout**

- ### **Welcome email sent via AWS SES and Sendy**



# Install

`npm install`


# What Needs to be Added

Create a `.env` file in config folder and add the following as `key = value`
- PORT = 2121
- MONGO_URI = MongoDB Cloud String
- GOOGLE_CLIENT_ID = Google Developer Client ID
- GOOGLE_CLIENT_SECRET = Google Developer Secret
- BUCKET = AWS S3 Bucket
- AWS_ACCESS_KEY_ID = AWS S3 Access Key ID
- AWS_SECRET_ACCESS_KEY = AWS S3 Secret
- AWS_DEFAULT_REGION = AWS S3 Default region
- APP_EMAIL = Application Email
- APP_ADMIN = App Admin Name
- APP_NAME = App Name
- VAPID_PUBLIC_KEY = Service Worker Public Key
- VAPID_PRIVATE_KEY = Service Worker Private Key
- LIST_ID = Sendy Welcome Email ID
- SENDY_URL = Sendy Url used for Signup
- SENDY_API_KEY= Sendy API
- STRIPE_PUBLIC_KEY = Stripe Public Key
- STRIPE_PRIVATE_KEY = Stripe Private Key/Test Key
- SERVER_URL = Server URL


# Run

`npm start`


# Future Optimizations
- Optimize Image and Story Feed
- Use React on the frontend
- Add ability to Search
- Add social media sharing ability
- add followers as usual buyers
- add location and people near you
