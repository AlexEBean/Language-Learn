INSERT INTO users (username, email, password, profile_pic, region)
VALUES (${username}, ${email}, ${password}, ${profile_pic}, ${region})
RETURNING *;