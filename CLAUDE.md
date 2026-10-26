# CLAUDE.MD

Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

## 5. No Backward Compatibility

**This project is in active development. Do not preserve backward compatibility.**

- No migration shims, deprecated code paths, or dual-format support unless explicitly requested.
- When changing APIs, schemas, or data formats, update callers and delete the old path.

## 6. Prefer Libraries

**Use established, well-maintained libraries over custom implementations when they clearly reduce complexity.**

- Check `package.json` and existing code for a library already in use before adding a new one.
- Do not add a dependency for a one-liner, and do not replace simple existing code with a heavier library.

## 7. OOP for Business Logic Only

**Use an object-oriented style for business logic — services and modules.**

- Prefer classes with clear responsibilities for domain services, modules, and similar business code.
- Keep related state and behavior together on the same object.
- Favor instance methods when the logic depends on shared configuration or collaborators.

**Do not force OOP elsewhere.** Infrastructure, config, helpers, Hono apps, and routes should follow common best practices for that layer (plain objects, functions, and Hono routers).

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.
