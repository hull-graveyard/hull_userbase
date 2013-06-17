# Bring you own users

This repository is a demo of a [hull.io][hullio] feature, that allows you to plug your existing pool of users into [hull.io][hullio] services.

There are two ways to achieve this:

* Your users belong in your own DB, and you don't want to change anything
* Your users log into your app via Facebook, Twitter...

This is an Node.js app built with [Express](http://expressjs.com), and it uses the `npm` module for [hull][hullio]: [hull-node](http://github.com/hull/hull-node).


## Install

```javascript
npm install
npm start
```

Open your browser and point to the URL `http://localhost:3000`.

## What you'll find

### `GET /use_hull`

In this part of the demo, you will see how you can use the authentication features of [hull](hullio) to tell your server when a user has logged in.

The relevant code is located in `./lib/use_hull.js`.

### `GET /use_passport`

In the part of the demo, you will see how you can use your own authentication system and automatically login your current user to [hull](hullio) services.
For this, we have used the [passport](http://passportjs.com) library to authenticate the users.

The relevant code is located at `./lib/use_passport.js`

# Licence

MIT

[hullio]: hull.io
