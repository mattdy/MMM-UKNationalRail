/* Magic Mirror
 * Module: UK National Rail
 *
 * Originally by Nick Wootton
 * Migrated to OpenLDBWS by Matt Dyson
 *
 * https://github.com/mattdy/MMM-UKNationalRail
 *
 * MIT Licensed.
 */

const NodeHelper = require("node_helper");
const Rail = require("national-rail-darwin");
const Log = require("../../js/logger");

module.exports = NodeHelper.create({
  start: function () {
    Log.info("MMM-UKNationalRail helper started");

    this.started = false;
    this.config = {};
    this.rail = null;
  },

  getTimetable: function (id) {
    var self = this;

    if (this.rail === null) {
      return;
    }

    var options = {};

    options.rows = this.config[id].fetchRows;

    if (this.config[id].filterDestination) {
      options.destination = this.config[id].filterDestination;
    }

    Log.info("Sending request for departure board information");
    this.rail.getDepartureBoardWithDetails(
      this.config[id].station,
      options,
      function (error, result) {
        Log.info("Return from getDepartureBoard: " + error + " - " + result);
        const newResult = { result, id };

        if (!error) {
          self.sendSocketNotification("UKNR_DATA", newResult);
        }
      }
    );
  },

  socketNotificationReceived: function (notification, payload) {
    Log.info("socketNotificationReceived");
    switch (notification) {
      case "UKNR_TRAININFO":
        this.getTimetable(payload.id);
        break;

      case "UKNR_CONFIG":
        Log.info("MMM-UKNationalRail received configuration");
        this.config[payload.id] = payload.config;

        const config = this.config[payload.id];

        // if the filter destination is not defined ignore
        if (config.filterDestination.length === 1) {
          // if there is only one filter destination keep it
          config.filterDestination = config.filterDestination[0];
        } else {
          // otherwise remove it and handle the multiple filter destinations on the response
          delete config.filterDestination;
        }

        this.rail = new Rail(this.config[payload.id].token);

        this.sendSocketNotification("UKNR_STARTED", true);
        this.getTimetable(payload.id);
        this.started = true;
    }
  }
});
