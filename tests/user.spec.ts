require("dotenv").config();

import { afterAll, beforeAll, describe, expect, test } from "@jest/globals";

import { User } from "../src/models/User";
import UserRepository from "../src/repository/UserRepository";
import FollowRepository from "../src/repository/followRepository";
import { FollowService } from "../src/services/FollowService";
import { UserService } from "../src/services/UserService";
import { TestSetup } from "./test-setup";

beforeAll(async () => {
  console.log("Setting up Test database...");
  await TestSetup.instance.setupTestDB();

  user1 = await userService.signUp({
    username: "peejay",
    password: "testpassword",
  })
});

afterAll(async () => {
  console.log("Destroying Test database...");
  await TestSetup.instance.teardownTestDB();
});

let user1!: User;

const userService = new UserService(new UserRepository());
const followService = new FollowService(
  new FollowRepository(),
  new UserRepository()
);

describe("User Tests", () => {
  test("should create a user", async () => {
    const data = { username: "jeffrey", password: "mypassword" };
    const user = await userService.signUp(data);
    expect(user.username).toBe(data.username);
  });

  test("should login a user", async () => {
    const newUser = await userService.signUp({username: "henrypaul", password: "testpassword" });
    const user = await userService.login({ username: newUser.username, password: "testpassword" });
    const loggedInUser = await userService.getCurrentLoggedInUser(user.id);
    expect(loggedInUser.username).toBe(newUser.username);
    expect(loggedInUser.no_of_followers).toEqual(0);
  });

  test("should update password", async () => {
    const result = await userService.updatePassword(user1.id, {
      old_password: "testpassword",
      new_password: "newpassword",
    });
    expect(result.username).toBe(user1.username);
  });

  test("should follow a user", async () => {
    const testUserA = await new UserRepository().save({
      username: "testA",
      password: "testpassword",
    } as User);
    const testUserB = await new UserRepository().save({
      username: "testB",
      password: "testpassword",
    } as User);
    const result = await followService.follow(testUserA.id, testUserB.id);
    expect(result.follower.id).toBe(testUserA.id);
    expect(result.followee.id).toBe(testUserB.id);
  });

  test("should list a user's username and number of followers", async () => {
    const testUserC = await new UserRepository().save({
      username: "testC",
      password: "testpassword",
    } as User);
    const testUserD = await new UserRepository().save({
      username: "testD",
      password: "testpassword",
    } as User);
    // testUserC follows testUserD
    await followService.follow(testUserC.id, testUserD.id);
    const result = await userService.findById(testUserD.id);
    expect(result.username).toBe(testUserD.username);
    expect(result.no_of_followers).toEqual(1);
  });

  test("should list users in a most liked to least liked", async () => {
    const testUser1 = await new UserRepository().save({
      username: "test1",
      password: "testpassword",
    } as User);
    const testUser2 = await new UserRepository().save({
      username: "test2",
      password: "testpassword",
    } as User);
    await followService.follow(testUser1.id, testUser2.id);

    const testUser3 = await new UserRepository().save({
      username: "test3",
      password: "testpassword",
    } as User);
    const testUser4 = await new UserRepository().save({
      username: "test4",
      password: "testpassword",
    } as User);
    await followService.follow(testUser1.id, testUser3.id);
    await followService.follow(testUser1.id, testUser4.id);
    await followService.follow(testUser3.id, testUser4.id);
    await followService.follow(testUser2.id, testUser4.id);

    const mostFollowed = await followService.mostFollowed();
    const noOfFollowersArr = [];
    mostFollowed.forEach((follow) =>
      noOfFollowersArr.push(follow.no_of_followers)
    );


    const isDecendingOrder = noOfFollowersArr.every(
      (value, index) => index === 0 || value <= noOfFollowersArr[index - 1]
    );

    expect(isDecendingOrder).toBe(true);
  });

  test("should unfollow a user", async () => {
    const testUserE = await new UserRepository().save({
      username: "testE",
      password: "testpassword",
    } as User);
    const testUserF = await new UserRepository().save({
      username: "testF",
      password: "testpassword",
    } as User);
    await followService.follow(testUserE.id, testUserF.id);
    const deleteResult = await followService.unfollow(
      testUserE.id,
      testUserF.id
    );
    expect(deleteResult.affected).toEqual(1);
  });
});
