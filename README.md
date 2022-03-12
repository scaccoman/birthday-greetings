# Birthday Greetings

Technical challange solution for the [Birthday Greetings kata](http://matteo.vaccari.name/blog/archives/154).

## Problem

As you’re a very friendly person, you would like to send a birthday note to all the friends you have. But you have a lot of friends and a bit lazy, it may take some times to write all the notes by hand.

The good news is that computers can do it automatically for you.

Imagine you have a flat file with all your friends :

```text
last_name, first_name, date_of_birth, email
Doe, John, 1982/10/08, john.doe@foobar.com
Ann, Mary, 1975/09/11, mary.ann@foobar.com
```

The greetings email contains the following text:

```text
Subject: Happy birthday!
Happy birthday, dear John!
```

## Solution

As the purpose of this challange is to evaluate one's coding abilities, I've decided to keep things simple and not use any framework or huge library.
There's a set of problems to solve:

- _How do you structure the code so it's easily extensible?_

  Notifiers and Stores are dynamically loaded from a configuration file, keeping execution time and memory footprint at a minimum. Adding a new notifier or store is as easy as creating a new handler (e.g. `sms.js`) and adding it to the configuration file.

- _How do you read and parse the flat file?_

  The flat file is read using a read stream and parsed by an ["industry standard" CSV parser](https://github.com/mafintosh/csv-parser). While using a stream slightly increases the project complexity, it allows to handle huge files without running out of memory.

- _How do you send the email at the right time?_

  A cron expression is generated using the date of birth of each friend, which is then used to schedule the email sending.

  ```javascript
  const dob = new Date(row.date_of_birth)
  const cronExpression = `0 0 0 ${dob.getDate()} ${dob.getMonth() + 1} * *`
  ```

## Limitations

Keeping things simple, I've decided to not handle certain edge cases:

- The date of birth validation is handled by JavaScript's built-in Date object and by a simple regex. Which means that there's, unfortunately, many edge cases not accounted for.
- The server is stateless and doesn't keep track of emails sent. This means that if there are crashes, it could potentially miss some emails. This is a problem that could be easily fixed by adding some sort of DB or a log file.
- There's no way to easily deploy the project to a remote server, it's just meant to be run locally.

## Development

Select the correct node version and install the required dependencies:

```javascript
nvm use && npm i
```

Run the application in development mode:

```javascript
npm run dev
```
