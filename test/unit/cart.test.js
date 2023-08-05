import { cartDao } from "../../src/dao/mongo/index.js";
import mongoose from "mongoose";
import config from "../../src/config.js";
import Assert from "assert"


const assert = Assert.strict

const {dbUrl}= config
describe("Set de pruebas del CartDao",function(){
    before( function() {
        mongoose.connect(dbUrl)
        this.cartDao = cartDao
    })
    it("El Dao debe poder obtener los usuarios en formato de arreglo",async function(){
        const result = await this.cartDao.getCart()
        assert.strictEqual(Array.isArray(result),true)
    })
})