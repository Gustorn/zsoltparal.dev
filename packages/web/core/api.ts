import { getSdk } from "@zsparal/api";
import { GraphQLClient } from "graphql-request";

const url = process.env.NEXT_PUBLIC_CMS_URL;

if (!url) {
  throw new Error("Application initialization failed, no CMS URL found");
}

const client = new GraphQLClient(`${url}/graphql`);
export const cms = getSdk(client);
