import * as mongoose from 'mongoose';
const MONGO_URI = 'mongodb://king:hammurabi@ds159747.mlab.com:59747/hammurabi';
let users = [
    {username: "JordanLee", hash: "JordanLee"},
    {username: "Susiebaker", hash: "Susiebaker"},
    {username: "JoeRogan", hash: "JoeRogan"}
];
import User from './models/User';
export default class Database {
    public static connect() {
        mongoose.connect(MONGO_URI).then(() => {
            mongoose.connection.db.dropDatabase().then(() => {
                //Seed database here?
                User.create(users);
            }).catch((err) => {
                console.log("Trouble seeding db", err);
            })
        }).catch((err) => {
            console.log("Error connecting to the database", err);
        });
    }
}