import { useState, useEffect} from 'react'
import './App.css'
import axios from 'axios'

function App() {
  //A https://randomuser.me/api/?results=10 végpontról jövő adatokból hozz létre személyenként egy kártyát. Jelenítsd meg a képet, nevet és tedd lehetővé, hogy a kártya alján like és dislike gombok segítségével szavazni lehessen. A like-ra kattintva eggyel nőjön a szavazat, dislike esetén csökkenjen a szavazat, amely jelenjen is meg az adott kártyán.
  const url = 'https://randomuser.me/api/?results=10'
  const [users, setUsers] = useState([])
  useEffect(() => {
    axios.get(url).then((response) => {
      const fetchedUsers = response.data.results.map((user) => ({
        id: user.login.uuid,
        name: `${user.name.first} ${user.name.last}`,
        picture: user.picture.large,
        votes: 0,
      }))
      setUsers(fetchedUsers)
    })
  }, [])

  

  

  return (
    <>
      <div className="app">
        {users.map((user) => (
          <div key={user.id} className="card">
            <img src={user.picture} alt={user.name} />
            <h2>{user.name}</h2>
            <p>Votes: {user.votes}</p>
            <div>
              <button
              className='like-button'
                onClick={() =>
                  setUsers((prevUsers) =>
                    prevUsers.map((u) =>
                      u.id === user.id ? { ...u, votes: u.votes + 1 } : u
                    )
                  )
                }
              >
                szeret :3
              </button>

              <button
              className='dislike-button'
                onClick={() =>
                  setUsers((prevUsers) =>
                    prevUsers.map((u) =>
                      u.id === user.id ? { ...u, votes: u.votes - 1 } : u
                    )
                  )
                }
              >
                nem szeret 3:
              </button>
            </div>
          </div>
        ))}
      </div>

    
    </>
  )
}

export default App
