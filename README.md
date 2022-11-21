# 🐝 Mailbee: Forms Backend

🐝 MailBee is a JS version of [🐻 MailBear](https://github.com/DenBeke/mailbear ) (by version, I mean copy)

MailBee is an open source, self hosted forms backend. Just do a post request to the API with some form data, and MailBee will make sure the submission is sent to you via mail!

MailBee will always hide the email address of the recepient, since the forms are accessed by a unique key.

## Why do I copy MailBear ?

I liked the way MailBear was build and the features available. But some was missing and I don't really know Go language so I don't forked original repo.

## Run with Docker

You can easily run MailBee with Docker:

Copy `config_sample.yml` to `config.yml`, `template_sample.html` to `template.html` and run the server:

    docker run -v $(PWD)/config.yml:/mailbee/config.yml -v $(PWD)/template.html:/mailbee/template.html -p 3000:3000 ctrlouis/mailbee

For your convenience I created a [docker-compose.yml](./docker-compose.yml) file.

## Run in Development

Copy `config_sample.yml` to `config.yml`, `template_sample.html` to `template.html` and run the server:

`docker-compose -f docker-compose.dev.yml up`

Api is available at `:3000`, Prometheus at :8080

## Build image

```
docker build -t mailbee .
```

## Forms configuration

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

forms:
    some-form-name:
        name: some-form-name
        key: some-random-key
        overwrite_subject: true
        allowed_domains:
            - localhost:8080
            - example.com
        to_email:
            - recepient@example.com
```

## Usage

Once MailBee is running you can send requests with form data in the JSON body:

```
curl \
    -X POST \
    http://localhost:3000/api/v1/form/some-random-key \
    -H 'Content-Type: application/json' \
    -H 'Origin: http://localhost:8080' \
    -d '{"name":"Mathias Beke","email":"dene.beke@example.com", "subject": "Some subject", "content": "Maecenas faucibus mollis interdum. Sed posuere consectetur est at lobortis."}'
```

### Usage with HTML form element

Query params `redirect` and `redirect_error` are available to your convenient :

- `?redirect` // redirect in case of success and error if param redirect_error is not provide
- `?redirect_error` // redirect in case of error

```
<form action="http://localhost:3000/api/v1/form/some-form-key?redirect=http://domaine.com/form-page.html&redirect_error=http://domaine.com/form-page.html?error" method="post">
        <input type="email" name="email" value="" required>
        <input type="text" name="name" value="" required>
        <input type="hidden" name="subjec" value="" required>
        <input type="text" name="content" placeholder="Message" value="Salut les potes !" required>
        <button type="submit">Envoyer</button>
    </form>
```

## Environment variable summary

| Variable                      | Default value                     | Description |
| ----------------------------- | --------------------------------- | ----------- |
| **PORT**                      | *3000*                            | Api listening port
| **CONFIGPATH**                | */mailbee/config.yml*             | Path to config.yml file
| **TEMPLATEPATH**              | */mailbee/template.html*          | Path to template.html file
| **DEFAULT_SUBJECT**           | *New message ✉️ *                  | Default mail subject
| **RATE_LIMITER_MAX**          | *5*                               | The maximum number of requests within RATE_LIMITER_DURATION
| **RATE_LIMITER_DURATION**     | *120*                             | How long keep records of requests in seconds

## Mail template

Build the mail template you want with `template.html` file. HTML is generate with [EJS](https://ejs.co/). Variable syntax is <%= variable %>. Following variables are available to use is your template :

| Variable                      | Description |
| ----------------------------- | ----------- |
| **formName**                  | Form name
| **email**                     | Email entered bu user
| **name**                      | Name entered by user
| **content**                   | Message entered by user
| **content**                   | Time and date of mail submission

## Metrics

Prometheus metrics can be found on `:3000/metrics` by default. To get statistics of submissions per form use this metric: `mailbee_form_submissions_total{form="some-form-name"}`.

A Grafana dashboard for these metrics is available here: [./dashboard.json](dashboard.json)

## Acknowledgements

- [Mathias Beke](https://denbeke.be/)
