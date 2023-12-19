## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ docker-compose up -d
$ npm run start
```

## Manual tests

`api.http` can be used to execute manual testing.

Please create `http-client.private.env.json` to be able to put generated oauth token in format:

```json
{
  "local": {
    "auth_token": "YOUR_TOKEN"
  }
}
```

## Test

```bash
# unit tests
$ npm run test
```

## Tips

```bash
# Faster builds
npm run start -- -b swc
```
