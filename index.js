/**
* @license
* Copyright 2021 Renze Nicolai
* This code is released under the MIT license.
* SPDX-License-Identifier: MIT
*/

"use strict";

const fs = require("fs");

class Configuration {
    constructor(filename) {
        if (filename === null) {
            this._data = {};
        } else {
            try {
                this._data = JSON.parse(fs.readFileSync(filename));
            } catch (error) {
                throw Error("Unable to read configuration file", error);
            }
        }
    }

    get(/* ... */) {
        for (let i = 0; i < arguments.length; i++) {
            if (typeof arguments[i] != "string") {
                throw Error("Configuration parameter get called with invalid arguments");
            }
        }

        //environment override check
        let env_name="CONFIG"
        for (let i = 0; i < arguments.length; i++) {
            env_name=env_name+"_"+arguments[i].toUpperCase()
        }
        if (process.env[env_name] !== "")
        {
            return  process.env[env_name]
        }


        let result = this._data;
        if (arguments.length > 0) {
            try {
                for (let i = 0; i < arguments.length; i++) {
                    result = result[arguments[i]];
                }
            } catch (error) {
                result = null;
            }
        }
        if (typeof result === "undefined") {
            result = null;
        }
        return result;
    }
}

module.exports = Configuration;
