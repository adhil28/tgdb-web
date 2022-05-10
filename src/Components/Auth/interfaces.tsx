export interface AuthEvents {
    phoneNumberSubmitted: (phone: string) => any,
    otpSubmitted: (phone: string) => any,
    passwordSubmitted: (phone: string) => any,
}
export interface stateUpdaterInterface {
    changedState: 'phone' | 'otp' | 'password' | 'progress',
    state: boolean
}