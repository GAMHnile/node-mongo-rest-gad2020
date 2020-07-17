
require('should');
const request = require('supertest');
process.env.MYTESTENV='Test';

const app = require('../app');
const agent = request.agent(app);
const mongoose = require('mongoose');
const Book = mongoose.model('Book');




describe('Books CRUD test', ()=>{
    it('should post a book and return read and _id', (done)=>{
        
        testBook = {
            title: 'A fake test book',
            genre: 'fakeBook',
            author: 'George'
        }

        agent
        .post('/api/books')
        .send(testBook)
        .expect(201)
        .end((err, results)=>{
            results.body.read.should.not.equal(true);
            results.body.should.have.property('_id');
            done()
        });
        
    })
    afterEach((done)=>{
        Book.deleteMany({}).exec();
        done();
    })

    after((done)=>{
        mongoose.connection.close();
        app.server.close();
        done();
    })

})