import { UUID } from "../modules/utils/UUID"

interface Message {
    title: string,
    approved: boolean,
    companyId: string,
    budgetId: string,
    description?: string
}

interface MessageAuth {
    companyId: UUID,
    budgetId: UUID,
    messageToken: string
}

interface MessageData extends Message {
    expireAt: Date
}

export {
    Message,
    MessageAuth,
    MessageData
}
