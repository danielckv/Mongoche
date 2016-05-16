import {MemcacheInit} from 'Memcache';
import {find, findOne, MongoClient} from 'mongodb'
import {assert} from 'assert'

export default class Mongoche {

    construct(mongoAddr) {
        this.mongoAddr = mongoAddr;
        this.memCache = MemcacheInit.instance();
    }

    static setMongoConnection(db) {
        this.connection = db;
    }

    static getMongoConnection(db) {
        return this.connection;
    }

    connectMongo() {
        MongoClient.connect(this.mongoAddr, function (err, db) {
            assert.equal(null, err);
            console.log("[Mongoche] connected to MongoDB.");
            Mongoche.setMongoConnection(db);
        });
    }

}