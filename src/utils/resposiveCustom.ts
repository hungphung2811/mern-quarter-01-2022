import dayjs from "dayjs";

interface responseInterface {
    status: boolean | string,
    message?: string,
    data?: any
}

interface responseInterfaceOutput extends responseInterface {
    time: any
}

export function responseCustom(config: responseInterface): responseInterfaceOutput {
    return {
        status: config.status,
        time: dayjs().format(),
        message: config.message || '',
        data: config.data || null
    }
}