// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import { authOptions } from "../[...nextauth]/authOptions"; // Correct the path to authOptions

export { NextAuth as handler };
