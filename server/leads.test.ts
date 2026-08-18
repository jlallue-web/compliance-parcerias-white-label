import { beforeEach, describe, expect, it, vi } from "vitest";
import type { TrpcContext } from "./_core/context";

const testOwnerOpenId = vi.hoisted(() => {
  vi.stubEnv("OWNER_OPEN_ID", "project-owner");
  return "project-owner";
});

const mocks = vi.hoisted(() => ({
  createPartnerLead: vi.fn(),
  listPartnerLeads: vi.fn(),
}));

vi.mock("./db", () => mocks);

import { appRouter, partnerLeadInput } from "./routers";

const baseContext = (role?: "user" | "admin", openId = testOwnerOpenId): TrpcContext => ({
  user: role ? {
    id: 1,
    openId,
    email: "owner@compliance.com.br",
    name: "Owner",
    loginMethod: "manus",
    role,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  } : null,
  req: { protocol: "https", headers: {} } as TrpcContext["req"],
  res: {} as TrpcContext["res"],
});

describe("leads", () => {
  beforeEach(() => vi.clearAllMocks());

  it("valida os campos obrigatórios do formulário de diagnóstico", () => {
    expect(partnerLeadInput.safeParse({ name: "A", office: "", email: "invalido", whatsapp: "123", bottleneck: "x" }).success).toBe(false);
    expect(partnerLeadInput.safeParse({ name: "Ana", office: "Escritório Alfa", email: "ana@alfa.com", whatsapp: "11999999999", bottleneck: "fiscal" }).success).toBe(true);
  });

  it("registra um novo lead por procedimento público", async () => {
    mocks.createPartnerLead.mockResolvedValue(undefined);
    const caller = appRouter.createCaller(baseContext());
    await expect(caller.leads.create({ name: "Ana", office: "Escritório Alfa", email: "ana@alfa.com", whatsapp: "11999999999", bottleneck: "fiscal" })).resolves.toEqual({ success: true });
    expect(mocks.createPartnerLead).toHaveBeenCalledWith(expect.objectContaining({ office: "Escritório Alfa", bottleneck: "fiscal" }));
  });

  it("restringe a lista de leads ao administrador", async () => {
    mocks.listPartnerLeads.mockResolvedValue([]);
    const ownerCaller = appRouter.createCaller(baseContext("admin", testOwnerOpenId));
    await expect(ownerCaller.leads.list()).resolves.toEqual([]);

    const otherAdminCaller = appRouter.createCaller(baseContext("admin", "another-admin"));
    await expect(otherAdminCaller.leads.list()).rejects.toMatchObject({ code: "FORBIDDEN" });

    const userCaller = appRouter.createCaller(baseContext("user"));
    await expect(userCaller.leads.list()).rejects.toMatchObject({ code: "FORBIDDEN" });
  });
});
