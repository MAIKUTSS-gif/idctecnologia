# Architecture rules

- Intranet news pages share an access-controlled shell using the existing external client's session and `checkIntranetAccess`; keep access checks consistent between listing and detail.
- Published intranet news reads and batched private image URLs live in `src/lib/news.ts`, separately from admin operations, to preserve admin behavior.