import { UUID } from "../modules/utils/UUID"

interface MessageHeaders {
    "company-id": UUID,
    "budget-id": UUID,
    "message-token": string
}

interface MessageAuth {
    companyId: UUID,
    budgetId: UUID,
    messageToken: string
}

interface MessageData {
    companyId: UUID,
    budgetId: UUID,
    expireAt: Date
}

export {
    MessageHeaders,
    MessageAuth,
    MessageData
}