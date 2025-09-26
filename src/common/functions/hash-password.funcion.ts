import * as bcrypt from "bcrypt";

export async function hashPasswordFunction(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
} 

export async function comparePasswordFunction(password: string, hashedPassword: string): Promise<boolean> {   
    return await bcrypt.compare(password, hashedPassword);
  }