Research project for easy creating data JSON files (in future maybe XML/others)
using JSON definitions with info about fields, data format, dependiencies, etc.
(better and more deep than info in existing formats like
[OpenAPI Specification](https://swagger.io/specification/)).

# Q&A

**Why JavaScript?** I wanted to have something able to work in browser without
installing anything?

**Why not use JavaScript 'exec' and give all options?** I wanted to provide
format for parsing in very secure environments. In theory you can sandbox
JavaScript code, but... (especially non-technical) people show red flags,
when see some keywords.

**Is it ready?** Work in progress.

**Why not use anything ready?** All, what I have found, was too limited.

# Examples

["number", "rent.days,rent.w", "how many days?", 50, 0, 100, 50]

in the definition file is setting up user editable field for editing numbers
with value 0-100 changed with step 50 and default value 50, description for user
"how many days" and two places in output JSON (rent.path and rent.w path).

![Editor example 15.07.2025](screen.png)
