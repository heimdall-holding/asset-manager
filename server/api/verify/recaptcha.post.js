export default defineEventHandler(async (event) => {
	const { token } = await readBody(event);
  const secret = useRuntimeConfig().recaptcha_v3_secret;
  if (!token) {
    return 'Invalid Token';
  }
  if (!secret) {
    return 'Internal error';
  }
  const res = await $fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`
  );
  return res.success;
 })