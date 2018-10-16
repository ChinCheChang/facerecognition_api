# facerecognition_api
Server side of facerecognition

## Installing
1. clone this repo
2. npm install
3. npm start
4. signup clarifai and generate your own API key [here](https://www.clarifai.com/)
5. adjust the image.js file in the controllers floder 

```javascript=
const app = new Clarifai.App({
 apiKey: YOUR_API_KEY
});
```

6. connect to your database(PostgreSQL)
