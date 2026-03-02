import { describe, expect, it } from "vitest";
import { GET as healthGET } from "../app/api/health/route";
import { GET as helloGET } from "../app/api/hello/route";
import { NextRequest } from "next/server";

describe("GET /api/health", () => {
  it("returns ok status", async () => {
    const response = await healthGET();
    const data = await response.json();
    expect(data.status).toBe("ok");
    expect(data.timestamp).toBeDefined();
  });
});

describe("GET /api/hello", () => {
  it("returns default greeting", async () => {
    const request = new NextRequest("http://localhost/api/hello");
    const response = await helloGET(request);
    const data = await response.json();
    expect(data.message).toBe("Hello, World!");
  });

  it("returns personalized greeting", async () => {
    const request = new NextRequest("http://localhost/api/hello?name=Claude");
    const response = await helloGET(request);
    const data = await response.json();
    expect(data.message).toBe("Hello, Claude!");
  });
});
