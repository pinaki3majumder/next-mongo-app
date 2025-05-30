// Define User Type
export type UserInfo = {
    _id: string;
    userName: string;
    email: string;
    isVerified: boolean;
    isAdmin: boolean;
    __v: number;
    verifyToken?: string;
    verifyTokenExpiry?: Date;
    forgotPasswordToken?: string;
    forgotPasswordTokenExpiry?: Date;
}