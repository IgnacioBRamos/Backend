import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const requester = supertest("http://localhost:8080");

describe("Set de pruebas del modulo de register", function(){
    it("Post /api/sessions/register: debe registrar un usuario correctamente",async function(){
        const mockUser ={
            first_name:"Nachitox",
            last_name: "macata",
            email: "nachomacata@hotmail.com",
            age: 23,
            password: "123456",
        }
        const {_body} = await requester.post("/api/sessions/register").send(mockUser)
        expect(_body.payload).to.be.ok
    })
})