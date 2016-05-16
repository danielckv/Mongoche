"use strict";

const Memcached = require('memcached');

export default class MemcacheInit {
    init() {
      this.connection = new Memcached( this.hostsAddress );
    }

    setHostAddreess(ip) {
        this.hostsAddress = ip;
    }

    setClusterConnection(array) {
        this.hostsAddress = array;
    }

    getConnection() {
        return this.connection;
    }

    static get instance() {
        if(!this[singleton]) {
            this[singleton] = new MemcacheInit();
        }
        return this[singleton];
    }

}