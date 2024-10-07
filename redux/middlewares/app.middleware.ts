import { createListenerMiddleware } from "@reduxjs/toolkit";
import { getSpaces, loadMembers } from "@/redux/actions/space.action.ts";
import { loadTasks } from "@/redux/actions/task.action.ts";
import { loadProjects } from "@/redux/actions/project.action.ts";

export const appMiddleware = createListenerMiddleware();

appMiddleware.startListening({
  predicate: (action) => {
    return action.type?.startsWith("space/") || action.type?.startsWith("task/create") || action.type?.startsWith("task/update") || action.type?.startsWith("space/create") ||
      action.type?.startsWith("project/create") || action.type?.startsWith("project/cover") || action.type?.startsWith("project/remove")
  },
  effect: async (action, listenerApi) => {
    switch (action.type) {
      case "space/setSpace":
        listenerApi.dispatch(loadMembers());
        listenerApi.dispatch(loadProjects());
        break;
      case "task/create/fulfilled":
        listenerApi.dispatch(loadTasks({ reload: true }));
        break;
      case "space/create/fulfilled":
        listenerApi.dispatch(getSpaces());
        break;
      case "project/create/fulfilled":
        listenerApi.dispatch(loadProjects());
        break;
      case "project/cover/fulfilled":
        listenerApi.dispatch(loadProjects());
        break;
      case "project/remove/fulfilled":
        listenerApi.dispatch(loadProjects());
        break;
    }
  }
});
