import { time } from "console"

type loadingStatus = {
    status: "loading",
    progress: number
}
type errorStatus = {
    status: "error"
    error: Error
}
type sucessStatus<T> = {
    status: "success"
    data:T
    timestamp : number
}
type asyncStatus<T>  = loadingStatus | errorStatus | sucessStatus<T>
export function getStatus<T>(status: asyncStatus<T>): string {
    switch (status.status) {
        case "loading":
            return `${status.status}${status.progress}`
        case "error":
            return `${status.status}${status.error}`
        case "success":
            return `${status.status}${status.data}${status.timestamp}`
         
    }
}