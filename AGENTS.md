# Architecture rules

- Intranet news pages share an access-controlled shell using the existing external client's session and `checkIntranetAccess`; keep access checks consistent between listing and detail.
- Published intranet news reads and batched private image URLs live in `src/lib/news.ts`, separately from admin operations, to preserve admin behavior.
- Suggestions use a separate `src/lib/suggestions.ts` service with the existing external client; employee submission and admin management share no news operations, preserving existing modules.
- The suggestion page reuses the intranet access-controlled shell; admin suggestions mirror the news panel session and admin checks to preserve the external authentication owner.