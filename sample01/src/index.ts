import "reflect-metadata";
import { createConnection } from "typeorm";
// import { User } from "./entity/User";
import { Photo } from "./entity/Photo";
import { PhotoMetadata } from "./entity/PhotoMetadata";

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

    const photoRepository = connection.getRepository(Photo);
    // for (let i = 0; i < 100; i++) {
    //   const photo = new Photo();
    //   photo.name = `hoge_${i}`;
    //   photo.description = "説明文";
    //   photo.filename = `sample${i}.jpg`;
    //   photo.views = Math.random() * 10000;
    //   photo.isPublished = false;
    //   await photoRepository.save(photo);
    // }

    // const photo = new Photo();
    // photo.name = "sample";
    // photo.description = "説明文";
    // photo.filename = `sample.jpg`;
    // photo.views = Math.random() * 10000;
    // photo.isPublished = false;

    // await photoRepository.save(photo);

    const photo = await photoRepository.findOne({ id: 200 });

    const photoMetadataRepository = connection.getRepository(PhotoMetadata);

    const metadata = new PhotoMetadata();
    metadata.photo = photo;
    metadata.height = 100;
    metadata.comment = "hello world";
    await photoMetadataRepository.save(metadata);
  })
  .catch((error) => console.log(error));
