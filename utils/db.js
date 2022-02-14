const MongoClient = require('mongodb').MongoClient;
const process = require('./process');
var isodate = require("isodate");

const url = process.env_production.DB_URL;
var db;

var retrieveData = async function (collection, data) {
    const result = await db.collection(collection).findOne({ username_db: data });
    return result;
}

var retrieveAccount = async function (collection, data) {
    const result = await db.collection(collection).findOne({ EOSAccount: data });
    return result;
}

var retrieveMultipleData = async function (collection, data) {
    const result = await db.collection(collection).find({ username_db: { "$in": data } });
    return result.toArray();
}

var retrieveHotWallet = async function (collection, data) {
    const result = await db.collection(collection).findOne({ coin: data });
    return result;
}

const retrieveUserInfo = async function (collection, data) {
    const result = await db.collection(collection).findOne({ user_id: data });
    return result;
}

const updateOne = async function (collection, filter, query) {
    const result = await db.collection(collection).updateOne(filter, query, { upsert: true });
    return result;
}

const bulkWrite = async function (collection, data) {
    const result = await db.collection(collection).bulkWrite(data);
    return result;
}

var purchaseCryptoInfo = async function (collection, data) {
    const logger = initiateLoggerInstance(data.username);
    logger.info("in purchaseCryptoInfo");
    logger.info(data);
    let newValue;
    let newUserData = {
        user_id: data.username,
        wallets: {}
    }
    if (data.type === 'jkbit') {
        newValue = { $set: { 'wallets.eth.jkbit.balance': data.newBalance } };
        newUserData.wallets = {
            eth: {
                jkbit: {
                    balance: data.newBalance
                }
            }
        };
    }

    const user = await retrieveUserInfo(collection, data.username);
    let result;
    if (user) {
        logger.info("Yes, User ");
        logger.info(newValue);
        result = await db.collection(collection).updateOne({ user_id: data.username }, newValue);
    }
    else {
        logger.info("No, User ");
        logger.info(newValue);
        result = await db.collection(collection).insertOne(newUserData);
    }
    return result.result;
}

var updateInfo = async function (collection, data) {

    const logger = initiateLoggerInstance(data.username);
    logger.info("in updateInfo");
    logger.info(data);
    let newValue;
    let newUserData = {
        user_id: data.username,
        wallets: {}
    }
    if (data.type === 'anx') {
        newValue = { $set: { 'wallets.eos.anx.balance': data.newBalance } };
        newUserData.wallets = {
            eos: {
                anx: {
                    locked: 0,
                    balance: data.newBalance
                }
            }
        };
    } else if (data.type === 'anv') {
        newValue = { $set: { 'wallets.eos.anv.balance': data.newBalance } };
        newUserData.wallets = {
            eos: {
                anv: {
                    locked: 0,
                    balance: data.newBalance
                }
            }
        };
    } else if (data.type === 'anl') {
        newValue = { $set: { 'wallets.eos.anl.balance': data.newBalance } };
        newUserData.wallets = {
            eos: {
                anl: {
                    locked: 0,
                    balance: data.newBalance
                }
            }
        };
    } else if (data.type === 'ant') {
        newValue = { $set: { 'wallets.eos.ant.balance': data.newBalance } };
        newUserData.wallets = {
            eos: {
                ant: {
                    locked: 0,
                    balance: data.newBalance
                }
            }
        };
    } else if (data.type === 'usdv') {
        newValue = { $set: { 'wallets.eos.usdv.balance': data.newBalance } };
        newUserData.wallets = {
            eos: {
                usdv: {
                    locked: 0,
                    balance: data.newBalance
                }
            }
        };
    } else if (data.type === 'eth') {

        logger.info("in ETH update");

        newValue = { $set: { 'wallets.eth.eth.balance': data.newBalance } };
        newUserData.wallets = {
            eth: {
                eth: {
                    locked: 0,
                    balance: data.newBalance
                }
            }
        };
    } else if (data.type === 'btc') {
        newValue = { $set: { 'wallets.btc.btc.balance': data.newBalance } };
        newUserData.wallets = {
            btc: {
                btc: {
                    locked: 0,
                    balance: data.newBalance
                }
            }
        };
    } else if (data.type === 'bch') {
        newValue = { $set: { 'wallets.bch.bch.balance': data.newBalance } };
        newUserData.wallets = {
            bch: {
                bch: {
                    balance: data.newBalance
                }
            }
        };
    } else if (data.type === 'xmr') {
        newValue = { $set: { 'wallets.xmr.xmr.balance': data.newBalance } };
        newUserData.wallets = {
            xmr: {
                xmr: {
                    balance: data.newBalance
                }
            }
        };
    } else if (data.type === 'bsv') {
        newValue = { $set: { 'wallets.bsv.bsv.balance': data.newBalance } };
        newUserData.wallets = {
            bsv: {
                bsv: {
                    balance: data.newBalance
                }
            }
        };
    } else if (data.type === 'dash') {
        newValue = { $set: { 'wallets.dash.dash.balance': data.newBalance } };
        newUserData.wallets = {
            dash: {
                dash: {
                    balance: data.newBalance
                }
            }
        };
    } else if (data.type === 'ltc') {
        newValue = { $set: { 'wallets.ltc.ltc.balance': data.newBalance } };
        newUserData.wallets = {
            ltc: {
                ltc: {
                    balance: data.newBalance
                }
            }
        };
    } else if (data.type === 'xrp') {
        newValue = { $set: { 'wallets.xrp.xrp.balance': data.newBalance } };
        newUserData.wallets = {
            xrp: {
                xrp: {
                    balance: data.newBalance
                }
            }
        };
    } else if (data.type === 'neo') {
        newValue = { $set: { 'wallets.neo.neo.balance': data.newBalance } };
        newUserData.wallets = {
            neo: {
                neo: {
                    balance: data.newBalance
                }
            }
        };
    } else if (data.type === 'usdt') {
        newValue = { $set: { 'wallets.btc.usdt.balance': data.newBalance } };
        newUserData.wallets = {
            btc: {
                usdt: {
                    locked: 0,
                    balance: data.newBalance
                }
            }
        };
    } else if (data.type === 'ercusdt') {
        newValue = { $set: { 'wallets.eth.usdt.balance': data.newBalance } };
        newUserData.wallets = {
            eth: {
                usdt: {
                    locked: 0,
                    balance: data.newBalance
                }
            }
        };
    } else if (data.type === 'jkc') {
        newValue = { $set: { 'wallets.eth.jkc.balance': data.newBalance } };
        newUserData.wallets = {
            eth: {
                jkc: {
                    locked: 0,
                    balance: data.newBalance
                }
            }
        };
    } else if (data.type === 'nori') {
        newValue = { $set: { 'wallets.eos.nori.balance': data.newBalance } };
        newUserData.wallets = {
            eos: {
                nori: {
                    locked: 0,
                    balance: data.newBalance
                }
            }
        };
    }
    const user = await retrieveUserInfo(collection, data.username);
    let result;
    if (user) {
        logger.info("Yes, User ");
        logger.info(newValue);
        result = await db.collection(collection).updateOne({ user_id: data.username }, newValue);

    }
    else {
        logger.info("No, User ");
        logger.info(newValue);
        result = await db.collection(collection).insertOne(newUserData);
    }
    return result.result;
}


var updateLocked = async function (collection, data) {
    let newValue;
    let newUserData = {
        user_id: data.username,
        wallets: {}
    }
    if (data.type === 'anx') {
        newValue = { $set: { 'wallets.eos.anx.locked': data.locked } };
        newUserData.wallets = {
            eos: {
                anx: {
                    locked: data.locked
                }
            }
        };
    } else if (data.type === 'btc') {
        newValue = { $set: { 'wallets.btc.btc.locked': data.locked } };
        newUserData.wallets = {
            btc: {
                btc: {
                    locked: data.locked
                }
            }
        };
    } else if (data.type === 'ercusdt') {
        newValue = { $set: { 'wallets.eth.usdt.locked': data.locked } };
        newUserData.wallets = {
            eth: {
                usdt: {
                    locked: data.locked
                }
            }
        };
    }
    const user = await retrieveUserInfo(collection, data.username);
    let result;
    if (user) {
        result = await db.collection(collection).updateOne({ user_id: data.username }, newValue);
    }
    return result.result;
}


var updateBotBalance = async function (collection, data) {
    let newValue;
    let newUserData = {
        user_id: data.username,
        wallets: {}
    }
    if (data.type === 'anx') {
        newValue = { $set: { 'wallets.eos.anx.balance': data.newBalance } };
        newUserData.wallets = {
            eos: {
                anx: {
                    balance: data.newBalance
                }
            }
        };
    } else if (data.type === 'ant') {
        newValue = { $set: { 'wallets.eos.ant.balance': data.newBalance } };
        newUserData.wallets = {
            eos: {
                ant: {
                    balance: data.newBalance
                }
            }
        };
    } else if (data.type === 'anl') {
        newValue = { $set: { 'wallets.eos.anl.balance': data.newBalance } };
        newUserData.wallets = {
            eos: {
                anl: {
                    balance: data.newBalance
                }
            }
        };
    } else if (data.type === 'anv') {
        newValue = { $set: { 'wallets.eos.anv.balance': data.newBalance } };
        newUserData.wallets = {
            eos: {
                anv: {
                    balance: data.newBalance
                }
            }
        };
    } else if (data.type === 'nori') {
        newValue = { $set: { 'wallets.eos.nori.balance': data.newBalance } };
        newUserData.wallets = {
            eos: {
                nori: {
                    balance: data.newBalance
                }
            }
        };
    } else if (data.type === 'btc') {
        newValue = { $set: { 'wallets.btc.btc.balance': data.newBalance } };
        newUserData.wallets = {
            btc: {
                btc: {
                    balance: data.newBalance
                }
            }
        };
    } else if (data.type === 'usdt') {
        newValue = { $set: { 'wallets.eth.usdt.balance': data.newBalance } };
        newUserData.wallets = {
            eth: {
                usdt: {
                    balance: data.newBalance
                }
            }
        };
    } else if (data.type === 'jkc') {
        newValue = { $set: { 'wallets.eth.jkc.balance': data.newBalance } };
        newUserData.wallets = {
            eth: {
                jkc: {
                    balance: data.newBalance
                }
            }
        };
    } else if (data.type === 'bch') {
        newValue = { $set: { 'wallets.bch.bch.balance': data.newBalance } };
        newUserData.wallets = {
            bch: {
                bch: {
                    balance: data.newBalance
                }
            }
        };
    } else if (data.type === 'xmr') {
        newValue = { $set: { 'wallets.xmr.xmr.balance': data.newBalance } };
        newUserData.wallets = {
            xmr: {
                xmr: {
                    balance: data.newBalance
                }
            }
        };
    } else if (data.type === 'bsv') {
        newValue = { $set: { 'wallets.bsv.bsv.balance': data.newBalance } };
        newUserData.wallets = {
            bsv: {
                bsv: {
                    balance: data.newBalance
                }
            }
        };
    } else if (data.type === 'dash') {
        newValue = { $set: { 'wallets.dash.dash.balance': data.newBalance } };
        newUserData.wallets = {
            dash: {
                dash: {
                    balance: data.newBalance
                }
            }
        };
    } else if (data.type === 'ltc') {
        newValue = { $set: { 'wallets.ltc.ltc.balance': data.newBalance } };
        newUserData.wallets = {
            ltc: {
                ltc: {
                    balance: data.newBalance
                }
            }
        };
    } else if (data.type === 'xrp') {
        newValue = { $set: { 'wallets.xrp.xrp.balance': data.newBalance } };
        newUserData.wallets = {
            xrp: {
                xrp: {
                    balance: data.newBalance
                }
            }
        };
    } else if (data.type === 'bnb') {
        newValue = { $set: { 'wallets.bnb.bnb.balance': data.newBalance } };
        newUserData.wallets = {
            bnb: {
                bnb: {
                    balance: data.newBalance
                }
            }
        };
    }
    const user = await retrieveUserInfo(collection, data.username);
    let result;
    if (user) {
        result = await db.collection(collection).updateOne({ user_id: data.username }, newValue);
    }
}

async function getMaxBidAmount(collection, data) {
    const result = await db.collection(collection).find(data).sort({ amount: -1 }).limit(1)
    return result;
}

async function getMinBidAmount(collection, data) {
    const result = await db.collection(collection).find(data).sort({ amount: +1 }).limit(1)
    return result;
}

async function updateXigoloBalance(collection, data) {
    let newValue;
    let newUserData = {
        username_db: data.username,
        wallet: {}
    }
    if (data.type === 'xp') {
        newValue = { $set: { 'wallet.xp.balance': data.newBalance } };
        newUserData.wallet = {
            xp: {
                balance: data.newBalance
            }
        };
    }
    else if (data.type === 'xpp') {
        newValue = { $set: { 'wallet.xpp.balance': data.newBalance } };
        newUserData.wallet = {
            xpp: {
                balance: data.newBalance
            }
        };
    }
    const user = await retrieveData(collection, data.username);
    let result;
    if (user) {
        result = await db.collection(collection).updateOne({ username_db: data.username }, newValue, { upsert: true });
    } else {
        result = await db.collection(collection).insertOne(newUserData);
    }
    return result.result;
}


function getFname() {
    return getFname.caller.name
}

async function getLatestNFTOrders(collection, data, page, pageSize) {
    const result = await db.collection(collection).find(data).sort({ datetime: -1 }).skip((page - 1) * pageSize).limit(pageSize)
    return result.toArray();
}

async function getTrendingNFT(collection, page, pageSize) {
    console.log("innnn")
    const result = await db.collection(collection).aggregate([
        {
            "$group": {
                "_id": "$tokenId",
                "count": { "$sum": 1 }
            }
        },
        { "$sort": { "count": -1 } },
        { "$skip": (page - 1) * pageSize },
        { "$limit": pageSize },
    ])
    return result.toArray();
}

async function demuxAggr(collection, data, sort, page, pageSize){
    let result
    if(page && pageSize) {
        result = await db.collection(collection).aggregate(data,{allowDiskUse: true}).skip((page - 1) * pageSize).limit(pageSize);
    } else {
        result = await db.collection(collection).aggregate(data,{allowDiskUse: true});
    }
    return result.toArray();
}

async function demuxAggrCount(collection, data, sort){
    const result = await db.collection(collection).aggregate(data);
    const resultArr = await result.toArray();
    return resultArr.length;
}

async function getAggregateResult(collection, data) {
    const result = await db.collection(collection).aggregate(data);
    return result.toArray();
}

module.exports = {
    retrieveData,
    retrieveAccount,
    retrieveMultipleData,
    retrieveUserInfo,
    getLatestNFTOrders,
    getTrendingNFT,
    demuxAggr,
    demuxAggrCount,
    getAggregateResult,
    retrieveHotWallet,
    updateXigoloBalance,
    updateOne,
    getMaxBidAmount,
    getMinBidAmount,
    bulkWrite,
    updateLocked,
    updateBotBalance,
    purchaseCryptoInfo,
    updateInfo,
    connectToServer: function (callback) {
        MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
            if(err) { console.log(err); }
            console.log(process.env_production.DB_NAME)
            db = client.db(process.env_production.DB_NAME);
            //console.log(
            //"Mongo Connection Completed...."
            //);
            return callback(err);
        });
    },
    getNewerThan: async function (collection, cursor) {
        const result = await db.collection(collection).find({ timestamp: { $gt: cursor } }, {
            fields: {
                price: 1,
                amount: 1,
                timestamp: 1,
                'taker.user_id': 1,
                'taker.buy': 1,
            }
        });
        return result;
    },
    getOneNewerThan: async function (collection, cursor) {
        const result = await db.collection(collection).find({ timestamp: { $gt: cursor } }, {
            fields: {
                price: 1,
                amount: 1,
                timestamp: 1,
                'taker.user_id': 1,
                'taker.buy': 1,
            }
        }).sort({ timestamp: -1 }).limit(1);
        return result;
    },

    clusterInfo: async function (collection, data, page, pageSize, filter = {}) {
        const result = await db.collection(collection).find(data).project(filter).skip((page - 1) * pageSize).limit(pageSize)
        return result.toArray();
    },
    clusterInfoMultipleData: async function (collection, data, page, pageSize) {
        const result = await db.collection(collection).find({ username_db: { "$in": data } }).skip((page - 1) * pageSize).limit(pageSize);
        return result.toArray();
    },
    eventInfo: async function (collection, data, page, pageSize) {
        const result = await db.collection(collection).find(data).sort({ connected_users: -1 }).skip((page - 1) * pageSize).limit(pageSize)
        return result.toArray();
    },
    latesteventInfo: async function (collection, data, page, pageSize) {
        const result = await db.collection(collection).find(data).sort({ _id: -1 }).skip((page - 1) * pageSize).limit(pageSize)
        return result.toArray();
    },

    getOneNewerAll: async function (collection, cursor) {
        const result = await db.collection(collection).find({ timestamp: { $gt: cursor } }).sort({ timestamp: -1 }).limit(1);
        return result;
    },
    getTwentyNewerThan: async function (collection, cursor) {
        const result = await db.collection(collection).find({ timestamp: { $gt: cursor } }, {
            fields: {
                price: 1,
                amount: 1,
                timestamp: 1,
                'taker.user_id': 1,
                'taker.buy': 1,
            }
        }).limit(20);
        return result;
    },
    getTWoHundoNewerThan: async function (collection, cursor) {
        const result = await db.collection(collection).find({ timestamp: { $gt: cursor } }, {
            fields: {
                price: 1,
                amount: 1,
                timestamp: 1,
                'taker.user_id': 1,
                'taker.buy': 1,
            }
        }).sort({ timestamp: -1 }).limit(200);
        return result;
    },
    getHundoNewerThan: async function (collection, cursor) {
        const result = await db.collection(collection).find({ timestamp: { $gt: cursor } }, {
            fields: {
                price: 1,
                amount: 1,
                timestamp: 1,
                'taker.user_id': 1,
                'taker.buy': 1,
            }
        }).sort({ timestamp: -1 }).limit(100);
        return result;
    },
    getLastRecord: async function (collection) {
        const result = await db.collection(collection).find({}, {
            fields: {
                price: 1,
                amount: 1,
                timestamp: 1,
                'taker.user_id': 1,
                'taker.buy': 1,
            }
        }).sort({ timestamp: -1 }).limit(1);
        return result;
    },
    insertData: function (collection, data) {
        db.collection(collection).insertOne(data);
    },
    insertMany: function (collection, data) {
        db.collection(collection).insertMany(data);
    },
    nextOrder: async function (collection) {
        const result = await db.collection(collection).findOne({});
        return result;
    },
    nexttxEntry: async function (collection) {
        //console.log(collection)
        const result = await db.collection(collection).findOne({
            status: 0
        });
        return result;
    },
    bestOrder: async function (collection, buysort) {
        try {
            //console.logle.log(' + start best order')
            let result
            // if(collection.includes('sell') && collection.includes('jkc')) {
            //   result = await db.collection(collection).find({
            //     $or: [{
            //         username_db: "vPloeLuLOlH3OYpk5bA6rQ=="
            //     }, {
            //         username_db: "mPIgW0J8fUkXyTagW0lEMQ=="
            //     }, {
            //       username_db: "wl3d6WBzLXgeCFnVpyaasg=="
            //   }]
            // });
            //   result = await result.toArray();
            //   if(result.length > 0) {
            //     return result[0];
            //   } else {
            //     return [];
            //   }
            // }
            //  else {
            result = await db.collection(collection).find({});
            // }
            result = await result.toArray()
            console.log(result.length)
            if (result.length > 0) {
                var max = parseFloat(result[0].price);
                var min = parseFloat(result[0].price);
                var index = 0;

                if (buysort) {
                    //sort -1      
                    for (var i = 0; i < result.length; i++) {
                        if (parseFloat(result[i].price) > max) {
                            max = parseFloat(result[i].price);
                            index = i;
                        }
                    }
                    console.log("Maximum");
                    /*console.log(result[index]);*/
                    return result[index];
                } else {
                    for (var i = 0; i < result.length; i++) {
                        if (parseFloat(result[i].price) < min) {
                            min = parseFloat(result[i].price);
                            index = i;
                        }
                    }
                    //console.logle.log("Minimum");
                    return result[index];
                }
            } else {
                return { timestamp: Date.now() }
            }
        } catch (e) {
            //console.logle.log(getFname()+' in db.js ',e.message,arguments)
            return e.message
        }



    },
    insertOne: async function (collection, data) {
        const result = await db.collection(collection).insertOne(data);
        return result
    },
    removeOne: async function (collection, data) {
        const result = await db.collection(collection).deleteOne(data);
        return result
    },
    retrieveInfo: async function (collection, data) {
        const result = await db.collection(collection).find(data);
        return result;
    },
    retrieveSomeInfo: async function (collection, data, filter) {
        console.log("filter", filter);
        console.log("data", data)
        const result = await db.collection(collection).find(data).project(filter);
        return result;
    },
    retrieveInfoXanalia: async function (collection, data) {
        const result = await db.collection(collection).find(data).sort({sellDateTime:-1});
        return result;
    },
    retrieveBotAddrInfo: async function (collection, data) {
        const result = await db.collection(collection).find(data).sort({_id:1});
        return result;
    },
    projectInfo: async function (collection, data, query) {
        const result = await db.collection(collection).find(data).project(query).limit(100);
        return result;
    },

    retrieveMostBidObject: async function (collection, pagenum, pagesize) {

        const result = await db.collection(collection).find({ status: 0 }).aggregate([
            {
                "$group": {
                    "_id": "$tokenId",
                    "count": { "$sum": 1 }
                }
            },
            { "$sort": { "_id": 1 } },
            {
                "$group": {
                    "_id": null,
                    "counts": {
                        "$push": {
                            "tokenId": "$_id",
                            "count": "$count"
                        }
                    }
                }
            }
        ]).skip((pagenum - 1) * pagesize).limit(pagesize)
        return result;
    },

    retrievePagination: async function (collection, pagenum, pagesize, from, to) {
        if (from == 0) {
            const result = await db.collection(collection).find().skip((pagenum - 1) * pagesize).limit(pagesize);
            return result;
        } else {
            const result = await db.collection(collection).find({ $and: [{ time: { $gte: isodate(from) } }, { time: { $lte: isodate(to) } }] }).sort({ _id: -1 }).skip((pagenum - 1) * pagesize).limit(pagesize);
            return result;
        }
    },
    retrieveLatestInfo: async function (collection, data) {
        const result = await db.collection(collection).find(data).sort({ timestamp: -1 }).limit(1)
        return result;
    },
    retrieveLatestEvent: async function (collection, data) {
        var result = await db.collection(collection).find(data).sort({ _id: -1 })
        result = await result.toArray()
        return result[0];
    },
    retrieveHundredRecords: async function (collection, data) {
        const result = await db.collection(collection).find(data).limit(100)
        return result;
    },
    retrieveLatestNFTInfo: async function (collection, data) {
        const result = await db.collection(collection).find(data).sort({ _id: -1 }).limit(1)
        return result;
    },
    retrieveLatestBid: async function (collection, data) {
        const result = await db.collection(collection).find(data).sort({ amount: -1 });
        return result;
    },

    retrieveOneInfo: async function (collection, data) {
        const result = await db.collection(collection).findOne(data);
        return result;
    },
    retrieveOneLatestInfo: async function (collection, data) {
        var result = await db.collection(collection).find(data).sort({ _id: -1 })
        result = await result.toArray()
        return result[0];
    },    
    retrieveDistinct: async function (collection, key) {
        const result = await db.collection(collection).distinct(key);
        return result;
    },
    deleteMany: async function (collection, data) {
        const result = await db.collection(collection).deleteMany(data);
        return result;
    },
    updateData: function (collection, data) {

        var myquery = { username_db: data.username };
        var newvalues = { $set: { EOSPrivKey: data.eospriv, EOSPubKey: data.eospub, EOSAccount: data.eosaccount } };

        db.collection(collection).updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            //console.log("EOS Key inserted");
        });
    },
    upd: async function (collection, query, newvalues) {

        const result = await db.collection(collection).updateOne(query, newvalues, { upsert: true });
        return result
    },
    count: async function (collection, query) {

        const result = await db.collection(collection).count(query);
        return result
    },
    updateWalletData: function (collection, data) {

        var myquery = { username_db: data.username };

        if (data.type == "BTCwallet") {
            var newvalues = { $set: { BTCwallet: data.wallet } };
        }
        else if (data.type == "ETHwallet") {
            var newvalues = { $set: { ETHwallet: data.wallet } };
        }
        else if (data.type == "ANXwallet") {
            var newvalues = { $set: { ANXwallet: data.wallet } };
        }

        db.collection(collection).updateOne(myquery, newvalues, { upsert: true }, function (err, res) {
            if (err) throw err;
            //console.log("wallet balance updated");
        });
    },

    updateWalletBalData: function (collection, data) {

        var myquery = { username_db: data.username };
        var newvalues = { $set: { BTCwallet: data.BTCwallet, ETHwallet: data.ETHwallet, ANXwallet: data.ANXwallet } };

        db.collection(collection).updateOne(myquery, newvalues, { upsert: true }, function (err, res) {
            if (err) throw err;
            //console.log("wallet balance updated");
        });

    },

    allitems: async function (collection) {

        const result = await db.collection(collection).find({});
        return result;

    },
    updateGameInfo: async function (collection, condition, data) {
        let setQuery = { $set: data };
        //console.log("Inner Update")
        const obj = await db.collection(collection).updateOne(condition, setQuery)
        //console.log("nModified",obj.result.nModified)
        return obj.result.nModified;
    },
    updateUsername: async function (collection, data) {
        let condition = { username_db: data.username },
            setQuery = { $set: { username_db: data.newUsername } };

        await db.collection(collection).updateOne(condition, setQuery, function (err, res) {
            if (err) throw err;
            //console.log(`Username(${data.username}) updated with new value "${data.newUsername}"`);
        });
    },
    updateFlagInDemux: async function (collection, tokenId, flag) {
        return await db.collection(collection).updateMany({ tokenId: tokenId, event:"MintWithTokenURINonCrypto" }, {$set: {isAddedToMuseum: flag}});
        //return await db.collection(collection).u([ { $match: {tokenId} }, {$addFields: {isAddedToMuseum: flag}} ]);
    },
    getXanaMuseumNFTs: async function () {
        // return await db.collection("museumNFTCollection").find({flag: true}).toArray();
        return await db.collection("museumNFTCollection").aggregate([
            {
                $lookup: {
                    from: "demuxNFTData",
                    localField: "tokenId",
                    foreignField: "tokenId",
                    as: "token_info"
                }
            },
            {   $unwind:"$token_info" },
            {
                $match:{
                    $and:[{"flag" : true}]
                }
            },
            {   
                $project:{
                    _id: 1,
                    tokenId: 1,
                    flag: 1,
                    tokenDetails: "$token_info",
                } 
            }
        ]).toArray();
    },
};
