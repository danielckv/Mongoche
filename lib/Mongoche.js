import {MemcacheInit} from 'Memcache';
import {find, findOne, MongoClient} from 'mongodb'
import {assert} from 'assert'

export default class Mongoche {

    construct(mongoAddr) {
        this.mongoAddr = mongoAddr;
        this.memCache = MemcacheInit.instance();
    }

    configureMemcache(options) {
        if(options.cluster)
            this.memCache.setClusterConnection(options.clusterIPs);
        else
            this.memCache.setHostAddreess(options.hostAddress);
        this.memCache.init();
    }

    static setMongoConnection(db) {
        this.connection = db;
    }

    static getMongoConnection() {
        return this.connection;
    }

    connectMongo() {
        MongoClient.connect(this.mongoAddr, function (err, db) {
            assert.equal(null, err);
            console.log("[Mongoche] connected to MongoDB.");
            Mongoche.setMongoConnection(db);
        });
    }

    findOne(col, query) {
        return Mongoche.getMongoConnection().collection(col).findOne(query, function(err, docs) {
            callback(docs);
        });
    }

    find(col, query) {
        return Mongoche.getMongoConnection().collection(col).find(query).toArray(function(err, docs) {
            callback(docs);
        });
    }
}