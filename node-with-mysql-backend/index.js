// var arr =[  
//     {  
//        "Brand 1":[  
//           {  
//              "NAME":"SHIRT",
//              "SIZE":"M"
//           },
//           {  
//              "NAME":"PANTS",
//              "SIZE":"L"
//           }
//        ],
//        "Brand 2":[  
//           {  
//              "NAME":"JEANS",
//              "SIZE":"S"
//           },
//           {  
//              "NAME":"TROUSER",
//              "SIZE":"S"
//           },
//           {  
//              "NAME":"TROUSERS",
//              "SIZE":"L"
//           }
//        ],
//        "Brand 3":[  
//           {  
//              "SIZE":"L",
//              "NAME":"JEANS"
//           }
//        ]
//     },
//     {  
//        "Brand x":[  
//           {  
//              "NAME":"SNEAKERS",
//              "SIZE":"M"
//           }
//        ],
//        "Brand 2":[  
//           {  
//              "NAME":"BLAZER",
//              "SIZE":"L"
//           },
//           {  
//              "NAME":"FUR COAT",
//              "SIZE":"L"
//           }
//        ],
//        "Brand 1":[  
//           {  
//              "SIZE":"XL",
 
//              "NAME":"BLAZER"
//           }
//        ]
//     }
//  ]
// console.log(arr);
// // build a flat list of objects

// let isScalar = x => typeof x !== 'object' || x === null;
// console.log(isScalar);
// let isPlain = x => isScalar(x) || Object.values(x).every(isScalar);
// console.log(isPlain);

// function *flat(obj) {
//     if (isPlain(obj))
//         yield obj;

//     else if (Array.isArray(obj))
//         for (let x of obj)
//             yield *flat(x);

//     else
//         for (let key of Object.keys(obj))
//             for (let val of flat(obj[key]))
//                 yield Object.assign(val, {key});
// }


// let all = [...flat(arr)];

// // aggregation examples

// let count = function(values) {
//     let m = new Map();
//     for (let x of values)
//         m.set(x, (m.get(x) || 0) + 1);
//     return [...m.entries()];
// }

// let byBrand = count(all.map(x => x.key));
// console.log(byBrand);

// let bySize = count(all.map(x => x.SIZE));
// console.log(bySize);

// var data = [
//     {
//        "restaurantName":"Bronco",
//        "address":"39 Rue des Petites Écuries, 75010 Paris",
//        "lat":48.8737815,
//        "long":2.3501649,
//        "ratings":[
//           {
//              "stars":4,
//              "comment":"x"
//           },
//           {
//              "stars":5,
//              "comment":"x"
//           }
//        ]
//     },
//     {
//        "restaurantName":"Babalou",
//        "address":"4 Rue Lamarck, 75018 Paris",
//        "lat":48.8865035,
//        "long":2.3442197,
//        "ratings":[
//           {
//              "stars":5,
//              "comment":"Une minuscule pizzeria délicieuse cachéejuste à côté du Sacré choeur !"
//           },
//           {
//              "stars":3,
//              "comment":"x"
//           }
//        ]
//     }
//  ];
 
//  var count = 0;
//  function dataFilter(value, index, array){
//  console.log(value.ratings.length);
//     for(var i = 0; i< value.ratings.length; i++ ){
//         //console.log("comment: "+ value.ratings[i].comment);
//         if (value.ratings[i].comment === 'x') {
//             count++;
//         }
//         //console.log("stars:" +value.ratings[i].stars);
//     }
//  }
 
// data.forEach(dataFilter);
// console.log(count);

const data = [
   {
     attendance: [
       { Make: "1", Model: "1", Year: "0", Present: "present" },
       { Make: "2", Model: "1", Year: "1", Absent: "absent" }
     ],
     "course-name": "OS",
     id: 61
   },
   {
     attendance: [
       { Make: "1", Model: "0", Year: "0", Absent: "absent" },
       { Make: "2", Model: "1", Year: "1", Present: "present" }
     ],
     "course-name": "OS",
     id: 62
   },
   {
     attendance: [
       { Make: "1", Model: "0", Year: "0" },
       { Make: "2", Model: "1", Year: "1" }
     ],
     "course-name": "",
     id: 63
   },
   {
     attendance: [
       { Make: "1", Model: "0", Year: "0" },
       { Make: "1", Model: "1", Year: "1" },
       { Make: "1", Model: "1", Year: "1" },
       { Make: "1", Model: "1", Year: "1" }
     ],
     "course-name": "",
     id: 64
   }
 ];
 
 const make1Count = data.reduce(
   (total, current) => total + current.attendance.some((el) => el.Make === "1" && el.Model === "0"),
   0
 );
 
 console.log(make1Count);