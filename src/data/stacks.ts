/* tslint:disable */
import { Stack } from "../types";

const data: Stack[] = [
  {
    title: "Vue todo API browser",
    type: "frontend",
    key: "vue-api-browser",
    images: [
      require("../assets/icons/vue.svg")
    ],
    content: {
      title: "Vue + API browser",
      description:
        "Learn how to browse a hypermedia API with a general purpose client build in Vue"
    },
    authorName: "semantic link project",
    comingSoon: false
  },
  {
    title: "Vue todo app",
    type: "frontend",
    key: "vue-todo-app",
    images: [
      require("../assets/icons/vue.svg")
    ],
    content: {
      title: "Vue + todo",
      description:
        "Learn how to use Vue to create a todo app that consumes a hypermedia-based todo API"
    },
    authorName: "semantic link project",
    comingSoon: false
  },
  {
    title: "ASP.NET Core todo API",
    type: "backend",
    key: "aspnetcore-todo-api",
    images: [
      require("../assets/icons/dotnet-core.png")
    ],
    content: {
      title: "AspNetCore + todo API",
      description:
        "Learn to build the todo hypermedia API with AspNetCore"
    },
    authorName: "semantic link project",
    comingSoon: false
  }
];

export default data;
