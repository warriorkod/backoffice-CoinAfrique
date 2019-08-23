export interface LastAudit {
    operator?: string
    action_time: string
    bo_user_id?: number|void
    bo_user?: number|void
}

export interface Audit {
    id: number
    user_id: number
    object_id: string|number
    object_repr: string
    action_flag: number
    content_type_id: number
    action_time: string
    change_message: string|AuditMessage
    user: number
    bo_user_id: number|void
}

export interface AuditMessage {
    new?: any
    specialized_ad: number
    address: string
    telephone: string
    prix: number
    deal_type: number
    type_annonce: string|number
    etat: string|number
    user_id: number
    categorie_id: number
    last_update: string
    source: string
    state: string
    etat_annonce: string
    latitude: number
    all_country: boolean
    source_version: string|number
    is_sponsored: boolean
    etat_produit: string|number
    description: string
    deleted: boolean
    duree: string
    homepage_sponsoring: boolean
    view_nbr: number
    fuel: number
    titre: string
    exchange_accepted: boolean
    date_creation: string
    pays_id: number
    amount_discount: number
    message_moderation: string
    maker_name: string
    longitude: number
    transmission: number
    source_id: string|number
    is_urgent: boolean
    both_rated: boolean
    model_name: string
}
