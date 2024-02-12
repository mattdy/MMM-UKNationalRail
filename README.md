# MMM-UKNationalRail

Additional Module for MagicMirror² https://github.com/MichMich/MagicMirror

# Module: UKNationalRail

This module displays live train departures from the specified station. Previous versions of this module pulled from [TransportAPI](http://transportapi.com/), however they have reduced their free tier limits to an unusuable level. Therefore, the module has now been updated to pull directly from the National Rail OpenLDBWS, more information available [here](https://wiki.openraildata.com/index.php?title=Main_Page).

![](./images/Current_version.png)

## Using the module

Git clone from this repository into the modules sub-directory of the Magic Mirror installation, change directory into the newly cloned code and then run npm install.

```bash
git clone https://github.com/mattdy/MMM-UKNationalRail.git
cd MMM-UKNationalRail
npm install
```

To use this module, add it to the modules array in the `config/config.js` file:

```javascript
modules: [
  {
    module: "MMM-UKNationalRail",
    position: "top_right",
    header: "Departures",
    config: {
      station: "RDH",
      token: "<INSERT TOKEN HERE>"
    }
  }
];
```

This module does support multiple instances, you can add as many entries for as many stations as you wish

## Configuration options

| Option              | Required     | Settings Description                                                                                                                                      |
| ------------------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `station`           | **Required** | String. The station you require information about. <br />This must be provided in the CRS format                                                          |
| `token`             | **Required** | String. Your OpenLDBWS token - [obtained by registering here](http://realtime.nationalrail.co.uk/OpenLDBWSRegistration)                                   |
| `columns`           | Optional     | Array. A list of columns that you wish to display. A list of these and their contents is given below                                                      |
| `filterDestination` | Optional     | String or Array. The CRS format code of a station, only departures that call here will be shown                                                           |
| `filterCancelled`   | Optional     | Boolean. Whether or not to filter out cancelled trains                                                                                                    |
| `fetchRows`         | Optional     | Integer. The number of results to fetch in the OpenLDBWS query, before filtering (other than destination filtering, which is applied to the query itself) |
| `displayRows`       | Optional     | Integer. The maximum number of results to display from the query result.                                                                                  |

To find the CRS Station codes for the 'stations of interest' go here: http://www.railwaycodes.org.uk/crs/CRS0.shtm or use OpenStreetMap. Information on using OpenStreetMap is found in the CRS.md file in this repo

## Available columns

You can configure the columns to display using the `columns` configuration option detailed above. This option takes an Array of Strings, which must be one of the following options:

| Column          | Description                                                                                                               |
| --------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `platform`      | The platform number at which the train will arrive. Will be blank for cancelled trains and in certain other circumstances |
| `destination`   | The final destination station of this train                                                                               |
| `origin`        | The origin station of this train                                                                                          |
| `status`        | Whether the train is On Time/Cancelled/Late                                                                               |
| `dep_scheduled` | The scheduled departure time for this train                                                                               |
| `dep_estimated` | The estimated departure time for this train                                                                               |
| `eta`           | The estimated arrival time for this train at the first destination as set in filterDestination                            |
| `duration`      | The estimated duration for this train between the origin and the first detination as set in the filterDestination         |

## OpenLDBWS Token

The API token can be [obtained by registering here](http://realtime.nationalrail.co.uk/OpenLDBWSRegistration). Access is free for low-volume use.

## Credits & Contributions

This module was originally created by [Nick Wootton](https://github.com/nwootton/MMM-UKNationalRail) using [TransportAPI](http://transportapi.com/), but he chose to end supporting the module. In 2022, support was taken over by [Matt Dyson](https://github.com/mattdy/MMM-UKNationalRail), and was migrated to using [National Rail OpenLDBWS](http://realtime.nationalrail.co.uk/OpenLDBWSRegistration).

All contributions to the module are welcome, in the form of pull requests, or bug reports. If you wish to make a gesture of thanks towards the developer, please consider a small donation [via this link](http://paypal.me/mattdy90)
