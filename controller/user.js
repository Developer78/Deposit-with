const mongoUtil = require('../utils/db');
const { transfer } = require("../utils/cryptoUtils")
const ObjectID = require('mongodb').ObjectID;
var Wallet = require('ethereumjs-wallet');
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const process = require('../utils/process');

const signup = async (req, res) => {
    try {
        const { body: {
                username,
                email,
                password,

            } } = req;
         
        const userData = await mongoUtil.retrieveOneInfo("user", {email: { $regex: "^"+email+"$", $options: 'i' }});
        if(userData && userData._id) {
           return res.status(400).send({success: false,data: "email already exists"});
        } else {
            const wallet = Wallet.generate();
            var EthPrivKey = wallet.getPrivateKeyString(); // to encrypt
            // EthPrivKey = await encryptionkey(EthPrivKey);
            var EthPubKey = wallet.getAddressString();

                await mongoUtil.insertData("user", {
                    username,
                    email,
                    password,
                    publickey: EthPubKey,
                    privateKey: EthPrivKey
                })
            return res.status(200).send({success: false,data: "user Registered"});
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({success: false,data: "Something went wrong",error});
    }
}

const signin = async (req, res) => {
    try {
        const { body: {
                email,
                password,

            } } = req;
         
        const userData = await mongoUtil.retrieveOneInfo("user", {email: { $regex: "^"+email+"$", $options: 'i' }});
        if(userData && userData._id) {
            if(userData.password == password) {
                var token = jwt.sign({ id: userData._id }, process.env_production.JWT_SECRET, {
                  expiresIn: 86400 // 24 hours
                });

                return res.status(200).send({
                  'success': true, data: {
                    user: {
                      ...userData,
                      password: undefined
                    },
                    accessToken: token
                  }
                });
            } else {
                return res.status(400).send({success: false,data: "password invalid"});   
            }
        } else {
            return res.status(400).send({success: false,data: "email invalid"});
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({success: false,data: "Something went wrong",error});
    }
}

const profile = async (req, res) => {
    try {
        const { userId } = req;
         
        const userData = await mongoUtil.retrieveOneInfo("user", {_id:ObjectID(userId)});
        if(userData && userData._id) {

            delete(userData.privateKey)
            delete(userData.password)

            return res.status(200).send({success: true,data: userData});
        } else {
            return res.status(400).send({success: false,data: "no user found"});
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({success: false,data: "Something went wrong",error});
    }
}

const depositToken = async (req, res) => {
    try {
        const { userId,
            body: {
                toAddr,
                amount
            } } = req;
         
        const userData = await mongoUtil.retrieveOneInfo("user", {_id:ObjectID(userId)});
        if(userData && userData._id) {
            const transaction = await transfer({
                toAddress: {pubKey: userData.publickey, privKey: userData.privateKey },
                amount: amount,
                chainType: "binance",
                type: "deposit"
            });

            return res.status(200).send({success: true,data: transaction.data});
        } else {
            return res.status(400).send({success: false,data: "no user found"});
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({success: false,data: "Something went wrong",error});
    }
}

const withdrawToken = async (req, res) => {
    try {
        const { userId,
            body: {
                toAddr,
                amount
            } } = req;

        const userData = await mongoUtil.retrieveOneInfo("user", {_id:ObjectID(userId)});
        if(userData && userData._id) {
            const transaction = await transfer({
                toAddress: {pubKey: userData.publickey, privKey: userData.privateKey },
                amount: amount,
                chainType: "binance",
                type: "withdraw"
            });

            return res.status(200).send({success: true,data: transaction.data});
        } else {
            return res.status(400).send({success: false,data: "no user found"});
        }      
    } catch (error) {
        console.log(error)
        return res.status(500).send({success: false,data: "Something went wrong",error});
    }
}

module.exports = {
    signup,
    profile,
    signin,
    depositToken,
    withdrawToken
}