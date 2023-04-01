import Users from "~~/server/dbModels/user";

export default defineEventHandler(async (event) => {
	const { id, username } = await readBody(event)
  const insert = new Users(  {
    username: username,
    uid: id,
    stocks: {}
  });
  console.log(insert)
  try {
    await insert.save();
    return {status: 200};
  } catch {
    return {status: 400};
  }
 })