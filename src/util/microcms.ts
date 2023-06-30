import { createClient } from "microcms-js-sdk";
import type {
    MicroCMSQueries,
    MicroCMSImage,
    MicroCMSDate
} from "microcms-js-sdk"

export type Doc = {
    id: string,
    title: string,
    content: string,
    // eyecatch? :MicroCMSImage
} & MicroCMSDate

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
    throw new Error("MICROCMS_SERVICE_DOMAIN is required");
}
   
if (!process.env.MICROCMS_API_KEY) {
    throw new Error("MICROCMS_API_KEY is required");
}

export const client = createClient({
    serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN as string,
    apiKey: process.env.MICROCMS_API_KEY as string
})
   
export const getList =async (queries?:MicroCMSQueries) => {
    return await client.getList<Doc>({
        endpoint: "doc",
        queries
    })
}

export const getDetail = async (
    contentId: string,
    queries?: MicroCMSQueries
) => {
    return await client.getListDetail<Doc>({
        endpoint: "doc",
        contentId,
        queries
    })
}