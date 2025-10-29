import { login } from "$lib/requests/user.server";
import { AuthorizationError, UnexpectedResponse } from "$lib/server/errors";

import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request, fetch }) => {
  try {
    const data = await request.json();
    const username: string = data.username as string;
    const password: string = data.password as string;

    const response = await login(username, password, fetch);
    const cookieHeader = response.headers.get("Set-Cookie");

    if (cookieHeader === null) {
      throw new UnexpectedResponse("CookieMissing", "The cookie header is missing in response")
    }

    return new Response(null, {
      status: 200,
      headers: {
        "Set-Cookie": cookieHeader,
      },
    });

  } catch (error) {
    if (error instanceof AuthorizationError) {
      return new Response("Authorization failed", {
        status: 401,
      });
    }

    console.log(error);
    return new Response("Unkwown error", {
      status: 500,
    });
  }
};
