# Extended Entity Row

[![](https://img.shields.io/github/release/kalkih/extended-entity-row.svg?style=flat-square)](https://github.com/kalkih/extended-entity-row/releases/latest)

An extended entity-row for [Home Assistant](https://home-assistant.io/) Lovelace UI, with support for basic templating for primary and secondary info.

## Install

### Simple install

1. Download and copy `extended-entity-row.js` from the [latest release](https://github.com/kalkih/extended-entity-row/releases/latest) into your `config/www` directory.

2. Add a reference to `extended-entity-row.js` inside your `ui-lovelace.yaml` or through the raw config editor UI.

    ```yaml
    resources:
      - url: /local/extended-entity-row.js
        type: module
    ```

### CLI install

1. Move into your `config/www` directory

2. Download `extended-entity-row.js`

    ```console
    $ wget https://github.com/kalkih/extended-entity-row/releases/download/v0.1.0/extended-entity-row.js
    ```

3. Add a reference to `extended-entity-row.js` inside your `ui-lovelace.yaml` or through the raw config editor UI.

    ```yaml
    resources:
      - url: /local/extended-entity-row.js
        type: module
    ```

## Using the card

### Options

#### Card options
| Name | Type | Default | Since | Description |
|------|------|---------|-------|-------------|
| type | string | **required** | v0.1.0 | `custom:extended-entity-row`
| entity | string | **required** | v0.1.0 | The `entity_id` of the entity.
| name | string | optional | v0.1.0 | Overwrites friendly name.
| icon | string | optional | v0.1.0 | Overwrites icon or entity picture, any mdi icon.
| primary_info | string | optional | v0.1.0 | Show alternate primary info, Values: [template](#template) string.
| secondary_info | string | optional | v0.1.0 | Show additional info. Values: `entity-id`, `last-changed` or a [template](#template) string.


### Template
Any value exposed by the the entity object.
See the [examples](#example-usage) for example usage.

Common examples:
* `[[ entity_id ]]`
* `[[ state ]]`
* `[[ attributes.<attribute> ]]`
* `[[ last_changed ]]`
* `[[ last_updated ]]`

Several template expressions can be used in a single string.

Common examples:
* `[[ entity_id ]] is [[ state ]]`
* `Current temp: [[ attributes.temperature ]]`


### Example usage

#### Custom primary info

```yaml
- type: custom:extended-entity-row
  entity: sensor.example
  name: Sensor battery level
  primary_info: '[[ attributes.battery_level ]]%'
```

#### Custom secondary info

```yaml
- type: custom:extended-entity-row
  entity: media_player.spotify
  icon: mdi:spotify
  secondary_info: '[[ attributes.source ]]'
```

#### Why not both?
```yaml
- type: custom:extended-entity-row
  entity: weather.example
  name: Weather
  primary_info: 'Currently [[ state ]]'
  secondary_info: >-
    Humidity: [[ attributes.humidity ]]%,
    Wind: [[ attributes.wind_speed ]]m/s
```

## Problems?
Make sure you have `javascript_version: latest` set in your `configuration.yaml` under `frontend:`.

Make sure you got the latest version of `extended-entity-row.js`.

If you have issues after updating the card, try clearing the browser cache manually.

## License
This project is under the MIT license.
