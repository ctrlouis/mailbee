# 🐝 Mailbee: Forms Backend

🐝 MailBee is a JS version of [🐻 MailBear](https://github.com/DenBeke/mailbear ) (by version, I mean copy)

MailBee is an open source, self hosted forms backend. Just do a post request to the API with some form data, and MailBee will make sure the submission is sent to you via mail!

MailBee will always hide the email address of the recepient, since the forms are accessed by a unique key.

## Why do I copy MailBear ?

I liked the way MailBear was build and the features available. But some was missing and I don't really know Go language so I don't forked original repo.

## Run with Docker

You can easily run MailBee with Docker:

Copy `config_sample.yml` to `config.yml` and run the server:

    docker run -v $(PWD)/config.yml:/mailbee/config.yml ctrlouis/mailbee

For your convenience I created a [docker-compose.yml](./docker-compose.yml) file.

## Run in Development

Copy `config_sample.yml` to `config.yml` and run the server:

    `docker-compose -f docker-compose.dev.yml up`

## Build image

```
docker build -t mailbee .
```

## Configuration

Configuration is very simple. Just create as many forms as you want in `config.yml`:

```yaml
global:
    smtp:
        host: smtp.example.com
        port: 25
        user:
        password:
        disable_tls: true
        from_email: no-reply@example.com
        from_name: MailBee
    http:
        address: ":1234"


forms:
    some-form-name:
        key: some-random-key
        overwrite_subject: true
        allowed_domains:
            - localhost:8080
            - example.com
        to_email:
            - recepient@example.com
```


## Environment variable

Example with default value :
```
PORT=3000 # app listen port
CONFIGPATH=/mailbee/config.yml # path to config.yml file
DEFAULT_SUBJECT=New message ✉️ # default subject when overwrite not allowed
```

## Usage

Once MailBear is running you can send requests with form data in the JSON body:

```
curl \
    -X POST \
    http://localhost:3000/api/v1/form/some-random-key \
    -H 'Content-Type: application/json' \
    -H 'Origin: http://localhost:8080' \
    -d '{"name":"Den Beke","email":"dene.beke@example.com", "subject": "Some subject", "content": "Maecenas faucibus mollis interdum. Sed posuere consectetur est at lobortis."}'
```

## Acknowledgements

- [Mathias Beke](https://denbeke.be/)