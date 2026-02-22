import db from "../db.js";
import usersTable from "../model/schema.js";


export const login = async(req,res) => {
    try {
        const {name, email, password} = req.body;
        const user = await db.insert(usersTable).values({ email, password});
    } catch (error) {
        
    }
}