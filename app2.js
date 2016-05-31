import mongodb from 'mongodb';
import co from 'co';

const MongoClient = mongodb.MongoClient;
const DB_URL = 'mongodb://127.0.0.1:27017/test';

function Connect(url){
    return new Promise((resolve,reject) =>{
        MongoClient.connect(url,(err,db) =>{
            if (err){
                reject(new Error('can not connect to db'));
            }else {
             resolve(db);
            }
        })
    });
}


function query(db){
    return new Promise((resolve,reject) =>{
        db.collection('users').find().toArray((err,doc) =>{
            if (err) reject(new Error('can not find users'));
            else  {
                resolve(doc);
            }
        });
    });
}

function* main() {
    let db = yield Connect(DB_URL);
    let doc = yield query(db);
    console.log('main result:',doc);
}

co(main()).catch((err) =>{
    console.log('catch err:',err.message);
});

