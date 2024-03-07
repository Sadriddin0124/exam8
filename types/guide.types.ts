export interface IGuides {
    _id?: string
    title?: string
    content?: string
}
export interface IGuidesPayload {
    _id?: string
    title: FormDataEntryValue | null | string | undefined
    content: FormDataEntryValue | null | string | undefined
    notify: boolean
}