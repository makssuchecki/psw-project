import bcrypt from "bcrypt";
 
const password = "admin"
const hashedPassword = await bcrypt.hash(password, 10)
export const users = [
    { id: 1, username: "admin", password: hashedPassword}
]

export const sessions = new Map()