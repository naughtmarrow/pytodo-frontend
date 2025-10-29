import { register } from "$lib/requests/user.server";
import { AuthorizationError } from "$lib/server/errors";

import { fail, redirect, type Actions } from "@sveltejs/kit";

export const actions = {
  registration: async ({ request, fetch }) => {
    try {
      const data = await request.formData();
      const username = data.get("username") as string;
      const password = data.get("password") as string;

      const response = await register(username, password, fetch);
      if (!response.ok) {
        throw new AuthorizationError(
          "Registration Failed",
          "Please try again later"
        )
      }

      return redirect(302, '/login')
    } catch (error) {
      if (error instanceof AuthorizationError) {
        return fail(400, {
          success: false,
          incorrect: true,
          message: error.message,
        });
      }

      console.log(error);
      return fail(500, {
        success: false,
        error: "Something unexpected has ocurred",
      });
    }
  },
} satisfies Actions;
