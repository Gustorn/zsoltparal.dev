import { getSdk } from "@zsparal/wordpress/api";
import { GraphQLClient } from "graphql-request";

const url = process.env.NEXT_PUBLIC_WP_URL;

if (!url) {
  throw new Error("Application initialization failed, no WordPress URL found");
}

const client = new GraphQLClient(`${url}/?graphql`);
export const wordpress = getSdk(client);
