import { getAuth } from 'firebase-admin/auth';
import Users from "~~/server/dbModels/user";

export default defineEventHandler(async (event) => {
	const { token } = await readBody(event);
  const res = await getAuth().verifyIdToken(token);
  try {
    if (res) {
      const document = await Users.findOne({user_uid: res.uid});
      return {
        step: document.register_step,
      }
    } else {
      return 'user not authenticated'
    }
  } catch (err) {
    return err
  }
 })