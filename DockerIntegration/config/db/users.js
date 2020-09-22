// var records = [
//     { id: 1, username: 'jack', password: 'secret', displayName: 'Jack', emails: [ { value: 'jack@example.com' } ] }
//   , { id: 2, username: 'jill', password: 'birthday', displayName: 'Jill', emails: [ { value: 'jill@example.com' } ] }
// ];

var records = {}
var facebookIdMapping = {}
//   (4235, 'jack'): { id: 1, username: 'jack', password: 'secret', displayName: 'Jack', emails: [ { value: 'jack@example.com' } ] },
//   [[4533, 'jill']]: { id: 2, username: 'jill', password: 'birthday', displayName: 'Jill', emails: [ { value: 'jill@example.com' } ] },
// }

initRecords = () => {
  records[(4235, 'jack')] = { id: 1, username: 'jack', password: 'secret', displayName: 'Jack', emails: [ { value: 'jack@example.com' } ] }
  records[(4533, 'jill')] = { id: 2, username: 'jill', password: 'birthday', displayName: 'Jill', emails: [ { value: 'jill@example.com' } ] }
  records[(1234, 'andrei')] = { id: 3, username: 'andrei', password: 'liviu', displayName: 'Andrei', email: [ { value: 'jill@example.com'}], pageToken: 'EAAIvRZCsh3WIBABvroEqZB65QgykIlSZCDXti46QH7f6zFjFXxoQbkrS9yPkk5tFUx2z4bVrKAThZCqeEjYMzwgsMmF616XQOvXczOfTjh6QC7RdAmd2JdG3dASfVnBZCT0nGPoM8ParaCWcWZBH4Vloh2QL4bLm2dtL80GHcPsgZDZD'}
  facebookIdMapping[(2845663132195420, 'Andrei Liviu')] = records[(1234, 'andrei')]
}


exports.findByIdAndUsername = function(id, username, cb) {
  process.nextTick(function() {
    initRecords()
    console.log(`Searching for (${id}, ${username}) inside ${JSON.stringify(records)}`)
    if (facebookIdMapping[(id, username)])
      return cb(null, facebookIdMapping[(id, username)])
    else if (records[(id, username)])
      return cb(null, records[(id, username)])

  });
}

exports.findByUsername = function(username, cb) {
  process.nextTick(function() {
    initRecords()
    console.log(`Searching for ${username} inside ${JSON.stringify(records)}`)
    USERNAME_INDEX = 1
    for (record in records) {
      console.log(`RECORD: ${record}`)
      if (record == username) {
        return cb(null, records[record]);
      }
    }
    return cb(null, null);

  });
}

