import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "./entity/User";
import { Photo } from "./entity/Photo";

createConnection()
  .then(async (connection) => {
    // console.log("Inserting a new user into the database...");
    // const user = new User();
    // user.firstName = "Timber";
    // user.lastName = "Saw";
    // user.age = 25;
    // await connection.manager.save(user);
    // console.log("Saved a new user with id: " + user.id);
    // console.log("Loading users from the database...");
    // const users = await connection.manager.find(User);
    // console.log("Loaded users: ", users);
    // console.log("Here you can setup and run express/koa/any other framework.");

    const user1 = new User();
    user1.firstName = "WATANABE";
    user1.lastName = "Taich";
    user1.age = 20;
    await user1.save();

    const user2 = await User.findOne({ id: 2 });
    const photo1 = new Photo();
    photo1.title = "写真タイトル";
    photo1.user = user2;
    photo1.save();
  })
  .catch((error) => console.log(error));
