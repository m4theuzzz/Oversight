import { UUID } from "../modules/utils/UUID"

interface MessageAuth {
    companyId: UUID,
    budgetId: UUID
}

interface MessageData extends MessageAuth {
    title: string,
    approved: boolean,
    description?: string
}

export {
    MessageAuth,
    MessageData
}
