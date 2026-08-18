import { COOKIE_NAME } from "@shared/const";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createPartnerLead, listPartnerLeads } from "./db";
import { getSessionCookieOptions } from "./_core/cookies";
import { ENV } from "./_core/env";
import { systemRouter } from "./_core/systemRouter";
import { adminProcedure, publicProcedure, router } from "./_core/trpc";

export const partnerLeadInput = z.object({
  name: z.string().trim().min(2, "Informe seu nome").max(160),
  office: z.string().trim().min(2, "Informe o nome do escritório").max(180),
  email: z.string().trim().email("Informe um e-mail válido").max(320),
  whatsapp: z.string().trim().min(8, "Informe um WhatsApp válido").max(32),
  bottleneck: z.enum(["capacidade", "fiscal", "contabil", "financeiro", "hcm", "outro"]),
});

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),
  leads: router({
    create: publicProcedure.input(partnerLeadInput).mutation(async ({ input }) => {
      await createPartnerLead(input);
      return { success: true } as const;
    }),
    list: adminProcedure.query(async ({ ctx }) => {
      if (ctx.user.openId !== ENV.ownerOpenId) {
        throw new TRPCError({ code: "FORBIDDEN", message: "Apenas o dono do projeto pode consultar os leads" });
      }
      return listPartnerLeads();
    }),
  }),
});

export type AppRouter = typeof appRouter;
