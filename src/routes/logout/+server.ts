import { logout } from "$lib/requests/user.server";
import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { AuthorizationError } from "$lib/server/errors";

export const GET: RequestHandler = async ({ cookies, fetch }) => {
  const session = cookies.get("session");
  if (session === undefined || session === null) {
    throw AuthorizationError;
  }

  const result = await logout(session, fetch);
  if (result.status === 200) {
    cookies.delete("session", { path: "/" });
  }

  throw redirect(302, "/login");
};
