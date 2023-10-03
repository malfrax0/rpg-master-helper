
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: {
    "http://localhost:4000": {
      headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MGMwMjBjZGUyMWI4NzM3OTYyMzFlZiIsImVtYWlsIjoibGVvLm5hZGVhdS5pb0BnbWFpbC5jb20iLCJuYW1lIjoibGVvIiwicGFzc3dvcmQiOiIkMmIkMTAkMFdMb2RwR0tDVkZLVERpbnVzSUdmdWk1Q2oucmN3S1cvTzlFcHVDL3VyVUJrVUVLMlU3WFciLCJpYXQiOjE2OTYzNjUyMjV9.SXmpJbAu37pn2C4qBkXU-e65mOyzSoSOXTcVSQQJ2y4"
      }
    }
  },
  generates: {
    "src/generated/graphql.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        useIndexSignature: true,
        contextType: "../context#Context"
      }
    }
  }
};

export default config;
