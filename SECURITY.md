# FOODLOOP Security & Responsible Development

This is a separate food marketplace, not HORIZON ORIGIN or MzanConnect.

**Public repository precaution:** Do not commit or expose private app source until this GitHub repository is set to PRIVATE by its owner. In any visibility, never commit raw bank account details, API tokens, secrets, service-role keys, private addresses, identity documents, card numbers, OTPs or customer records.

The seller payout flow must rely on an approved payment provider, verify approved sellers, retain only masked settlement details, and handle all money movements through server-side processing with verified webhooks. Buyer food orders cannot go live until food-safety compliance, server-stock reservation, dispute/refund policies and payment security tests are complete.

All real users and payment records must belong to a dedicated FOODLOOP infrastructure, never shared with any other app by default.

Report vulnerabilities privately to the authorised repository owner; do not put sensitive information in public GitHub issues.
