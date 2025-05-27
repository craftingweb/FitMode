"use server";

import { hashUserPassword } from "@/lib/hash";
import { createUser } from "@/lib/user";

// server actions are async functions

export async function signup(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  let errors = {};

  if (!email.includes("@")) {
    errors.email = "Please enter a valid email address!";
  }

  if (password.length < 8) {
    errors.password = "Password must be at least 8 charchters";
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
    };
  }
  //   store in db (create a new user)
  const hashedPassword = hashUserPassword(password);
  createUser(email, hashedPassword);
}
