import mongodb from 'mongodb';

const MongoClient = mongodb.MongoClient;
const DB_URL = 'mongodb://127.0.0.1:27017/test';

function Connect(url){
    MongoClient.connect(url,(err,db) =>{
      console.log('db:');
      if (err){
        console.error(err);
        it.throw(new Error('Db Error'+err.message));
      }
      it.next(db);
    })
}

function query(db){
    db.collection('users').find().toArray((err,doc) =>{
      console.log('doc:',doc);
        it.next(doc);
    });
}

function* main(){
  try{
    let db = yield Connect(DB_URL);
    console.log('now db:');
    let doc = yield query(db);
    console.log('now doc:',doc);
  }catch (err){
    console.log('catch err:',err.message);
    return;
  }

}

let it = main();
it.next();