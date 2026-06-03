# Public Repo Boundary Notes

Date: 2026-06-03

`RC-Silesia/WEBSITE` is the public publishing repository for the RC Silesia website.

Current boundary:
- public root: informational one-page website;
- `/staging/`: noindex working preview;
- internal SoT, legal governance drafts, resolution metadata, AI readiness ledgers and operational ngOs materials are not maintained in this public tree.

Removed from the public tree in `v1.5.86`:
- `governance/`;
- SoT legal JSON files and drafts;
- governance metadata gates tied to private legal/operational material;
- direct public link to the draft accessibility statement.

Residual note:
Git history in a public repository may still expose older committed files by commit hash. A future clean publishing repository or history rewrite is required if the project needs to remove historical commit access as well as current-branch access.
