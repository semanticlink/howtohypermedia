/* tslint:disable */
import { Stack } from "../types";

const data: Stack[] = [
  {
    title: "Vue across the api",
    type: "frontend",
    key: "vue-api-browser",
    images: [
      require("../assets/icons/vue.svg")
    ],
    content: {
      title: "Vue + SemanticLink",
      description:
        "Get started with Vue and deal with single api resources"
    },
    authorName: "semantic link project",
    comingSoon: false
  },
  {
    title: "Vue + application cache",
    type: "frontend",
    key: "vue-todo-app",
    images: [
      require("../assets/icons/vue.svg")
    ],
    content: {
      title: "Vue + todo",
      description:
        "Learn how to use Vue with semantic link to create a todo app with an application cache"
    },
    authorName: "semantic link project",
    comingSoon: false
  },
  {
    title: "ASP.NET Core",
    type: "backend",
    key: "aspnetcore",
    images: [
      require("../assets/icons/dotnet-core.png")
    ],
    content: {
      title: "AspNetCore",
      description:
        "Learn to build the Api with AspNetCore"
    },
    authorName: "semantic link project"
  }
];

export default data;
