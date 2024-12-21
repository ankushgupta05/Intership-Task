import { Module } from "@nestjs/common";
import { DBconnection } from "./db.source";

@Module({
    providers:[...DBconnection],
    exports:[...DBconnection]
})

export class DbModule{}