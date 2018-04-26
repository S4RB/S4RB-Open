type Complain = {
    Quarter?: string,
    Month?: (Date | string),
    Complaints?: string,
    UnitsSold?: string
}

type ComplainQuarterResult = {
    year: string,
    quarter: string,
    cpmu: number | string
}

type ComplainMonthlyResult = {
    month: string,
    quarter: string,
    cpmu: number | string
}

export { Complain, ComplainQuarterResult, ComplainMonthlyResult };