import { createRouter } from "./context";
import { z } from "zod";
import { TaskModel } from "@prisma/client";

export const taskRouter = createRouter()
  .query("getAllTasks", {
    resolve: async ({ ctx }) => {
      const items = await ctx.prisma.taskModel.findMany({
        include: {
          todoItem: true,
        },
      });

      return items;
    },
  })
  .mutation("addTask", {
    input: z.object({
      name: z.string(),
      description: z.string(),
    }),
    resolve: async ({ input, ctx }) => {
      const { name, description } = input;

      const item: TaskModel = await ctx.prisma.taskModel.create({
        data: {
          name,
          description,
        },
        include: {
          todoItem: true,
        },
      });

      return item;
    },
  })
  .mutation("deleteTask", {
    input: z.object({
      id: z.string(),
    }),
    resolve: async ({ input, ctx }) => {
      const { id } = input;

      const item = await ctx.prisma.taskModel.delete({
        where: {
          id,
        },
      });

      return item;
    },
  })
  .mutation("toggleTaskChecked", {
    input: z.object({
      id: z.string(),
      checked: z.boolean(),
    }),
    resolve: async ({ input, ctx }) => {
      const { id, checked } = input;

      await ctx.prisma.subTaskModel.updateMany({
        where: {
          taskItem: {
            id,
          },
        },
        data: {
          checked,
        },
      });

      const item = await ctx.prisma.taskModel.update({
        where: {
          id,
        },
        include: {
          todoItem: true,
        },
        data: {
          checked,
        },
      });

      return item;
    },
  });
