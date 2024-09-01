import * as muse from "libmuse";
import { kv } from "@vercel/kv";

const auth = muse.get_option("auth");

const auth_flow = async () => {
  if (auth.has_token()) return;
  console.log("Getting login code...");

  const loginCode = await auth.get_login_code();

  console.log(
    `Go to ${loginCode.verification_url} and enter the code: ${loginCode.user_code}`
  );

  console.log("Loading token...");

  await auth.load_token_with_code(loginCode);

  console.log("Logged in!");
  const token = auth._token;
  if (!token) {
    console.error("token is null");
    return;
  }
  for (const key of Object.keys(token)) {
    await kv.set(key, token[key]);
  }
};

auth_flow();
