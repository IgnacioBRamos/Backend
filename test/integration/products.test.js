import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const requester = supertest("http://localhost:8080");

describe("Set de pruebas del modulo de products",function(){
    describe("POST /api/products",function(){
        it("Debe crear un producto correctamente",async function(){
            const productMock = {
                title:"capuccino",
                description:"suvae",
                price: 300,
                code:"sdfsfewdfgdfg",
                category:"cafe",
                stock: 20,
                thumbnails:["http://localhost:8080/images/1681164406818-capuccino.jpg"]    
            };
            const {_body} = await requester.post("/api/products")
            .field("title",productMock.title)
            .field("description",productMock.description)
            .field("price",productMock.price)
            .field("code",productMock.code)
            .field("category",productMock.category)
            .field("stock",productMock.stock)
            .attach("thumbnails","./test/integration/assets/capuccino.jpg")
            expect(_body.payload).to.have.property("_id")
        })
    })
})
