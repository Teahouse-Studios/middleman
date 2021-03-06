# Teahouse Middleman

This is the client-only redirect page for Teahouse Studios projects, built with Vue 3 + Typescript + Vite + Vuetify 3.

## Usage

Public Instance: https://middleman.wdf.ink/

This is for internal use only. Deploy your own instance if you want to use it in non-teahouse projects.

### URL params

- `source`: The source of this redirect. [All avalible options.](#Supported services)
- `dest`: The redirect destination. URI encoded. Protocol is necessary.
- `rot13`: Same as `dest`, but encoded with rot13. Useful for obfuscating the URL. Only latin letters need to be encoded. Please note to decode your URL first, encode it with rot13, then encode it back again. If you don't do so, you will fail to access Middleman as it creates a malformed URL.

Example: https://middleman.wdf.ink/?source=akaribot&dest=https%3A//github.com/Teahouse-Studios/bot

## Supported services

- `akaribot`
- `default`

New teahouse projects may be requested by contacting @Dianliang233. Be sure to include the use, `source` name and link to both privacy and terms.
