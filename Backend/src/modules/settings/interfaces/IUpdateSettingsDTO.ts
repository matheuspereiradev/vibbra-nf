export default interface IUpdateSettingsDTO {
    sendEmailBillingAlerts: boolean,
    emailBillingAlerts: string,
    maximumAnnualBillingLimit: number,
    notifyFrom: number
}