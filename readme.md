Research project for easy creating data JSON files (in future maybe XML/others)
using JSON definitions with info about fields, data format, dependiencies, etc.
(better and more deep than info in existing formats like
[OpenAPI Specification](https://swagger.io/specification/)).

Examples:

["number", "rent.days,rent.w", "how many days?", 50, 0, 100, 50]

in the definition file is setting up field for editing numbers with value
0-100 changed with step 50 and default value 50, description for user
"how many days" and two places in output JSON (rent.path and rent.w path).
