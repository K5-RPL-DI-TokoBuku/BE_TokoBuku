function sum(a,b){
    return a + b
}

test('Test Math Pertambahan', ()=>{
    expect(sum(1,2)).toBe(3)
})