UPDATE users
SET username = ${username},
    email = ${email},
    profile_pic = ${profile_pic},
    region = ${region},
    register_date = ${register_date},
    birthday = ${birthday},
    island = ${island},
    fruit = ${fruit},
    comment = ${comment}
WHERE user_id = ${user_id};