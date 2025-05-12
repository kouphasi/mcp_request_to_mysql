import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { executeQuery } from "./mysql_client.js";

const server = new McpServer({
  name: "mcp_request_to_mysql",
  version: "1.0.0",
});

server.tool(
  "execute_mysql_queries",
  "MySqlのクエリを実行する",
  { query: z.string().describe("クエリ") },
  async ({ query }) => {
    const result = await executeQuery(query);
    return { content: [{ type: "text", text: JSON.stringify(result) }, {type: "text", text: "this is response"}] };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Example MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
