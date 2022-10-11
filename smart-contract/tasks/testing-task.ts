import { task } from "hardhat/config";

export default task("testing-task", "Learn how tasks are made")
  .addParam("name", "Your name")
  .setAction(async (args) => {
    console.log("Hello " + args.name);
  });
