import * as keyBy from "lodash/keyBy";

export interface Author {
  avatar: string
  name: string
  job: string
  bio: string
  link: string
}

const authors: Author[] = [
  {
    avatar: require("../assets/icons/semanticlink.svg"),
    bio: "the team",
    job: "Every-think",
    link: "https://twitter.com/semantic_link",
    name: "semantic link project"
  }
];

export default keyBy(authors, "name");
