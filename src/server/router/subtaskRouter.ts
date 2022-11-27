import { createRouter } from "./context";
import { z } from "zod";

export const subtaskRouter = createRouter()
  .mutation("addItem", {
    input: z.object({
      name: z.string(),
      taskId: z.string(),
    }),
    resolve: async ({ input, ctx }) => {
      const { name, taskId } = input;

      const item = await ctx.prisma.subTaskModel.create({
        data: {
          name,
          taskId,
        },
      });

      return item;
    },
  })
  .mutation("deleteItem", {
    input: z.object({
      id: z.string(),
    }),
    resolve: async ({ input, ctx }) => {
      const { id } = input;

      const item = await ctx.prisma.subTaskModel.delete({
        where: {
          id,
        },
      });

      return item;
    },
  })
  .mutation("markAsComplete", {
    input: z.object({
      id: z.string(),
      checked: z.boolean(),
    }),
    resolve: async ({ input, ctx }) => {
      const { id, checked } = input;

      const item = await ctx.prisma.subTaskModel.update({
        where: {
          id,
        },
        data: {
          checked,
        },
      });

      return item;
    },
  });
