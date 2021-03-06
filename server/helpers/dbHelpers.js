module.exports= function(db){
  const getUserByEmail = function(email) {
    const query= {
      text:"SELECT * From users WHERE email = $1",
      values:[email.trim().toLowerCase()]
    }
    return db.query(query)
    .then(result => result.rows[0]? result.rows[0]:Promise.reject({status:404,message:"user does not exist"}))
    
  
  }

  const getAllUsers = function() {
    const query= {
      text:"SELECT * From users",
    }
    return db.query(query)
    .then(result =>  result.rows)


  }

  const getUser = function (user_id) {
    const query = {
      text:"SELECT * FROM users WHERE id = $1",
      values:[user_id]
    }
    return db.query(query)
    .then(result => result.rows[0])
  }

  const getAllAds = function () {
    const query= {
      text:`SELECT DISTINCT ads.*, users.name, users.profile_pic FROM ads LEFT JOIN users ON ads.user_id = users.id
      LEFT JOIN collaborators ON ads.id = collaborators.ad_id ORDER BY ads.id`
    }
    return db.query(query)
    .then(result => result.rows)
  }
  //WHERE clause with a specific ad...ad_id

  const getAllCollaborators = function (ad_id) {
    const query= {
      text:"SELECT collaborators.*, users.profile_pic FROM collaborators JOIN users ON collaborators.user_id = users.id WHERE $1 = collaborators.ad_id"
    }
    return db.query(query,[ad_id])
    .then(result => result.rows)
  }

  const addToCollaborators = function (ad_id, user_id) {
    const query = {
      text: `INSERT INTO collaborators (ad_id, user_id)
      VALUES($1,$2) Returning *`,
      values:[ad_id, user_id]
    }
    return db.query(query)
    .then(res => res.rows[0])
  }



  const saveUser = function(info,location) {
    const query = {
      text:`INSERT INTO users (name, password, email, date_of_birth, city, postal_code, lat, lng, role, profile_pic)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) Returning *`,
      values:[info.name,info.password,info.email,info.birthday,info.city,info.postalCode,location.lat,location.lng,info.role,info.profilePic]
    }

      return db.query(query)
      .then(res => res.rows[0])
      .catch(err => Promise.reject(err))

  }

 const getProject = function (user_id) {
  const query = {
    text: `SELECT projects.*
          From projects WHERE user_id = $1 `,
          values:[user_id]
  }
  return db.query(query)
  .then(result => {return result.rows})
}

const getUserById = function (user_id) {
  const query = {
    text: `SELECT users.name, users.role, users.city, users.profile_pic FROM  users 
          WHERE users.id = $1 `,
          values:[user_id]
  }
  return db.query(query)
  .then(result => {return result.rows[0]})
}

const addToProjects = function (info, user_id) {
  const query = {
    text: `INSERT INTO projects (title, description, url, pic, user_id)
    VALUES ($1,$2,$3,$4,$5) Returning *`,
    values:[info.title, info.description, info.url, info.pic, user_id]
  }
  return db.query(query)
  .then(res => res.rows[0])
}
  
  return {
    getUserByEmail,
    getAllUsers,
    saveUser,
    getProject,
    getAllAds,
    getAllCollaborators,
    addToCollaborators,
    getUser,
    addToProjects,
    getUserById
  }
}