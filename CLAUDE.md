## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Binary location:

- Prefer the `graphify` command on PATH. If it's "command not found", it is installed locally (no admin access to set it global) — use the full path `~/.local/bin/graphify.exe` (i.e. `C:\Users\vFA0320127\.local\bin\graphify.exe`). Example: `"$HOME/.local/bin/graphify.exe" query "<question>"`.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
