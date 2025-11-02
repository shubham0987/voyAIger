const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "voyAIger API",
    version: "1.0.0",
    description: "Basic API documentation for auth and follow endpoints",
  },
  servers: [{ url: "http://localhost:5000", description: "Local server" }],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      RegisterRequest: {
        type: "object",
        properties: {
          email: { type: "string" },
          password: { type: "string" },
          name: { type: "string" },
        },
        required: ["email", "password"],
      },
      AuthResponse: {
        type: "object",
        properties: {
          token: { type: "string" },
          user: {
            type: "object",
            properties: {
              id: { type: "string" },
              name: { type: "string" },
            },
          },
        },
      },
    },
  },
  paths: {
    "/api/auth/register": {
      post: {
        summary: "Register a new user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/RegisterRequest" },
            },
          },
        },
        responses: {
          200: {
            description: "Created",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/AuthResponse" },
              },
            },
          },
          400: { description: "Bad request" },
        },
      },
    },
    "/api/auth/login": {
      post: {
        summary: "Login with email/password",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: { type: "string" },
                  password: { type: "string" },
                },
                required: ["email", "password"],
              },
            },
          },
        },
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/AuthResponse" },
              },
            },
          },
          401: { description: "Invalid credentials" },
        },
      },
    },
    "/api/follows/{targetUserid}": {
      post: {
        summary: "Follow a user (auth required)",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "targetUserid",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: {
            description: "Followed",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    ok: { type: "boolean" },
                    created: { type: "boolean" },
                  },
                },
              },
            },
          },
        },
      },
      delete: {
        summary: "Unfollow a user (auth required)",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "targetUserid",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: {
            description: "Unfollowed",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    ok: { type: "boolean" },
                    deleted: { type: "integer" },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/follows/{userid}/followers": {
      get: {
        summary: "List followers (cursor pagination)",
        parameters: [
          {
            name: "userid",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
          {
            name: "limit",
            in: "query",
            schema: { type: "integer", default: 50 },
          },
          { name: "cursor", in: "query", schema: { type: "integer" } },
        ],
        responses: { 200: { description: "OK" } },
      },
    },
    "/api/follows/{userid}/following": {
      get: {
        summary: "List following (cursor pagination)",
        parameters: [
          {
            name: "userid",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
          {
            name: "limit",
            in: "query",
            schema: { type: "integer", default: 50 },
          },
          { name: "cursor", in: "query", schema: { type: "integer" } },
        ],
        responses: { 200: { description: "OK" } },
      },
    },
    "/api/follows/{userid}/followers/count": {
      get: {
        summary: "Get followers count",
        parameters: [
          {
            name: "userid",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: { 200: { description: "OK" } },
      },
    },
    "/api/follows/{userid}/following/count": {
      get: {
        summary: "Get following count",
        parameters: [
          {
            name: "userid",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: { 200: { description: "OK" } },
      },
    },
    "/api/follows/{userid}/mutual/{otherUserid}": {
      get: {
        summary: "Check mutual follow between two users",
        parameters: [
          {
            name: "userid",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
          {
            name: "otherUserid",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: { 200: { description: "OK" } },
      },
    },
    "/api/follows/graph/{userid}": {
      get: {
        summary: "Graph traversal of following relationships",
        parameters: [
          {
            name: "userid",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
          {
            name: "depth",
            in: "query",
            schema: { type: "integer", default: 2 },
          },
          {
            name: "limit",
            in: "query",
            schema: { type: "integer", default: 200 },
          },
        ],
        responses: { 200: { description: "OK" } },
      },
    },
  },
};

module.exports = swaggerSpec;
